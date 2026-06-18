/**
 * Shared metadata types.
 *
 * These types power a single, centralized metadata system:
 *   - `SiteBasicDetails` is the one source of truth for site-wide values
 *     (name, URL, social handles, default OG image, etc.).
 *   - `PageMetadataInput` is the small, page-specific payload each route
 *     provides. It is merged with the site defaults by `createPageMetadata`
 *     to produce a fully SEO-ready Next.js `Metadata` object.
 */

/** An Open Graph / Twitter share image. URL is relative to `metadataBase`. */
export type OpenGraphImage = {
  /** Relative (preferred) or absolute image URL. */
  url: string;
  /** Recommended 1200x630 for og:image. */
  width: number;
  height: number;
  /** Descriptive alt text — improves accessibility and SEO. */
  alt: string;
};

/** Author / creator info used for `authors`, `creator`, and OG article tags. */
export type SiteAuthor = {
  name: string;
  url: string;
};

/**
 * Site-wide, rarely-changing values. Edit these in one place
 * (`data/meta-data/basic-details-data.ts`) and every page inherits them.
 */
export type SiteBasicDetails = {
  /** Full brand name, e.g. "QA Playground". */
  websiteName: string;
  /** Short name for PWAs / Apple web app, e.g. "QAPlay". */
  websiteShortName: string;
  /** Canonical origin, NO trailing slash, e.g. "https://qaplayground.com". */
  websiteURL: string;
  /** Default meta description used when a page does not supply its own. */
  websiteDescription: string;
  /** Public contact email shown on contact and legal pages. */
  websiteEmail: string;
  /** Short marketing tagline used in titles / OG when helpful. */
  tagline: string;
  /** OG locale, e.g. "en_US". */
  locale: string;
  /** Primary author / creator of the site. */
  author: SiteAuthor;
  /** Twitter/X handle including the leading "@", e.g. "@qaplayground". */
  twitterHandle: string;
  /** Keywords applied to every page (pages can add their own on top). */
  defaultKeywords: string[];
  /** Default social share image used when a page does not provide one. */
  defaultOgImage: OpenGraphImage;
  /**
   * Publisher logo used in JSON-LD structured data (`publisher.logo`).
   * Must be a raster image (PNG/JPG) per Google's guidelines — SVG is not
   * accepted here. URL is relative to `metadataBase`.
   */
  publisherLogo: OpenGraphImage;
};

/**
 * A single crawlable route entry used to generate `app/sitemap.ts`.
 * Keep these in `data/meta-data/site-routes.ts` so the sitemap stays
 * easy to maintain — add a route here and it appears in the sitemap.
 */
export type SiteRoute = {
  /** Route path relative to the site origin, e.g. "/" or "/practice". */
  path: string;
  /** How often the page is likely to change. Hints crawler frequency. */
  changeFrequency?:
    | "always"
    | "hourly"
    | "daily"
    | "weekly"
    | "monthly"
    | "yearly"
    | "never";
  /** Relative importance from 0.0 to 1.0. Home is typically 1.0. */
  priority?: number;
  /** ISO 8601 date the page was last meaningfully updated, e.g. "2026-06-16". */
  lastModified?: string;
};

/**
 * Input for building Article JSON-LD (schema.org/Article) structured data.
 * Page-specific values; everything optional falls back to `SiteBasicDetails`.
 * Used by `createArticleJsonLd` so dates and publisher info stay in one place.
 */
export type ArticleStructuredDataInput = {
  /** Headline shown in rich search results. */
  headline: string;
  /** Short summary. Falls back to the site description when omitted. */
  description?: string;
  /** Route path used to build the canonical article URL. Defaults to "/". */
  path?: string;
  /**
   * Representative image URL (relative or absolute) or a full image object.
   * Falls back to the default OG image when omitted.
   */
  image?: string | OpenGraphImage;
  /** ISO 8601 date the content was first published, e.g. "2026-01-01". */
  datePublished: string;
  /** ISO 8601 date the content was last updated. Defaults to `datePublished`. */
  dateModified?: string;
};

/**
 * Input for building schema.org/BlogPosting JSON-LD for a blog article.
 * Extends the Article shape with per-post author, tags/keywords, and the
 * canonical blog path. Everything optional falls back to `SiteBasicDetails`.
 */
