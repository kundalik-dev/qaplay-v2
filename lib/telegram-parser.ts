/**
 * Telegram message parser utilities.
 *
 * detectMessageType — classify inbound text into one of:
 *   "help" | "connect" | "todo" | "resource" | "note" | "unknown"
 *
 * parseTodo      — extract title + optional time estimate
 * parseResource  — extract URL + optional description + tags
 * parseNote      — extract trigger/title + content + tags
 * parseConnect   — extract the raw token from /connect <token>
 * fetchUrlMetadata — open-graph / <title> scrape for resource auto-title
 * sanitizeText   — clamp length + strip control characters
 */

import { TELEGRAM_RULES } from "./telegram-rules";

const { parse: P } = TELEGRAM_RULES;

// ── Types ─────────────────────────────────────────────────────────────────────

export type TelegramMessageType =
  | "help"
  | "connect"
  | "todo"
  | "resource"
  | "note"
  | "unknown";

export interface ParsedTodo {
  title: string;
  timeMin: number;
}

export interface ParsedResource {
  url: string;
  description: string | null;
  tags: string[];
}

export interface ParsedNote {
  trigger: string;
  title: string;
  content: string;
  tags: string[];
}

export interface ParsedConnect {
  token: string;
}

// ── URL regex ─────────────────────────────────────────────────────────────────

const URL_RE = /https?:\/\/[^\s"'<>]+/i;

// ── sanitizeText ──────────────────────────────────────────────────────────────

/** Clamp to maxLength and strip control characters except newlines/tabs. */
export function sanitizeText(
  text: string,
  maxLength = P.maxTextLength,
): string {
  return text
    .slice(0, maxLength)
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, "");
}

// ── detectMessageType ─────────────────────────────────────────────────────────

export function detectMessageType(text: string): TelegramMessageType {
  const lower = text.toLowerCase().trim();

  if (lower === "/start" || lower === "/help") return "help";
  if (lower.startsWith("/connect ")) return "connect";
  if (lower.startsWith("#todo ") || lower.startsWith("#todo\n")) return "todo";
  if (lower.startsWith("#note ") || lower.startsWith("#note\n")) return "note";
  if (URL_RE.test(text)) return "resource";

  return "unknown";
}

// ── parseTodo ─────────────────────────────────────────────────────────────────

/**
 * #todo <title> [@<n>min]
 * Examples:
 *   #todo Review PR
 *   #todo Buy groceries @30min
 *   #todo Deploy hotfix @2h
 */
export function parseTodo(text: string): ParsedTodo | null {
  const body = text.replace(/^#todo\s*/i, "").trim();
  if (!body) return null;

  let timeMin = 0;
  // @30min | @2h | @1.5h
  const timeMatch = body.match(/@(\d+(?:\.\d+)?)(min|h)\s*$/i);
  if (timeMatch) {
    const val = parseFloat(timeMatch[1]);
    timeMin =
      timeMatch[2].toLowerCase() === "h"
        ? Math.round(val * 60)
        : Math.round(val);
  }

  const title = body
    .replace(/@\d+(?:\.\d+)?(?:min|h)\s*$/i, "")
    .trim()
    .slice(0, P.maxTitleLength);

  if (!title) return null;

  return { title, timeMin };
}

// ── parseResource ─────────────────────────────────────────────────────────────

/**
 * Bare URL with optional description in double-quotes and/or #tags.
 * Examples:
 *   https://example.com
 *   https://example.com "great article" #js #testing
 *   https://example.com #typescript
 */
export function parseResource(text: string): ParsedResource | null {
  const urlMatch = text.match(URL_RE);
  if (!urlMatch) return null;
  const url = urlMatch[0].replace(/[.,;!?]+$/, ""); // strip trailing punctuation

  // Extract quoted description
  const descMatch = text.match(/"([^"]{1,500})"/);
  const description = descMatch
    ? descMatch[1].trim().slice(0, P.maxDescLength)
    : null;

  // Extract #tags (after URL, ignore the URL itself)
  const withoutUrl = text.replace(urlMatch[0], "").replace(/"[^"]*"/, "");
  const tags = extractTags(withoutUrl);

  return { url, description, tags };
}

