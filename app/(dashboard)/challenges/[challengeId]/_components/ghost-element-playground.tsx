"use client";

import { useState } from "react";
import styles from "./playground.module.css";

export function GhostElementPlayground() {
  const [revealed, setRevealed] = useState(false);

  function handleReveal() {
    setRevealed(true);
  }

  return (
    <div className={styles.playground} data-testid="ghost-element-playground">
      <div className={styles.shadowHostBox} data-testid="shadow-host">
        <div className={styles.shadowRoot} data-testid="shadow-root-mock">
          <div className={styles.shadowLabel}>#shadow-root (open)</div>
          <button
            className={styles.revealBtn}
            id="secret-btn"
            onClick={handleReveal}
            data-testid="secret-reveal-btn"
            aria-label="Reveal Secret"
          >
            Reveal Secret
          </button>
        </div>
      </div>

      {revealed && (
        <div
          className={styles.tokenToast}
          data-testid="secret-token"
          role="status"
          aria-live="polite"
        >
          🎉 Secret Revealed! Token: <strong>QA-SHDW-992</strong>
        </div>
      )}
    </div>
  );
}
