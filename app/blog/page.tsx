import { JsonLd } from "@/components/seo";
import { blogPageMetadata } from "@/data/meta-data/blog/blog-page-meta-data";
import {
  blogPageBreadcrumbJsonLd,
  createBlogIndexJsonLd,
} from "@/data/meta-data/blog/blog-structured-jsonld-data";
import { getAllPosts } from "@/lib/blog/posts";

import { BlogIndex } from "./_components/blog-index";
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
          Practical guides and tutorials for Selenium, Playwright, and Cypress.
        </p>
      </header>

      <BlogIndex posts={posts} />
    </section>
  );
}
