import { expect, test } from "@playwright/test";

const coreRoutes = ["/", "/about", "/sectors", "/sectors/construction", "/sectors/technology", "/sectors/cooling", "/sectors/logistics", "/sectors/energy", "/sectors/tourism", "/work", "/updates", "/compliance", "/community", "/contact", "/privacy", "/terms"];

test.describe("core routes", () => {
  for (const route of coreRoutes) {
    test(`${route} loads with a primary heading`, async ({ page }) => {
      await page.goto(route, { waitUntil: "domcontentloaded" });
      await expect(page.locator("main h1").first()).toBeVisible();
      await expect(page).toHaveTitle(/Mendozer Investments/);
    });
  }
});

test("local Poppins variable resolves through the brand token layer", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/", { waitUntil: "domcontentloaded" });

  const typography = await page.evaluate(() => {
    const styles = getComputedStyle(document.body);
    return {
      fontFamily: styles.fontFamily.toLowerCase(),
      fontSans: styles.getPropertyValue("--font-sans").trim(),
      brandNavy: styles.getPropertyValue("--color-brand-navy").trim(),
    };
  });

  expect(typography.fontSans).not.toBe("");
  expect(typography.fontFamily).toContain("poppins");
  expect(typography.brandNavy).toBe("#1c4e89");
});

test("mobile and desktop home layouts do not create horizontal overflow", async ({ page }) => {
  for (const viewport of [
    { width: 320, height: 720 },
    { width: 375, height: 812 },
    { width: 390, height: 844 },
    { width: 414, height: 896 },
    { width: 768, height: 1024 },
    { width: 1440, height: 1000 },
  ]) {
    await page.setViewportSize(viewport);
    await page.goto("/", { waitUntil: "domcontentloaded" });
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
    expect(overflow, `horizontal overflow at ${viewport.width}px`).toBeFalsy();
    await expect(page.locator(".site-header__brand")).toBeVisible();
    await expect(page.locator(".site-footer")).toBeVisible();
    const heroHeadingOverflows = await page.locator(".home-hero h1").evaluate((heading) => {
      const rect = heading.getBoundingClientRect();
      return rect.left < -1 || rect.right > window.innerWidth + 1 || heading.scrollWidth > heading.clientWidth + 1;
    });
    expect(heroHeadingOverflows, `hero heading overflow at ${viewport.width}px`).toBeFalsy();
  }
});

test("hero uses supplied-photo motion and one direct main sentence", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/", { waitUntil: "domcontentloaded" });

  await expect(page.locator(".home-hero h1")).toHaveText("One group for the work ahead.");
  await expect(page.locator(".home-hero .eyebrow")).toHaveCount(0);
  await expect(page.locator(".home-hero__supporting")).toHaveCount(0);
  await expect(page.locator(".home-hero video source[type='video/webm']")).toHaveAttribute("src", "/media/mendozer-hero-motion.webm");
  await expect(page.locator(".home-hero__navigator")).toHaveCount(0);
  await expect(page.locator(".home-hero").getByRole("link", { name: "Explore directions" })).toBeVisible();
});

test("sector directory behaves as an accessible tabbed explorer on desktop", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/", { waitUntil: "domcontentloaded" });

  const explorer = page.locator(".sector-explorer__desktop").first();
  const tabs = explorer.getByRole("tab");
  await expect(tabs).toHaveCount(6);
  await tabs.nth(1).click();
  await expect(tabs.nth(1)).toHaveAttribute("aria-selected", "true");
  await expect(explorer.getByRole("tabpanel")).toContainText("Technology & Systems");
  await expect(explorer.locator(".sector-explorer__media img")).toHaveAttribute("src", /technology/);

  await tabs.nth(1).press("ArrowDown");
  await expect(tabs.nth(2)).toHaveAttribute("aria-selected", "true");
});

test("mobile direction directory uses native disclosure controls", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/", { waitUntil: "domcontentloaded" });

  const explorer = page.locator(".sector-explorer__mobile").first();
  await expect(explorer).toBeVisible();
  const firstDisclosure = explorer.locator("details").first();
  await firstDisclosure.locator("summary").click();
  await expect(firstDisclosure).toHaveAttribute("open", "");
  await expect(firstDisclosure).toContainText("Construction & Infrastructure");
});

