"use client";

import { useState } from "react";
import { FormCard } from "./form-card";
import styles from "./forms.module.css";

const HINT =
  `Password mismatch: fill <code>#password</code> and <code>#confirmPassword</code> with different values, ` +
  `then assert <code>[data-testid="error-confirm-password"]</code> has text <em>Passwords do not match.</em> ` +
  `The terms error span has <code>id="termsError"</code> but <strong>no data-testid</strong> — ` +
  `locate it via <code>#termsError</code>, <code>getByText(/must accept/i)</code>, or ancestor XPath. ` +
  `On success, assert <code>[data-testid="form-success-msg"]</code> and <code>[data-testid="submitted-name"]</code>.`;

type Vals = { password: string; confirmPassword: string; terms: boolean };
type Errs = { password: string; confirmPassword: string; terms: string };
const EMPTY_V: Vals = { password: "", confirmPassword: "", terms: false };
const EMPTY_E: Errs = { password: "", confirmPassword: "", terms: "" };

function validate(v: Vals): Errs {
  const e: Errs = { ...EMPTY_E };
  if (!v.password) e.password = "Password is required.";
  else if (v.password.length < 6)
    e.password = "Password must be at least 6 characters.";
  if (!v.confirmPassword) e.confirmPassword = "Please confirm your password.";
  else if (v.password !== v.confirmPassword)
    e.confirmPassword = "Passwords do not match.";
  if (!v.terms) e.terms = "You must accept the Terms & Conditions.";
  return e;
}

export function AccountSetupForm() {
  const [vals, setVals] = useState<Vals>(EMPTY_V);
  const [errs, setErrs] = useState<Errs>(EMPTY_E);
  const [success, setSuccess] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const newErrs = validate(vals);
    if (Object.values(newErrs).some(Boolean)) {
      setErrs(newErrs);
      return;
    }
    setErrs(EMPTY_E);
    setSuccess(true);
  }

  function handleReset() {
    setVals(EMPTY_V);
    setErrs(EMPTY_E);
    setSuccess(false);
  }

  if (success) {
    return (
      <FormCard
        id="F05"
        title="Account Setup Form"
        level="Challenge"
        hint={HINT}
        testId="form-account-setup"
      >
        <div
          id="formSuccessMsg"
          data-testid="form-success-msg"
          className={styles.successCard}
          role="alert"
        >
          <div className={styles.successIcon}>✓</div>
          <p className={styles.successTitle}>Account Setup Complete!</p>
          <p
            id="submittedName"
            data-testid="submitted-name"
            className={styles.successBody}
          >
            Your account has been secured.
          </p>
          <button
            type="button"
            data-testid="btn-fill-again"
            className={styles.fillAgainBtn}
            onClick={handleReset}
          >
            Fill Again
          </button>
        </div>
      </FormCard>
    );
  }

  return (
    <FormCard
      id="F05"
      title="Account Setup Form"
      level="Challenge"
      hint={HINT}
      testId="form-account-setup"
    >
      <form
        id="registrationForm"
        data-testid="registration-form"
        onSubmit={handleSubmit}
        noValidate
      >
        {/* Password — beginner */}
        <div className={styles.fieldRow}>
          <label htmlFor="password" className={styles.label}>
            Password <span className={styles.required}>*</span>
          </label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Min. 6 characters"
            data-testid="input-password"
            className={`${styles.input} ${errs.password ? styles.inputError : ""}`}
            value={vals.password}
            onChange={(e) => {
              setVals((p) => ({ ...p, password: e.target.value }));
              setErrs((p) => ({ ...p, password: "" }));
            }}
            aria-required="true"
            aria-describedby={errs.password ? "passwordError" : undefined}
            autoComplete="new-password"
          />
          {errs.password && (
            <span
              id="passwordError"
              data-testid="error-password"
              className={styles.errorMsg}
              role="alert"
            >
              {errs.password}
            </span>
          )}
        </div>

        {/* Confirm Password — beginner + challenge mismatch */}
        <div className={styles.fieldRow}>
          <label htmlFor="confirmPassword" className={styles.label}>
            Confirm Password <span className={styles.required}>*</span>
          </label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            placeholder="Re-enter password"
            data-testid="input-confirm-password"
            className={`${styles.input} ${errs.confirmPassword ? styles.inputError : ""}`}
            value={vals.confirmPassword}
            onChange={(e) => {
              setVals((p) => ({ ...p, confirmPassword: e.target.value }));
              setErrs((p) => ({ ...p, confirmPassword: "" }));
            }}
            aria-required="true"
            aria-describedby={
              errs.confirmPassword ? "confirmPasswordError" : undefined
            }
            autoComplete="new-password"
          />
          {errs.confirmPassword && (
            <span
              id="confirmPasswordError"
              data-testid="error-confirm-password"
              className={styles.errorMsg}
              role="alert"
            >
              {errs.confirmPassword}
            </span>
          )}
        </div>

        {/* Terms — challenge: error has id but NO data-testid */}
        <div className={styles.fieldRow}>
          <label
            htmlFor="terms"
            className={`${styles.checkboxLabel} ${styles.termsLabel}`}
          >
            <input
              id="terms"
              name="terms"
              type="checkbox"
              data-testid="checkbox-terms"
              className={styles.checkboxInput}
              checked={vals.terms}
              onChange={(e) => {
                setVals((p) => ({ ...p, terms: e.target.checked }));
                setErrs((p) => ({ ...p, terms: "" }));
              }}
            />
            I agree to the Terms &amp; Conditions
          </label>
          {errs.terms && (
            <span id="termsError" className={styles.errorMsg} role="alert">
              {errs.terms}
            </span>
          )}
        </div>

        <div className={styles.formActions}>
          <button
            id="submitFormBtn"
            type="submit"
            data-testid="submit-form-btn"
            data-cta="submit"
            className={styles.submitBtn}
          >
            Submit
          </button>
          <button
            id="resetFormBtn"
            type="button"
            data-testid="reset-form-btn"
            data-cta="reset"
            className={styles.resetBtn}
            onClick={handleReset}
          >
            Reset
          </button>
        </div>
      </form>
    </FormCard>
  );
}
