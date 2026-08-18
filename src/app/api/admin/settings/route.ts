import { NextResponse } from "next/server";
import { requireAdminSession } from "@/lib/auth";
import { getSiteSettings, saveSiteSettings } from "@/lib/cms-store";

export async function GET() {
  try {
    await requireAdminSession();
    const settings = await getSiteSettings();
    return NextResponse.json({ ok: true, settings });
  } catch {
    return NextResponse.json({ ok: false, message: "Unauthorized" }, { status: 401 });
  }
}

export async function PUT(request: Request) {
  try {
    await requireAdminSession();
    const payload = await request.json();
    const settings = await saveSiteSettings(payload);
    return NextResponse.json({ ok: true, settings });
  } catch {
    return NextResponse.json({ ok: false, message: "Unauthorized" }, { status: 401 });
  }
}
