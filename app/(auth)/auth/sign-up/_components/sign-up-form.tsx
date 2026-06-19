"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import styles from "../../auth.module.css";

// ── Google icon ──────────────────────────────────────────────────────────────
function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
      <path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z" />
      <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332C2.438 15.983 5.482 18 9 18z" />
      <path fill="#FBBC05" d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" />
      <path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0 5.482 0 2.438 2.017.957 4.958L3.964 6.29C4.672 4.163 6.656 3.58 9 3.58z" />
    </svg>
  );
}

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

// ── Validation ───────────────────────────────────────────────────────────────
function validateSignUp(name: string, email: string, password: string) {
  const errors: { name?: string; email?: string; password?: string } = {};

  if (!name.trim()) errors.name = "Name is required.";
  else if (name.trim().length < 2) errors.name = "Name must be at least 2 characters.";
  else if (name.trim().length > 100) errors.name = "Name is too long.";

  if (!email) errors.email = "Email is required.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    errors.email = "Enter a valid email address.";

  if (!password) errors.password = "Password is required.";
  else if (password.length < 8)
    errors.password = "Password must be at least 8 characters.";
  else if (password.length > 128)
    errors.password = "Password is too long.";

  return errors;
}

// ── Component ────────────────────────────────────────────────────────────────
export function SignUpForm() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fieldErrors, setFieldErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
  }>({});
  const [serverError, setServerError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setServerError("");

    const errors = validateSignUp(name, email, password);
    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) return;

    setIsLoading(true);
    try {
      const { error } = await authClient.signUp.email({
        name: name.trim(),
        email: email.trim().toLowerCase(),
        password,
        callbackURL: "/dashboard",
      });

      if (error) {
        if (error.status === 422 || error.message?.toLowerCase().includes("already")) {
          // Generic message — don't confirm whether the email exists
          setServerError(
            "Unable to create account. If you already have an account, try signing in.",
          );
        } else {
          setServerError("Something went wrong. Please try again.");
        }
      } else {
        // Registration succeeded — user must verify email
        setSuccess(true);
      }
    } catch {
      setServerError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  async function handleGoogleSignIn() {
    setServerError("");
    setIsGoogleLoading(true);
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/dashboard",
      });
    } catch {
      setServerError("Google sign-in failed. Please try again.");
      setIsGoogleLoading(false);
    }
  }

  // ── Success state ──────────────────────────────────────────────────────────
  if (success) {
    return (
      <div className={styles["auth-card"]} data-testid="sign-up-success">
        <Link href="/" className={styles["auth-brand"]}>
          <span className={styles["auth-brand__dot"]} />
          QA Playground
        </Link>
        <div className={styles["auth-info-box"]}>
          <div className={styles["auth-info-icon"]}>📬</div>
          <h1 className={styles["auth-info-title"]}>Check your email</h1>
          <p className={styles["auth-info-body"]}>
            We sent a verification link to <strong>{email}</strong>.
            Click it to activate your account — the link expires in 24&nbsp;hours.
          </p>
          <Link href="/auth/sign-in" className={styles["auth-link"]}>
            Back to sign in
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles["auth-card"]} data-testid="sign-up-card">
      {/* Brand */}
      <Link href="/" className={styles["auth-brand"]}>
        <span className={styles["auth-brand__dot"]} />
        QA Playground
      </Link>

      <h1 className={styles["auth-heading"]}>Create your account</h1>
      <p className={styles["auth-subheading"]}>
        Start practising automation on real UI elements.
      </p>

      {/* Google */}
      <button
        type="button"
        className={`${styles["auth-btn"]} ${styles["auth-btn--google"]}`}
        onClick={handleGoogleSignIn}
        disabled={isGoogleLoading || isLoading}
        data-testid="google-sign-up-btn"
        aria-label="Sign up with Google"
      >
        {isGoogleLoading ? <Spinner /> : <GoogleIcon />}
        Continue with Google
      </button>

      <div className={styles["auth-divider"]}>or</div>

      {/* Server error */}
      {serverError && (
        <p
          className={`${styles["auth-alert"]} ${styles["auth-alert--error"]}`}
          role="alert"
          data-testid="sign-up-error"
        >
          {serverError}
        </p>
      )}

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className={styles["auth-form"]}
        noValidate
        data-testid="sign-up-form"
      >
        {/* Name */}
        <div className={styles["auth-field"]}>
          <label htmlFor="name" className={styles["auth-label"]}>Full name</label>
          <input
            id="name"
            type="text"
            autoComplete="name"
            placeholder="Jane Smith"
            className={styles["auth-input"]}
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setFieldErrors((p) => ({ ...p, name: undefined }));
            }}
            aria-invalid={!!fieldErrors.name}
            aria-describedby={fieldErrors.name ? "name-error" : undefined}
            data-testid="name-input"
          />
          {fieldErrors.name && (
            <span id="name-error" className={styles["auth-field-error"]} role="alert">
              {fieldErrors.name}
            </span>
          )}
        </div>

        {/* Email */}
        <div className={styles["auth-field"]}>
          <label htmlFor="email" className={styles["auth-label"]}>Email</label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            className={styles["auth-input"]}
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setFieldErrors((p) => ({ ...p, email: undefined }));
            }}
            aria-invalid={!!fieldErrors.email}
            aria-describedby={fieldErrors.email ? "email-error" : undefined}
            data-testid="email-input"
          />
          {fieldErrors.email && (
            <span id="email-error" className={styles["auth-field-error"]} role="alert">
              {fieldErrors.email}
            </span>
          )}
        </div>

        {/* Password */}
        <div className={styles["auth-field"]}>
          <label htmlFor="password" className={styles["auth-label"]}>Password</label>
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

        {/* Submit */}
        <button
          type="submit"
          className={`${styles["auth-btn"]} ${styles["auth-btn--primary"]}`}
          disabled={isLoading || isGoogleLoading}
          data-testid="sign-up-submit"
        >
          {isLoading ? <Spinner /> : null}
          {isLoading ? "Creating account…" : "Create account"}
        </button>
      </form>

      {/* Footer */}
      <p className={styles["auth-footer"]}>
        Already have an account?{" "}
        <Link href="/auth/sign-in" className={styles["auth-link"]} data-testid="sign-in-link">
          Sign in
        </Link>
      </p>
    </div>
  );
}
