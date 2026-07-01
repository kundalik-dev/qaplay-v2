"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Copy } from "lucide-react";
import { Toaster } from "@/components/ui/sonner";
import { useBankStore } from "../store/useBankStore";
import "../styles/bank.css";

/* ── SVG Bank Icon ─────────────────────────────────────────────── */
function BankIcon() {
  return (
    <svg
      width="72"
      height="72"
      viewBox="0 0 72 72"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="bankIconGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#7C3AED" />
          <stop offset="100%" stopColor="#EC4899" />
        </linearGradient>
      </defs>
      <rect
        x="10"
        y="28"
        width="10"
        height="28"
        rx="2"
        fill="url(#bankIconGrad)"
      />
      <rect
        x="31"
        y="28"
        width="10"
        height="28"
        rx="2"
        fill="url(#bankIconGrad)"
      />
      <rect
        x="52"
        y="28"
        width="10"
        height="28"
        rx="2"
        fill="url(#bankIconGrad)"
      />
      <path d="M4 28 L36 8 L68 28 Z" fill="url(#bankIconGrad)" opacity="0.9" />
      <rect
        x="4"
        y="56"
        width="64"
        height="8"
        rx="3"
        fill="url(#bankIconGrad)"
      />
    </svg>
  );
}

function EyeIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function EyeOffIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  );
}

const DEMO_CREDENTIALS = [
  { role: "Full Access", username: "admin", password: "admin123" },
  { role: "Read-only", username: "viewer", password: "viewer123" },
];

export default function LoginPage() {
  const { login } = useBankStore();
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    const trimmedUser = username.trim();
    const trimmedPass = password.trim();

    if (!trimmedUser || !trimmedPass) {
      setError("Please enter both username and password.");
      return;
    }

    const match = DEMO_CREDENTIALS.find(
      (c) => c.username === trimmedUser && c.password === trimmedPass,
    );

    if (!match) {
      setError("Invalid credentials. Check the demo credentials below.");
      return;
    }

    login(trimmedUser, match.role);
    router.push("/demo/bank/dashboard");
  };

  const handleClear = () => {
    setUsername("");
    setPassword("");
    setError("");
    setRememberMe(false);
  };

  const handleCopyCredential = async (value: string, label: string) => {
    try {
      await navigator.clipboard.writeText(value);
      toast.success(`${label} copied`, { description: value });
    } catch {
      toast.error(`Couldn't copy ${label.toLowerCase()}`);
    }
  };

  return (
    <div
      className="bank-login-page"
      data-testid="bank-login-page"
      data-section="bank-login"
    >
      <Toaster position="top-center" />
      <div
        className="bank-login-container"
        data-testid="bank-login-container"
      >
        {/* Left branding panel */}
        <div className="bank-login-left" data-testid="bank-login-branding">
          <div className="bank-login-left-inner">
            <div className="bank-login-icon-circle" aria-hidden="true">
              <BankIcon />
            </div>
            <p className="bank-login-welcome">
              Welcome to
              <br />
              <span>SecureBank</span>
            </p>
            <p className="bank-login-tagline">
              Your premier automation testing practice ground. Master complex
              UI interactions, state management, and end-to-end testing
              scenarios.
            </p>

            {/* Demo credentials — shown under branding */}
            <div
              className="bank-credentials-section"
              data-testid="demo-credentials"
            >
              <p className="bank-credentials-title">Demo Credentials</p>
              <div className="bank-credentials-cards">
                {DEMO_CREDENTIALS.map((cred) => (
                  <div
                    key={cred.username}
                    className="bank-cred-card"
                    data-role={cred.role.toLowerCase().replace(" ", "-")}
                  >
                    <span className="bank-cred-role">{cred.role}</span>
                    <div className="bank-cred-row">
                      <span className="bank-cred-key">Username</span>
                      <button
                        type="button"
                        className="bank-cred-badge-btn"
                        data-testid={`copy-username-${cred.username}`}
                        data-copy-value="username"
                        aria-label={`Copy username ${cred.username}`}
                        onClick={() =>
                          handleCopyCredential(cred.username, "Username")
                        }
                      >
                        <span
                          className="bank-cred-badge"
                          data-testid={`cred-username-${cred.username}`}
                        >
                          {cred.username}
                        </span>
                        <Copy className="bank-cred-copy-icon" aria-hidden="true" />
                      </button>
                    </div>
                    <div className="bank-cred-row">
                      <span className="bank-cred-key">Password</span>
                      <button
                        type="button"
                        className="bank-cred-badge-btn"
                        data-testid={`copy-password-${cred.username}`}
                        data-copy-value="password"
                        aria-label={`Copy password for ${cred.username}`}
                        onClick={() =>
                          handleCopyCredential(cred.password, "Password")
                        }
                      >
                        <span
                          className="bank-cred-badge"
                          data-testid={`cred-password-${cred.username}`}
                        >
                          {cred.password}
                        </span>
                        <Copy className="bank-cred-copy-icon" aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right form card */}
        <div className="bank-login-right">
          <div className="bank-login-card" data-testid="bank-login-card">
            <div className="bank-login-card-logo" aria-hidden="true">
              <BankIcon />
            </div>
            <h1 className="bank-login-card-title" data-testid="login-header">
              Sign in to SecureBank
            </h1>
            <p className="bank-login-card-subtitle">
              Enter your credentials to continue
            </p>

            {error && (
              <div
                className="bank-login-error"
                role="alert"
                data-testid="login-error"
              >
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} data-testid="login-form" noValidate>
              <div className="bank-form-group">
                <label htmlFor="username" className="bank-form-label">
                  Username
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="bank-form-input"
                  placeholder="Enter your username"
                  autoComplete="username"
                  data-testid="login-username"
                />
              </div>

              <div className="bank-form-group">
                <label htmlFor="password" className="bank-form-label">
                  Password
                </label>
                <div className="bank-password-wrapper">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bank-form-input"
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    data-testid="login-password"
                  />
                  <button
                    type="button"
                    className="bank-password-toggle"
                    onClick={() => setShowPassword((v) => !v)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    data-testid="password-toggle"
                  >
                    {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                  </button>
                </div>
              </div>

              <div className="bank-remember-row">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="bank-remember-checkbox"
                  data-testid="login-remember-me"
                />
                <label htmlFor="remember-me" className="bank-remember-label">
                  Remember me
                </label>
              </div>

              <button
                type="submit"
                className="bank-login-btn"
                data-testid="login-submit"
              >
                Login
              </button>

              <button
                type="button"
                className="bank-clear-btn"
                onClick={handleClear}
                data-testid="login-clear"
              >
                Clear
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
