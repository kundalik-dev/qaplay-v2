import type { LucideIcon } from "lucide-react";

import styles from "./job-hunt-section.module.css";

type JobStepCardProps = {
  description: string;
  icon: LucideIcon;
  title: string;
};

export function JobStepCard({
  description,
  icon: Icon,
  title,
}: JobStepCardProps) {
  return (
    <article className={styles["job-step-card"]}>
      <div className={styles["job-step-icon"]} aria-hidden="true">
        <Icon strokeWidth={2} />
      </div>
      <h3 className={styles["job-step-title"]}>{title}</h3>
      <p className={styles["job-step-description"]}>{description}</p>
    </article>
  );
}
