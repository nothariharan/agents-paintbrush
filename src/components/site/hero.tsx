import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import stickerMcp from "@/assets/hero-sticker-mcp.webp";
import stickerSun from "@/assets/hero-sticker-sun.webp";
import stickerBrowser from "@/assets/hero-sticker-browser.webp";
import rainbowSingle from "@/assets/hero-rainbow-single.webp";
import brushPink from "@/assets/hero-brush-pink.webp";
import flowDiagram from "@/assets/hero-flow-diagram.webp";
import { PaintDrip, SECTION } from "@/components/site/paint";
import { publicApiUrl } from "@/lib/public-api";

gsap.registerPlugin(useGSAP);

const GITHUB = "https://github.com/nothariharan/image-gen";

function trackGithub() {
  void fetch(publicApiUrl("/api/public/click"), { method: "POST" }).catch(() => {});
}

function FlowerMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 44 44" className={className} aria-hidden overflow="visible">
      <circle cx="22" cy="13" r="6.2" fill="currentColor" opacity="0.92" />
      <circle cx="13" cy="22" r="6.2" fill="currentColor" opacity="0.92" />
      <circle cx="31" cy="22" r="6.2" fill="currentColor" opacity="0.92" />
      <circle cx="22" cy="31" r="6.2" fill="currentColor" opacity="0.92" />
      <circle cx="22" cy="22" r="5" fill="#f4cd4f" />
      <circle cx="22" cy="22" r="2.2" fill="currentColor" opacity="0.55" />
    </svg>
  );
}

export function GithubMark() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
      <path d="M12 .5A11.5 11.5 0 0 0 .5 12a11.5 11.5 0 0 0 7.86 10.92c.58.1.79-.25.79-.55v-2c-3.2.7-3.88-1.4-3.88-1.4-.53-1.35-1.3-1.71-1.3-1.71-1.05-.72.08-.71.08-.71 1.16.08 1.77 1.2 1.77 1.2 1.03 1.78 2.7 1.27 3.36.97.1-.75.4-1.27.73-1.56-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a10.9 10.9 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.12 3.05.74.81 1.18 1.84 1.18 3.1 0 4.43-2.69 5.4-5.25 5.69.41.36.78 1.06.78 2.14v3.17c0 .3.2.66.8.55A11.5 11.5 0 0 0 23.5 12A11.5 11.5 0 0 0 12 .5Z" />
    </svg>
  );
}

