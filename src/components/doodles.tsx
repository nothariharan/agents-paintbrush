/**
 * Hand-drawn SVG doodles. All strokes inherit `currentColor` so they pick up
 * ink / accent tokens from their container.
 */

type DoodleProps = { className?: string };

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

/** Wordmark underline scribble — draws itself in. */
export function Underline({ className }: DoodleProps) {
  return (
    <svg viewBox="0 0 300 18" className={className} aria-hidden="true" preserveAspectRatio="none">
      <path
        {...stroke}
        strokeWidth={5}
        d="M4 12c40-7 84-9 132-8 44 1 92 3 160 9"
        className="draw-stroke"
      />
      <path {...stroke} strokeWidth={2.5} d="M22 17c62-6 132-7 246-2" opacity={0.55} />
    </svg>
  );
}

/** Circled-word annotation ring. */
export function CircleScribble({ className }: DoodleProps) {
  return (
    <svg viewBox="0 0 220 70" className={className} aria-hidden="true" preserveAspectRatio="none">
      <path
        {...stroke}
        strokeWidth={2.5}
        d="M62 6C30 8 6 20 8 38c2 17 40 27 106 26 58-1 98-11 98-27C212 20 168 8 108 7"
      />
    </svg>
  );
}

/** Dashed arrow used between steps. */
export function DashedArrow({ className }: DoodleProps) {
  return (
    <svg viewBox="0 0 120 40" className={className} aria-hidden="true">
      <path
        {...stroke}
        strokeWidth={2.5}
        strokeDasharray="7 8"
        d="M4 26c22-16 48-20 104-12"
      />
      <path {...stroke} strokeWidth={2.5} d="M96 4c6 4 10 7 12 10-5 3-9 6-12 11" />
    </svg>
  );
}

/** The paintbrush. */
export function Paintbrush({ className }: DoodleProps) {
  return (
    <svg viewBox="0 0 120 120" className={className} aria-hidden="true">
      <g {...stroke} strokeWidth={3}>
        <path d="M96 16c5 5 6 11 3 15-3 5-30 30-44 43" />
        <path d="M40 82c-7-8-7-15-2-20 5-6 12-5 19 2 6 7 6 14 0 19-5 5-11 5-17-1z" />
        <path d="M32 92c-6 4-10 11-11 21 11 2 19-2 22-9" />
        <path d="M21 113c-6 1-11 0-14-3" />
      </g>
      <path
        d="M44 84c6-2 13 4 12 11-6 4-13 1-15-4z"
        fill="currentColor"
        opacity={0.85}
      />
    </svg>
  );
}

