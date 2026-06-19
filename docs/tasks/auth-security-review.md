# Auth Security Review

**Reviewed:** 2026-06-19
**Scope:** `lib/auth.ts`, `lib/email/`, `app/(auth)/`, `middleware.ts`, `app/api/auth/`

---

## Vulnerability Checklist

### ✅ PASSED

| # | Category | Finding |
|---|----------|---------|
| 1 | **Password storage** | better-auth uses bcrypt internally. Passwords are never stored in plaintext. No raw password is logged or returned in API responses. |
| 2 | **SQL Injection** | All DB access goes through Prisma's parameterised query builder. No raw SQL strings anywhere in auth code. |
| 3 | **CSRF** | better-auth uses a double-submit cookie pattern. The API route handler (`toNextJsHandler`) validates the `Origin` header against `trustedOrigins` for all state-changing POST requests. |
| 4 | **Open Redirect** | `middleware.ts` validates the `redirect` query param: only paths starting with `/` (not `//`) are accepted. `sign-in-form.tsx` applies the same check client-side before passing `callbackURL`. |
| 5 | **Session Fixation** | better-auth generates a new session token on every sign-in, invalidating any prior anonymous token. |
| 6 | **Email Enumeration** | — Sign-in: always returns "Invalid email or password" regardless of which field is wrong. — Forgot-password: always shows "check your inbox" after submission, even if the email is not registered. — Sign-up: generic error for already-registered emails ("Unable to create account"). |
| 7 | **Token Security** | Verification and reset tokens are single-use, stored hashed in the DB, and expire (24h / 1h respectively). Clicking a link a second time returns an error. |
| 8 | **Secure Cookies** | `useSecureCookies: true` in production (HTTPS-only). `HttpOnly` and `SameSite: lax` are better-auth defaults, preventing JS access and cross-site submission. |
| 9 | **Rate Limiting** | `rateLimit` is enabled for all auth endpoints. Sign-in and forgot-password have stricter built-in limits in better-auth (sliding window). |
| 10 | **XSS in emails** | All user-supplied values interpolated into HTML email templates pass through `escapeHtml()` before rendering. |
| 11 | **Trusted origins** | `trustedOrigins` is populated from `BETTER_AUTH_URL` + `TRUSTED_ORIGINS` env var. Requests from unlisted origins are rejected by better-auth. |
| 12 | **Minimal OAuth scopes** | Google OAuth requests only `openid email profile` — no write access, calendar, Drive, etc. |
| 13 | **Secret protection** | `RESEND_API_KEY`, `BETTER_AUTH_SECRET`, `GOOGLE_CLIENT_SECRET` are server-only env vars. They are never imported into client components or exposed via `NEXT_PUBLIC_*`. |
| 14 | **Password policy** | Min 8, max 128 characters enforced both client-side (form validation) and server-side (better-auth config). The 128-char max prevents bcrypt DoS attacks from unbounded input. |
| 15 | **Input validation** | All form inputs are validated before submission. Email format is checked with a regex. Name length is bounded (2–100 chars). |
| 16 | **Middleware resilience** | `middleware.ts` wraps `getSession` in try/catch — a DB error does not crash the middleware or grant unintended access; it falls through as unauthenticated. |
| 17 | **Auth routes blocked from robots** | The `(auth)` layout exports `robots: { index: false, follow: false }` so auth pages are not indexed. |

---

### ⚠️ KNOWN LIMITATIONS / RECOMMENDATIONS

| # | Category | Detail | Recommendation |
|---|----------|--------|---------------|
| L1 | **Rate limit storage** | `rateLimit.storage: "memory"` does not persist across server restarts or share between instances. | In production, switch to Redis: set `storage: "redis"` and `REDIS_URL`. |
| L2 | **Account lockout** | better-auth's built-in rate limiter throttles but does not hard-lock accounts after N failures. | For high-security environments, add an account-lockout plugin or track failed attempts in the DB. |
| L3 | **Password breach check** | The `haveibeenpwned` plugin was considered but intentionally omitted to avoid a third-party network call on every registration. | Enable it if the project adds a privacy policy that covers external breach-check lookups. |
| L4 | **Multi-instance rate limiting** | As noted in L1, memory-based rate limits are per-process. | Use Redis for any multi-instance or serverless deployment. |
| L5 | **Logging** | Auth events (sign-in, sign-up, failed attempts) are currently only console-logged. | Connect a structured logger (e.g., Pino) and ship logs to an observability platform in production. |
| L6 | **Content-Security-Policy** | CSP headers are not yet configured at the Next.js level. | Add a `next.config.ts` `headers()` export with a strict CSP that restricts `script-src`, `connect-src` etc. |
| L7 | **Refresh token rotation** | OAuth refresh tokens are stored in the `Account` table. No automatic rotation is configured. | Review whether your Google OAuth consent screen requires refresh token rotation and wire up `onUpdateToken` if so. |

---

## Attack Surface Summary

```
Public endpoints:
  POST /api/auth/sign-in/email        ← rate limited, generic errors
  POST /api/auth/sign-up/email        ← rate limited, generic errors
  POST /api/auth/forget-password      ← rate limited, always returns 200
  GET  /api/auth/reset-password       ← token validated + single-use
  GET  /api/auth/verify-email         ← token validated + single-use
  GET  /api/auth/callback/google      ← PKCE + state validated by better-auth

Protected (session required, enforced by middleware):
  /dashboard/**
  /job-crm/**
  /challenges/**
  /interview-practice/**
  /interview-questions/**
  /qa-tools/**
```

---

## Files Changed

| File | Change |
|------|--------|
| `lib/auth.ts` | Full rewrite — Resend wired, security options, rate limit, trusted origins |
| `lib/email/resend-client.ts` | New — Resend singleton |
| `lib/email/sender.ts` | New — `sendVerificationEmail`, `sendResetPasswordEmail` |
| `lib/email/templates/verification.ts` | New — HTML + plain-text email |
| `lib/email/templates/reset-password.ts` | New — HTML + plain-text email |
| `app/(auth)/layout.tsx` | New — auth group layout (no nav) |
| `app/(auth)/auth.module.css` | New — shared auth styles |
| `app/(auth)/auth/sign-in/` | New — sign-in page + form |
| `app/(auth)/auth/sign-up/` | New — sign-up page + form |
| `app/(auth)/auth/verify-email/` | New — post-registration holding page |
| `app/(auth)/auth/forgot-password/` | New — request reset link |
| `app/(auth)/auth/reset-password/` | New — set new password |
| `app/(auth)/auth/error/` | New — generic auth error page |
| `middleware.ts` | New — protected route guard + auth redirect |
| `.env.example` | New — all required env vars documented |
| `docs/tasks/auth-implementation-plan.md` | New — implementation plan |
| `docs/tasks/auth-security-review.md` | This file |
