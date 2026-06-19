"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import styles from "../../../auth.module.css";

function Spinner() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"
      style={{ animation: "spin 0.7s linear infinite" }}>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
      <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="2" strokeOpacity="0.25" />
      <path d="M14 8a6 6 0 0 0-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function validate(password: string, confirm: string) {
  const errors: { password?: string; confirm?: string } = {};
  if (!password) errors.password = "Password is required.";
  else if (password.length < 8) errors.password = "Password must be at least 8 characters.";
  else if (password.length > 128) errors.password = "Password is too long.";
  if (!confirm) errors.confirm = "Please confirm your password.";
  else if (password !== confirm) errors.confirm = "Passwords don't match.";
  return errors;
}

export function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // better-auth appends ?token=<value> to the reset URL
  const token = searchParams.get("token") ?? "";

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [fieldErrors, setFieldErrors] = useState<{
    password?: string;
    confirm?: string;
  }>({});
  const [serverError, setServerError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Guard: no token in URL means the link is broken/expired
  if (!token) {
    return (
      <div className={styles["auth-card"]} data-testid="reset-password-invalid">
        <Link href="/" className={styles["auth-brand"]}>
          <span className={styles["auth-brand__dot"]} />
          QA Playground
        </Link>
        <div className={styles["auth-info-box"]}>
          <div className={styles["auth-info-icon"]}>⚠️</div>
          <h1 className={styles["auth-info-title"]}>Invalid reset link</h1>
          <p className={styles["auth-info-body"]}>
            This password reset link is invalid or has expired.
            Please request a new one.
          </p>
          <Link href="/auth/forgot-password" className={styles["auth-link"]}>
            Request new link
          </Link>
        </div>
      </div>
    );
  }

  if (success) {
    return (
      <div className={styles["auth-card"]} data-testid="reset-password-success">
        <Link href="/" className={styles["auth-brand"]}>
          <span className={styles["auth-brand__dot"]} />
          QA Playground
        </Link>
        <div className={styles["auth-info-box"]}>
          <div className={styles["auth-info-icon"]}>✅</div>
          <h1 className={styles["auth-info-title"]}>Password updated</h1>
          <p className={styles["auth-info-body"]}>
            Your password has been reset successfully. You can now sign in with
            your new password.
          </p>
          <Link href="/auth/sign-in" className={styles["auth-link"]}>
            Sign in
          </Link>
        </div>
      </div>
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setServerError("");

    const errors = validate(password, confirm);
    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) return;

    setIsLoading(true);
    try {
      const { error } = await authClient.resetPassword({
        newPassword: password,
        token,
      });

      if (error) {
        if (error.message?.toLowerCase().includes("expired") ||
            error.message?.toLowerCase().includes("invalid")) {
          setServerError(
            "This reset link has expired or is invalid. Please request a new one.",
          );
        } else {
          setServerError("Something went wrong. Please try again.");
        }
      } else {
        setSuccess(true);
        // Redirect to sign-in after a short delay
        setTimeout(() => router.push("/auth/sign-in"), 2000);
      }
    } catch {
      setServerError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className={styles["auth-card"]} data-testid="reset-password-card">
      <Link href="/" className={styles["auth-brand"]}>
        <span className={styles["auth-brand__dot"]} />
        QA Playground
      </Link>

      <h1 className={styles["auth-heading"]}>Set new password</h1>
      <p className={styles["auth-subheading"]}>
        Choose a strong password for your account.
      </p>

      {serverError && (
        <p
          className={`${styles["auth-alert"]} ${styles["auth-alert--error"]}`}
          role="alert"
          data-testid="reset-password-error"
        >
          {serverError}{" "}
          {serverError.includes("expired") && (
            <Link href="/auth/forgot-password" className={styles["auth-link"]}>
              Request new link
            </Link>
          )}
        </p>
      )}

      <form
        onSubmit={handleSubmit}
        className={styles["auth-form"]}
        noValidate
        data-testid="reset-password-form"
      >
        <div className={styles["auth-field"]}>
          <label htmlFor="password" className={styles["auth-label"]}>
            New password
          </label>
          <input
            id="password"
            type="password"
            autoComplete="new-password"
            placeholder="At least 8 characters"
            className={styles["auth-input"]}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setFieldErrors((p) => ({ ...p, password: undefined }));
            }}
            aria-invalid={!!fieldErrors.password}
            aria-describedby={
              fieldErrors.password ? "password-error" : "password-hint"
            }
            data-testid="password-input"
          />
          {fieldErrors.password ? (
            <span id="password-error" className={styles["auth-field-error"]} role="alert">
              {fieldErrors.password}
            </span>
          ) : (
            <span id="password-hint" className={styles["auth-hint"]}>
              Must be 8–128 characters.
            </span>
          )}
        </div>

        <div className={styles["auth-field"]}>
          <label htmlFor="confirm" className={styles["auth-label"]}>
            Confirm password
          </label>
          <input
            id="confirm"
            type="password"
            autoComplete="new-password"
            placeholder="Repeat your password"
            className={styles["auth-input"]}
            value={confirm}
            onChange={(e) => {
              setConfirm(e.target.value);
              setFieldErrors((p) => ({ ...p, confirm: undefined }));
            }}
            aria-invalid={!!fieldErrors.confirm}
            aria-describedby={fieldErrors.confirm ? "confirm-error" : undefined}
            data-testid="confirm-password-input"
          />
          {fieldErrors.confirm && (
            <span id="confirm-error" className={styles["auth-field-error"]} role="alert">
              {fieldErrors.confirm}
            </span>
          )}
        </div>

        <button
          type="submit"
          className={`${styles["auth-btn"]} ${styles["auth-btn--primary"]}`}
          disabled={isLoading}
          data-testid="reset-password-submit"
        >
          {isLoading ? <Spinner /> : null}
          {isLoading ? "Updating…" : "Update password"}
        </button>
      </form>
    </div>
  );
}
