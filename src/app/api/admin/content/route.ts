import { NextResponse } from "next/server";
import { requireAdminSession } from "@/lib/auth";
import { getWebsiteContent, saveWebsiteContent } from "@/lib/cms-store";

export async function GET() {
  try {
    await requireAdminSession();
    const content = await getWebsiteContent();
    return NextResponse.json({ ok: true, content });
  } catch {
    return NextResponse.json({ ok: false, message: "Unauthorized" }, { status: 401 });
  }
}

export async function PUT(request: Request) {
  try {
    await requireAdminSession();
    const payload = await request.json();
    const content = await saveWebsiteContent(payload?.content ?? payload);
    return NextResponse.json({ ok: true, content });
  } catch {
    return NextResponse.json({ ok: false, message: "Unauthorized" }, { status: 401 });
  }
}
