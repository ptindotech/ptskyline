import { createHash } from "node:crypto";
import { cookies } from "next/headers";

export const ADMIN_SESSION_COOKIE = "skyline_admin_session";

const DEFAULT_ADMIN_USERNAME = "admin";
const DEFAULT_ADMIN_PASSWORD = "MendozerAdmin!2026";

function adminCredentialString() {
  return `${process.env.ADMIN_USERNAME ?? DEFAULT_ADMIN_USERNAME}:${process.env.ADMIN_PASSWORD ?? DEFAULT_ADMIN_PASSWORD}`;
}

export function createSessionToken() {
  return createHash("sha256").update(adminCredentialString()).digest("hex");
}

export function verifyAdminCredentials(username: string, password: string) {
  return username === (process.env.ADMIN_USERNAME ?? DEFAULT_ADMIN_USERNAME) && password === (process.env.ADMIN_PASSWORD ?? DEFAULT_ADMIN_PASSWORD);
}

export async function requireAdminSession() {
  const cookieStore = await cookies();
  const session = cookieStore.get(ADMIN_SESSION_COOKIE)?.value;
  if (!session || session !== createSessionToken()) {
    throw new Error("Unauthorized");
  }
}
