import type { MetadataRoute } from "next";
const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
export default function sitemap(): MetadataRoute.Sitemap {
  return ["", "/about", "/contact", "/legal/privacy", "/legal/terms", "/legal/copyright", "/legal/accessibility", "/legal/cookies"].map((p) => ({ url: base + p }));
}
