import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import { Reveal } from "@/components/site/reveal";
import { PaintDrip } from "@/components/site/paint";

import screen1 from "@/assets/how-ui-1-register.webp";
import screen2 from "@/assets/how-ui-2-ask.webp";
import screen3 from "@/assets/how-ui-3-browser.webp";
import screen4 from "@/assets/how-ui-4-paint.webp";
import screen5 from "@/assets/how-ui-5-ship.webp";

gsap.registerPlugin(useGSAP);

type Step = {
  kicker: string;
  title: string;
  body: string;
  art: string;
  alt: string;
  tone: string;
};

const STEPS: Step[] = [
  {
    kicker: "step one",
    title: "register the MCP once",
    body: "drop image-gen into your client's MCP config. one entry, one command, and every agent in that editor can suddenly draw.",
    art: screen1,
    alt: "Cursor MCP Servers settings with image-gen enabled and mcp.json config",
    tone: "bg-doodle-yellow/90",
  },
  {
    kicker: "step two",
    title: "just ask your agent for a picture",
    body: "\"make a hero image of a ceramic mug on linen\" — no new tab, no prompt console, same conversation you were already in.",
    art: screen2,
    alt: "Agent chat panel where the user asks for a ceramic mug hero image and generate_image completes",
    tone: "bg-doodle-pink/90",
  },
  {
    kicker: "step three",
    title: "it wakes up its own browser",
    body: "image-gen drives Microsoft Edge over CDP in a dedicated profile you logged into once. your working window is never touched, and no API key exists anywhere.",
    art: screen3,
    alt: "Microsoft Edge browser window open to ChatGPT image generation",
    tone: "bg-doodle-mint/90",
  },
  {
    kicker: "step four",
    title: "ChatGPT paints it",
    body: "the prompt goes into your real ChatGPT session and the image renders there. parallel requests get queued so two prompts never scramble the composer.",
    art: screen4,
    alt: "ChatGPT UI showing a generated ceramic mug product photo",
    tone: "bg-doodle-coral/90",
  },
  {
    kicker: "step five",
    title: "the PNG lands in your repo",
    body: "the file is downloaded to the path you asked for, and generate_image hands that path back so your agent wires the image into the page itself.",
    art: screen5,
    alt: "IDE file explorer with public/speckled-mug.png selected and previewed",
    tone: "bg-doodle-purple/90",
  },
];

function ScreenFrame({ active }: { active: number }) {
  const frameRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        frameRef.current,
        { y: 6, rotate: -0.4 },
        { y: -6, rotate: 0.5, duration: 3.6, yoyo: true, repeat: -1, ease: "sine.inOut" },
      );
    },
    { scope: frameRef },
  );

  const labels = [
    "mcp settings",
    "agent chat",
    "edge · chatgpt",
    "image result",
    "png in repo",
  ] as const;

  return (
    <div ref={frameRef} className="w-full max-w-xl will-change-transform">
      {/* scrapbook paper stage — matches site doodle language */}
      <div className="relative rounded-[1.35rem] border border-ink/20 bg-[#f7f4ec] p-3 shadow-[0_18px_42px_oklch(0.35_0.02_260/0.12)] sm:p-3.5">
        <span
          className="pointer-events-none absolute left-6 top-2 h-3 w-16 -rotate-6 rounded-sm bg-[oklch(0.86_0.08_160/0.65)]"
          aria-hidden
        />
        <span
          className="pointer-events-none absolute right-10 top-3 h-3 w-12 rotate-3 rounded-sm bg-[oklch(0.88_0.08_350/0.55)]"
          aria-hidden
        />
        <div className="mb-2.5 flex items-center gap-2 px-1 pt-1">
          <span className="h-2.5 w-2.5 rounded-full border border-ink/40 bg-[#f27b7b]" />
          <span className="h-2.5 w-2.5 rounded-full border border-ink/40 bg-[#f4cd4f]" />
          <span className="h-2.5 w-2.5 rounded-full border border-ink/40 bg-[#7dce9a]" />
          <span className="ml-1 font-mono text-[10px] tracking-wide text-ink/50">
            {labels[active]}
          </span>
        </div>
        <div
          className="relative overflow-hidden rounded-[0.95rem] border border-ink/15 bg-paper"
          style={{
            aspectRatio: "4 / 3",
            backgroundImage:
              "linear-gradient(oklch(0.88 0.03 145 / 0.28) 1px, transparent 1px), linear-gradient(90deg, oklch(0.88 0.03 145 / 0.28) 1px, transparent 1px)",
            backgroundSize: "22px 22px",
          }}
        >
          {STEPS.map((s, i) => {
            // only decode nearby slides so the how section stays light
            if (Math.abs(i - active) > 1) return null;
            return (
              <img
                key={s.title}
                src={s.art}
                alt={s.alt}
                width={1280}
                height={960}
                loading={i === 0 ? "eager" : "lazy"}
                decoding="async"
                fetchPriority={i === active ? "high" : "low"}
                className={`absolute inset-0 h-full w-full object-contain p-2 transition-all duration-500 ease-out motion-reduce:transition-none sm:p-3 ${
                  i === active ? "opacity-100 scale-100" : "opacity-0 scale-[0.97]"
                }`}
                aria-hidden={i !== active}
              />
            );
          })}
        </div>
      </div>
      <p className="hand mt-3 text-center text-xl text-ink/50">
        {active + 1} of {STEPS.length}
      </p>
    </div>
  );
}

