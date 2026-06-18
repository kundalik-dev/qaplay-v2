import Link from "next/link";

import { formatPostDate } from "@/lib/blog/format";
import type { BlogPostSummary } from "@/lib/blog/types";

import styles from "./blog-card.module.css";

/** A single post preview card on the blog index. */
export function BlogCard({ post }: { post: BlogPostSummary }) {
  const { slug, frontmatter, readingTimeMinutes } = post;
  const href = `/blog/${slug}`;

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
        <div className={styles.meta}>
          <time dateTime={frontmatter.date} className={styles.date}>
            {formatPostDate(frontmatter.date)}
          </time>
          <span className={styles.dot} aria-hidden="true">
            •
          </span>
          <span className={styles.readingTime}>
            {readingTimeMinutes} min read
          </span>
        </div>

        <h2 className={styles.title}>{frontmatter.title}</h2>
        <p className={styles.description}>{frontmatter.description}</p>

        {frontmatter.tags && frontmatter.tags.length > 0 && (
          <ul className={styles.tags} data-testid={`blog-tags-${slug}`}>
            {frontmatter.tags.map((tag) => (
              <li key={tag} className={styles.tag}>
                {tag}
              </li>
            ))}
          </ul>
        )}

        <span className={styles.readMore} aria-hidden="true">
          Read article →
        </span>
      </Link>
    </article>
  );
}
