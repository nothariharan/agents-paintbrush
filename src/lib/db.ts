import { Pool, type Pool as PoolType } from "pg";

let pool: PoolType | undefined;
let schemaReady: Promise<void> | undefined;

function getDatabaseUrl() {
  const url = process.env["DATABASE_URL"] ?? process.env["db_connectionString"];
  if (!url) {
    throw new Error("Missing DATABASE_URL (Zerops Postgres connection string)");
  }
  return url;
}

export function getPool() {
  if (!pool) {
    pool = new Pool({
      connectionString: getDatabaseUrl(),
      ssl: process.env["DATABASE_SSL"] === "true" ? { rejectUnauthorized: false } : undefined,
      max: 10,
    });
  }
  return pool;
}

const SCHEMA_SQL = `
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
`;

export async function ensureSchema() {
  if (!schemaReady) {
    schemaReady = (async () => {
      const client = await getPool().connect();
      try {
        await client.query(`CREATE EXTENSION IF NOT EXISTS pgcrypto`);
        await client.query(SCHEMA_SQL);
      } finally {
        client.release();
      }
    })().catch((error) => {
      schemaReady = undefined;
      throw error;
    });
  }
  return schemaReady;
}

export async function insertWaitlist(email: string, note: string | null) {
  await ensureSchema();
  try {
    await getPool().query(
      `INSERT INTO waitlist_signups (email, note) VALUES ($1, $2)`,
      [email, note],
    );
    return { ok: true as const, duplicate: false };
  } catch (error) {
    if (error && typeof error === "object" && "code" in error && error.code === "23505") {
      return { ok: true as const, duplicate: true };
    }
    throw error;
  }
}

export async function getSiteStats() {
  await ensureSchema();
  const result = await getPool().query<{ waitlist_count: string; github_clicks: string }>(`
    SELECT
      (SELECT count(*)::text FROM waitlist_signups) AS waitlist_count,
      COALESCE((SELECT value::text FROM site_counters WHERE name = 'github_clicks'), '0') AS github_clicks
  `);
  const row = result.rows[0];
  return {
    waitlist_count: Number(row?.waitlist_count ?? 0),
    github_clicks: Number(row?.github_clicks ?? 0),
  };
}

export async function bumpCounter(name: string) {
  await ensureSchema();
  const result = await getPool().query<{ value: string }>(
    `
    INSERT INTO site_counters (name, value, updated_at)
    VALUES ($1, 1, now())
    ON CONFLICT (name) DO UPDATE
      SET value = site_counters.value + 1, updated_at = now()
    RETURNING value::text
    `,
    [name],
  );
  return Number(result.rows[0]?.value ?? 0);
}
