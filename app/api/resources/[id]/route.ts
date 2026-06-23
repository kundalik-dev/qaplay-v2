/**
 * PUT    /api/resources/:id  — update a resource
 * DELETE /api/resources/:id  — delete a resource
 *
 * Both session cookie and Bearer API key auth are accepted.
 * Ownership is verified before any mutation.
 */

import { createHash } from "crypto";
import { NextResponse } from "next/server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// ── CORS ──────────────────────────────────────────────────────────────────────

const CORS: HeadersInit = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS });
}

// ── Auth helper ───────────────────────────────────────────────────────────────

async function resolveUserId(request: Request): Promise<string | null> {
  const authHeader = request.headers.get("authorization") ?? "";
  if (authHeader.startsWith("Bearer ")) {
    const rawKey = authHeader.slice(7).trim();
    if (!rawKey) return null;
    const keyHash = createHash("sha256").update(rawKey).digest("hex");
    const apiKey = await prisma.apiKey.findUnique({
      where: { keyHash },
      select: { userId: true, expiresAt: true },
    });
    if (!apiKey) return null;
    if (apiKey.expiresAt && apiKey.expiresAt < new Date()) return null;
    prisma.apiKey
      .update({ where: { keyHash }, data: { lastUsedAt: new Date() } })
      .catch(() => {});
    return apiKey.userId;
  }

  const session = await auth.api.getSession({ headers: request.headers });
  return session?.user?.id ?? null;
}

// ── PUT /api/resources/:id ────────────────────────────────────────────────────

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const userId = await resolveUserId(request);
  if (!userId) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401, headers: CORS },
    );
  }

  const { id } = await params;

  const existing = await prisma.resource.findUnique({ where: { id } });
  if (!existing || existing.userId !== userId) {
    return NextResponse.json(
      { error: "Not found" },
      { status: 404, headers: CORS },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON" },
      { status: 400, headers: CORS },
    );
  }

  const { resourceType, title, url, description, tags, image } = body as Record<
    string,
    unknown
  >;

  const validTypes = [
    "ARTICLE",
    "VIDEO",
    "COURSE",
    "BOOK",
    "TOOL",
    "DOCUMENTATION",
    "OTHER",
  ];

  const updated = await prisma.resource.update({
    where: { id },
    data: {
      ...(typeof resourceType === "string" &&
        validTypes.includes(resourceType) && {
          resourceType: resourceType as import("@prisma/client").ResourceType,
        }),
      ...(typeof title === "string" &&
        title.trim() && {
          title: title.trim().slice(0, 300),
        }),
      ...(typeof url === "string" &&
        url.trim() && {
          url: url.trim().slice(0, 2048),
        }),
      // Explicit null clears the field; undefined leaves it unchanged
      description:
        description === null
          ? null
          : typeof description === "string"
            ? description.trim().slice(0, 1000) || null
            : existing.description,
      tags: Array.isArray(tags)
        ? (tags as unknown[])
            .filter((t): t is string => typeof t === "string")
            .map((t) => t.toLowerCase().trim())
            .filter(Boolean)
            .slice(0, 20)
        : existing.tags,
      image:
        image === null
          ? null
          : typeof image === "string"
            ? image.trim().slice(0, 2048) || null
            : existing.image,
    },
  });

  return NextResponse.json(updated, { headers: CORS });
}

// ── DELETE /api/resources/:id ─────────────────────────────────────────────────

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const userId = await resolveUserId(request);
  if (!userId) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401, headers: CORS },
    );
  }

  const { id } = await params;

  const existing = await prisma.resource.findUnique({ where: { id } });
  if (!existing || existing.userId !== userId) {
    return NextResponse.json(
      { error: "Not found" },
      { status: 404, headers: CORS },
    );
  }

  await prisma.resource.delete({ where: { id } });

  return NextResponse.json({ success: true }, { headers: CORS });
}
