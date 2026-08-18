import type { MetadataRoute } from "next";
import { siteConfig } from "@/brand/site-config";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: siteConfig.shortName,
    description: siteConfig.description,
    start_url: "/",
    display: "browser",
    background_color: siteConfig.browserTheme.background,
    theme_color: siteConfig.browserTheme.dark,
    icons: [
      { src: "/assets/favicon/favicon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/assets/favicon/favicon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
