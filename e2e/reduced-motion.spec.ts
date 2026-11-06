import { expect, test } from "@playwright/test";

test("under prefers-reduced-motion every revealed element is fully visible immediately", async ({ page }) => {
  await page.goto("/");
  const opacities = await page.evaluate(() =>
    Array.from(document.querySelectorAll("[data-reveal]")).map((el) => getComputedStyle(el).opacity),
  );
  expect(opacities.length).toBeGreaterThan(0);
  expect(opacities.every((o) => o === "1")).toBe(true);
  await expect(page.locator("[data-progress-hairline]")).toBeHidden();
});
