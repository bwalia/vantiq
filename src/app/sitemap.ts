import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

/** Rendered at build time so it can be emitted by a static export. */
export const dynamic = "force-static";

const routes = [
  { path: "", priority: 1 },
  { path: "/care-homes", priority: 0.9 },
  { path: "/property", priority: 0.9 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return routes.map((route) => ({
    url: `${site.url}${route.path}`,
    lastModified,
    changeFrequency: "monthly",
    priority: route.priority,
  }));
}
