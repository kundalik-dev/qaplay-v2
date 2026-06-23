"use client";

import type { ChallengeMeta } from "@/data/challenges-registry";
import styles from "../challenges.module.css";

interface Props {
  challenge: ChallengeMeta;
}

export function ChallengeProblemStatement({ challenge }: Props) {
  return (
    <div
      className={styles.panelSection}
      data-testid="problem-statement-section"
    >
      {/* Problem Statement */}
      <div className={styles.psBlock} data-testid="problem-statement">
        <p className={styles.psSectionLabel}>Problem Statement</p>
        <p
          className={styles.psBody}
          dangerouslySetInnerHTML={{ __html: challenge.problemStatement }}
        />
      </div>

      {/* Expected Behavior */}
      <div className={styles.psBlock} data-testid="expected-behavior">
        <p className={styles.psSectionLabel}>What You Need to Do</p>
        <ul className={styles.psChecklist} aria-label="Expected behaviors">
          {challenge.expectedBehavior.map((item, i) => (
            <li
              key={i}
              className={styles.psCheckItem}
              data-testid={`expected-item-${i}`}
            >
              <span className={styles.psCheckIcon} aria-hidden="true">
                →
              </span>
              <span dangerouslySetInnerHTML={{ __html: item }} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
