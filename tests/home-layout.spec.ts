import { test, expect, type Page, type Locator } from "@playwright/test";

// Desktop windows that have clipped the home page: short laptops, and browser
// zoom (125% of 1280×720 ≈ 1024×576; 150% of 1440×810 ≈ 960×540).
const DESKTOP = [
  { w: 1920, h: 1080 },
  { w: 1440, h: 800 },
  { w: 1280, h: 720 },
  { w: 1280, h: 650 },
  { w: 1024, h: 576 },
  { w: 960, h: 540 },
];

const SCREENS = "test-results/screens";

type Box = { x: number; y: number; width: number; height: number };

function overlaps(a: Box, b: Box): boolean {
  const tol = 1;
  return (
    a.x < b.x + b.width - tol &&
    b.x < a.x + a.width - tol &&
    a.y < b.y + b.height - tol &&
    b.y < a.y + a.height - tol
  );
}

async function box(loc: Locator): Promise<Box> {
  const b = await loc.boundingBox();
  expect(b, "element has a layout box").not.toBeNull();
  return b as Box;
}

// True when the element is the topmost thing at its own center point —
// i.e. reachable and not hidden under the header or off-screen.
async function isUncovered(loc: Locator): Promise<boolean> {
  await loc.scrollIntoViewIfNeeded();
  return loc.evaluate((el) => {
    const r = el.getBoundingClientRect();
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 2;
    if (cy < 0 || cy > window.innerHeight || cx < 0 || cx > window.innerWidth) return false;
    const hit = document.elementFromPoint(cx, cy);
    return !!hit && (el === hit || el.contains(hit));
  });
}

async function openHome(page: Page) {
  await page.goto("/");
  await page.locator('[data-testid^="node-"]').filter({ visible: true }).first().waitFor();
  await page.waitForTimeout(2000); // node fade-in + scale animations
}

for (const { w, h } of DESKTOP) {
  test.describe(`desktop ${w}×${h}`, () => {
    test.use({ viewport: { width: w, height: h } });

    test("hexagon and panel clear the header and are reachable", async ({ page }, info) => {
      await openHome(page);
      await page.screenshot({ path: `${SCREENS}/${info.project.name}-${w}x${h}-approach.png` });

      const header = await box(page.locator("header"));
      const nav = await box(page.locator("header + nav"));
      const panel = await box(page.getByRole("region", { name: "Approach" }).filter({ visible: true }));
      expect(overlaps(panel, header) || overlaps(panel, nav), "panel under header").toBe(false);

      const nodes = page.locator('[data-testid^="node-"]').filter({ visible: true });
      await expect(nodes).toHaveCount(6);
      for (const node of await nodes.all()) {
        const id = await node.getAttribute("data-testid");
        const b = await box(node);
        expect(overlaps(b, header) || overlaps(b, nav), `${id} under header`).toBe(false);
        expect(await isUncovered(node), `${id} reachable`).toBe(true);
      }
    });

    test("sessions contact details are reachable", async ({ page }, info) => {
      await openHome(page);
      await page.locator("header + nav").getByRole("button", { name: "Sessions" }).click();
      // Park the pointer on the background: WebKit fires hover when content
      // scrolls under it, and hovering a node switches the panel back to Approach.
      await page.mouse.move(2, 2);
      await page.waitForTimeout(800);
      await page.screenshot({ path: `${SCREENS}/${info.project.name}-${w}x${h}-sessions.png` });

      const email = page.getByRole("button", { name: "Email Nancy" }).filter({ visible: true });
      await expect.poll(() => isUncovered(email), { message: "Email Nancy reachable" }).toBe(true);
      const form = page.getByRole("link", { name: "Contact Nancy →" }).filter({ visible: true });
      await expect.poll(() => isUncovered(form), { message: "Contact Nancy reachable" }).toBe(true);
    });
  });
}

test.describe("phone 390×844", () => {
  test.use({ viewport: { width: 390, height: 844 }, hasTouch: true });

  test("shortcut bar offers Babies, not Birth", async ({ page }, info) => {
    await openHome(page);
    // dispatchEvent rather than tap: the emulated pointer left behind by tap
    // "hovers" the center pentagon after the auto-scroll and clears the
    // selection, which a real touch screen does not do.
    await page.locator('[data-testid^="node-"]').filter({ visible: true }).first().dispatchEvent("click");
    await page.waitForTimeout(800);

    await expect(page.getByRole("button", { name: "Birth", exact: true })).toHaveCount(0);
    await page.getByRole("button", { name: "Babies", exact: true }).dispatchEvent("click");
    await page.waitForTimeout(800);
    await page.screenshot({ path: `${SCREENS}/${info.project.name}-390x844-babies.png` });
    await expect(page.getByRole("heading", { name: "Craniosacral Therapy For Babies" })).toBeVisible();
  });
});
