import { NextResponse } from "next/server";
import { requireAdminSession } from "@/lib/auth";
import { createPageMarkdown, listCmsPages } from "@/lib/cms-store";

export async function GET() {
  try {
    await requireAdminSession();
    const pages = await listCmsPages();
    return NextResponse.json({ ok: true, pages });
  } catch {
    return NextResponse.json({ ok: false, message: "Unauthorized" }, { status: 401 });
  }
}

export async function POST(request: Request) {
  try {
    await requireAdminSession();
    const payload = await request.json();
    const slug = typeof payload?.slug === "string" ? payload.slug : "";
    const title = typeof payload?.title === "string" ? payload.title : "New page";
    const description = typeof payload?.description === "string" ? payload.description : "";
    const markdown = typeof payload?.markdown === "string" ? payload.markdown : "# New page\n\nStart writing content here.";

    if (!slug.trim()) {
      return NextResponse.json({ ok: false, message: "Slug is required." }, { status: 400 });
    }

    const page = await createPageMarkdown(slug, title, description, markdown);
    return NextResponse.json({ ok: true, page });
  } catch (error) {
    if (error instanceof Error && error.message === "Page already exists") {
      return NextResponse.json({ ok: false, message: "A page with that slug already exists." }, { status: 409 });
    }
    return NextResponse.json({ ok: false, message: "Unauthorized" }, { status: 401 });
  }
}
