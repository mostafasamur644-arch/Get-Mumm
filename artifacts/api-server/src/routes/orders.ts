import { Router, type IRouter, type Request, type Response } from "express";
import { db, ordersTable } from "@workspace/db";
import { eq } from "drizzle-orm";
import { requireAuth, type JwtPayload } from "./auth";
import { createPaymobSession, paymobConfigured } from "../lib/paymob";

const router: IRouter = Router();

function genOrderId(): string {
  return "MM" + Math.floor(100000 + Math.random() * 900000).toString();
}

router.post("/orders", requireAuth, async (req: Request, res: Response): Promise<void> => {
  const { userId } = (req as Request & { user: JwtPayload }).user;
  const { customerName, phone, area, street, building, notes, items, subtotal, deliveryFee, total, paymentMethod } = req.body as {
    customerName?: string; phone?: string; area?: string; street?: string;
    building?: string; notes?: string; items?: unknown[]; subtotal?: number;
    deliveryFee?: number; total?: number; paymentMethod?: string;
  };

  if (!customerName || !phone || !area || !street || !building || !items?.length || total == null) {
    res.status(400).json({ error: "Missing required order fields" });
    return;
  }

  const orderId = genOrderId();
  const method  = paymentMethod === "card" ? "card" : "cod";

  const [order] = await db.insert(ordersTable).values({
    orderId,
    userId,
    customerName,
    phone,
    area,
    street,
    building,
    notes: notes ?? null,
    items,
    subtotal:      subtotal  ?? 0,
    deliveryFee:   deliveryFee ?? 0,
    total:         total,
    paymentMethod: method,
    paymentStatus: method === "cod" ? "pending_delivery" : "pending_payment",
    status:        "confirmed",
  }).returning();

  if (method === "card" && paymobConfigured) {
    try {
      const { iframeUrl, paymobOrderId } = await createPaymobSession({
        amountEGP: total,
        items: (items as Array<{ name: string; price: number; qty: number }>).map((i) => ({
          name: i.name, amount_cents: Math.round(i.price * 100), description: i.name, quantity: i.qty,
        })),
        billing: { name: customerName, phone, email: "guest@getmumm.eg" },
      });

      await db.update(ordersTable)
        .set({ paymobOrderId: String(paymobOrderId) })
        .where(eq(ordersTable.id, order.id));

      res.status(201).json({ order: { ...order, paymobOrderId }, iframeUrl, requiresPayment: true });
      return;
    } catch (err) {
      console.error("Paymob session error:", err);
    }
  }

  res.status(201).json({ order, requiresPayment: false });
});

router.get("/orders/:orderId", requireAuth, async (req: Request, res: Response): Promise<void> => {
  const { userId } = (req as Request & { user: JwtPayload }).user;
  const { orderId } = req.params;
  const [order] = await db.select().from(ordersTable).where(eq(ordersTable.orderId, orderId));

  if (!order) {
    res.status(404).json({ error: "Order not found" });
    return;
  }
  if (order.userId !== userId) {
    res.status(403).json({ error: "Access denied" });
    return;
  }
  res.json({ order });
});

router.get("/orders", requireAuth, async (req: Request, res: Response): Promise<void> => {
  const { userId } = (req as Request & { user: JwtPayload }).user;
  const orders = await db.select().from(ordersTable).where(eq(ordersTable.userId, userId));
  res.json({ orders });
});

export default router;
