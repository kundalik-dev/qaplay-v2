/**
 * Next.js edge middleware — route protection & auth redirect.
 *
 * Strategy:
 *  - Protected routes → redirect to /auth/sign-in if no valid session
 *  - Auth routes (/auth/*) → redirect to /dashboard if already signed in
 *  - Everything else → pass through
 *
 * better-auth exposes `auth.api.getSession` which works in the edge runtime.
 */

import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";

// ── Route matchers ────────────────────────────────────────────────────────────

/** Prefixes that require an active session. */
const PROTECTED_PREFIXES = [
  "/dashboard",
  "/job-crm",
  "/challenges",
  "/interview-practice",
  "/interview-questions",
  "/qa-tools",
];

/** Prefixes that should redirect to dashboard when already signed in. */
const AUTH_PREFIXES = ["/auth"];

// ── Helpers ───────────────────────────────────────────────────────────────────

function isProtected(pathname: string): boolean {
  return PROTECTED_PREFIXES.some((prefix) => pathname.startsWith(prefix));
}

function isAuthRoute(pathname: string): boolean {
  return AUTH_PREFIXES.some((prefix) => pathname.startsWith(prefix));
}

/**
 * Builds a safe sign-in redirect URL.
 * Validates the redirect param to prevent open-redirect attacks:
 * only relative paths that start with "/" (but not "//") are allowed.
 */
function signInUrl(request: NextRequest): URL {
  const url = request.nextUrl.clone();
  const pathname = request.nextUrl.pathname;

  url.pathname = "/auth/sign-in";

  // Only attach redirect param for relative paths (no protocol-relative URLs)
  if (pathname.startsWith("/") && !pathname.startsWith("//")) {
    url.searchParams.set("redirect", pathname);
  }

  return url;
}

// ── Middleware ────────────────────────────────────────────────────────────────

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip static files and Next.js internals
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api/auth") || // better-auth handles its own routes
    pathname.includes(".")              // static assets (favicon, images, etc.)
  ) {
    return NextResponse.next();
  }

  // Fetch session — better-auth reads the session cookie from the request headers.
  // This is a lightweight DB query (or cookie-cache hit if cookieCache is enabled).
  let session: Awaited<ReturnType<typeof auth.api.getSession>> | null = null;
  try {
    session = await auth.api.getSession({
      headers: request.headers,
    });
  } catch (err) {
    // Never crash the middleware — log and continue as unauthenticated
    console.error("[middleware] getSession error:", err);
  }

  const isAuthenticated = !!session?.user;

  // ── Protected route guard ──────────────────────────────────────────────────
  if (isProtected(pathname)) {
    if (!isAuthenticated) {
      return NextResponse.redirect(signInUrl(request));
    }
    return NextResponse.next();
  }

  // ── Auth route guard (redirect away if already signed in) ─────────────────
  if (isAuthRoute(pathname)) {
    if (isAuthenticated) {
      const dashboardUrl = request.nextUrl.clone();
      dashboardUrl.pathname = "/dashboard";
      dashboardUrl.search = "";
      return NextResponse.redirect(dashboardUrl);
    }
    return NextResponse.next();
  }

  return NextResponse.next();
}

// ── Matcher ───────────────────────────────────────────────────────────────────
// Apply middleware to all routes except static files and API internals.
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     *  - _next/static (static files)
     *  - _next/image (image optimisation)
     *  - favicon.ico, sitemap.xml, robots.txt
     *  - public folder assets
     */
    "/((?!_next/static|_next/image|favicon\\.ico|sitemap\\.xml|robots\\.txt|public/).*)",
  ],
};
