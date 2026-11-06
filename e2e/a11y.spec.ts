import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const routes = [
  "/",
  "/apps",
  "/apps/labeeny",
  "/apps/fahim-edtech",
  "/apps/atmtha",
  "/projects",
  "/projects/gallery-ai",
  "/projects/foodly",
  "/projects/mudhhila",
  "/apps/sayed",
  "/about",
  "/writing",
  "/writing/clip-on-device-dart",
  "/resume",
  "/contact",
  "/nope-404",
];

for (const route of routes) {
  test(`${route} has no serious or critical accessibility violations`, async ({ page }) => {
    await page.goto(route);
    // Evaluate the settled page: entrance animations briefly lower opacity.
    await page.evaluate(() => document.getAnimations().forEach((a) => a.finish()));
    const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"]).analyze();
    const serious = results.violations.filter((v) => v.impact === "serious" || v.impact === "critical");
    expect(
      serious.map((v) => `${v.id}: ${v.help} (${v.nodes.length} nodes) e.g. ${v.nodes[0]?.target.join(" ")}`),
    ).toEqual([]);
  });
}
