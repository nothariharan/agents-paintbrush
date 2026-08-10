import { useState } from "react";
import { GithubMark } from "@/components/site/hero";
import { Reveal } from "@/components/site/reveal";
import { PaintDrip, SECTION } from "@/components/site/paint";
import { publicApiUrl } from "@/lib/public-api";
import logoDaisy from "@/assets/logo-daisy.webp";
import stickerSmiley from "@/assets/sticker-smiley.webp";

const GITHUB = "https://github.com/nothariharan/image-gen";

export function FinalCta() {
  const [email, setEmail] = useState("");
  const [note, setNote] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [message, setMessage] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setState("sending");
    try {
      const res = await fetch(publicApiUrl("/api/public/waitlist"), {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email: email.trim(), note: note.trim() || null }),
      });
      const data = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok || !data.ok) {
        setState("error");
        setMessage(data.error ?? "that didn't go through. try again?");
        return;
      }
      setState("done");
    } catch {
      setState("error");
      setMessage("network hiccup. try again?");
    }
  }

  return (
    <>
      <PaintDrip from="paper" to="mint" />
      <section id="waitlist" className="relative" style={{ backgroundColor: SECTION.mint }}>
        <img
          src={stickerSmiley}
          alt=""
          width={96}
          height={96}
          className="bob pointer-events-none absolute top-8 right-6 hidden w-20 drop-shadow-md md:block"
          aria-hidden
        />
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 md:grid-cols-[1.1fr_0.9fr] md:py-24">
          <Reveal>
            <img
              src={logoDaisy}
              alt=""
              width={56}
              height={56}
              className="h-14 w-14"
              loading="lazy"
            />
            <h2 className="mt-5 max-w-lg font-display text-5xl leading-[1.05] tracking-tight sm:text-6xl">
              hand your agent a paintbrush.
            </h2>
            <p className="mt-4 max-w-md font-mono text-sm leading-relaxed text-ink/75">
              clone it, log in once, and let the thing that writes your site also paint it.
            </p>
            <a
              href={GITHUB}
              target="_blank"
              rel="noreferrer"
              onClick={() =>
                void fetch(publicApiUrl("/api/public/click"), { method: "POST" }).catch(() => {})
              }
              className="scrap-btn mt-7"
            >
              <GithubMark /> github.com/nothariharan/image-gen
            </a>
          </Reveal>

          <Reveal from="right" delay={120} className="flex items-center">
            {state === "done" ? (
              <div className="note-pop sticky-note w-full bg-doodle-yellow p-6">
                <p className="hand text-4xl">you&apos;re on the list</p>
                <p className="mt-2 font-mono text-sm leading-relaxed text-ink/75">
                  we&apos;ll ping you when there&apos;s something worth pinging about. meanwhile, the
                  repo is right there.
                </p>
              </div>
            ) : (
              <form onSubmit={submit} className="ink-box w-full bg-card/95 p-6">
                <p className="hand text-3xl text-ink">optional: get updates</p>
                <p className="mt-1 font-mono text-xs text-ink/65">
                  new tools, better queueing, non-Edge browsers. no spam.
                </p>
                <label className="mt-4 block font-mono text-xs font-medium" htmlFor="wl-email">
                  email
                </label>
                <input
                  id="wl-email"
                  type="email"
                  required
                  maxLength={255}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="mt-1 w-full rounded-lg border border-ink/40 bg-paper px-3 py-2.5 font-mono text-sm outline-none focus:border-ink focus:bg-doodle-yellow/30"
                />
                <label className="mt-3 block font-mono text-xs font-medium" htmlFor="wl-note">
                  note <span className="text-ink/50">(optional)</span>
                </label>
                <input
                  id="wl-note"
                  type="text"
                  maxLength={500}
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="what would you paint first?"
                  className="mt-1 w-full rounded-lg border border-ink/40 bg-paper px-3 py-2.5 font-mono text-sm outline-none focus:border-ink focus:bg-doodle-yellow/30"
                />
                <button
                  type="submit"
                  disabled={state === "sending"}
                  className="scrap-btn mt-5 w-full justify-center !bg-doodle-pink disabled:opacity-60"
                >
                  {state === "sending" ? "sending…" : "join the list"}
                </button>
                {state === "error" && (
                  <p className="mt-2 font-mono text-sm text-ink">{message}</p>
                )}
              </form>
            )}
          </Reveal>
        </div>
      </section>
      <PaintDrip from="mint" to="paper-deep" />
    </>
  );
}

export function Footer() {
  return (
    <footer style={{ backgroundColor: SECTION["paper-deep"] }}>
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 py-10 font-mono text-xs text-ink/70 sm:flex-row sm:items-end sm:text-sm">
        <div>
          <p className="flex items-center gap-2 font-display text-2xl text-ink lowercase">
            <img src={logoDaisy} alt="" width={28} height={28} className="h-7 w-7" />
            image-gen<span className="text-[oklch(0.72_0.14_350)]">.</span>
          </p>
          <p className="mt-2">MIT licensed. not affiliated with OpenAI or Microsoft.</p>
          <p className="mt-1">
            the MCP server runs locally on your machine; this site and its waitlist run on Zerops.
          </p>
        </div>
        <div className="sm:ml-auto sm:text-right">
          <a
            href={GITHUB}
            target="_blank"
            rel="noreferrer"
            className="scrap-btn-ghost !py-1.5 !text-xs"
          >
            <GithubMark /> github
          </a>
          <p className="hand mt-3 text-2xl text-ink">made for agents who wanted to paint.</p>
        </div>
      </div>
    </footer>
  );
}
