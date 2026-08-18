import { NextResponse } from "next/server";
import { ADMIN_SESSION_COOKIE, verifyAdminCredentials, createSessionToken } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const username = typeof payload?.username === "string" ? payload.username : "";
    const password = typeof payload?.password === "string" ? payload.password : "";

    if (!verifyAdminCredentials(username, password)) {
      return NextResponse.json({ ok: false, message: "Invalid username or password." }, { status: 401 });
    }

    const response = NextResponse.json({ ok: true });
    response.cookies.set({
      name: ADMIN_SESSION_COOKIE,
      value: createSessionToken(),
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });
    return response;
  } catch {
    return NextResponse.json({ ok: false, message: "Unexpected login error." }, { status: 500 });
  }
}
