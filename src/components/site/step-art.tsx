/** Clear scrapbook doodle illustrations for the how-it-works steps. */

type ArtProps = { className?: string };

export function StepArtRegister({ className }: ArtProps) {
  return (
    <svg viewBox="0 0 420 320" className={className} role="img" aria-label="Editor window with smiling MCP plug">
      <rect width="420" height="320" fill="#e8f2f8" />
      <g stroke="#c5d8e6" strokeWidth="1">
        {Array.from({ length: 16 }, (_, i) => (
          <line key={`v${i}`} x1={20 + i * 24} y1="0" x2={20 + i * 24} y2="320" />
        ))}
        {Array.from({ length: 12 }, (_, i) => (
          <line key={`h${i}`} x1="0" y1={16 + i * 26} x2="420" y2={16 + i * 26} />
        ))}
      </g>

      {/* smiling plug */}
      <g transform="translate(28 118)">
        <path
          d="M18 22c-10 0-16 8-16 20v36c0 8 6 14 14 14h34c8 0 14-6 14-14V42c0-12-6-20-16-20H18Z"
          fill="#1f2430"
          stroke="#1f2430"
          strokeWidth="3"
        />
        <circle cx="28" cy="48" r="3.5" fill="#f4cd4f" />
        <circle cx="46" cy="48" r="3.5" fill="#f4cd4f" />
        <path d="M30 62c4 5 12 5 16 0" fill="none" stroke="#f4cd4f" strokeWidth="3" strokeLinecap="round" />
        <rect x="62" y="40" width="28" height="18" rx="3" fill="#f4cd4f" stroke="#1f2430" strokeWidth="2.5" />
        <rect x="82" y="34" width="10" height="8" fill="#f4cd4f" stroke="#1f2430" strokeWidth="2" />
        <rect x="82" y="56" width="10" height="8" fill="#f4cd4f" stroke="#1f2430" strokeWidth="2" />
      </g>

      {/* editor window */}
      <g transform="translate(118 54)">
        <rect x="0" y="0" width="260" height="210" rx="14" fill="#fff" stroke="#1f2430" strokeWidth="3.5" />
        <path d="M0 34h260" stroke="#1f2430" strokeWidth="2.5" />
        <rect x="0" y="0" width="260" height="34" rx="14" fill="#b8e0f0" />
        <rect x="0" y="18" width="260" height="16" fill="#b8e0f0" />
        <circle cx="22" cy="17" r="6" fill="#f27b7b" stroke="#1f2430" strokeWidth="1.5" />
        <circle cx="42" cy="17" r="6" fill="#f4cd4f" stroke="#1f2430" strokeWidth="1.5" />
        <circle cx="62" cy="17" r="6" fill="#7dce9a" stroke="#1f2430" strokeWidth="1.5" />
        <text x="88" y="22" fontFamily="IBM Plex Mono, monospace" fontSize="11" fill="#1f2430">
          mcp.json
        </text>

        <text x="24" y="70" fontFamily="IBM Plex Mono, monospace" fontSize="13" fill="#6b7280">
          {"{"}
        </text>
        <text x="36" y="96" fontFamily="IBM Plex Mono, monospace" fontSize="14" fill="#1f2430">
          "mcpServers": {"{"}
        </text>
        <text x="52" y="124" fontFamily="IBM Plex Mono, monospace" fontSize="15" fontWeight="600" fill="#2a8f6a">
          "image-gen": {"{"}
        </text>
        <text x="68" y="150" fontFamily="IBM Plex Mono, monospace" fontSize="13" fill="#1f2430">
          "command": "node"
        </text>
        <text x="52" y="176" fontFamily="IBM Plex Mono, monospace" fontSize="15" fill="#2a8f6a">
          {"}"}
        </text>
        <text x="36" y="200" fontFamily="IBM Plex Mono, monospace" fontSize="14" fill="#1f2430">
          {"}"}
        </text>
      </g>

      <g transform="translate(330 28) rotate(8)">
        <rect width="62" height="28" rx="8" fill="#f4cd4f" stroke="#1f2430" strokeWidth="2" />
        <text x="31" y="19" textAnchor="middle" fontFamily="Caveat, cursive" fontSize="16" fill="#1f2430">
          plug in
        </text>
      </g>
    </svg>
  );
}

