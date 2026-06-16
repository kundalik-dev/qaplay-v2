import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import type { JobCrmItem } from "@/data/home/job-section-data";

import styles from "./job-hunt-section.module.css";

type JobCrmPanelProps = {
  description: string;
  icon: LucideIcon;
  items: JobCrmItem[];
  title: string;
};

const stageClassMap: Record<JobCrmItem["stage"], string> = {
  Applied: "applied",
  "HR Opened": "opened",
  Interview: "interview",
  "AI Draft Ready": "draft",
};

export function JobCrmPanel({
  description,
  icon: Icon,
  items,
  title,
}: JobCrmPanelProps) {
  return (
    <article className={styles["jobs-panel"]}>
      <div className={styles["jobs-panel-head"]}>
        <div className={styles["jobs-panel-icon"]} aria-hidden="true">
          <Icon strokeWidth={2} />
        </div>
        <h3 className={styles["jobs-panel-title"]}>{title}</h3>
      </div>

      <p className={styles["jobs-panel-description"]}>{description}</p>

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
