"use client";

import { useState, useEffect } from "react";
import styles from "../challenges.module.css";
import { ChallengeMeta } from "@/data/challenges-registry";

export default function AiValidationBox({ challenge }: { challenge: ChallengeMeta }) {
  const [code, setCode] = useState(challenge.boilerplate);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ status: "success" | "fail" | null; feedback: string }>({ status: null, feedback: "" });
  const [hasKey, setHasKey] = useState(false);

  useEffect(() => {
    // Check if key exists on mount
    Promise.resolve().then(() => {
      const key = localStorage.getItem("qap_openrouter_key");
      if (key) setHasKey(true);
    });
  }, []);

  const handleValidate = async () => {
    const key = localStorage.getItem("qap_openrouter_key");
    const model = localStorage.getItem("qap_openrouter_model") || "openai/gpt-4o-mini";

    if (!key) {
      alert("Please configure your OpenRouter API Key in the Settings page first.");
      return;
    }

    setLoading(true);
    setResult({ status: null, feedback: "" });

    try {
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${key}`,
          "HTTP-Referer": window.location.origin,
          "X-Title": "QA Playground",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: model,
          messages: [
            {
              role: "system",
              content: `You are an expert Senior QA Engineer evaluating automated test scripts. 
Your job is to validate the user's code against the following requirement:
"${challenge.validationPrompt}"

Respond ONLY in valid JSON format with exactly two keys:
{
  "pass": boolean, // true if code meets requirements, false otherwise
  "feedback": string // 1-2 short sentences of constructive code review feedback
}
Do not wrap the JSON in markdown blocks.`
            },
            {
              role: "user",
              content: code
            }
          ]
        })
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
        setResult({
          status: parsed.pass ? "success" : "fail",
          feedback: parsed.feedback
        });

        if (parsed.pass) {
          // Save to local storage
          const completed = JSON.parse(localStorage.getItem("qap_completed_challenges") || "[]");
          if (!completed.includes(challenge.id)) {
            completed.push(challenge.id);
            localStorage.setItem("qap_completed_challenges", JSON.stringify(completed));
          }
        }
      } catch (_e) {
        setResult({ status: "fail", feedback: "Failed to parse AI response. Please try again." });
      }

    } catch (_err) {
      setResult({ status: "fail", feedback: "Network error occurred." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.panelSection}>
      <h2 className="heading-sm" style={{ marginBottom: '8px' }}>
        <span className="icon">🤖</span> Submit Solution (AI BYOK)
      </h2>
      <p className="body-sm text-muted" style={{ marginBottom: '16px' }}>
        Paste your automation script below. Our AI will analyze your code for correctness and best practices.
      </p>

      {!hasKey && (
        <div style={{ background: 'color-mix(in srgb, var(--warning) 10%, transparent)', padding: '12px', borderRadius: '8px', marginBottom: '16px', border: '1px solid color-mix(in srgb, var(--warning) 30%, transparent)', fontSize: '13px' }}>
          ⚠️ <strong>No API Key found.</strong> Go to the <a href="/settings" style={{ color: 'var(--accent)' }}>Settings page</a> to configure your OpenRouter API key before submitting.
        </div>
      )}

      <div className={styles.formGroup}>
        <label htmlFor="code-submission" style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-muted)' }}>Your Automation Script</label>
        <textarea 
          id="code-submission" 
          className={`${styles.inputField} ${styles.codeEditor}`}
          value={code}
          onChange={(e) => setCode(e.target.value)}
          spellCheck={false}
        />
      </div>

      <button 
        className={`btn btn-primary ${styles.btnSubmitSolution}`} 
        onClick={handleValidate}
        disabled={loading || !hasKey}
        style={{ marginTop: '16px', width: '100%', justifyContent: 'center' }}
      >
        <span className="icon">✨</span> {loading ? "Validating..." : "Validate with AI"}
      </button>

      {result.status && (
        <div className={`${styles.aiFeedbackResult} ${result.status === 'fail' ? styles.failState : ''}`} style={{ marginTop: '24px', padding: '16px', borderRadius: '8px' }}>
          <div className={styles.feedbackHeader}>
            <div className={styles.feedbackStatus}>
              <span className="icon" style={{ marginRight: '8px' }}>{result.status === 'success' ? '✅' : '❌'}</span> 
              <span>{result.status === 'success' ? 'Challenge Passed!' : 'Challenge Failed'}</span>
            </div>
            {result.status === 'success' && <span className={styles.xpAwarded}>+{challenge.xp} XP</span>}
          </div>
          <div>
            <p className="body-sm" style={{ color: 'var(--text-muted)', marginBottom: '12px' }}>
              <strong>AI Feedback:</strong>
            </p>
            <div className={styles.feedbackCodeReview}>
              <p className="body-sm" style={{ margin: 0 }}>{result.feedback}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
