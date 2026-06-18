import type { MetadataRoute } from "next";

import { basicDetails } from "@/data/meta-data/basic-details-data";
import { siteRoutes } from "@/data/meta-data/site-routes";
import { getAllPosts } from "@/lib/blog/posts";

/**
 * Generates `/sitemap.xml` from the static route list in
 * `data/meta-data/site-routes` plus every published blog post.
 *
 * URLs are built against the canonical origin (`basicDetails.websiteURL`) so
 * they stay consistent with the site's `metadataBase` and canonical tags.
 * To add a static page to the sitemap, edit `site-routes.ts` — not this file.
 * Blog posts are picked up automatically from `docs/blog/*.md`.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const origin = basicDetails.websiteURL.replace(/\/$/, "");

  const staticRoutes: MetadataRoute.Sitemap = siteRoutes.map((route) => ({
    url: route.path === "/" ? origin : `${origin}${route.path}`,
    lastModified: route.lastModified
      ? new Date(route.lastModified)
      : new Date(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  const blogRoutes: MetadataRoute.Sitemap = getAllPosts().map((post) => ({
    url: `${origin}/blog/${post.slug}`,
    lastModified: new Date(post.frontmatter.updated ?? post.frontmatter.date),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...blogRoutes];
}
