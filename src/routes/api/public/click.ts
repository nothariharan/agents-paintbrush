import { createFileRoute } from "@tanstack/react-router";

import { bumpCounter } from "@/lib/db";

export const Route = createFileRoute("/api/public/click")({
  server: {
    handlers: {
      POST: async () => {
        try {
          await bumpCounter("github_clicks");
          return new Response(JSON.stringify({ ok: true }), {
            headers: { "content-type": "application/json" },
          });
        } catch (error) {
          console.error("counter bump failed", error);
          return new Response(JSON.stringify({ ok: false }), {
            status: 500,
            headers: { "content-type": "application/json" },
          });
        }
      },
    },
  },
});
