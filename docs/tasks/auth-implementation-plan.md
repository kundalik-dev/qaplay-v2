# Auth Implementation Plan

**Stack:** Next.js 16 · better-auth 1.6.x · Prisma 7 · Supabase Postgres · Resend · Google OAuth

---

## Current State

| Item | Status |
|------|--------|
| `better-auth` installed | ✅ |
| `lib/auth.ts` scaffold | ✅ (stubs only) |
| `lib/auth-client.ts` | ✅ |
| `app/api/auth/[...all]/route.ts` | ✅ |
| Prisma schema (user/session/account/verification) | ✅ |
| Resend email sending | ❌ |
| Google OAuth wired | ❌ (env vars only) |
| Auth UI pages | ❌ |
| Middleware (route protection) | ❌ |
| Security hardening | ❌ |

---

## Task Breakdown

### Task 1 — Resend Email Integration
- Install `resend` package
- Create `lib/email/` module:
  - `resend-client.ts` — singleton Resend instance
  - `templates/verification.tsx` — HTML email template
  - `templates/reset-password.tsx` — HTML email template
  - `sender.ts` — `sendVerificationEmail`, `sendResetPasswordEmail` helpers
- Replace `console.log` stubs in `lib/auth.ts` with real Resend calls

### Task 2 — Auth Config Hardening
- Enable `haveIBeenPwned` password plugin
- Set minimum password length (8+), max (128)
- Configure trusted origins (no open redirect)
- Set `secureCookies: true` in production
- Add `advanced.cookiePrefix` for CSRF protection
- Configure `rateLimit` (better-auth built-in) for sign-in and sign-up
- Set `session.cookieCache` for performance
- Add `emailVerification.autoSignInAfterVerification: true`

### Task 3 — Auth UI Pages
Route group: `app/(auth)/`

| Route | Purpose |
|-------|---------|
| `/auth/sign-in` | Email + password form + Google button |
| `/auth/sign-up` | Registration form |
| `/auth/verify-email` | "Check your email" holding page |
| `/auth/forgot-password` | Request reset link |
| `/auth/reset-password` | New password form (token from URL) |
| `/auth/error` | Generic error page |

**Conventions:**
- All pages in `app/(auth)/` route group (no layout header/nav)
- Client components for forms, server components for page shells
- `authClient` from `lib/auth-client.ts` for all auth actions
- Redirect to `/dashboard` on successful sign-in
- Show toast via `sonner` for errors

### Task 4 — Middleware
- `middleware.ts` at project root
- Protected prefixes: `/dashboard`, `/job-crm`, `/challenges`, `/interview-practice`
- Public routes: `/`, `/auth/*`, `/api/auth/*`, `/blog/*`, `/practice/*`
- Use `better-auth/next-js` `getSession` helper to validate session server-side
- Redirect to `/auth/sign-in?redirect=<path>` on unauthorized
- Redirect `/auth/*` to `/dashboard` if already signed in

### Task 5 — Environment Variables
Required in `.env.local`:

```env
# App
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Database
DATABASE_URL=postgresql://...?pgbouncer=true
DIRECT_URL=postgresql://...

# Better Auth
BETTER_AUTH_SECRET=<32+ char random string>
BETTER_AUTH_URL=http://localhost:3000

# Google OAuth
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

# Resend
RESEND_API_KEY=re_...
RESEND_FROM_EMAIL=noreply@yourdomain.com
```

---

## Security Checklist

- [ ] **CSRF** — better-auth uses double-submit cookie pattern; no additional work needed for API routes
- [ ] **SQL Injection** — Prisma parameterised queries; no raw SQL
- [ ] **Open Redirect** — validate `redirect` param against trusted origins before redirecting
- [ ] **Session Fixation** — better-auth regenerates session token on sign-in
- [ ] **Password Storage** — better-auth uses bcrypt (12 rounds default)
- [ ] **Token Leakage** — verification/reset tokens are single-use and expire
- [ ] **Rate Limiting** — better-auth `rateLimit` on auth endpoints
- [ ] **Secure Cookies** — `httpOnly: true`, `sameSite: lax`, `secure: true` in production
- [ ] **Email Enumeration** — better-auth returns generic messages for unknown emails (verify)
- [ ] **Input Validation** — zod schemas on all form actions
- [ ] **Env var secrets** — never exposed to client; `RESEND_API_KEY` server-only

---

## File Structure (after implementation)

```
lib/
  auth.ts                         ← hardened config
  auth-client.ts                  ← unchanged
  email/
    resend-client.ts
    sender.ts
    templates/
      verification.ts
      reset-password.ts

app/
  (auth)/
    layout.tsx
    auth/
      sign-in/page.tsx + _components/
      sign-up/page.tsx + _components/
      verify-email/page.tsx
      forgot-password/page.tsx + _components/
      reset-password/page.tsx + _components/
      error/page.tsx

middleware.ts

docs/tasks/
  auth-implementation-plan.md     ← this file
  auth-security-review.md         ← generated post-implementation

.env.example
```
