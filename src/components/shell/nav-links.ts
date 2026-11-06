import { getDictionary } from "@/i18n/dictionary";
import { localeHref, type Locale } from "@/i18n/config";

export type NavItem = { href: string; label: string };

/** Primary navigation in a locale. */
export function navItems(locale: Locale = "en"): NavItem[] {
  const t = getDictionary(locale).nav;
  return [
    { href: localeHref(locale, "/apps"), label: t.apps },
    { href: localeHref(locale, "/projects"), label: t.projects },
    { href: localeHref(locale, "/about"), label: t.about },
    { href: localeHref(locale, "/writing"), label: t.writing },
    { href: localeHref(locale, "/contact"), label: t.contact },
  ];
}

/** English navigation, kept for tests and the global 404. */
export const NAV: NavItem[] = navItems("en");
