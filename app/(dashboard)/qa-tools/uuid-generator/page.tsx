import type { Metadata } from "next";
import { Wrench } from "lucide-react";

import styles from "../../_components/dashboard.module.css";

export const metadata: Metadata = {
  title: "UUID Generator | QA Playground",
  description:
    "Free online UUID v4 generator. Generate single or bulk UUIDs instantly — perfect for test data, database IDs, and API testing.",
  keywords: [
    "uuid generator",
    "uuid v4 generator",
    "online uuid",
    "free uuid generator",
    "generate uuid",
    "bulk uuid",
    "test data generator",
  ],
  openGraph: {
    title: "Free UUID Generator | QA Playground",
    description:
      "Generate single or bulk UUID v4 values instantly. Free online tool for testers and developers.",
    url: "https://qaplayground.com/qa-tools/uuid-generator",
    siteName: "QA Playground",
    type: "website",
  },
  alternates: {
    canonical: "https://qaplayground.com/qa-tools/uuid-generator",
  },
};

export default function UuidGeneratorPage() {
  return (
    <div className={styles.placeholderPage} data-testid="page-uuid-generator">
      <Wrench className={styles.placeholderIcon} aria-hidden="true" />
      <h1 className={styles.placeholderTitle}>UUID Generator</h1>
      <p className={styles.placeholderDesc}>
        Generate UUID v4 values for test data, database seeds, and API payloads.
        Single or bulk — copy with one click.
      </p>
      <span className={styles.comingSoonBadge}>Coming soon</span>
    </div>
  );
}
