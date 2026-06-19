"use client";

import { useMemo, useState } from "react";

import type { ChromeExtension } from "@/data/chrome/types";

import { ChromeExtensionCard } from "./chrome-extension-card";
import styles from "./chrome-extensions.module.css";

const ALL_FILTER = "all";

function toCat(label: string): string {
  return label
    .toLowerCase()
    .replaceAll(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

interface ChromeExtensionsWallProps {
  extensions: ChromeExtension[];
  title: string;
  description: string;
}

export function ChromeExtensionsWall({
  extensions,
  title,
}: ChromeExtensionsWallProps) {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>(ALL_FILTER);
  const [sort, setSort] = useState<"featured" | "az">("featured");

  const categories = useMemo(() => {
    const seen = new Map<string, number>();
    for (const ext of extensions) {
      seen.set(ext.category, (seen.get(ext.category) ?? 0) + 1);
    }
    return Array.from(seen, ([label, count]) => ({
      label,
      cat: toCat(label),
      count,
    }));
  }, [extensions]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let result = extensions.filter((ext) => {
      const matchesCategory =
        activeCategory === ALL_FILTER || toCat(ext.category) === activeCategory;
      if (!matchesCategory) return false;
      if (!q) return true;
      return (
        ext.name.toLowerCase().includes(q) ||
        ext.tagline.toLowerCase().includes(q) ||
        ext.description.toLowerCase().includes(q) ||
        ext.category.toLowerCase().includes(q) ||
        ext.tags.some((tag) => tag.toLowerCase().includes(q))
      );
    });
    if (sort === "az") {
      result = [...result].sort((a, b) => a.name.localeCompare(b.name));
    }
    return result;
  }, [extensions, query, activeCategory, sort]);

  return (
    <div
      className={styles.page}
      data-testid="chrome-page"
      data-section="chrome-extensions"
    >
      {/* Top bar */}
      <div className={styles.topBar} data-testid="chrome-hero">
        <div className={styles.titleGroup}>
          <h1 className={styles.title}>{title}</h1>
          <span className={styles.countBadge} data-testid="chrome-count">
            {extensions.length} extensions
          </span>
        </div>
      </div>

      {/* Filters bar */}
      <div className={styles.filtersBar} data-testid="chrome-toolbar">
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
            className={styles.searchInput}
            placeholder="Search extensions by name, tag, or use case..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search Chrome extensions"
            data-testid="chrome-search-input"
          />
        </div>

        <select
          className={styles.filterSelect}
          value={activeCategory}
          onChange={(e) => setActiveCategory(e.target.value)}
          aria-label="Filter by category"
          id="chrome-category-filter"
          data-testid="chrome-category-filter"
        >
          <option value={ALL_FILTER}>
            All Categories ({extensions.length})
          </option>
          {categories.map(({ label, cat, count }) => (
            <option key={cat} value={cat}>
              {label} ({count})
            </option>
          ))}
        </select>

        <select
          className={styles.filterSelect}
          value={sort}
          onChange={(e) => setSort(e.target.value as "featured" | "az")}
          aria-label="Sort extensions"
          data-testid="chrome-sort"
        >
          <option value="featured">Featured first</option>
          <option value="az">A to Z</option>
        </select>
      </div>

      {/* Grid */}
      <section
        className={styles.gridSection}
        data-testid="chrome-grid"
        aria-label="Chrome extensions for QA"
      >
        <div className={styles.grid} role="list">
          {filtered.length > 0 ? (
            filtered.map((extension) => (
              <div key={extension.id} role="listitem">
                <ChromeExtensionCard extension={extension} />
              </div>
            ))
          ) : (
            <div className={styles.emptyState} data-testid="chrome-no-results">
              <p className={styles.emptyTitle}>No extensions found</p>
              <p className={styles.emptyBody}>
                Try a different keyword or category.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
