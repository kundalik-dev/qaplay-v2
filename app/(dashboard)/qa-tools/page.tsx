import type { Metadata } from "next";
import { Wrench } from "lucide-react";

import styles from "../_components/dashboard.module.css";

export const metadata: Metadata = {
  title: "QA Tools | QA Playground",
  description:
    "Free online QA tools — UUID generator, JSON formatter, regex tester, base64 encoder and more. Built for testers and developers.",
  keywords: [
    "qa tools",
    "uuid generator",
    "online qa tools",
    "free testing tools",
    "json formatter",
    "regex tester",
    "base64 encoder",
  ],
  openGraph: {
    title: "Free QA Tools | QA Playground",
    description:
      "Free online QA tools — UUID generator, JSON formatter, regex tester, base64 encoder and more. Built for testers and developers.",
    url: "https://qaplayground.com/qa-tools",
    siteName: "QA Playground",
    type: "website",
  },
};

export default function QaToolsPage() {
  return (
    <div className={styles.placeholderPage} data-testid="page-qa-tools">
      <Wrench className={styles.placeholderIcon} aria-hidden="true" />
      <h1 className={styles.placeholderTitle}>QA Tools</h1>
      <p className={styles.placeholderDesc}>
        A growing suite of free online tools built for QA engineers and
        developers — UUID generators, JSON formatters, regex testers, and more.
      </p>
      <span className={styles.comingSoonBadge}>Coming soon</span>
    </div>
  );
}
