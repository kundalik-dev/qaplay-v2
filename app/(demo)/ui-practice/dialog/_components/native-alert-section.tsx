"use client";

import { TestingTips } from "../../_components/testing-tips";

/**
 * Section 1 — native `alert()` (Beginner).
 * Only event handlers, no state — but still needs "use client" since it
 * calls browser globals (`alert`, `setTimeout`) from onClick handlers.
 */
export function NativeAlertSection() {
  return (
    <section className="section">
      <h2>
        1. Native <code>alert()</code>
        <span className="badge badge-green">Beginner</span>
      </h2>

      <div className="btn-row">
        <button
          type="button"
          id="simple-alert-btn"
          data-testid="simple-alert"
          onClick={() => alert("Hello! This is a simple alert.")}
        >
          Show Simple Alert
        </button>

        {/* alert fired after a delay — tests dialog auto-wait */}
        <button
          type="button"
          id="delayed-alert-btn"
          className="secondary"
          data-testid="delayed-alert"
          onClick={() =>
            setTimeout(() => alert("Delayed alert after 1.5s"), 1500)
          }
        >
          Show Delayed Alert (1.5s)
        </button>
      </div>

      {/* Show More  */}
      <TestingTips
        label="Tips"
        tips={[
          "Handle simple alert and delayed alert.",
          "Check type, message of simple alert and delayed alert.",
          "Check type, message of simple alert and delayed alert.",
        ]}
      />
    </section>
  );
}
