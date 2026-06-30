/**
 * Shared types for the /new-practice element workspace pages.
 *
 * Each element page (alert-practice, etc.) supplies an `ElementContent` object:
 *   - meta:      heading, description, difficulty
 *   - testCases: rendered by the reusable Test Cases view
 *   - learn:     rendered by the reusable Learn view
 * The Practice tab is route-specific custom UI, so it is NOT part of the data.
 */

import type { LearnCodeSnippet, TestCase } from "@/data/practice-data/types";

export type ElementLevel = "Beginner" | "Intermediate" | "Advanced";

export interface ElementUpNext {
  title: string;
  description: string;
  href: string;
  iconSrc: string;
  iconAlt: string;
}

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
  /** Optional next element to show in the sidebar */
  upNext?: ElementUpNext;
}

/** A documentation block in the Learn tab. */
export interface LearnSection {
  /** Stable id — used for anchors and test ids */
  id: string;
  /** Section heading */
  heading: string;
  /** Plain-text description shown under the heading (no HTML). */
  desc?: string;
  /** Optional extra paragraph below the description — HTML allowed. */
  body?: string;
  /** Optional bullet list — each item HTML-allowed */
  bullets?: string[];
  /**
   * Optional framework code block (Playwright / Selenium / Cypress).
   * Rendered with the shared LearnCodeBlock (tabs + Copy + syntax highlight).
   * Highlighting is done server-side in the page before rendering.
   */
  snippets?: LearnCodeSnippet;
}

/** Everything a reusable element workspace needs (minus the custom Practice UI). */
export interface ElementContent {
  meta: ElementMeta;
  testCases: TestCase[];
  learn: LearnSection[];
}
