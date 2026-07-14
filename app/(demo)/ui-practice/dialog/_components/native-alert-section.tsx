"use client";

import { useState } from "react";
import { TestingTips } from "../../_components/testing-tips";

/**
 * Section 1 — native `alert()` / `confirm()` / `prompt()`, merged into a
 * single card (Beginner → Intermediate). All three fire browser-native
 * dialogs, so they share one card and one result box instead of three.
 */
export function NativeAlertSection() {
  const [resultText, setResultText] = useState("Greeting will appear here…");
  const [resultClass, setResultClass] = useState("");

  function handleConfirm() {
    const ok = confirm(
      "Are you sure you want to delete your account? This cannot be undone.",
    );
    if (ok) {
      setResultText("Account deleted (you clicked OK).");
      setResultClass("text-danger");
    } else {
      setResultText("Deletion cancelled (you clicked Cancel).");
      setResultClass("text-success");
    }
  }

  function handlePrompt() {
    const name = prompt("What is your name?", "Guest");
    setResultClass("");
    if (name === null) {
      setResultText("You dismissed the prompt (returned null).");
    } else if (name.trim() === "") {
      setResultText("Hello, anonymous! (empty string submitted)");
    } else {
      setResultText(`Hello, ${name}! Welcome aboard.`);
    }
  }

  return (
    <section className="section">
      <h2>
        1. Native <code>alert()</code> / <code>confirm()</code> /{" "}
        <code>prompt()</code>
        <span className="badge badge-green">Beginner</span>{" "}
        <span className="badge badge-blue">Intermediate</span>
      </h2>

      <div className="btn-row pt-5 pb-5">
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

        <button
          type="button"
          id="confirm-btn"
          data-testid="confirm-action"
          onClick={handleConfirm}
        >
          Delete Account
        </button>

        <button
          type="button"
          id="prompt-btn"
          data-testid="prompt-action"
          onClick={handlePrompt}
        >
          Enter Your Name
        </button>
      </div>

      {/* result is written to the DOM so you can assert WITHOUT reading the dialog */}
      <div
        className={`output-box${resultClass ? ` ${resultClass}` : ""}`}
        id="native-dialog-result"
        data-testid="native-dialog-result"
      >
        {resultText}
      </div>

      {/* Show Tips  */}
      <TestingTips
        label="Tips"
        tips={[
          "Handle simple alert and delayed alert.",
          "Check type, message of simple alert and delayed alert.",
          "Handle confirm alert; check type, message, defaultValue.",
          "Handle prompt alert; check type, message, defaultValue, then provide input text.",
          "Assert result text after accepting or dismissing confirm/prompt.",
        ]}
      />
    </section>
  );
}
