"use client";

import { useState } from "react";
import { FormCard } from "./form-card";
import styles from "./forms.module.css";

const HINT =
  `Use <code>getByLabel('Email')</code> or <code>getByTestId('input-login-email')</code> to fill email. ` +
  `The password field has no <code>data-testid</code> — target it by <code>#login-password</code> or ` +
  `<code>getByLabel('Password')</code>. Assert the result span after clicking Login.`;

type Errors = { email: string; password: string };
const EMPTY: Errors = { email: "", password: "" };

function validate(email: string, password: string): Errors {
  const errors: Errors = { ...EMPTY };
  if (!email.trim()) errors.email = "Email is required.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()))
    errors.email = "Enter a valid email address.";
  if (!password) errors.password = "Password is required.";
  return errors;
}

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<Errors>(EMPTY);
  const [result, setResult] = useState<{ ok: boolean; msg: string } | null>(
    null,
  );

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate(email, password);
    if (errs.email || errs.password) {
      setErrors(errs);
      return;
    }
    setErrors(EMPTY);
    setResult({ ok: true, msg: `Login successful! Welcome, ${email}.` });
  }

  function handleReset() {
    setEmail("");
    setPassword("");
    setErrors(EMPTY);
    setResult(null);
  }

  return (
    <FormCard
      id="F01"
      title="Login Form"
      level="Beginner"
      hint={HINT}
      testId="form-login"
    >
      <form data-testid="form-login-inner" onSubmit={handleSubmit} noValidate>
        <div className={styles.fieldRow}>
          <label htmlFor="login-email" className={styles.label}>
            Email{" "}
            <span className={styles.required} aria-hidden="true">
              *
            </span>
          </label>
          <input
            id="login-email"
            name="email"
            type="email"
            placeholder="you@example.com"
            data-testid="input-login-email"
            className={`${styles.input} ${errors.email ? styles.inputError : ""}`}
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setErrors((p) => ({ ...p, email: "" }));
            }}
            aria-required="true"
            aria-describedby={errors.email ? "loginEmailError" : undefined}
          />
          {errors.email && (
            <span
              id="loginEmailError"
              data-testid="error-login-email"
              className={styles.errorMsg}
              role="alert"
            >
              {errors.email}
            </span>
          )}
        </div>

        {/* Hard locator: no data-testid — use #login-password or getByLabel */}
        <div className={styles.fieldRow}>
          <label htmlFor="login-password" className={styles.label}>
            Password{" "}
            <span className={styles.required} aria-hidden="true">
              *
            </span>
          </label>
          <input
            id="login-password"
            name="password"
            type="password"
            placeholder="Enter password"
            className={`${styles.input} ${errors.password ? styles.inputError : ""}`}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setErrors((p) => ({ ...p, password: "" }));
            }}
            aria-required="true"
            aria-describedby={
              errors.password ? "loginPasswordError" : undefined
            }
          />
          {errors.password && (
            <span
              id="loginPasswordError"
              data-testid="error-login-password"
              className={styles.errorMsg}
              role="alert"
            >
              {errors.password}
            </span>
          )}
        </div>

        <div className={styles.formActions}>
          <button
            id="loginSubmitBtn"
            type="submit"
            data-testid="btn-login-submit"
            className={styles.submitBtn}
          >
            Login
          </button>
          <button
            id="loginResetBtn"
            type="button"
            data-testid="btn-login-reset"
            className={styles.resetBtn}
            onClick={handleReset}
          >
            Reset
          </button>
        </div>
      </form>

      {result && (
        <div
          id="loginResult"
          data-testid="result-login"
          className={result.ok ? styles.successBanner : styles.errorBanner}
          role="alert"
        >
          {result.msg}
        </div>
      )}
    </FormCard>
  );
}
