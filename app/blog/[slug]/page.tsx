import { notFound } from "next/navigation";

import { JsonLd } from "@/components/seo";
import {
  buildBlogPostBreadcrumbJsonLd,
  buildBlogPostJsonLd,
  buildBlogPostMetadata,
} from "@/data/meta-data/blog/blog-post-meta";
import { renderMarkdown } from "@/lib/blog/markdown";
import {
  getAllPostSlugs,
  getPostBySlug,
  getPreviousPost,
} from "@/lib/blog/posts";

import { PostArticle } from "./_components/post-article";
import styles from "./post.module.css";

// Only build the post slugs that exist; unknown slugs return a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata(props: PageProps<"/blog/[slug]">) {
  const { slug } = await props.params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return buildBlogPostMetadata(post);
}

export default async function BlogPostPage(props: PageProps<"/blog/[slug]">) {
  const { slug } = await props.params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const contentHtml = await renderMarkdown(post.content);
  const previousPost = getPreviousPost(slug);

  return (
    <section className={styles.wrapper}>
      <JsonLd data={buildBlogPostJsonLd(post)} />
      <JsonLd data={buildBlogPostBreadcrumbJsonLd(post)} />
      <PostArticle
        post={post}
        contentHtml={contentHtml}
        previousPost={previousPost}
      />
    </section>
  );
}
