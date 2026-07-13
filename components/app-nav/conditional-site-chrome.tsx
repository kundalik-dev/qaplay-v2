"use client";

import { usePathname } from "next/navigation";

import { AppFooter } from "./footer";
import { AppNavbar } from "./nav";

/**
 * Routes that belong to the dashboard group.
 * The navbar and footer are hidden on these paths.
 */
const DASHBOARD_PREFIXES = [
  "/dashboard",
  "/settings",
  "/interview-practice",
  "/qa-tools",
  "/challenges",
  "/job-crm",
  "/interview-questions",
  "/mock-interview",
  "/resources",
  "/chrome",
  "/demo/bank",
  "/bank",
];

function isDashboardRoute(pathname: string): boolean {
  return DASHBOARD_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(prefix + "/"),
  );
}

export function ConditionalSiteChrome() {
  const pathname = usePathname();

  if (isDashboardRoute(pathname)) return null;

  return (
    <>
      <AppNavbar />
    </>
  );
}

export function ConditionalSiteFooter() {
  const pathname = usePathname();

  if (isDashboardRoute(pathname)) return null;

  return <AppFooter />;
}
