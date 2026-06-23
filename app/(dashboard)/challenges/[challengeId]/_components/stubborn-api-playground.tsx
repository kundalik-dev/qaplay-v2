"use client";

import { useState, useEffect } from "react";
import styles from "./playground.module.css";

type ApiState = "error" | "success";

export function StubbornApiPlayground() {
  const [apiState, setApiState] = useState<ApiState>("error");
  const [loading, setLoading] = useState(false);

  async function handleRetry() {
    setLoading(true);
    // Simulate a delayed failed request
    await new Promise((r) => setTimeout(r, 900));
    setLoading(false);
    // Always fails on manual retry — only a mocked route intercept would succeed
    setApiState("error");
  }

  // Expose a way for automation scripts to "inject" a mocked response
  // The script calls window.__mockApiSuccess() to trigger the success state
  useEffect(() => {
    if (typeof window !== "undefined") {
      // @ts-expect-error — intentional automation hook
      window.__mockApiSuccess = () => setApiState("success");
      // @ts-expect-error — intentional automation hook
      window.__mockApiReset = () => setApiState("error");
    }
  }, []);

  return (
    <div className={styles.playground} data-testid="stubborn-api-playground">
      <div className={styles.apiWidget} data-testid="api-widget">
        <div className={styles.apiWidgetHeader}>
          <span>GET /api/user-stats</span>
          <span
            className={
              apiState === "error"
                ? styles.apiStatusError
                : styles.apiStatusSuccess
            }
            data-testid="api-status-badge"
          >
            {apiState === "error" ? "500 Error" : "200 OK"}
          </span>
        </div>

        <div className={styles.apiWidgetBody}>
          {apiState === "error" ? (
            <>
              <div
                className={styles.errorBox}
                data-testid="api-error-box"
                role="alert"
              >
                <strong>Error 500:</strong> Failed to load user stats from{" "}
                <code>/api/user-stats</code>
              </div>
              <button
                className={styles.retryBtn}
                onClick={handleRetry}
                disabled={loading}
                data-testid="retry-fetch-btn"
                aria-label="Retry Fetch"
              >
                {loading ? "Retrying…" : "Retry Fetch"}
              </button>
            </>
          ) : (
            <div
              className={styles.successBox}
              data-testid="api-success-box"
              role="status"
            >
              <strong>✅ User Stats Loaded</strong>
              <div className={styles.dataRow}>
                <span>status</span>
                <span className={styles.dataValue}>&quot;success&quot;</span>
              </div>
              <div className={styles.dataRow}>
                <span>users</span>
                <span className={styles.dataValue}>42</span>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className={styles.apiHint} data-testid="api-hint">
        Intercept <code>/api/user-stats</code> and mock a 200 OK response
      </div>
    </div>
  );
}
