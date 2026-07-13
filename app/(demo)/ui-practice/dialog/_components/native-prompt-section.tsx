"use client";

import { useState } from "react";
import { TestingTips } from "../../_components/testing-tips";

/**
 * Section 3 — native `prompt()` text input (Intermediate).
 * Mirrors the original `handlePrompt()` 3-way branch: text / empty / dismiss.
 */
export function NativePromptSection() {
  const [resultText, setResultText] = useState("Greeting will appear here…");

  function handlePrompt() {
    const name = prompt("What is your name?", "Guest");
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
        3. <code>prompt()</code> — text input
        <span className="badge badge-blue">Intermediate</span>
      </h2>

      <div className="btn-row">
        <button
          type="button"
          id="prompt-btn"
          data-testid="prompt-action"
          onClick={handlePrompt}
        >
          Enter Your Name
        </button>
      </div>
      <div
        className="output-box"
        id="prompt-result"
        data-testid="prompt-result"
      >
        {resultText}
      </div>

      {/* Show Tips  */}
      <TestingTips
        label="Tips"
        tips={[
          "Handle prompt alert.",
          "Check alert type, message, defaultValue, then provide input text.",
          "Assert text value after accepting or dismissing.",
        ]}
      />
    </section>
  );
}
