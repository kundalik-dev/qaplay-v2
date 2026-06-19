/**
 * Singleton Resend client — server-only.
 * Never import this in client components.
 */
import { Resend } from "resend";

if (!process.env.RESEND_API_KEY) {
  throw new Error("Missing env var: RESEND_API_KEY");
}

export const resend = new Resend(process.env.RESEND_API_KEY);

/** Verified sender address — must match a domain verified in your Resend dashboard. */
export const FROM_EMAIL =
  process.env.RESEND_FROM_EMAIL ?? "noreply@qaplayground.dev";
