/**
 * POST /api/feedback — persist a submission from the site-wide floating
 * feedback button (see components/feedback-widget).
 *
 * Public endpoint — available to signed-out visitors as well as signed-in
 * users:
 *  - Signed in  → userId, name, and email are all taken from the Better Auth
 *    session and stamped onto the row automatically; the client never sends
 *    them.
 *  - Signed out → stored as a guest entry (userId stays null, name defaults
 *    to "Guest User"). The widget doesn't collect name/email at all, but the
 *    endpoint still accepts them as optional body fields for any other
 *    caller that wants to attach guest contact info.
 */

import { NextResponse } from "next/server";

import { FeedbackType } from "@prisma/client";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const MAX_MESSAGE_LENGTH = 2000;
const MAX_NAME_LENGTH = 200;
const MAX_PAGE_URL_LENGTH = 500;
const EMAIL_MAX_LENGTH = 320;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const GUEST_NAME_FALLBACK = "Guest User";

const VALID_TYPES = new Set<string>(["FEEDBACK", "ISSUE"]);

// A single, human-readable error message plus which field it belongs to
// (if any) — lets the client highlight the offending field.
function fail(
  status: number,
  error: string,
  field?: "type" | "message" | "email",
) {
  return NextResponse.json({ error, field }, { status });
}

// ── Method guards ─────────────────────────────────────────────────────────────
function methodNotAllowed() {
  return NextResponse.json(
    { error: "Method not allowed. This endpoint only accepts POST." },
    { status: 405, headers: { Allow: "POST" } },
  );
}
export const GET = methodNotAllowed;
export const PUT = methodNotAllowed;
export const PATCH = methodNotAllowed;
export const DELETE = methodNotAllowed;

export async function POST(request: Request) {
  // ── Content-Type guard ──────────────────────────────────────────────────────
  const contentType = request.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) {
    return fail(
      415,
      "Request must be sent with Content-Type: application/json.",
    );
  }

  // ── Parse body ───────────────────────────────────────────────────────────────
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return fail(400, "Request body must be valid JSON.");
  }

  if (typeof body !== "object" || body === null) {
    return fail(400, "Request body must be a JSON object.");
  }

  const { type, message, name, email, pageUrl } = body as Record<
    string,
    unknown
  >;

  // ── Field-by-field validation ───────────────────────────────────────────────
  const normalizedType =
    typeof type === "string" ? type.trim().toUpperCase() : "";
  const resolvedType: FeedbackType = VALID_TYPES.has(normalizedType)
    ? (normalizedType as FeedbackType)
    : FeedbackType.FEEDBACK;

  if (typeof message !== "string" || !message.trim()) {
    return fail(
      400,
      "Please describe your feedback or issue in the message field.",
      "message",
    );
  }
  if (message.trim().length > MAX_MESSAGE_LENGTH) {
    return fail(
      400,
      `Message must be ${MAX_MESSAGE_LENGTH} characters or fewer.`,
      "message",
    );
  }

  let guestEmail: string | null = null;
  if (typeof email === "string" && email.trim()) {
    if (email.trim().length > EMAIL_MAX_LENGTH) {
      return fail(
        400,
        `Email address must be ${EMAIL_MAX_LENGTH} characters or fewer.`,
        "email",
      );
    }
    if (!EMAIL_PATTERN.test(email.trim())) {
      return fail(400, "Enter a valid email address.", "email");
    }
    guestEmail = email.trim().toLowerCase();
  }

  // ── Resolve identity ─────────────────────────────────────────────────────────
  // Signed-in users are attached via the session and never asked for their
  // name/email — everything below is derived server-side, not from the body.
  const session = await auth.api.getSession({ headers: request.headers });

  const userId = session?.user?.id ?? null;
  const resolvedName = session?.user
    ? session.user.name || "Registered User"
    : typeof name === "string" && name.trim()
      ? name.trim().slice(0, MAX_NAME_LENGTH)
      : GUEST_NAME_FALLBACK;
  const resolvedEmail = session?.user
    ? (session.user.email ?? null)
    : guestEmail;

  // ── Persist ──────────────────────────────────────────────────────────────────
  try {
    const feedback = await prisma.feedback.create({
      data: {
        type: resolvedType,
        message: message.trim(),
        name: resolvedName,
        email: resolvedEmail,
        userId,
        pageUrl:
          typeof pageUrl === "string"
            ? pageUrl.slice(0, MAX_PAGE_URL_LENGTH)
            : null,
      },
      select: { id: true },
    });

    return NextResponse.json({ id: feedback.id }, { status: 201 });
  } catch (err) {
    // Log the real cause server-side; never leak DB internals to the client.
    console.error("[api/feedback] failed to save feedback:", err);
    return fail(
      500,
      "We couldn't save your feedback right now. Please try again in a moment.",
    );
  }
}
