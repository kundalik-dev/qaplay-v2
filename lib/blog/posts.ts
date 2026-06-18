import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

import matter from "gray-matter";

import type { BlogFrontmatter, BlogPost, BlogPostSummary } from "./types";

/**
 * Filesystem-backed blog source.
 *
 * Posts live as Markdown files in `blogs/*.md`. Reading happens at build
 * time (server-only), so these helpers use synchronous `fs` calls — they are
 * safe to call from Server Components, `generateStaticParams`, `sitemap.ts`,
 * and `generateMetadata`.
 *
 * Conventions:
 *   - The filename (without `.md`) is the URL slug.
 *   - Files starting with `_` and `README.md` are ignored (templates/docs).
 *   - `draft: true` posts are hidden in production builds but visible in dev.
 */

/** Absolute path to the Markdown post directory (root-level `blogs/`). */
const POSTS_DIR = join(process.cwd(), "blogs");

const WORDS_PER_MINUTE = 200;

/** True when running a production build/runtime (drafts are hidden). */
const isProduction = process.env.NODE_ENV === "production";

/** Estimate reading time in whole minutes from a raw Markdown body. */
function estimateReadingTime(content: string): number {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
}

/** List the Markdown post filenames, excluding templates and docs. */
function listPostFiles(): string[] {
  let entries: string[];
  try {
    entries = readdirSync(POSTS_DIR);
  } catch {
    // The directory may not exist yet (e.g. before the first post is added).
    return [];
  }

  return entries.filter(
    (file) =>
      file.endsWith(".md") &&
      !file.startsWith("_") &&
      file.toLowerCase() !== "readme.md",
  );
}

/** Read and parse a single Markdown file into a full `BlogPost`. */
function readPost(fileName: string): BlogPost {
  const slug = fileName.replace(/\.md$/, "");
  const raw = readFileSync(join(POSTS_DIR, fileName), "utf8");
  const { data, content } = matter(raw);

  return {
    slug,
    frontmatter: data as BlogFrontmatter,
    content,
    readingTimeMinutes: estimateReadingTime(content),
  };
}

/** True when a post should be visible in the current environment. */
function isVisible(post: BlogPost): boolean {
  return !(isProduction && post.frontmatter.draft);
}

/** Newest-first comparator by publish date. */
function byNewest(a: BlogPostSummary, b: BlogPostSummary): number {
  return (
    new Date(b.frontmatter.date).getTime() -
    new Date(a.frontmatter.date).getTime()
  );
}

/** Strip the heavy Markdown body, keeping only listing-friendly fields. */
function toSummary(post: BlogPost): BlogPostSummary {
  const { slug, frontmatter, readingTimeMinutes } = post;
  return { slug, frontmatter, readingTimeMinutes };
}

/**
 * Return every visible post as a lightweight summary, newest first.
 * Use for the blog index, related-post lists, and the sitemap.
 */
export function getAllPosts(): BlogPostSummary[] {
  return listPostFiles()
    .map(readPost)
    .filter(isVisible)
    .map(toSummary)
    .sort(byNewest);
}

/** Return every visible post's slug. Use for `generateStaticParams`. */
export function getAllPostSlugs(): string[] {
  return getAllPosts().map((post) => post.slug);
}

/**
 * Return a single post (with its raw Markdown body) by slug, or `null` when
 * the post is missing or hidden in the current environment.
 */
export function getPostBySlug(slug: string): BlogPost | null {
  const fileName = `${slug}.md`;
  try {
    const post = readPost(fileName);
    return isVisible(post) ? post : null;
  } catch {
    return null;
  }
}
