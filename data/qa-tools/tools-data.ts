/**
 * QA Tools registry — add a new entry here to add a new tool to the platform.
 *
 * Steps for a new tool:
 *   1. Add an entry below with a unique `slug`.
 *   2. Create `app/(dashboard)/qa-tools/[slug]/_components/<slug>/<slug>-tool.tsx`
 *      and export a default React component.
 *   3. Register it in `app/(dashboard)/qa-tools/[slug]/_components/tool-renderer.tsx`.
 *   4. Set `status: "ready"` when the component is complete.
 */

import type { QaTool } from "./types";

export const qaTools: QaTool[] = [
  {
    slug: "uuid-generator",
    name: "UUID Generator",
    tagline: "Generate UUID v4 values instantly",
    description:
      "Generate single or bulk UUID v4 values for test data, database seeds, and API payloads. Copy with one click.",
    category: "generators",
    tags: ["uuid", "v4", "guid", "test data", "bulk"],
    tone: "blue",
    status: "ready",
    featured: true,
  },
  {
    slug: "base64-encoder",
    name: "Base64 Encoder / Decoder",
    tagline: "Encode and decode Base64 strings",
    description:
      "Encode plain text or decode Base64 strings instantly. Useful for API auth headers, JWT payloads, and test data.",
    category: "encoders",
    tags: ["base64", "encode", "decode", "jwt", "auth"],
    tone: "orange",
    status: "coming_soon",
  },
  {
    slug: "json-formatter",
    name: "JSON Formatter",
    tagline: "Prettify, minify, and validate JSON",
    description:
      "Paste raw JSON to format, minify, or validate it. Highlights syntax errors so you can fix broken payloads fast.",
    category: "formatters",
    tags: ["json", "format", "prettify", "minify", "validate"],
    tone: "emerald",
    status: "coming_soon",
  },
  {
    slug: "regex-tester",
    name: "Regex Tester",
    tagline: "Test and debug regular expressions",
    description:
      "Write a regex pattern and test it against sample text in real time. Highlights all matches with group capture support.",
    category: "validators",
    tags: ["regex", "regexp", "pattern", "match", "test"],
    tone: "violet",
    status: "coming_soon",
  },
  {
    slug: "lorem-ipsum",
    name: "Lorem Ipsum Generator",
    tagline: "Generate placeholder text for UI testing",
    description:
      "Generate configurable lorem ipsum paragraphs, sentences, or words. Great for populating UI forms and layouts.",
    category: "generators",
    tags: ["lorem ipsum", "placeholder", "dummy text", "ui testing"],
    tone: "teal",
    status: "coming_soon",
  },
  {
    slug: "timestamp-converter",
    name: "Timestamp Converter",
    tagline: "Convert Unix timestamps to human-readable dates",
    description:
      "Paste a Unix timestamp (seconds or milliseconds) and convert it to ISO 8601, UTC, or local time — and back.",
    category: "converters",
    tags: ["timestamp", "unix", "epoch", "date", "iso8601"],
    tone: "slate",
    status: "coming_soon",
  },
  {
    slug: "url-encoder",
    name: "URL Encoder / Decoder",
    tagline: "Encode and decode URL query strings",
    description:
      "Encode special characters for safe URL usage or decode percent-encoded strings. Handles full URLs and individual components.",
    category: "encoders",
    tags: ["url", "encode", "decode", "percent encoding", "query string"],
    tone: "yellow",
    status: "coming_soon",
  },
  {
    slug: "json-diff",
    name: "JSON Diff",
    tagline: "Compare two JSON payloads side by side",
    description:
      "Paste two JSON objects and see a colour-coded diff of every added, removed, or changed key. Essential for API response comparison.",
    category: "validators",
    tags: ["json", "diff", "compare", "api testing"],
    tone: "red",
    status: "coming_soon",
  },
];

/** Derive all unique categories that have at least one tool. */
export function getActiveCategories(tools: QaTool[]) {
  return [...new Set(tools.map((t) => t.category))];
}

/** Find a tool by slug. Returns undefined if not found. */
export function findTool(slug: string): QaTool | undefined {
  return qaTools.find((t) => t.slug === slug);
}

/**
 * Filter tools by query string and/or category.
 * Both parameters are optional — pass empty string / undefined to skip.
 */
export function filterTools(
  tools: QaTool[],
  query: string,
  category: string,
): QaTool[] {
  const q = query.trim().toLowerCase();
  return tools.filter((tool) => {
    if (category && tool.category !== category) return false;
    if (!q) return true;
    return (
      tool.name.toLowerCase().includes(q) ||
      tool.tagline.toLowerCase().includes(q) ||
      tool.description.toLowerCase().includes(q) ||
      tool.category.toLowerCase().includes(q) ||
      tool.tags.some((tag) => tag.toLowerCase().includes(q))
    );
  });
}