/** Stick-figure agent holding a brush, painting a browser window. */
export function AgentPainting({ className }: DoodleProps) {
  return (
    <svg viewBox="0 0 520 380" className={className} aria-hidden="true">
      {/* easel / canvas = browser window */}
      <g {...stroke} strokeWidth={3}>
        <path d="M212 44h276c6 0 10 4 10 10v212c0 6-4 10-10 10H214c-6 0-10-4-10-10V56c0-7 4-12 8-12z" />
        <path d="M204 84h294" />
        <circle cx="228" cy="64" r="5" />
        <circle cx="246" cy="64" r="5" />
        <circle cx="264" cy="64" r="5" />
        <path d="M300 58h176" strokeDasharray="5 7" />
        {/* painted hero inside the window */}
        <path d="M232 108h150M232 126h96" strokeWidth={4} />
        <path d="M232 152h72c4 0 6 3 6 6v14c0 4-3 6-6 6h-72c-4 0-6-2-6-6v-14c0-4 2-6 6-6z" />
      </g>
      {/* freshly painted image block */}
      <g>
        <path
          d="M340 150h132c5 0 8 4 8 8v92c0 5-4 8-8 8H340c-5 0-8-4-8-8v-92c0-5 4-8 8-8z"
          fill="currentColor"
          opacity={0.07}
        />
        <g {...stroke} strokeWidth={3}>
          <path d="M340 150h132c5 0 8 4 8 8v92c0 5-4 8-8 8H340c-5 0-8-4-8-8v-92c0-5 4-8 8-8z" />
          <path d="M338 236c22-28 34-30 50-10 12-16 26-24 38-16 10 7 18 15 26 26" />
          <circle cx="366" cy="180" r="10" />
        </g>
      </g>
      {/* easel legs */}
      <g {...stroke} strokeWidth={3}>
        <path d="M262 276l-24 88M436 276l22 88M256 330h182" />
      </g>
      {/* agent stick figure */}
      <g {...stroke} strokeWidth={3.5}>
        <path d="M96 116c0-18 13-30 30-30s30 12 30 30-13 30-30 30-30-12-30-30z" />
        <path d="M112 110h8M136 110h8" strokeWidth={4} />
        <path d="M116 128c7 5 15 5 22 0" />
        <path d="M126 86V68M118 62a8 8 0 1 1 16 0" />
        <path d="M126 146v76M126 172l-38 26M126 168l72-38" />
        <path d="M126 222l-26 62M126 222l28 62" />
      </g>
      {/* brush in hand */}
      <g {...stroke} strokeWidth={3}>
        <path d="M196 130l30-16" />
      </g>
      <path d="M224 108c10-2 18 6 16 16-11 4-19-3-20-10z" fill="currentColor" opacity={0.85} />
      {/* paint splats */}
      <g fill="currentColor" opacity={0.7}>
        <circle cx="74" cy="300" r="5" />
        <circle cx="58" cy="318" r="3" />
        <circle cx="90" cy="326" r="2.5" />
      </g>
    </svg>
  );
}

/** Small MCP plug / socket doodle. */
export function PlugDoodle({ className }: DoodleProps) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
      <g {...stroke} strokeWidth={3}>
        <path d="M30 22v18M50 22v18" />
        <path d="M22 44h36c3 0 5 2 5 5v8c0 12-10 21-23 21S17 69 17 57v-8c0-3 2-5 5-5z" />
        <path d="M40 96V78" />
        <path d="M63 52h20c6 0 10 5 10 11v9" strokeDasharray="5 6" />
      </g>
    </svg>
  );
}

/** A wobbly PNG file card. */
export function PngFile({ className }: DoodleProps) {
  return (
    <svg viewBox="0 0 110 130" className={className} aria-hidden="true">
      <g {...stroke} strokeWidth={3}>
        <path d="M14 8h58l26 26v88c0 4-3 6-6 6H16c-4 0-6-2-6-6V14c0-4 2-6 4-6z" />
        <path d="M70 8v28h28" />
        <path d="M22 104c14-20 22-22 32-6 8-12 16-16 24-8" />
        <circle cx="40" cy="66" r="8" />
      </g>
      <text
        x="55"
        y="126"
        textAnchor="middle"
        fontSize="17"
        fill="currentColor"
        fontFamily="var(--font-hand)"
      >
        .png
      </text>
    </svg>
  );
}

/** Chat bubble = the ChatGPT session. */
export function ChatBubble({ className }: DoodleProps) {
  return (
    <svg viewBox="0 0 120 100" className={className} aria-hidden="true">
      <g {...stroke} strokeWidth={3}>
        <path d="M18 12h84c6 0 10 4 10 10v40c0 6-4 10-10 10H52L26 92l4-20h-12c-6 0-10-4-10-10V22c0-6 4-10 10-10z" />
        <path d="M34 32h52M34 48h34" />
      </g>
    </svg>
  );
}

/** Tiny signature squiggle for the footer. */
export function Signature({ className }: DoodleProps) {
  return (
    <svg viewBox="0 0 140 40" className={className} aria-hidden="true">
      <path
        {...stroke}
        strokeWidth={2.5}
        d="M6 30c10-18 16-18 18 0 3-16 9-20 14-6 4-14 10-16 15-2 4-12 10-14 16 2 6-14 14-14 20 2 6-10 12-12 18-6 5 4 12 6 21 4"
      />
    </svg>
  );
}
