import { createHighlighter, type BundledLanguage } from "shiki";

import type {
  LearnCodeSnippet,
  HighlightedLearnCodeSnippet,
} from "@/data/practice-data/types";

// ── Language mapping from display label → Shiki bundle key ───────────────────
const LANG_MAP: Record<string, BundledLanguage> = {
  TypeScript: "typescript",
  JavaScript: "javascript",
  Java: "java",
  Python: "python",
};

// ── Singleton — created once, reused across all server renders ────────────────
const highlighterPromise = createHighlighter({
  themes: ["material-theme-palenight"],
  langs: ["typescript", "javascript", "java", "python"],
});

/**
 * Highlight a raw code string and return a Shiki HTML string.
 * The <pre> element's inline background is stripped so our own
 * dark shell provides the background colour.
 */
export async function highlightCode(
  code: string,
  lang: string,
): Promise<string> {
  const hl = await highlighterPromise;

  return hl.codeToHtml(code, {
    lang: LANG_MAP[lang] ?? "typescript",
    theme: "material-theme-palenight",
    transformers: [
      {
        // Remove Shiki's inline background/color so our shell controls it
        pre(node) {
          if (node.properties?.style) {
            node.properties.style = (node.properties.style as string)
              .replace(/background-color:[^;]+;?\s*/g, "")
              .replace(/color:[^;]+;?\s*/g, "")
              .trim();
          }
        },
      },
    ],
  });
}

/**
 * Highlight all three framework snippets for a LearnCodeBlock in parallel.
 * Call this from server components (learn-tab.tsx) before passing props down.
 */
export async function highlightLearnSnippet(
  snippet: LearnCodeSnippet,
): Promise<HighlightedLearnCodeSnippet> {
  const keys = ["pw", "sel", "cy"] as const;

  const results = await Promise.all(
    keys.map(async (key) => {
      const { lang, code } = snippet[key];
      const html = await highlightCode(code, lang);
      return [key, { lang, code, html }] as const;
    }),
  );

  return Object.fromEntries(results) as unknown as HighlightedLearnCodeSnippet;
}
