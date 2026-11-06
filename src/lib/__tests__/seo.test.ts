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
  it("includes every static page, app, project and article url exactly once, in both languages", () => {
    const urls = sitemap().map((e) => e.url);
    const paths = [
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
    ];
    const expected = paths.flatMap((p) => [`${siteConfig.url}${p === "/" ? "" : p}`, `${siteConfig.url}/ar${p === "/" ? "" : p}`]);
    expect(new Set(urls).size).toBe(urls.length);
    expect([...urls].sort()).toEqual([...expected].sort());
  });
});

describe("hreflang", () => {
  it("links each page to its English and Arabic versions", () => {
    const en = buildMetadata({ title: "Labeeny", description: "x", path: "/apps/labeeny" });
    const ar = buildMetadata({ title: "لبيني", description: "x", path: "/ar/apps/labeeny", locale: "ar" });
    const expected = {
      en: `${siteConfig.url}/apps/labeeny`,
      ar: `${siteConfig.url}/ar/apps/labeeny`,
      "x-default": `${siteConfig.url}/apps/labeeny`,
    };
    expect(en.alternates?.languages).toEqual(expected);
    expect(ar.alternates?.languages).toEqual(expected);
    expect(ar.alternates?.canonical).toBe(`${siteConfig.url}/ar/apps/labeeny`);
    expect(ar.openGraph).toMatchObject({ locale: "ar_AR" });
  });

  it("maps the Arabic home page to the site root", () => {
    const m = buildMetadata({ title: "t", description: "d", path: "/ar", locale: "ar", absoluteTitle: true });
    expect(m.alternates?.languages).toMatchObject({ en: siteConfig.url, ar: `${siteConfig.url}/ar` });
  });
});
