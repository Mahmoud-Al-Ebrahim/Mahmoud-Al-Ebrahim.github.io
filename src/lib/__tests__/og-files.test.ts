import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { getAppSlugs, getProjects } from "@/lib/content";
import { buildMetadata, ogImagePath } from "@/lib/seo";

describe("share images", () => {
  it("maps every case-study path to a PNG file name", () => {
    expect(ogImagePath("/apps/labeeny")).toBe("/og/apps-labeeny.png");
    expect(ogImagePath("/projects/gallery-ai")).toBe("/og/projects-gallery-ai.png");
    expect(ogImagePath("/about")).toBe("/og/home.png");
  });

  it("puts an absolute .png share image on every page's metadata", () => {
    const m = buildMetadata({ title: "Labeeny", description: "d", path: "/apps/labeeny" });
    const images = m.openGraph?.images as { url: string }[];
    expect(images[0].url).toMatch(/^https:\/\/.+\/og\/apps-labeeny\.png$/);
  });

  it("has a generated PNG for every app and project (run `npm run og` first)", () => {
    const paths = ["/", ...getAppSlugs().map((s) => `/apps/${s}`), ...getProjects().map((p) => `/projects/${p.slug}`)];
    const missing = paths.map(ogImagePath).filter((f) => !existsSync(resolve(process.cwd(), "public", `.${f}`)));
    expect(missing).toEqual([]);
  });
});