function StepList() {
  return (
    <ol className="mt-10 grid gap-6 md:hidden">
      {STEPS.map((s, i) => (
        <Reveal key={s.title} as="li" delay={i * 80}>
          <div className={`ink-box overflow-hidden ${s.tone}`}>
            <div className="p-5 pb-3">
              <p className="hand text-2xl text-ink/70">{s.kicker}</p>
              <h3 className="mt-1 font-display text-2xl leading-snug">{s.title}</h3>
            </div>
            <img
              src={s.art}
              alt={s.alt}
              width={1280}
              height={960}
              loading="lazy"
              className="w-full border-y border-ink/10 object-cover object-top"
            />
            <p className="p-5 pt-3 font-mono text-xs leading-relaxed text-ink/75 sm:text-sm">{s.body}</p>
          </div>
        </Reveal>
      ))}
    </ol>
  );
}

export function HowItWorks() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    let raf = 0;
    function update() {
      raf = 0;
      const node = trackRef.current;
      if (!node) return;
      const rect = node.getBoundingClientRect();
      const span = rect.height - window.innerHeight;
      const p = span > 0 ? Math.min(1, Math.max(0, -rect.top / span)) : 0;
      setActive(Math.min(STEPS.length - 1, Math.floor(p * STEPS.length + 0.0001)));
    }
    function onScroll() {
      if (!raf) raf = requestAnimationFrame(update);
    }
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  function jump(i: number) {
    const node = trackRef.current;
    if (!node) return;
    const span = node.offsetHeight - window.innerHeight;
    window.scrollTo({ top: node.offsetTop + (span * (i + 0.35)) / STEPS.length, behavior: "smooth" });
  }

  const step = STEPS[active]!;

  return (
    <>
      <PaintDrip from="paper" to="blue" />
      <section id="how" className="bg-[#e7f0ef]">
        <div className="mx-auto max-w-6xl px-5 pt-14 md:pt-16 md:pb-0">
          <Reveal>
            <p className="hand text-3xl text-ink/80">how it works</p>
            <h2 className="mt-2 max-w-2xl font-display text-4xl leading-[1.1] tracking-tight sm:text-5xl">
              the flow, <span className="marker">screen by screen</span>.
            </h2>
            <p className="mt-4 max-w-xl font-mono text-sm leading-relaxed text-ink/75">
              doodle-styled UI of the real path — MCP in, ChatGPT paints, PNG lands in your repo.
            </p>
          </Reveal>
        </div>

        <div className="mx-auto max-w-6xl px-5 pb-16 md:hidden">
          <StepList />
        </div>

        <div ref={trackRef} className="relative hidden md:block" style={{ height: `${STEPS.length * 80}vh` }}>
          <div className="sticky top-0 flex h-screen items-center">
            <div className="mx-auto grid w-full max-w-6xl items-center gap-10 px-5 md:grid-cols-[0.95fr_1.05fr]">
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  {STEPS.map((s, i) => (
                    <button
                      key={s.title}
                      type="button"
                      onClick={() => jump(i)}
                      aria-label={`go to ${s.title}`}
                      aria-current={i === active}
                      className={`h-3 rounded-full border border-ink/40 transition-all duration-300 ${
                        i === active ? "w-10 bg-ink" : "w-3 bg-paper hover:bg-paper-deep"
                      }`}
                    />
                  ))}
                </div>
                <div key={step.title} className="animate-[fade-in_0.4s_ease-out]">
                  <p className="hand mt-5 text-3xl text-ink/70">{step.kicker}</p>
                  <h3 className="mt-1 font-display text-4xl leading-[1.1] tracking-tight sm:text-5xl">
                    {step.title}
                  </h3>
                  <p className="mt-4 max-w-md font-mono text-sm leading-relaxed text-ink/75">{step.body}</p>
                  <span
                    className={`hand mt-6 inline-block rotate-[-2deg] rounded-md border border-ink/15 px-3 py-0.5 text-2xl shadow-sm ${step.tone}`}
                  >
                    {active + 1} of {STEPS.length}
                  </span>
                </div>
              </div>
              <div className="flex justify-center">
                <ScreenFrame active={active} />
              </div>
            </div>
          </div>
        </div>
      </section>
      <PaintDrip from="blue" to="paper" />
    </>
  );
}
