export type ChromeIconName =
  | "arrow-right"
  | "book-open"
  | "bookmark"
  | "camera"
  | "check-circle"
  | "chrome"
  | "clock"
  | "code-2"
  | "download"
  | "external-link"
  | "file-image"
  | "file-text"
  | "globe"
  | "history"
  | "key"
  | "layers"
  | "log-in"
  | "settings"
  | "shield-check"
  | "tag"
  | "user-check"
  | "video"
  | "zap";

export type ChromeTone =
  | "blue"
  | "emerald"
  | "orange"
  | "red"
  | "slate"
  | "teal"
  | "violet"
  | "yellow";

export interface ChromeBadge {
  icon: ChromeIconName;
  label: string;
  tone: ChromeTone;
}

export interface ChromeStat {
  value: string;
  label: string;
}

export interface ChromeFeature {
  icon: ChromeIconName;
  title: string;
  description: string;
  tone: ChromeTone;
}

export interface ChromeStep {
  step: string;
  title: string;
  description: string;
  tone: ChromeTone;
}

export interface ChromeFormatCard {
  icon: ChromeIconName;
  label: string;
  description: string;
  items: string[];
  tone: ChromeTone;
}

export interface ChromeUseCase {
  icon: ChromeIconName;
  title: string;
  description: string;
  tone: ChromeTone;
}

export interface ChromeFaqItem {
  question: string;
  answer: string;
}

export interface ChromeLinkItem {
  label: string;
  href: string;
}

export interface ChromeSessionPreviewItem {
  name: string;
  date: string;
  count: number;
  label: string;
  tone: ChromeTone;
}

/**
 * Categories used to group and filter the Chrome extension wall.
 *
 * Add a new category here and any extension tagged with it is automatically
 * surfaced as a filter on the `/chrome` page — keeping the list scalable as
 * more extensions are added over time.
 */
export const chromeExtensionCategories = [
  "Documentation",
  "Productivity",
  "Accessibility",
  "Automation",
  "API & Network",
  "Sessions & Cookies",
  "Tech Stack",
  "Links & SEO",
] as const;

export type ChromeExtensionCategory =
  (typeof chromeExtensionCategories)[number];

/**
 * A single QA-focused Chrome extension shown on the `/chrome` wall.
 *
 * The card renders a branded banner using `icon` + `tone` (no external image
 * fetches), so the grid stays fast and never shows broken images. `storeUrl`
 * points to the Chrome Web Store detail page so users can install in one click.
 */
export interface ChromeExtension {
  /** Stable kebab-case id used for keys and `data-testid`. */
  id: string;
  /** Extension name (rendered as the card's <h2>). */
  name: string;
  /** Short one-line hook shown under the title. */
  tagline: string;
  /** Longer description of what the extension does for QA. */
  description: string;
  /** Primary category, used by the filter bar. */
  category: ChromeExtensionCategory;
  /** Free-form keywords for search + card pills. */
  tags: string[];
  /** Icon key from `chromeIconMap` for the banner. */
  icon: ChromeIconName;
  /** Brand tone key from `chromeToneClasses` for the banner. */
  tone: ChromeTone;
  /**
   * Where the card links. For third-party extensions this is the Chrome Web
   * Store detail URL; for our own extensions it's an internal route (e.g.
   * `/chrome/qa-capture`) — see `internal`.
   */
  storeUrl: string;
  /**
   * When true, `storeUrl` is an internal app route, so the card renders a
   * same-tab Next `<Link>` instead of an external `<a target="_blank">`.
   */
  internal?: boolean;
  /** Publisher / developer name. */
  developer: string;
  /** Highlighted as recommended when true. */
  featured?: boolean;
  /** Chrome Web Store download / user count (display string, e.g. "500K+"). */
  downloads?: string;
}
