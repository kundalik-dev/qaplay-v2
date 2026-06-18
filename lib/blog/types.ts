/**
 * Blog framework types.
 *
 * Blog posts are authored as Markdown files in `blogs/*.md`. The YAML
 * frontmatter at the top of each file maps to `BlogFrontmatter`, which drives
 * both the page `Metadata` and the Article JSON-LD structured data.
 */

/** Frontmatter authored at the top of each `blogs/*.md` post. */
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
  /** Category labels used for filtering on the blog index (e.g. ["playwright", "automation"]). */
  category?: string[];
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

/** A single table-of-contents entry, derived from an `h2`/`h3` in the body. */
export type TocHeading = {
  /** Slugified anchor id, matching the `id` on the rendered heading. */
  id: string;
  /** Plain-text heading label (Markdown/HTML stripped). */
  text: string;
  /** Heading depth — 2 (section) or 3 (sub-section). */
  level: 2 | 3;
};

/** Rendered post body plus its extracted table of contents. */
export type RenderedPost = {
  /** Syntax-highlighted HTML for the Markdown body. */
  html: string;
  /** Ordered table-of-contents headings (`h2`/`h3`). */
  toc: TocHeading[];
};