export function StepArtAsk({ className }: ArtProps) {
  return (
    <svg viewBox="0 0 420 320" className={className} role="img" aria-label="Developer asking robot agent for an image">
      <rect width="420" height="320" fill="#fceef3" />
      <g stroke="#efd0da" strokeWidth="1">
        {Array.from({ length: 16 }, (_, i) => (
          <line key={`v${i}`} x1={20 + i * 24} y1="0" x2={20 + i * 24} y2="320" />
        ))}
        {Array.from({ length: 12 }, (_, i) => (
          <line key={`h${i}`} x1="0" y1={16 + i * 26} x2="420" y2={16 + i * 26} />
        ))}
      </g>

      {/* chat card */}
      <rect x="40" y="36" width="340" height="248" rx="18" fill="#fff" stroke="#1f2430" strokeWidth="3.5" />
      <text x="60" y="70" fontFamily="Caveat, cursive" fontSize="22" fill="#1f2430">
        same conversation
      </text>

      {/* user bubble */}
      <g transform="translate(56 90)">
        <path
          d="M12 0h180c10 0 18 8 18 18v52c0 10-8 18-18 18H40l-20 16 4-16H12C2 88 0 80 0 70V18C0 8 2 0 12 0Z"
          fill="#ffe8a8"
          stroke="#1f2430"
          strokeWidth="2.5"
        />
        <text x="18" y="28" fontFamily="IBM Plex Mono, monospace" fontSize="12" fill="#1f2430">
          make a hero image
        </text>
        <text x="18" y="48" fontFamily="IBM Plex Mono, monospace" fontSize="12" fill="#1f2430">
          of a ceramic mug
        </text>
      </g>

      {/* robot */}
      <g transform="translate(250 150)">
        <circle cx="60" cy="55" r="48" fill="#f7f7f5" stroke="#1f2430" strokeWidth="3.5" />
        <rect x="34" y="42" width="52" height="22" rx="11" fill="#1f2430" />
        <path d="M42 50c4 6 12 8 20 0" fill="none" stroke="#7dce9a" strokeWidth="3.5" strokeLinecap="round" />
        <path d="M62 50c4 6 12 8 20 0" fill="none" stroke="#7dce9a" strokeWidth="3.5" strokeLinecap="round" />
        <rect x="48" y="100" width="24" height="18" rx="4" fill="#f4a7b9" stroke="#1f2430" strokeWidth="2" />
        <text x="60" y="140" textAnchor="middle" fontFamily="Caveat, cursive" fontSize="20" fill="#1f2430">
          on it!
        </text>
      </g>

      {/* agent reply bubble */}
      <g transform="translate(210 98)">
        <rect width="150" height="40" rx="14" fill="#c9f0dc" stroke="#1f2430" strokeWidth="2.5" />
        <text x="16" y="26" fontFamily="IBM Plex Mono, monospace" fontSize="12" fill="#1f2430">
          calling generate_image…
        </text>
      </g>
    </svg>
  );
}

