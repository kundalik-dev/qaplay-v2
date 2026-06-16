import Link from "next/link";

import type { RoadmapStep as RoadmapStepData } from "@/data/home/roadmap-section-data";

import styles from "./roadmap-section.module.css";

interface RoadmapStepProps {
  index: number;
  isLast: boolean;
  step: RoadmapStepData;
}

export function RoadmapStep({ index, isLast, step }: RoadmapStepProps) {
  const Icon = step.icon;
  const stepNumber = `${index + 1}`.padStart(2, "0");

  return (
    <div
      className={styles.step}
      role="listitem"
      data-testid={`roadmap-step-${step.id}`}
      data-step={step.id}
      data-tone={step.tone}
    >
      <div className={styles.stepLeft}>
        <div className={styles.numberWrap}>
          <div className={styles.number}>{stepNumber}</div>
          {!isLast ? <div className={styles.connector} aria-hidden="true" /> : null}
        </div>
      </div>

      <div className={styles.stepBody}>
        <div className={styles.stepIcon} aria-hidden="true">
          <Icon strokeWidth={2.1} />
        </div>

        <div className={styles.stepContent}>
          <div className={styles.stepLabel}>{step.stage}</div>
          <h3 className={styles.stepTitle}>{step.title}</h3>
          <p className={styles.stepDescription}>{step.description}</p>
          <Link
            href={step.href}
            className={styles.stepLink}
            data-testid={`roadmap-step-link-${step.id}`}
            data-cta={step.id}
          >
            {step.linkLabel}
          </Link>
        </div>
      </div>
    </div>
  );
}
