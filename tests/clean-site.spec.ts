import { test, expect } from "@playwright/test";

// The clean site: each menu item is its own page inside one persistent shell,
// and the earlier site stays reachable, unchanged, under /archive.

const PAGES: { path: string; heading: string }[] = [
  { path: "/", heading: "human.being." },
  { path: "/about", heading: "Nancy Turnquist" },
  { path: "/sessions", heading: "Sessions" },
  { path: "/vitality", heading: "RelationalVitality" },
  { path: "/resources", heading: "Resources" },
  { path: "/contact", heading: "Start a conversation" },
];

for (const { path, heading } of PAGES) {
  test(`${path} renders inside the shell without sideways scroll`, async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(path);
    await expect(page.locator("h1")).toHaveText(heading);
    await expect(page.locator(".ns-nav")).toBeVisible();
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow).toBeLessThanOrEqual(0);
  });
}

test("menu navigation swaps the page without reloading the shell", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  await page.evaluate(() => { (document.querySelector(".ns-nav") as HTMLElement).dataset.mark = "kept"; });
  await page.locator(".ns-navlinks").getByText("Sessions").click();
  await expect(page).toHaveURL(/\/sessions$/);
  await expect(page.locator("h1")).toHaveText("Sessions");
  await expect(page.locator(".ns-nav")).toHaveAttribute("data-mark", "kept");
  await expect(page.locator('.ns-navlinks [aria-current="page"]')).toHaveText("Sessions");
});

test("phone menu opens from the hamburger and closes after choosing a page", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  const button = page.locator(".ns-menu-btn");
  await expect(page.locator(".ns-navlinks")).toBeHidden();
  await button.click();
  await expect(button).toHaveAttribute("aria-expanded", "true");
  await page.locator(".ns-navlinks").getByText("About").click();
  await expect(page).toHaveURL(/\/about$/);
  await expect(button).toHaveAttribute("aria-expanded", "false");
});

test("the interest form still posts email and comments to Jotform", async ({ page }) => {
  await page.goto("/vitality");
  const form = page.locator("form");
  await expect(form).toHaveAttribute("action", "https://submit.jotform.com/submit/262824796754170");
  await expect(form).toHaveAttribute("method", "post");
  await expect(form.locator('[name="q2_email"]')).toHaveAttribute("required", "");
  await expect(form.locator('[name="q3_comments"]')).toHaveAttribute("maxlength", "2000");
  await expect(form.locator('[name="formID"]')).toHaveValue("262824796754170");
});

test("archived pages keep their own layout and link only within the archive", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  for (const path of ["/archive/offerings", "/archive/about", "/archive/sessions", "/archive/resources"]) {
    await page.goto(path);
    await expect(page.locator(".l2-page")).toBeVisible();
    await expect(page.locator(".ns-nav")).toHaveCount(0);
  }
  await page.locator(".l2i-desktop-nav").getByText("About").click();
  await expect(page).toHaveURL(/\/archive\/about$/);
  await page.getByText("Back to Home").click();
  await expect(page).toHaveURL(/\/archive$/);
  await expect(page.locator('[data-testid^="node-"]').filter({ visible: true }).first()).toBeVisible();
});
