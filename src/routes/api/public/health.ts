import { createFileRoute } from "@tanstack/react-router";

import { ensureSchema } from "@/lib/db";

export const Route = createFileRoute("/api/public/health")({
  server: {
    handlers: {
      GET: async () => {
        let db = false;
        try {
          await ensureSchema();
          db = true;
        } catch (error) {
          console.error("health db check failed", error);
        }

        return new Response(
          JSON.stringify({
            ok: true,
            service: "image-gen-api",
            db,
            time: new Date().toISOString(),
          }),
          {
            status: db ? 200 : 503,
            headers: { "content-type": "application/json" },
          },
        );
      },
    },
  },
});
