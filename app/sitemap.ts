import type { MetadataRoute } from "next";

import { basicDetails } from "@/data/meta-data/basic-details-data";
import { siteRoutes } from "@/data/meta-data/site-routes";

/**
 * Generates `/sitemap.xml` from the route list in `data/meta-data/site-routes`.
 *
 * URLs are built against the canonical origin (`basicDetails.websiteURL`) so
 * they stay consistent with the site's `metadataBase` and canonical tags.
 * To add a page to the sitemap, edit `site-routes.ts` — not this file.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const origin = basicDetails.websiteURL.replace(/\/$/, "");

  return siteRoutes.map((route) => ({
    url: route.path === "/" ? origin : `${origin}${route.path}`,
    lastModified: route.lastModified
      ? new Date(route.lastModified)
      : new Date(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
