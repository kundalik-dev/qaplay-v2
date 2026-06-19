import type { QaToolCategory } from "./types";

/**
 * Category display labels — single source of truth for filter dropdowns
 * and any other UI that surfaces category names.
 */
export const TOOL_CATEGORY_LABELS: Record<QaToolCategory, string> = {
  generators: "Generators",
  encoders: "Encoders / Decoders",
  formatters: "Formatters",
  validators: "Validators",
  converters: "Converters",
};

/** Ordered list of categories for the filter dropdown. */
export const TOOL_CATEGORIES: QaToolCategory[] = [
  "generators",
  "encoders",
  "formatters",
  "validators",
  "converters",
];
