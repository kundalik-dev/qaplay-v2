"use client";

import { useMemo, useState } from "react";

import type { PracticeCard } from "@/data/practice-data/practice-elements-data";

import { PracticeElementCard } from "./practice-card";
import styles from "./practice-page.module.css";

interface PracticeGridProps {
  cards: PracticeCard[];
}

export function PracticeGrid({ cards }: PracticeGridProps) {
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
    <>
      {/* ── Hero / Header ────────────────────────────────────────────────── */}
      <div className={styles.hero} data-testid="practice-hero">
        <div className={styles.heroInner}>
          <div className={styles.heroText}>
            <span className={styles.eyebrow}>Practice Elements</span>
            <h1 className={styles.title}>Practice Elements</h1>
            <p className={styles.subtitle}>
              Search, scan, and open the exact interaction you want to practice.
            </p>
          </div>

          {/* ── Search ─────────────────────────────────────────────────── */}
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
                placeholder="Search practice elements..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                aria-label="Search practice elements"
                data-testid="practice-search-input"
              />
            </div>
          </div>
        </div>
      </div>

      {/* ── Grid ─────────────────────────────────────────────────────────── */}
      <section
        className={styles.gridSection}
        data-testid="practice-grid"
        data-section="practice-elements"
        aria-label="Practice elements grid"
      >
        <div className={styles.grid} role="list">
          {filtered.length > 0 ? (
            filtered.map((card) => (
              <div key={card.testId ?? card.title} role="listitem">
                <PracticeElementCard card={card} />
              </div>
            ))
          ) : (
            <div
              className={styles.emptyState}
              data-testid="practice-no-results"
            >
              <p className={styles.emptyTitle}>No elements found</p>
              <p className={styles.emptyBody}>
                Try a different keyword — e.g. &ldquo;form&rdquo;,
                &ldquo;table&rdquo;, or &ldquo;beginner&rdquo;.
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
