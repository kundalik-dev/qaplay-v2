import type { Metadata } from "next";
import { Mic } from "lucide-react";

import styles from "../_components/dashboard.module.css";

export const metadata: Metadata = {
  title: "Mock Interview | QA Playground",
  description:
    "Practice QA mock interviews with AI-powered feedback on QA Playground.",
  openGraph: {
    title: "Mock Interview | QA Playground",
    description:
      "Practice QA mock interviews with AI-powered feedback on QA Playground.",
    url: "https://qaplayground.com/mock-interview",
    siteName: "QA Playground",
    type: "website",
  },
};

export default function MockInterviewPage() {
  return (
    <div className={styles.placeholderPage} data-testid="page-mock-interview">
      <Mic className={styles.placeholderIcon} aria-hidden="true" />
      <h1 className={styles.placeholderTitle}>Mock Interviews</h1>
      <p className={styles.placeholderDesc}>
        AI-powered mock interviews for QA roles. Practice common questions, get
        real-time feedback, and build confidence before your next interview.
      </p>
      <span className={styles.comingSoonBadge}>Coming soon</span>
    </div>
  );
}
