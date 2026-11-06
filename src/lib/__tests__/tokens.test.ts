import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { contrast } from "@/lib/color";

const css = readFileSync(resolve(process.cwd(), "src/app/globals.css"), "utf8");

const LIGHT = { paper: "#FAFAF8", surface: "#EFEFEB", ink: "#121314", muted: "#4A4D52", laurel: "#0A6E4F" };
const DARK = { paper: "#0E0F10", ink: "#EDEDEA", muted: "#A6A8A3", laurel: "#8FC9AE" };

describe("design tokens", () => {
  it("defines the light and dark palettes", () => {
    for (const hex of [...Object.values(LIGHT), ...Object.values(DARK)]) expect(css).toContain(hex);
  });

  it("keeps text tokens at WCAG AA contrast on their backgrounds", () => {
    expect(contrast(LIGHT.ink, LIGHT.paper)).toBeGreaterThan(7);
    expect(contrast(LIGHT.muted, LIGHT.paper)).toBeGreaterThanOrEqual(4.5);
    expect(contrast(LIGHT.muted, LIGHT.surface)).toBeGreaterThanOrEqual(4.5);
    expect(contrast(LIGHT.laurel, LIGHT.paper)).toBeGreaterThanOrEqual(4.5);
    expect(contrast(DARK.muted, DARK.paper)).toBeGreaterThanOrEqual(4.5);
    expect(contrast(DARK.laurel, DARK.paper)).toBeGreaterThanOrEqual(4.5);
  });

  it("exposes the font stacks", () => {
    for (const name of ["--font-sans", "--font-display", "--font-mono", "--font-arabic"]) expect(css).toContain(name);
  });

  it("honours prefers-reduced-motion globally", () => {
    expect(css).toMatch(/prefers-reduced-motion:\s*reduce/);
  });
});
