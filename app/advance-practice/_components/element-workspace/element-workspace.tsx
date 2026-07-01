"use client";

import { useState } from "react";
import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { BookOpen, ChevronRight, FlaskConical, ListChecks } from "lucide-react";

import { cn } from "@/lib/utils";
import type { ElementLevel, ElementMeta } from "@/data/advance-practice/types";

import styles from "./element-workspace.module.css";

type TabId = "practice" | "test-cases" | "learn";

const levelStyleMap: Record<ElementLevel, string> = {
  Beginner: styles.levelBeginner,
  Intermediate: styles.levelIntermediate,
  Advanced: styles.levelAdvanced,
};

interface ElementWorkspaceProps {
  meta: ElementMeta;
  practiceContent: ReactNode;
  testCasesContent: ReactNode;
  learnContent: ReactNode;
  testCaseCount?: number;
}

export function ElementWorkspace({
  meta,
  practiceContent,
  testCasesContent,
  learnContent,
  testCaseCount,
}: ElementWorkspaceProps) {
  const [active, setActive] = useState<TabId>("practice");

  const tabs: Array<{
    id: TabId;
    label: string;
    icon: typeof FlaskConical;
    count?: number;
  }> = [
    { id: "practice", label: "Practice", icon: FlaskConical },
    {
      id: "test-cases",
      label: "Test Cases",
      icon: ListChecks,
      count: testCaseCount,
    },
    { id: "learn", label: "Learn", icon: BookOpen },
  ];

  const content: Record<TabId, ReactNode> = {
    practice: practiceContent,
    "test-cases": testCasesContent,
    learn: learnContent,
  };

  return (
    <div
      className={styles.workspace}
      data-testid={`element-workspace-${meta.slug}`}
      data-section="element-workspace"
      data-element={meta.slug}
    >
      {/* ── Full-width header ─────────────────────────────────────────────── */}
      <header className={styles.header} data-testid="workspace-header">
        <div className={styles.titleRow}>
          <h1 className={styles.title}>{meta.title}</h1>
          <span
            className={cn(styles.levelBadge, levelStyleMap[meta.level])}
            data-level={meta.level.toLowerCase()}
          >
            <span className={styles.levelDot} aria-hidden="true" />
            {meta.level}
          </span>
        </div>
        <p className={styles.description}>{meta.description}</p>
        {meta.tags && meta.tags.length > 0 && (
          <div className={styles.tagRow}>
            {meta.tags.map((tag) => (
              <span key={tag} className={styles.tag}>
                {tag}
              </span>
            ))}
          </div>
        )}
      </header>

      {/* ── Two-column body ───────────────────────────────────────────────── */}
      <div className={styles.body}>
        {/* Left sidebar */}
        <div className={styles.sidebar}>
          <nav
            className={styles.nav}
            data-testid="workspace-nav"
            aria-label={`${meta.title} sections`}
          >
            <span className={styles.navHeading}>Sections</span>
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = active === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  className={cn(
                    styles.navItem,
                    isActive && styles.navItemActive,
                  )}
                  data-testid={`workspace-tab-${tab.id}`}
                  data-active={isActive ? "true" : undefined}
                  aria-current={isActive ? "true" : undefined}
                  onClick={() => setActive(tab.id)}
                >
                  <Icon className={styles.navIcon} aria-hidden="true" />
                  <span className={styles.navLabel}>{tab.label}</span>
                  {typeof tab.count === "number" && (
                    <span className={styles.navCount}>{tab.count}</span>
                  )}
                </button>
              );
            })}
          </nav>

          {meta.upNext && (
            <Link
              href={meta.upNext.href}
              className={styles.upNextCard}
              data-testid="workspace-up-next"
            >
              <span className={styles.upNextLabel}>Up Next</span>
              <div className={styles.upNextBody}>
                <div className={styles.upNextIcon}>
                  <Image
                    src={meta.upNext.iconSrc}
                    alt={meta.upNext.iconAlt}
                    width={28}
                    height={28}
                  />
                </div>
                <div className={styles.upNextText}>
                  <span className={styles.upNextTitle}>
                    {meta.upNext.title}
                  </span>
                  <span className={styles.upNextDesc}>
                    {meta.upNext.description}
                  </span>
                </div>
                <ChevronRight
                  className={styles.upNextChevron}
                  aria-hidden="true"
                />
              </div>
            </Link>
          )}
        </div>

        {/* Right content panel */}
        <section
          className={cn(
            styles.panel,
            (active === "practice" || active === "test-cases") &&
              styles.panelFlush,
          )}
          data-testid={`workspace-panel-${active}`}
          aria-label={`${active} content`}
        >
          <div className={styles.panelInner}>{content[active]}</div>
        </section>
      </div>
    </div>
  );
}
