/**
 * Better Auth — server-side configuration
 *
 * Security checklist:
 *  ✅ bcrypt password hashing (better-auth default)
 *  ✅ Email verification required before sign-in
 *  ✅ Single-use, expiring verification / reset tokens (24h / 1h)
 *  ✅ Built-in rate limiting on all auth endpoints
 *  ✅ Secure, HttpOnly, SameSite cookies in production
 *  ✅ Trusted origins whitelist (prevents open-redirect & CSRF)
 *  ✅ Session regenerated on sign-in (prevents session fixation)
 *  ✅ Generic error messages to prevent email enumeration
 *  ✅ Google OAuth with minimal scopes
 *  ✅ Password length policy (8–128 chars)
 *
 * Docs: https://www.better-auth.com/docs
 */

import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";
import {
  sendVerificationEmail as dispatchVerificationEmail,
  sendResetPasswordEmail as dispatchResetPasswordEmail,
} from "./email/sender";

// ── Trusted origins ────────────────────────────────────────────────────────────
// Only origins in this list may make cross-origin auth requests.
// Prevents CSRF from arbitrary third-party sites.
const trustedOrigins: string[] = [];

if (process.env.BETTER_AUTH_URL) {
  trustedOrigins.push(process.env.BETTER_AUTH_URL);
}
if (process.env.TRUSTED_ORIGINS) {
  process.env.TRUSTED_ORIGINS.split(",")
    .map((o) => o.trim())
    .filter(Boolean)
    .forEach((o) => trustedOrigins.push(o));
}

// ── Auth instance ──────────────────────────────────────────────────────────────
export const auth = betterAuth({
  // ── Core ────────────────────────────────────────────────────────────────────
  secret: process.env.BETTER_AUTH_SECRET,
  baseURL: process.env.BETTER_AUTH_URL,

  // Reject cross-origin requests from unlisted origins
  trustedOrigins,

  // ── Database ────────────────────────────────────────────────────────────────
  database: prismaAdapter(prisma, { provider: "postgresql" }),

  // ── Email + password ─────────────────────────────────────────────────────────
  emailAndPassword: {
    enabled: true,

    // Force email verification before the account can sign in.
    // Prevents bots from creating unverified accounts that can access
    // protected resources.
    requireEmailVerification: true,

    // Password length policy — short passwords are the #1 source of
    // credential-stuffing victims. 128-char max prevents DoS via bcrypt.
    minPasswordLength: 8,
    maxPasswordLength: 128,

    // ── Reset-password email ─────────────────────────────────────────────────
    // NOTE: sendResetPassword lives here under emailAndPassword (not emailVerification).
    // Verified against better-auth source: dist/api/routes/password.mjs
    sendResetPassword: async ({ user, url }) => {
      const result = await dispatchResetPasswordEmail({
        to: user.email,
        url,
        userName: user.name,
      });
      if (!result.success) {
        console.error(
          `[auth] sendResetPasswordEmail failed for ${user.email}:`,
          result.error,
        );
      }
    },
  },

  // ── Email verification ───────────────────────────────────────────────────────
  // NOTE: sendVerificationEmail lives here under emailVerification (not emailAndPassword).
  // Verified against better-auth source: dist/api/routes/email-verification.mjs
  emailVerification: {
    // Tokens expire after 24 hours — single-use, stored hashed in DB
    expiresIn: 60 * 60 * 24,
    // Re-send verification email automatically on each sign-up attempt
    // for users who haven't verified yet (good UX, no extra flow needed)
    sendOnSignUp: true,
    // Immediately sign the user in after clicking the verification link
    autoSignInAfterVerification: true,

    // ── Verification email callback ──────────────────────────────────────────
    sendVerificationEmail: async ({ user, url }) => {
      const result = await dispatchVerificationEmail({
        to: user.email,
        url,
        userName: user.name,
      });
      if (!result.success) {
        // Log server-side only — never expose delivery failures to the client
        // (would reveal whether the email address exists in our system).
        console.error(
          `[auth] sendVerificationEmail failed for ${user.email}:`,
          result.error,
        );
      }
    },
  },

  // ── Google OAuth ─────────────────────────────────────────────────────────────
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      // Minimal scopes — only what we actually use
      scope: ["openid", "email", "profile"],
    },
  },

  // ── Session ──────────────────────────────────────────────────────────────────
  session: {
    // 30-day sliding sessions, refreshed if the last update was >1 day ago
    expiresIn: 60 * 60 * 24 * 30,
    updateAge: 60 * 60 * 24,

    // Cache session in the signed HttpOnly cookie for 5 min.
    // Cuts DB round-trips on repeated requests without compromising security.
    cookieCache: {
      enabled: true,
      maxAge: 60 * 5,
    },
  },

  // ── Rate limiting ─────────────────────────────────────────────────────────────
  // In-memory store is fine for a single instance.
  // For multi-instance / edge deployments swap storage to "redis" and
  // set REDIS_URL — see https://www.better-auth.com/docs/concepts/rate-limit
  rateLimit: {
    enabled: true,
    window: 60,   // 60-second rolling window
    max: 10,      // max 10 auth requests per window per IP
    storage: "memory",
  },

  // ── Advanced / cookie security ────────────────────────────────────────────────
  advanced: {
    // Namespace all cookies to avoid collisions with other libraries
    cookiePrefix: "qaplay",

    // HTTPS-only cookies in production — never sent over plain HTTP
    useSecureCookies: process.env.NODE_ENV === "production",

    // Cross-subdomain cookies disabled by default — enable only if
    // you need shared auth across e.g. app.qaplayground.dev & api.qaplayground.dev
    crossSubDomainCookies: {
      enabled: false,
    },
  },
});

// ── Type exports ──────────────────────────────────────────────────────────────
export type Session = typeof auth.$Infer.Session;
export type User = typeof auth.$Infer.Session.user;
