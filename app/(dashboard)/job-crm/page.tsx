import type { Metadata } from "next";
import { BriefcaseBusiness } from "lucide-react";

import styles from "../_components/dashboard.module.css";

export const metadata: Metadata = {
  title: "Job CRM | QA Playground",
  description:
    "Track your QA job applications in one place. Manage interviews, follow-ups, offers, and notes — your personal job search CRM.",
  openGraph: {
    title: "Job Application Tracker | QA Playground",
    description:
      "Track your QA job applications in one place. Manage interviews, follow-ups, offers, and notes — your personal job search CRM.",
    url: "https://qaplayground.com/job-crm",
    siteName: "QA Playground",
    type: "website",
  },
};

export default function JobCrmPage() {
  return (
    <div className={styles.placeholderPage} data-testid="page-job-crm">
      <BriefcaseBusiness className={styles.placeholderIcon} aria-hidden="true" />
      <h1 className={styles.placeholderTitle}>Job CRM</h1>
      <p className={styles.placeholderDesc}>
        Your personal job search tracker. Log applications, set follow-up
        reminders, record interview notes, and monitor your pipeline from
        applied to offer.
      </p>
      <span className={styles.comingSoonBadge}>Coming soon</span>
    </div>
  );
}
