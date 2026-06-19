import type { Metadata } from "next";
import { Trophy } from "lucide-react";

import styles from "../_components/dashboard.module.css";

export const metadata: Metadata = {
  title: "QA Challenges | QA Playground",
  description:
    "Solve real-world QA challenges to sharpen your testing skills. Beginner to advanced automation and manual testing problems.",
  openGraph: {
    title: "QA Challenges | QA Playground",
    description:
      "Solve real-world QA challenges to sharpen your testing skills. Beginner to advanced automation and manual testing problems.",
    url: "https://qaplayground.com/challenges",
    siteName: "QA Playground",
    type: "website",
  },
};

export default function ChallengesPage() {
  return (
    <div className={styles.placeholderPage} data-testid="page-challenges">
      <Trophy className={styles.placeholderIcon} aria-hidden="true" />
      <h1 className={styles.placeholderTitle}>QA Challenges</h1>
      <p className={styles.placeholderDesc}>
        Curated real-world testing scenarios from beginner to advanced. Earn
        points, track streaks, and compete on the leaderboard.
      </p>
      <span className={styles.comingSoonBadge}>Coming soon</span>
    </div>
  );
}
