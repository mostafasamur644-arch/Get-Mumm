---
name: Auth Architecture
description: How auth is implemented across backend and frontend in Get Mumm
---

## Backend
- Routes: `POST /api/auth/register`, `POST /api/auth/login`, `GET /api/auth/me`
- File: `artifacts/api-server/src/routes/auth.ts`
- JWT signed with `JWT_SECRET` env var (fallback dev secret); 30-day expiry
- Passwords hashed with bcryptjs (12 rounds)
- `requireAuth` middleware exports `JwtPayload` for use in other routes
- Orders route (`artifacts/api-server/src/routes/orders.ts`) uses `requireAuth`

## Database
- `lib/db/src/schema/users.ts` — id, name, email (unique), passwordHash, phone, createdAt
- `lib/db/src/schema/orders.ts` — id, orderId (MM######), userId, delivery fields, items (jsonb), payment fields, paymobOrderId

## Frontend
- `artifacts/get-mumm/src/contexts/AuthContext.tsx` — AuthProvider, useAuth hook
- Persists JWT in `localStorage` under key `get-mumm:token`
- On mount: fetches `/api/auth/me` with stored token to rehydrate user
- Wraps App in: `AuthProvider` > `CartProvider` (order matters — cart doesn't need auth)
- `AuthModal.tsx` calls real API via AuthContext `login()` / `register()`; shows inline error on failure
- Navbar shows initials avatar + LogOut button when logged in; User icon when logged out

## Checkout gate
- Checkout page (`artifacts/get-mumm/src/pages/checkout.tsx`) shows auth banner when not logged in
- "Place Order" button shows "Sign in to order" with lock icon when not authenticated
- Clicking it opens AuthModal inline (not a redirect) — cart is preserved
- After login, form pre-fills name and phone from user account
- On submit: POSTs to `/api/orders` with Bearer token; handles Paymob iframe response

**Why:** Soft gate (show form, block submit) is better UX than hard redirect — user fills delivery details first, then signs in to confirm.
