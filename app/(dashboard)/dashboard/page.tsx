import type { Metadata } from "next";
import { LayoutDashboard } from "lucide-react";

import styles from "../_components/dashboard.module.css";

export const metadata: Metadata = {
  title: "Dashboard | QA Playground",
  description:
    "Your QA Playground dashboard — track progress, view stats, and jump into practice sessions.",
  openGraph: {
    title: "Dashboard | QA Playground",
    description:
      "Your QA Playground dashboard — track progress, view stats, and jump into practice sessions.",
    url: "https://qaplayground.com/dashboard",
    siteName: "QA Playground",
    type: "website",
  },
};

export default function DashboardPage() {
  return (
    <div className={styles.placeholderPage} data-testid="page-dashboard">
      <LayoutDashboard className={styles.placeholderIcon} aria-hidden="true" />
      <h1 className={styles.placeholderTitle}>Dashboard</h1>
      <p className={styles.placeholderDesc}>
        Your command center — activity feed, practice stats, and quick access
        to all features will live here.
      </p>
      <span className={styles.comingSoonBadge}>Coming soon</span>
    </div>
  );
}
