"use client";

/**
 * SiteChrome
 *
 * Client wrapper that sits at the root layout level and decides which
 * chrome to render:
 *
 *  - Marketing routes → AppNavbar + <main> + AppFooter
 *  - Dashboard routes → bare children (the (dashboard) layout adds its own
 *    sidebar + topnav shell)
 *
 * Adding a new dashboard route: extend DASHBOARD_PREFIXES below.
 */

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";

import { AppFooter, AppNavbar } from "@/components/app-nav";

/**
 * URL prefixes that belong to the dashboard shell.
 * Everything else gets the marketing navbar + footer.
 */
const DASHBOARD_PREFIXES = [
  "/dashboard",
  "/interview-practice",
  "/qa-tools",
  "/challenges",
  "/job-crm",
  "/interview-questions",
];

interface SiteChromeProps {
  children: ReactNode;
}

export function SiteChrome({ children }: SiteChromeProps) {
  const pathname = usePathname();

  const isDashboard = DASHBOARD_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(prefix + "/"),
  );

  if (isDashboard) {
    // Dashboard layout handles its own shell — render nothing extra.
    return <>{children}</>;
  }

  return (
    <>
      <AppNavbar />
      <main id="main-content">{children}</main>
      <AppFooter />
    </>
  );
}
