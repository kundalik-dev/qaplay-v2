"use client";

import { useMemo, useState } from "react";

import type { NewPracticeCard } from "@/data/new-practice/new-practice-cards-data";

import { NewPracticeElementCard } from "./new-practice-card";
import styles from "./new-practice-grid.module.css";

interface NewPracticeGridProps {
  cards: NewPracticeCard[];
}

export function NewPracticeGrid({ cards }: NewPracticeGridProps) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return cards;
    return cards.filter(
      (c) =>
        c.title.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q) ||
        c.tag.toLowerCase().includes(q) ||
        c.level.toLowerCase().includes(q),
    );
  }, [cards, query]);

  return (
    <div data-testid="new-practice-grid-wrap">
      {/* ── Search ─────────────────────────────────────────────────────── */}
      <div className={styles.searchWrap}>
        <div className={styles.searchBox}>
          <svg
            className={styles.searchIcon}
            width={16}
            height={16}
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
            placeholder="Search playgrounds..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search playgrounds"
            data-testid="new-practice-search-input"
          />
        </div>
      </div>

      {/* ── Grid ───────────────────────────────────────────────────────── */}
      <section
        className={styles.grid}
        data-testid="new-practice-grid"
        data-section="new-practice-elements"
        aria-label="Practice playground grid"
        role="list"
      >
        {filtered.length > 0 ? (
          filtered.map((card) => (
            <div key={card.testId ?? card.title} role="listitem">
              <NewPracticeElementCard card={card} />
            </div>
          ))
        ) : (
          <div
            className={styles.emptyState}
            data-testid="new-practice-no-results"
          >
            <p className={styles.emptyTitle}>No playgrounds found</p>
            <p className={styles.emptyBody}>
              Try a different keyword — e.g. &ldquo;alert&rdquo;,
              &ldquo;network&rdquo;, or &ldquo;beginner&rdquo;.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