export function StepArtBrowser({ className }: ArtProps) {
  return (
    <svg viewBox="0 0 420 320" className={className} role="img" aria-label="Robot walking a dedicated browser on a leash">
      <rect width="420" height="320" fill="#e6f6ef" />
      <g stroke="#c5e6d6" strokeWidth="1">
        {Array.from({ length: 16 }, (_, i) => (
          <line key={`v${i}`} x1={20 + i * 24} y1="0" x2={20 + i * 24} y2="320" />
        ))}
        {Array.from({ length: 12 }, (_, i) => (
          <line key={`h${i}`} x1="0" y1={16 + i * 26} x2="420" y2={16 + i * 26} />
        ))}
      </g>

      {/* robot */}
      <g transform="translate(48 120)">
        <circle cx="50" cy="50" r="42" fill="#fff" stroke="#1f2430" strokeWidth="3.5" />
        <rect x="28" y="38" width="44" height="20" rx="10" fill="#1f2430" />
        <path d="M34 45c4 5 10 6 16 0" stroke="#7dce9a" strokeWidth="3" fill="none" strokeLinecap="round" />
        <path d="M50 45c4 5 10 6 16 0" stroke="#7dce9a" strokeWidth="3" fill="none" strokeLinecap="round" />
        <path d="M90 55c40 -10 80 -8 120 8" fill="none" stroke="#1f2430" strokeWidth="3" strokeDasharray="6 5" />
      </g>

      {/* browser character */}
      <g transform="translate(210 70)">
        <rect width="170" height="140" rx="16" fill="#fff" stroke="#1f2430" strokeWidth="3.5" />
        <rect width="170" height="28" rx="16" fill="#d7e8ff" />
        <rect y="14" width="170" height="14" fill="#d7e8ff" />
        <circle cx="18" cy="14" r="5" fill="#f27b7b" />
        <circle cx="34" cy="14" r="5" fill="#f4cd4f" />
        <circle cx="50" cy="14" r="5" fill="#7dce9a" />
        <rect x="20" y="48" width="130" height="16" rx="6" fill="#eef2f7" stroke="#1f2430" strokeWidth="1.5" />
        <text x="28" y="60" fontFamily="IBM Plex Mono, monospace" fontSize="10" fill="#6b7280">
          chatgpt.com
        </text>
        <circle cx="85" cy="100" r="22" fill="#fceef3" stroke="#1f2430" strokeWidth="2.5" />
        <circle cx="78" cy="96" r="2.5" fill="#1f2430" />
        <circle cx="92" cy="96" r="2.5" fill="#1f2430" />
        <path d="M78 108c4 4 10 4 14 0" stroke="#1f2430" strokeWidth="2" fill="none" />
        <text x="85" y="168" textAnchor="middle" fontFamily="Caveat, cursive" fontSize="20" fill="#1f2430">
          dedicated Edge
        </text>
      </g>

      <g transform="translate(40 40) rotate(-6)">
        <rect width="120" height="32" rx="8" fill="#fff" stroke="#1f2430" strokeWidth="2" />
        <text x="12" y="22" fontFamily="IBM Plex Mono, monospace" fontSize="11" fill="#1f2430">
          your tabs safe ✓
        </text>
      </g>
    </svg>
  );
}

