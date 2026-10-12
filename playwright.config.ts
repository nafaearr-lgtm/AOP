import { defineConfig } from "@playwright/test";
export default defineConfig({
  testDir: "./tests/browser",
  use: {
    baseURL: "http://localhost:3100",
    headless: true,
    launchOptions: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE
      ? { executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE }
      : {},
  },
  webServer: {
    command:
      "NEXT_PUBLIC_SITE_URL=http://localhost:3100 npm start -- --port 3100",
    url: "http://localhost:3100",
    reuseExistingServer: false,
  },
  workers: 2,
});
