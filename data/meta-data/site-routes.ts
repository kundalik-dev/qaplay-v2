import type { SiteRoute } from "@/types/meta-data-types";

/**
 * Crawlable routes for the sitemap.
 *
 * Single source of truth consumed by `app/sitemap.ts`. Add a new public
 * page here (matching a route under `app/`) and it is automatically
 * included in `/sitemap.xml`. Keep `lastModified` current when a page's
 * content meaningfully changes so search engines see accurate dates.
 *
 * Do not list non-indexable routes (API handlers, auth, admin) here.
 */
export const siteRoutes: SiteRoute[] = [
  {
    path: "/",
    changeFrequency: "weekly",
    priority: 1,
    lastModified: "2026-06-16",
  },
  {
    path: "/practice",
    changeFrequency: "weekly",
    priority: 0.9,
    lastModified: "2026-06-16",
  },
  {
    path: "/chrome",
    changeFrequency: "weekly",
    priority: 0.8,
    lastModified: "2026-06-17",
  },
  {
    path: "/chrome/qa-capture",
    changeFrequency: "monthly",
    priority: 0.75,
    lastModified: "2026-06-17",
  },
  {
    path: "/chrome/qa-clipper",
    changeFrequency: "monthly",
    priority: 0.75,
    lastModified: "2026-06-17",
  },
];
