import { useState } from "react";
import { GithubMark } from "@/components/site/hero";
import { Reveal } from "@/components/site/reveal";
import { PaintDrip } from "@/components/site/paint";
import logoMark from "@/assets/logo-mark.webp";

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
      const res = await fetch("/api/public/waitlist", {
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
      <section className="bg-doodle-mint">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 md:grid-cols-[1.1fr_0.9fr] md:py-24">
          <Reveal>
            <span
              className="grid h-16 w-16 place-items-center border-[3px] border-ink bg-doodle-pink text-3xl shadow-[4px_5px_0_0_var(--ink)]"
              style={{ borderRadius: "18px 12px 20px 14px" }}
            >
              <img src={logoMark} alt="image-gen logo" width={64} height={64} className="h-11 w-11" loading="lazy" />
            </span>
            <h2 className="mt-5 max-w-lg font-display text-5xl leading-tight sm:text-6xl">
              hand your agent a paintbrush.
            </h2>
            <p className="mt-4 max-w-md leading-relaxed font-semibold text-ink/80">
              clone it, log in once, and let the thing that writes your site also paint it.
            </p>
            <a
              href={GITHUB}
              target="_blank"
              rel="noreferrer"
              onClick={() => void fetch("/api/public/click", { method: "POST" }).catch(() => {})}
              className="mt-7 inline-flex items-center gap-2 border-[3px] border-ink bg-doodle-yellow px-5 py-3 font-extrabold text-ink shadow-[5px_6px_0_0_var(--ink)] transition-transform hover:-translate-y-0.5"
              style={{ borderRadius: "16px 10px 18px 12px / 12px 18px 10px 16px" }}
            >
              <GithubMark /> github.com/nothariharan/image-gen
            </a>
          </Reveal>

          <Reveal from="right" delay={120} className="flex items-center">
            {state === "done" ? (
              <div className="note-pop sticky-note w-full p-6">
                <p className="hand text-4xl">you're on the list</p>
                <p className="mt-2 text-sm leading-relaxed font-semibold text-ink/80">
                  we'll ping you when there's something worth pinging about. meanwhile, the repo is
                  right there.
                </p>
              </div>
            ) : (
              <form onSubmit={submit} className="ink-box w-full bg-paper p-6">
                <p className="hand text-3xl text-ink">optional: get updates</p>
                <p className="mt-1 text-sm font-semibold text-ink/70">
                  new tools, better queueing, non-Edge browsers. no spam.
                </p>
                <label className="mt-4 block text-sm font-extrabold" htmlFor="wl-email">
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
                  className="mt-1 w-full border-[3px] border-ink bg-paper px-3 py-2 font-semibold outline-none focus:bg-doodle-yellow/40"
                  style={{ borderRadius: "12px 7px 14px 8px" }}
                />
                <label className="mt-3 block text-sm font-extrabold" htmlFor="wl-note">
                  note <span className="font-semibold text-ink/60">(optional)</span>
                </label>
                <input
                  id="wl-note"
                  type="text"
                  maxLength={500}
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="what would you paint first?"
                  className="mt-1 w-full border-[3px] border-ink bg-paper px-3 py-2 font-semibold outline-none focus:bg-doodle-yellow/40"
                  style={{ borderRadius: "8px 14px 7px 12px" }}
                />
                <button
                  type="submit"
                  disabled={state === "sending"}
                  className="mt-5 w-full border-[3px] border-ink bg-doodle-pink px-4 py-2.5 font-extrabold text-ink shadow-[4px_5px_0_0_var(--ink)] transition-transform hover:-translate-y-0.5 disabled:opacity-60"
                  style={{ borderRadius: "14px 9px 16px 10px / 10px 16px 9px 14px" }}
                >
                  {state === "sending" ? "sending…" : "join the list"}
                </button>
                {state === "error" && (
                  <p className="mt-2 text-sm font-bold text-ink">{message}</p>
                )}
              </form>
            )}
          </Reveal>
        </div>
      </section>
    </>
  );
}

export function Footer() {
  return (
    <footer className="border-t-[3px] border-ink bg-paper-deep">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 py-10 text-sm font-semibold text-ink/75 sm:flex-row sm:items-end">
        <div>
          <p className="font-display text-2xl text-ink">image-gen</p>
          <p className="mt-1">MIT licensed. not affiliated with OpenAI or Microsoft.</p>
          <p className="mt-1">
            the MCP server runs locally on your machine; this site and its waitlist run on Zerops.
          </p>
        </div>
        <div className="sm:ml-auto sm:text-right">
          <a
            href={GITHUB}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 border-[3px] border-ink bg-doodle-mint px-3 py-1.5 font-extrabold text-ink shadow-[3px_4px_0_0_var(--ink)]"
            style={{ borderRadius: "14px 9px 15px 10px" }}
          >
            <GithubMark /> github
          </a>
          <p className="hand mt-3 text-2xl text-ink">made for agents who wanted to paint.</p>
        </div>
      </div>
    </footer>
  );
}
