"use client";

import { useState } from "react";
import type { ChallengeMeta } from "@/data/challenges-registry";
import styles from "../challenges.module.css";

interface Props {
  instructions: ChallengeMeta["instructions"];
}

export function ChallengeInstructions({ instructions }: Props) {
  return (
    <ol
      id="instructions-body"
      className={styles.instructionsList}
      data-testid="instructions-list"
    >
      {instructions.map((step, idx) => (
        <li
          key={idx}
          className={styles.instructionsItem}
          data-testid={`instruction-step-${idx + 1}`}
        >
          <span className={styles.stepBadge} aria-label={`Step ${idx + 1}`}>
            {idx + 1}
          </span>
          <span
            className={styles.stepText}
            dangerouslySetInnerHTML={{ __html: step }}
          />
        </li>
      ))}
    </ol>
  );
}
