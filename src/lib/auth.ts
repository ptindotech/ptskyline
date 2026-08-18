import { createHash } from "node:crypto";
import { cookies } from "next/headers";

export const ADMIN_SESSION_COOKIE = "skyline_admin_session";

function adminCredentialString() {
  return `${process.env.ADMIN_USERNAME ?? "admin"}:${process.env.ADMIN_PASSWORD ?? "change-this-password"}`;
}

export function createSessionToken() {
  return createHash("sha256").update(adminCredentialString()).digest("hex");
}

export function verifyAdminCredentials(username: string, password: string) {
  return username === (process.env.ADMIN_USERNAME ?? "admin") && password === (process.env.ADMIN_PASSWORD ?? "change-this-password");
}

export async function requireAdminSession() {
  const cookieStore = await cookies();
  const session = cookieStore.get(ADMIN_SESSION_COOKIE)?.value;
  if (!session || session !== createSessionToken()) {
    throw new Error("Unauthorized");
  }
}
