// =============================================================================
// CHALLENGES REGISTRY
// =============================================================================
// This folder is the SINGLE SOURCE OF TRUTH for every challenge on the platform.
// Each challenge lives in its own file so no single file grows too large.
//
// ── HOW TO ADD A NEW CHALLENGE (5 steps) ─────────────────────────────────────
//
//  1. Create a new file in ./challenges/<id>.ts that exports a ChallengeMeta
//     object. Copy an existing challenge file as a template and fill in all
//     required fields.
//
//  2. Register it in the `challenges` array below (import + add to the array).
//
//  3. Create the Target UI playground component:
//     app/(dashboard)/challenges/[challengeId]/_components/<id>-playground.tsx
//     This is the interactive UI the automation script runs against.
//
//  4. Register the component in the page map:
//     app/(dashboard)/challenges/[challengeId]/page.tsx  →  PLAYGROUNDS record
//     Add one line: "your-challenge-id": <YourPlayground />
//
//  5. (Optional) Add a real API route if your playground needs one:
//     app/api/challenges/<id>/route.ts
//
// ── WHERE THINGS LIVE ────────────────────────────────────────────────────────
//
//  data/challenges-registry/index.ts                    ← YOU ARE HERE (aggregator)
//  data/challenges-registry/types.ts                    ← Shared types
//  data/challenges-registry/build-validation-prompt.ts  ← AI prompt builder
//  data/challenges-registry/challenges/*.ts             ← One file per challenge
//  app/(dashboard)/challenges/page.tsx                  ← Dashboard (auto-reads registry)
//  app/(dashboard)/challenges/[challengeId]/page.tsx    ← Detail page (add to PLAYGROUNDS)
//  app/(dashboard)/challenges/[challengeId]/_components/← Playground UIs
//  app/(dashboard)/challenges/_components/AiValidationBox.tsx ← Calls buildValidationSystemPrompt()
//  app/(dashboard)/challenges/challenges.module.css     ← All challenge CSS
//
// =============================================================================

import type { ChallengeMeta } from "./types";

import { ghostElement } from "./challenges/ghost-element";
import { impatientUser } from "./challenges/impatient-user";
import { stubbornApi } from "./challenges/stubborn-api";
import { dragDropPuzzle } from "./challenges/drag-drop-puzzle";

// Re-export the public API so existing imports from "@/data/challenges-registry"
// keep working unchanged.
export type {
  ChallengeMeta,
  ValidationConfig,
  RequiredPattern,
  ForbiddenPattern,
} from "./types";
export { buildValidationSystemPrompt } from "./build-validation-prompt";

// ---------------------------------------------------------------------------
// CHALLENGES — registration order controls dashboard display order
// ---------------------------------------------------------------------------
export const challenges: ChallengeMeta[] = [
  ghostElement,
  impatientUser,
  stubbornApi,
  dragDropPuzzle,
];
