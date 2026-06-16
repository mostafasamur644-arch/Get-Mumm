# Security Policy

## Supported Versions

| Version | Supported |
|---|---|
| `main` branch | ✅ Yes |
| Tagged releases | ✅ Latest tag |
| Older tags | ❌ No |

## Reporting a Vulnerability

**Please do not open a public GitHub issue for security vulnerabilities.**

Instead, email **security@getmumm.eg** with:

1. A description of the vulnerability
2. Steps to reproduce (include any relevant code or payloads)
3. The potential impact
4. Your suggested fix, if any

We will respond within **72 hours** and work with you to understand and resolve the issue before any public disclosure.

## Security Practices in This Codebase

- **Authentication**: JWT tokens signed with `JWT_SECRET` (set this env var in production — never use the dev default)
- **Passwords**: bcryptjs with 12 rounds — never stored in plaintext
- **Input validation**: All API request bodies validated with Zod before DB access
- **SQL injection**: Drizzle ORM parameterised queries — no raw SQL interpolation
- **CORS**: Configured per-environment — lock down `CORS_ORIGIN` in production
- **Secrets**: All credentials via env vars — never hardcoded

## Environment Variables in Production

| Variable | Required | Notes |
|---|---|---|
| `DATABASE_URL` | ✅ | Full Postgres connection string |
| `JWT_SECRET` | ✅ | Min 32 random characters |
| `PAYMOB_API_KEY` | Optional | Card payments |
| `PAYMOB_INTEGRATION_ID` | Optional | Card payments |
| `PAYMOB_IFRAME_ID` | Optional | Card payments |
