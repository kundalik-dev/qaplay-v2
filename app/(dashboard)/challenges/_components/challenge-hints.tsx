"use client";

import { useState } from "react";
import type { ChallengeMeta } from "@/data/challenges-registry";
import styles from "../challenges.module.css";

interface Props {
  hints: ChallengeMeta["hints"];
  challengeId: string;
}

export function ChallengeHints({ hints, challengeId }: Props) {
  if (!hints || hints.length === 0) return null;

  return (
    <div
      className={styles.hintsSection}
      data-testid="hints-section"
      data-challenge-id={challengeId}
    >
      <div
        id="hints-body"
        className={styles.hintsBody}
        data-testid="hints-body"
      >
        {hints.map((hint, idx) => (
          <div
            key={idx}
            className={styles.hintItem}
            data-testid={`hint-item-${idx + 1}`}
          >
            <span className={styles.hintNum} aria-label={`Hint ${idx + 1}`}>
              {idx + 1}
            </span>
            <span
              className={styles.hintText}
              dangerouslySetInnerHTML={{ __html: hint }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
