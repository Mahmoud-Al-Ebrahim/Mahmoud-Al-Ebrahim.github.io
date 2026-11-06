import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Header } from "@/components/shell/header";
import { products } from "@/content/products";
import { families } from "@/content/families";
import { projects } from "@/content/projects";
import { productsAr } from "@/content/ar/products";
import { familiesAr } from "@/content/ar/families";
import { projectsAr } from "@/content/ar/projects";
import { generalAr } from "@/content/ar/general";
import { articlesAr } from "@/content/ar/articles";
import { diagramsAr } from "@/content/ar/diagrams";
import { experience } from "@/content/experience";
import { articles } from "@/content/writing";
import { DiagramIdSchema } from "@/content/schema";
import {
  FamilyTranslationSchema,
  GeneralTranslationSchema,
  ProductTranslationSchema,
  ProjectTranslationSchema,
} from "@/content/translation-schema";
import { formatDate, formatMonth, localeHref, splitLocale, switchLocale } from "@/i18n/config";
import { arCount, getDictionary } from "@/i18n/dictionary";
import { getProducts, getProject, getProjects } from "@/lib/content";
import { HomeView } from "@/views/home";
import { AppView } from "@/views/apps";
import { ProjectView } from "@/views/projects";

const ARABIC = /[؀-ۿ]/;

describe("locale routing helpers", () => {
  it("prefixes internal paths for Arabic and leaves English, files and external links alone", () => {
    expect(localeHref("ar", "/")).toBe("/ar");
    expect(localeHref("ar", "/apps/labeeny")).toBe("/ar/apps/labeeny");
    expect(localeHref("en", "/apps")).toBe("/apps");
    expect(localeHref("ar", "/Mahmoud-AlEbrahim.pdf")).toBe("/Mahmoud-AlEbrahim.pdf");
    expect(localeHref("ar", "https://github.com/x")).toBe("https://github.com/x");
    expect(localeHref("ar", "#apps")).toBe("#apps");
  });

  it("switches a path between languages", () => {
    expect(switchLocale("/apps/labeeny", "ar")).toBe("/ar/apps/labeeny");
    expect(switchLocale("/ar/apps/labeeny", "en")).toBe("/apps/labeeny");
    expect(switchLocale("/ar", "en")).toBe("/");
    expect(switchLocale("/", "ar")).toBe("/ar");
    expect(splitLocale("/arabic-page")).toEqual({ locale: "en", path: "/arabic-page" });
  });

  it("formats dates with Latin digits in Arabic", () => {
    expect(formatMonth("2026-01", "ar", "الآن")).toBe("يناير 2026");
    expect(formatMonth("present", "ar", "الآن")).toBe("الآن");
    expect(formatDate("2026-03-14", "ar")).toMatch(/^14 مارس 2026$/);
    expect(formatMonth("2026-01", "en", "now")).toBe("Jan 2026");
  });

  it("agrees Arabic counted nouns", () => {
    expect(arCount(11, "تطبيقات", "تطبيقًا")).toBe("11 تطبيقًا");
    expect(arCount(8, "أنظمة", "نظامًا")).toBe("8 أنظمة");
  });
});

describe("translation completeness", () => {
  it("translates every product, family and project with matching shapes", () => {
    for (const p of products) {
      const t = ProductTranslationSchema.parse(productsAr[p.slug]);
      for (const k of ["features", "challenges", "solutions", "results", "highlights"] as const) {
        expect(t[k].length, `${p.slug}.${k}`).toBe(p[k].length);
      }
      expect(!!t.architecture, `${p.slug}.architecture`).toBe(!!p.architecture);
    }
    for (const f of families) {
      const t = FamilyTranslationSchema.parse(familiesAr[f.slug]);
      expect(t.highlights.length).toBe(f.highlights.length);
    }
    for (const p of projects) {
      const t = ProjectTranslationSchema.parse(projectsAr[p.slug]);
      expect(t.metricLabels.length, `${p.slug} metrics`).toBe(p.metrics.length);
      expect(t.honesty?.length ?? 0, `${p.slug} honesty`).toBe(p.honesty?.length ?? 0);
    }
  });

  it("translates the general content, articles and diagrams", () => {
    const g = GeneralTranslationSchema.parse(generalAr);
    expect(g.experience.length).toBe(experience.length);
    for (const a of articles) expect(articlesAr[a.slug]?.title, a.slug).toMatch(ARABIC);
    for (const id of DiagramIdSchema.options) expect(diagramsAr[id]?.title, id).toMatch(ARABIC);
  });

  it("keeps the English and Arabic dictionaries the same shape", () => {
    const keys = (o: object, prefix = ""): string[] =>
      Object.entries(o).flatMap(([k, v]) => (v && typeof v === "object" && !Array.isArray(v) ? keys(v, `${prefix}${k}.`) : [`${prefix}${k}`]));
    expect(keys(getDictionary("ar")).sort()).toEqual(keys(getDictionary("en")).sort());
  });

  it("keeps facts identical across languages: links, store data, years and metric values", () => {
    const en = getProducts("en");
    const ar = getProducts("ar");
    expect(ar.map((p) => [p.slug, p.year, p.stores, p.screenshots])).toEqual(en.map((p) => [p.slug, p.year, p.stores, p.screenshots]));
    for (const p of getProjects("en")) {
      const a = getProject(p.slug, "ar")!;
      // The numbers are identical; only words inside a value are translated.
      const digits = (v: string) => v.replace(/[^0-9]/g, "");
      expect(a.metrics.map((m) => digits(m.value))).toEqual(p.metrics.map((m) => digits(m.value)));
      expect(a.repo).toEqual(p.repo);
    }
  });
});

describe("Arabic pages", () => {
  it("renders the header in Arabic with a switch back to English", () => {
    render(<Header locale="ar" />);
    const nav = screen.getAllByRole("navigation", { name: "التنقل الرئيسي" })[0];
    expect(within(nav).getByRole("link", { name: "التطبيقات" })).toHaveAttribute("href", "/ar/apps");
    const sw = screen.getAllByTestId("language-switch")[0];
    expect(sw).toHaveAttribute("hreflang", "en");
    expect(sw).toHaveTextContent("English");
  });

  it("renders the home page in Arabic, with every internal link under /ar", () => {
    const { container } = render(<HomeView locale="ar" />);
    expect(screen.getByRole("heading", { level: 2, name: "منشورة على المتاجر" })).toBeInTheDocument();
    const internal = Array.from(container.querySelectorAll<HTMLAnchorElement>("a[href^='/']"))
      .map((a) => a.getAttribute("href")!)
      .filter((h) => !/\.[a-z]+$/.test(h));
    expect(internal.length).toBeGreaterThan(20);
    expect(internal.filter((h) => !h.startsWith("/ar")), "English links on an Arabic page").toEqual([]);
  });

  it("renders an app case study with the Arabic name leading", () => {
    render(<AppView slug="labeeny" locale="ar" />);
    const h1 = screen.getByRole("heading", { level: 1 });
    expect(h1.textContent?.startsWith("لبيني")).toBe(true);
    expect(screen.getByRole("heading", { level: 2, name: "مساهمتي" })).toBeInTheDocument();
  });

  it("renders a project case study with translated narrative steps", () => {
    render(<ProjectView slug="gallery-ai" locale="ar" />);
    expect(screen.getByRole("heading", { level: 1, name: "Gallery AI" })).toBeInTheDocument();
    for (const step of getDictionary("ar").caseStudy.steps) {
      expect(screen.getByRole("heading", { level: 2, name: step })).toBeInTheDocument();
    }
  });
});
