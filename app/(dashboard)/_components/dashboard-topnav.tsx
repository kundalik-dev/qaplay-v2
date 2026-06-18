import Link from "next/link";
import type { LucideIcon } from "lucide-react";

import styles from "./dashboard.module.css";

interface Crumb {
  label: string;
  href?: string;
  icon?: LucideIcon;
}

interface DashboardTopNavProps {
  /** Breadcrumb trail. Last item is the current page (no link). */
  breadcrumbs?: Crumb[];
  /** Optional slot rendered on the right side of the topnav. */
  actions?: React.ReactNode;
}

export function DashboardTopNav({ breadcrumbs = [], actions }: DashboardTopNavProps) {
  return (
    <header className={styles.topNav} data-testid="dashboard-topnav">
      <div className={styles.topNavLeft}>
        {breadcrumbs.length > 0 && (
          <nav aria-label="Breadcrumb" className={styles.breadcrumb}>
            {breadcrumbs.map((crumb, i) => {
              const isLast = i === breadcrumbs.length - 1;
              const Icon = crumb.icon;

              return (
                <span key={crumb.label} className={styles.breadcrumb} style={{ display: "contents" }}>
                  {i > 0 && (
                    <span className={styles.breadcrumbSep} aria-hidden="true">
                      /
                    </span>
                  )}
                  {isLast || !crumb.href ? (
                    <span
                      className={styles.breadcrumbCurrent}
                      aria-current={isLast ? "page" : undefined}
                    >
                      {Icon && <Icon size={14} aria-hidden="true" style={{ marginRight: 4, verticalAlign: "middle" }} />}
                      {crumb.label}
                    </span>
                  ) : (
                    <Link href={crumb.href} className={styles.breadcrumb}>
                      {Icon && <Icon size={14} aria-hidden="true" style={{ marginRight: 4, verticalAlign: "middle" }} />}
                      {crumb.label}
                    </Link>
                  )}
                </span>
              );
            })}
          </nav>
        )}
      </div>

      {actions && (
        <div className={styles.topNavRight} data-testid="topnav-actions">
          {actions}
        </div>
      )}
    </header>
  );
}
