import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    "",
    "/platform",
    "/solutions",
    "/our-story",
    "/register-interest",
    "/contact",
    "/privacy",
    "/terms",
  ].map((path) => ({
    url: new URL(path || "/", site.url).href,
    changeFrequency: "monthly",
    priority: path === "" ? 1 : 0.7,
  }));
}
