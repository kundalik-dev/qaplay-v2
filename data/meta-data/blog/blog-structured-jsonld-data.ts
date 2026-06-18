import { basicDetails } from "../basic-details-data";
import { createBreadcrumbJsonLd } from "../structured-data";

import type { BlogPostSummary } from "@/lib/blog/types";

/** /blog breadcrumb structured data. */
export const blogPageBreadcrumbJsonLd = createBreadcrumbJsonLd([
  { name: "Home", path: "/" },
  { name: "Blog", path: "/blog" },
]);

/** Resolve a relative path to an absolute URL against the site origin. */
function toAbsoluteUrl(path: string): string {
  return path === "/"
    ? basicDetails.websiteURL
    : `${basicDetails.websiteURL}${path}`;
}

/**
 * Build schema.org/Blog JSON-LD for the /blog index, listing each published
 * post as a `BlogPosting`. Driven by the live post list so it stays in sync.
 */
export function createBlogIndexJsonLd(posts: BlogPostSummary[]) {
  return {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: `${basicDetails.websiteName} Blog`,
    description: basicDetails.websiteDescription,
    url: toAbsoluteUrl("/blog"),
    inLanguage: basicDetails.locale.replace("_", "-"),
    blogPost: posts.map((post) => ({
      "@type": "BlogPosting",
      headline: post.frontmatter.title,
      description: post.frontmatter.description,
      url: toAbsoluteUrl(`/blog/${post.slug}`),
      datePublished: post.frontmatter.date,
      dateModified: post.frontmatter.updated ?? post.frontmatter.date,
      author: {
        "@type": "Person",
        name: post.frontmatter.author ?? basicDetails.author.name,
      },
    })),
  } as const;
}
