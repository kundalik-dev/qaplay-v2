"use client";

import { useState, useRef } from "react";
import styles from "./playground.module.css";

type Phase = "idle" | "processing" | "success";

const MIN_DELAY_MS = 1000;
const MAX_DELAY_MS = 7000;
const SUCCESS_VISIBLE_MS = 800;

function randomDelay() {
  return MIN_DELAY_MS + Math.random() * (MAX_DELAY_MS - MIN_DELAY_MS);
}

export function ImpatientUserPlayground() {
  const [phase, setPhase] = useState<Phase>("idle");
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  function handleStart() {
    if (phase === "processing") return;

    setPhase("processing");

    timerRef.current = setTimeout(() => {
      setPhase("success");

      timerRef.current = setTimeout(() => {
        setPhase("idle");
      }, SUCCESS_VISIBLE_MS);
    }, randomDelay());
  }

  return (
    <div className={styles.playground} data-testid="impatient-user-playground">
      <div className={styles.processingArea}>
        <button
          className={styles.startBtn}
          id="start-processing-btn"
          onClick={handleStart}
          disabled={phase === "processing"}
          data-testid="start-processing-btn"
          aria-label="Start Processing"
        >
          {phase === "processing" ? "Processing…" : "Start Processing"}
        </button>

        {phase === "processing" && (
          <div className={styles.spinnerWrap} data-testid="processing-spinner" aria-live="polite">
            <div className={styles.spinner} aria-hidden="true" />
            <span>Working… (random delay 1–7s)</span>
          </div>
        )}

        {phase === "success" && (
          <div
            className={styles.successToast}
            id="success-message"
            data-testid="success-toast"
            role="status"
            aria-live="assertive"
          >
            ✅ Processing Complete!
          </div>
        )}

        {phase === "idle" && (
          <span className={styles.idleHint} data-testid="idle-hint">
            Waiting for action…
          </span>
        )}
      </div>
    </div>
  );
}
