import { createFileRoute } from "@tanstack/react-router";

import { getSiteStats } from "@/lib/db";

export const Route = createFileRoute("/api/public/stats")({
  server: {
    handlers: {
      GET: async () => {
        try {
          const data = await getSiteStats();
          return new Response(JSON.stringify(data), {
            headers: {
              "content-type": "application/json",
              "cache-control": "public, max-age=60",
            },
          });
        } catch (error) {
          console.error("stats failed", error);
          return new Response(JSON.stringify({ waitlist_count: 0, github_clicks: 0 }), {
            headers: { "content-type": "application/json" },
          });
        }
      },
    },
  },
});
