"use client";

import { useMemo, useState } from "react";

import { cn } from "@/lib/utils";
import type { ChromeExtension } from "@/data/chrome/types";

import { ChromeExtensionCard } from "./chrome-extension-card";
import styles from "./chrome-extensions.module.css";

const ALL_FILTER = "All";

interface ChromeExtensionsWallProps {
  extensions: ChromeExtension[];
  eyebrow: string;
  title: string;
  description: string;
}

export function ChromeExtensionsWall({
  extensions,
  eyebrow,
  title,
  description,
}: ChromeExtensionsWallProps) {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>(ALL_FILTER);

  // Derive filters from the data so new categories appear automatically as
  // the catalog grows. Each filter carries its count.
  const filters = useMemo(() => {
    const counts = new Map<string, number>();
    for (const ext of extensions) {
      counts.set(ext.category, (counts.get(ext.category) ?? 0) + 1);
    }
    return [
      { label: ALL_FILTER, count: extensions.length },
      ...Array.from(counts, ([label, count]) => ({ label, count })),
    ];
  }, [extensions]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return extensions.filter((ext) => {
      const matchesCategory =
        activeCategory === ALL_FILTER || ext.category === activeCategory;
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
  }, [extensions, query, activeCategory]);

  return (
    <>
      {/* ── Hero ── */}
      <header className={styles.hero} data-testid="chrome-hero">
        <span className={styles.eyebrow}>{eyebrow}</span>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.subtitle}>{description}</p>
      </header>

      {/* ── Toolbar: search + filters ── */}
      <div className={styles.toolbar} data-testid="chrome-toolbar">
        <div className={styles.searchBox}>
          <svg
            className={styles.searchIcon}
            width={18}
            height={18}
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <circle cx="7" cy="7" r="4.5" />
            <path d="M11 11l2.5 2.5" />
          </svg>
          <input
            type="search"
            className={styles.searchInput}
            placeholder="Search extensions by name, tag, or use case..."
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            aria-label="Search Chrome extensions"
            data-testid="chrome-search-input"
          />
        </div>

        <div
          className={styles.filters}
          role="group"
          aria-label="Filter by category"
          data-testid="chrome-filters"
        >
          {filters.map(({ label, count }) => {
            const isActive = activeCategory === label;
            return (
              <button
                key={label}
                type="button"
                className={cn(
                  styles.filterPill,
                  isActive && styles.filterPillActive,
                )}
                aria-pressed={isActive}
                onClick={() => setActiveCategory(label)}
                data-testid={`chrome-filter-${label
                  .toLowerCase()
                  .replaceAll(/[^a-z0-9]+/g, "-")
                  .replace(/^-|-$/g, "")}`}
              >
                {label}
                <span className={styles.filterCount}>{count}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Grid ── */}
      <section
        className={styles.gridSection}
        data-testid="chrome-grid"
        data-section="chrome-extensions"
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
                Try a different keyword or category — e.g.
                &ldquo;accessibility&rdquo;, &ldquo;api&rdquo;, or
                &ldquo;automation&rdquo;.
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
