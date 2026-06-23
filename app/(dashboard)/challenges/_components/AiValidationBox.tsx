"use client";

import { useState, useEffect } from "react";
import styles from "../challenges.module.css";
import type { ChallengeMeta } from "@/data/challenges-registry";
import { buildValidationSystemPrompt } from "@/data/challenges-registry";

export default function AiValidationBox({ challenge }: { challenge: ChallengeMeta }) {
  const [code, setCode] = useState(challenge.boilerplate);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ status: "success" | "fail" | null; feedback: string }>({
    status: null,
    feedback: "",
  });
  const [hasKey, setHasKey] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    Promise.resolve().then(() => {
      const settings = JSON.parse(localStorage.getItem("qap_settings") || "{}");
      if (settings.openrouter_key) setHasKey(true);
    });
  }, []);

  const handleValidate = async () => {
    const settings = JSON.parse(localStorage.getItem("qap_settings") || "{}");
    const key = settings.openrouter_key;
    const model = settings.openrouter_model || "openai/gpt-4o-mini";

    if (!key) {
      alert("Please configure your OpenRouter API Key in the Settings page first.");
      return;
    }

    setLoading(true);
    setResult({ status: null, feedback: "" });

    // Build the system prompt from the structured validationConfig
    const systemPrompt = buildValidationSystemPrompt(challenge);

    try {
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${key}`,
          "HTTP-Referer": window.location.origin,
          "X-Title": "QA Playground",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model,
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: code },
          ],
        }),
      });

      const data = await response.json();

      if (data.error) {
        setResult({ status: "fail", feedback: "API Error: " + data.error.message });
        setLoading(false);
        return;
      }

      const content = data.choices[0]?.message?.content;
      try {
        const parsed = JSON.parse(content);
        setResult({ status: parsed.pass ? "success" : "fail", feedback: parsed.feedback });

        if (parsed.pass) {
          const completed = JSON.parse(
            localStorage.getItem("qap_completed_challenges") || "[]"
          );
          if (!completed.includes(challenge.id)) {
            completed.push(challenge.id);
            localStorage.setItem("qap_completed_challenges", JSON.stringify(completed));
          }
        }
      } catch {
        setResult({ status: "fail", feedback: "Failed to parse AI response. Please try again." });
      }
    } catch {
      setResult({ status: "fail", feedback: "Network error occurred." });
    } finally {
      setLoading(false);
    }
  };

  const systemPromptPreview = buildValidationSystemPrompt(challenge);

  return (
    <div className={styles.panelSection} data-testid="ai-validation-box">
      <h2 className={`${styles.headingSm} ${styles.aiBoxTitle}`}>
        <span aria-hidden="true">🤖</span> Submit Solution (AI BYOK)
      </h2>
      <p className={`${styles.bodySm} ${styles.textMuted} ${styles.aiBoxIntro}`}>
        Paste your automation script below. Our AI will analyze your code for correctness and
        best practices.
      </p>

      {!hasKey && (
        <div className={styles.noKeyWarning} data-testid="no-key-warning" role="alert">
          ⚠️ <strong>No API Key found.</strong> Go to the{" "}
          <a href="/settings" className={styles.warningLink}>Settings page</a>{" "}
          to configure your OpenRouter API key before submitting.
        </div>
      )}

      <div className={styles.formGroup}>
        <label htmlFor="code-submission" className={styles.codeLabel}>
          Your Automation Script
        </label>
        <textarea
          id="code-submission"
          className={`${styles.inputField} ${styles.codeEditor}`}
          value={code}
          onChange={(e) => setCode(e.target.value)}
          spellCheck={false}
          data-testid="code-submission-input"
        />
      </div>

      <button
        className={`${styles.btn} ${styles.btnPrimary} ${styles.btnSubmitSolution}`}
        onClick={handleValidate}
        disabled={loading || !hasKey}
        data-testid="validate-btn"
        aria-busy={loading}
      >
        <span aria-hidden="true">✨</span>{" "}
        {loading ? "Validating…" : "Validate with AI"}
      </button>

      {/* ── AI Prompt Preview (dev/admin tool) ── */}
      <div className={styles.promptPreviewSection} data-testid="prompt-preview-section">
        <button
          className={styles.promptToggleBtn}
          onClick={() => setShowPrompt((v) => !v)}
          data-testid="prompt-toggle-btn"
          aria-expanded={showPrompt}
        >
          <span className={styles.promptToggleIcon} aria-hidden="true">
            {showPrompt ? "▾" : "▸"}
          </span>
          <span>AI Validation Prompt</span>
          <span className={styles.promptToggleMeta}>
            {challenge.validationConfig.strictness} · {challenge.validationConfig.requiredPatterns.length} rules
          </span>
        </button>
        {showPrompt && (
          <pre
            className={styles.promptPreview}
            data-testid="prompt-preview"
            aria-label="AI system prompt that will be sent on submission"
          >
            {systemPromptPreview}
          </pre>
        )}
      </div>

      {/* ── Result ── */}
      {result.status && (
        <div
          className={`${styles.aiFeedbackResult} ${result.status === "fail" ? styles.failState : ""}`}
          data-testid="ai-feedback-result"
          data-status={result.status}
          role="status"
          aria-live="polite"
        >
          <div className={styles.feedbackHeader}>
            <div className={styles.feedbackStatus}>
              <span aria-hidden="true">{result.status === "success" ? "✅" : "❌"}</span>
              <span>{result.status === "success" ? "Challenge Passed!" : "Challenge Failed"}</span>
            </div>
            {result.status === "success" && (
              <span className={styles.xpAwarded} data-testid="xp-awarded">
                +{challenge.xp} XP
              </span>
            )}
          </div>
          <div>
            <p className={`${styles.bodySm} ${styles.feedbackLabel}`}>
              <strong>AI Feedback:</strong>
            </p>
            <div className={styles.feedbackCodeReview}>
              <p className={`${styles.bodySm} ${styles.feedbackText}`}>{result.feedback}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
