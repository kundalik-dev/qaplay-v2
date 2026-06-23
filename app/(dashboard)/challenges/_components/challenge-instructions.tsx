"use client";

import { useState } from "react";
import type { ChallengeMeta } from "@/data/challenges-registry";
import styles from "../challenges.module.css";

interface Props {
  instructions: ChallengeMeta["instructions"];
}

export function ChallengeInstructions({ instructions }: Props) {
  const [open, setOpen] = useState(true);

  return (
    <div
      className={styles.accordionBlock}
      data-testid="instructions-accordion"
      data-open={open}
    >
      {/* Header / toggle */}
      <button
        className={styles.accordionTrigger}
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="instructions-body"
        data-testid="instructions-toggle"
        type="button"
      >
        <span className={styles.accordionIcon} aria-hidden="true">📋</span>
        <span className={styles.accordionTitle}>Instructions</span>
        <span className={styles.accordionMeta}>
          {instructions.length} {instructions.length === 1 ? "step" : "steps"}
        </span>
        <span
          className={`${styles.accordionChevron} ${open ? styles.accordionChevronOpen : ""}`}
          aria-hidden="true"
        >
          ▾
        </span>
      </button>

      {/* Body */}
      {open && (
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
      )}
    </div>
  );
}
