"use client";

import { cn } from "@/lib/cn";
import type { DiagramContext } from "./diagram-frame";

/** A labeled box. Highlights when it is the active node. */
export function Box({
  id,
  x,
  y,
  w,
  h,
  label,
  sub,
  ctx,
  tone = "default",
}: {
  id: string;
  x: number;
  y: number;
  w: number;
  h: number;
  label: string;
  sub?: string;
  ctx: DiagramContext;
  tone?: "default" | "laurel" | "copper" | "muted";
}) {
  const active = ctx.active === id;
  const dimmed = ctx.active !== null && !active;
  const stroke = tone === "laurel" ? "var(--laurel)" : tone === "copper" ? "var(--copper)" : tone === "muted" ? "var(--muted)" : "currentColor";
  return (
    <g
      className={cn("dg-node", active && "is-active")}
      style={{ opacity: dimmed ? 0.4 : 1, transition: "opacity .2s" }}
      onMouseEnter={() => ctx.setActive(id)}
      onMouseLeave={() => ctx.setActive(null)}
      aria-hidden
    >
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx={4}
        fill={active ? "var(--laurel)" : "var(--paper)"}
        stroke={active ? "var(--laurel)" : stroke}
        strokeWidth={active ? 2 : 1}
      />
      <text
        x={x + w / 2}
        y={y + (sub ? h / 2 - 6 : h / 2 + 1)}
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize={13}
        fontFamily="var(--font-sans)"
        fontWeight={500}
        fill={active ? "var(--paper)" : "currentColor"}
      >
        {label}
      </text>
      {sub ? (
        <text
          x={x + w / 2}
          y={y + h / 2 + 11}
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize={11}
          fontFamily="var(--font-mono)"
          fill={active ? "var(--paper)" : "var(--muted)"}
        >
          {sub}
        </text>
      ) : null}
    </g>
  );
}

/** A straight or elbowed connector with an arrowhead. */
export function Edge({
  from,
  to,
  label,
  dashed = false,
  via,
}: {
  from: [number, number];
  to: [number, number];
  label?: string;
  dashed?: boolean;
  via?: [number, number][];
}) {
  const points = [from, ...(via ?? []), to];
  const d = points.map((p, i) => `${i === 0 ? "M" : "L"}${p[0]} ${p[1]}`).join(" ");
  const mid = points[Math.floor(points.length / 2)];
  const prev = points[Math.floor(points.length / 2) - 1] ?? mid;
  const lx = (mid[0] + prev[0]) / 2;
  const ly = (mid[1] + prev[1]) / 2;
  return (
    <g aria-hidden>
      <path d={d} fill="none" stroke="var(--muted)" strokeWidth={1} strokeDasharray={dashed ? "4 3" : undefined} markerEnd="url(#dg-arrow)" />
      {label ? (
        <text x={lx} y={ly - 5} textAnchor="middle" fontSize={10.5} fontFamily="var(--font-mono)" fill="var(--muted)">
          {label}
        </text>
      ) : null}
    </g>
  );
}

export function Lane({ x, y, w, h, label }: { x: number; y: number; w: number; h: number; label: string }) {
  return (
    <g aria-hidden>
      <rect x={x} y={y} width={w} height={h} fill="none" stroke="var(--rule)" strokeDasharray="3 3" rx={6} />
      <text x={x + 10} y={y + 16} fontSize={11} fontFamily="var(--font-display)" fontStyle="italic" fill="var(--laurel)">
        {label}
      </text>
    </g>
  );
}

export function Defs() {
  return (
    <defs>
      <marker id="dg-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
        <path d="M0 0 L10 5 L0 10 z" fill="var(--muted)" />
      </marker>
    </defs>
  );
}
