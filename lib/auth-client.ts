/**
 * Better Auth — browser-side client
 *
 * Import `authClient` into any "use client" component to read the session
 * or trigger sign-in/sign-out flows.
 *
 * Usage:
 *   const { data: session, isPending } = authClient.useSession()
 *   await authClient.signOut()
 *   await authClient.signIn.email({ email, password })
 *   await authClient.signIn.social({ provider: "google" })
 */

import { createAuthClient } from "better-auth/react";

function getBaseURL() {
  if (typeof window !== "undefined") {
    return window.location.origin;
  }
  if (process.env.NEXT_PUBLIC_APP_URL) {
    return process.env.NEXT_PUBLIC_APP_URL;
  }
  if (process.env.NEXT_PUBLIC_VERCEL_URL) {
    return `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`;
  }
  return "http://localhost:3000";
}

export const authClient = createAuthClient({
  baseURL: getBaseURL(),
});

export type { Session } from "./auth";
