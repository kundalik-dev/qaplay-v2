import { cn } from "@/lib/utils";

import styles from "./practice-section.module.css";

type PracticeDifficultyCardProps = {
  count: string;
  description: string;
  tone: "beginner" | "intermediate" | "advanced";
  title: string;
};

export function PracticeDifficultyCard({
  count,
  description,
  tone,
  title,
}: PracticeDifficultyCardProps) {
  return (
    <article
      className={cn(
        styles["practice-difficulty-card"],
        styles[`practice-difficulty-card-${tone}`],
      )}
    >
      <div className={styles["practice-difficulty-top"]}>
        <span
          className={styles["practice-difficulty-dot"]}
          aria-hidden="true"
        />
        <span className={styles["practice-difficulty-title"]}>{title}</span>
        <span className={styles["practice-difficulty-count"]}>{count}</span>
      </div>

      <p className={styles["practice-difficulty-description"]}>{description}</p>
    </article>
  );
}
