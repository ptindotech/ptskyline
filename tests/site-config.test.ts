import assert from "node:assert/strict";
import test from "node:test";

test("falls back when NEXT_PUBLIC_SITE_URL is blank or invalid", async () => {
  const previous = process.env.NEXT_PUBLIC_SITE_URL;
  process.env.NEXT_PUBLIC_SITE_URL = "   ";

  try {
    const modulePath = `../src/brand/site-config.ts?test=${Date.now()}`;
    const { siteConfig } = await import(modulePath);
    assert.equal(siteConfig.url, "https://mendozer.tangison.com");
    assert.doesNotThrow(() => new URL(siteConfig.url));
  } finally {
    if (previous === undefined) {
      delete process.env.NEXT_PUBLIC_SITE_URL;
    } else {
      process.env.NEXT_PUBLIC_SITE_URL = previous;
    }
  }
});
