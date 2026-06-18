import { Marked } from "marked";
import markedShiki from "marked-shiki";
import { createHighlighter, type HighlighterGeneric } from "shiki";

import type { BundledLanguage, BundledTheme } from "shiki";

/**
 * Markdown → HTML renderer for blog posts.
 *
 * Built on `marked` (GitHub-flavoured Markdown) with `marked-shiki` so fenced
 * code blocks are syntax-highlighted by Shiki — the same highlighter the rest
 * of the app uses (`lib/highlight.ts`), keeping code styling consistent.
 *
 * Rendering is async (Shiki is async) and runs on the server at build time.
 */

const THEME: BundledTheme = "material-theme-palenight";

// Languages preloaded into the highlighter. Anything not listed here falls
// back to plain text, so add a language here when posts start using it.
const LANGS: BundledLanguage[] = [
  "typescript",
  "javascript",
  "tsx",
  "jsx",
  "java",
  "python",
  "bash",
  "shell",
  "json",
  "yaml",
  "html",
  "css",
  "sql",
  "markdown",
];

// Singleton highlighter — created once, reused across every render.
let highlighterPromise: Promise<
  HighlighterGeneric<BundledLanguage, BundledTheme>
> | null = null;

function getHighlighter() {
  if (!highlighterPromise) {
    highlighterPromise = createHighlighter({
      themes: [THEME],
      langs: LANGS,
    });
  }
  return highlighterPromise;
}

// Singleton `marked` instance wired up with the Shiki extension.
let markedPromise: Promise<Marked> | null = null;

function getMarked() {
  if (!markedPromise) {
    markedPromise = (async () => {
      const highlighter = await getHighlighter();
      const loaded = new Set(highlighter.getLoadedLanguages());

      return new Marked({ gfm: true }).use(
        markedShiki({
          highlight(code, lang) {
            const language = loaded.has(lang) ? lang : "text";
            return highlighter.codeToHtml(code, {
              lang: language,
              theme: THEME,
              transformers: [
                {
                  // Strip Shiki's inline background so our own shell styles it.
                  pre(node) {
                    const style = node.properties?.style;
                    if (typeof style === "string") {
                      node.properties.style = style
                        .replace(/background-color:[^;]+;?\s*/g, "")
                        .trim();
                    }
                  },
                },
              ],
            });
          },
        }),
      );
    })();
  }
  return markedPromise;
}

/** Render a raw Markdown string to sanitized-by-construction HTML. */
export async function renderMarkdown(markdown: string): Promise<string> {
  const marked = await getMarked();
  return marked.parse(markdown, { async: true });
}
