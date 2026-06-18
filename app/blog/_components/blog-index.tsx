"use client";

import { useMemo, useState } from "react";

import type { BlogPostSummary } from "@/lib/blog/types";

import { BlogCard } from "./blog-card";
import styles from "./blog-index.module.css";

interface BlogIndexProps {
  posts: BlogPostSummary[];
}

type SortOrder = "newest" | "oldest";

const INITIAL_SHOW = 10;
const LOAD_MORE_COUNT = 10;

/** Normalize a category string: lowercase → display label */
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

/** Extract and sort unique categories from all posts */
function extractCategories(posts: BlogPostSummary[]): string[] {
  const seen = new Set<string>();
  for (const post of posts) {
    for (const cat of post.frontmatter.category ?? []) {
      seen.add(cat.toLowerCase());
    }
  }
  return Array.from(seen).sort();
}

export function BlogIndex({ posts }: BlogIndexProps) {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [sort, setSort] = useState<SortOrder>("newest");
  const [showCount, setShowCount] = useState(INITIAL_SHOW);

  const categories = useMemo(() => extractCategories(posts), [posts]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();

    let result = posts.filter((post) => {
      const matchesSearch =
        !q ||
        post.frontmatter.title.toLowerCase().includes(q) ||
        post.frontmatter.description.toLowerCase().includes(q);

      const matchesCategory =
        activeCategory === "all" ||
        (post.frontmatter.category ?? []).some(
          (c) => c.toLowerCase() === activeCategory,
        );

      return matchesSearch && matchesCategory;
    });

    if (sort === "oldest") {
      result = [...result].sort(
        (a, b) =>
          new Date(a.frontmatter.date).getTime() -
          new Date(b.frontmatter.date).getTime(),
      );
    }
    // Default is newest — getAllPosts already returns newest-first

    return result;
  }, [posts, search, activeCategory, sort]);

  // Reset show count when filters change
  const visible = filtered.slice(0, showCount);
  const hasMore = filtered.length > showCount;

  function handleCategoryChange(cat: string) {
    setActiveCategory(cat);
    setShowCount(INITIAL_SHOW);
  }

  function handleSearchChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearch(e.target.value);
    setShowCount(INITIAL_SHOW);
  }

  return (
    <div data-testid="blog-index-interactive">
      {/* ── Controls bar ─────────────────────────────────────────────── */}
      <div className={styles.controls} data-testid="blog-controls">
        {/* Search */}
        <div className={styles.searchWrap}>
          <svg
            className={styles.searchIcon}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M9 3.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11ZM2 9a7 7 0 1 1 12.452 4.391l3.328 3.329a.75.75 0 1 1-1.06 1.06l-3.329-3.328A7 7 0 0 1 2 9Z"
              clipRule="evenodd"
            />
          </svg>
          <input
            type="search"
            className={styles.search}
            placeholder="Search articles..."
            value={search}
            onChange={handleSearchChange}
            data-testid="blog-search"
            aria-label="Search articles"
          />
        </div>

        {/* Pills + Sort row */}
        <div className={styles.filterRow}>
          <div
            className={styles.pills}
            role="group"
            aria-label="Filter by category"
          >
            <button
              type="button"
              className={styles.pill}
              data-active={activeCategory === "all"}
              data-cat="all"
              onClick={() => handleCategoryChange("all")}
              data-testid="blog-filter-all"
            >
              All
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                className={styles.pill}
                data-active={activeCategory === cat}
                data-cat={cat}
                onClick={() => handleCategoryChange(cat)}
                data-testid={`blog-filter-${cat}`}
              >
                {toLabel(cat)}
              </button>
            ))}
          </div>

          <select
            className={styles.sort}
            value={sort}
            onChange={(e) => setSort(e.target.value as SortOrder)}
            aria-label="Sort posts"
            data-testid="blog-sort"
          >
            <option value="newest">Newest first</option>
            <option value="oldest">Oldest first</option>
          </select>
        </div>

        {/* Result count */}
        <p className={styles.count} data-testid="blog-count">
          Showing {Math.min(showCount, filtered.length)} of {filtered.length}{" "}
          {filtered.length === 1 ? "post" : "posts"}
        </p>
      </div>

      {/* ── Grid ─────────────────────────────────────────────────────── */}
      {filtered.length > 0 ? (
        <>
          <div className={styles.grid} data-testid="blog-post-grid">
            {visible.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>

          {hasMore && (
            <div className={styles.loadMoreWrap}>
              <button
                type="button"
                className={styles.loadMore}
                onClick={() => setShowCount((n) => n + LOAD_MORE_COUNT)}
                data-testid="blog-load-more"
              >
                Load more posts
              </button>
            </div>
          )}
        </>
      ) : (
        <div className={styles.empty} data-testid="blog-empty-state">
          <p className={styles.emptyTitle}>No posts found</p>
          <p className={styles.emptyBody}>
            Try a different search term or category.
          </p>
        </div>
      )}
    </div>
  );
}
