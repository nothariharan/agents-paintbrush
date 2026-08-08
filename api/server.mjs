/**
 * Dedicated backend service for Zerops (hostname: api).
 * Shares the same Postgres schema as the marketing site waitlist/stats endpoints.
 */
import http from "node:http";
import { Pool } from "pg";

const port = Number(process.env.PORT || 3000);
const databaseUrl = process.env.DATABASE_URL || process.env.db_connectionString;

if (!databaseUrl) {
  console.error("Missing DATABASE_URL");
  process.exit(1);
}

const pool = new Pool({ connectionString: databaseUrl, max: 10 });

async function ensureSchema() {
  await pool.query(`CREATE EXTENSION IF NOT EXISTS pgcrypto`);
  await pool.query(`
    CREATE TABLE IF NOT EXISTS waitlist_signups (
      id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      email text NOT NULL UNIQUE,
      note text,
      created_at timestamptz NOT NULL DEFAULT now()
    );
    CREATE TABLE IF NOT EXISTS site_counters (
      name text PRIMARY KEY,
      value bigint NOT NULL DEFAULT 0,
      updated_at timestamptz NOT NULL DEFAULT now()
    );
    INSERT INTO site_counters (name, value)
    VALUES ('github_clicks', 0)
    ON CONFLICT (name) DO NOTHING;
  `);
}

function send(res, status, body) {
  const payload = JSON.stringify(body);
  res.writeHead(status, {
    "content-type": "application/json",
    "access-control-allow-origin": "*",
    "access-control-allow-methods": "GET,POST,OPTIONS",
    "access-control-allow-headers": "content-type",
  });
  res.end(payload);
}

function readJson(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on("data", (chunk) => chunks.push(chunk));
    req.on("end", () => {
      try {
        const raw = Buffer.concat(chunks).toString("utf8");
        resolve(raw ? JSON.parse(raw) : {});
      } catch (error) {
        reject(error);
      }
    });
    req.on("error", reject);
  });
}

const emailOk = (email) =>
  typeof email === "string" &&
  email.length >= 3 &&
  email.length <= 255 &&
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const server = http.createServer(async (req, res) => {
  try {
    const url = new URL(req.url || "/", `http://${req.headers.host || "localhost"}`);
    const path = url.pathname.replace(/\/+$/, "") || "/";

    if (req.method === "OPTIONS") {
      return send(res, 204, {});
    }

    if (req.method === "GET" && (path === "/health" || path === "/api/public/health")) {
      await ensureSchema();
      return send(res, 200, {
        ok: true,
        service: "image-gen-api",
        db: true,
        time: new Date().toISOString(),
      });
    }

    if (req.method === "GET" && (path === "/stats" || path === "/api/public/stats")) {
      await ensureSchema();
      const result = await pool.query(`
        SELECT
          (SELECT count(*)::int FROM waitlist_signups) AS waitlist_count,
          COALESCE((SELECT value::int FROM site_counters WHERE name = 'github_clicks'), 0) AS github_clicks
      `);
      return send(res, 200, result.rows[0]);
    }

    if (req.method === "POST" && (path === "/click" || path === "/api/public/click")) {
      await ensureSchema();
      await pool.query(`
        INSERT INTO site_counters (name, value, updated_at)
        VALUES ('github_clicks', 1, now())
        ON CONFLICT (name) DO UPDATE
          SET value = site_counters.value + 1, updated_at = now()
      `);
      return send(res, 200, { ok: true });
    }

    if (req.method === "POST" && (path === "/waitlist" || path === "/api/public/waitlist")) {
      const body = await readJson(req);
      const email = String(body.email || "")
        .trim()
        .toLowerCase();
      const note =
        typeof body.note === "string" && body.note.trim()
          ? body.note.trim().slice(0, 500)
          : null;

      if (!emailOk(email)) {
        return send(res, 400, { ok: false, error: "that email doesn't look right" });
      }

      await ensureSchema();
      try {
        await pool.query(`INSERT INTO waitlist_signups (email, note) VALUES ($1, $2)`, [
          email,
          note,
        ]);
      } catch (error) {
        if (error?.code !== "23505") throw error;
      }
      return send(res, 200, { ok: true });
    }

    if (req.method === "GET" && path === "/") {
      return send(res, 200, {
        service: "image-gen-api",
        endpoints: [
          "GET /health",
          "GET /stats",
          "POST /waitlist",
          "POST /click",
          "GET|POST /api/public/*",
        ],
      });
    }

    return send(res, 404, { ok: false, error: "not found" });
  } catch (error) {
    console.error(error);
    return send(res, 500, { ok: false, error: "internal error" });
  }
});

ensureSchema()
  .then(() => {
    server.listen(port, "0.0.0.0", () => {
      console.log(`image-gen api listening on ${port}`);
    });
  })
  .catch((error) => {
    console.error("failed to init schema", error);
    process.exit(1);
  });
