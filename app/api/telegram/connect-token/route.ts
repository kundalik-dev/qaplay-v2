/**
 * GET    /api/telegram/connect-token
 *   — Returns linked status if already connected, otherwise generates a fresh
 *     one-time connect token. The raw token is returned once; only its SHA-256
 *     hash + expiry are stored.
 *
 * DELETE /api/telegram/connect-token
 *   — Unlinks (removes) the user's Telegram account association.
 */

import { createHash, randomBytes } from "crypto";
import { NextResponse } from "next/server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { TELEGRAM_RULES } from "@/lib/telegram-rules";

const { prefix: TOKEN_PREFIX, expiryMinutes } = TELEGRAM_RULES.token;

function hashToken(raw: string): string {
  return createHash("sha256").update(raw).digest("hex");
}

// ── GET /api/telegram/connect-token ──────────────────────────────────────────

export async function GET(request: Request) {
  const session = await auth.api.getSession({ headers: request.headers });
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = session.user.id;

  const existing = await prisma.telegramUser.findUnique({
    where: { userId },
  });

  // Already fully linked
  if (existing?.chatId) {
    return NextResponse.json({
      linked: true,
      username: existing.username,
      createdAt: existing.createdAt,
    });
  }

  // Generate a fresh connect token (always fresh so the user can copy it)
  const rawToken = TOKEN_PREFIX + randomBytes(16).toString("hex");
  const tokenHash = hashToken(rawToken);
  const tokenExpiry = new Date(Date.now() + expiryMinutes * 60 * 1000);

  await prisma.telegramUser.upsert({
    where: { userId },
    update: { tokenHash, tokenExpiry },
    create: { userId, chatId: null, tokenHash, tokenExpiry },
  });

  return NextResponse.json({
    linked: false,
    token: rawToken,
    expiresAt: tokenExpiry,
  });
}

// ── DELETE /api/telegram/connect-token ───────────────────────────────────────

export async function DELETE(request: Request) {
  const session = await auth.api.getSession({ headers: request.headers });
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await prisma.telegramUser.deleteMany({
    where: { userId: session.user.id },
  });

  return NextResponse.json({ success: true });
}
