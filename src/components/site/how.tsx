import { useEffect, useRef, useState } from "react";

import stepRegister from "@/assets/step-register.webp";
import stepAsk from "@/assets/step-ask.webp";
import stepBrowser from "@/assets/step-browser.webp";
import stepPaint from "@/assets/step-paint.webp";
import stepShip from "@/assets/step-ship.webp";
import { Reveal } from "@/components/site/reveal";
import { PaintDrip } from "@/components/site/paint";

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
    art: stepRegister,
    alt: "Doodle of a code editor window with a smiling plug being plugged into a JSON config",
    tone: "bg-doodle-yellow",
  },
  {
    kicker: "step two",
    title: "just ask your agent for a picture",
    body: "\"make a hero image of a ceramic mug on linen\" — no new tab, no prompt console, same conversation you were already in.",
    art: stepAsk,
    alt: "Doodle of a person asking a friendly robot for a picture in a chat window",
    tone: "bg-doodle-pink",
  },
  {
    kicker: "step three",
    title: "it wakes up its own browser",
    body: "image-gen drives Microsoft Edge over CDP in a dedicated profile you logged into once. your working window is never touched, and no API key exists anywhere.",
    art: stepBrowser,
    alt: "Doodle of a browser window character on a leash next to a robot, already logged in",
    tone: "bg-doodle-mint",
  },
  {
    kicker: "step four",
    title: "ChatGPT paints it",
    body: "the prompt goes into your real ChatGPT session and the image renders there. parallel requests get queued so two prompts never scramble the composer.",
    art: stepPaint,
    alt: "Doodle of a paintbrush painting a colourful picture inside a browser window",
    tone: "bg-doodle-coral",
  },
  {
    kicker: "step five",
    title: "the PNG lands in your repo",
    body: "the file is downloaded to the path you asked for, and generate_image hands that path back so your agent wires the image into the page itself.",
    art: stepShip,
    alt: "Doodle of a PNG file dropping into a happy folder while a robot points at a finished page",
    tone: "bg-doodle-purple",
  },
];

/** Laptop frame with the current step's art on the screen. */
function Laptop({ active, lift }: { active: number; lift: number }) {
  return (
    <div
      className="w-full max-w-xl transition-transform duration-300 ease-out will-change-transform motion-reduce:transform-none"
      style={{ transform: `translateY(${lift}px) rotate(${-1 + lift / 120}deg)` }}
    >
      <div
        className="border-[4px] border-ink bg-ink p-2 shadow-[8px_10px_0_0_var(--ink)] sm:p-3"
        style={{ borderRadius: "22px 18px 22px 18px" }}
      >
        <div
          className="relative overflow-hidden border-[3px] border-ink bg-paper"
          style={{ borderRadius: "14px 10px 14px 10px", aspectRatio: "4 / 3" }}
        >
          {STEPS.map((s, i) => (
            <img
              key={s.title}
              src={s.art}
              alt={s.alt}
              width={1024}
              height={768}
              loading="lazy"
              decoding="async"
              className={`absolute inset-0 h-full w-full object-contain p-3 transition-all duration-500 ease-out motion-reduce:transition-none ${
                i === active ? "scale-100 opacity-100" : "scale-95 opacity-0"
              }`}
            />
          ))}
          <span className="hand absolute bottom-1 left-3 text-xl text-ink/50">
            {active + 1}/{STEPS.length}
          </span>
        </div>
      </div>
      {/* base */}
      <div
        className="mx-auto h-3 w-[102%] border-[4px] border-ink bg-paper-deep shadow-[6px_7px_0_0_var(--ink)]"
        style={{ borderRadius: "0 0 18px 18px" }}
      />
    </div>
  );
}

function StepList() {
  return (
    <ol className="mt-10 grid gap-6 md:hidden">
      {STEPS.map((s, i) => (
        <Reveal key={s.title} as="li" delay={i * 80}>
          <div className={`ink-box p-5 ${s.tone}`}>
            <p className="hand text-2xl text-ink/70">{s.kicker}</p>
            <h3 className="mt-1 font-display text-2xl leading-snug">{s.title}</h3>
            <img
              src={s.art}
              alt={s.alt}
              width={1024}
              height={768}
              loading="lazy"
              decoding="async"
              className="mt-3 w-full"
            />
            <p className="mt-2 text-sm leading-relaxed font-semibold text-ink/80">{s.body}</p>
          </div>
        </Reveal>
      ))}
    </ol>
  );
}

export function HowItWorks() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [lift, setLift] = useState(60);

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
      // the laptop rises into place over the first slice of the track
      setLift(Math.round(70 * (1 - Math.min(1, p * STEPS.length))));
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
      <section id="how" className="bg-doodle-blue">
        <div className="mx-auto max-w-6xl px-5 pt-14 md:pt-16 md:pb-0">
          <Reveal>
            <p className="hand text-3xl text-ink">how it works</p>
            <h2 className="mt-2 max-w-2xl font-display text-4xl leading-tight sm:text-5xl">
              an MCP server with a <span className="marker">browser on a leash</span>.
            </h2>
            <p className="mt-4 max-w-xl leading-relaxed font-semibold text-ink/80">
              scroll once — the whole round trip plays out on the laptop below.
            </p>
          </Reveal>
        </div>

        {/* mobile / no-pin fallback */}
        <div className="mx-auto max-w-6xl px-5 pb-16 md:hidden">
          <StepList />
        </div>

        {/* scroll-scrubbed walkthrough */}
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
                      className={`h-4 border-[3px] border-ink transition-all duration-300 ${
                        i === active ? "w-10 bg-ink" : "w-4 bg-paper hover:bg-paper-deep"
                      }`}
                      style={{ borderRadius: "8px 5px 9px 6px" }}
                    />
                  ))}
                </div>
                <div key={step.title} className="animate-[fade-in_0.4s_ease-out]">
                  <p className="hand mt-5 text-3xl text-ink/70">{step.kicker}</p>
                  <h3 className="mt-1 font-display text-4xl leading-tight sm:text-5xl">
                    {step.title}
                  </h3>
                  <p className="mt-4 max-w-md leading-relaxed font-semibold text-ink/85">
                    {step.body}
                  </p>
                  <span
                    className={`hand mt-6 inline-block rotate-[-2deg] border-[3px] border-ink px-3 py-0.5 text-2xl shadow-[3px_4px_0_0_var(--ink)] ${step.tone}`}
                    style={{ borderRadius: "12px 7px 14px 8px" }}
                  >
                    {active + 1} of {STEPS.length}
                  </span>
                </div>
              </div>
              <div className="flex justify-center">
                <Laptop active={active} lift={lift} />
              </div>
            </div>
          </div>
        </div>

      </section>
      <PaintDrip from="blue" to="paper" />
    </>
  );
}

