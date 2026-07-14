"use client";

import { useEffect, useRef, useState } from "react";
import { TestingTips } from "../../_components/testing-tips";

/**
 * Section 2 — `beforeunload` leave-page warning (Advanced).
 * A ref mirrors the dirty flag so the native `beforeunload` listener
 * (registered once) always reads the latest value without re-subscribing.
 */
export function BeforeUnloadSection() {
  const [draft, setDraft] = useState("");
  const isDirtyRef = useRef(false);

  useEffect(() => {
    function handleBeforeUnload(e: BeforeUnloadEvent) {
      if (isDirtyRef.current) {
        e.preventDefault();
        e.returnValue = ""; // required for the prompt to show in modern browsers
      }
    }
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, []);

  function handleDraftChange(value: string) {
    setDraft(value);
    isDirtyRef.current = value.length > 0;
  }

  function handleReset() {
    setDraft("");
    isDirtyRef.current = false;
  }

  const isDirty = draft.length > 0;

  return (
    <section className="section">
      <h2>
        2. <code>beforeunload</code> — leave-page warning
        <span className="badge badge-orange">Advanced</span>
      </h2>

      <div className="field">
        <label htmlFor="draft-input" className="pt-1 pb-1">
          Edit this draft, then try to reload / navigate away
        </label>
        <input
          type="text"
          id="draft-input"
          data-testid="draft-input"
          placeholder="Type to make the page 'dirty'…"
          value={draft}
          onChange={(e) => handleDraftChange(e.target.value)}
        />
      </div>
      <div className="btn-row">
        <button
          type="button"
          className="secondary"
          id="reset-dirty-btn"
          onClick={handleReset}
        >
          Mark as Saved (clears warning)
        </button>
      </div>
      <p className="hint hint-mt-10" id="dirty-state" data-testid="dirty-state">
        State:{" "}
        {isDirty
          ? "dirty — leaving the page will warn you"
          : "clean (no warning)"}
      </p>

      {/* Show Tips  */}
      <TestingTips
        label="Tips"
        tips={[
          "Handle before unload alert.",
          "Enter text then try to reload / navigate away.",
          "Check alert type, message, defaultValue, then provide input text.",
          "Assert text value after accepting or dismissing.",
        ]}
      />
    </section>
  );
}
