export const dynamic = "force-static";

import type { MetadataRoute } from "next";
import { getAppSlugs, getArticles, getProjects } from "@/lib/content";
import { absoluteUrl } from "@/lib/seo";

const STATIC: { path: string; priority: number }[] = [
  { path: "/", priority: 1 },
  { path: "/apps", priority: 0.9 },
  { path: "/projects", priority: 0.9 },
  { path: "/about", priority: 0.7 },
  { path: "/writing", priority: 0.7 },
  { path: "/resume", priority: 0.5 },
  { path: "/contact", priority: 0.5 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-11-06");
  return [
    ...STATIC.map((s) => ({ url: absoluteUrl(s.path), lastModified, priority: s.priority })),
    ...getAppSlugs().map((slug) => ({ url: absoluteUrl(`/apps/${slug}`), lastModified, priority: 0.8 })),
    ...getProjects().map((p) => ({ url: absoluteUrl(`/projects/${p.slug}`), lastModified, priority: 0.8 })),
    ...getArticles().map((a) => ({ url: absoluteUrl(`/writing/${a.slug}`), lastModified: new Date(a.date), priority: 0.6 })),
  ];
}
