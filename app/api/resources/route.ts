/**
 * GET  /api/resources  — list user's resources (session or API key auth)
 * POST /api/resources  — create a resource   (session or API key auth)
 *
 * Auth strategy:
 *  1. Bearer <raw-api-key>  — hashed with SHA-256, looked up in ApiKey.keyHash
 *     Used by the Chrome extension (cross-origin, so CORS headers included).
 *  2. Session cookie        — standard Better-Auth session lookup.
 *
 * CORS is open on all methods so the Chrome extension can call freely.
 */

import { createHash } from "crypto";
import { NextResponse } from "next/server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// ── CORS ──────────────────────────────────────────────────────────────────────

const CORS: HeadersInit = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS });
}

// ── Auth helper ───────────────────────────────────────────────────────────────

async function resolveUserId(request: Request): Promise<string | null> {
  // 1. API key (Chrome extension)
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

    // Update last-used timestamp (fire-and-forget, don't block response)
    prisma.apiKey
      .update({ where: { keyHash }, data: { lastUsedAt: new Date() } })
      .catch(() => {});

    return apiKey.userId;
  }

  // 2. Session cookie (web UI)
  const session = await auth.api.getSession({ headers: request.headers });
  return session?.user?.id ?? null;
}

// ── GET /api/resources ────────────────────────────────────────────────────────

export async function GET(request: Request) {
  const userId = await resolveUserId(request);
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401, headers: CORS });
  }

  const { searchParams } = new URL(request.url);
  const search = searchParams.get("search")?.trim() ?? "";
  const type   = searchParams.get("type")?.trim() ?? "";
  const tag    = searchParams.get("tag")?.trim() ?? "";

  const where: Parameters<typeof prisma.resource.findMany>[0]["where"] = { userId };

  if (type && type !== "ALL") {
    // Validate against known enum values to prevent injection
    const validTypes = ["ARTICLE", "VIDEO", "COURSE", "BOOK", "TOOL", "DOCUMENTATION", "OTHER"];
    if (validTypes.includes(type)) {
      where.resourceType = type as import("@prisma/client").ResourceType;
    }
  }

  if (search) {
    where.OR = [
      { title: { contains: search, mode: "insensitive" } },
      { description: { contains: search, mode: "insensitive" } },
    ];
  }

  if (tag) {
    where.tags = { has: tag };
  }

  const isFiltered = !!(search || (type && type !== "ALL") || tag);

  // Run filtered query + unfiltered total count in parallel.
  // totalOwned is always the raw count for this user (ignores active filters),
  // so the UI can tell "no resources yet" from "filters matched nothing".
  const [resources, totalOwned] = await Promise.all([
    prisma.resource.findMany({
      where,
      orderBy: { createdAt: "desc" },
    }),
    isFiltered
      ? prisma.resource.count({ where: { userId } })
      : Promise.resolve(0), // will be derived from resources.length when not filtered
  ]);

  const total = isFiltered ? totalOwned : resources.length;

  return NextResponse.json(
    { data: resources, total, filtered: isFiltered },
    { headers: CORS },
  );
}

// ── POST /api/resources ───────────────────────────────────────────────────────

export async function POST(request: Request) {
  const userId = await resolveUserId(request);
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401, headers: CORS });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400, headers: CORS });
  }

  const { resourceType, title, url, description, tags, image, source } =
    body as Record<string, unknown>;

  // Required fields
  if (
    typeof resourceType !== "string" || !resourceType ||
    typeof title !== "string" || !title.trim() ||
    typeof url !== "string" || !url.trim()
  ) {
    return NextResponse.json(
      { error: "resourceType, title, and url are required" },
      { status: 400, headers: CORS },
    );
  }

  const validTypes = ["ARTICLE", "VIDEO", "COURSE", "BOOK", "TOOL", "DOCUMENTATION", "OTHER"];
  if (!validTypes.includes(resourceType)) {
    return NextResponse.json(
      { error: `resourceType must be one of: ${validTypes.join(", ")}` },
      { status: 400, headers: CORS },
    );
  }

  const resource = await prisma.resource.create({
    data: {
      userId,
      resourceType: resourceType as import("@prisma/client").ResourceType,
      title: (title as string).trim().slice(0, 300),
      url: (url as string).trim().slice(0, 2048),
      description: typeof description === "string" && description.trim()
        ? description.trim().slice(0, 1000)
        : null,
      tags: Array.isArray(tags)
        ? (tags as unknown[])
            .filter((t): t is string => typeof t === "string")
            .map((t) => t.toLowerCase().trim())
            .filter(Boolean)
            .slice(0, 20)
        : [],
      image: typeof image === "string" && image.trim() ? image.trim().slice(0, 2048) : null,
      source: typeof source === "string" && source.trim() ? source.trim().slice(0, 50) : "web",
    },
  });

  return NextResponse.json(resource, { status: 201, headers: CORS });
}
