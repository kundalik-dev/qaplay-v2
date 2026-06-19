"use client";

import { useCallback, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import {
  TOOL_CATEGORIES,
  TOOL_CATEGORY_LABELS,
} from "@/data/qa-tools/categories";

import styles from "./qa-tools.module.css";

interface ToolsFilterBarProps {
  totalCount: number;
  filteredCount: number;
}

export function ToolsFilterBar({
  totalCount,
  filteredCount,
}: ToolsFilterBarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [, startTransition] = useTransition();

  const q = searchParams.get("q") ?? "";
  const category = searchParams.get("category") ?? "";

  const updateParams = useCallback(
    (updates: Record<string, string>) => {
      const params = new URLSearchParams(searchParams.toString());
      for (const [key, value] of Object.entries(updates)) {
        if (value) {
          params.set(key, value);
        } else {
          params.delete(key);
        }
      }
      startTransition(() => {
        router.replace(`?${params.toString()}`, { scroll: false });
      });
    },
    [router, searchParams],
  );

  return (
    <div
      className={styles.filtersBar}
      data-testid="qa-tools-filters"
      data-section="qa-tools-filters"
    >
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
          className={styles.searchInput}
          placeholder="Search tools by name, tag, or category..."
          value={q}
          onChange={(e) => updateParams({ q: e.target.value })}
          aria-label="Search QA tools"
          id="qa-tools-search"
          data-testid="qa-tools-search-input"
        />
        {q && (
          <button
            className={styles.clearBtn}
            onClick={() => updateParams({ q: "" })}
            aria-label="Clear search"
            data-testid="qa-tools-search-clear"
          >
            <svg
              width={11}
              height={11}
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              aria-hidden="true"
            >
              <path d="M4 4l8 8M12 4l-8 8" />
            </svg>
          </button>
        )}
      </div>

      {/* Category filter */}
      <select
        className={styles.filterSelect}
        value={category}
        onChange={(e) => updateParams({ category: e.target.value })}
        aria-label="Filter by category"
        id="qa-tools-category-filter"
        data-testid="qa-tools-category-filter"
      >
        <option value="">All Categories ({totalCount})</option>
        {TOOL_CATEGORIES.map((cat) => (
          <option key={cat} value={cat}>
            {TOOL_CATEGORY_LABELS[cat]}
          </option>
        ))}
      </select>

      {/* Result count (only shown when filtering) */}
      {(q || category) && (
        <span
          className={styles.countBadge}
          style={{ marginLeft: "auto" }}
          data-testid="qa-tools-result-count"
        >
          {filteredCount} result{filteredCount !== 1 ? "s" : ""}
        </span>
      )}
    </div>
  );
}
