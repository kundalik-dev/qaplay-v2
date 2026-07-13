/**
 * POST /api/contact — persist a contact-us submission (incl. bug reports).
 *
 * Public endpoint (no auth) — the contact form is available to signed-out
 * visitors. Submissions are stored in `ContactMessage` for review; no email
 * is sent (see docs/tasks — DB-only delivery decided over Resend).
 */

import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

const MAX_MESSAGE_LENGTH = 1000;

const VALID_TOPICS = [
  "Bug Report",
  "Feature Request",
  "Collaboration",
  "Automation Help",
  "Feedback",
  "General Enquiry",
];

function getClientIp(request: Request): string | null {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) return forwardedFor.split(",")[0].trim();
  return request.headers.get("x-real-ip");
}

const NAME_MAX_LENGTH = 200;
const EMAIL_MAX_LENGTH = 320;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// A single, human-readable error message plus which field it belongs to
// (if any) — lets the client highlight the offending field while still
// working with the current "just show data.error" handling unchanged.
function fail(
  status: number,
  error: string,
  field?: "name" | "email" | "topic" | "message",
) {
  return NextResponse.json({ error, field }, { status });
}

// ── Method guards ─────────────────────────────────────────────────────────────
// Any non-POST verb gets a clear 405 instead of falling through to Next's
// generic 404, so callers immediately know the endpoint exists but the verb
// is wrong.
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

  const { name, email, topic, subject, message } = body as Record<
    string,
    unknown
  >;

  // The client sends `subject` mirroring the selected topic — accept either.
  const resolvedTopic =
    typeof topic === "string" && topic.trim()
      ? topic
      : typeof subject === "string"
        ? subject
        : "";

  // ── Field-by-field validation ───────────────────────────────────────────────
  // Checked one at a time (rather than one combined check) so the message
  // always points at the actual problem field instead of a generic
  // "something is missing".
  if (typeof name !== "string" || !name.trim()) {
    return fail(400, "Full name is required.", "name");
  }
  if (name.trim().length > NAME_MAX_LENGTH) {
    return fail(
      400,
      `Full name must be ${NAME_MAX_LENGTH} characters or fewer.`,
      "name",
    );
  }

  if (typeof email !== "string" || !email.trim()) {
    return fail(400, "Email address is required.", "email");
  }
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

  if (!resolvedTopic) {
    return fail(400, "Please select a topic before sending.", "topic");
  }
  if (!VALID_TOPICS.includes(resolvedTopic)) {
    return fail(
      400,
      `"${resolvedTopic}" isn't a recognized topic. Choose one of: ${VALID_TOPICS.join(", ")}.`,
      "topic",
    );
  }

  if (typeof message !== "string" || !message.trim()) {
    return fail(
      400,
      "Please describe your question, issue, or idea in the message field.",
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

  // ── Persist ──────────────────────────────────────────────────────────────────
  try {
    const contactMessage = await prisma.contactMessage.create({
      data: {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        topic: resolvedTopic,
        message: message.trim(),
        ipAddress: getClientIp(request),
        userAgent: request.headers.get("user-agent"),
      },
      select: { id: true },
    });

    return NextResponse.json({ id: contactMessage.id }, { status: 201 });
  } catch (err) {
    // Log the real cause server-side; never leak DB internals to the client.
    console.error("[api/contact] failed to save contact message:", err);
    return fail(
      500,
      "We couldn't save your message right now. Please try again in a moment.",
    );
  }
}
