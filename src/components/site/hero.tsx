import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import logoDaisy from "@/assets/logo-daisy.png";
import stickerRobot from "@/assets/sticker-robot-brush.png";
import stickerSmiley from "@/assets/sticker-smiley.png";
import propBrush from "@/assets/prop-paintbrush.png";
import heroCollage from "@/assets/hero-collage.png";

gsap.registerPlugin(useGSAP);

const GITHUB = "https://github.com/nothariharan/image-gen";

function trackGithub() {
  void fetch("/api/public/click", { method: "POST" }).catch(() => {});
}

export function Nav() {
  const [open, setOpen] = useState(false);
  const links = [
    { href: "#how", label: "how it works" },
    { href: "#why", label: "why" },
    { href: "#install", label: "install" },
    { href: "#faq", label: "faq" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-ink/15 bg-paper/80 backdrop-blur-md">
      <nav className="mx-auto flex max-w-6xl items-center gap-6 px-5 py-3.5">
        <a href="#top" className="flex items-center gap-2.5">
          <img src={logoDaisy} alt="" width={36} height={36} decoding="async" className="h-8 w-8" />
          <span className="font-display text-[1.65rem] tracking-tight lowercase">
            image-gen<span className="text-[oklch(0.72_0.14_350)]">.</span>
          </span>
        </a>
        <div className="ml-auto hidden items-center gap-6 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="font-mono text-xs tracking-wide text-ink-soft transition-colors hover:text-ink"
            >
              {l.label}
            </a>
          ))}
        </div>
        <a href="#waitlist" className="ml-auto scrap-btn !px-3.5 !py-2 !text-xs md:ml-0">
          join the waitlist
        </a>
        <button
          type="button"
          aria-label="menu"
          aria-expanded={open}
          onClick={() => setOpen(!open)}
          className="font-display text-2xl md:hidden"
        >
          {open ? "✕" : "☰"}
        </button>
      </nav>
      {open && (
        <div className="flex flex-col gap-1 border-t border-ink/10 bg-doodle-mint/70 px-5 py-3 md:hidden">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="py-1 font-mono text-sm text-ink"
            >
              {l.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}

export function GithubMark() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
      <path d="M12 .5A11.5 11.5 0 0 0 .5 12a11.5 11.5 0 0 0 7.86 10.92c.58.1.79-.25.79-.55v-2c-3.2.7-3.88-1.4-3.88-1.4-.53-1.35-1.3-1.71-1.3-1.71-1.05-.72.08-.71.08-.71 1.16.08 1.77 1.2 1.77 1.2 1.03 1.78 2.7 1.27 3.36.97.1-.75.4-1.27.73-1.56-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a10.9 10.9 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.12 3.05.74.81 1.18 1.84 1.18 3.1 0 4.43-2.69 5.4-5.25 5.69.41.36.78 1.06.78 2.14v3.17c0 .3.2.66.8.55A11.5 11.5 0 0 0 23.5 12A11.5 11.5 0 0 0 12 .5Z" />
    </svg>
  );
}

function StickyNote({
  children,
  className,
  color = "bg-doodle-yellow",
}: {
  children: React.ReactNode;
  className?: string;
  color?: string;
}) {
  return (
    <div
      className={`hero-piece sticky-note absolute z-20 p-3 font-hand text-lg leading-snug text-ink shadow-[0_10px_24px_oklch(0.35_0.02_260/0.12)] ${color} ${className ?? ""}`}
    >
      {children}
    </div>
  );
}

