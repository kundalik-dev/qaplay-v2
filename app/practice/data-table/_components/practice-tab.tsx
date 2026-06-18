"use client";

import { FrameworkMethodsPanel, UpNextCard } from "@/components/practice";
import { frameworkMethods } from "@/data/practice-data/data-table/scenarios";
import type { PracticePageMeta } from "@/data/practice-data/types";
import { BookDataTable } from "./book-data-table";
import styles from "./data-table.module.css";

interface PracticeTabProps {
  upNext: PracticePageMeta["upNext"];
}

export function PracticeTab({ upNext }: PracticeTabProps) {
  return (
    <div
      className="mx-auto w-full max-w-[1280px] px-4 sm:px-7"
      data-testid="practice-tab"
      data-section="practice"
    >
      <div className={styles.practiceLayout}>
        {/* ── Left: table practice element ─────────────────────────────── */}
        <section aria-label="Data Table Practice Scenarios">
          <p className="mb-3 text-[10.5px] font-bold tracking-[0.08em] text-muted-foreground uppercase">
            Interactive Table
          </p>
          <BookDataTable />
        </section>

        {/* ── Right: sticky sidebar ─────────────────────────────────────── */}
        <aside className={styles.practiceSidebar} data-testid="practice-sidebar">
          <FrameworkMethodsPanel methods={frameworkMethods} />
          <UpNextCard {...upNext} />
        </aside>
      </div>
    </div>
  );
}
