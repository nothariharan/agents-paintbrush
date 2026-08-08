import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import { Reveal } from "@/components/site/reveal";
import { PaintDrip } from "@/components/site/paint";

import screen1 from "@/assets/how-ui-1-register.png";
import screen2 from "@/assets/how-ui-2-ask.png";
import screen3 from "@/assets/how-ui-3-browser.png";
import screen4 from "@/assets/how-ui-4-paint.png";
import screen5 from "@/assets/how-ui-5-ship.png";

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
        { y: 8 },
        { y: -6, duration: 3.6, yoyo: true, repeat: -1, ease: "sine.inOut" },
      );
    },
    { scope: frameRef },
  );

  return (
    <div ref={frameRef} className="w-full max-w-xl will-change-transform">
      {/* laptop chrome */}
      <div className="overflow-hidden rounded-[1.15rem] border border-ink/20 bg-[#1c1f26] p-2 shadow-[0_22px_48px_oklch(0.3_0.02_260/0.18)] sm:p-2.5">
        <div className="mb-2 flex items-center gap-1.5 px-1">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
          <span className="ml-2 font-mono text-[10px] text-white/45">
            {active === 0 && "Cursor · MCP Servers"}
            {active === 1 && "Cursor · Agent chat"}
            {active === 2 && "Edge · chatgpt.com"}
            {active === 3 && "ChatGPT · Image"}
            {active === 4 && "IDE · public/"}
          </span>
        </div>
        <div className="relative overflow-hidden rounded-[0.75rem] bg-white" style={{ aspectRatio: "4 / 3" }}>
          {STEPS.map((s, i) => (
            <img
              key={s.title}
              src={s.art}
              alt={s.alt}
              width={1280}
              height={960}
              className={`absolute inset-0 h-full w-full object-cover object-top transition-all duration-500 ease-out motion-reduce:transition-none ${
                i === active ? "opacity-100 scale-100" : "opacity-0 scale-[0.98]"
              }`}
              aria-hidden={i !== active}
            />
          ))}
        </div>
      </div>
      <div className="mx-auto h-2.5 w-[104%] rounded-b-xl border border-ink/25 bg-[#2a2e36]" />
      <p className="hand mt-3 text-center text-lg text-ink/45">
        {active + 1} / {STEPS.length} · real flow
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
              the real screens, <span className="marker">end to end</span>.
            </h2>
            <p className="mt-4 max-w-xl font-mono text-sm leading-relaxed text-ink/75">
              from MCP settings to a PNG in your repo — what it looks like when an agent can paint.
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
