/**
 * Better Auth — server-side config
 *
 * Setup checklist before going live:
 *  1. Run: npm install better-auth
 *  2. Set env vars in .env.local:
 *       BETTER_AUTH_SECRET=<random 32+ char string>
 *       BETTER_AUTH_URL=http://localhost:3000   (your origin)
 *       GOOGLE_CLIENT_ID=<from Google Cloud Console>
 *       GOOGLE_CLIENT_SECRET=<from Google Cloud Console>
 *       DATABASE_URL=<your DB connection string>
 *  3. Swap the database adapter below for your DB (Drizzle, Prisma, etc.)
 *  4. Run: npx better-auth generate  to create the DB schema
 *  5. Run: npx better-auth migrate   to apply the schema
 *
 * Docs: https://www.better-auth.com/docs
 */

import { betterAuth } from "better-auth";

export const auth = betterAuth({
  secret: process.env.BETTER_AUTH_SECRET,
  baseURL: process.env.BETTER_AUTH_URL,

  // ── Database ───────────────────────────────────────────────────────────
  // Replace with your adapter. Examples:
  //
  //   Drizzle:  import { drizzleAdapter } from "better-auth/adapters/drizzle"
  //             database: drizzleAdapter(db, { provider: "pg" })
  //
  //   Prisma:   import { prismaAdapter } from "better-auth/adapters/prisma"
  //             database: prismaAdapter(prisma, { provider: "postgresql" })
  //
  // For quick local dev, you can use SQLite via better-sqlite3:
  //   import Database from "better-sqlite3"
  //   import { BetterSQLite3Adapter } from "better-auth/adapters/better-sqlite3"
  //   database: new BetterSQLite3Adapter(new Database("./dev.db"))
  //
  // !! Replace this placeholder before running !!
  database: undefined as never,

  // ── Email + password ───────────────────────────────────────────────────
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    // Wire up your email provider (Resend, Nodemailer, etc.) here:
    sendVerificationEmail: async ({ user, url }) => {
      console.log(`[auth] Verification email → ${user.email}: ${url}`);
      // TODO: replace with real email send, e.g.:
      // await resend.emails.send({ from: "...", to: user.email, subject: "Verify", html: `<a href="${url}">Verify</a>` })
    },
    sendResetPassword: async ({ user, url }) => {
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
