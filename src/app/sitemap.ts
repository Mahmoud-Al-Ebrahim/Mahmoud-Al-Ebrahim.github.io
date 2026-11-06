export const dynamic = "force-static";

import type { MetadataRoute } from "next";
import { LOCALES, localeHref } from "@/i18n/config";
import { getAppSlugs, getArticles, getProjects } from "@/lib/content";
import { absoluteUrl, languageAlternates } from "@/lib/seo";

const STATIC: { path: string; priority: number }[] = [
  { path: "/", priority: 1 },
  { path: "/apps", priority: 0.9 },
  { path: "/projects", priority: 0.9 },
  { path: "/about", priority: 0.7 },
  { path: "/writing", priority: 0.7 },
  { path: "/resume", priority: 0.5 },
  { path: "/contact", priority: 0.5 },
];

/** Every page in both languages, each entry listing its hreflang alternates. */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-11-06");
  const pages: { path: string; priority: number; lastModified: Date }[] = [
    ...STATIC.map((s) => ({ ...s, lastModified })),
    ...getAppSlugs().map((slug) => ({ path: `/apps/${slug}`, priority: 0.8, lastModified })),
    ...getProjects().map((p) => ({ path: `/projects/${p.slug}`, priority: 0.8, lastModified })),
    ...getArticles().map((a) => ({ path: `/writing/${a.slug}`, priority: 0.6, lastModified: new Date(a.date) })),
  ];
  return LOCALES.flatMap((locale) =>
    pages.map((p) => {
      const languages = languageAlternates(p.path);
      delete languages["x-default"];
      return {
        url: absoluteUrl(localeHref(locale, p.path)),
        lastModified: p.lastModified,
        priority: locale === "en" ? p.priority : Math.round(p.priority * 90) / 100,
        alternates: { languages },
      };
    }),
  );
}
