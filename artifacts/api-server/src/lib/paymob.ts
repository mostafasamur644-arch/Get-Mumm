const PAYMOB_API_KEY   = process.env.PAYMOB_API_KEY   ?? "";
const PAYMOB_INT_ID    = process.env.PAYMOB_INTEGRATION_ID ?? "";
const PAYMOB_IFRAME_ID = process.env.PAYMOB_IFRAME_ID ?? "";

const BASE = "https://accept.paymob.com/api";

export const paymobConfigured =
  PAYMOB_API_KEY.length > 0 &&
  PAYMOB_INT_ID.length  > 0 &&
  PAYMOB_IFRAME_ID.length > 0;

interface PaymobTokenResponse { token: string }
interface PaymobOrderResponse  { id: number }
interface PaymobKeyResponse    { token: string }

async function getAuthToken(): Promise<string> {
  const res = await fetch(`${BASE}/auth/tokens`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ api_key: PAYMOB_API_KEY }),
  });
  if (!res.ok) throw new Error(`Paymob auth failed: ${res.status}`);
  const data = (await res.json()) as PaymobTokenResponse;
  return data.token;
}

async function registerOrder(token: string, amountCents: number, items: unknown[]): Promise<number> {
  const res = await fetch(`${BASE}/ecommerce/orders`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      auth_token: token,
      delivery_needed: false,
      amount_cents: amountCents,
      currency: "EGP",
      items,
    }),
  });
  if (!res.ok) throw new Error(`Paymob order failed: ${res.status}`);
  const data = (await res.json()) as PaymobOrderResponse;
  return data.id;
}

async function getPaymentKey(
  token: string,
  paymobOrderId: number,
  amountCents: number,
  billing: { name: string; phone: string; email: string },
): Promise<string> {
  const res = await fetch(`${BASE}/acceptance/payment_keys`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      auth_token: token,
      amount_cents: amountCents,
      expiration: 3600,
      order_id: paymobOrderId,
      billing_data: {
        apartment: "NA",
        email: billing.email,
        floor: "NA",
        first_name: billing.name.split(" ")[0] ?? billing.name,
        last_name:  billing.name.split(" ").slice(1).join(" ") || ".",
        street:     "NA",
        building:   "NA",
        phone_number: billing.phone,
        shipping_method: "PKG",
        postal_code: "NA",
        city: "Cairo",
        country: "EG",
        state: "Cairo",
      },
      currency: "EGP",
      integration_id: Number(PAYMOB_INT_ID),
    }),
  });
  if (!res.ok) throw new Error(`Paymob payment key failed: ${res.status}`);
  const data = (await res.json()) as PaymobKeyResponse;
  return data.token;
}

export async function createPaymobSession(opts: {
  amountEGP: number;
  items: unknown[];
  billing: { name: string; phone: string; email: string };
}): Promise<{ iframeUrl: string; paymobOrderId: number }> {
  if (!paymobConfigured) {
    throw new Error("Paymob is not configured — set PAYMOB_API_KEY, PAYMOB_INTEGRATION_ID, PAYMOB_IFRAME_ID");
  }
  const amountCents = Math.round(opts.amountEGP * 100);
  const token         = await getAuthToken();
  const paymobOrderId = await registerOrder(token, amountCents, opts.items);
  const paymentKey    = await getPaymentKey(token, paymobOrderId, amountCents, opts.billing);
  const iframeUrl     = `https://accept.paymob.com/api/acceptance/iframes/${PAYMOB_IFRAME_ID}?payment_token=${paymentKey}`;
  return { iframeUrl, paymobOrderId };
}
