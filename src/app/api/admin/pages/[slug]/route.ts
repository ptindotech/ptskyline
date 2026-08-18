import { NextResponse } from "next/server";
import { requireAdminSession } from "@/lib/auth";
import { deletePageMarkdown, savePageMarkdown } from "@/lib/cms-store";

export async function PUT(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  try {
    await requireAdminSession();
    const { slug } = await params;
    const payload = await request.json();
    if (!payload?.title || !payload?.markdown) {
      return NextResponse.json({ ok: false, message: "Title and markdown are required." }, { status: 400 });
    }
    const page = await savePageMarkdown(slug, payload.title, payload.description ?? "", payload.markdown);
    return NextResponse.json({ ok: true, page });
  } catch {
    return NextResponse.json({ ok: false, message: "Unauthorized" }, { status: 401 });
  }
}

export async function DELETE(_: Request, { params }: { params: Promise<{ slug: string }> }) {
  try {
    await requireAdminSession();
    const { slug } = await params;
    await deletePageMarkdown(slug);
    return NextResponse.json({ ok: true, deleted: slug });
  } catch {
    return NextResponse.json({ ok: false, message: "Unauthorized" }, { status: 401 });
  }
}
