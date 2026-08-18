import { NextResponse } from "next/server";
import { getSiteSettings } from "@/lib/cms-store";

export async function GET() {
  const settings = await getSiteSettings();
  return NextResponse.json({
    ok: true,
    settings: {
      logo: settings.logo,
      navigation: settings.navigation,
      brandName: settings.brandName,
      url: settings.url,
      email: settings.email,
    },
  });
}
