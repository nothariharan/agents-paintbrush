import { useEffect, useRef, useState } from "react";

import demoBefore from "@/assets/demo-before.webp";
import demoAfter from "@/assets/demo-after.webp";

const DEMO_W = 1280;
const DEMO_H = 900;

type Mode = "before" | "after" | "compare";

function SiteShot({
  src,
  alt,
  badge,
  badgeClass,
}: {
  src: string;
  alt: string;
  badge: string;
  badgeClass: string;
}) {
  return (
    <div className="overflow-hidden rounded-xl border border-ink/25 bg-paper shadow-[0_14px_32px_oklch(0.35_0.02_260/0.1)]">
      <div className="flex items-center justify-between border-b border-ink/15 bg-paper-deep px-3 py-2">
        <span className={`hand rounded-md border border-ink/15 px-2 py-0.5 text-lg leading-none shadow-sm ${badgeClass}`}>
          {badge}
        </span>
        <span className="font-mono text-[10px] text-ink/60">terra-ceramics · same page</span>
      </div>
      <img
        src={src}
        alt={alt}
        width={DEMO_W}
        height={DEMO_H}
        className="block w-full"
        loading="lazy"
        decoding="async"
      />
    </div>
  );
}

function CompareSlider() {
  const frameRef = useRef<HTMLDivElement>(null);
  const [pct, setPct] = useState(50);
  const [frameW, setFrameW] = useState(0);
  const dragging = useRef(false);

  useEffect(() => {
    const el = frameRef.current;
    if (!el) return;
    const sync = () => setFrameW(el.clientWidth);
    sync();
    const ro = new ResizeObserver(sync);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      if (!dragging.current || !frameRef.current) return;
      const rect = frameRef.current.getBoundingClientRect();
      const next = ((e.clientX - rect.left) / rect.width) * 100;
      setPct(Math.min(92, Math.max(8, next)));
    };
    const onUp = () => {
      dragging.current = false;
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
  }, []);

  return (
    <div
      ref={frameRef}
      className="relative select-none overflow-hidden rounded-xl border border-ink/25 bg-paper shadow-[0_16px_36px_oklch(0.35_0.02_260/0.12)]"
    >
      <img
        src={demoAfter}
        alt="After: Awwwards-level Terra Ceramics site with professional product photography"
        width={DEMO_W}
        height={DEMO_H}
        draggable={false}
        className="block w-full"
      />
      <div className="absolute inset-0 overflow-hidden" style={{ width: `${pct}%` }}>
        <img
          src={demoBefore}
          alt="Before: same Terra Ceramics site with SVG diagram placeholders only"
          width={DEMO_W}
          height={DEMO_H}
          draggable={false}
          className="absolute inset-y-0 left-0 h-full max-w-none"
          style={{ width: frameW ? `${frameW}px` : "100%" }}
        />
      </div>

      <div
        className="absolute inset-y-0 z-10 w-1 cursor-ew-resize bg-ink"
        style={{ left: `${pct}%`, transform: "translateX(-50%)" }}
        onPointerDown={(e) => {
          e.currentTarget.setPointerCapture(e.pointerId);
          dragging.current = true;
        }}
        role="slider"
        aria-label="Drag to compare before and after"
        aria-valuemin={8}
        aria-valuemax={92}
        aria-valuenow={Math.round(pct)}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "ArrowLeft") setPct((p) => Math.max(8, p - 4));
          if (e.key === "ArrowRight") setPct((p) => Math.min(92, p + 4));
        }}
      >
        <span className="absolute top-1/2 left-1/2 grid h-10 w-10 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-ink/40 bg-doodle-yellow font-display text-lg shadow-md">
          ↔
        </span>
      </div>

      <span className="hand absolute top-3 left-3 z-20 rounded-md border border-ink/15 bg-doodle-coral px-2 py-0.5 text-xl leading-none shadow-sm">
        before · svgs
      </span>
      <span className="hand absolute top-3 right-3 z-20 rounded-md border border-ink/15 bg-doodle-mint px-2 py-0.5 text-xl leading-none shadow-sm">
        after · awwwards
      </span>
    </div>
  );
}

