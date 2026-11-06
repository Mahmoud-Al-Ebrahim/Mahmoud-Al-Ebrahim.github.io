/**
 * Two locales. English lives at the site root (unchanged URLs); Arabic lives
 * under /ar with the same paths below it.
 */
export const LOCALES = ["en", "ar"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "en";

export const LOCALE_META: Record<Locale, { lang: string; dir: "ltr" | "rtl"; og: string; label: string; intl: string }> = {
  en: { lang: "en", dir: "ltr", og: "en_US", label: "English", intl: "en-US" },
  // Latin digits, Gregorian calendar, Modern Standard Arabic month names.
  ar: { lang: "ar", dir: "rtl", og: "ar_AR", label: "العربية", intl: "ar-u-nu-latn-ca-gregory" },
};

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

/**
 * The URL of an internal path in a locale. External URLs, mail links,
 * in-page anchors and files (the CV PDF) are returned unchanged.
 */
export function localeHref(locale: Locale, path: string): string {
  if (!path.startsWith("/") || path.startsWith("//") || /\.[a-z0-9]+$/i.test(path)) return path;
  if (locale === DEFAULT_LOCALE) return path;
  return path === "/" ? `/${locale}` : `/${locale}${path}`;
}

/** Splits a pathname into its locale and the locale-free path. */
export function splitLocale(pathname: string): { locale: Locale; path: string } {
  const m = pathname.match(/^\/(ar)(?=\/|$)(.*)$/);
  if (m) return { locale: "ar", path: m[2] || "/" };
  return { locale: DEFAULT_LOCALE, path: pathname || "/" };
}

/** The same page in another locale. */
export function switchLocale(pathname: string, to: Locale): string {
  return localeHref(to, splitLocale(pathname).path);
}

/** "2026-01" or "present" as "Jan 2026" / "يناير 2026". */
export function formatMonth(ym: string, locale: Locale, presentLabel: string): string {
  if (ym === "present") return presentLabel;
  const [y, m] = ym.split("-");
  return new Date(Date.UTC(Number(y), Number(m) - 1, 1)).toLocaleDateString(LOCALE_META[locale].intl, {
    month: locale === "ar" ? "long" : "short",
    year: "numeric",
    timeZone: "UTC",
  });
}

/** "2026-03-14" as "March 14, 2026" / "14 مارس 2026". */
export function formatDate(iso: string, locale: Locale): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString(LOCALE_META[locale].intl, {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}
