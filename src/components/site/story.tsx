import sadCloud from "@/assets/problem-sad-cloud.webp";
import illustWireframe from "@/assets/problem-illust-wireframe.webp";
import illustPayment from "@/assets/problem-illust-payment.webp";
import illustAiTool from "@/assets/problem-illust-ai-tool.webp";
import illustContext from "@/assets/problem-illust-context.webp";
import fixHappyCloud from "@/assets/fix-happy-cloud.webp";
import fixRobotHead from "@/assets/fix-robot-head.webp";
import fixPalette from "@/assets/fix-palette.webp";
import fixPngDownload from "@/assets/fix-png-download.webp";
import { Reveal } from "@/components/site/reveal";
import { PaintDrip, SECTION } from "@/components/site/paint";
import { BrandIcon } from "@/components/site/brand-icons";
import { DemoCompare } from "@/components/site/demo-compare";

function SadFace({ className, fill }: { className?: string; fill: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden>
      <circle cx="16" cy="16" r="14" fill={fill} stroke="var(--ink)" strokeWidth="2" />
      <circle cx="11.5" cy="13" r="1.6" fill="var(--ink)" />
      <circle cx="20.5" cy="13" r="1.6" fill="var(--ink)" />
      <path
        d="M11 21c1.8-2.2 8.2-2.2 10 0"
        fill="none"
        stroke="var(--ink)"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function DoodleAccent({ kind }: { kind: "flower" | "scribble" | "star" | "swirl" }) {
  if (kind === "flower") {
    return (
      <svg viewBox="0 0 28 28" className="h-6 w-6 text-[oklch(0.78_0.12_350)]" aria-hidden>
        <circle cx="14" cy="8" r="4" fill="currentColor" stroke="var(--ink)" strokeWidth="1.4" />
        <circle cx="8" cy="14" r="4" fill="currentColor" stroke="var(--ink)" strokeWidth="1.4" />
        <circle cx="20" cy="14" r="4" fill="currentColor" stroke="var(--ink)" strokeWidth="1.4" />
        <circle cx="14" cy="20" r="4" fill="currentColor" stroke="var(--ink)" strokeWidth="1.4" />
        <circle cx="14" cy="14" r="3" fill="#f4cd4f" stroke="var(--ink)" strokeWidth="1.4" />
      </svg>
    );
  }
  if (kind === "scribble") {
    return (
      <svg viewBox="0 0 36 24" className="h-5 w-8 text-ink/55" aria-hidden>
        <path
          d="M3 12c4-8 8 8 12 0s8 8 12 0 6-6 6-6"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    );
  }
  if (kind === "star") {
    return (
      <svg viewBox="0 0 28 28" className="h-6 w-6 text-[oklch(0.78_0.1_240)]" aria-hidden>
        <path
          d="M14 3l2.4 7.2H24l-6 4.4 2.3 7.2L14 17.6 7.7 21.8 10 14.6 4 10.2h7.6L14 3z"
          fill="currentColor"
          stroke="var(--ink)"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 28 28" className="h-6 w-6 text-[oklch(0.72_0.12_150)]" aria-hidden>
      <path
        d="M20 8c-6-4-12 2-8 8s10 2 8-4-8-6-10-2"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

const PROBLEM_CARDS = [
  {
    n: "1",
    title: "vibe-coded sites look unfinished",
    body: "the layout is fine. the copy is fine. then every image slot is a grey rectangle with a mountain icon in it.",
    note: "looks empty. feels half-done.",
    illust: illustWireframe,
    alt: "Doodle of a website wireframe full of empty image placeholders",
    accent: "flower" as const,
    face: "#f4cd4f",
    marker: "bg-[oklch(0.94_0.09_95)]",
    noteBg: "bg-[oklch(0.96_0.06_95)]",
    tape: "bg-[oklch(0.86_0.08_350)]",
    ring: "bg-[oklch(0.94_0.09_95)]",
    rotate: "-0.8deg",
  },
  {
    n: "2",
    title: "api keys and credits are friction",
    body: "you already pay for ChatGPT. adding a second billing account just to make a hero image is silly.",
    note: "extra signup. extra billing. no thanks.",
    illust: illustPayment,
    alt: "Doodle of an Add payment method dialog asking for card details",
    accent: "scribble" as const,
    face: "#f4a7b9",
    marker: "bg-[oklch(0.9_0.08_350)]",
    noteBg: "bg-[oklch(0.93_0.05_350)]",
    tape: "bg-[oklch(0.86_0.08_160)]",
    ring: "bg-[oklch(0.9_0.08_350)]",
    rotate: "0.9deg",
  },
  {
    n: "3",
    title: "built-in IDE image tools are weak",
    body: "small, generic, off-brand output that you end up replacing by hand anyway.",
    note: "close, but not what i wanted.",
    illust: illustAiTool,
    alt: "Doodle of a weak AI Image tool returning generic mug thumbnails",
    accent: "star" as const,
    face: "#7dce9a",
    marker: "bg-[oklch(0.9_0.07_160)]",
    noteBg: "bg-[oklch(0.93_0.05_160)]",
    tape: "bg-[oklch(0.86_0.07_300)]",
    ring: "bg-[oklch(0.9_0.07_160)]",
    rotate: "-0.6deg",
  },
  {
    n: "4",
    title: "context switching kills flow",
    body: "leave your agent, open a tool, make the image, download it, drop it in, update the path…",
    note: "too many steps. breaks momentum.",
    illust: illustContext,
    alt: "Doodle flowchart of jumping between agent, ChatGPT, download, folder, path, and browser",
    accent: "swirl" as const,
    face: "#c4a8e8",
    marker: "bg-[oklch(0.9_0.06_300)]",
    noteBg: "bg-[oklch(0.93_0.04_300)]",
    tape: "bg-[oklch(0.94_0.09_95)]",
    ring: "bg-[oklch(0.9_0.06_300)]",
    rotate: "0.7deg",
  },
];

export function Problem() {
  return (
    <section id="why" className="relative" style={{ backgroundColor: SECTION.paper }}>
      <div className="mx-auto max-w-6xl px-5 py-16 md:py-24">
        <Reveal>
          <div className="relative mx-auto max-w-3xl text-center">
            <img
              src={sadCloud}
              alt=""
              width={160}
              height={120}
              className="pointer-events-none absolute -left-2 top-8 hidden w-20 drop-shadow-sm sm:block md:-left-10 md:w-28"
              aria-hidden
            />
            <svg
              viewBox="0 0 40 40"
              className="pointer-events-none absolute -right-1 top-10 hidden h-12 w-12 text-[oklch(0.72_0.12_150)] sm:block md:-right-8"
              aria-hidden
            >
              <path
                d="M28 10c-8-6-18 4-12 12s16 2 12-6-12-8-14-2"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.6"
                strokeLinecap="round"
              />
            </svg>

            <p className="mx-auto inline-block rounded-full border border-ink/40 bg-[oklch(0.92_0.05_350)] px-4 py-1 font-mono text-xs tracking-wide text-ink sm:text-sm">
              the annoying part
            </p>
            <h2 className="mt-5 font-display text-4xl leading-[1.12] tracking-tight text-ink sm:text-5xl md:text-[3.35rem]">
              your agent can write the whole site. it just can&apos;t{" "}
              <span className="relative inline-block">
                <span className="hand text-[1.05em] text-[oklch(0.68_0.16_350)]">draw.</span>
                <svg
                  className="absolute -right-5 top-1 h-7 w-5 text-[oklch(0.68_0.16_350)]"
                  viewBox="0 0 16 28"
                  fill="none"
                  aria-hidden
                >
                  <path d="M3 4c4 1 8 2 10 3M2 12c5 1 9 2 11 3M3 20c4 1 8 2 10 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl font-mono text-sm leading-relaxed text-ink/70 sm:text-base">
              everything ships except the pictures. so the page that was{" "}
              <span className="underline decoration-[oklch(0.72_0.12_150)] decoration-2 underline-offset-4">
                90% done
              </span>{" "}
              <span className="underline decoration-[oklch(0.72_0.12_150)] decoration-2 underline-offset-4">
                stays 90% done
              </span>
              .
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {PROBLEM_CARDS.map((card, i) => (
            <Reveal key={card.n} delay={i * 90} from="scale">
              <article
                className="relative flex h-full flex-col rounded-2xl border border-ink/30 bg-[#faf7f0] p-4 shadow-[0_10px_28px_oklch(0.35_0.02_260/0.07)]"
                style={{ transform: `rotate(${card.rotate})` }}
              >
                <div className="absolute top-3 right-3 opacity-80" aria-hidden>
                  <DoodleAccent kind={card.accent} />
                </div>

                <div className="flex items-start gap-2.5 pr-6">
                  <span
                    className={`grid h-8 w-8 shrink-0 place-items-center rounded-full border border-ink/40 font-mono text-sm font-medium ${card.ring}`}
                  >
                    {card.n}
                  </span>
                  <h3 className="font-display text-xl leading-snug tracking-tight">
                    <span className={`box-decoration-clone rounded-sm px-1 ${card.marker}`}>
                      {card.title}
                    </span>
                  </h3>
                </div>

                <p className="mt-3 font-mono text-[11px] leading-relaxed text-ink/70 sm:text-xs">
                  {card.body}
                </p>

                <div className="mt-4 overflow-hidden rounded-xl border border-ink/15 bg-[#f3efe6]">
                  <img
                    src={card.illust}
                    alt={card.alt}
                    width={640}
                    height={480}
                    loading="lazy"
                    decoding="async"
                    className="aspect-[4/3] w-full object-contain p-2"
                  />
                </div>

                <div className="relative mt-5 min-h-[4.5rem] flex-1">
                  <div
                    className={`absolute right-1 bottom-7 w-[88%] rotate-[-3deg] border border-ink/25 ${card.noteBg} px-3 py-2 shadow-sm`}
                  >
                    <span
                      className={`absolute -top-1.5 left-1/2 h-2.5 w-10 -translate-x-1/2 -rotate-2 rounded-sm ${card.tape}`}
                      aria-hidden
                    />
                    <p className="font-mono text-[10px] leading-snug text-ink/80 sm:text-[11px]">
                      {card.note}
                    </p>
                  </div>
                  <SadFace
                    className="absolute right-0 bottom-0 h-8 w-8 drop-shadow-sm"
                    fill={card.face}
                  />
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

const FIX_STEPS = [
  {
    n: "01",
    title: "your agent calls the MCP",
    body: "one tool: generate_image. prompt in, file path out.",
    sticker: fixRobotHead,
    stickerAlt: "Cute mint robot head sticker",
    bg: "bg-[oklch(0.92_0.06_160)]",
    underline: "text-[oklch(0.72_0.12_150)]",
    star: "text-[oklch(0.72_0.12_150)]",
    rotate: "-1deg",
    stickerSide: "left" as const,
  },
  {
    n: "02",
    title: "ChatGPT paints it",
    body: "a real browser drives your already-logged-in ChatGPT session. no API key involved.",
    sticker: fixPalette,
    stickerAlt: "Paint palette and brush sticker",
    bg: "bg-[oklch(0.95_0.08_95)]",
    underline: "text-[oklch(0.82_0.14_95)]",
    star: "text-[oklch(0.82_0.14_95)]",
    rotate: "0.8deg",
    stickerSide: "right" as const,
  },
  {
    n: "03",
    title: "the PNG lands in your repo",
    body: "downloaded into assets/ or public/, then your agent wires it into the page.",
    sticker: fixPngDownload,
    stickerAlt: "Downloaded landscape image sticker",
    bg: "bg-[oklch(0.92_0.05_25)]",
    underline: "text-[oklch(0.72_0.14_25)]",
    star: "text-[oklch(0.72_0.14_350)]",
    rotate: "-0.6deg",
    stickerSide: "right" as const,
  },
];

function FixStar({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path
        d="M12 2l1.8 6.2H20l-5 3.6 1.9 6.2L12 14.8 7.1 18l1.9-6.2-5-3.6h6.2L12 2z"
        fill="currentColor"
        stroke="var(--ink)"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function FixPath() {
  return (
    <svg
      viewBox="0 0 1000 160"
      preserveAspectRatio="none"
      className="pointer-events-none absolute inset-x-0 top-[42%] hidden h-28 w-full md:block"
      aria-hidden
    >
      <path
        d="M20 90 C120 40, 220 140, 340 80 S520 20, 660 95 S820 150, 960 70"
        fill="none"
        stroke="oklch(0.82 0.09 300)"
        strokeWidth="22"
        strokeLinecap="round"
      />
      <path
        d="M20 90 C120 40, 220 140, 340 80 S520 20, 660 95 S820 150, 960 70"
        fill="none"
        stroke="var(--ink)"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <circle cx="20" cy="90" r="8" fill="var(--ink)" />
      <path
        d="M940 52 l28 20 -34 6"
        fill="none"
        stroke="var(--ink)"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Solution() {
  return (
    <section className="relative overflow-hidden" style={{ backgroundColor: SECTION.paper }}>
      <div className="mx-auto max-w-6xl px-5 py-16 md:py-24">
        <Reveal>
          <div className="flex flex-wrap items-start justify-between gap-6">
            <div>
              <p className="hand text-3xl text-ink/80">the fix</p>
              <h2 className="mt-2 max-w-xl font-display text-4xl leading-[1.1] tracking-tight sm:text-5xl">
                three steps,{" "}
                <span className="rounded-full bg-[oklch(0.9_0.06_300)] px-3 py-0.5">no keys</span>
                ..
              </h2>
            </div>
            <div className="relative mr-2 hidden shrink-0 sm:block">
              <img
                src={fixHappyCloud}
                alt=""
                width={140}
                height={100}
                className="bob h-20 w-auto drop-shadow-sm md:h-24"
                aria-hidden
              />
              <p className="hand absolute -bottom-1 -left-2 rotate-[-6deg] text-xl text-[oklch(0.55_0.12_300)] md:text-2xl">
                that easy ✨
              </p>
            </div>
          </div>
        </Reveal>

        <div className="relative mt-14 md:mt-20">
          <FixPath />

          <div className="relative z-10 grid gap-10 md:grid-cols-3 md:gap-6">
            {FIX_STEPS.map((step, i) => (
              <Reveal key={step.n} delay={i * 110} from="scale">
                <div className="relative pt-10">
                  <img
                    src={step.sticker}
                    alt={step.stickerAlt}
                    width={120}
                    height={120}
                    loading="lazy"
                    decoding="async"
                    className={`pointer-events-none absolute -top-1 z-20 h-16 w-16 drop-shadow-md sm:h-20 sm:w-20 ${
                      step.stickerSide === "left" ? "left-4" : "right-4"
                    }`}
                  />
                  <FixStar
                    className={`absolute -top-2 h-5 w-5 ${step.star} ${
                      step.stickerSide === "left" ? "left-0" : "right-0"
                    }`}
                  />

                  <article
                    className={`relative flex h-full flex-col rounded-[1.35rem] border-[2.5px] border-ink/80 p-5 shadow-[0_10px_28px_oklch(0.35_0.02_260/0.08)] ${step.bg}`}
                    style={{ transform: `rotate(${step.rotate})` }}
                  >
                    <span className="grid h-9 w-9 place-items-center rounded-full bg-ink font-mono text-xs font-medium text-paper">
                      {step.n}
                    </span>
                    <h3 className="mt-3 font-display text-2xl leading-snug tracking-tight">
                      {step.title}
                    </h3>
                    <p className="mt-2 font-mono text-xs leading-relaxed text-ink/75 sm:text-sm">
                      {step.body}
                    </p>
                  </article>

                  <svg
                    viewBox="0 0 120 16"
                    className={`mx-auto mt-2 h-4 w-28 ${step.underline}`}
                    aria-hidden
                  >
                    <path
                      d="M4 10c18-5 40-6 56-2 18 4 36 4 56 0"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal delay={200}>
          <div className="relative mx-auto mt-12 flex max-w-xl items-center justify-center">
            <FixStar className="absolute -left-2 bottom-0 hidden h-6 w-6 text-[oklch(0.7_0.1_300)] sm:block" />
            <p className="hand rounded-full border border-ink/25 bg-[oklch(0.93_0.04_70)] px-5 py-2.5 text-center text-xl text-ink sm:text-2xl">
              Tip: Works with your login, your plan, your rules.{" "}
              <span className="text-[oklch(0.68_0.16_350)]" aria-hidden>
                ♥
              </span>
            </p>
            <svg
              viewBox="0 0 28 28"
              className="absolute -right-1 bottom-0 hidden h-7 w-7 sm:block"
              aria-hidden
            >
              <circle cx="14" cy="8" r="4" fill="oklch(0.78 0.12 350)" stroke="var(--ink)" strokeWidth="1.4" />
              <circle cx="8" cy="14" r="4" fill="oklch(0.78 0.12 350)" stroke="var(--ink)" strokeWidth="1.4" />
              <circle cx="20" cy="14" r="4" fill="oklch(0.78 0.12 350)" stroke="var(--ink)" strokeWidth="1.4" />
              <circle cx="14" cy="20" r="4" fill="oklch(0.78 0.12 350)" stroke="var(--ink)" strokeWidth="1.4" />
              <circle cx="14" cy="14" r="3" fill="#f4cd4f" stroke="var(--ink)" strokeWidth="1.4" />
            </svg>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function DemoStory() {
  return (
    <section style={{ backgroundColor: SECTION.paper }}>
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
    { name: "Claude", icon: "claudecode" },
    { name: "Cursor", icon: "cursor" },
    { name: "OpenCode", icon: "opencode" },
    { name: "ChatGPT", icon: "chatgpt" },
    { name: "Windsurf", icon: "windsurf" },
  ];

  return (
    <>
      <PaintDrip from="yellow" to="workspace" />
      <section id="workspace" style={{ backgroundColor: SECTION.workspace }}>
        <div className="mx-auto max-w-4xl px-5 py-14 md:py-16">
          <Reveal>
            <div className="relative overflow-visible rounded-2xl border border-ink/25 bg-[#faf7f0] px-5 py-10 shadow-[0_12px_32px_oklch(0.35_0.02_260/0.08)] sm:px-10 sm:py-12">
              <span
                className="pointer-events-none absolute -top-2 left-6 h-3.5 w-14 -rotate-6 rounded-sm bg-[oklch(0.86_0.08_350/0.7)]"
                aria-hidden
              />
              {/* big doodle rainbow */}
              <svg
                className="pointer-events-none absolute -top-10 -right-1 h-40 w-56 sm:-top-12 sm:-right-3 sm:h-52 sm:w-72"
                viewBox="0 0 160 110"
                fill="none"
                aria-hidden
              >
                <path
                  d="M8 96c14-38 38-58 72-58s58 20 72 58"
                  stroke="#f4a7b9"
                  strokeWidth="9"
                  strokeLinecap="round"
                />
                <path
                  d="M18 96c12-32 32-48 62-48s50 16 62 48"
                  stroke="#f0b36a"
                  strokeWidth="9"
                  strokeLinecap="round"
                />
                <path
                  d="M28 96c10-26 26-38 52-38s42 12 52 38"
                  stroke="#f4cd4f"
                  strokeWidth="9"
                  strokeLinecap="round"
                />
                <path
                  d="M40 96c8-18 18-28 40-28s32 10 40 28"
                  stroke="#7dce9a"
                  strokeWidth="9"
                  strokeLinecap="round"
                />
                <path
                  d="M52 96c5-12 12-18 28-18s23 6 28 18"
                  stroke="#8ec5f0"
                  strokeWidth="9"
                  strokeLinecap="round"
                />
              </svg>

              <div className="relative z-10 text-center">
                <h2 className="font-display text-2xl tracking-tight text-ink sm:text-3xl">
                  Works with your favorite agents
                </h2>
                <svg
                  className="mx-auto mt-1 h-3 w-48 sm:w-64"
                  viewBox="0 0 200 12"
                  fill="none"
                  aria-hidden
                >
                  <path
                    d="M4 7c28-4 56-5 90-3 34 2 68 3 102 0"
                    stroke="#7dce9a"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                </svg>
                <p className="mt-2 font-mono text-xs text-ink/60">
                  register it once — it shows up wherever MCP does.
                </p>
              </div>

              <div className="relative z-10 mt-7 flex flex-wrap items-center justify-center gap-2.5 sm:gap-3">
                {clients.map((c) => (
                  <div
                    key={c.name}
                    className="inline-flex items-center gap-2 rounded-full border border-ink/30 bg-paper px-3.5 py-2 shadow-sm"
                    title={c.name}
                  >
                    <BrandIcon name={c.icon} className="h-4 w-4 shrink-0 text-ink" />
                    <span className="font-mono text-xs text-ink sm:text-sm">{c.name}</span>
                  </div>
                ))}
                <div
                  className="inline-flex items-center gap-1.5 rounded-full border border-ink/30 bg-doodle-yellow px-3.5 py-2 shadow-sm"
                  title="any MCP client"
                >
                  <span className="hand text-lg leading-none text-ink">+</span>
                  <span className="font-mono text-xs text-ink sm:text-sm">any MCP client</span>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
      <PaintDrip from="workspace" to="paper" />
    </>
  );
}