test("home FAQ disclosures open with useful enquiry guidance", async ({ page }) => {
  await page.goto("/", { waitUntil: "domcontentloaded" });
  const firstDisclosure = page.locator(".home-faq .accordion-item").first();
  await firstDisclosure.locator("summary").click();
  await expect(firstDisclosure).toHaveAttribute("open", "");
  await expect(firstDisclosure).toContainText("Group enquiry");
});

test("header becomes a quiet fixed navigation state after scroll", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/", { waitUntil: "domcontentloaded" });
  await page.evaluate(() => window.scrollTo(0, 600));
  await expect(page.locator(".site-header")).toHaveClass(/site-header--scrolled/);
  await expect(page.getByRole("button", { name: "Open navigation" })).toBeVisible();
});

test("full-screen navigation exposes group, sector, and contact panels", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/", { waitUntil: "domcontentloaded" });

  const toggle = page.getByRole("button", { name: "Open navigation" });
  await toggle.click();

  const dialog = page.getByRole("dialog", { name: "Mendozer group navigation" });
  await expect(dialog).toBeVisible();
  const box = await dialog.boundingBox();
  expect(box?.width).toBeGreaterThanOrEqual(389);
  expect(box?.height).toBeGreaterThanOrEqual(843);
  expect(await page.locator("#main-content").evaluate((element) => element.hasAttribute("inert"))).toBeTruthy();
  expect(await page.locator("footer").evaluate((element) => element.hasAttribute("inert"))).toBeTruthy();

  const tabs = dialog.getByRole("tab");
  await expect(tabs).toHaveCount(3);
  await expect(dialog.getByRole("link", { name: "About" })).toBeVisible();

  await tabs.filter({ hasText: "Sectors" }).click();
  await expect(tabs.filter({ hasText: "Sectors" })).toHaveAttribute("aria-selected", "true");
  const sectorDisclosure = dialog.locator(".site-menu__sector").first();
  await sectorDisclosure.locator("summary").click();
  await expect(sectorDisclosure).toHaveAttribute("open", "");
  await expect(sectorDisclosure.getByRole("link", { name: /Explore Construction/ })).toBeVisible();

  await tabs.filter({ hasText: "Contact" }).click();
  await expect(dialog.getByRole("link", { name: "Licences and records" })).toBeVisible();
  await expect(dialog.getByRole("link", { name: "Prepare an enquiry" })).toBeVisible();

  await page.keyboard.press("Escape");
  await expect(toggle).toBeFocused();
  expect(await page.locator("#main-content").evaluate((element) => element.hasAttribute("inert"))).toBeFalsy();
});

test("full-screen navigation remains contained at the 320px floor", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 720 });
  await page.goto("/", { waitUntil: "domcontentloaded" });
  await page.getByRole("button", { name: "Open navigation" }).click();
  await expect(page.getByRole("dialog", { name: "Mendozer group navigation" })).toBeVisible();
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
  expect(overflow, "horizontal overflow in 320px full-screen navigation").toBeFalsy();
});

test("motion setup does not create horizontal overflow on compact viewports", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 720 });
  await page.goto("/", { waitUntil: "domcontentloaded" });
  await page.waitForFunction(() => document.documentElement.dataset.motion === "enabled");
  await page.waitForTimeout(250);
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
  expect(overflow, "motion transforms must not widen the 320px document").toBeFalsy();
});

test("full-screen navigation backdrop is opaque from its first rendered frame", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/", { waitUntil: "domcontentloaded" });
  await page.getByRole("button", { name: "Open navigation" }).click();
  const opacity = await page.locator(".site-menu").evaluate((element) => getComputedStyle(element).opacity);
  expect(opacity, "modal background must not reveal page content while opening").toBe("1");
});

