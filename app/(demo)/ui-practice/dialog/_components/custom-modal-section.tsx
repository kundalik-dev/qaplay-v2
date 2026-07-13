"use client";

import { useEffect, useState } from "react";

/**
 * Section 6 — custom (div-based) modal (Intermediate -> Advanced).
 * A styled `div` with `role="dialog"` — the most common real-world case
 * (React/Vue modals). Three ways to close: the X button, Cancel/Confirm,
 * clicking the dark overlay, or Escape.
 */
export function CustomModalSection() {
  const [isOpen, setIsOpen] = useState(false);
  const [resultText, setResultText] = useState("Last close reason…");

  function close(reason: string) {
    setIsOpen(false);
    setResultText(`Closed via: ${reason}`);
  }

  // Esc key closes the custom modal (parity with native dialog behaviour)
  useEffect(() => {
    if (!isOpen) return;
    function handleKeydown(e: KeyboardEvent) {
      if (e.key === "Escape") close("escape");
    }
    document.addEventListener("keydown", handleKeydown);
    return () => document.removeEventListener("keydown", handleKeydown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  return (
    <section className="section">
      <h2>
        6. Custom Modal (overlay div)
        <span className="badge badge-blue">Intermediate</span> →{" "}
        <span className="badge badge-orange">Advanced</span>
      </h2>
      <p className="hint">
        The most common real-world case (React/Vue modals). It&apos;s just a styled{" "}
        <code>div</code> with <code>role=&quot;dialog&quot;</code>. Locate by
        role/testid; wait for it with <code>expect(modal).toBeVisible()</code>.
        Closing via overlay-click / Esc / X are 3 paths to test.
      </p>
      <div className="btn-row">
        <button
          type="button"
          id="open-custom-modal"
          data-testid="open-custom-modal"
          onClick={() => setIsOpen(true)}
        >
          Open Custom Modal
        </button>
      </div>

      <div
        className={`modal-overlay${isOpen ? " open" : ""}`}
        id="custom-modal-overlay"
        data-testid="custom-modal-overlay"
        onClick={(e) => {
          if (e.target === e.currentTarget) close("overlay");
        }}
      >
        <div
          className="modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby="custom-modal-title"
          data-testid="custom-modal"
        >
          <button
            type="button"
            className="modal-close"
            aria-label="Close"
            data-testid="custom-modal-close"
            onClick={() => close("x")}
          >
            &times;
          </button>
          <h3 id="custom-modal-title">Custom Modal Title</h3>
          <p>
            This modal lives in the DOM. Try closing via the ✕, the Cancel button,
            clicking the dark overlay, or pressing <kbd>Esc</kbd>.
          </p>
          <div className="modal-actions">
            <button
              type="button"
              className="secondary"
              data-testid="custom-modal-cancel"
              onClick={() => close("cancel")}
            >
              Cancel
            </button>
            <button
              type="button"
              className="danger"
              data-testid="custom-modal-confirm"
              onClick={() => close("confirm")}
            >
              Confirm
            </button>
          </div>
        </div>
      </div>

      <div className="output-box" id="custom-modal-result" data-testid="custom-modal-result">
        {resultText}
      </div>
    </section>
  );
}
