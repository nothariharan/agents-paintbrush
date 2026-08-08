import flowArt from "@/assets/flow-doodle.webp";
import problemArt from "@/assets/problem-doodle.webp";
import stickerRobot from "@/assets/sticker-robot-brush.png";
import { Reveal } from "@/components/site/reveal";
import { PaintDrip } from "@/components/site/paint";
import { BrandIcon } from "@/components/site/brand-icons";
import { DemoCompare } from "@/components/site/demo-compare";

export function Problem() {
  const notes = [
    {
      title: "vibe-coded sites look unfinished",
      body: "the layout is fine. the copy is fine. then every image slot is a grey rectangle with a mountain icon in it.",
      rotate: "-1.5deg",
      color: "bg-doodle-yellow",
    },
    {
      title: "api keys and credits are friction",
      body: "you already pay for ChatGPT. adding a second billing account just to make a hero image is silly.",
      rotate: "1.5deg",
      color: "bg-doodle-pink",
    },
    {
      title: "built-in IDE image tools are weak",
      body: "small, generic, off-brand output that you end up replacing by hand anyway.",
      rotate: "-1deg",
      color: "bg-doodle-blue",
    },
  ];

  return (
    <>
      <PaintDrip from="paper" to="pink" />
      <section id="why" className="bg-doodle-pink/70">
        <div className="mx-auto max-w-6xl px-5 py-16 md:py-24">
          <div className="grid items-center gap-10 md:grid-cols-[1.05fr_0.95fr]">
            <Reveal>
              <p className="hand text-3xl text-ink/80">the annoying part</p>
              <h2 className="mt-2 max-w-2xl font-display text-4xl leading-[1.1] tracking-tight sm:text-5xl">
                your agent can write the whole site. it just{" "}
                <span className="marker-pink marker">can&apos;t draw</span>.
              </h2>
              <p className="mt-4 max-w-xl font-mono text-sm leading-relaxed text-ink/75 sm:text-base">
                everything ships except the pictures. so the page that was 90% done stays 90% done.
              </p>
            </Reveal>
            <Reveal from="right" delay={80}>
              <div className="relative">
                <span className="washi left-6 top-3 -rotate-3" aria-hidden />
                <img
                  src={problemArt}
                  alt="Colourful doodle of a grumpy robot in front of a wireframe website where every image slot is an empty box"
                  width={1200}
                  height={912}
                  loading="lazy"
                  decoding="async"
                  className="w-full rounded-2xl border border-ink/15 bg-card shadow-[0_16px_40px_oklch(0.35_0.02_260/0.1)]"
                />
              </div>
            </Reveal>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {notes.map((n, i) => (
              <Reveal key={n.title} delay={i * 110} from="scale">
                <div
                  className={`sticky-note p-5 ${n.color}`}
                  style={{ transform: `rotate(${n.rotate})` }}
                >
                  <h3 className="font-display text-2xl leading-snug">{n.title}</h3>
                  <p className="mt-2 font-mono text-xs leading-relaxed text-ink/75 sm:text-sm">
                    {n.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export function Solution() {
  const steps = [
    {
      n: "01",
      title: "your agent calls the MCP",
      body: "one tool: generate_image. prompt in, file path out.",
      color: "bg-doodle-mint/80",
    },
    {
      n: "02",
      title: "ChatGPT paints it",
      body: "a real browser drives your already-logged-in ChatGPT session. no API key involved.",
      color: "bg-doodle-yellow/90",
    },
    {
      n: "03",
      title: "the PNG lands in your repo",
      body: "downloaded into assets/ or public/, then your agent wires it into the page.",
      color: "bg-doodle-coral/80",
    },
  ];

  return (
    <section className="relative bg-paper/40">
      <div className="mx-auto max-w-6xl px-5 py-16 md:py-24">
        <Reveal>
          <div className="flex flex-wrap items-end gap-4">
            <div>
              <p className="hand text-3xl text-ink/80">the fix</p>
              <h2 className="mt-2 font-display text-4xl leading-[1.1] tracking-tight sm:text-5xl">
                three steps, <span className="marker">no keys</span>.
              </h2>
            </div>
            <img
              src={stickerRobot}
              alt=""
              width={96}
              height={96}
              className="bob ml-auto hidden h-20 w-20 drop-shadow-md sm:block"
              aria-hidden
            />
          </div>
        </Reveal>
        <Reveal delay={90} from="scale">
          <img
            src={flowArt}
            alt="Colourful doodle flow: an agent, a plug, a chat window painting, and a PNG file dropping into a folder"
            width={1600}
            height={608}
            loading="lazy"
            decoding="async"
            className="mx-auto mt-8 w-full max-w-4xl rounded-2xl border border-ink/10"
          />
        </Reveal>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 120}>
              <div
                className={`ink-box flex h-full flex-col gap-3 p-5 ${s.color}`}
                style={{ transform: `rotate(${i % 2 ? 0.8 : -0.8}deg)` }}
              >
                <span className="font-mono text-xs tracking-widest text-ink/55">{s.n}</span>
                <h3 className="font-display text-2xl leading-snug">{s.title}</h3>
                <p className="font-mono text-xs leading-relaxed text-ink/75 sm:text-sm">{s.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function DemoStory() {
  return (
    <section className="bg-paper/30">
      <div className="mx-auto max-w-6xl px-5 py-16 md:py-24">
        <Reveal>
          <p className="hand text-3xl text-ink/80">a real run</p>
          <h2 className="mt-2 max-w-2xl font-display text-4xl leading-[1.1] tracking-tight sm:text-5xl">
            svg placeholders in → <em className="not-italic text-[oklch(0.68_0.14_350)]">generated pngs</em> out.
          </h2>
          <p className="mt-4 max-w-2xl font-mono text-sm leading-relaxed text-ink/75">
            terra ceramics was vibe-coded in one sitting. without image-gen, every product card is
            just a dashed SVG. register the MCP, call{" "}
            <span className="rounded bg-doodle-mint/60 px-1.5 py-0.5 text-xs">generate_image</span>,
            and the same agent drops real product shots into{" "}
            <span className="rounded bg-doodle-yellow/70 px-1.5 py-0.5 text-xs">public/</span> and
            wires them in. drag the slider — or flip before / after — to see the mechanism.
          </p>
        </Reveal>
        <Reveal delay={80}>
          <DemoCompare />
        </Reveal>
      </div>
    </section>
  );
}

export function WorksWith() {
  const clients = [
    { name: "cursor", icon: "cursor", color: "bg-doodle-yellow/80" },
    { name: "claude code", icon: "claudecode", color: "bg-doodle-coral/80" },
    { name: "vs code", icon: "vscode", color: "bg-doodle-blue/80" },
    { name: "antigravity", icon: "antigravity", color: "bg-doodle-mint/80" },
    { name: "opencode", icon: "opencode", color: "bg-doodle-purple/80" },
    { name: "windsurf", icon: "windsurf", color: "bg-doodle-pink/80" },
    { name: "zed", icon: "zed", color: "bg-doodle-blue/80" },
    { name: "jetbrains", icon: "jetbrains", color: "bg-doodle-yellow/80" },
    { name: "neovim", icon: "neovim", color: "bg-doodle-mint/80" },
    { name: "cline", icon: "cline", color: "bg-doodle-purple/80" },
    { name: "trae", icon: "trae", color: "bg-doodle-coral/80" },
    { name: "warp", icon: "warp", color: "bg-doodle-pink/80" },
  ];
  return (
    <section className="border-t border-ink/10 bg-paper-deep/60">
      <div className="mx-auto max-w-6xl px-5 py-12">
        <Reveal>
          <div className="flex flex-wrap items-end gap-x-4 gap-y-1">
            <p className="hand text-3xl text-ink/80">workspace</p>
            <p className="font-mono text-xs text-ink/65 sm:text-sm">
              register it once — it shows up wherever MCP does.
            </p>
          </div>
        </Reveal>
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {clients.map((c, i) => (
            <Reveal key={c.name} delay={Math.min(i, 6) * 60} from="scale">
              <div
                className={`ink-box flex h-full flex-col items-center justify-center gap-3 px-3 py-5 text-ink ${c.color}`}
                style={{ transform: `rotate(${i % 2 ? 1 : -1}deg)` }}
                title={c.name}
              >
                <BrandIcon name={c.icon} className="h-12 w-12 shrink-0" />
                <span className="text-center font-mono text-xs leading-tight">{c.name}</span>
              </div>
            </Reveal>
          ))}
          <Reveal delay={420} from="scale">
            <div
              className="sticky-note flex h-full flex-col items-center justify-center gap-2 px-3 py-5"
              style={{ transform: "rotate(1.4deg)" }}
            >
              <span className="hand text-5xl leading-none">+</span>
              <span className="text-center font-mono text-xs leading-tight">any MCP client</span>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
