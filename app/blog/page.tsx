import { JsonLd } from "@/components/seo";
import { blogPageMetadata } from "@/data/meta-data/blog/blog-page-meta-data";
import {
  blogPageBreadcrumbJsonLd,
  createBlogIndexJsonLd,
} from "@/data/meta-data/blog/blog-structured-jsonld-data";
import { getAllPosts } from "@/lib/blog/posts";

import { BlogCard } from "./_components/blog-card";
import styles from "./blog.module.css";

export const metadata = blogPageMetadata;

export default function BlogIndexPage() {
  const posts = getAllPosts();

  return (
    <section
      className={styles.container}
      data-testid="blog-index"
      data-section="blog-index"
    >
      <JsonLd data={createBlogIndexJsonLd(posts)} />
      <JsonLd data={blogPageBreadcrumbJsonLd} />

      <header className={styles.header} data-testid="blog-index-header">
        <span className={styles.eyebrow}>QA Playground Blog</span>
        <h1 className={styles.title}>Automation testing, written down</h1>
        <p className={styles.subtitle}>
          Practical guides and tutorials for Selenium, Playwright, and Cypress —
          built to pair with the hands-on practice elements on this site.
        </p>
      </header>

      {posts.length > 0 ? (
        <div className={styles.grid} data-testid="blog-post-grid">
          {posts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      ) : (
        <div className={styles.empty} data-testid="blog-empty-state">
          <p className={styles.emptyTitle}>No posts yet</p>
          <p className={styles.emptyBody}>
            Add a Markdown file to <code>blogs/</code> to publish your first
            post.
          </p>
        </div>
      )}
    </section>
  );
}
