import { describe, expect, it } from "vitest";
import sitemap from "@/app/sitemap";
import { buildMetadata } from "@/lib/seo";
import { getAppSlugs, getArticles, getProjects } from "@/lib/content";
import { siteConfig } from "@/content/site";

describe("buildMetadata", () => {
  it("sets a canonical url and a templated Open Graph title", () => {
    const m = buildMetadata({ title: "Labeeny", description: "On-demand delivery.", path: "/apps/labeeny" });
    expect(m.alternates?.canonical).toBe(`${siteConfig.url}/apps/labeeny`);
    expect(m.openGraph?.title).toBe("Labeeny · Mahmoud AlEbrahim");
    expect(m.openGraph?.url).toBe(`${siteConfig.url}/apps/labeeny`);
    expect(m.description).toBe("On-demand delivery.");
  });

  it("uses the site title untemplated on the home page", () => {
    const m = buildMetadata({ title: siteConfig.title, description: siteConfig.description, path: "/", absoluteTitle: true });
    expect(m.openGraph?.title).toBe(siteConfig.title);
  });
});

describe("sitemap", () => {
  it("includes every static page, app, project and article url exactly once", () => {
    const urls = sitemap().map((e) => e.url);
    const expected = [
      "/",
      "/apps",
      "/projects",
      "/about",
      "/writing",
      "/resume",
      "/contact",
      ...getAppSlugs().map((s) => `/apps/${s}`),
      ...getProjects().map((p) => `/projects/${p.slug}`),
      ...getArticles().map((a) => `/writing/${a.slug}`),
    ].map((p) => `${siteConfig.url}${p === "/" ? "" : p}`);
    expect(new Set(urls).size).toBe(urls.length);
    expect([...urls].sort()).toEqual([...expected].sort());
  });
});
