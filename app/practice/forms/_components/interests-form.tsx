"use client";

import { useState } from "react";
import { FormCard } from "./form-card";
import styles from "./forms.module.css";

const HINT =
  `All checkboxes share <code>data-testid</code> following the pattern <code>checkbox-interest-{name}</code>. ` +
  `To locate a specific one, use <code>getByTestId("checkbox-interest-playwright")</code>. ` +
  `The "at least one required" error has <strong>no data-testid and no id</strong> — ` +
  `assert it with <code>getByText(/select at least/i)</code> or XPath ` +
  `<code>//p[contains(text(),"select at least")]</code>.`;

const ITEMS = [
  { id: "interest-selenium",   testId: "checkbox-interest-selenium",   value: "selenium",   label: "Selenium" },
  { id: "interest-playwright", testId: "checkbox-interest-playwright", value: "playwright", label: "Playwright" },
  { id: "interest-cypress",    testId: "checkbox-interest-cypress",    value: "cypress",    label: "Cypress" },
  { id: "interest-appium",     testId: "checkbox-interest-appium",     value: "appium",     label: "Appium" },
  { id: "interest-jest",       testId: "checkbox-interest-jest",       value: "jest",       label: "Jest" },
];

export function InterestsForm() {
  const [selected, setSelected] = useState<string[]>([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  function toggle(value: string, checked: boolean) {
    setSelected((prev) => checked ? [...prev, value] : prev.filter((v) => v !== value));
    if (error) setError("");
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!selected.length) { setError("Please select at least one interest."); return; }
    setError("");
    const labels = ITEMS.filter((i) => selected.includes(i.value)).map((i) => i.label);
    setSuccess(`Interests saved: ${labels.join(", ")}`);
  }

  function handleReset() { setSelected([]); setError(""); setSuccess(""); }

  return (
    <FormCard id="F04" title="Interests Form" level="Medium"
      hint={HINT} testId="form-interests">
      <form data-testid="form-interests-inner"
        data-testid-group="checkbox-group-interests"
        onSubmit={handleSubmit} noValidate>

        <div className={styles.fieldRow}>
          <span className={styles.label}>
            Select Interests <span className={styles.required}>*</span>
          </span>

          <div className={styles.checkboxGroup} data-testid="checkbox-group-interests">
            {ITEMS.map((item) => (
              <label key={item.value} htmlFor={item.id} className={styles.checkboxLabel}>
                <input
                  id={item.id} name="interests" type="checkbox" value={item.value}
                  data-testid={item.testId} data-interest={item.value}
                  className={styles.checkboxInput}
                  checked={selected.includes(item.value)}
                  onChange={(e) => toggle(item.value, e.target.checked)} />
                {item.label}
              </label>
            ))}
          </div>

          {/* Challenge locator: no data-testid, no id — use getByText or XPath */}
          {error && (
            <p className={styles.errorMsg} role="alert">{error}</p>
          )}
        </div>

        <div className={styles.formActions}>
          <button id="interestsSubmitBtn" type="submit"
            data-testid="btn-interests-submit" className={styles.submitBtn}>Save Interests</button>
          <button type="button" data-testid="btn-interests-reset"
            className={styles.resetBtn} onClick={handleReset}>Reset</button>
        </div>
      </form>

      {success && (
        <div id="interestsResult" data-testid="result-interests"
          className={styles.successBanner} role="status">{success}</div>
      )}
    </FormCard>
  );
}
