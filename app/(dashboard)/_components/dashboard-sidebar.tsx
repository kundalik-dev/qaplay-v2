"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PanelLeft } from "lucide-react";

import { dashboardNavGroups } from "@/data/dashboard-nav-data";
import { UserProfileCard } from "./user-profile-card";
import styles from "./dashboard.module.css";

interface DashboardSidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

export function DashboardSidebar({ isCollapsed, onToggle }: DashboardSidebarProps) {
  const pathname = usePathname();

  function isActive(href: string) {
    return pathname === href || pathname.startsWith(href + "/");
  }

  return (
    <aside
      className={`${styles.sidebar} ${isCollapsed ? styles.sidebarCollapsed : ""}`}
      data-testid="dashboard-sidebar"
      data-collapsed={isCollapsed}
      aria-label="Dashboard navigation"
    >
      {/* ── Header ─────────────────────────────────────────────── */}
      <div className={styles.sidebarHeader} data-testid="sidebar-header">
        {!isCollapsed && (
          <Link href="/" className={styles.sidebarBrand} data-testid="sidebar-brand">
            <Image
              src="/logo/logo.svg"
              alt="QA Playground"
              width={32}
              height={32}
              className={styles.sidebarBrandIcon}
              priority
            />
            <span className={styles.sidebarBrandName}>QA Playground</span>
          </Link>
        )}

        <button
          className={styles.sidebarToggle}
          onClick={onToggle}
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          data-testid="sidebar-toggle"
          title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          <PanelLeft size={16} aria-hidden="true" />
        </button>
      </div>

      {/* ── Navigation ─────────────────────────────────────────── */}
      <nav className={styles.sidebarNav} data-testid="sidebar-nav" aria-label="Main navigation">
        {dashboardNavGroups.map((group) => (
          <div key={group.label} className={styles.navGroup} data-testid={`nav-group-${group.label.toLowerCase().replace(/\s+/g, "-")}`}>
            {!isCollapsed && (
              <span className={styles.navGroupLabel}>{group.label}</span>
            )}

            <div className={styles.navSection}>
              {group.items.map((item) => {
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
          </div>
        ))}
      </nav>

      {/* ── Footer — user profile ───────────────────────────────── */}
      <div className={styles.sidebarFooter} data-testid="sidebar-footer">
        <UserProfileCard isCollapsed={isCollapsed} />
      </div>
    </aside>
  );
}
