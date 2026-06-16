import styles from "./job-hunt-section.module.css";

type JobStepCardProps = {
  description: string;
  emoji: string;
  title: string;
};

export function JobStepCard({ description, emoji, title }: JobStepCardProps) {
  return (
    <article className={styles["job-step-card"]}>
      <div className={styles["job-step-icon"]} aria-hidden="true">
        {emoji}
      </div>
      <h3 className={styles["job-step-title"]}>{title}</h3>
      <p className={styles["job-step-description"]}>{description}</p>
    </article>
  );
}
