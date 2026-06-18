import Link from "next/link";

import { formatPostDate } from "@/lib/blog/format";
import type { BlogPost, BlogPostSummary } from "@/lib/blog/types";
import { basicDetails } from "@/data/meta-data/basic-details-data";

import { PostNavBanner } from "./post-nav-banner";
import styles from "./post-article.module.css";

type PostArticleProps = {
  post: BlogPost;
  /** Pre-rendered, syntax-highlighted HTML for the Markdown body. */
  contentHtml: string;
  /** The post published before this one (older), for the nav banner. */
  previousPost: BlogPostSummary | null;
};

/** Full rendered blog post: header, meta, and the Markdown body. */
export function PostArticle({
  post,
  contentHtml,
  previousPost,
}: PostArticleProps) {
  const { frontmatter, readingTimeMinutes, slug } = post;
  const author = frontmatter.author ?? basicDetails.author.name;

  return (
    <article
      className={styles.article}
      data-testid={`blog-post-${slug}`}
      data-section="blog-post"
      data-slug={slug}
    >
      <Link href="/blog" className={styles.back} data-testid="blog-back-link">
        ← All posts
      </Link>

      <header className={styles.header}>
        {frontmatter.tags && frontmatter.tags.length > 0 && (
          <ul className={styles.tags} data-testid="blog-post-tags">
            {frontmatter.tags.map((tag) => (
              <li key={tag} className={styles.tag}>
                {tag}
              </li>
            ))}
          </ul>
        )}

        <h1 className={styles.title} data-testid="blog-post-title">
          {frontmatter.title}
        </h1>
        <p className={styles.description}>{frontmatter.description}</p>

        <div className={styles.meta} data-testid="blog-post-meta">
          <span className={styles.author}>{author}</span>
          <span className={styles.dot} aria-hidden="true">
            •
          </span>
          <time dateTime={frontmatter.date}>
            {formatPostDate(frontmatter.date)}
          </time>
          <span className={styles.dot} aria-hidden="true">
            •
          </span>
          <span>{readingTimeMinutes} min read</span>
        </div>
      </header>

      <div
        className={styles.content}
        data-testid="blog-post-content"
        dangerouslySetInnerHTML={{ __html: contentHtml }}
      />

      {previousPost && <PostNavBanner post={previousPost} />}
    </article>
  );
}
