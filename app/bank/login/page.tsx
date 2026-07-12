"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Building2, Check, Copy, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useBankAppStore } from "../store/useBankAppStore";

export default function BankLoginPage() {
  const router = useRouter();
  const { login, seedIfNeeded } = useBankAppStore();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const handleCopy = async (value: string, fieldKey: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedField(fieldKey);
      setTimeout(() => {
        setCopiedField((current) => (current === fieldKey ? null : current));
      }, 1200);
    } catch {
      // Clipboard API unavailable — silently ignore
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!username.trim()) {
      setError("Please enter your username.");
      return;
    }
    if (!password) {
      setError("Please enter your password.");
      return;
    }

    setIsLoading(true);
    seedIfNeeded();

    // Small deliberate delay so testers can practice loading state assertions
    await new Promise((r) => setTimeout(r, 400));

    const err = login(username.trim(), password);
    setIsLoading(false);

    if (err) {
      setError(err);
    } else {
      router.push("/bank/dashboard");
    }
  };

  return (
    <div
      className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-violet-950 px-4 py-12"
      data-testid="bank-login-page"
      data-section="bank-login"
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
            <h1
              className="text-2xl font-bold text-white"
              data-testid="login-page-title"
            >
              SecureBank
            </h1>
            <p className="mt-0.5 text-sm text-slate-400">
              Sign in to your account
            </p>
          </div>
        </div>

        {/* Card */}
        <div
          className="rounded-2xl border border-slate-700 bg-slate-800/80 p-6 shadow-xl backdrop-blur"
          data-testid="login-card"
        >
          {/* Error banner — Beginner: getByTestId("login-error-banner") */}
          {error && (
            <div
              className="mb-4 flex items-start justify-between gap-2 rounded-lg border border-red-800 bg-red-900/40 px-3 py-2.5 text-sm text-red-300"
              role="alert"
              data-testid="login-error-banner"
            >
              <span data-testid="login-error-message">{error}</span>
              {/*
               * Challenge locator: close button — aria-label only, no data-testid
               * Practice: page.getByRole('button', { name: 'Dismiss error' })
               * XPath: //div[@role="alert"]//button[@aria-label="Dismiss error"]
               */}
              <button
                type="button"
                className="shrink-0 leading-none text-red-400 hover:text-red-200"
                onClick={() => setError(null)}
                aria-label="Dismiss error"
              >
                ✕
              </button>
            </div>
          )}

          {/*
           * Beginner: data-testid on form, getByTestId("login-form")
           * Medium: scope all field locators inside the form
           */}
          <form
            onSubmit={handleSubmit}
            data-testid="login-form"
            aria-label="Sign in form"
            noValidate
          >
            {/* Username field — Beginner: getByLabel + getByTestId */}
            <div className="mb-4">
              <Label
                htmlFor="login-username"
                className="mb-1.5 block text-sm font-medium text-slate-300"
              >
                Username
              </Label>
              <Input
                id="login-username"
                name="username"
                type="text"
                autoComplete="username"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={isLoading}
                data-testid="login-username-input"
                aria-describedby={error ? "login-error-banner" : undefined}
                className="border-slate-600 bg-slate-700/60 text-white placeholder:text-slate-500 focus-visible:ring-violet-500"
              />
            </div>

            {/* Password field — Beginner: getByLabel + getByTestId */}
            <div className="mb-4">
              <Label
                htmlFor="login-password"
                className="mb-1.5 block text-sm font-medium text-slate-300"
              >
                Password
              </Label>
              <div className="relative">
                <Input
                  id="login-password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                  data-testid="login-password-input"
                  className="border-slate-600 bg-slate-700/60 pr-10 text-white placeholder:text-slate-500 focus-visible:ring-violet-500"
                />
                {/*
                 * Hard locator: toggle — no data-testid, aria-label only
                 * Practice: page.getByRole('button', { name: /Show password|Hide password/ })
                 * XPath: //button[contains(@aria-label, "password")]
                 */}
                <button
                  type="button"
                  className="absolute top-1/2 right-2.5 -translate-y-1/2 text-slate-400 hover:text-slate-200"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Remember me — Medium: Checkbox with label, scoped inside form */}
            <div className="mb-5 flex items-center gap-2">
              <Checkbox
                id="login-remember-me"
                checked={rememberMe}
                onCheckedChange={(v) => setRememberMe(!!v)}
                data-testid="login-remember-me-checkbox"
                className="border-slate-500"
              />
              {/*
               * Hard locator: label has no `for` attribute — must use sibling XPath
               * Practice:
               *   //input[@data-testid="login-remember-me-checkbox"]/following-sibling::label
               *   //div[@data-testid="login-form"]//label[normalize-space()="Remember me"]
               */}
              <label
                htmlFor="login-remember-me"
                className="cursor-pointer text-sm text-slate-400"
              >
                Remember me
              </label>
            </div>

            {/* Submit — Beginner: getByRole('button', { name: 'Sign In' }) + getByTestId */}
            <Button
              type="submit"
              disabled={isLoading}
              data-testid="login-submit-btn"
              aria-label="Sign in to SecureBank"
              className="w-full bg-violet-600 hover:bg-violet-700 focus-visible:ring-violet-500"
            >
              {isLoading ? "Signing in…" : "Sign In"}
            </Button>
          </form>

          {/* Forgot password — Medium: getByRole('link') + scoped inside card */}
          <div className="mt-4 text-center">
            <Link
              href="/bank/forgot-password"
              className="text-sm text-violet-400 hover:text-violet-300 hover:underline"
              data-testid="forgot-password-link"
            >
              Forgot password?
            </Link>
          </div>
        </div>

        {/* Test credentials hint */}
        <div
          className="mt-4 rounded-xl border border-slate-700 bg-slate-800/50 px-4 py-3"
          data-testid="test-credentials-panel"
        >
          <p className="text-xs font-medium text-slate-400">
            Test credentials
          </p>
          <div className="mt-3 overflow-x-auto">
            <table
              className="w-full border-collapse text-[11px]"
              data-testid="test-credentials-table"
            >
              <thead>
                <tr className="border-b border-slate-700 text-left text-slate-400">
                  <th className="px-2 py-1 font-medium">Username</th>
                  <th className="px-2 py-1 font-medium">Password</th>
                  <th className="px-2 py-1 font-medium">Description</th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    user: "standard_user",
                    pw: "bank_sauce",
                    note: "Full access",
                  },
                  {
                    user: "locked_user",
                    pw: "bank_sauce",
                    note: "Locked account",
                  },
                  {
                    user: "frozen_user",
                    pw: "bank_sauce",
                    note: "Frozen — no transfers",
                  },
                  {
                    user: "overdraft_user",
                    pw: "bank_sauce",
                    note: "Negative balance",
                  },
                  {
                    user: "slow_user",
                    pw: "bank_sauce",
                    note: "Slow loading",
                  },
                  {
                    user: "admin_user",
                    pw: "admin_sauce",
                    note: "Admin view",
                  },
                ].map((c) => (
                  /*
                   * Medium locator: repeated credential rows
                   * data-testid="credential-row" + data-username for scoping
                   * Practice:
                   *   page.getByTestId('credential-row').filter({ hasText: 'locked_user' })
                   *   page.locator('[data-testid="credential-row"][data-username="locked_user"]')
                   */
                  <tr
                    key={c.user}
                    className="border-b border-slate-800/60 font-mono hover:bg-slate-700/40 last:border-b-0"
                    data-testid="credential-row"
                    data-username={c.user}
                  >
                    <td className="group/username px-2 py-1 text-violet-300">
                      <span className="inline-flex items-center gap-1.5">
                        {c.user}
                        <button
                          type="button"
                          onClick={() =>
                            handleCopy(c.user, `${c.user}-username`)
                          }
                          className="opacity-0 transition-opacity group-hover/username:opacity-100 focus-visible:opacity-100 text-slate-400 hover:text-violet-300"
                          aria-label={`Copy username ${c.user}`}
                          data-testid="copy-username-btn"
                        >
                          {copiedField === `${c.user}-username` ? (
                            <Check className="h-3 w-3 text-emerald-400" />
                          ) : (
                            <Copy className="h-3 w-3" />
                          )}
                        </button>
                      </span>
                    </td>
                    <td className="group/password px-2 py-1 text-slate-400">
                      <span className="inline-flex items-center gap-1.5">
                        {c.pw}
                        <button
                          type="button"
                          onClick={() =>
                            handleCopy(c.pw, `${c.user}-password`)
                          }
                          className="opacity-0 transition-opacity group-hover/password:opacity-100 focus-visible:opacity-100 text-slate-400 hover:text-violet-300"
                          aria-label={`Copy password for ${c.user}`}
                          data-testid="copy-password-btn"
                        >
                          {copiedField === `${c.user}-password` ? (
                            <Check className="h-3 w-3 text-emerald-400" />
                          ) : (
                            <Copy className="h-3 w-3" />
                          )}
                        </button>
                      </span>
                    </td>
                    <td className="px-2 py-1 font-sans text-slate-500">
                      {c.note}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
