import { Marked, type Tokens } from "marked";
import markedShiki from "marked-shiki";
import { createHighlighter, type HighlighterGeneric } from "shiki";

import type { BundledLanguage, BundledTheme } from "shiki";

import type { RenderedPost, TocHeading } from "./types";

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

/** Turn heading text into a URL-safe anchor slug. */
function slugify(text: string): string {
  return (
    text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "") // drop punctuation/symbols
      .replace(/\s+/g, "-") // spaces → hyphens
      .replace(/-+/g, "-") // collapse repeats
      .replace(/^-|-$/g, "") || "section"
  );
}

/**
 * Build a fresh `marked` instance for a single render. Each call gets its own
 * `toc` accumulator and slug counter so heading ids stay unique and free of
 * cross-render state (renders may run concurrently during a build).
 *
 * The Shiki highlighter itself stays a singleton (see `getHighlighter`), so
 * creating the lightweight `Marked` wrapper per render is cheap.
 */
function createMarked(
  highlighter: HighlighterGeneric<BundledLanguage, BundledTheme>,
  loaded: Set<string>,
  toc: TocHeading[],
): Marked {
  // Track how many times each base slug has been used, to de-duplicate.
  const slugCounts = new Map<string, number>();

  return new Marked({ gfm: true })
    .use(
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
    )
    .use({
      renderer: {
        // Add a stable `id` to every heading and collect h2/h3 for the TOC.
        heading(token: Tokens.Heading): string {
          const inner = this.parser.parseInline(token.tokens);
          const level = token.depth;
          const plain = inner.replace(/<[^>]+>/g, "").trim();

          const base = slugify(plain);
          const used = slugCounts.get(base) ?? 0;
          slugCounts.set(base, used + 1);
          const id = used === 0 ? base : `${base}-${used}`;

          if (level === 2 || level === 3) {
            toc.push({ id, text: plain, level });
          }

          return `<h${level} id="${id}">${inner}</h${level}>\n`;
        },
      },
    });
}

/**
 * Render a raw Markdown string to sanitized-by-construction HTML, returning
 * both the body HTML and the extracted table of contents (h2/h3 headings).
 */
export async function renderMarkdown(markdown: string): Promise<RenderedPost> {
  const highlighter = await getHighlighter();
  const loaded = new Set(highlighter.getLoadedLanguages());

  const toc: TocHeading[] = [];
  const marked = createMarked(highlighter, loaded, toc);
  const html = await marked.parse(markdown, { async: true });

  return { html, toc };
}
