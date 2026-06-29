"use client";

import { useState } from "react";
import type { ReactNode } from "react";
import { BookOpen, FlaskConical, ListChecks } from "lucide-react";

import { cn } from "@/lib/utils";
import type { ElementLevel, ElementMeta } from "@/data/new-practice/types";

import styles from "./element-workspace.module.css";

type TabId = "practice" | "test-cases" | "learn";

const levelStyleMap: Record<ElementLevel, string> = {
  Beginner: styles.levelBeginner,
  Intermediate: styles.levelIntermediate,
  Advanced: styles.levelAdvanced,
};

interface ElementWorkspaceProps {
  meta: ElementMeta;
  /** Custom practice UI (route-specific HTML/CSS). */
  practiceContent: ReactNode;
  /** Reusable test-cases view. */
  testCasesContent: ReactNode;
  /** Reusable learn view. */
  learnContent: ReactNode;
  /** Count shown on the Test Cases nav item. */
  testCaseCount?: number;
}

/**
 * ElementWorkspace — dashboard-style shell for a single practice element.
 * Left vertical nav switches the right-hand content between the three tabs.
 * Tab contents are passed in as ReactNodes (composition) so this client
 * component never imports server components directly.
 */
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
      {/* ── Left nav ──────────────────────────────────────────────── */}
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

      {/* ── Right content area ────────────────────────────────────── */}
      <div className={styles.main}>
        <header className={styles.header} data-testid="workspace-header">
          <div className={styles.headingGroup}>
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
          </div>
        </header>

        <section
          className={styles.panel}
          data-testid={`workspace-panel-${active}`}
          aria-label={`${active} content`}
        >
          <div className={styles.panelInner}>{content[active]}</div>
        </section>
      </div>
    </div>
  );
}