test("scrolled navigation becomes an inset floating bar", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/", { waitUntil: "domcontentloaded" });
  await page.evaluate(() => window.scrollTo(0, 700));
  const header = page.locator(".site-header");
  await expect(header).toHaveClass(/site-header--scrolled/);
  const geometry = await header.evaluate((element) => {
    const headerRect = element.getBoundingClientRect();
    const inner = element.querySelector<HTMLElement>(".site-header__inner");
    const innerRect = inner?.getBoundingClientRect();
    return {
      headerTop: headerRect.top,
      innerLeft: innerRect?.left ?? 0,
      innerRight: innerRect?.right ?? 0,
      innerBackground: inner ? getComputedStyle(inner).backgroundColor : "",
    };
  });
  expect(geometry.headerTop).toBeGreaterThan(0);
  expect(geometry.innerLeft).toBeGreaterThan(0);
  expect(geometry.innerRight).toBeLessThan(390);
  expect(geometry.innerBackground).not.toBe("rgba(0, 0, 0, 0)");
});

test("interior top-level routes expose a breadcrumb back to home", async ({ page }) => {
  for (const [route, current] of [
    ["/about", "About"],
    ["/sectors", "Sectors"],
    ["/work", "Work Context"],
    ["/updates", "Updates & Public Records"],
    ["/compliance", "Public Records & Licences"],
    ["/community", "Community & Sponsorship"],
    ["/contact", "Contact"],
    ["/privacy", "Privacy notice"],
    ["/terms", "Website terms"],
  ] as const) {
    await page.goto(route, { waitUntil: "domcontentloaded" });
    const breadcrumb = page.getByRole("navigation", { name: "Breadcrumb" });
    await expect(breadcrumb).toBeVisible();
    await expect(breadcrumb.getByRole("link", { name: "Home" })).toHaveAttribute("href", "/");
    await expect(breadcrumb).toContainText(current);
  }
});

test("full-screen navigation links complete client-side routing", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/", { waitUntil: "domcontentloaded" });
  await page.getByRole("button", { name: "Open navigation" }).click();
  await page.getByRole("tab", { name: "Sectors" }).click();
  const technology = page.locator(".site-menu__sector").filter({ hasText: "Technology & Systems" });
  await technology.locator("summary").click();
  await technology.getByRole("link", { name: "Explore Technology" }).click();
  await page.waitForURL("**/sectors/technology");
  await expect(page.locator("main h1")).toHaveText("Technology & Systems");

  await page.getByRole("button", { name: "Open navigation" }).click();
  await page.getByRole("tab", { name: "Contact" }).click();
  await page.getByRole("link", { name: "Prepare an enquiry" }).click();
  await page.waitForURL("**/contact");
  await expect(page.locator("main h1")).toHaveText("Start with the work in front of you.");
});

test("compact hero keeps supplied-photo motion available when motion is allowed", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/", { waitUntil: "domcontentloaded" });
  const visible = await page.locator(".home-hero video").evaluate((element) => getComputedStyle(element).display !== "none");
  expect(visible).toBeTruthy();
});

test("scroll-to-top appears after scrolling and restores the page origin", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/", { waitUntil: "domcontentloaded" });
  await expect(page.getByRole("button", { name: "Back to top" })).toHaveCount(0);
  await page.evaluate(() => window.scrollTo(0, 900));
  const control = page.getByRole("button", { name: "Back to top" });
  await expect(control).toBeVisible();
  await control.click();
  await page.waitForFunction(() => window.scrollY === 0);
});

test("WhatsApp remains absent until an approved public number is configured", async ({ page }) => {
  await page.goto("/", { waitUntil: "domcontentloaded" });
  await expect(page.getByRole("link", { name: "WhatsApp" })).toHaveCount(0);
});

test("utility controls are isolated while the full-screen menu is open", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/", { waitUntil: "domcontentloaded" });
  await page.evaluate(() => window.scrollTo(0, 900));
  await expect(page.getByRole("button", { name: "Back to top" })).toBeVisible();
  await page.getByRole("button", { name: "Open navigation" }).click();
  expect(await page.locator(".utility-widgets").evaluate((element) => element.hasAttribute("inert"))).toBeTruthy();
  await page.keyboard.press("Escape");
  expect(await page.locator(".utility-widgets").evaluate((element) => element.hasAttribute("inert"))).toBeFalsy();
});
