import Link from "next/link";

import { formatPostDate } from "@/lib/blog/format";
import type { BlogPost, BlogPostSummary, TocHeading } from "@/lib/blog/types";
import { basicDetails } from "@/data/meta-data/basic-details-data";

import { PostNavBanner } from "./post-nav-banner";
import styles from "./post-article.module.css";

type PostArticleProps = {
  post: BlogPost;
  /** Pre-rendered, syntax-highlighted HTML for the Markdown body. */
  contentHtml: string;
  /** Table-of-contents headings (h2/h3) extracted from the body. */
  toc: TocHeading[];
  /** The post published before this one (older), for the nav banner. */
  previousPost: BlogPostSummary | null;
};

/** Full rendered blog post: header, meta, the Markdown body, and a TOC. */
export function PostArticle({
  post,
  contentHtml,
  toc,
  previousPost,
}: PostArticleProps) {
  const { frontmatter, readingTimeMinutes, slug } = post;
  const author = frontmatter.author ?? basicDetails.author.name;
  // Only worth showing a TOC once there are a couple of sections to jump to.
  const hasToc = toc.length >= 2;

  return (
    <div className={styles.layout} data-has-toc={hasToc}>
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

        {/* Markdown is rendered to HTML on the server (see lib/blog/markdown.ts). */}
        <div
          className={styles.content}
          data-testid="blog-post-content"
          dangerouslySetInnerHTML={{ __html: contentHtml }}
        />

        {previousPost && <PostNavBanner post={previousPost} />}
      </article>

      {/* TOC hidden for now */}
      {/* {hasToc && <PostToc items={toc} />} */}
    </div>
  );
}
