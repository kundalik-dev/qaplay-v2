import Image from "next/image";
import Link from "next/link";

import { formatPostDate } from "@/lib/blog/format";
import type { BlogPostSummary } from "@/lib/blog/types";

import styles from "./blog-card.module.css";

/** Normalize a category string to a display label */
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

/** A single post preview card on the blog index. */
export function BlogCard({ post }: { post: BlogPostSummary }) {
  const { slug, frontmatter, readingTimeMinutes } = post;
  const href = `/blog/${slug}`;
  const categories = (frontmatter.category ?? frontmatter.tags ?? []).slice(
    0,
    3,
  );

  return (
    <article
      className={styles.card}
      data-testid={`blog-card-${slug}`}
      data-card="blog-post"
      data-slug={slug}
    >
      <Link
        href={href}
        className={styles.cardLink}
        data-testid={`blog-link-${slug}`}
      >
        {frontmatter.coverImage ? (
          <div className={styles.imageWrap} data-testid={`blog-image-${slug}`}>
            <Image
              src={frontmatter.coverImage}
              alt={frontmatter.coverImageAlt ?? frontmatter.title}
              className={styles.image}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          </div>
        ) : (
          <div className={styles.imagePlaceholder} aria-hidden="true">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className={styles.placeholderIcon}
            >
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <path d="m21 15-5-5L5 21" />
            </svg>
          </div>
        )}

        <div className={styles.body}>
          {categories.length > 0 && (
            <div className={styles.pills} data-testid={`blog-tags-${slug}`}>
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

          <h2 className={styles.title}>{frontmatter.title}</h2>

          <p className={styles.description}>{frontmatter.description}</p>

          <div className={styles.meta}>
            <time dateTime={frontmatter.date} className={styles.metaItem}>
              <svg
                viewBox="0 0 16 16"
                fill="currentColor"
                className={styles.metaIcon}
                aria-hidden="true"
              >
                <path d="M5.75 1a.75.75 0 0 0-.75.75V3H3.5A1.5 1.5 0 0 0 2 4.5v8A1.5 1.5 0 0 0 3.5 14h9a1.5 1.5 0 0 0 1.5-1.5v-8A1.5 1.5 0 0 0 12.5 3H11V1.75a.75.75 0 0 0-1.5 0V3h-3V1.75A.75.75 0 0 0 5.75 1ZM3.5 5h9a.5.5 0 0 1 .5.5V7H3V5.5a.5.5 0 0 1 .5-.5ZM3 8h10v4.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V8Z" />
              </svg>
              {formatPostDate(frontmatter.date)}
            </time>
            <span className={styles.metaItem}>
              <svg
                viewBox="0 0 16 16"
                fill="currentColor"
                className={styles.metaIcon}
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M1 8a7 7 0 1 1 14 0A7 7 0 0 1 1 8Zm7-6.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13ZM7.25 4.75a.75.75 0 0 1 1.5 0v3.69l2.28 1.52a.75.75 0 1 1-.82 1.24l-2.5-1.666A.75.75 0 0 1 7.25 9V4.75Z"
                  clipRule="evenodd"
                />
              </svg>
              {readingTimeMinutes} min read
            </span>
          </div>

          <span className={styles.readMore} aria-hidden="true">
            Read more
          </span>
        </div>
      </Link>
    </article>
  );
}
