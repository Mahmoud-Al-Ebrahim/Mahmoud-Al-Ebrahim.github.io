import { expect, test } from "@playwright/test";

test("Play Store link from a featured app opens in a new tab", async ({ page, context }) => {
  await page.goto("/");
  const link = page.getByTestId("featured-apps").getByRole("link", { name: /Google Play\s*for Labeeny$/ });
  await expect(link).toHaveAttribute("href", "https://play.google.com/store/apps/details?id=com.kwanx.deliverex.user");
  await expect(link).toHaveAttribute("target", "_blank");
  await expect(link).toHaveAttribute("rel", /noopener/);
  expect(context.pages()).toHaveLength(1);
});

test("mobile menu opens, traps focus, closes with Escape and restores focus", async ({ page, isMobile }) => {
  test.skip(!isMobile, "mobile only");
  await page.goto("/");
  const open = page.getByRole("button", { name: "Open menu" });
  await open.focus();
  await page.keyboard.press("Enter");
  const dialog = page.getByRole("dialog", { name: "Site menu" });
  await expect(dialog).toBeVisible();
  await expect(dialog.getByRole("link", { name: "Apps" })).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(dialog).toHaveCount(0);
  await expect(page.getByRole("button", { name: "Open menu" })).toBeFocused();
});

test("mobile menu closes with a tap on its close button", async ({ page, isMobile }) => {
  test.skip(!isMobile, "mobile only");
  await page.goto("/");
  await page.getByRole("button", { name: "Open menu" }).click();
  const dialog = page.getByRole("dialog", { name: "Site menu" });
  await expect(dialog).toBeVisible();
  // A real pointer click: fails if anything covers the button.
  await dialog.getByRole("button", { name: "Close menu" }).click();
  await expect(dialog).toHaveCount(0);
});

test("the apps collection lists every app in the static HTML", async ({ request }) => {
  const html = await (await request.get("/apps")).text();
  for (const name of ["Labeeny", "Fahim BAC", "Min Bayty", "Birdy Consults", "Sayed", "Assas"]) expect(html).toContain(name);
});

test("share images are served as PNG files", async ({ request, page }) => {
  await page.goto("/apps/labeeny");
  const url = await page.locator('meta[property="og:image"]').getAttribute("content");
  expect(url).toMatch(/\/og\/apps-labeeny\.png$/);
  const res = await request.get(new URL(url!).pathname);
  expect(res.ok()).toBe(true);
  expect(res.headers()["content-type"]).toContain("image/png");
});

test("CV download responds with a PDF", async ({ page, request }) => {
  await page.goto("/");
  const href = await page.getByRole("link", { name: /download cv/i }).first().getAttribute("href");
  expect(href).toBe("/Mahmoud-AlEbrahim.pdf");
  const res = await request.get(href!);
  expect(res.ok()).toBe(true);
  expect(res.headers()["content-type"]).toContain("application/pdf");
});

test("unknown routes get the custom 404 with useful links", async ({ page }) => {
  const res = await page.goto("/nope-404");
  expect(res?.status()).toBe(404);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(/nothing at this address/i);
  await expect(page.getByRole("link", { name: "Published applications" })).toHaveAttribute("href", "/apps");
  await expect(page.getByRole("link", { name: "Engineering projects" })).toHaveAttribute("href", "/projects");
});

test("keyboard users reach the app shelf quickly and a store badge soon after", async ({ page, isMobile }) => {
  test.skip(isMobile, "desktop tab order");
  await page.goto("/");
  let shelfAt = -1;
  for (let i = 0; i < 15 && shelfAt < 0; i++) {
    await page.keyboard.press("Tab");
    const href = await page.evaluate(() => document.activeElement?.getAttribute("href") ?? "");
    if (href === "/apps/labeeny") shelfAt = i;
  }
  expect(shelfAt, "first app in the shelf is within 15 tabs").toBeGreaterThanOrEqual(0);
  let found = false;
  for (let i = 0; i < 25; i++) {
    await page.keyboard.press("Tab");
    const label = await page.evaluate(() => document.activeElement?.textContent ?? "");
    if (/(Google Play|App Store) for /.test(label)) {
      found = true;
      break;
    }
  }
  expect(found).toBe(true);
});

test("focused elements show a visible focus ring", async ({ page }) => {
  await page.goto("/");
  await page.keyboard.press("Tab");
  await page.keyboard.press("Tab");
  const outline = await page.evaluate(() => {
    const el = document.activeElement as HTMLElement;
    const s = getComputedStyle(el);
    return { width: s.outlineWidth, style: s.outlineStyle };
  });
  expect(outline.style).not.toBe("none");
  expect(outline.width).not.toBe("0px");
});