export function Hero() {
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const pieces = gsap.utils.toArray<HTMLElement>(".hero-piece");
      const floats = gsap.utils.toArray<HTMLElement>(".hero-float");

      if (reduce) {
        gsap.set(pieces, { opacity: 1, scale: 1, y: 0 });
        return;
      }

      gsap.from(pieces, {
        opacity: 0,
        scale: 0.82,
        y: 28,
        rotation: (i) => (i % 2 ? 8 : -8),
        duration: 0.85,
        stagger: 0.07,
        ease: "back.out(1.5)",
        delay: 0.12,
      });

      floats.forEach((el, i) => {
        gsap.to(el, {
          y: i % 2 ? -12 : 10,
          rotation: `+=${i % 2 ? 2.5 : -2.5}`,
          duration: 2.8 + i * 0.35,
          yoyo: true,
          repeat: -1,
          ease: "sine.inOut",
          delay: 0.9 + i * 0.12,
        });
      });

      gsap.to(".hero-brush", {
        y: 8,
        rotation: 4,
        duration: 3.4,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
        delay: 1.1,
      });

      gsap.fromTo(
        ".hero-marker",
        { scaleX: 0, transformOrigin: "left center" },
        { scaleX: 1, duration: 0.7, delay: 0.95, ease: "power2.out" },
      );
    },
    { scope: rootRef },
  );

  return (
    <section id="top" ref={rootRef} className="relative overflow-hidden pb-10 md:pb-16">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_18%_12%,oklch(0.93_0.05_160/0.5),transparent_42%),radial-gradient(ellipse_at_88%_18%,oklch(0.93_0.05_350/0.42),transparent_40%)]" />

      {/* layered scrapbook collage — text sits in the middle like the reference */}
      <div className="relative mx-auto min-h-[92vh] max-w-6xl px-4 pt-10 sm:px-6 md:pt-14">
        {/* polaroid / collage crop */}
        <div className="hero-piece hero-float absolute top-[8%] left-[-2%] z-10 hidden w-[38%] -rotate-6 sm:block md:left-0 md:w-[30%]">
          <div className="overflow-hidden rounded-md border border-ink/15 bg-white p-2 shadow-[0_16px_36px_oklch(0.35_0.02_260/0.14)]">
            <img
              src={heroCollage}
              alt=""
              className="aspect-[4/5] w-full object-cover object-[18%_35%]"
              aria-hidden
            />
            <p className="hand mt-1 px-1 text-center text-base text-ink/70">agent at the easel</p>
          </div>
          <span className="washi left-1/2 top-3 -translate-x-1/2 -rotate-2" aria-hidden />
        </div>

        <StickyNote className="hero-float top-[6%] right-[4%] w-36 -rotate-3 md:right-[10%] md:w-40" color="bg-doodle-pink">
          turn prompts into brand visuals
        </StickyNote>

        <StickyNote className="hero-float top-[22%] left-[2%] w-32 rotate-[-8deg] md:top-[28%] md:left-[32%] md:w-36" color="bg-doodle-yellow">
          ideas → prompt → generate → wow
        </StickyNote>

        <img
          src={stickerSmiley}
          alt=""
          className="hero-piece hero-float absolute top-[12%] right-[28%] z-20 hidden w-20 drop-shadow-lg md:block md:w-24"
          aria-hidden
        />

        <img
          src={stickerRobot}
          alt=""
          className="hero-piece hero-float absolute bottom-[18%] left-[2%] z-20 w-24 drop-shadow-xl sm:w-28 md:bottom-[22%] md:left-[6%] md:w-36"
          aria-hidden
        />

        <img
          src={propBrush}
          alt=""
          className="hero-piece hero-brush pointer-events-none absolute right-[-4%] bottom-[10%] z-30 w-36 rotate-12 drop-shadow-2xl sm:w-48 md:right-[2%] md:bottom-[14%] md:w-56"
          aria-hidden
        />

        {/* UI mock card */}
        <div className="hero-piece hero-float absolute right-[2%] bottom-[32%] z-20 hidden w-[42%] rotate-2 md:bottom-[36%] md:block md:w-[28%]">
          <div className="overflow-hidden rounded-xl border border-ink/20 bg-white shadow-[0_14px_34px_oklch(0.35_0.02_260/0.12)]">
            <div className="flex items-center gap-1.5 border-b border-ink/10 bg-doodle-mint/50 px-3 py-2">
              <span className="h-2.5 w-2.5 rounded-full bg-[#f27b7b]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#f4cd4f]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#7dce9a]" />
              <span className="ml-2 font-mono text-[10px] text-ink/55">image-gen</span>
            </div>
            <div className="space-y-2 p-3">
              <p className="font-mono text-[11px] text-ink/60">Describe the image you want…</p>
              <div className="flex gap-2">
                <div className="h-8 flex-1 rounded-md border border-ink/15 bg-paper" />
                <div className="grid h-8 place-items-center rounded-md bg-[oklch(0.78_0.12_350)] px-3 font-mono text-[10px] text-ink">
                  Generate
                </div>
              </div>
              <div className="h-20 overflow-hidden rounded-md border border-ink/10">
                <img
                  src={heroCollage}
                  alt=""
                  className="h-full w-full object-cover object-[70%_60%]"
                  aria-hidden
                />
              </div>
            </div>
          </div>
        </div>

        <StickyNote className="hero-float bottom-[12%] right-[30%] hidden w-36 rotate-3 md:block" color="bg-doodle-mint">
          made for agents who paint
        </StickyNote>

        <div className="hero-piece absolute bottom-[8%] left-[28%] z-20 hidden rotate-[-4deg] overflow-hidden rounded-md border border-ink/15 bg-white p-1.5 shadow-lg md:block md:w-[18%]">
          <img
            src={heroCollage}
            alt=""
            className="aspect-square w-full object-cover object-[80%_20%]"
            aria-hidden
          />
          <span className="washi -top-1 left-4 rotate-6 !bg-[oklch(0.86_0.08_35/0.8)]" aria-hidden />
        </div>

        {/* center brand composition */}
        <div className="relative z-30 mx-auto flex min-h-[78vh] max-w-2xl flex-col items-center justify-center px-2 text-center md:min-h-[84vh]">
          <div className="hero-piece mb-4 inline-flex items-center gap-2.5">
            <img src={logoDaisy} alt="" width={48} height={48} className="h-11 w-11" />
            <p className="font-display text-4xl tracking-tight lowercase sm:text-5xl">
              image-gen<span className="text-[oklch(0.72_0.14_350)]">.</span>
            </p>
          </div>

          <h1 className="hero-piece font-display text-4xl leading-[1.05] tracking-tight sm:text-5xl md:text-6xl">
            Create visuals,{" "}
            <em className="hand not-italic text-[oklch(0.68_0.14_350)]">instantly.</em>
          </h1>
          <p className="hero-piece mx-auto mt-5 max-w-lg font-mono text-sm leading-relaxed text-ink/75 sm:text-base">
            Hand your coding agent a paintbrush — MCP image generation through your own ChatGPT
            session, so sites{" "}
            <span className="relative inline-block whitespace-nowrap">
              <span className="hero-marker absolute inset-x-0 bottom-[0.15em] top-[0.35em] -z-10 rounded-sm bg-[oklch(0.86_0.1_160/0.55)]" />
              feel finished
            </span>
            .
          </p>

          <div className="hero-piece mt-8 flex flex-wrap items-center justify-center gap-3">
            <a
              href={GITHUB}
              target="_blank"
              rel="noreferrer"
              onClick={trackGithub}
              className="scrap-btn"
            >
              <GithubMark /> get it on github
            </a>
            <a href="#how" className="scrap-btn-ghost">
              how it works →
            </a>
          </div>
          <p className="hero-piece hand mt-5 text-xl text-ink/70">
            agents that write code can finally paint too
          </p>
        </div>
      </div>
    </section>
  );
}
