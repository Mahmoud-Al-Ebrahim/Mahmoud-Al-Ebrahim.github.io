import { describe, expect, it } from "vitest";
import { contrast, mutedSolid, ON_DARK, ON_LIGHT, panelBg, textOn } from "@/lib/color";
import { getFamilies, getProducts } from "@/lib/content";

describe("textOn", () => {
  it("picks dark text on a light product colour and white on a dark one", () => {
    expect(textOn("#8AC43F")).toBe(ON_LIGHT);
    expect(textOn("#62108F")).toBe(ON_DARK);
  });

  it("gives every product panel at least 4.5:1 text contrast", () => {
    const colours = [...getProducts().map((p) => p.brandColor), ...getFamilies().map((f) => f.brandColor)];
    for (const c of colours) {
      const bg = panelBg(c);
      expect(contrast(bg, textOn(bg)), `${c} → ${bg}`).toBeGreaterThanOrEqual(4.5);
    }
  });

  it("keeps secondary text on every product panel at 4.5:1 or better", () => {
    const colours = [...getProducts().map((p) => p.brandColor), ...getFamilies().map((f) => f.brandColor)];
    for (const c of colours) {
      const bg = panelBg(c);
      expect(contrast(bg, mutedSolid(bg)), `${c} muted`).toBeGreaterThanOrEqual(4.5);
    }
  });
});
