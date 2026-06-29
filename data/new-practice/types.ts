/**
 * Shared types for the /new-practice element workspace pages.
 *
 * Each element page (alert-practice, etc.) supplies an `ElementContent` object:
 *   - meta:      heading, description, difficulty
 *   - testCases: rendered by the reusable Test Cases view
 *   - learn:     rendered by the reusable Learn view
 * The Practice tab is route-specific custom UI, so it is NOT part of the data.
 */

import type { TestCase } from "@/data/practice-data/types";

export type ElementLevel = "Beginner" | "Intermediate" | "Advanced";

export interface ElementMeta {
  /** Route slug, e.g. "alert-practice" */
  slug: string;
  /** Workspace heading */
  title: string;
  /** Short supporting paragraph under the title */
  description: string;
  /** Difficulty — drives the coloured badge */
  level: ElementLevel;
  /** Optional short tags shown next to the title */
  tags?: string[];
}

/** A single code sample inside a Learn section. */
export interface LearnCode {
  /** Language hint for styling/labels, e.g. "ts", "js", "java" */
  lang: string;
  /** Optional caption above the block, e.g. "Playwright" */
  label?: string;
  /** Raw code (rendered verbatim in a <pre>) */
  code: string;
}

/** A documentation block in the Learn tab. */
export interface LearnSection {
  /** Stable id — used for anchors and test ids */
  id: string;
  /** Section heading */
  heading: string;
  /** Intro paragraph — HTML allowed (<code>, <strong>, <em>) */
  body?: string;
  /** Optional bullet list — each item HTML-allowed */
  bullets?: string[];
  /** Optional code samples */
  code?: LearnCode[];
}

/** Everything a reusable element workspace needs (minus the custom Practice UI). */
export interface ElementContent {
  meta: ElementMeta;
  testCases: TestCase[];
  learn: LearnSection[];
}
