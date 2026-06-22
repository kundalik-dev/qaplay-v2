/**
 * GET  /api/api-keys  — list the user's API keys (prefix + metadata, never raw key)
 * POST /api/api-keys  — create a new API key
 *
 * Security model:
 *  - Raw key is generated with 32 random bytes → "qap_<hex64>"
 *  - Only the SHA-256 hash is stored in ApiKey.keyHash
 *  - The first 12 chars are stored in ApiKey.prefix for display
 *  - The raw key is returned ONCE in the POST response and never again
 */

import { createHash, randomBytes } from "crypto";
import { NextResponse } from "next/server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const KEY_PREFIX = "qap_";
const MAX_KEYS_PER_USER = 10;

// ── GET /api/api-keys ─────────────────────────────────────────────────────────

export async function GET(request: Request) {
  const session = await auth.api.getSession({ headers: request.headers });
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const keys = await prisma.apiKey.findMany({
    where: { userId: session.user.id },
    select: {
      id: true,
      name: true,
      prefix: true,
      expiresAt: true,
      lastUsedAt: true,
      createdAt: true,
    },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(keys);
}

// ── POST /api/api-keys ────────────────────────────────────────────────────────

export async function POST(request: Request) {
  const session = await auth.api.getSession({ headers: request.headers });
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = session.user.id;

  // Enforce per-user key limit
  const count = await prisma.apiKey.count({ where: { userId } });
  if (count >= MAX_KEYS_PER_USER) {
    return NextResponse.json(
      { error: `Maximum of ${MAX_KEYS_PER_USER} API keys allowed. Delete one first.` },
      { status: 422 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { name, expiresAt: expiresAtRaw } = body as Record<string, unknown>;

  if (typeof name !== "string" || !name.trim()) {
    return NextResponse.json({ error: "name is required" }, { status: 400 });
  }

  // Optional expiry
  let expiresAt: Date | null = null;
  if (expiresAtRaw != null) {
    const d = new Date(expiresAtRaw as string);
    if (isNaN(d.getTime()) || d <= new Date()) {
      return NextResponse.json(
        { error: "expiresAt must be a valid future date" },
        { status: 400 },
      );
    }
    expiresAt = d;
  }

  // Generate raw key — never stored
  const rawKey = KEY_PREFIX + randomBytes(32).toString("hex");
  const keyHash = createHash("sha256").update(rawKey).digest("hex");
  const prefix = rawKey.slice(0, 12); // "qap_" + 8 hex chars

  const created = await prisma.apiKey.create({
    data: {
      userId,
      name: name.trim().slice(0, 100),
      keyHash,
      prefix,
      expiresAt,
    },
    select: {
      id: true,
      name: true,
      prefix: true,
      expiresAt: true,
      createdAt: true,
    },
  });

  // Return the raw key ONCE
  return NextResponse.json({ ...created, key: rawKey }, { status: 201 });
}
