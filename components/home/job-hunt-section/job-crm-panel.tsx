import { cn } from "@/lib/utils";

import styles from "./job-hunt-section.module.css";

type JobCrmItem = {
  company: string;
  stage: "Applied" | "HR Opened" | "Interview" | "AI Draft Ready";
};

type JobCrmPanelProps = {
  items: JobCrmItem[];
};

const stageClassMap: Record<JobCrmItem["stage"], string> = {
  Applied: "applied",
  "HR Opened": "opened",
  Interview: "interview",
  "AI Draft Ready": "draft",
};

export function JobCrmPanel({ items }: JobCrmPanelProps) {
  return (
    <article className={styles["jobs-panel"]}>
      <div className={styles["jobs-panel-head"]}>
        <div className={styles["jobs-panel-icon"]} aria-hidden="true">
          CRM
        </div>
        <h3 className={styles["jobs-panel-title"]}>Your Job CRM</h3>
      </div>

      <p className={styles["jobs-panel-description"]}>
        A Kanban-style tracker for your QA job search. See where every
        application stands at a glance, from drafted to interview.
      </p>

      <div className={styles["jobs-crm-list"]}>
        {items.map((item) => (
          <div key={item.company} className={styles["jobs-crm-row"]}>
            <span className={styles["jobs-crm-company"]}>{item.company}</span>
            <span
              className={cn(
                styles["jobs-crm-stage"],
                styles[`jobs-crm-stage-${stageClassMap[item.stage]}`],
              )}
            >
              {item.stage}
            </span>
          </div>
        ))}
      </div>
    </article>
  );
}
