import type { ElementType } from "react";
import { cn } from "@/lib/cn";

type Size = "hero" | "display" | "title" | "inline";

const sizes: Record<Size, { latin: string; arabic: string }> = {
  hero: { latin: "text-step-6", arabic: "text-step-5" },
  display: { latin: "text-step-5", arabic: "text-step-4" },
  title: { latin: "text-step-3", arabic: "text-step-2" },
  inline: { latin: "", arabic: "text-[0.95em]" },
};

/**
 * A product name in Latin with its Arabic name beside it, marked for language
 * and direction. Both scripts are set in Readex Pro, so they read as one voice.
 */
export function ArabicName({
  latin,
  arabic,
  as: Tag = "span",
  size = "inline",
  className,
  id,
}: {
  latin: string;
  arabic?: string;
  as?: ElementType;
  size?: Size;
  className?: string;
  id?: string;
}) {
  const s = sizes[size];
  return (
    <Tag
      id={id}
      className={cn(size === "inline" ? "inline-flex" : "flex", "flex-wrap items-baseline gap-x-[0.35em] gap-y-1", s.latin, className)}
    >
      <span>{latin}</span>
      {arabic ? (
        <span lang="ar" dir="rtl" className={cn("font-arabic font-[450] opacity-60", s.arabic)}>
          {arabic}
        </span>
      ) : null}
    </Tag>
  );
}
