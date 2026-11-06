import { expect, test } from "@playwright/test";

test("home → Labeeny case study → App Store link", async ({ page }) => {
  await page.goto("/");
  await page.getByTestId("featured-apps").getByRole("link", { name: "Read the Labeeny case study" }).click();
  await expect(page).toHaveURL(/\/apps\/labeeny$/);
  const appStore = page.getByTestId("store-links").getByRole("link", { name: /App Store/ });
  await expect(appStore).toHaveAttribute("href", /id6761486192/);
  await expect(appStore).toHaveAttribute("target", "_blank");
  await expect(appStore).toHaveAttribute("rel", /noopener/);
});

test("domain filter narrows the collection and is shareable", async ({ page }) => {
  await page.goto("/apps?domain=education");
  await expect(page.getByRole("link", { name: "Education" })).toHaveAttribute("aria-current", "true");
  const list = page.getByTestId("apps-list");
  await expect(list.getByRole("link", { name: "Fahim BAC", exact: true })).toBeVisible();
  await expect(list.getByRole("link", { name: "Birdy Consults", exact: true })).toBeHidden();
});
