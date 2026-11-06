"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { switchLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionary";
import { cn } from "@/lib/cn";

/**
 * Links to the same page in the other language. The label is written in the
 * target language and marked with its `lang`, so screen readers pronounce it
 * correctly.
 */
export function LanguageSwitch({ locale, className, onNavigate }: { locale: Locale; className?: string; onNavigate?: () => void }) {
  const pathname = usePathname() ?? "/";
  const target: Locale = locale === "en" ? "ar" : "en";
  const t = getDictionary(locale).languageSwitch;
  return (
    <Link
      href={switchLocale(pathname, target)}
      hrefLang={target}
      lang={t.lang}
      aria-label={t.aria}
      onClick={onNavigate}
      data-testid="language-switch"
      className={cn(
        "inline-flex h-9 items-center justify-center rounded-full border border-rule px-3 text-step--1 font-medium text-ink transition-colors hover:border-ink",
        className,
      )}
    >
      {t.label}
    </Link>
  );
}
