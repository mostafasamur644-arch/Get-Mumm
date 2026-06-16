---
name: Paymob Integration Pattern
description: How Paymob card payment is wired up — ready to activate with env keys
---

## Files
- `artifacts/api-server/src/lib/paymob.ts` — full 3-step Paymob flow
- `artifacts/api-server/src/routes/orders.ts` — calls paymob on card orders

## Flow
1. `POST /api/orders` with `paymentMethod: "card"`
2. Backend checks `paymobConfigured` (all 3 env vars present)
3. If configured: auth token → register Paymob order → get payment key → build iframe URL
4. Returns `{ order, iframeUrl, requiresPayment: true }` to frontend
5. Frontend renders Paymob iframe inline on checkout page

## Required Env Vars (set when ready to activate)
- `PAYMOB_API_KEY` — from Paymob dashboard → Settings → API Key
- `PAYMOB_INTEGRATION_ID` — from Paymob dashboard → Developers → Payment Integrations → Card integration ID
- `PAYMOB_IFRAME_ID` — from Paymob dashboard → Developers → Iframes → iframe ID

## Current State
- Card option is selectable in checkout UI (no longer "coming soon")
- Shows Paymob badge on card option
- If env vars not set: order is saved as `paymentStatus: "pending_payment"` but no iframe shown
- Frontend gracefully falls back (no crash) when Paymob not configured

**Why:** Ready-but-inactive pattern lets the user add keys from env settings and get working payments instantly without any code change.
