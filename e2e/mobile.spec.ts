import { expect, test } from "@playwright/test";

const routes = ["/", "/apps", "/projects", "/projects/foodly", "/apps/sayed", "/apps/labeeny", "/apps/fahim-edtech", "/projects/gallery-ai", "/about", "/writing/clip-on-device-dart", "/resume"];

for (const route of routes) {
  test(`${route} has no horizontal scroll on a phone`, async ({ page, isMobile }, testInfo) => {
    test.skip(!isMobile, "mobile only");
    await page.goto(route);
    await page.waitForLoadState("networkidle");
    const { scrollWidth, innerWidth } = await page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      innerWidth: window.innerWidth,
    }));
    expect(scrollWidth, `${route} overflows by ${scrollWidth - innerWidth}px`).toBeLessThanOrEqual(innerWidth);
    await page.screenshot({ path: testInfo.outputPath(`mobile${route.replace(/\//g, "_") || "_home"}.png`), fullPage: true });
  });
}
