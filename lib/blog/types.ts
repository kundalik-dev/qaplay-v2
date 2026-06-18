/**
 * Blog framework types.
 *
 * Blog posts are authored as Markdown files in `docs/blog/*.md`. The YAML
 * frontmatter at the top of each file maps to `BlogFrontmatter`, which drives
 * both the page `Metadata` and the Article JSON-LD structured data.
 */

/** Frontmatter authored at the top of each `docs/blog/*.md` post. */
export type BlogFrontmatter = {
  /** Post title — used for the H1, page title, and Article headline. */
  title: string;
  /** Short summary — used for the meta description and Article description. */
  description: string;
  /** ISO 8601 publish date, e.g. "2026-06-18". Drives `datePublished`. */
  date: string;
  /** ISO 8601 last-updated date. Defaults to `date` when omitted. */
  updated?: string;
  /** Author display name. Falls back to the site author. */
  author?: string;
  /** Topic tags shown as pills and used as extra SEO keywords. */
  tags?: string[];
  /** Extra SEO keywords merged with the site defaults. */
  keywords?: string[];
  /** Cover/OG image path (relative to the site origin), e.g. "/blog/x.png". */
  coverImage?: string;
  /** Alt text for the cover image. */
  coverImageAlt?: string;
  /** When true, the post is hidden in production builds. */
  draft?: boolean;
  /** When true, the post is highlighted on the blog index. */
  featured?: boolean;
};

/** Lightweight post record (frontmatter only) used for listings and sitemaps. */
export type BlogPostSummary = {
  /** URL slug derived from the filename, e.g. "getting-started". */
  slug: string;
  /** Parsed frontmatter. */
  frontmatter: BlogFrontmatter;
  /** Estimated reading time in whole minutes. */
  readingTimeMinutes: number;
};

/** A full post including the raw Markdown body. */
export type BlogPost = BlogPostSummary & {
  /** Raw Markdown content (without frontmatter). */
  content: string;
};
