import { expect, test } from "@playwright/test";

test("contact API validates incomplete submissions", async ({ request }) => {
  const response = await request.post("/api/contact", {
    data: { name: "", email: "not-an-email", message: "" },
  });
  expect(response.status()).toBe(400);
  await expect(response.json()).resolves.toMatchObject({ ok: false, code: "VALIDATION_FAILED" });
});

test("contact API handles honeypot submissions without mail delivery", async ({ request }) => {
  const response = await request.post("/api/contact", {
    data: { name: "Automated", email: "robot@example.com", message: "Ignore this", website: "https://spam.example" },
  });
  expect(response.status()).toBe(200);
  await expect(response.json()).resolves.toMatchObject({ ok: true });
});

test("contact API exposes configuration state without leaking credentials", async ({ request }) => {
  const response = await request.post("/api/contact", {
    data: { name: "Audit Visitor", email: "audit@example.com", message: "Configuration check", sector: "Group enquiry" },
  });
  expect(response.status()).toBe(503);
  await expect(response.json()).resolves.toMatchObject({ ok: false, code: "DELIVERY_NOT_CONFIGURED" });
});
