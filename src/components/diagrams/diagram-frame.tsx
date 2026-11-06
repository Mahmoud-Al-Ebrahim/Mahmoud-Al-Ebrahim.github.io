"use client";

import { useId, useState, type ReactNode } from "react";
import { diagramsAr } from "@/content/ar/diagrams";
import type { DiagramId } from "@/content/schema";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionary";
import { cn } from "@/lib/cn";

export type DiagramNode = { id: string; label: string; detail: string };

export type DiagramContext = {
  active: string | null;
  setActive: (id: string | null) => void;
};

/**
 * Accessible wrapper for an SVG diagram. The legend buttons are the
 * interactive controls (keyboard-reachable). Hover or focus previews a node;
 * a click pins it. The drawing highlights the active node and its detail is
 * read into a live region.
 */
export function DiagramFrame({
  title,
  description,
  nodes,
  minWidth = 720,
  children,
  className,
  diagramId,
  locale = "en",
}: {
  /** With an Arabic locale, the caption and legend come from the diagram's translation. The drawing stays in English. */
  diagramId?: DiagramId;
  locale?: Locale;
  title: string;
  description: string;
  nodes: DiagramNode[];
  minWidth?: number;
  children: (ctx: DiagramContext) => ReactNode;
  className?: string;
}) {
  const tr = locale === "ar" && diagramId ? diagramsAr[diagramId] : undefined;
  if (tr) {
    title = tr.title;
    description = tr.description;
    nodes = nodes.map((n) => ({ ...n, ...(tr.nodes[n.id] ?? {}) }));
  }
  const t = getDictionary(locale).diagram;
  const [pinned, setPinned] = useState<string | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const captionId = useId();
  const active = hovered ?? pinned;
  const current = nodes.find((n) => n.id === active);

  return (
    <figure
      aria-labelledby={captionId}
      data-active={active ?? undefined}
      className={cn("min-w-0 max-w-full rounded-[6px] border border-rule bg-surface/60 p-4 md:p-6", className)}
    >
      <figcaption id={captionId} className="text-step--1 text-muted">
        <span className="font-display text-step-0 not-italic text-ink">{title}.</span> {description}
      </figcaption>
      <div className="mt-4 overflow-x-auto" role="region" aria-label={t.region(title)} tabIndex={0} dir="ltr">
        <div style={{ minWidth }} className="text-ink">
          {children({ active, setActive: setHovered })}
        </div>
      </div>
      <div className="mt-4 grid gap-4 md:grid-cols-12">
        <ul className="flex flex-wrap gap-2 md:col-span-7" aria-label={t.parts}>
          {nodes.map((n) => (
            <li key={n.id}>
              <button
                type="button"
                aria-pressed={pinned === n.id}
                onClick={() => setPinned((p) => (p === n.id ? null : n.id))}
                onMouseEnter={() => setHovered(n.id)}
                onMouseLeave={() => setHovered(null)}
                onFocus={() => setHovered(n.id)}
                onBlur={() => setHovered(null)}
                className={cn(
                  "rounded-full border px-3 py-1 text-step--1 transition-colors",
                  active === n.id ? "border-laurel bg-laurel text-paper" : "border-rule text-ink hover:border-laurel",
                )}
              >
                {n.label}
              </button>
            </li>
          ))}
        </ul>
        <p role="status" aria-live="polite" className="min-h-[3lh] text-step--1 text-muted md:col-span-5">
          {current ? current.detail : t.hint}
        </p>
      </div>
    </figure>
  );
}
