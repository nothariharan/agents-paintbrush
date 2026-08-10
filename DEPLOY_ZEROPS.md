# Deploy on Zerops

This repo is the marketing + waitlist platform for **image-gen**
(https://github.com/nothariharan/image-gen).

The MCP server runs on the user's machine (browser + ChatGPT login). Zerops hosts:

1. **web** — TanStack Start marketing site
2. **api** — Node HTTP API
3. **db** — PostgreSQL 16

## Import

```bash
zcli login <token>
zcli project project-import ./zerops-import.yml
zcli project scope <project-id>
zcli push --setup web
zcli push --setup api
```

`zerops.yml` wires `DATABASE_URL` from the `db` service for both `web` and `api`.

### Local waitlist

Postgres lives on Zerops (not public from your laptop). For local `npm run dev`, set
`VITE_PUBLIC_API_BASE` in `.env` to the public `api` subdomain so the form posts to
Zerops Postgres via CORS. Copy from `.env.example`.

To hit Postgres from local server routes instead, run `zcli vpn up -P <project-id>` and
set `DATABASE_URL` to the project connection string.

## Endpoints

Available on both `web` (same-origin) and `api` (dedicated service):

| Method | Path | Purpose |
| --- | --- | --- |
| GET | `/api/public/health` | Liveness + DB check |
| POST | `/api/public/waitlist` | Join waitlist |
| GET | `/api/public/stats` | Aggregate counters only |
| POST | `/api/public/click` | Increment GitHub CTA counter |

## Schema

Applied automatically on first request / API boot:

```sql
create table waitlist_signups (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  note text,
  created_at timestamptz not null default now()
);

create table site_counters (
  name text primary key,
  value bigint not null default 0,
  updated_at timestamptz not null default now()
);
```

Emails are never exposed publicly; only aggregate counts leave the API.
