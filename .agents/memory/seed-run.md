---
name: Seed Run Command
description: How to run the database seed for Get Mumm
---

## Command
```bash
npx tsx lib/db/src/seed.ts
```
Run from workspace root. `tsx` will be auto-installed if not present.

## What it seeds (full coverage)
- 6 categories (rice-grains, stuffed, meat, soups-stews, salads-sides, desserts)
- 5 chefs (Umm Hassan, Nadia Magdi, Samia Farouk, Hanan Ibrahim, Maha El-Sayed)
- 28 menu items across all categories (4–5 per category)
- 10 testimonials (mix of customer + office)
- 10 blog posts (mix of `blog` type stories and `recipe` type guides, bilingual EN/AR)
- 4 subscription plans (Solo 499, Family 1299 ★, Office 3999, Premium 2199)

## Order of operations
Clears: menuItems → testimonials → blogPosts → subscriptionPlans → chefs → categories
Then inserts in dependency order.

## Notes
- `lib/db/package.json` has no seed script; only `push` and `push-force`
- Old `scripts/seed.mjs` is a SQL-based script with different (older) schema — do not use
- After schema changes, run `pnpm --filter @workspace/db run push` first, then seed

**Why:** Keep this because it's non-obvious and the db package has no seed script registered.