export function DemoCompare() {
  const [mode, setMode] = useState<Mode>("compare");

  return (
    <div className="mt-10 space-y-8">
      <div className="flex flex-wrap items-center gap-2">
        {(
          [
            ["before", "before · svg only"],
            ["compare", "drag to compare"],
            ["after", "after · awwwards"],
          ] as const
        ).map(([id, label]) => (
          <button
            key={id}
            type="button"
            onClick={() => setMode(id)}
            className={`rounded-md border border-ink/40 px-3 py-1.5 font-mono text-xs transition-transform hover:-translate-y-0.5 ${
              mode === id ? "bg-doodle-yellow shadow-sm" : "bg-paper"
            }`}
            aria-pressed={mode === id}
          >
            {label}
          </button>
        ))}
      </div>

      {mode === "compare" && <CompareSlider />}

      {mode === "before" && (
        <div className="grid items-start gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <SiteShot
            src={demoBefore}
            alt="Before: Terra Ceramics full site with SVG placeholders instead of photos"
            badge="no image-gen"
            badgeClass="bg-doodle-coral"
          />
          <div className="space-y-4">
            <div className="ink-box bg-doodle-coral p-5">
              <p className="hand text-3xl leading-none">no paintbrush yet</p>
              <p className="mt-3 text-sm leading-relaxed font-semibold text-ink/80">
                same Terra Ceramics storefront — nav, hero, New Arrivals, feature bar — but every
                image slot is a dashed SVG diagram. the agent can ship the page; it just can&apos;t
                draw.
              </p>
            </div>
            <MechanismCard mode="before" />
          </div>
        </div>
      )}

      {mode === "after" && (
        <div className="grid items-start gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <SiteShot
            src={demoAfter}
            alt="After: Awwwards-level Terra Ceramics site with professional photography"
            badge="image-gen on"
            badgeClass="bg-doodle-mint"
          />
          <div className="space-y-4">
            <div className="ink-box bg-doodle-mint p-5">
              <p className="hand text-3xl leading-none">agent painted it</p>
              <p className="mt-3 text-sm leading-relaxed font-semibold text-ink/80">
                same content, Awwwards-tier finish.{" "}
                <span className="font-mono text-xs">generate_image</span> filled the hero and
                product slots with real photography — soft light, editorial stills, boutique polish.
              </p>
            </div>
            <MechanismCard mode="after" />
          </div>
        </div>
      )}

      {mode === "compare" && (
        <div className="grid gap-4 md:grid-cols-3">
          <MechanismStep
            n="1"
            title="before"
            body="full site ships with SVG diagrams in every image slot. layout is done — photos aren't."
            color="bg-doodle-coral"
          />
          <MechanismStep
            n="2"
            title="generate_image"
            body="the agent calls the MCP. ChatGPT paints each piece through your logged-in browser session."
            color="bg-doodle-yellow"
          />
          <MechanismStep
            n="3"
            title="after"
            body="same page, Awwwards-level photography wired in. drag the slider to see the jump."
            color="bg-doodle-mint"
          />
        </div>
      )}
    </div>
  );
}

function MechanismCard({ mode }: { mode: "before" | "after" }) {
  if (mode === "before") {
    return (
      <div className="code-card">
        <div className="flex items-center gap-2 border-b border-ink/30 bg-code-bar px-3 py-1.5">
          <span className="hand text-lg text-code-plain/70">product-card.tsx</span>
        </div>
        <pre className="overflow-x-auto bg-code-bg px-4 py-3 font-mono text-xs leading-relaxed">
          <span className="text-code-punct">{"<"}</span>
          <span className="text-code-cmd">div</span>
          <span className="text-code-punct">{" className="}</span>
          <span className="text-code-str">"placeholder"</span>
          <span className="text-code-punct">{">"}</span>
          {"\n"}
          <span className="text-code-punct">{"  <"}</span>
          <span className="text-code-cmd">MountainIcon</span>
          <span className="text-code-punct">{" />"}</span>
          <span className="text-code-plain">{"  // just an SVG"}</span>
          {"\n"}
          <span className="text-code-punct">{"</"}</span>
          <span className="text-code-cmd">div</span>
          <span className="text-code-punct">{">"}</span>
        </pre>
      </div>
    );
  }

  return (
    <div className="code-card">
      <div className="flex items-center gap-2 border-b border-ink/30 bg-code-bar px-3 py-1.5">
        <span className="hand text-lg text-code-plain/70">agent → mcp</span>
      </div>
      <pre className="overflow-x-auto bg-code-bg px-4 py-3 font-mono text-xs leading-relaxed">
        <span className="text-code-cmd">generate_image</span>
        <span className="text-code-punct">{"({"}</span>
        {"\n"}
        <span className="text-code-key">{"  prompt"}</span>
        <span className="text-code-punct">: </span>
        <span className="text-code-str">"awwwards ceramics hero"</span>
        <span className="text-code-punct">,</span>
        {"\n"}
        <span className="text-code-key">{"  path"}</span>
        <span className="text-code-punct">: </span>
        <span className="text-code-url">"public/hero.png"</span>
        {"\n"}
        <span className="text-code-punct">{"})"}</span>
        {"\n"}
        <span className="text-code-plain">{"// → PNG on disk, page leveled up"}</span>
      </pre>
    </div>
  );
}

function MechanismStep({
  n,
  title,
  body,
  color,
}: {
  n: string;
  title: string;
  body: string;
  color: string;
}) {
  return (
    <div className={`ink-box p-4 ${color}`}>
      <p className="hand text-2xl leading-none text-ink/70">step {n}</p>
      <h3 className="mt-1 font-display text-2xl leading-snug">{title}</h3>
      <p className="mt-2 font-mono text-xs leading-relaxed text-ink/75 sm:text-sm">{body}</p>
    </div>
  );
}
