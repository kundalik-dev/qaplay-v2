"use client";

import { useRef, useState } from "react";
import { TestingTips } from "../../_components/testing-tips";

interface ToastItem {
  id: number;
  message: string;
  type: "success" | "error";
}

/**
 * Section 7 — toast / snackbar auto-dismiss (Advanced).
 * Appears then disappears after ~3s — a classic flaky-test trap. The
 * original prototype's `#toast-stack` had no data-testid (only an id),
 * kept that way here; each toast keeps the source's shared,
 * non-unique `data-testid="toast"`.
 */
export function ToastSection() {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const nextId = useRef(0);

  function showToast(message: string, type: ToastItem["type"]) {
    const id = nextId.current++;
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  }

  return (
    <section className="section">
      <h2>
        7. Toast / Snackbar (auto-dismiss)
        <span className="badge badge-orange">Advanced</span>
      </h2>
      <p className="hint">
        Appears then disappears after ~3s — a classic flaky-test trap.
      </p>
      <div className="btn-row">
        <button
          type="button"
          className="secondary"
          data-testid="toast-success"
          onClick={() => showToast("Saved successfully!", "success")}
        >
          Trigger Success Toast
        </button>
        <button
          type="button"
          className="danger"
          data-testid="toast-error"
          onClick={() => showToast("Something went wrong.", "error")}
        >
          Trigger Error Toast
        </button>
      </div>

      {/* toast mount point */}
      <div className="toast-stack" id="toast-stack">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`toast ${t.type}`}
            role="status"
            data-testid="toast"
          >
            {t.message}
          </div>
        ))}
      </div>

      {/* Show Tips  */}
      <TestingTips
        label="Tips"
        tips={[
          "Handle toast which appear for 3sec then disapper.",
          "Check alert type, message, defaultValue, then provide input text.",
          "Assert text value before disappearing.",
          `Assert with web-first toBeVisible() immediately, then toBeHidden() after 3s. without hardcoding wait.`,
        ]}
      />
    </section>
  );
}
