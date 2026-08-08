import { useEffect, useRef, useState } from "react";

import demoBefore from "@/assets/demo-before.webp";
import demoAfter from "@/assets/demo-after.webp";

const PRODUCTS = [
  { name: "Speckled Mug", price: "$36", file: "public/speckled-mug.png" },
  { name: "Shallow Bowl", price: "$48", file: "public/shallow-bowl.png" },
  { name: "Dinner Plate", price: "$42", file: "public/dinner-plate.png" },
  { name: "Bud Vase", price: "$28", file: "public/bud-vase.png" },
] as const;

type Mode = "before" | "after" | "compare";

function PlaceholderSvg() {
  return (
    <svg viewBox="0 0 120 90" className="h-full w-full" aria-hidden="true">
      <rect
        x="4"
        y="4"
        width="112"
        height="82"
        fill="#e8e8e8"
        stroke="#b0b0b0"
        strokeWidth="2"
        strokeDasharray="5 4"
        rx="2"
      />
      <path
        d="M38 58 L52 42 L64 52 L78 34 L96 58 Z"
        fill="none"
        stroke="#9a9a9a"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <circle cx="46" cy="30" r="5" fill="none" stroke="#9a9a9a" strokeWidth="2.5" />
      <text
        x="60"
        y="74"
        textAnchor="middle"
        fill="#8a8a8a"
        fontSize="8"
        fontFamily="ui-monospace, monospace"
      >
        svg placeholder
      </text>
    </svg>
  );
}

function BeforeGrid() {
  return (
    <div className="rounded-xl border border-ink/25 bg-[#f7f6f3] p-3 shadow-[0_12px_28px_oklch(0.35_0.02_260/0.08)] sm:p-4">
      <div className="mb-3 flex items-end justify-between gap-2">
        <div>
          <p className="font-mono text-[10px] tracking-[0.18em] text-ink/50 uppercase">
            Terra Ceramics
          </p>
          <p className="font-display text-xl leading-none text-ink sm:text-2xl">New Arrivals</p>
        </div>
        <span className="hand rounded-md border border-ink/20 bg-doodle-coral px-2 py-0.5 text-lg leading-none shadow-sm">
          no image-gen
        </span>
      </div>
      <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
        {PRODUCTS.map((p) => (
          <div
            key={p.name}
            className="flex overflow-hidden rounded-lg border border-ink/15 bg-white"
          >
            <div className="aspect-[4/3] w-[46%] shrink-0 bg-[#f0f0f0]">
              <PlaceholderSvg />
            </div>
            <div className="flex flex-1 flex-col justify-center gap-0.5 px-3 py-2">
              <p className="text-[11px] font-bold tracking-tight text-ink sm:text-xs">{p.name}</p>
              <p className="text-[10px] font-semibold text-ink/45">Stoneware</p>
              <p className="text-[11px] font-extrabold text-ink sm:text-xs">{p.price}</p>
              <p className="mt-1 font-mono text-[9px] text-ink/40">&lt;svg /&gt;</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AfterPage() {
  return (
    <div className="overflow-hidden rounded-xl border border-ink/25 bg-paper shadow-[0_14px_32px_oklch(0.35_0.02_260/0.1)]">
      <div className="flex items-center justify-between border-b border-ink/15 bg-doodle-mint px-3 py-2">
        <span className="hand rounded-md border border-ink/15 bg-paper px-2 py-0.5 text-lg leading-none shadow-sm">
          image-gen on
        </span>
        <span className="font-mono text-[10px] text-ink/70">public/*.png</span>
      </div>
      <img
        src={demoAfter}
        alt="After: Terra Ceramics product cards filled with generated photos"
        width={1152}
        height={928}
        className="block w-full"
        loading="lazy"
        decoding="async"
      />
      <div className="grid grid-cols-2 gap-2 border-t border-ink/10 bg-paper-deep p-3 sm:grid-cols-4">
        {PRODUCTS.map((p) => (
          <p
            key={p.file}
            className="truncate rounded-md border border-ink/15 bg-paper px-2 py-1 font-mono text-[9px] text-ink/70"
          >
            {p.file}
          </p>
        ))}
      </div>
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
        alt="After: product cards filled with generated ceramics photos"
        width={1152}
        height={928}
        draggable={false}
        className="block w-full"
      />
      <div className="absolute inset-0 overflow-hidden" style={{ width: `${pct}%` }}>
        <img
          src={demoBefore}
          alt="Before: product cards with empty SVG placeholders"
          width={1200}
          height={960}
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
        after · pngs
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
            ["after", "after · generated"],
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
          <BeforeGrid />
          <div className="space-y-4">
            <div className="ink-box bg-doodle-coral p-5">
              <p className="hand text-3xl leading-none">no paintbrush yet</p>
              <p className="mt-3 text-sm leading-relaxed font-semibold text-ink/80">
                the agent shipped a complete ceramics storefront, but every product slot is a dashed
                SVG placeholder. it can write the page — it just can&apos;t draw.
              </p>
            </div>
            <MechanismCard mode="before" />
          </div>
        </div>
      )}

      {mode === "after" && (
        <div className="grid items-start gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <AfterPage />
          <div className="space-y-4">
            <div className="ink-box bg-doodle-mint p-5">
              <p className="hand text-3xl leading-none">agent painted it</p>
              <p className="mt-3 text-sm leading-relaxed font-semibold text-ink/80">
                same page, same conversation. <span className="font-mono text-xs">generate_image</span>{" "}
                ran four times, dropped PNGs into <span className="font-mono text-xs">public/</span>,
                and the agent swapped the SVGs for real product shots.
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
            body="product cards ship with dashed SVG placeholders. no photos, no API, nothing to paint with."
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
            body="PNGs land in public/. the same agent wires the paths into the cards. page done."
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
        <span className="text-code-str">"speckled stoneware mug"</span>
        <span className="text-code-punct">,</span>
        {"\n"}
        <span className="text-code-key">{"  path"}</span>
        <span className="text-code-punct">: </span>
        <span className="text-code-url">"public/speckled-mug.png"</span>
        {"\n"}
        <span className="text-code-punct">{"})"}</span>
        {"\n"}
        <span className="text-code-plain">{"// → PNG on disk, card updated"}</span>
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
