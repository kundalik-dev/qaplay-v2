"use client";

import { useRef, useState } from "react";
import { TestingTips } from "../../_components/testing-tips";

/**
 * Section 5 — native HTML `<dialog>` element (Intermediate).
 * Real DOM, not a JS dialog — locatable with normal role/testid queries.
 * `<form method="dialog">` auto-closes the dialog and sets `returnValue`
 * to the clicked button's `value`; the "close" event reads it back out.
 */
export function HtmlDialogSection() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [resultText, setResultText] = useState("returnValue will appear here…");

  function handleClose() {
    const dialog = dialogRef.current;
    setResultText(
      `Dialog closed. returnValue = "${dialog?.returnValue || "(none)"}"`,
    );
  }

  return (
    <section className="section">
      <h2>
        5. Native HTML <code>&lt;dialog&gt;</code> element
        <span className="badge badge-blue">Intermediate</span>
      </h2>

      <div className="btn-row">
        <button
          type="button"
          id="open-modal-dialog"
          data-testid="open-html-dialog"
          onClick={() => dialogRef.current?.showModal()}
        >
          Open Modal Dialog
        </button>
        <button
          type="button"
          id="open-nonmodal-dialog"
          className="secondary"
          data-testid="open-html-dialog-nonmodal"
          onClick={() => dialogRef.current?.show()}
        >
          Open Non-Modal
        </button>
      </div>

      {/* form method="dialog" auto-closes and exposes returnValue */}
      <dialog
        ref={dialogRef}
        id="html-dialog"
        data-testid="html-dialog"
        aria-labelledby="html-dialog-title"
        onClose={handleClose}
      >
        <h3 id="html-dialog-title">Confirm Subscription</h3>
        <p>Do you want to subscribe to the newsletter?</p>
        <form method="dialog" className="dialog-actions">
          <button
            value="cancel"
            className="secondary"
            data-testid="html-dialog-cancel"
          >
            Cancel
          </button>
          <button value="confirm" data-testid="html-dialog-confirm">
            Confirm
          </button>
        </form>
      </dialog>

      <div
        className="output-box"
        id="html-dialog-result"
        data-testid="html-dialog-result"
      >
        {resultText}
      </div>
      <p className="hint hint-mt-8">
        <code>&lt;form method=&quot;dialog&quot;&gt;</code> closes the dialog
        and sets <code>dialog.returnValue</code> to the clicked button&apos;s{" "}
        <code>value</code>.
      </p>

      {/* Show Tips  */}
      <TestingTips
        label="Tips"
        tips={[
          "Assert visibility of alert.",
          "Check alert type, message, defaultValue, then provide input text.",
          "Assert text value after accepting or dismissing.",
        ]}
      />
    </section>
  );
}
