import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

import { insertWaitlist } from "@/lib/db";

const schema = z.object({
  email: z.string().trim().email().max(255),
  note: z.string().trim().max(500).nullish(),
});

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" },
  });
}

export const Route = createFileRoute("/api/public/waitlist")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let payload: unknown;
        try {
          payload = await request.json();
        } catch {
          return json({ ok: false, error: "invalid json" }, 400);
        }

        const parsed = schema.safeParse(payload);
        if (!parsed.success) {
          return json({ ok: false, error: "that email doesn't look right" }, 400);
        }

        try {
          await insertWaitlist(parsed.data.email.toLowerCase(), parsed.data.note ?? null);
          return json({ ok: true });
        } catch (error) {
          console.error("waitlist insert failed", error);
          return json({ ok: false, error: "couldn't save that, try again" }, 500);
        }
      },
    },
  },
});
