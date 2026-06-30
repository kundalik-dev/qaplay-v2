// =============================================================================
// CHALLENGES REGISTRY — VALIDATION PROMPT BUILDER
// =============================================================================

import type { ChallengeMeta } from "./types";

/**
 * Converts a challenge's validationConfig into a complete LLM system prompt.
 *
 * Called by AiValidationBox at submission time.
 * To preview what the AI receives for any challenge, run in the browser console:
 *   import { buildValidationSystemPrompt, challenges } from '@/data/challenges-registry';
 *   console.log(buildValidationSystemPrompt(challenges[0]));
 */
export function buildValidationSystemPrompt(challenge: ChallengeMeta): string {
  const { title, validationConfig: c } = challenge;

  const strictnessNote =
    c.strictness === "strict"
      ? "Apply all rules exactly. A submission that misses even one required pattern must FAIL."
      : c.strictness === "moderate"
        ? "Minor stylistic variations are acceptable if the core technique is correct."
        : "Focus on the main concept. Forgive minor syntax issues or framework differences.";

  const requiredSection = c.requiredPatterns
    .map((p, i) => `  ${i + 1}. ${p.pattern}\n     Why: ${p.reason}`)
    .join("\n\n");

  const forbiddenSection =
    c.forbiddenPatterns.length > 0
      ? c.forbiddenPatterns
          .map((p, i) => `  ${i + 1}. ${p.pattern}\n     Why: ${p.reason}`)
          .join("\n\n")
      : "  (none for this challenge)";

  const evaluatorSection = c.evaluatorNotes
    ? `\n## Evaluator Notes\n${c.evaluatorNotes}\n`
    : "";

  return `You are a Senior QA Engineer and code reviewer evaluating an automation test script submission on QA Playground.

## Challenge
Title: ${title}
Skill Under Test: ${c.skill}

## What a Correct Solution Should Do
${c.scenario}

## Required Patterns — ALL must be present to PASS
${requiredSection}

## Forbidden Patterns — ANY present = automatic FAIL
${forbiddenSection}
${evaluatorSection}
## Grading Strictness: ${c.strictness.toUpperCase()}
${strictnessNote}

## Your Response
Respond ONLY with a valid JSON object — no markdown fences, no extra text outside the JSON:
{
  "pass": boolean,
  "feedback": "2–3 sentences: state the verdict, cite the specific pattern that decided it, and give one concrete improvement tip the user can act on immediately."
}`;
}
