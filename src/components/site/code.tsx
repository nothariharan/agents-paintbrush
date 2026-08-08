import type { ReactNode } from "react";

/**
 * Tiny hand-rolled syntax highlighter for the install snippets.
 * Colours come from the doodle palette so code blocks match the rest of the site.
 */

type Tone =
  | "cmd"
  | "flag"
  | "url"
  | "str"
  | "key"
  | "num"
  | "punct"
  | "bool"
  | "plain"
  | "comment";

const TONE_CLASS: Record<Tone, string> = {
  cmd: "text-code-cmd font-bold",
  flag: "text-code-flag",
  url: "text-code-url underline decoration-dotted decoration-from-font",
  str: "text-code-str",
  key: "text-code-key font-bold",
  num: "text-code-num",
  bool: "text-code-num",
  punct: "text-code-punct",
  plain: "text-code-plain",
  comment: "text-code-punct italic",
};

function Tok({ tone, children }: { tone: Tone; children: ReactNode }) {
  return <span className={TONE_CLASS[tone]}>{children}</span>;
}

const SHELL_WORDS = new Set([
  "git",
  "npm",
  "npx",
  "bun",
  "node",
  "cd",
  "clone",
  "install",
  "run",
  "login",
  "start",
  "build",
]);

/** Highlights a single-line shell command. */
export function ShellLine({ value }: { value: string }) {
  const parts = value.split(/(\s+)/);
  let seenCmd = false;
  return (
    <>
      {parts.map((p, i) => {
        if (/^\s+$/.test(p)) return <span key={i}>{p}</span>;
        let tone: Tone = "plain";
        if (p.startsWith("#")) tone = "comment";
        else if (/^https?:\/\//.test(p)) tone = "url";
        else if (p.startsWith("-")) tone = "flag";
        else if (SHELL_WORDS.has(p)) {
          tone = seenCmd ? "cmd" : "cmd";
          seenCmd = true;
        } else if (/^\d/.test(p)) tone = "num";
        return (
          <Tok key={i} tone={tone}>
            {p}
          </Tok>
        );
      })}
    </>
  );
}

/** Highlights a JSON snippet (keys, strings, punctuation, numbers, booleans). */
export function JsonBlock({ value }: { value: string }) {
  const tokens = value.match(/"(?:[^"\\]|\\.)*"\s*:|"(?:[^"\\]|\\.)*"|[{}[\],]|\s+|[^\s{}[\],"]+/g);
  return (
    <>
      {(tokens ?? [value]).map((t, i) => {
        let tone: Tone = "plain";
        if (/^\s+$/.test(t)) return <span key={i}>{t}</span>;
        if (t.endsWith(":")) tone = "key";
        else if (t.startsWith('"')) tone = /^"(https?:\/\/|[/~.])/.test(t) ? "url" : "str";
        else if (/^[{}[\],]$/.test(t)) tone = "punct";
        else if (/^(true|false|null)$/.test(t)) tone = "bool";
        else if (/^-?\d/.test(t)) tone = "num";
        return (
          <Tok key={i} tone={tone}>
            {t}
          </Tok>
        );
      })}
    </>
  );
}

/** Chunky doodle terminal shell around a code snippet. */
export function CodeCard({
  children,
  action,
  label,
  multiline = false,
}: {
  children: ReactNode;
  action?: ReactNode;
  label?: string;
  multiline?: boolean;
}) {
  return (
    <div className="code-card">
      <div className="flex items-center gap-2 border-b-[3px] border-ink bg-code-bar px-3 py-1.5">
        <span className="h-3 w-3 rounded-full border-2 border-ink bg-doodle-coral" />
        <span className="h-3 w-3 rounded-full border-2 border-ink bg-doodle-yellow" />
        <span className="h-3 w-3 rounded-full border-2 border-ink bg-doodle-mint" />
        <span className="hand ml-1 text-lg text-code-plain/70">{label ?? "terminal"}</span>
        {action && <span className="ml-auto">{action}</span>}
      </div>
      <div className="flex items-start gap-3 bg-code-bg px-4 py-3">
        {!multiline && <span className="text-code-prompt select-none font-mono text-sm">$</span>}
        {multiline ? (
          <pre className="overflow-x-auto font-mono text-xs leading-relaxed">{children}</pre>
        ) : (
          <code className="overflow-x-auto font-mono text-sm whitespace-nowrap">{children}</code>
        )}
      </div>
    </div>
  );
}
