"use client";

import { useState } from "react";

type ConfirmOutcome = "accepted" | "dismissed" | null;

/**
 * Section 2 — native `confirm()` OK/Cancel (Beginner).
 * Mirrors the original `handleConfirm()` — writes the outcome into
 * #confirm-result instead of relying on reading the dialog directly.
 */
export function NativeConfirmSection() {
  const [outcome, setOutcome] = useState<ConfirmOutcome>(null);

  function handleConfirm() {
    const ok = confirm(
      "Are you sure you want to delete your account? This cannot be undone.",
    );
    setOutcome(ok ? "accepted" : "dismissed");
  }

  const resultText =
    outcome === "accepted"
      ? "Account deleted (you clicked OK)."
      : outcome === "dismissed"
        ? "Deletion cancelled (you clicked Cancel)."
        : "Result will appear here…";

  const resultClass =
    outcome === "accepted"
      ? "text-danger"
      : outcome === "dismissed"
        ? "text-success"
        : "";

  return (
    <section className="section">
      <h2>
        2. <code>confirm()</code> — OK / Cancel
        <span className="badge badge-green">Beginner</span>
      </h2>
      <div className="btn-row">
        <button
          type="button"
          id="confirm-btn"
          data-testid="confirm-action"
          onClick={handleConfirm}
        >
          Delete Account
        </button>
      </div>
      {/* result is written to the DOM so you can assert WITHOUT reading the dialog */}
      <div
        className={`output-box${resultClass ? ` ${resultClass}` : ""}`}
        id="confirm-result"
        data-testid="confirm-result"
      >
        {resultText}
      </div>
      <p className="hint hint-mt-8">
        Best-practice assertion: don&apos;t just read{" "}
        <code>dialog.message()</code> — verify the <strong>side effect</strong>{" "}
        in <code>#confirm-result</code> after accept vs dismiss.
      </p>
    </section>
  );
}
