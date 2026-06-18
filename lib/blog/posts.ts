import { readdirSync, readFileSync, type Dirent } from "node:fs";
import { join } from "node:path";

import matter from "gray-matter";

import type { BlogFrontmatter, BlogPost, BlogPostSummary } from "./types";

/**
 * Filesystem-backed blog source.
 *
 * Posts live as Markdown files anywhere under `blogs/` — both top-level files
 * (`blogs/my-post.md`) and nested folders (`blogs/posts/my-post.md`) are
 * picked up. Reading happens at build time (server-only), so these helpers use
 * synchronous `fs` calls — safe to call from Server Components,
 * `generateStaticParams`, `sitemap.ts`, and `generateMetadata`.
 *
 * Conventions:
 *   - The URL slug is the frontmatter `slug` if present, else the filename
 *     (without `.md`). Slugs are flat regardless of folder nesting.
 *   - Files starting with `_` and `README.md` are ignored (templates/docs).
 *   - `draft: true` posts are hidden in production builds but visible in dev.
 *   - Legacy frontmatter keys are normalized (see `normalizeFrontmatter`), so
 *     older posts render without being rewritten.
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

/** Should this filename be treated as a publishable post? */
function isPostFile(name: string): boolean {
  return (
    name.endsWith(".md") &&
    !name.startsWith("_") &&
    name.toLowerCase() !== "readme.md"
  );
}

/**
 * Recursively collect absolute paths to every Markdown post under `blogs/`.
 * Subfolders (e.g. `blogs/posts/`) are walked so posts can be grouped freely.
 */
function listPostFiles(dir: string = POSTS_DIR): string[] {
  let entries: Dirent[];
  try {
    entries = readdirSync(dir, { withFileTypes: true });
  } catch {
    // The directory may not exist yet (e.g. before the first post is added).
    return [];
  }

  return entries.flatMap((entry) => {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) return listPostFiles(fullPath);
    return isPostFile(entry.name) ? [fullPath] : [];
  });
}

/** Coerce a value into a string array (splitting comma-separated strings). */
function toStringArray(value: unknown): string[] | undefined {
  if (Array.isArray(value)) {
    return value.map((item) => String(item).trim()).filter(Boolean);
  }
  if (typeof value === "string") {
    return value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
  }
  return undefined;
}

/**
 * Normalize raw frontmatter into the canonical `BlogFrontmatter` shape,
 * accepting both the current schema and the legacy schema used by older
 * posts (`lastModified`, `category`, comma-separated `keywords`, `image`,
 * `imageAlt`).
 */
function normalizeFrontmatter(data: Record<string, unknown>): BlogFrontmatter {
  return {
    title: String(data.title ?? "Untitled"),
    description: String(data.description ?? ""),
    date: String(data.date ?? ""),
    updated: (data.updated ?? data.lastModified) as string | undefined,
    author: data.author ? String(data.author) : undefined,
    tags: toStringArray(data.tags ?? data.category),
    category: toStringArray(data.category ?? data.tags),
    keywords: toStringArray(data.keywords),
    coverImage: data.coverImage
      ? String(data.coverImage)
      : data.image
        ? String(data.image)
        : undefined,
    coverImageAlt: data.coverImageAlt
      ? String(data.coverImageAlt)
      : data.imageAlt
        ? String(data.imageAlt)
        : undefined,
    draft: data.draft === true,
    featured: data.featured === true,
  };
}

/** Parse one Markdown file into a `BlogPostSummary`. */
function parsePost(filePath: string): BlogPostSummary | null {
  try {
    const raw = readFileSync(filePath, "utf-8");
    const { data, content } = matter(raw);
    const frontmatter = normalizeFrontmatter(data);

    if (isProduction && frontmatter.draft) return null;

    const slug =
      typeof data.slug === "string" && data.slug.trim()
        ? data.slug.trim()
        : filePath.replace(/\\/g, "/").split("/").pop()!.replace(/\.md$/, "");

    return {
      slug,
      frontmatter,
      readingTimeMinutes: estimateReadingTime(content),
    };
  } catch {
    return null;
  }
}

/**
 * Return all published posts sorted newest-first.
 * In dev builds drafts are included; in production they are filtered out.
 */
export function getAllPosts(): BlogPostSummary[] {
  return listPostFiles()
    .map(parsePost)
    .filter((p): p is BlogPostSummary => p !== null)
    .sort(
      (a, b) =>
        new Date(b.frontmatter.date).getTime() -
        new Date(a.frontmatter.date).getTime(),
    );
}

/** Return a single post (with full Markdown body) by slug, or null if not found. */
export function getPostBySlug(slug: string): BlogPost | null {
  const files = listPostFiles();
  for (const filePath of files) {
    try {
      const raw = readFileSync(filePath, "utf-8");
      const { data, content } = matter(raw);
      const frontmatter = normalizeFrontmatter(data);

      if (isProduction && frontmatter.draft) continue;

      const fileSlug =
        typeof data.slug === "string" && data.slug.trim()
          ? data.slug.trim()
          : filePath.replace(/\\/g, "/").split("/").pop()!.replace(/\.md$/, "");

      if (fileSlug === slug) {
        return {
          slug: fileSlug,
          frontmatter,
          readingTimeMinutes: estimateReadingTime(content),
          content,
        };
      }
    } catch {
      continue;
    }
  }
  return null;
}

/** Return all published post slugs (used by `generateStaticParams`). */
export function getAllPostSlugs(): string[] {
  return getAllPosts().map((p) => p.slug);
}

/**
 * Return the post published immediately before `currentSlug` (older),
 * or null if `currentSlug` is the oldest post.
 *
 * "Previous" = one step older in the newest-first list, so index + 1.
 */
export function getPreviousPost(currentSlug: string): BlogPostSummary | null {
  const posts = getAllPosts();
  const idx = posts.findIndex((p) => p.slug === currentSlug);
  if (idx === -1 || idx === posts.length - 1) return null;
  return posts[idx + 1];
}
