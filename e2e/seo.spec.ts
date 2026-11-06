import { expect, test } from "@playwright/test";

const routes = ["/", "/apps/labeeny", "/projects/gallery-ai", "/writing/clip-on-device-dart"];

for (const route of routes) {
  test(`${route} has one h1, description, canonical and valid JSON-LD`, async ({ page }) => {
    await page.goto(route);
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.locator('meta[name="description"]')).toHaveAttribute("content", /.{20,}/);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", /^https?:\/\//);
    const ld = await page.locator('script[type="application/ld+json"]').allTextContents();
    expect(ld.length).toBeGreaterThan(0);
    for (const text of ld) expect(() => JSON.parse(text)).not.toThrow();
  });
}

test("sitemap and robots are served", async ({ request }) => {
  const sitemap = await request.get("/sitemap.xml");
  expect(sitemap.ok()).toBe(true);
  expect(await sitemap.text()).toContain("/apps/labeeny");
  const robots = await request.get("/robots.txt");
  expect(robots.ok()).toBe(true);
  expect(await robots.text()).toContain("Sitemap:");
});
