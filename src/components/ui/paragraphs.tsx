import { cn } from "@/lib/cn";

/** Renders a plain-text block as paragraphs split on blank lines, with `code` spans. */
export function Paragraphs({ text, className }: { text: string; className?: string }) {
  const parts = text.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean);
  return (
    <div className={cn("prose-journal", className)}>
      {parts.map((p, i) => (
        <p key={i}>{renderInline(p)}</p>
      ))}
    </div>
  );
}

function renderInline(text: string) {
  const segments = text.split(/(`[^`]+`)/g);
  return segments.map((s, i) =>
    s.startsWith("`") && s.endsWith("`") ? <code key={i}>{s.slice(1, -1)}</code> : <span key={i}>{s}</span>,
  );
}
