import { test, expect } from "@playwright/test";
test("all pages and linked modules render", async ({ page }) => {
  for (const path of [
    "/",
    "/platform",
    "/solutions",
    "/our-story",
    "/register-interest",
    "/contact",
    "/privacy",
    "/terms",
  ]) {
    const response = await page.goto(path);
    expect(response?.status()).toBe(200);
    await expect(page.locator("main h1")).toBeVisible();
  }
  await page.goto("/");
  await page.getByRole("link", { name: "Explore capability" }).first().click();
  await expect(page).toHaveURL(/platform#sales/);
  await expect(page.locator("#sales")).toBeVisible();
});
test("mobile menu, layouts and keyboard entry", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  for (const path of [
    "/",
    "/platform",
    "/solutions",
    "/our-story",
    "/register-interest",
    "/contact",
    "/privacy",
    "/terms",
  ]) {
    await page.goto(path);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
    ).toBe(true);
  }
  await page.goto("/");
  await page.getByRole("button", { name: "Open navigation" }).click();
  await page
    .locator("#mobile-nav")
    .getByRole("link", { name: "Our Story" })
    .click();
  await expect(page).toHaveURL("/our-story");
  await page.goto("/");
  await page.keyboard.press("Tab");
  await expect(
    page.getByRole("link", { name: "Skip to content" }),
  ).toBeFocused();
});
test("registration validates, keeps consent optional and never fakes storage", async ({
  page,
}) => {
  await page.goto("/register-interest");
  const consent = page.getByRole("checkbox", { name: /I agree to receive/ });
  await expect(consent).not.toBeChecked();
  await page.getByRole("button", { name: "Register Your Interest" }).click();
  await expect(page.getByText("This field is required.").first()).toBeVisible();
  await page.getByLabel("Full name").fill("Test Operator");
  await page.getByLabel("Work email").fill("operator@example.com");
  await page.getByLabel("Job title").fill("Dealer principal");
  await page.getByLabel("Dealership / company name").fill("Test Dealership");
  await page.getByLabel("Country", { exact: false }).fill("South Africa");
  await page
    .getByLabel("Primary operational challenge")
    .selectOption("Management Visibility");
  await page.getByRole("checkbox", { name: /I have read/ }).check();
  await page
    .getByRole("checkbox", { name: "Receive Development Updates", exact: true })
    .check();
  await page.getByRole("button", { name: "Register Your Interest" }).click();
  await expect(page.getByText(/Please give separate consent/)).toBeVisible();
  await page
    .getByRole("checkbox", { name: "Receive Development Updates", exact: true })
    .uncheck();
  await page.getByRole("button", { name: "Register Your Interest" }).click();
  await expect(page.locator("form").getByRole("alert")).toContainText(
    "Your information has not been saved",
  );
  await expect(page.getByText("Thank you for reaching out.")).not.toBeVisible();
});
test("contact requires message and displays unavailable storage honestly", async ({
  page,
}) => {
  await page.goto("/contact");
  await page.getByLabel("Full name").fill("Test Operator");
  await page.getByLabel("Work email").fill("operator@example.com");
  await page.getByLabel("Dealership / company name").fill("Test Dealer");
  await page.getByLabel("Country", { exact: false }).fill("Malaysia");
  await page.getByRole("checkbox", { name: /I have read/ }).check();
  await page.getByRole("button", { name: "Send Your Enquiry" }).click();
  await expect(page.getByText("Please enter a message.")).toBeVisible();
  await page
    .getByLabel("Your message")
    .fill("Interested in product discovery.");
  await page.getByRole("button", { name: "Send Your Enquiry" }).click();
  await expect(page.locator("form").getByRole("alert")).toContainText(
    "not been saved",
  );
});
test("SEO assets and API protections respond correctly", async ({
  request,
}) => {
  for (const path of [
    "/sitemap.xml",
    "/robots.txt",
    "/opengraph-image",
    "/icon.svg",
  ])
    expect((await request.get(path)).status()).toBe(200);
  expect(
    (
      await request.post("/api/submissions", {
        headers: { Origin: "https://unrelated.example" },
        data: {},
      })
    ).status(),
  ).toBe(403);
  expect(
    (
      await request.post("/api/submissions", {
        headers: { Origin: "http://localhost:3100" },
        data: {},
      })
    ).status(),
  ).toBe(400);
  expect(
    (
      await request.post("/api/submissions", {
        headers: {
          Origin: "http://localhost:3100",
          "Content-Type": "application/json",
        },
        data: "x".repeat(16001),
      })
    ).status(),
  ).toBe(413);
});
test("layouts fit narrow phones, tablets and desktop", async ({ page }) => {
  for (const width of [320, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const path of ["/", "/platform", "/register-interest"]) {
      await page.goto(path);
      expect(
        await page.evaluate(() => document.documentElement.scrollWidth),
        `${path} at ${width}px`,
      ).toBeLessThanOrEqual(width);
    }
  }
});
