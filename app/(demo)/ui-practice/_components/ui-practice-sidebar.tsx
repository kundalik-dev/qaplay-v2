"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { PanelLeft } from "lucide-react";

import { uiPracticeNavItems } from "@/data/ui-practice-nav-data";
import styles from "./ui-practice.module.css";

interface UiPracticeSidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

export function UiPracticeSidebar({
  isCollapsed,
  onToggle,
}: UiPracticeSidebarProps) {
  const pathname = usePathname();

  function isActive(href: string) {
    return pathname === href || pathname.startsWith(href + "/");
  }

  return (
    <aside
      className={`${styles.sidebar} ${isCollapsed ? styles.sidebarCollapsed : ""}`}
      data-testid="ui-practice-sidebar"
      data-collapsed={isCollapsed}
      aria-label="UI Practice navigation"
    >
      {/* ── Header ─────────────────────────────────────────────── */}
      <div className={styles.sidebarHeader} data-testid="ui-practice-sidebar-header">
        {!isCollapsed && (
          <Link
            href="/ui-practice"
            className={styles.sidebarBrand}
            data-testid="ui-practice-sidebar-brand"
          >
            <span className={styles.sidebarBrandName}>UI Practice</span>
          </Link>
        )}

        <button
          type="button"
          className={styles.sidebarToggle}
          onClick={onToggle}
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          data-testid="ui-practice-sidebar-toggle"
          title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          <PanelLeft size={16} aria-hidden="true" />
        </button>
      </div>

      {/* ── Navigation ─────────────────────────────────────────── */}
      <nav
        className={styles.sidebarNav}
        data-testid="ui-practice-sidebar-nav"
        aria-label="UI Practice sections"
      >
        <div className={styles.navSection}>
          {uiPracticeNavItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`${styles.navItem} ${active ? styles.navItemActive : ""}`}
                data-testid={item.testId}
                title={isCollapsed ? item.label : undefined}
                aria-current={active ? "page" : undefined}
              >
                <Icon className={styles.navIcon} aria-hidden="true" />
                <span className={styles.navLabel}>{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </aside>
  );
}
