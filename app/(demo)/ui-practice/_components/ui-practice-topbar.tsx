"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { NavThemeToggle } from "@/components/app-nav/nav/nav-theme-toggle";
import { uiPracticeNavItems } from "@/data/ui-practice-nav-data";
import { cn } from "@/lib/utils";
import styles from "./ui-practice.module.css";
import { Home } from "lucide-react";

type TabId = "practice" | "testcases" | "learn";

interface TabDef {
  id: TabId;
  label: string;
  /** appended to the section's base path, e.g. "/ui-practice/dialog" + suffix */
  suffix: "" | "/test-cases" | "/learn";
}

const TABS: TabDef[] = [
  { id: "practice", label: "Practice", suffix: "" },
  { id: "testcases", label: "Test Cases", suffix: "/test-cases" },
  { id: "learn", label: "Learn", suffix: "/learn" },
];

/**
 * Shared top bar for every /ui-practice/[section] page (and sub-routes).
 * Lives once in ui-practice-shell.tsx, above <main>, so it's common UI
 * that automatically reflects whichever section is currently active:
 *
 * - Left: "ui-practice / {section label}" breadcrumb, derived from the
 *   current pathname + data/ui-practice-nav-data.ts (single source of
 *   truth for section labels - same file the sidebar reads from).
 * - Middle: Practice / Test Cases / Learn - real routes
 *   (/ui-practice/[section], [section]/test-cases, [section]/learn),
 *   not client-side tab state. Active tab is derived from the pathname,
 *   so this bar needs no shared state with the page it sits above.
 * - Right: the same NavThemeToggle used in the dashboard top nav.
 *
 * Sections that haven't built their test-cases/learn sub-routes yet
 * (e.g. tables) still get working links here - they fall through to
 * the existing app/(demo)/ui-practice/[...rest]/page.tsx catch-all
 * (scoped not-found, sidebar still visible) until those routes exist.
 */
export function UiPracticeTopBar() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean); // ["ui-practice", slug, subPath?]
  const slug = segments[1];
  const subPath = segments[2];

  const activeTab: TabId =
    subPath === "test-cases"
      ? "testcases"
      : subPath === "learn"
        ? "learn"
        : "practice";

  const navItem = uiPracticeNavItems.find(
    (item) => item.href === `/ui-practice/${slug}`,
  );
  const sectionLabel = navItem?.label ?? slug;
  const basePath = slug ? `/ui-practice/${slug}` : "/ui-practice";

  return (
    <header className={styles.topNav} data-testid="ui-practice-topbar">
      <div className={styles.topNavLeft}>
        <nav aria-label="Breadcrumb" className={styles.breadcrumb}>
          <Link
            href="/ui-practice"
            className={styles.breadcrumbLink}
            data-testid="ui-practice-breadcrumb-root"
          >
            ui-practice
          </Link>
          {slug && (
            <>
              <span className={styles.breadcrumbSep} aria-hidden="true">
                /
              </span>
              <span
                className={styles.breadcrumbCurrent}
                data-testid="ui-practice-breadcrumb-current"
              >
                {sectionLabel}
              </span>
            </>
          )}
        </nav>
      </div>

      {slug && (
        <nav
          className={styles.topNavTabs}
          role="tablist"
          aria-label={`${sectionLabel} sections`}
        >
          {TABS.map((tab) => {
            const href = `${basePath}${tab.suffix}`;
            const isActive = activeTab === tab.id;

            return (
              <Link
                key={tab.id}
                href={href}
                role="tab"
                aria-selected={isActive}
                data-testid={`ui-practice-tab-${tab.id}`}
                className={cn(
                  styles.topNavTabItem,
                  isActive && styles.topNavTabItemActive,
                )}
              >
                {tab.label}
              </Link>
            );
          })}
        </nav>
      )}

      <div
        className={styles.topNavRight}
        data-testid="ui-practice-topbar-actions"
      >
        <Link
          href="/"
          className={styles.topNavHomeLink}
          aria-label="Go to Home"
        >
          <Home size={18} />
          <span>Home</span>
        </Link>
        <NavThemeToggle />
      </div>
    </header>
  );
}
