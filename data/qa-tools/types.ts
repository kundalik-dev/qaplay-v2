/**
 * QA Tools — shared type definitions.
 *
 * Add new tool statuses, tones, or categories here when the suite grows.
 */

export type QaToolStatus = "ready" | "coming_soon";

/** Visual accent colour used for the card banner and category badge. */
export type QaToolTone =
  | "blue"
  | "emerald"
  | "orange"
  | "violet"
  | "teal"
  | "slate"
  | "red"
  | "yellow";

/** Top-level grouping shown in the category filter. */
export type QaToolCategory =
  | "generators"
  | "encoders"
  | "formatters"
  | "validators"
  | "converters";

export interface QaTool {
  /** URL-safe slug, e.g. "uuid-generator". Used as the route segment. */
  slug: string;
  name: string;
  tagline: string;
  description: string;
  category: QaToolCategory;
  /** Searchable labels shown on the card. */
  tags: string[];
  tone: QaToolTone;
  status: QaToolStatus;
  /** Whether the tool appears first in the default sort order. */
  featured?: boolean;
}
