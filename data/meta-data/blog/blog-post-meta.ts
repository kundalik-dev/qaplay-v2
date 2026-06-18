import type { Metadata } from "next";

import type { BlogPost } from "@/lib/blog/types";

import { basicDetails } from "../basic-details-data";
import { createPageMetadata } from "../create-page-metadata";
import {
  createBlogPostingJsonLd,
  createBreadcrumbJsonLd,
} from "../structured-data";

/**
 * Per-post metadata + structured data builders.
 *
 * These translate a post's Markdown frontmatter into the centralized
 * metadata + JSON-LD system, so individual posts get full SEO without any
 * hand-written `<head>` content.
 */

/** Canonical route path for a post slug. */
function postPath(slug: string): string {
  return `/blog/${slug}`;
}

/** Build the Next.js `Metadata` for a single post from its frontmatter. */
export function buildBlogPostMetadata(post: BlogPost): Metadata {
  const { frontmatter, slug } = post;

  return createPageMetadata({
    title: frontmatter.title,
    description: frontmatter.description,
    path: postPath(slug),
    ogType: "article",
    keywords: [...(frontmatter.tags ?? []), ...(frontmatter.keywords ?? [])],
    ogImage: frontmatter.coverImage
      ? {
          url: frontmatter.coverImage,
          width: 1200,
          height: 630,
          alt: frontmatter.coverImageAlt ?? frontmatter.title,
        }
      : undefined,
  });
}

/** Build the BlogPosting JSON-LD for a single post. */
export function buildBlogPostJsonLd(post: BlogPost) {
  const { frontmatter, slug } = post;

  return createBlogPostingJsonLd({
    headline: frontmatter.title,
    description: frontmatter.description,
    path: postPath(slug),
    image: frontmatter.coverImage,
    datePublished: frontmatter.date,
    dateModified: frontmatter.updated ?? frontmatter.date,
    authorName: frontmatter.author ?? basicDetails.author.name,
    keywords: [...(frontmatter.tags ?? []), ...(frontmatter.keywords ?? [])],
  });
}

/** Build the breadcrumb JSON-LD (Home › Blog › Post) for a single post. */
export function buildBlogPostBreadcrumbJsonLd(post: BlogPost) {
  return createBreadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Blog", path: "/blog" },
    { name: post.frontmatter.title, path: postPath(post.slug) },
  ]);
}
