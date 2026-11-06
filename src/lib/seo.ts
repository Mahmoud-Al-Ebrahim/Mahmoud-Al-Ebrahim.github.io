import type { Metadata } from "next";
import { siteConfig } from "@/content/site";
import { LOCALE_META, localeHref, splitLocale, type Locale } from "@/i18n/config";

export function absoluteUrl(path: string): string {
  const clean = path === "/" ? "" : path.replace(/\/$/, "");
  return `${siteConfig.url}${clean}`;
}

/**
 * The pre-generated share image for a path (see scripts/og.tsx). Arabic pages
 * reuse the English image: the OG renderer cannot shape Arabic script.
 */
export function ogImagePath(path: string): string {
  const m = splitLocale(path).path.match(/^\/(apps|projects)\/([a-z0-9-]+)$/);
  return m ? `/og/${m[1]}-${m[2]}.png` : "/og/home.png";
}

/** Absolute URLs of a page in every locale, for hreflang. */
export function languageAlternates(path: string): Record<string, string> {
  const base = splitLocale(path).path;
  return {
    en: absoluteUrl(localeHref("en", base)),
    ar: absoluteUrl(localeHref("ar", base)),
    "x-default": absoluteUrl(localeHref("en", base)),
  };
}

/**
 * Page metadata with canonical, hreflang, Open Graph and Twitter fields. The
 * root layout supplies the title template; pass `absoluteTitle` for the home
 * page. `path` is the page's own path, including `/ar` for Arabic pages.
 */
export function buildMetadata({
  title,
  description,
  path,
  image,
  absoluteTitle = false,
  locale = "en",
}: {
  title: string;
  description: string;
  path: string;
  image?: string;
  absoluteTitle?: boolean;
  locale?: Locale;
}): Metadata {
  const url = absoluteUrl(path);
  image = image ?? absoluteUrl(ogImagePath(path));
  const fullTitle = absoluteTitle ? title : `${title} · ${siteConfig.name}`;
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: url, languages: languageAlternates(path) },
    openGraph: {
      type: "website",
      siteName: siteConfig.name,
      title: fullTitle,
      description,
      url,
      locale: LOCALE_META[locale].og,
      alternateLocale: [LOCALE_META[locale === "en" ? "ar" : "en"].og],
      ...(image ? { images: [{ url: image, width: 1200, height: 630 }] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      ...(image ? { images: [image] } : {}),
    },
  };
}

export function personJsonLd(locale: Locale = "en") {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.name,
    jobTitle: locale === "ar" ? "مطور Flutter أول ومصمم معمارية تطبيقات الهاتف" : "Senior Flutter Developer and Mobile Architect",
    url: absoluteUrl(localeHref(locale, "/")),
    email: `mailto:${siteConfig.email}`,
    sameAs: [siteConfig.github, siteConfig.linkedin],
    address: { "@type": "PostalAddress", addressLocality: "Aleppo", addressCountry: "SY" },
    knowsAbout: ["Flutter", "Dart", "Mobile architecture", "Node.js", "GraphQL", "On-device machine learning"],
    knowsLanguage: ["ar", "en"],
  };
}
