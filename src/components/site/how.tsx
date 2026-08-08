import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import { Reveal } from "@/components/site/reveal";
import { PaintDrip } from "@/components/site/paint";
import { STEP_ARTS } from "@/components/site/step-art";

gsap.registerPlugin(useGSAP);

type Step = {
  kicker: string;
  title: string;
  body: string;
  alt: string;
  tone: string;
};

const STEPS: Step[] = [
  {
    kicker: "step one",
    title: "register the MCP once",
    body: "drop image-gen into your client's MCP config. one entry, one command, and every agent in that editor can suddenly draw.",
    alt: "Editor window with a smiling plug registering image-gen in mcp.json",
    tone: "bg-doodle-yellow/90",
  },
  {
    kicker: "step two",
    title: "just ask your agent for a picture",
    body: "\"make a hero image of a ceramic mug on linen\" — no new tab, no prompt console, same conversation you were already in.",
    alt: "Developer asking a robot agent to generate a hero image in chat",
    tone: "bg-doodle-pink/90",
  },
  {
    kicker: "step three",
    title: "it wakes up its own browser",
    body: "image-gen drives Microsoft Edge over CDP in a dedicated profile you logged into once. your working window is never touched, and no API key exists anywhere.",
    alt: "Robot walking a dedicated Edge browser on a leash",
    tone: "bg-doodle-mint/90",
  },
  {
    kicker: "step four",
    title: "ChatGPT paints it",
    body: "the prompt goes into your real ChatGPT session and the image renders there. parallel requests get queued so two prompts never scramble the composer.",
    alt: "Paintbrush dripping pink paint while ChatGPT renders an image",
    tone: "bg-doodle-coral/90",
  },
  {
    kicker: "step five",
    title: "the PNG lands in your repo",
    body: "the file is downloaded to the path you asked for, and generate_image hands that path back so your agent wires the image into the page itself.",
    alt: "PNG file dropping into a public folder in the project",
    tone: "bg-doodle-purple/90",
  },
];

function Tablet({ active }: { active: number }) {
  const frameRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        frameRef.current,
        { rotate: -1.2, y: 8 },
        { rotate: 0.6, y: -6, duration: 3.2, yoyo: true, repeat: -1, ease: "sine.inOut" },
      );
    },
    { scope: frameRef },
  );

  return (
    <div ref={frameRef} className="w-full max-w-xl will-change-transform">
      <div className="rounded-[1.4rem] border-[3px] border-ink bg-ink p-2.5 shadow-[0_20px_44px_oklch(0.3_0.02_260/0.16)] sm:p-3">
        <div
          className="relative overflow-hidden rounded-[1rem] border border-ink/15 bg-paper"
          style={{ aspectRatio: "4 / 3" }}
        >
          {STEPS.map((s, i) => {
            const Art = STEP_ARTS[i]!;
            return (
              <div
                key={s.title}
                className={`absolute inset-0 transition-all duration-500 ease-out motion-reduce:transition-none ${
                  i === active ? "scale-100 opacity-100" : "scale-[0.96] opacity-0"
                }`}
                aria-hidden={i !== active}
              >
                <Art className="h-full w-full" />
              </div>
            );
          })}
          <span className="hand absolute right-3 bottom-2 rounded-md bg-paper/80 px-2 text-xl text-ink/60 backdrop-blur-sm">
            {active + 1}/{STEPS.length}
          </span>
        </div>
      </div>
      <div className="mx-auto h-3 w-[102%] rounded-b-2xl border border-ink/35 bg-paper-deep shadow-md" />
    </div>
  );
}

function StepList() {
  return (
    <ol className="mt-10 grid gap-6 md:hidden">
      {STEPS.map((s, i) => {
        const Art = STEP_ARTS[i]!;
        return (
          <Reveal key={s.title} as="li" delay={i * 80}>
            <div className={`ink-box overflow-hidden p-4 ${s.tone}`}>
              <p className="hand text-2xl text-ink/70">{s.kicker}</p>
              <h3 className="mt-1 font-display text-2xl leading-snug">{s.title}</h3>
              <div className="mt-3 overflow-hidden rounded-xl border border-ink/20 bg-paper">
                <Art className="h-auto w-full" />
              </div>
              <p className="mt-3 font-mono text-xs leading-relaxed text-ink/75 sm:text-sm">{s.body}</p>
            </div>
          </Reveal>
        );
      })}
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
      const idx = Math.min(STEPS.length - 1, Math.floor(p * STEPS.length + 0.0001));
      setActive(idx);
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
    const y = node.offsetTop + (span * (i + 0.35)) / STEPS.length;
    window.scrollTo({ top: y, behavior: "smooth" });
  }

  const step = STEPS[active]!;

  return (
    <>
      <PaintDrip from="paper" to="blue" />
      <section id="how" className="bg-[#dceaf4]">
        <div className="mx-auto max-w-6xl px-5 pt-14 md:pt-16 md:pb-0">
          <Reveal>
            <p className="hand text-3xl text-ink/80">how it works</p>
            <h2 className="mt-2 max-w-2xl font-display text-4xl leading-[1.1] tracking-tight sm:text-5xl">
              an MCP server with a <span className="marker">browser on a leash</span>.
            </h2>
            <p className="mt-4 max-w-xl font-mono text-sm leading-relaxed text-ink/75">
              scroll once — each illustration shows the next hop from config to PNG.
            </p>
          </Reveal>
        </div>

        <div className="mx-auto max-w-6xl px-5 pb-16 md:hidden">
          <StepList />
        </div>

        <div
          ref={trackRef}
          className="relative hidden md:block"
          style={{ height: `${STEPS.length * 85}vh` }}
        >
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
                      className={`h-3 rounded-full border border-ink/45 transition-all duration-300 ${
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
                  <p className="mt-4 max-w-md font-mono text-sm leading-relaxed text-ink/75">
                    {step.body}
                  </p>
                  <span
                    className={`hand mt-6 inline-block rotate-[-2deg] rounded-md border border-ink/20 px-3 py-0.5 text-2xl shadow-sm ${step.tone}`}
                  >
                    {active + 1} of {STEPS.length}
                  </span>
                </div>
              </div>
              <div className="flex justify-center">
                <Tablet active={active} />
              </div>
            </div>
          </div>
        </div>
      </section>
      <PaintDrip from="blue" to="paper" />
    </>
  );
}
