"use client";

import { useState } from "react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import styles from "../../../auth.module.css";

function Spinner() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      style={{ animation: "spin 0.7s linear infinite" }}
    >
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
      <circle
        cx="8"
        cy="8"
        r="6"
        stroke="currentColor"
        strokeWidth="2"
        strokeOpacity="0.25"
      />
      <path
        d="M14 8a6 6 0 0 0-6-6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setEmailError("");

    if (!email) {
      setEmailError("Email is required.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError("Enter a valid email address.");
      return;
    }

    setIsLoading(true);
    try {
      // better-auth always returns success to prevent email enumeration —
      // we never know whether the email exists. Always show the same message.
      await authClient.forgetPassword({
        email: email.trim().toLowerCase(),
        redirectTo: "/auth/reset-password",
      });
    } catch {
      // Swallow errors — show success regardless to prevent enumeration
    } finally {
      setIsLoading(false);
      setSubmitted(true);
    }
  }

  if (submitted) {
    return (
      <div
        className={styles["auth-card"]}
        data-testid="forgot-password-success"
      >
        <Link href="/" className={styles["auth-brand"]}>
          <span className={styles["auth-brand__dot"]} />
          QA Playground
        </Link>
        <div className={styles["auth-info-box"]}>
          <div className={styles["auth-info-icon"]}>📨</div>
          <h1 className={styles["auth-info-title"]}>Check your inbox</h1>
          <p className={styles["auth-info-body"]}>
            If <strong>{email}</strong> is associated with an account,
            you&apos;ll receive a password reset link shortly. It expires in{" "}
            <strong>1&nbsp;hour</strong>.
          </p>
          <Link href="/auth/sign-in" className={styles["auth-link"]}>
            Back to sign in
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles["auth-card"]} data-testid="forgot-password-card">
      <Link href="/" className={styles["auth-brand"]}>
        <span className={styles["auth-brand__dot"]} />
        QA Playground
      </Link>

      <h1 className={styles["auth-heading"]}>Forgot your password?</h1>
      <p className={styles["auth-subheading"]}>
        Enter your email and we&apos;ll send you a reset link.
      </p>

      <form
        onSubmit={handleSubmit}
        className={styles["auth-form"]}
        noValidate
        data-testid="forgot-password-form"
      >
        <div className={styles["auth-field"]}>
          <label htmlFor="email" className={styles["auth-label"]}>
            Email
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            className={styles["auth-input"]}
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setEmailError("");
            }}
            aria-invalid={!!emailError}
            aria-describedby={emailError ? "email-error" : undefined}
            data-testid="email-input"
          />
          {emailError && (
            <span
              id="email-error"
              className={styles["auth-field-error"]}
              role="alert"
            >
              {emailError}
            </span>
          )}
        </div>

        <button
          type="submit"
          className={`${styles["auth-btn"]} ${styles["auth-btn--primary"]}`}
          disabled={isLoading}
          data-testid="forgot-password-submit"
        >
          {isLoading ? <Spinner /> : null}
          {isLoading ? "Sending…" : "Send reset link"}
        </button>
      </form>

      <p className={styles["auth-footer"]}>
        Remember your password?{" "}
        <Link href="/auth/sign-in" className={styles["auth-link"]}>
          Sign in
        </Link>
      </p>
    </div>
  );
}
