"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Building2, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { isValidEmail } from "../lib/utils";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email.trim()) {
      setError("Please enter your email address.");
      return;
    }
    if (!isValidEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setIsLoading(true);
    // Simulate network delay for loading state practice
    await new Promise((r) => setTimeout(r, 600));
    setIsLoading(false);
    setSubmitted(true);
  };

  return (
    <div
      className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-violet-950 px-4 py-12"
      data-testid="forgot-password-page"
      data-section="bank-forgot-password"
    >
      <div className="w-full max-w-sm">
        {/* Brand */}
        <div className="mb-8 flex flex-col items-center gap-3">
          <div
            className="flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-600 shadow-lg"
            aria-hidden="true"
          >
            <Building2 className="h-7 w-7 text-white" />
          </div>
          <div className="text-center">
            <h1 className="text-2xl font-bold text-white">SecureBank</h1>
            <p className="mt-0.5 text-sm text-slate-400">Reset your password</p>
          </div>
        </div>

        <div
          className="rounded-2xl border border-slate-700 bg-slate-800/80 p-6 shadow-xl backdrop-blur"
          data-testid="forgot-password-card"
        >
          {submitted ? (
            /* Success state — Beginner: getByTestId("forgot-password-success-msg") */
            <div
              className="text-center"
              data-testid="forgot-password-success"
            >
              <div
                className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-900/40 text-green-400"
                aria-hidden="true"
              >
                ✓
              </div>
              <p
                className="text-sm text-slate-300"
                data-testid="forgot-password-success-msg"
              >
                If an account with that email exists, you&apos;ll receive a
                reset link shortly.
              </p>
              <p className="mt-1 text-xs text-slate-500">
                Check your spam folder if you don&apos;t see it.
              </p>
              <Link
                href="/bank/login"
                className="mt-5 inline-flex items-center gap-1.5 text-sm text-violet-400 hover:text-violet-300 hover:underline"
                data-testid="back-to-login-link"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                Back to Sign In
              </Link>
            </div>
          ) : (
            <>
              <p className="mb-5 text-sm text-slate-400">
                Enter the email address associated with your account and
                we&apos;ll send you a link to reset your password.
              </p>

              {error && (
                <div
                  className="mb-4 rounded-lg border border-red-800 bg-red-900/40 px-3 py-2.5 text-sm text-red-300"
                  role="alert"
                  data-testid="forgot-password-error"
                >
                  {error}
                </div>
              )}

              {/* Beginner: getByLabel + getByTestId */}
              <form
                onSubmit={handleSubmit}
                data-testid="forgot-password-form"
                noValidate
              >
                <div className="mb-5">
                  <Label
                    htmlFor="forgot-email"
                    className="mb-1.5 block text-sm font-medium text-slate-300"
                  >
                    Email address
                  </Label>
                  <Input
                    id="forgot-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isLoading}
                    data-testid="forgot-email-input"
                    className="border-slate-600 bg-slate-700/60 text-white placeholder:text-slate-500 focus-visible:ring-violet-500"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  data-testid="forgot-password-submit-btn"
                  className="w-full bg-violet-600 hover:bg-violet-700"
                >
                  {isLoading ? "Sending…" : "Send Reset Link"}
                </Button>
              </form>

              <div className="mt-4 text-center">
                <Link
                  href="/bank/login"
                  className="inline-flex items-center gap-1.5 text-sm text-violet-400 hover:text-violet-300 hover:underline"
                  data-testid="back-to-login-link"
                >
                  <ArrowLeft className="h-3.5 w-3.5" />
                  Back to Sign In
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
