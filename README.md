# image-gen — Agent's Paintbrush

Marketing site + waitlist API for [image-gen](https://github.com/nothariharan/image-gen), an MCP server that gives AI coding agents a paintbrush (ChatGPT-in-browser image gen, no OpenAI API key).

Built for **The Zerops Challenge** (WeMakeDevs).

## Architecture (3 Zerops services)

| Service | Type | Role |
| --- | --- | --- |
| `web` | Node.js 22 (TanStack Start SSR) | Marketing frontend + same-origin API routes |
| `api` | Node.js 22 | Dedicated HTTP API for waitlist / stats / health |
| `db` | PostgreSQL 16 | Waitlist signups + site counters |

The MCP server itself runs on the user's machine. Zerops hosts this website, the API, and Postgres.

## Local development

```bash
npm install
# optional local Postgres
export DATABASE_URL=postgres://postgres:postgres@localhost:5432/imagegen
npm run dev          # web on :3000
npm run start:api    # api on :3000 (use another PORT if both run)
```

## Deploy on Zerops

```bash
# once
npm i -g @zerops/zcli
zcli login <token>

# create project + services
zcli project project-import ./zerops-import.yml
zcli project scope <project-id>

# push both runtimes
zcli push --setup web
zcli push --setup api
```

See `DEPLOY_ZEROPS.md` for env vars and endpoints.

## API

- `GET /api/public/health`
- `POST /api/public/waitlist` — `{ email, note? }`
- `GET /api/public/stats`
- `POST /api/public/click`

## Stack

- TanStack Start + React 19 + Tailwind CSS 4
- Node.js HTTP API (`api/server.mjs`)
- PostgreSQL via `pg`
- Zerops for build, deploy, networking, SSL

## AI Usage

Lovable made initial design ( completely revamped from it tbh u cant even see trace of me using it now coz i didnt like lovable's design )  , later cursor helped me further refine the design , mcp was designed by scratch by me and then refined using cursor still refining the website more but yeah mcp end to end fully works , i first designed a rough wireframe like i usually do on figma then proceeded to design in and replicate it on dev platform using cursor

