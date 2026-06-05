import type { MetadataRoute } from "next";
import { absoluteUrl, getSitemapPaths } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return Array.from(new Set(getSitemapPaths())).map((path) => {
    const isHome = path === "" || /^\/[a-z]{2}$/.test(path);
    const isProduct = path.includes("/product/");
    const isLegal = path.includes("/legal/") || path.includes("/help/");

    return {
      url: absoluteUrl(path || "/"),
      lastModified: now,
      changeFrequency: isProduct ? "weekly" : isLegal ? "monthly" : "daily",
      priority: isHome
        ? 1
        : path.includes("/shop")
          ? 0.9
          : isProduct
            ? 0.85
            : isLegal
              ? 0.65
              : 0.7,
    };
  });
}
