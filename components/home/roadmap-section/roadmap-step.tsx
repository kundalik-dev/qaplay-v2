import Link from "next/link";

import type { RoadmapStep as RoadmapStepData } from "@/data/home/roadmap-section-data";

import styles from "./roadmap-section.module.css";

interface RoadmapStepProps {
  index: number;
  step: RoadmapStepData;
}

export function RoadmapStep({ index, step }: RoadmapStepProps) {
  const Icon = step.icon;
  const stepNumber = `${index + 1}`.padStart(2, "0");

  return (
    <article
      className={styles.step}
      role="listitem"
      data-testid={`roadmap-step-${step.id}`}
      data-step={step.id}
      data-tone={step.tone}
    >
      <div className={styles.stepIcon} aria-hidden="true">
        <Icon strokeWidth={2} />
        <span className={styles.stepNumber}>{stepNumber}</span>
      </div>

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
    </article>
  );
}
