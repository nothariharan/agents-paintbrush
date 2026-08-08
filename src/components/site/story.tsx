import flowArt from "@/assets/flow-doodle.webp";
import problemArt from "@/assets/problem-doodle.webp";
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
      <PaintDrip from="mint" to="pink" />
      <section id="why" className="bg-doodle-pink">
        <div className="mx-auto max-w-6xl px-5 py-16 md:py-24">
          <div className="grid items-center gap-10 md:grid-cols-[1fr_1fr]">
            <Reveal>
              <p className="hand text-3xl text-ink">the annoying part</p>
              <h2 className="mt-2 max-w-2xl font-display text-4xl leading-tight sm:text-5xl">
                your agent can write the whole site. it just can't draw.
              </h2>
              <p className="mt-4 max-w-xl leading-relaxed font-semibold text-ink/80">
                everything ships except the pictures. so the page that was 90% done stays 90% done.
              </p>
            </Reveal>
            <Reveal from="right" delay={80}>
              <img
                src={problemArt}
                alt="Colourful doodle of a grumpy robot in front of a wireframe website where every image slot is an empty box"
                width={1200}
                height={912}
                loading="lazy"
                decoding="async"
                className="w-full"
              />
            </Reveal>
          </div>
          <div className="mt-12 grid gap-7 md:grid-cols-3">
            {notes.map((n, i) => (
              <Reveal key={n.title} delay={i * 110} from="scale">
                <div
                  className={`sticky-note p-5 ${n.color}`}
                  style={{ transform: `rotate(${n.rotate})` }}
                >
                  <h3 className="font-display text-2xl leading-snug">{n.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed font-semibold text-ink/80">{n.body}</p>
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
      n: "1",
      title: "your agent calls the MCP",
      body: "one tool: generate_image. prompt in, file path out.",
      color: "bg-doodle-mint",
    },
    {
      n: "2",
      title: "ChatGPT paints it",
      body: "a real browser drives your already-logged-in ChatGPT session. no API key involved.",
      color: "bg-doodle-yellow",
    },
    {
      n: "3",
      title: "the PNG lands in your repo",
      body: "downloaded into assets/ or public/, then your agent wires it into the page.",
      color: "bg-doodle-coral",
    },
  ];

  return (
    <section className="bg-paper">
      <div className="mx-auto max-w-6xl px-5 py-16 md:py-24">
        <Reveal>
          <p className="hand text-3xl text-ink">the fix</p>
          <h2 className="mt-2 font-display text-4xl leading-tight sm:text-5xl">
            three steps, <span className="marker">no keys</span>.
          </h2>
        </Reveal>
        <Reveal delay={90} from="scale">
          <img
            src={flowArt}
            alt="Colourful doodle flow: an agent, a plug, a chat window painting, and a PNG file dropping into a folder"
            width={1600}
            height={608}
            loading="lazy"
            decoding="async"
            className="mx-auto mt-8 w-full max-w-4xl"
          />
        </Reveal>
        <div className="mt-8 flex flex-col items-stretch gap-6 md:flex-row">
          {steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 120} className="flex flex-1">
              <div className={`ink-box flex h-full flex-col gap-3 p-5 ${s.color}`}>
                <span className="font-display text-5xl leading-none">{s.n}</span>
                <h3 className="font-display text-2xl leading-snug">{s.title}</h3>
                <p className="text-sm leading-relaxed font-semibold text-ink/80">{s.body}</p>
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
    <section className="bg-paper">
      <div className="mx-auto max-w-6xl px-5 py-16 md:py-24">
        <Reveal>
          <p className="hand text-3xl text-ink">a real run</p>
          <h2 className="mt-2 max-w-2xl font-display text-4xl leading-tight sm:text-5xl">
            svg placeholders in → generated pngs out.
          </h2>
          <p className="mt-4 max-w-2xl leading-relaxed font-semibold text-ink/80">
            terra ceramics was vibe-coded in one sitting. without image-gen, every product card is
            just a dashed SVG. register the MCP, call{" "}
            <span className="font-mono text-sm">generate_image</span>, and the same agent drops
            real product shots into <span className="font-mono text-sm">public/</span> and wires
            them in. drag the slider — or flip before / after — to see the mechanism.
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
    { name: "cursor", icon: "cursor", color: "bg-doodle-yellow" },
    { name: "claude code", icon: "claudecode", color: "bg-doodle-coral" },
    { name: "vs code", icon: "vscode", color: "bg-doodle-blue" },
    { name: "antigravity", icon: "antigravity", color: "bg-doodle-mint" },
    { name: "opencode", icon: "opencode", color: "bg-doodle-purple" },
    { name: "windsurf", icon: "windsurf", color: "bg-doodle-pink" },
    { name: "zed", icon: "zed", color: "bg-doodle-blue" },
    { name: "jetbrains", icon: "jetbrains", color: "bg-doodle-yellow" },
    { name: "neovim", icon: "neovim", color: "bg-doodle-mint" },
    { name: "cline", icon: "cline", color: "bg-doodle-purple" },
    { name: "trae", icon: "trae", color: "bg-doodle-coral" },
    { name: "warp", icon: "warp", color: "bg-doodle-pink" },
  ];
  return (
    <section className="border-t-[3px] border-ink bg-paper-deep">
      <div className="mx-auto max-w-6xl px-5 py-12">
        <Reveal>
          <div className="flex flex-wrap items-end gap-x-4 gap-y-1">
            <p className="hand text-3xl text-ink">workspace</p>
            <p className="text-sm font-bold text-ink/70">
              register it once — it shows up wherever MCP does.
            </p>
          </div>
        </Reveal>
        <div className="mt-8 grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {clients.map((c, i) => (
            <Reveal key={c.name} delay={Math.min(i, 6) * 60} from="scale">
              <div
                className={`ink-box flex h-full flex-col items-center justify-center gap-3 px-3 py-6 text-ink ${c.color}`}
                style={{ transform: `rotate(${i % 2 ? 1.2 : -1.2}deg)` }}
                title={c.name}
              >
                <BrandIcon name={c.icon} className="h-14 w-14 shrink-0" />
                <span className="text-center text-sm leading-tight font-extrabold">{c.name}</span>
              </div>
            </Reveal>
          ))}
          <Reveal delay={420} from="scale">
            <div
              className="sticky-note flex h-full flex-col items-center justify-center gap-2 px-3 py-6"
              style={{ transform: "rotate(1.6deg)" }}
            >
              <span className="hand text-5xl leading-none">+</span>
              <span className="text-center text-sm leading-tight font-extrabold">
                any MCP client
              </span>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

