"use client";

import { useState, useEffect } from "react";
import styles from "../challenges.module.css";
import type { ChallengeMeta } from "@/data/challenges-registry";
import { buildValidationSystemPrompt } from "@/data/challenges-registry";
import { AiFeedbackResult } from "./ai-feedback-result";

export default function AiValidationBox({
  challenge,
}: {
  challenge: ChallengeMeta;
}) {
  const [code, setCode] = useState(challenge.boilerplate);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{
    status: "success" | "fail" | null;
    feedback: string;
  }>({
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
      alert(
        "Please configure your OpenRouter API Key in the Settings page first.",
      );
      return;
    }

    setLoading(true);
    setResult({ status: null, feedback: "" });

    const systemPrompt = buildValidationSystemPrompt(challenge);

    try {
      const response = await fetch(
        "https://openrouter.ai/api/v1/chat/completions",
        {
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
        },
      );

      const data = await response.json();

      if (data.error) {
        setResult({
          status: "fail",
          feedback: "API Error: " + data.error.message,
        });
        setLoading(false);
        return;
      }

      const content = data.choices[0]?.message?.content;
      try {
        const parsed = JSON.parse(content);
        setResult({
          status: parsed.pass ? "success" : "fail",
          feedback: parsed.feedback,
        });

        if (parsed.pass) {
          const completed = JSON.parse(
            localStorage.getItem("qap_completed_challenges") || "[]",
          );
          if (!completed.includes(challenge.id)) {
            completed.push(challenge.id);
            localStorage.setItem(
              "qap_completed_challenges",
              JSON.stringify(completed),
            );
          }
        }
      } catch {
        setResult({
          status: "fail",
          feedback: "Failed to parse AI response. Please try again.",
        });
      }
    } catch {
      setResult({ status: "fail", feedback: "Network error occurred." });
    } finally {
      setLoading(false);
    }
  };

  const systemPromptPreview = buildValidationSystemPrompt(challenge);

  return (
    <div
      className={styles.panelSection}
      data-testid="ai-validation-box"
      style={{ marginTop: 0, paddingTop: 0, borderTop: "none" }}
    >
      <p
        className={`${styles.bodySm} ${styles.textMuted} ${styles.aiBoxIntro}`}
        style={{ marginTop: "16px", marginBottom: "16px" }}
      >
        Run your script locally, paste it below, and let AI validate your
        solution.
      </p>

      {/* No-key warning */}
      {!hasKey && (
        <div
          className={styles.noKeyWarning}
          data-testid="no-key-warning"
          role="alert"
        >
          ⚠️ <strong>No API Key found.</strong> Go to the{" "}
          <a href="/settings" className={styles.warningLink}>
            Settings page
          </a>{" "}
          to configure your OpenRouter API key before submitting.
        </div>
      )}

      {/* Code textarea */}
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

      {/* Actions Row */}
      <div
        style={{
          display: "flex",
          gap: "8px",
          alignItems: "center",
          marginTop: "16px",
          flexWrap: "wrap",
        }}
      >
        {/* Submit button */}
        <button
          className={`${styles.btn} ${styles.btnPrimary}`}
          style={{
            width: "auto",
            padding: "8px 16px",
            fontSize: "13px",
            margin: 0,
            borderRadius: "9999px",
            height: "32px",
          }}
          onClick={handleValidate}
          disabled={loading || !hasKey}
          data-testid="validate-btn"
          aria-busy={loading}
        >
          {loading ? (
            <>
              <span className={styles.validateSpinner} aria-hidden="true" />
              Validating…
            </>
          ) : (
            <>
              <span aria-hidden="true">✨</span>
              Validate with AI
            </>
          )}
        </button>

        {/* Prompt toggle button */}
        <button
          className={`${styles.hintTriggerBtn} ${showPrompt ? styles.hintTriggerBtnOpen : ""}`}
          onClick={() => setShowPrompt((v) => !v)}
          data-testid="prompt-toggle-btn"
          aria-expanded={showPrompt}
          type="button"
        >
          <span aria-hidden="true">{showPrompt ? "▾" : "▸"}</span>
          AI Validation Prompt
          <span
            className={styles.hintCountBadge}
            style={{ textTransform: "uppercase" }}
          >
            {challenge.validationConfig.strictness} ·{" "}
            {challenge.validationConfig.requiredPatterns.length} rules
          </span>
        </button>
      </div>

      {/* Prompt preview body */}
      {showPrompt && (
        <div
          className={styles.promptPreviewSection}
          style={{ marginTop: "12px" }}
        >
          <pre
            className={styles.promptPreview}
            data-testid="prompt-preview"
            aria-label="AI system prompt sent on submission"
          >
            {systemPromptPreview}
          </pre>
        </div>
      )}

      {/* Result */}
      {result.status && (
        <AiFeedbackResult
          status={result.status}
          feedback={result.feedback}
          xp={challenge.xp}
          challengeId={challenge.id}
        />
      )}
    </div>
  );
}
