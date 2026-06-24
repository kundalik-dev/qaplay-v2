import type { ReactNode } from "react";

import { DashboardShell } from "./_components/dashboard-shell";
import { DashboardTopNav } from "./_components/dashboard-topnav";
import { NavThemeToggle } from "@/components/app-nav/nav/nav-theme-toggle";

/**
 * Dashboard group layout.
 *
 * Applies to: /dashboard, /interview-practice, /qa-tools,
 *             /challenges, /job-crm, /interview-questions
 *
 * Renders a fixed left sidebar + scrollable main area.
 * The DashboardShell client component owns the collapse toggle state.
 * The top nav is passed as a ReactNode so individual pages can eventually
 * override breadcrumbs via their own wrappers.
 */
export default function DashboardLayout({ children }: { children: ReactNode }) {
  const topNav = (
    <DashboardTopNav
      actions={
        <>
          <NavThemeToggle />
        </>
      }
    />
  );

  return <DashboardShell topNav={topNav}>{children}</DashboardShell>;
}
