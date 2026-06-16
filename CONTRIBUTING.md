# Contributing to Get Mumm

Thank you for your interest in contributing! This document explains how to get involved.

## Code of Conduct

Please read and follow our [Code of Conduct](CODE_OF_CONDUCT.md).

## Getting Started

1. Fork the repository and clone your fork
2. Follow the setup steps in [README.md](README.md)
3. Create a branch: `git checkout -b feat/your-feature-name`

## Development Workflow

### Branch Naming

| Prefix | When to use |
|---|---|
| `feat/` | New feature |
| `fix/` | Bug fix |
| `chore/` | Tooling, dependencies, config |
| `docs/` | Documentation only |
| `refactor/` | Code cleanup without feature change |

### Before Committing

```bash
pnpm run typecheck    # Must pass — zero TypeScript errors
pnpm run build        # Confirm clean production build
```

### Commit Messages

Use [Conventional Commits](https://www.conventionalcommits.org/):

```
feat(checkout): add address autocomplete for Cairo districts
fix(api): return 404 when menu item not found
docs(api): document new /api/orders endpoint
chore(deps): upgrade drizzle-orm to 0.40
```

## Pull Requests

1. Make sure CI passes (typecheck + build)
2. Fill in the [PR template](.github/PULL_REQUEST_TEMPLATE.md)
3. Link any related issues with `Closes #123`
4. Keep PRs focused — one concern per PR

## Project Structure

See [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) for a full overview of where things live and why.

## Adding an API Endpoint

1. Create or extend a route file in `artifacts/api-server/src/routes/`
2. Add Zod validation for request bodies
3. Register the route in `artifacts/api-server/src/routes/index.ts`
4. Update the OpenAPI spec in `lib/api-spec/`
5. Run codegen: `pnpm --filter @workspace/api-spec run codegen`
6. Document the endpoint in [docs/API.md](docs/API.md)

## Database Changes

1. Edit the schema in `lib/db/src/schema/`
2. Run `pnpm --filter @workspace/db run push` (dev only — never in prod)
3. Update the seed in `lib/db/src/seed.ts` if needed

## Questions

Open a [GitHub Discussion](https://github.com/your-org/get-mumm/discussions) or file a [bug report](.github/ISSUE_TEMPLATE/bug_report.md).
