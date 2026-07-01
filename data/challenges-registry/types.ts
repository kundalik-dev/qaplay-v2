// =============================================================================
// CHALLENGES REGISTRY — TYPES
// =============================================================================
// Shared type definitions for the challenges system.
// These drive both the dashboard UI and the AI validation system.
// =============================================================================

/**
 * A single required pattern — something the submitted code MUST do.
 * Both fields are plain English; the AI reads them as grading instructions.
 */
export interface RequiredPattern {
  /** What to look for. Be specific: "uses page.route() to intercept the request" */
  pattern: string;
  /** Why it matters — used in AI feedback when the pattern is missing */
  reason: string;
}

/**
 * A single forbidden pattern — an anti-pattern that causes automatic failure.
 */
export interface ForbiddenPattern {
  /** What to reject. Be specific: "uses page.waitForTimeout with a hardcoded value" */
  pattern: string;
  /** Why it's bad — used in AI feedback to explain the failure */
  reason: string;
}

/**
 * Structured configuration that drives the AI validation system prompt.
 *
 * This is the most important thing to fill in when adding a new challenge.
 * buildValidationSystemPrompt() converts it into a complete LLM system prompt —
 * you never write raw prompt strings anywhere in the codebase.
 *
 * Think of it as a rubric sheet that you'd hand to a senior QA reviewer.
 */
export interface ValidationConfig {
  /**
   * The automation skill or concept this challenge primarily tests.
   * One short phrase: "Shadow DOM traversal", "Smart dynamic waits", etc.
   */
  skill: string;

  /**
   * 2–4 sentences describing what a CORRECT solution accomplishes.
   * This is the core context the AI evaluates against. Be precise.
   */
  scenario: string;

  /**
   * Code patterns, APIs, or techniques the submission MUST include to pass.
   * ALL required patterns must be present — missing any one = fail.
   */
  requiredPatterns: RequiredPattern[];

  /**
   * Anti-patterns that trigger an AUTOMATIC FAIL regardless of other correctness.
   * Common examples: hardcoded sleeps, brittle XPath, DOM manipulation via evaluate().
   * Set to [] if there are no hard disqualifiers for this challenge.
   */
  forbiddenPatterns: ForbiddenPattern[];

  /**
   * How strictly the AI should grade:
   * - "strict"   → every required pattern must be present, no exceptions
   * - "moderate" → minor variations OK if the core concept is right
   * - "lenient"  → beginner-friendly; focus on the main concept only
   */
  strictness: "strict" | "moderate" | "lenient";

  /**
   * Optional freeform notes for the AI evaluator.
   * Use this for edge cases, common mistakes to watch for, or framework-specific
   * nuances that don't fit neatly into required/forbidden patterns.
   */
  evaluatorNotes?: string;
}

/**
 * Full metadata for a single challenge.
 * Every field either drives the dashboard UI or the AI validation system.
 */
export interface ChallengeMeta {
  /** URL slug — unique, kebab-case. Used in /challenges/[challengeId] */
  id: string;
  /** Display title on cards and the detail page header */
  title: string;
  /** One-sentence summary shown on dashboard cards */
  summary: string;
  /** Longer description shown in the challenge header */
  description?: string;
  /** Controls the difficulty chip colour and filter options */
  difficulty: "Easy" | "Medium" | "Hard";
  /** XP awarded on passing */
  xp: number;
  /** Tag pills shown on cards and in the table view */
  tags: string[];

  /**
   * The "what and why" shown in the Problem Statement section.
   * 2–4 sentences explaining the real-world scenario this challenge simulates.
   * Focus on WHY this skill matters in production QA work.
   */
  problemStatement: string;

  /**
   * What the user's automation script must accomplish — shown as "Expected Behaviour".
   * Write as 3–5 concrete bullet points, each starting with a verb.
   * Example: ["Navigate to the page", "Locate the button inside #shadow-root", ...]
   */
  expectedBehavior: string[];

  /**
   * Progressive hints rendered in the collapsible Hints section.
   * Order from least to most revealing. 2–4 hints is the sweet spot.
   * Can contain inline HTML: <code>...</code>, <strong>...</strong>.
   */
  hints: string[];

  /**
   * Step-by-step instructions rendered in the collapsible Instructions accordion.
   * Write as numbered actions the user takes with their local script.
   */
  instructions: string[];

  /**
   * Starter code pre-filled in the submission textarea.
   * Should import the right framework and define a test stub.
   */
  boilerplate: string;

  /**
   * Structured AI validation configuration.
   * buildValidationSystemPrompt() converts this into the LLM system prompt.
   */
  validationConfig: ValidationConfig;
}
