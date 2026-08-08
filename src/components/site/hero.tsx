import { useState } from "react";

import heroArt from "@/assets/hero-doodle.webp";
import logoMark from "@/assets/logo-mark.webp";

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
    <header className="sticky top-0 z-50 border-b-[3px] border-ink bg-paper/90 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center gap-6 px-5 py-3">
        <a href="#top" className="flex items-center gap-2.5">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-doodle-mint">
            <img src={logoMark} alt="image-gen logo" width={40} height={40} decoding="async" className="h-7 w-7" />
          </span>
          <span className="font-display text-2xl tracking-tight">image-gen</span>
        </a>
        <div className="ml-auto hidden items-center gap-5 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-bold text-ink-soft transition-colors hover:text-ink"
            >
              {l.label}
            </a>
          ))}
        </div>
        <a
          href={GITHUB}
          target="_blank"
          rel="noreferrer"
          onClick={trackGithub}
          className="ml-auto inline-flex items-center gap-2 border-[3px] border-ink bg-doodle-yellow px-3 py-1.5 text-sm font-extrabold text-ink shadow-[3px_4px_0_0_var(--ink)] transition-transform hover:-translate-y-0.5 md:ml-0"
          style={{ borderRadius: "14px 9px 15px 10px / 10px 15px 9px 14px" }}
        >
          <GithubMark /> github
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
        <div className="flex flex-col gap-1 border-t-[3px] border-ink bg-doodle-mint px-5 py-3 md:hidden">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="py-1 font-bold text-ink"
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

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-doodle-mint">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 pt-14 pb-16 md:grid-cols-[1fr_1.05fr] md:pt-20 md:pb-24">
        <div>
          <p
            className="hand inline-block -rotate-2 border-[3px] border-ink bg-doodle-pink px-3 py-1 text-2xl text-ink shadow-[3px_4px_0_0_var(--ink)]"
            style={{ borderRadius: "12px 8px 14px 10px" }}
          >
            a paintbrush for agents
          </p>
          <h1 className="mt-4 font-display text-6xl leading-[0.9] tracking-tight sm:text-7xl md:text-8xl">
            image-gen
          </h1>
          <h2 className="mt-5 max-w-xl font-display text-3xl leading-tight sm:text-4xl">
            give your coding agent <span className="marker whitespace-nowrap">a paintbrush</span>.
          </h2>
          <p className="mt-4 max-w-xl text-base leading-relaxed font-semibold text-ink/80 sm:text-lg">
            MCP image generation through your own ChatGPT session. no OpenAI API key, no credits
            meter — PNGs land straight in your project folder.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href={GITHUB}
              target="_blank"
              rel="noreferrer"
              onClick={trackGithub}
              className="inline-flex items-center gap-2 border-[3px] border-ink bg-doodle-yellow px-5 py-3 font-extrabold text-ink shadow-[5px_6px_0_0_var(--ink)] transition-transform hover:-translate-y-0.5"
              style={{ borderRadius: "16px 10px 18px 12px / 12px 18px 10px 16px" }}
            >
              <GithubMark /> get it on github
            </a>
            <a
              href="#how"
              className="inline-flex items-center gap-2 border-[3px] border-ink bg-paper px-5 py-3 font-extrabold text-ink shadow-[5px_6px_0_0_var(--ink)] transition-transform hover:-translate-y-0.5"
              style={{ borderRadius: "12px 18px 10px 16px / 16px 10px 18px 12px" }}
            >
              how it works →
            </a>
          </div>
          <p className="mt-6 text-sm font-bold text-ink/70">
            MIT licensed · works with cursor, claude code, any MCP client
          </p>
        </div>

        <div className="relative">
          <img
            src={heroArt}
            alt="A cheerful robot at an easel painting a browser window, surrounded by colourful doodle monsters and clouds"
            width={1200}
            height={1008}
            loading="eager"
            fetchPriority="high"
            decoding="async"
            sizes="(max-width: 768px) 100vw, 600px"
            className="bob w-full"
          />

          <p className="hand absolute -bottom-1 right-2 rotate-[-6deg] border-[3px] border-ink bg-paper px-3 py-1 text-xl shadow-[3px_4px_0_0_var(--ink)]">
            it paints. finally.
          </p>
        </div>
      </div>
    </section>
  );
}
