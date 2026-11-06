import { defineConfig, devices } from "@playwright/test";

const port = 3100;
const baseURL = `http://localhost:${port}`;

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? [["github"], ["html", { open: "never" }]] : "list",
  use: {
    baseURL,
    trace: "on-first-retry",
  },
  webServer: {
    command: `npx serve out -l ${port} --no-request-logging`,
    url: baseURL,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
  projects: [
    {
      name: "desktop-chromium",
      use: { ...devices["Desktop Chrome"], viewport: { width: 1280, height: 800 } },
      testIgnore: /reduced-motion\.spec\.ts/,
    },
    {
      name: "mobile-chromium",
      use: { ...devices["Pixel 7"] },
      testIgnore: /reduced-motion\.spec\.ts/,
    },
    {
      name: "reduced-motion",
      use: { ...devices["Desktop Chrome"], contextOptions: { reducedMotion: "reduce" } },
      testMatch: /reduced-motion\.spec\.ts/,
    },
  ],
});
