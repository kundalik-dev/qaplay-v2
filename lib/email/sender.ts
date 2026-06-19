/**
 * High-level email sending helpers — server-only.
 *
 * Each function wraps a Resend API call with structured error handling
 * so callers don't need to know the Resend SDK internals.
 */
import { resend, FROM_EMAIL } from "./resend-client";
import {
  verificationEmailHtml,
  verificationEmailText,
} from "./templates/verification";
import {
  resetPasswordEmailHtml,
  resetPasswordEmailText,
} from "./templates/reset-password";

interface SendResult {
  success: boolean;
  error?: string;
}

export async function sendVerificationEmail({
  to,
  url,
  userName,
}: {
  to: string;
  url: string;
  userName?: string;
}): Promise<SendResult> {
  try {
    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to,
      subject: "Verify your QA Playground email address",
      html: verificationEmailHtml({ url, userName }),
      text: verificationEmailText({ url }),
    });

    if (error) {
      console.error("[email] Verification send failed:", error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("[email] Verification send exception:", message);
    return { success: false, error: message };
  }
}

export async function sendResetPasswordEmail({
  to,
  url,
  userName,
}: {
  to: string;
  url: string;
  userName?: string;
}): Promise<SendResult> {
  try {
    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to,
      subject: "Reset your QA Playground password",
      html: resetPasswordEmailHtml({ url, userName }),
      text: resetPasswordEmailText({ url }),
    });

    if (error) {
      console.error("[email] Reset password send failed:", error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("[email] Reset password send exception:", message);
    return { success: false, error: message };
  }
}
