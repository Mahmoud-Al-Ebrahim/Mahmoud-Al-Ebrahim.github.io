import type { ElementType } from "react";
import type { Locale } from "@/i18n/config";
import { cn } from "@/lib/cn";

type Size = "hero" | "display" | "title" | "inline";

const sizes: Record<Size, { primary: string; secondary: string }> = {
  hero: { primary: "text-step-6", secondary: "text-step-5" },
  display: { primary: "text-step-5", secondary: "text-step-4" },
  title: { primary: "text-step-3", secondary: "text-step-2" },
  inline: { primary: "", secondary: "text-[0.95em]" },
};

/**
 * A product name in both scripts, each marked for language and direction.
 * On English pages the Latin name leads; on Arabic pages the Arabic name
 * leads and the Latin name follows. Both are set in Readex Pro, so they read
 * as one voice.
 */
export function ArabicName({
  latin,
  arabic,
  as: Tag = "span",
  size = "inline",
  className,
  id,
  locale = "en",
}: {
  latin: string;
  arabic?: string;
  as?: ElementType;
  size?: Size;
  className?: string;
  id?: string;
  locale?: Locale;
}) {
  const s = sizes[size];
  const arabicFirst = locale === "ar" && !!arabic;
  const primary = arabicFirst ? arabic : latin;
  const secondary = arabicFirst ? latin : arabic;
  const secondaryLang = arabicFirst ? { lang: "en", dir: "ltr" as const } : { lang: "ar", dir: "rtl" as const };
  return (
    <Tag
      id={id}
      className={cn(size === "inline" ? "inline-flex" : "flex", "flex-wrap items-baseline gap-x-[0.35em] gap-y-1", s.primary, className)}
    >
      <span>{primary}</span>
      {secondary ? (
        <span {...secondaryLang} className={cn(arabicFirst ? "font-[400]" : "font-arabic font-[450]", "opacity-60", s.secondary)}>
          {secondary}
        </span>
      ) : null}
    </Tag>
  );
}

/**
 * The name in the other script, placed after a link that carries the
 * primary name, so the link's accessible name stays one name.
 */
export function SecondaryName({
  name,
  nameAr,
  locale = "en",
  className,
}: {
  name: string;
  nameAr?: string;
  locale?: Locale;
  className?: string;
}) {
  const other = locale === "ar" ? (nameAr ? name : undefined) : nameAr;
  if (!other) return null;
  const attrs = locale === "ar" ? { lang: "en", dir: "ltr" as const } : { lang: "ar", dir: "rtl" as const };
  return (
    <span className={cn("ms-2", className)}>
      <span {...attrs} className={locale === "ar" ? undefined : "font-arabic"}>
        {other}
      </span>
    </span>
  );
}

/** The name to use in running text and links: Arabic on Arabic pages when there is one. */
export function localName(entry: { name: string; nameAr?: string }, locale: Locale): string {
  return locale === "ar" && entry.nameAr ? entry.nameAr : entry.name;
}
