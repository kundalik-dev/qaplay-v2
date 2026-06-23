import { NextResponse } from "next/server";

// This acts as the single source of truth for the offline-first app.
// Changing this version string will force all clients to wipe their local cache and fetch the new data payload.
const CURRENT_DATA_VERSION = "v1.0.0_20260622";

export async function GET() {
  return NextResponse.json({ version: CURRENT_DATA_VERSION });
}