export function StepArtPaint({ className }: ArtProps) {
  return (
    <svg viewBox="0 0 420 320" className={className} role="img" aria-label="ChatGPT painting an image with a brush">
      <rect width="420" height="320" fill="#fff4e8" />
      <g stroke="#edd9c2" strokeWidth="1">
        {Array.from({ length: 16 }, (_, i) => (
          <line key={`v${i}`} x1={20 + i * 24} y1="0" x2={20 + i * 24} y2="320" />
        ))}
        {Array.from({ length: 12 }, (_, i) => (
          <line key={`h${i}`} x1="0" y1={16 + i * 26} x2="420" y2={16 + i * 26} />
        ))}
      </g>

      <g transform="translate(48 48)">
        <rect width="240" height="200" rx="16" fill="#fff" stroke="#1f2430" strokeWidth="3.5" />
        <rect width="240" height="30" rx="16" fill="#f4a7b9" />
        <rect y="16" width="240" height="14" fill="#f4a7b9" />
        <text x="16" y="21" fontFamily="IBM Plex Mono, monospace" fontSize="11" fill="#1f2430">
          ChatGPT · image
        </text>
        {/* painted canvas */}
        <rect x="28" y="54" width="184" height="118" rx="10" fill="#e8f2f8" stroke="#1f2430" strokeWidth="2.5" />
        <circle cx="70" cy="90" r="18" fill="#f4cd4f" stroke="#1f2430" strokeWidth="2" />
        <path d="M40 150c20-30 40-20 60-40 18 10 40 20 70 8" fill="none" stroke="#7dce9a" strokeWidth="8" strokeLinecap="round" />
        <path d="M48 160h140" stroke="#c4a484" strokeWidth="6" strokeLinecap="round" />
      </g>

      {/* dripping brush */}
      <g transform="translate(280 70) rotate(18)">
        <rect x="18" y="0" width="18" height="90" rx="4" fill="#c4a484" stroke="#1f2430" strokeWidth="2.5" />
        <rect x="8" y="88" width="38" height="28" rx="6" fill="#1f2430" />
        <path d="M10 116c8 18 18 34 28 48" fill="none" stroke="#f4a7b9" strokeWidth="10" strokeLinecap="round" />
        <circle cx="18" cy="175" r="7" fill="#f4a7b9" />
        <circle cx="36" cy="188" r="5" fill="#f4a7b9" />
      </g>

      <text x="210" y="290" textAnchor="middle" fontFamily="Caveat, cursive" fontSize="24" fill="#1f2430">
        ChatGPT paints it
      </text>
    </svg>
  );
}

export function StepArtShip({ className }: ArtProps) {
  return (
    <svg viewBox="0 0 420 320" className={className} role="img" aria-label="PNG file dropping into a project folder">
      <rect width="420" height="320" fill="#efe8fb" />
      <g stroke="#d8ccec" strokeWidth="1">
        {Array.from({ length: 16 }, (_, i) => (
          <line key={`v${i}`} x1={20 + i * 24} y1="0" x2={20 + i * 24} y2="320" />
        ))}
        {Array.from({ length: 12 }, (_, i) => (
          <line key={`h${i}`} x1="0" y1={16 + i * 26} x2="420" y2={16 + i * 26} />
        ))}
      </g>

      {/* folder */}
      <g transform="translate(70 120)">
        <path
          d="M0 28h70l18 20h172c12 0 20 8 20 20v110c0 14-10 24-24 24H24C10 202 0 192 0 178V28Z"
          fill="#f4cd4f"
          stroke="#1f2430"
          strokeWidth="3.5"
        />
        <text x="40" y="110" fontFamily="IBM Plex Mono, monospace" fontSize="16" fill="#1f2430">
          public/
        </text>
        <text x="40" y="138" fontFamily="IBM Plex Mono, monospace" fontSize="13" fill="#1f2430">
          speckled-mug.png
        </text>
      </g>

      {/* flying PNG */}
      <g transform="translate(250 40) rotate(8)">
        <rect width="110" height="90" rx="10" fill="#fff" stroke="#1f2430" strokeWidth="3" />
        <rect x="14" y="14" width="82" height="48" rx="6" fill="#c9f0dc" stroke="#1f2430" strokeWidth="2" />
        <circle cx="36" cy="34" r="8" fill="#f4cd4f" />
        <path d="M20 52c14-12 28-4 42-16 10 6 20 10 34 4" fill="none" stroke="#7dce9a" strokeWidth="4" />
        <text x="55" y="80" textAnchor="middle" fontFamily="IBM Plex Mono, monospace" fontSize="12" fill="#1f2430">
          .png
        </text>
      </g>

      <path d="M300 140c-10 20-20 36-40 50" fill="none" stroke="#1f2430" strokeWidth="3" strokeDasharray="5 4" />
      <text x="210" y="290" textAnchor="middle" fontFamily="Caveat, cursive" fontSize="22" fill="#1f2430">
        lands in your repo
      </text>
    </svg>
  );
}

export const STEP_ARTS = [
  StepArtRegister,
  StepArtAsk,
  StepArtBrowser,
  StepArtPaint,
  StepArtShip,
] as const;
