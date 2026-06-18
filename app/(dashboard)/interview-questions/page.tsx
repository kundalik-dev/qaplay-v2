import type { Metadata } from "next";
import { HelpCircle } from "lucide-react";

import styles from "../_components/dashboard.module.css";

export const metadata: Metadata = {
  title: "QA Interview Questions | QA Playground",
  description:
    "Browse hundreds of QA interview questions with answers — manual testing, automation, Selenium, Playwright, Cypress, API testing and more.",
  keywords: [
    "qa interview questions",
    "software testing interview questions",
    "selenium interview questions",
    "playwright interview questions",
    "cypress interview questions",
    "api testing interview questions",
    "manual testing questions",
  ],
  openGraph: {
    title: "QA Interview Questions | QA Playground",
    description:
      "Browse hundreds of QA interview questions with answers — manual, automation, Selenium, Playwright, Cypress, and API testing.",
    url: "https://qaplayground.com/interview-questions",
    siteName: "QA Playground",
    type: "website",
  },
  alternates: {
    canonical: "https://qaplayground.com/interview-questions",
  },
};

export default function InterviewQuestionsPage() {
  return (
    <div className={styles.placeholderPage} data-testid="page-interview-questions">
      <HelpCircle className={styles.placeholderIcon} aria-hidden="true" />
      <h1 className={styles.placeholderTitle}>Interview Questions</h1>
      <p className={styles.placeholderDesc}>
        A searchable library of QA interview questions — manual testing,
        Playwright, Selenium, Cypress, API testing, and more. With sample
        answers and difficulty ratings.
      </p>
      <span className={styles.comingSoonBadge}>Coming soon</span>
    </div>
  );
}
