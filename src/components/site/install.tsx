import { useState } from "react";

import installArt from "@/assets/install-doodle.webp";
import { Reveal } from "@/components/site/reveal";
import { PaintDrip } from "@/components/site/paint";
import { CodeCard, JsonBlock, ShellLine } from "@/components/site/code";

const steps = [
  {
    label: "clone it",
    cmd: "git clone https://github.com/nothariharan/image-gen.git",
  },
  { label: "install deps", cmd: "npm install" },
  { label: "log into ChatGPT once", cmd: "npm run login" },
];

const mcpConfig = `{
  "mcpServers": {
    "image-gen": {
      "command": "node",
      "args": ["/absolute/path/to/image-gen/mcp-server.mjs"]
    }
  }
}`;

function CopyButton({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      onClick={() => {
        void navigator.clipboard.writeText(value).then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 1600);
        });
      }}
      aria-label={`copy: ${value}`}
      className="hand shrink-0 rounded-md border border-ink/50 bg-doodle-yellow px-3 py-1 text-xl leading-none shadow-sm transition-transform hover:-translate-y-0.5"
    >
      {copied ? "copied!" : "copy"}
    </button>
  );
}

export function Install() {
  return (
    <>
      <PaintDrip from="paper" to="yellow" />
      <section id="install" className="bg-doodle-yellow/80">
        <div className="mx-auto max-w-6xl px-5 py-16 md:py-24">
          <Reveal>
            <p className="hand text-3xl text-ink/80">install</p>
            <h2 className="mt-2 font-display text-4xl leading-[1.1] tracking-tight sm:text-5xl">
              four steps and your agent has a brush.
            </h2>
          </Reveal>
          <Reveal delay={90} from="scale">
            <img
              src={installArt}
              alt="Colourful doodle terminal window with a robot hand typing commands next to a paint palette"
              width={1408}
              height={768}
              loading="lazy"
              decoding="async"
              className="mx-auto mt-8 w-full max-w-3xl rounded-2xl border border-ink/10 shadow-[0_14px_36px_oklch(0.35_0.02_260/0.1)]"
            />
          </Reveal>

          <ol className="mt-10 space-y-7">
            {steps.map((s, i) => (
              <li key={s.cmd} className="flex flex-col gap-2">
                <span className="font-mono text-sm text-ink/80">
                  <span className="hand mr-2 text-2xl text-ink">{i + 1}.</span>
                  {s.label}
                </span>
                <CodeCard label="terminal" action={<CopyButton value={s.cmd} />}>
                  <ShellLine value={s.cmd} />
                </CodeCard>
              </li>
            ))}
            <li className="flex flex-col gap-2">
              <span className="font-mono text-sm text-ink/80">
                <span className="hand mr-2 text-2xl text-ink">4.</span>
                register the MCP server in cursor or claude code, pointing at{" "}
                <span className="rounded bg-paper/70 px-1">mcp-server.mjs</span>
              </span>
              <CodeCard label="mcp.json" multiline action={<CopyButton value={mcpConfig} />}>
                <JsonBlock value={mcpConfig} />
              </CodeCard>
            </li>
          </ol>


          <p className="mt-8 max-w-2xl font-mono text-sm leading-relaxed text-ink/75">
            then ask your agent for a hero image. it calls{" "}
            <span className="rounded bg-paper/70 px-1">generate_image</span>, ChatGPT paints, and
            the PNG shows up in your project. deploying this marketing site yourself? there&apos;s a{" "}
            <span className="text-ink">Deploy on Zerops</span> guide in{" "}
            <span className="rounded bg-paper/70 px-1">DEPLOY_ZEROPS.md</span> covering the web, api
            and postgres services.
          </p>
        </div>
      </section>
    </>
  );
}

const faqs = [
  {
    q: "do i need an OpenAI API key?",
    a: "no. that's the whole point. image-gen drives your existing ChatGPT session in a browser, so image generation comes out of the plan you already pay for.",
  },
  {
    q: "does it work on the free ChatGPT plan?",
    a: "if your account can generate images in the ChatGPT web UI, image-gen can drive it. free accounts hit image limits faster, so expect to wait on the composer more often.",
  },
  {
    q: "will it take over the browser i'm using?",
    a: "no. it launches Microsoft Edge with its own dedicated profile over CDP. your normal windows, tabs and logins are untouched.",
  },
  {
    q: "what happens if my agent fires off five images at once?",
    a: "they get queued and run one at a time. parallel prompts would otherwise scramble the ChatGPT composer and you'd get half-typed prompts and missing files.",
  },
  {
    q: "is this slower than the API?",
    a: "yes, honestly. you're paying for a real browser round-trip, one image at a time, plus a one-time login. in exchange you skip API keys, credits and a second bill.",
  },
  {
    q: "is this okay to use?",
    a: "treat it as a personal-use developer tool driving your own logged-in session — you're responsible for staying within OpenAI's terms for your account. it's MIT licensed and not affiliated with OpenAI.",
  },
];

const faqTones = [
  "bg-doodle-mint/80",
  "bg-doodle-pink/80",
  "bg-doodle-blue/80",
  "bg-doodle-purple/80",
  "bg-doodle-coral/80",
  "bg-doodle-yellow/90",
];

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="bg-paper/50">
      <div className="mx-auto max-w-3xl px-5 py-16 md:py-24">
        <Reveal>
          <p className="hand text-3xl text-ink/80">questions</p>
          <h2 className="mt-2 font-display text-4xl leading-[1.1] tracking-tight sm:text-5xl">
            the honest answers.
          </h2>
        </Reveal>
        <div className="mt-8 space-y-4">
          {faqs.map((f, i) => (
            <Reveal key={f.q} delay={Math.min(i, 3) * 80}>
              <div className={`ink-box overflow-hidden ${faqTones[i % faqTones.length]}`}>
                <button
                  type="button"
                  onClick={() => setOpen(open === i ? null : i)}
                  aria-expanded={open === i}
                  className="flex w-full items-center gap-3 p-4 text-left font-display text-2xl"
                >
                  {f.q}
                  <span className="hand ml-auto text-3xl">{open === i ? "–" : "+"}</span>
                </button>
                {open === i && (
                  <p className="border-t border-dashed border-ink/25 bg-paper/90 p-4 font-mono text-sm leading-relaxed text-ink/75">
                    {f.a}
                  </p>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
