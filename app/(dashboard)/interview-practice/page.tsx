import type { Metadata } from "next";
import { BrainCircuit } from "lucide-react";

import styles from "../_components/dashboard.module.css";

export const metadata: Metadata = {
  title: "Interview Practice | QA Playground",
  description:
    "Practice QA interview questions and scenarios with AI-powered feedback on QA Playground.",
  openGraph: {
    title: "Interview Practice | QA Playground",
    description:
      "Practice QA interview questions and scenarios with AI-powered feedback on QA Playground.",
    url: "https://qaplayground.com/interview-practice",
    siteName: "QA Playground",
    type: "website",
  },
};

export default function InterviewPracticePage() {
  return (
    <div
      className={styles.placeholderPage}
      data-testid="page-interview-practice"
    >
      <BrainCircuit className={styles.placeholderIcon} aria-hidden="true" />
      <h1 className={styles.placeholderTitle}>Interview Practice</h1>
      <p className={styles.placeholderDesc}>
        AI-powered mock interviews for QA roles. Practice common questions, get
        real-time feedback, and build confidence before your next interview.
      </p>
      <span className={styles.comingSoonBadge}>Coming soon</span>
    </div>
  );
}