export type BlogPostingStructuredDataInput = {
  /** Headline shown in rich search results. */
  headline: string;
  /** Short summary. Falls back to the site description when omitted. */
  description?: string;
  /** Route path used to build the canonical post URL, e.g. "/blog/my-post". */
  path: string;
  /**
   * Representative image URL (relative or absolute) or a full image object.
   * Falls back to the default OG image when omitted.
   */
  image?: string | OpenGraphImage;
  /** ISO 8601 date the post was first published, e.g. "2026-06-18". */
  datePublished: string;
  /** ISO 8601 date the post was last updated. Defaults to `datePublished`. */
  dateModified?: string;
  /** Author display name. Falls back to the site author. */
  authorName?: string;
  /** Topic keywords/tags surfaced as `keywords` in the structured data. */
  keywords?: string[];
};

/** A single breadcrumb item used by `BreadcrumbList` JSON-LD. */
export type BreadcrumbItemStructuredDataInput = {
  /** Human-readable breadcrumb label, e.g. "Practice". */
  name: string;
  /** Relative path or absolute URL for the breadcrumb target. */
  path: string;
};

/** A single FAQ row used by `FAQPage` JSON-LD. */
export type FaqStructuredDataItemInput = {
  /** Visible question text. */
  question: string;
  /** Visible answer text. */
  answer: string;
};

/** Input for building `WebPage` JSON-LD. */
export type WebPageStructuredDataInput = {
  /** Page name shown in structured data, e.g. "Practice Elements". */
  name: string;
  /** Page summary. Falls back to the site description when omitted. */
  description?: string;
  /** Route path used to build the canonical page URL. Defaults to "/". */
  path?: string;
  /**
   * Representative image URL (relative or absolute) or a full image object.
   * Falls back to the default OG image when omitted.
   */
  image?: string | OpenGraphImage;
  /** Optional high-level topics the page is about. */
  about?: string[];
  /** Optional primary entity or entities represented on the page. */
  mainEntity?: Record<string, unknown> | Array<Record<string, unknown>>;
};

/** Input for building site-level `Organization` JSON-LD. */
export type OrganizationStructuredDataInput = {
  /** Override the organization name. Falls back to the site name. */
  name?: string;
  /** Override the canonical organization URL. Falls back to the site URL. */
  url?: string;
  /** Brand description. Falls back to the site description. */
  description?: string;
  /** Optional public social profile URLs. */
  sameAs?: string[];
  /**
   * Organization logo URL (relative or absolute) or full image object.
   * Falls back to the publisher logo.
   */
  logo?: string | OpenGraphImage;
};

/** Input for building site-level `WebSite` JSON-LD. */
export type WebSiteStructuredDataInput = {
  /** Override the site name. Falls back to the site name. */
  name?: string;
  /** Override the canonical site URL. Falls back to the site URL. */
  url?: string;
  /** Site description. Falls back to the site description. */
  description?: string;
  /**
   * Relative path or absolute URL for site search results, with a `{search_term_string}`
   * placeholder when real site search exists.
   */
  searchTarget?: string;
};

/**
 * Per-page metadata input. Only `title` is required; everything else
 * falls back to `SiteBasicDetails`. Keep this object next to each page
 * (or in `data/meta-data/*`) so content stays easy to manage.
 */
export type PageMetadataInput = {
  /** Page title fragment, e.g. "Practice". Combined with the title template. */
  title: string;
  /** Page description. Falls back to the site description when omitted. */
  description?: string;
  /** Route path for the canonical URL, e.g. "/practice". Defaults to "/". */
  path?: string;
  /** Extra keywords merged with the site's default keywords. */
  keywords?: string[];
  /** Override the default social share image for this page. */
  ogImage?: OpenGraphImage;
  /** Open Graph type. Defaults to "website". */
  ogType?: "website" | "article";
  /** When true, the page is hidden from search engines. Defaults to false. */
  noIndex?: boolean;
  /**
   * When true, the page title ignores the parent template and is used as-is
   * (typically the homepage, which carries the full brand title).
   */
  useAbsoluteTitle?: boolean;
};
