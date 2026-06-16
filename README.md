# Get Mumm 🍲

> Homemade Egyptian food delivery — Cairo & Giza.  
> Connecting home cooks with customers who want real, authentic Egyptian food.

[![CI](https://github.com/your-org/get-mumm/actions/workflows/ci.yml/badge.svg)](https://github.com/your-org/get-mumm/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

## What is Get Mumm?

Get Mumm is a platform where talented home cooks (mostly women) offer freshly prepared Egyptian meals — koshari, mahshi, molokhia, konafa — delivered to your door across Cairo and Giza. Offices can order in bulk; individuals can subscribe to weekly meal plans.

## Quick Start

### Prerequisites

- Node.js 24+
- pnpm 10+
- PostgreSQL 15+

### Setup

```bash
# Clone and install
git clone https://github.com/your-org/get-mumm.git
cd get-mumm
pnpm install

# Configure environment
cp .env.example .env
# Edit .env with your DATABASE_URL

# Push DB schema
pnpm --filter @workspace/db run push

# Seed database
npx tsx lib/db/src/seed.ts

# Start both servers
pnpm --filter @workspace/api-server run dev   # API on :8080
pnpm --filter @workspace/get-mumm run dev     # Frontend on :5000
```

Open [http://localhost:5000](http://localhost:5000).

## Project Structure

```
get-mumm/
├── artifacts/
│   ├── api-server/          # Express 5 REST API (port 8080)
│   └── get-mumm/            # React + Vite frontend (port 5000)
├── lib/
│   ├── db/                  # Drizzle ORM schema + migrations
│   ├── api-spec/            # OpenAPI spec + codegen
│   ├── api-client-react/    # Generated React Query hooks
│   └── api-zod/             # Generated Zod validators
├── scripts/                 # One-off utility scripts
├── docs/                    # Architecture, API reference, guides
└── docker-compose.yml       # Full-stack local container setup
```

## Common Commands

| Command | What it does |
|---|---|
| `pnpm run build` | Typecheck + build all packages |
| `pnpm run typecheck` | Full typecheck across workspace |
| `pnpm --filter @workspace/db run push` | Push DB schema changes |
| `npx tsx lib/db/src/seed.ts` | Seed all data |
| `pnpm --filter @workspace/api-spec run codegen` | Regenerate API hooks from OpenAPI |

## Docker

```bash
# Full stack (API + frontend + Postgres)
docker compose up

# Production build
docker compose -f docker-compose.yml -f docker-compose.prod.yml up
```

## Documentation

| Doc | Description |
|---|---|
| [docs/DEVELOPMENT.md](docs/DEVELOPMENT.md) | Local development guide |
| [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) | System design & decisions |
| [docs/API.md](docs/API.md) | Full API reference |
| [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md) | Deployment guide |
| [docs/PAYMOB.md](docs/PAYMOB.md) | Paymob payment integration |

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for how to get started.

## License

MIT — see [LICENSE](LICENSE).
