import type { Metadata } from "next";
import { LibraryBig } from "lucide-react";

import styles from "../_components/dashboard.module.css";

export const metadata: Metadata = {
  title: "Resources | QA Playground",
  description:
    "Curated QA resources — guides, cheatsheets, tools, and references to level up your testing skills.",
  openGraph: {
    title: "Resources | QA Playground",
    description:
      "Curated QA resources — guides, cheatsheets, tools, and references to level up your testing skills.",
    url: "https://qaplayground.dev/resources",
    siteName: "QA Playground",
    type: "website",
  },
};

export default function ResourcesPage() {
  return (
    <div className={styles.placeholderPage} data-testid="resources-page">
      <LibraryBig className={styles.placeholderIcon} aria-hidden="true" />
      <h1 className={styles.placeholderTitle}>Resources</h1>
      <p className={styles.placeholderDesc}>
        Curated guides, cheatsheets, and references for QA engineers — Playwright,
        Selenium, Cypress, API testing, and more.
      </p>
      <span className={styles.comingSoonBadge}>Coming soon</span>
    </div>
  );
}
