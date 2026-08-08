/**
 * Paint-overflow divider: the previous section's colour drips down over the next one.
 * Replaces the old repeating doodle strip between colour changes.
 */
const DRIP =
  "M0,0 H1440 V30 C1440,54.2 1430.28,74 1413.0,74 C1395.72,74 1386,54.2 1386,30 C1386,63.0 1375.56,90 1357.0,90 C1338.44,90 1328,63.0 1328,30 C1328,82.80000000000001 1319.72,126 1305.0,126 C1290.28,126 1282,82.80000000000001 1282,30 C1282,54.2 1273.72,74 1259.0,74 C1244.28,74 1236,54.2 1236,30 C1236,72.9 1218.0,108 1186.0,108 C1154.0,108 1136,72.9 1136,30 C1136,82.80000000000001 1127.72,126 1113.0,126 C1098.28,126 1090,82.80000000000001 1090,30 C1090,82.80000000000001 1068.4,126 1030.0,126 C991.6,126 970,82.80000000000001 970,30 C970,59.7 959.56,84 941.0,84 C922.44,84 912,59.7 912,30 C912,45.400000000000006 894.0,58 862.0,58 C830.0,58 812,45.400000000000006 812,30 C812,49.8 803.72,66 789.0,66 C774.28,66 766,49.8 766,30 C766,72.9 748.0,108 716.0,108 C684.0,108 666,72.9 666,30 C666,45.400000000000006 655.56,58 637.0,58 C618.44,58 608,45.400000000000006 608,30 C608,45.400000000000006 592.52,58 565.0,58 C537.48,58 522,45.400000000000006 522,30 C522,72.9 513.72,108 499.0,108 C484.28,108 476,72.9 476,30 C476,45.400000000000006 465.56,58 447.0,58 C428.44,58 418,45.400000000000006 418,30 C418,82.80000000000001 409.72,126 395.0,126 C380.28,126 372,82.80000000000001 372,30 C372,82.80000000000001 359.4,126 337.0,126 C314.6,126 302,82.80000000000001 302,30 C302,45.400000000000006 284.0,58 252.0,58 C220.0,58 202,45.400000000000006 202,30 C202,45.400000000000006 193.72,58 179.0,58 C164.28,58 156,45.400000000000006 156,30 C156,59.7 140.51999999999998,84 113.0,84 C85.48,84 70,59.7 70,30 C70,54.2 57.4,74 35.0,74 C12.6,74 0,54.2 0,30 Z";

/** the same silhouette without the straight top edge or the closing line */
const DRIP_EDGE = `M1440,30 ${DRIP.slice(DRIP.indexOf("C1440")).replace(/\s*Z\s*$/, "")}`;

const BLOBS: [number, number, number][] = [
  [337, 138, 10],
  [716, 126, 7],
  [1030, 141, 10],
  [1186, 124, 7],
  [1305, 136, 9],
];

const TONE: Record<string, string> = {
  paper: "var(--paper)",
  "paper-deep": "var(--paper-deep)",
  mint: "var(--doodle-mint)",
  pink: "var(--doodle-pink)",
  yellow: "var(--doodle-yellow)",
  blue: "var(--doodle-blue)",
  coral: "var(--doodle-coral)",
  purple: "var(--doodle-purple)",
};

export function PaintDrip({
  /** colour of the section above — the paint that drips down */
  from,
  /** colour of the section below */
  to,
  className,
}: {
  from: keyof typeof TONE | string;
  to: keyof typeof TONE | string;
  className?: string;
}) {
  return (
    <div
      aria-hidden="true"
      className={`relative ${className ?? ""}`}
      style={{ backgroundColor: TONE[to] ?? to }}
    >
      <svg
        viewBox="0 0 1440 170"
        preserveAspectRatio="none"
        className="block h-20 w-full sm:h-28"
        style={{ color: TONE[from] ?? from }}
      >
        <path d={DRIP} fill="currentColor" />
        {/* stroke only the dripping contour — never the flat top/bottom edges */}
        <path
          d={DRIP_EDGE}
          fill="none"
          stroke="var(--ink)"
          strokeWidth="4"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
        />
        {BLOBS.map(([cx, cy, r]) => (
          <ellipse
            key={cx}
            cx={cx}
            cy={cy}
            rx={r}
            ry={r * 1.25}
            fill="currentColor"
            stroke="var(--ink)"
            strokeWidth="4"
            vectorEffect="non-scaling-stroke"
          />
        ))}
      </svg>
    </div>
  );
}
