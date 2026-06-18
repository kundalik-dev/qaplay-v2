"use client";

import { useState } from "react";
import type { ReactNode } from "react";

import { DashboardSidebar } from "./dashboard-sidebar";
import styles from "./dashboard.module.css";

interface DashboardShellProps {
  topNav: ReactNode;
  children: ReactNode;
}

/**
 * DashboardShell — client component that owns the sidebar collapse state.
 *
 * Keeping state here (rather than in layout.tsx) lets layout.tsx stay a
 * Server Component while only this thin wrapper is a Client Component.
 */
export function DashboardShell({ topNav, children }: DashboardShellProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className={styles.shell} data-testid="dashboard-shell">
      <DashboardSidebar
        isCollapsed={isCollapsed}
        onToggle={() => setIsCollapsed((prev) => !prev)}
      />

      <div className={styles.content} data-testid="dashboard-content">
        {topNav}
        <main
          id="main-content"
          className={styles.main}
          data-testid="dashboard-main"
        >
          {children}
        </main>
      </div>
    </div>
  );
}
