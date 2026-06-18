import Link from "next/link";

import type { BlogPostSummary } from "@/lib/blog/types";

import styles from "./post-nav-banner.module.css";

function toLabel(cat: string): string {
  const map: Record<string, string> = {
    ai: "AI",
    automation: "Automation",
    general: "General",
    nextjs: "Nextjs",
    playwright: "Playwright",
    security: "Security",
    selenium: "Selenium",
    testing: "Testing",
    tools: "Tools",
  };
  const key = cat.toLowerCase();
  return map[key] ?? cat.charAt(0).toUpperCase() + cat.slice(1);
}

type PostNavBannerProps = {
  post: BlogPostSummary;
};

/** Banner shown at the bottom of a blog post linking to the previous post. */
export function PostNavBanner({ post }: PostNavBannerProps) {
  const { slug, frontmatter } = post;
  const href = `/blog/${slug}`;
  const categories = (frontmatter.category ?? frontmatter.tags ?? []).slice(
    0,
    3,
  );

  return (
    <nav
      className={styles.nav}
      data-testid="post-nav-banner"
      data-section="post-navigation"
      aria-label="Previous post"
    >
      <p className={styles.label}>Previous Post</p>

      <Link
        href={href}
        className={styles.card}
        data-testid="post-nav-previous-link"
        data-slug={slug}
      >
        {/* Thumbnail */}
        <div className={styles.thumb} aria-hidden="true">
          {frontmatter.coverImage ? (
            <img
              src={frontmatter.coverImage}
              alt={frontmatter.coverImageAlt ?? frontmatter.title}
              className={styles.thumbImg}
              width={96}
              height={64}
              loading="lazy"
              decoding="async"
            />
          ) : (
            <div className={styles.thumbPlaceholder}>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className={styles.thumbIcon}
                aria-hidden="true"
              >
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <path d="m21 15-5-5L5 21" />
              </svg>
            </div>
          )}
        </div>

        {/* Body */}
        <div className={styles.body}>
          {categories.length > 0 && (
            <div className={styles.pills} data-testid="post-nav-tags">
              {categories.map((cat) => (
                <span
                  key={cat}
                  className={styles.pill}
                  data-cat={cat.toLowerCase()}
                >
                  {toLabel(cat)}
                </span>
              ))}
            </div>
          )}

          <p className={styles.title}>{frontmatter.title}</p>
          <p className={styles.description}>{frontmatter.description}</p>

          <span className={styles.readMore} data-testid="post-nav-read-more">
       