// ── parseNote ─────────────────────────────────────────────────────────────────

/**
 * #note <content> [#tag1 #tag2]
 * The first line / sentence becomes the title.
 */
export function parseNote(text: string): ParsedNote | null {
  const body = text.replace(/^#note\s*/i, "").trim();
  if (!body) return null;

  const tags = extractTags(body);
  const contentWithoutTags = body
    .replace(/#\w+/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, P.maxDescLength);

  if (!contentWithoutTags) return null;

  // Title = first sentence or first 80 chars
  const firstSentence =
    contentWithoutTags.match(/^[^.!?\n]{1,80}/)?.[0]?.trim() ??
    contentWithoutTags.slice(0, 80);

  return {
    trigger: "#note",
    title: firstSentence,
    content: contentWithoutTags,
    tags,
  };
}

// ── parseConnect ──────────────────────────────────────────────────────────────

/** /connect qatg_<hex> */
export function parseConnect(text: string): ParsedConnect | null {
  const match = text.match(/^\/connect\s+(qatg_[a-f0-9]{32})\s*$/i);
  if (!match) return null;
  return { token: match[1] };
}

// ── fetchUrlMetadata ──────────────────────────────────────────────────────────

export interface UrlMetadata {
  title: string | null;
  description: string | null;
  image: string | null;
}

/**
 * Scrape Open Graph / meta tags from a URL.
 * Times out after 5 s. Never throws — returns empty metadata on any error.
 */
export async function fetchUrlMetadata(url: string): Promise<UrlMetadata> {
  const empty: UrlMetadata = { title: null, description: null, image: null };

  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 5_000);

    const res = await fetch(url, {
      signal: controller.signal,
      headers: {
        "User-Agent":
          "Mozilla/5.0 (compatible; QAPlaygroundBot/1.0; +https://qaplayground.dev)",
        Accept: "text/html",
      },
    });
    clearTimeout(timer);

    if (!res.ok) return empty;

    const html = await res.text();

    const get = (pattern: RegExp) => {
      const m = html.match(pattern);
      return m ? decodeHtmlEntities(m[1].trim()) : null;
    };

    const title =
      get(
        /<meta[^>]+property=["']og:title["'][^>]+content=["']([^"']{1,300})["']/i,
      ) ??
      get(
        /<meta[^>]+content=["']([^"']{1,300})["'][^>]+property=["']og:title["']/i,
      ) ??
      get(/<title[^>]*>([^<]{1,300})<\/title>/i);

    const description =
      get(
        /<meta[^>]+property=["']og:description["'][^>]+content=["']([^"']{1,500})["']/i,
      ) ??
      get(
        /<meta[^>]+content=["']([^"']{1,500})["'][^>]+property=["']og:description["']/i,
      ) ??
      get(
        /<meta[^>]+name=["']description["'][^>]+content=["']([^"']{1,500})["']/i,
      ) ??
      get(
        /<meta[^>]+content=["']([^"']{1,500})["'][^>]+name=["']description["']/i,
      );

    const image =
      get(
        /<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']{1,1000})["']/i,
      ) ??
      get(
        /<meta[^>]+content=["']([^"']{1,1000})["'][^>]+property=["']og:image["']/i,
      );

    return {
      title: title?.slice(0, P.maxTitleLength) ?? null,
      description: description?.slice(0, P.maxDescLength) ?? null,
      image: image ?? null,
    };
  } catch {
    return empty;
  }
}

// ── Internal helpers ──────────────────────────────────────────────────────────

function extractTags(text: string): string[] {
  const matches = text.match(/#(\w+)/g) ?? [];
  return [
    ...new Set(
      matches
        .map((t) => t.slice(1).toLowerCase())
        .filter((t) => t.length > 0 && t.length <= 30),
    ),
  ].slice(0, P.maxTags);
}

function decodeHtmlEntities(str: string): string {
  return str
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, " ");
}
