import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { ADMIN_SESSION_COOKIE, createSessionToken, requireAdminSession } from "@/lib/auth";

export async function GET() {
  try {
    await requireAdminSession();
    const cookieStore = await cookies();
    const session = cookieStore.get(ADMIN_SESSION_COOKIE)?.value;
    const username = process.env.ADMIN_USERNAME ?? "admin";

    return NextResponse.json({ ok: true, username: session && session === createSessionToken() ? username : null });
  } catch {
    return NextResponse.json({ ok: false, message: "Unauthorized" }, { status: 401 });
  }
}
