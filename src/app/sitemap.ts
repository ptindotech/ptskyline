import type { MetadataRoute } from "next";
import { siteConfig } from "@/brand/site-config";
import { routes } from "@/content/site-content";

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => {
    // Normalise: root has no trailing slash to match the rendered canonical.
    // All other routes keep their path as-is (no trailing slash in Next.js default).
    const normalized = route === "/" ? siteConfig.url : new URL(route, siteConfig.url).toString().replace(/\/$/, "");
    return {
      url: normalized,
      lastModified: new Date(),
      changeFrequency: route === "/" ? "weekly" : "monthly",
      priority: route === "/" ? 1 : 0.8,
    };
  });
}
