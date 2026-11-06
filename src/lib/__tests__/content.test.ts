import { describe, expect, it } from "vitest";
import {
  getFamilies,
  getFeaturedApps,
  getFeaturedProjects,
  getProducts,
  getProjects,
} from "@/lib/content";
import { appStoreUrl, playUrl } from "@/lib/stores";

describe("content loaders", () => {
  it("returns the featured apps in the fixed order", () => {
    expect(getFeaturedApps().map((a) => a.slug)).toEqual(["labeeny", "fahim-edtech", "min-bayty"]);
  });

  it("returns the featured projects in the fixed order", () => {
    expect(getFeaturedProjects().map((p) => p.slug)).toEqual(["gallery-ai", "trydos", "foodly"]);
  });

  it("has unique product slugs", () => {
    const slugs = getProducts().map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("resolves every family membership and related slug", () => {
    const products = getProducts();
    const slugs = new Set(products.map((p) => p.slug));
    const families = getFamilies();
    const familySlugs = new Set(families.map((f) => f.slug));
    for (const p of products) {
      if (p.family) expect(familySlugs.has(p.family)).toBe(true);
      for (const r of p.related ?? []) expect(slugs.has(r) || familySlugs.has(r)).toBe(true);
    }
    for (const f of families) {
      for (const m of f.members) expect(slugs.has(m)).toBe(true);
    }
  });

  it("has unique project slugs", () => {
    const slugs = getProjects().map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });
});

describe("store urls", () => {
  it("builds a Play Store url from a package id", () => {
    expect(playUrl("com.atmtha.app")).toBe("https://play.google.com/store/apps/details?id=com.atmtha.app");
  });

  it("builds an App Store url from an id and storefront", () => {
    expect(appStoreUrl("6780883400", "ae")).toBe("https://apps.apple.com/ae/app/id6780883400");
  });
});