export function Nav() {
  const [open, setOpen] = useState(false);
  const [compact, setCompact] = useState(false);
  const left = [
    { href: "#how", label: "how it works" },
    { href: "#why", label: "why" },
  ];
  const right = [
    { href: "#install", label: "install" },
    { href: "#faq", label: "faq" },
  ];

  useEffect(() => {
    const onScroll = () => {
      const hero = document.getElementById("top");
      if (!hero) return;
      setCompact(hero.getBoundingClientRect().bottom < 140);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const linkClass = compact
    ? "font-mono text-xs tracking-wide text-ink-soft transition-colors hover:text-ink"
    : "font-mono text-xs tracking-wide text-white/90 transition-colors hover:text-white";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 overflow-visible transition-[background-color,border-color,backdrop-filter,box-shadow] duration-500 ${
        compact
          ? "border-b border-ink/15 bg-paper/85 shadow-sm backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav
        className={`relative mx-auto flex max-w-6xl items-center justify-between px-4 transition-all duration-500 sm:px-6 ${
          compact ? "py-3" : "py-4 md:py-5"
        }`}
      >
        <div className="hidden items-center gap-5 md:flex">
          {left.map((l) => (
            <a key={l.href} href={l.href} className={linkClass}>
              {l.label}
            </a>
          ))}
        </div>

        {compact ? (
          <a
            href="#top"
            aria-label="image-gen home"
            className="absolute top-1/2 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2"
          >
            <FlowerMark className="h-8 w-8 text-ink" />
          </a>
        ) : null}

        <div className="ml-auto flex items-center justify-end gap-3 md:gap-5">
          <div className="hidden items-center gap-5 md:flex">
            {right.map((l) => (
              <a key={l.href} href={l.href} className={linkClass}>
                {l.label}
              </a>
            ))}
          </div>
          <a
            href="#waitlist"
            className={`rounded-full border px-3.5 py-2 font-mono text-xs transition-all duration-500 ${
              compact
                ? "border-ink/40 bg-doodle-mint text-ink shadow-sm hover:-translate-y-0.5"
                : "border-white/50 bg-transparent text-white hover:bg-white/10"
            }`}
          >
            join the waitlist
          </a>
          <button
            type="button"
            aria-label="menu"
            aria-expanded={open}
            onClick={() => setOpen(!open)}
            className={`font-display text-2xl md:hidden ${compact ? "text-ink" : "text-white"}`}
          >
            {open ? "✕" : "☰"}
          </button>
        </div>
      </nav>

      {open && (
        <div
          className={`flex flex-col gap-1 border-t px-5 py-3 md:hidden ${
            compact
              ? "border-ink/10 bg-doodle-mint/80 text-ink"
              : "border-white/10 bg-black/90 text-white"
          }`}
        >
          {[...left, ...right].map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="py-1 font-mono text-sm"
            >
              {l.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}

export function Hero() {
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const pieces = gsap.utils.toArray<HTMLElement>(".hero-piece");
      const floats = gsap.utils.toArray<HTMLElement>(".hero-float");

      // Never tween opacity — Strict Mode / useGSAP revert was leaving the hero invisible
      gsap.set(pieces, { clearProps: "opacity,visibility" });

      if (reduce) return;

      gsap.fromTo(
        pieces,
        { scale: 0.94, y: 16 },
        { scale: 1, y: 0, duration: 0.7, stagger: 0.05, ease: "back.out(1.25)" },
      );

      floats.forEach((el, i) => {
        gsap.to(el, {
          y: i % 2 ? -9 : 11,
          duration: 3.6 + i * 0.25,
          yoyo: true,
          repeat: -1,
          ease: "sine.inOut",
          delay: 0.8 + i * 0.12,
        });
      });

      // Rainbow stays static — no float tween

      gsap.fromTo(
        ".hero-marker",
        { scaleX: 0, transformOrigin: "left center" },
        { scaleX: 1, duration: 0.65, delay: 0.75, ease: "power2.out" },
      );
    },
    { scope: rootRef },
  );

  return (
    <>
      <section
        id="top"
        ref={rootRef}
        className="relative isolate h-[100svh] max-h-[100svh] w-full overflow-hidden"
        style={{ backgroundColor: SECTION.void }}
      >
        <div className="absolute inset-0" style={{ backgroundColor: SECTION.void }} />

        {/* sparse stars only — no stacked rainbow bg */}
        <div
          className="pointer-events-none absolute inset-0 opacity-80"
          style={{
            backgroundImage:
              "radial-gradient(1.2px 1.2px at 10% 16%, rgba(255,255,255,0.55), transparent), radial-gradient(1px 1px at 22% 68%, rgba(255,255,255,0.35), transparent), radial-gradient(1.4px 1.4px at 48% 28%, rgba(255,210,140,0.4), transparent), radial-gradient(1px 1px at 72% 52%, rgba(180,210,255,0.35), transparent), radial-gradient(1.2px 1.2px at 88% 18%, rgba(255,160,200,0.35), transparent), radial-gradient(1px 1px at 60% 80%, rgba(255,255,255,0.28), transparent)",
          }}
        />

        {/* ONE tapered rainbow — static, sits behind the stack */}
        <img
          src={rainbowSingle}
          alt=""
          width={1400}
          height={700}
          className="hero-rainbow pointer-events-none absolute top-[54%] left-1/2 z-[1] w-[120%] max-w-none -translate-x-1/2 -translate-y-1/2 opacity-[0.88] md:w-[108%]"
          aria-hidden
        />

        <div className="relative z-10 mx-auto flex h-full w-full max-w-[1400px] flex-col justify-center overflow-hidden px-4 pb-5 pt-[4.25rem] sm:px-6">
          {/* side accents */}
          <img
            src={stickerMcp}
            alt=""
            width={360}
            height={160}
            className="hero-piece hero-float pointer-events-none absolute top-[12%] left-[1%] z-20 hidden w-[14rem] -rotate-6 drop-shadow-[0_14px_28px_rgba(0,0,0,0.45)] md:block lg:left-[2%] lg:w-[16rem]"
            aria-hidden
          />
          <img
            src={stickerBrowser}
            alt=""
            width={360}
            height={280}
            className="hero-piece hero-float pointer-events-none absolute top-[10%] right-[1%] z-20 hidden w-[13rem] rotate-3 drop-shadow-[0_14px_28px_rgba(0,0,0,0.45)] md:block lg:right-[2%] lg:w-[15rem]"
            aria-hidden
          />
          <div className="hero-piece hero-float absolute right-[3%] bottom-[10%] z-20 hidden w-44 -rotate-2 rounded-2xl border-[3px] border-white bg-[#ff8fb3] px-3.5 py-3 font-mono text-[0.8rem] leading-snug font-medium text-ink shadow-[0_12px_24px_rgba(0,0,0,0.4)] md:block">
            turn prompts into brand visuals
          </div>

          {/* big center stack — uses the upper empty band */}
          <div className="relative z-30 mx-auto -mt-16 flex w-full max-w-4xl flex-col items-center text-center sm:-mt-20 md:-mt-24">
            <div
              className="pointer-events-none absolute left-1/2 top-[24%] h-[24rem] w-[min(100%,44rem)] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-90"
              style={{
                background:
                  "radial-gradient(ellipse at center, rgba(11,11,12,0.88) 0%, rgba(11,11,12,0.5) 48%, transparent 72%)",
              }}
              aria-hidden
            />
            <h1 className="hero-piece relative drop-shadow-[0_2px_24px_rgba(0,0,0,0.85)]">
              <span className="block font-display text-[3.1rem] leading-[1.02] tracking-tight text-[#f6f1e8] sm:text-6xl md:text-7xl lg:text-[5rem]">
                Create visuals,
              </span>
              <span className="relative mt-1 inline-block">
                <img
                  src={stickerSun}
                  alt=""
                  width={80}
                  height={80}
                  className="hero-float pointer-events-none absolute -left-14 top-1/2 hidden w-11 -translate-y-1/2 drop-shadow-lg sm:block md:-left-16 md:w-14"
                  aria-hidden
                />
                <span
                  className="block font-display text-[3.35rem] leading-[1.0] tracking-tight italic sm:text-6xl md:text-7xl lg:text-[5.35rem]"
                  style={{
                    backgroundImage:
                      "linear-gradient(100deg, #ff6fa3 0%, #ff8a5c 45%, #ffb15a 70%, #ff6fa3 100%)",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    color: "transparent",
                  }}
                >
                  instantly.
                </span>
                <img
                  src={brushPink}
                  alt=""
                  width={160}
                  height={120}
                  className="hero-float pointer-events-none absolute -right-[4.5rem] top-[55%] hidden w-[4.25rem] -translate-y-1/2 rotate-12 drop-shadow-xl sm:block md:-right-[5.5rem] md:w-20"
                  aria-hidden
                />
              </span>
            </h1>

            <p className="hero-piece mx-auto mt-2 max-w-2xl font-mono text-[0.95rem] leading-relaxed text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.85)] sm:mt-2.5 sm:text-lg">
              Hand your coding agent a paintbrush — MCP image generation through your own ChatGPT
              session, so sites{" "}
              <span className="relative inline-block whitespace-nowrap text-ink">
                <span className="hero-marker absolute inset-x-[-0.18em] bottom-[0.08em] top-[0.28em] -z-10 rounded-full bg-[oklch(0.84_0.12_160)]" />
                feel finished
              </span>
              .
            </p>

            {/* Crop transparent padding in the square asset so visual gaps collapse */}
            <div className="hero-piece relative z-10 mt-3 w-full max-w-[48rem] overflow-hidden sm:mt-4 sm:max-w-[56rem] md:max-w-[60rem]">
              <img
                src={flowDiagram}
                alt="idea to prompt to ChatGPT to generation to finished site, with Zerops"
                width={1254}
                height={1254}
                className="-mt-[8%] mb-[-10%] h-auto w-full max-h-[min(58vh,36rem)] translate-y-2 scale-[1.18] object-contain drop-shadow-[0_16px_36px_rgba(0,0,0,0.55)] sm:max-h-[min(60vh,38rem)] sm:translate-y-3"
              />
            </div>

            <div className="hero-piece mt-1 flex flex-wrap items-center justify-center gap-3.5 sm:mt-1.5">
              <a
                href={GITHUB}
                target="_blank"
                rel="noreferrer"
                onClick={trackGithub}
                className="inline-flex items-center gap-2.5 rounded-full border border-ink/25 bg-[oklch(0.9_0.08_160)] px-7 py-3 font-mono text-base text-ink shadow-[0_10px_28px_rgba(0,0,0,0.4)] transition-transform hover:-translate-y-0.5"
              >
                <GithubMark /> get it on github
              </a>
              <a
                href="#how"
                className="inline-flex items-center gap-2.5 rounded-full border border-white/55 bg-black/30 px-7 py-3 font-mono text-base text-white backdrop-blur-[2px] transition-colors hover:bg-white/10"
              >
                how it works →
              </a>
            </div>

            <p className="hero-piece mt-2 font-mono text-sm tracking-wide text-white/80">
              agents that write code can finally paint too
            </p>
          </div>
        </div>
      </section>

      <PaintDrip from="void" to="paper" className="relative z-10" />
    </>
  );
}
