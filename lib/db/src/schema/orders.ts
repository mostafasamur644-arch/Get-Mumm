import { pgTable, text, serial, real, integer, jsonb, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const ordersTable = pgTable("orders", {
  id: serial("id").primaryKey(),
  orderId: text("order_id").notNull().unique(),
  userId: integer("user_id"),
  customerName: text("customer_name").notNull(),
  phone: text("phone").notNull(),
  area: text("area").notNull(),
  street: text("street").notNull(),
  building: text("building").notNull(),
  notes: text("notes"),
  items: jsonb("items").notNull(),
  subtotal: real("subtotal").notNull(),
  deliveryFee: real("delivery_fee").notNull(),
  total: real("total").notNull(),
  paymentMethod: text("payment_method").notNull().default("cod"),
  paymentStatus: text("payment_status").notNull().default("pending"),
  paymobOrderId: text("paymob_order_id"),
  status: text("status").notNull().default("confirmed"),
  placedAt: timestamp("placed_at", { withTimezone: true }).notNull().defaultNow(),
});

export const insertOrderSchema = createInsertSchema(ordersTable).omit({ id: true, placedAt: true });
export type InsertOrder = z.infer<typeof insertOrderSchema>;
export type Order = typeof ordersTable.$inferSelect;
