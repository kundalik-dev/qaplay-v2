import { Check } from "lucide-react";

import { cn } from "@/lib/utils";
import { jobSectionContent } from "@/data/home/job-section-data";

import { JobCrmPanel } from "./job-crm-panel";
import { JobStepCard } from "./job-step-card";
import styles from "./job-hunt-section.module.css";
import shared from "../shared/home-shared.module.css";

export function JobHuntSection() {
  const {
    crmItems,
    crmPanel,
    description,
    futureChecklist,
    futurePanel,
    sectionTag,
    steps,
    titleLines,
  } = jobSectionContent;
  const FuturePanelIcon = futurePanel.icon;

  return (
    <section
      id="jobs"
      className={cn(
        shared.section,
        shared.sectionDefaultPadding,
        shared.sectionDivider,
        shared.sectionDividerBlend,
      )}
      aria-labelledby="jobs-title"
      data-testid="home-jobs"
      data-section="jobs"
      data-supported-frameworks="playwright selenium cypress"
    >
      <div className="home-shell">
        <div className={styles.header}>
          <div className={shared.sectionTag}>{sectionTag}</div>
          <h2 id="jobs-title" className={styles.title}>
            <span className={styles.titleLine}>{titleLines[0]}</span>
            <span className={styles.titleLine}>{titleLines[1]}</span>
          </h2>
          <p className={styles.description}>{description}</p>
        </div>

        <div
          className={styles.flow}
          role="list"
          aria-label="Job hunt workflow"
          data-testid="jobs-workflow"
        >
          {steps.map((step) => (
            <div
              key={step.title}
              role="listitem"
              data-testid={`job-step-${step.id}`}
              data-step={step.id}
            >
              <JobStepCard {...step} />
            </div>
          ))}
        </div>

        <div className={styles.panels}>
          <JobCrmPanel
            description={crmPanel.description}
            icon={crmPanel.icon}
            items={crmItems}
            title={crmPanel.title}
          />

          <article
            className={cn(styles["jobs-panel"], styles["jobs-panel-future"])}
          >
            {futurePanel.badge ? (
              <div className={styles["jobs-future-badge"]}>
                {futurePanel.badge}
              </div>
            ) : null}

            <div className={styles["jobs-panel-head"]}>
              <div className={styles["jobs-panel-icon"]} aria-hidden="true">
                <FuturePanelIcon strokeWidth={2} />
              </div>
              <h3 className={styles["jobs-panel-title"]}>
                {futurePanel.title}
              </h3>
            </div>

            <p className={styles["jobs-panel-description"]}>
              {futurePanel.description}
            </p>

            <div className={styles["jobs-track-list"]}>
              {futureChecklist.map((item) => (
                <div key={item} className={styles["jobs-track-row"]}>
                  <span
                    className={styles["jobs-track-tick"]}
                    aria-hidden="true"
                  >
                    <Check strokeWidth={2.25} />
                  </span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
