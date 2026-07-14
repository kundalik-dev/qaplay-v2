"use client";

import { useState } from "react";
import type { ReactNode } from "react";

import { UiPracticeSidebar } from "./ui-practice-sidebar";
import { UiPracticeTopBar } from "./ui-practice-topbar";
import styles from "./ui-practice.module.css";
import { cn } from "@/lib/utils";

interface UiPracticeShellProps {
  children: ReactNode;
}

/**
 * UiPracticeShell - client component that owns the sidebar collapse state.
 *
 * Keeping state here (rather than in layout.tsx) lets layout.tsx stay a
 * Server Component while only this thin wrapper is a Client Component.
 * The global QA Playground top nav is hidden for this route via
 * components/app-nav/conditional-site-chrome.tsx (see DASHBOARD_PREFIXES).
 *
 * UiPracticeTopBar renders once here (not per-page) as a sibling of
 * <main>, same placement as app/(dashboard)/_components/dashboard-shell.tsx.
 * Because it sits above <main> in this flex-column container rather than
 * scrolling with the content, it stays visually "fixed at the top" with
 * no extra positioning/offset needed.
 */
export function UiPracticeShell({ children }: UiPracticeShellProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className={styles.shell} data-testid="ui-practice-shell">
      <UiPracticeSidebar
        isCollapsed={isCollapsed}
        onToggle={() => setIsCollapsed((prev) => !prev)}
      />

      <div className={cn(styles.content)} data-testid="ui-practice-content">
        <UiPracticeTopBar />

        <main
          id="ui-practice-main-content"
          className={styles.main}
          data-testid="ui-practice-main"
        >
          {children}
        </main>
      </div>
    </div>
  );
}
