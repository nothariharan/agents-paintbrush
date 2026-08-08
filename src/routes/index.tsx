import { createFileRoute } from "@tanstack/react-router";

import { Nav, Hero } from "@/components/site/hero";
import { Problem, Solution, DemoStory, WorksWith } from "@/components/site/story";
import { HowItWorks } from "@/components/site/how";

import { Install, Faq } from "@/components/site/install";
import { FinalCta, Footer } from "@/components/site/waitlist";
import { ScrollProgress } from "@/components/site/reveal";

const title = "image-gen — a paintbrush for AI coding agents";
const description =
  "An MCP server that lets your coding agent generate images through your own ChatGPT session. No OpenAI API key — PNGs land straight in your project.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: "image-gen",
          applicationCategory: "DeveloperApplication",
          description,
          license: "https://opensource.org/licenses/MIT",
          codeRepository: "https://github.com/nothariharan/image-gen",
          operatingSystem: "Windows, macOS, Linux",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        }),
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="grain min-h-screen">
      <ScrollProgress />
      <Nav />
      <main>
        <Hero />
        <Problem />
        <Solution />
        <HowItWorks />
        <DemoStory />
        <Install />
        <WorksWith />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </div>
  );
}
