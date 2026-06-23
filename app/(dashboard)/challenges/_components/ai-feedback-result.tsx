"use client";

import Link from "next/link";
import styles from "../challenges.module.css";

interface Props {
  status: "success" | "fail";
  feedback: string;
  xp: number;
  challengeId: string;
}

export function AiFeedbackResult({ status, feedback, xp, challengeId }: Props) {
  const isPass = status === "success";

  return (
    <div
      className={`${styles.resultCard} ${isPass ? styles.resultCardPass : styles.resultCardFail}`}
      data-testid="ai-feedback-result"
      data-status={status}
      role="status"
      aria-live="polite"
    >
      {/* ── Header ── */}
      <div className={styles.resultHeader}>
        <div className={styles.resultTitleRow}>
          <span className={styles.resultStatusIcon} aria-hidden="true">
            {isPass ? "✅" : "❌"}
          </span>
          <div>
            <p className={styles.resultTitle}>
              {isPass ? "Challenge Passed!" : "Not Quite Right"}
            </p>
            <p className={styles.resultSubtitle}>
              {isPass
                ? "Great work — your script met all the requirements."
                : "Review the feedback below and try again."}
            </p>
          </div>
        </div>
        {isPass && (
          <div
            className={styles.xpBlock}
            data-testid="xp-awarded"
            aria-label={`${xp} XP awarded`}
          >
            <span className={styles.xpIcon} aria-hidden="true">
              ⭐
            </span>
            <span className={styles.xpValue}>+{xp}</span>
            <span className={styles.xpLabel}>XP</span>
          </div>
        )}
      </div>

      {/* ── AI Feedback ── */}
      <div className={styles.resultFeedbackBlock}>
        <div className={styles.resultFeedbackLabel}>
          <span className={styles.resultFeedbackDot} aria-hidden="true" />
          AI Senior QA Review
        </div>
        <p className={styles.resultFeedbackText}>{feedback}</p>
      </div>

      {/* ── Actions ── */}
      <div className={styles.resultActions}>
        {isPass ? (
          <>
            <Link
              href="/challenges"
              className={`${styles.resultBtn} ${styles.resultBtnPrimary}`}
              data-testid="back-to-challenges-btn"
            >
              ← Back to Challenges
            </Link>
            <button
              className={`${styles.resultBtn} ${styles.resultBtnSecondary}`}
              onClick={() => {
                const el = document.getElementById("code-submission");
                el?.focus();
              }}
              data-testid="review-solution-btn"
              type="button"
            >
              Review My Solution
            </button>
          </>
        ) : (
          <>
            <button
              className={`${styles.resultBtn} ${styles.resultBtnPrimary}`}
              onClick={() => {
                const el = document.getElementById("code-submission");
                el?.focus();
              }}
              data-testid="try-again-btn"
              type="button"
            >
              Try Again
            </button>
            <button
              className={`${styles.resultBtn} ${styles.resultBtnSecondary}`}
              onClick={() => {
                const hintsBtn = document.querySelector<HTMLButtonElement>(
                  `[data-testid="hints-toggle-btn"]`,
                );
                if (
                  hintsBtn &&
                  hintsBtn.getAttribute("aria-expanded") === "false"
                ) {
                  hintsBtn.click();
                }
                hintsBtn?.scrollIntoView({
                  behavior: "smooth",
                  block: "center",
                });
              }}
              data-testid="show-hints-from-result-btn"
              type="button"
            >
              💡 View Hints
            </button>
          </>
        )}
      </div>
    </div>
  );
}
