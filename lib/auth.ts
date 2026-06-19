/**
 * Better Auth — server-side config
 *
 * Docs: https://www.better-auth.com/docs
 */

import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";

export const auth = betterAuth({
  secret: process.env.BETTER_AUTH_SECRET,
  baseURL: process.env.BETTER_AUTH_URL,

  // ── Database (Prisma + Supabase Postgres) ──────────────────────────────
  database: prismaAdapter(prisma, { provider: "postgresql" }),

  // ── Email + password ───────────────────────────────────────────────────
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    // Wire up your email provider (Resend, Nodemailer, etc.) here:
    sendVerificationEmail: async ({
      user,
      url,
    }: {
      user: { email: string };
      url: string;
    }) => {
      console.log(`[auth] Verification email → ${user.email}: ${url}`);
      // TODO: replace with real email send, e.g.:
      // await resend.emails.send({ from: "...", to: user.email, subject: "Verify", html: `<a href="${url}">Verify</a>` })
    },
    sendResetPassword: async ({
      user,
      url,
    }: {
      user: { email: string };
      url: string;
    }) => {
      console.log(`[auth] Reset password email → ${user.email}: ${url}`);
      // TODO: replace with real email send
    },
  },

  // ── Google OAuth ───────────────────────────────────────────────────────
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },

  // ── Session ────────────────────────────────────────────────────────────
  session: {
    expiresIn: 60 * 60 * 24 * 30, // 30 days
    updateAge: 60 * 60 * 24, // refresh if older than 1 day
  },
});

export type Session = typeof auth.$Infer.Session;
export type User = typeof auth.$Infer.Session.user;
