import { defineConfig, devices } from "@playwright/test";

// Layout checks for the home page across window sizes, in the Chrome and
// Safari engines. Runs against a production build served by `vite preview`;
// set BASE_URL to check another host (e.g. the live site) instead.
const baseURL = process.env.BASE_URL ?? "http://localhost:4173";

export default defineConfig({
  testDir: "tests",
  fullyParallel: true,
  reporter: [["list"]],
  use: { baseURL },
  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"] } },
    { name: "webkit", use: { ...devices["Desktop Safari"] } },
  ],
  webServer: process.env.BASE_URL
    ? undefined
    : {
        command: "npx vite build && npx vite preview --port 4173 --strictPort",
        url: baseURL,
        reuseExistingServer: true,
        timeout: 180_000,
      },
});
