import { describe, expect, it } from "vitest";
import { ProductSchema } from "@/content/schema";

const base = {
  slug: "atmtha",
  name: "Atmtha",
  nameAr: "اتمتها",
  tagline: "Automated exam forms for baccalaureate students.",
  domain: "education",
  publisher: "ProoTech",
  role: "contributed",
  year: 2025,
  stores: { play: { packageId: "com.atmtha.app" } },
  brandColor: "#00B0DC",
  icon: "/apps/atmtha/icon.webp",
  screenshots: ["/apps/atmtha/shot-1.webp"],
  summary: "Atmtha simulates automated baccalaureate exam forms. Students rehearse under time pressure.",
  problem: "p",
  audience: "a",
  features: ["Server-generated exams", "Per-question countdown", "Wrong-answer review"],
  stack: ["Flutter"],
  challenges: [],
  solutions: [],
  results: [],
  contribution: "c",
  highlights: ["Per-subject cache with throttled prefetch", "Device-id header on every request"],
};

describe("ProductSchema", () => {
  it("requires at least one store", () => {
    const r = ProductSchema.safeParse({ ...base, stores: {} });
    expect(r.success).toBe(false);
    if (!r.success) expect(JSON.stringify(r.error.issues)).toContain("at least one store");
  });

  it("rejects more than six screenshots", () => {
    const r = ProductSchema.safeParse({ ...base, screenshots: Array.from({ length: 7 }, (_, i) => `/s${i}.webp`) });
    expect(r.success).toBe(false);
  });

  it("parses a valid product and applies defaults", () => {
    const r = ProductSchema.parse(base);
    expect(r.featured).toBe(false);
    expect(r.screenshotStyle).toBe("framed");
  });

  it("requires at least two engineering highlights", () => {
    expect(ProductSchema.safeParse({ ...base, highlights: ["only one highlight"] }).success).toBe(false);
  });

  it("rejects an invalid brand colour", () => {
    expect(ProductSchema.safeParse({ ...base, brandColor: "blue" }).success).toBe(false);
  });
});
