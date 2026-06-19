/**
 * Auth route group layout.
 * Mobile: single centred column.
 * Desktop (≥ 900 px): split panel — decorative left, form right.
 */
import type { ReactNode } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import styles from "./auth.module.css";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className={styles["auth-layout"]}>
      {/* ── Left panel (desktop only) ── */}
      <aside className={styles["auth-panel"]} aria-hidden="true">
        <div className={styles["auth-panel__inner"]}>
          {/* Brand */}
          <Link href="/" className={styles["auth-panel__brand"]}>
            <span className={styles["auth-panel__dot"]} />
            QA Playground
          </Link>

          {/* Tagline */}
          <div className={styles["auth-panel__copy"]}>
            <h2 className={styles["auth-panel__headline"]}>
              Practice automation on real UI
            </h2>
            <p className={styles["auth-panel__sub"]}>
              Forms, tables, dropdowns, drag &amp; drop — every element
              you need to sharpen your Playwright, Selenium, and Cypress skills.
            </p>
          </div>

          {/* Feature list */}
          <ul className={styles["auth-panel__features"]} role="list">
            {[
              "Real-world UI components",
              "Stable test-automation selectors",
              "Playwright · Selenium · Cypress",
              "Dark &amp; light theme support",
            ].map((f) => (
              <li key={f} className={styles["auth-panel__feature"]}>
                <span className={styles["auth-panel__check"]} aria-hidden="true">✓</span>
                <span dangerouslySetInnerHTML={{ __html: f }} />
              </li>
            ))}
          </ul>

          {/* Decorative orbs */}
          <div className={styles["auth-panel__orb1"]} aria-hidden="true" />
          <div className={styles["auth-panel__orb2"]} aria-hidden="true" />
        </div>
      </aside>

      {/* ── Right panel — form ── */}
      <main className={styles["auth-layout__main"]}>{children}</main>
    </div>
  );
}
