import { Suspense } from "react";

import type { QaTool } from "@/data/qa-tools/types";

import { ToolCard } from "./tool-card";
import { ToolsFilterBar } from "./tools-filter-bar";
import styles from "./qa-tools.module.css";

interface ToolsWallProps {
  allTools: QaTool[];
  filteredTools: QaTool[];
}

export function ToolsWall({ allTools, filteredTools }: ToolsWallProps) {
  return (
    <div
      className={styles.page}
      data-testid="qa-tools-page"
      data-section="qa-tools"
    >
      {/* Top bar */}
      <div className={styles.topBar} data-testid="qa-tools-topbar">
        <div className={styles.titleGroup}>
          <h1 className={styles.title}>QA Tools</h1>
          <span className={styles.countBadge} data-testid="qa-tools-count">
            {allTools.length} tools
          </span>
        </div>
      </div>

      {/* Filter bar — client component wrapped in Suspense for searchParams */}
      <Suspense fallback={<div className={styles.filtersBar} />}>
        <ToolsFilterBar
          totalCount={allTools.length}
          filteredCount={filteredTools.length}
        />
      </Suspense>

      {/* Grid */}
      <section
        className={styles.gridSection}
        data-testid="qa-tools-grid-section"
        aria-label="QA tools"
      >
        <div
          className={styles.grid}
          role="list"
          id="qa-tools-grid"
          data-testid="qa-tools-grid"
        >
          {filteredTools.length > 0 ? (
            filteredTools.map((tool) => (
              <div key={tool.slug} role="listitem">
                <ToolCard tool={tool} />
              </div>
            ))
          ) : (
            <div
              className={styles.emptyState}
              data-testid="qa-tools-empty"
              data-section="qa-tools-empty"
            >
              <p className={styles.emptyTitle}>No tools found</p>
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
