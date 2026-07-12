import type { SiteRoute } from "@/types/meta-data-types";

/**
 * Crawlable routes for the sitemap.
 *
 * Single source of truth consumed by `app/sitemap.ts`. Add a new public
 * page here (matching a route under `app/`) and it is automatically
 * included in `/sitemap.xml`. Keep `lastModified` current when a page's
 * content meaningfully changes so search engines see accurate dates.
 *
 * Do not list non-indexable routes (API handlers, auth, admin) here.
 */
export const siteRoutes: SiteRoute[] = [
  {
    path: "/",
    changeFrequency: "weekly",
    priority: 1,
    lastModified: "2026-06-16",
  },
  {
    path: "/practice",
    changeFrequency: "weekly",
    priority: 0.9,
    lastModified: "2026-06-16",
  },
  {
    path: "/practice/input-fields",
    changeFrequency: "monthly",
    priority: 0.75,
    lastModified: "2026-06-18",
  },
  {
    path: "/practice/buttons",
    changeFrequency: "monthly",
    priority: 0.75,
    lastModified: "2026-06-18",
  },
  {
    path: "/practice/forms",
    changeFrequency: "monthly",
    priority: 0.75,
    lastModified: "2026-06-18",
  },
  {
    path: "/practice/dropdowns",
    changeFrequency: "monthly",
    priority: 0.75,
    lastModified: "2026-06-18",
  },
  {
    path: "/practice/data-table",
    changeFrequency: "monthly",
    priority: 0.75,
    lastModified: "2026-06-19",
  },
  {
    path: "/practice/alerts-dialogs",
    changeFrequency: "monthly",
    priority: 0.75,
    lastModified: "2026-06-24",
  },
  {
    path: "/practice/radio-checkbox",
    changeFrequency: "monthly",
    priority: 0.75,
    lastModified: "2026-06-24",
  },
  {
    path: "/practice/date-picker",
    changeFrequency: "monthly",
    priority: 0.75,
    lastModified: "2026-06-24",
  },
  {
    path: "/practice/links",
    changeFrequency: "monthly",
    priority: 0.75,
    lastModified: "2026-06-24",
  },
  {
    path: "/practice/tabs-windows",
    changeFrequency: "monthly",
    priority: 0.75,
    lastModified: "2026-06-24",
  },
  {
    path: "/practice/dynamic-waits",
    changeFrequency: "monthly",
    priority: 0.75,
    lastModified: "2026-06-24",
  },
  {
    path: "/practice/multi-select",
    changeFrequency: "monthly",
    priority: 0.75,
    lastModified: "2026-06-24",
  },
  {
    path: "/practice/file-upload",
    changeFrequency: "monthly",
    priority: 0.75,
    lastModified: "2026-06-24",
  },
  {
    path: "/practice/drag-drop",
    changeFrequency: "monthly",
    priority: 0.75,
    lastModified: "2026-06-24",
  },
  {
    path: "/practice/iframes",
    changeFrequency: "monthly",
    priority: 0.75,
    lastModified: "2026-06-24",
  },
  {
    path: "/practice/shadow-dom",
    changeFrequency: "monthly",
    priority: 0.75,
    lastModified: "2026-06-24",
  },
  {
    path: "/practice/modals",
    changeFrequency: "monthly",
    priority: 0.75,
    lastModified: "2026-07-01",
  },
  {
    path: "/practice/infinite-scroll",
    changeFrequency: "monthly",
    priority: 0.75,
    lastModified: "2026-07-01",
  },
  {
    path: "/practice/annotations",
    changeFrequency: "monthly",
    priority: 0.75,
    lastModified: "2026-07-01",
  },
  {
    path: "/demo",
    changeFrequency: "weekly",
    priority: 0.8,
    lastModified: "2026-06-17",
  },
  {
    path: "/demo/bank",
    changeFrequency: "monthly",
    priority: 0.7,
    lastModified: "2026-06-17",
  },
  {
    path: "/demo/shopping",
    changeFrequency: "monthly",
    priority: 0.7,
    lastModified: "2026-06-17",
  },
  {
    path: "/demo/github-user-search",
    changeFrequency: "monthly",
    priority: 0.7,
    lastModified: "2026-07-01",
  },
  {
    path: "/chrome",
    changeFrequency: "weekly",
    priority: 0.8,
    lastModified: "2026-06-17",
  },
  {
    path: "/chrome/qa-capture",
    changeFrequency: "monthly",
    priority: 0.75,
    lastModified: "2026-06-17",
  },
  {
    path: "/chrome/qa-clipper",
    changeFrequency: "monthly",
    priority: 0.75,
    lastModified: "2026-06-17",
  },
  {
    path: "/blog",
    changeFrequency: "weekly",
    priority: 0.7,
    lastModified: "2026-06-18",
  },
  {
    path: "/qa-tools",
    changeFrequency: "monthly",
    priority: 0.7,
    lastModified: "2026-06-19",
  },
  {
    path: "/qa-tools/uuid-generator",
    changeFrequency: "monthly",
    priority: 0.65,
    lastModified: "2026-06-19",
  },
  {
    path: "/interview-questions",
    changeFrequency: "monthly",
    priority: 0.7,
    lastModified: "2026-06-19",
  },
  {
    path: "/about-us",
    changeFrequency: "yearly",
    priority: 0.5,
    lastModified: "2026-06-17",
  },
  {
    path: "/about-me",
    changeFrequency: "yearly",
    priority: 0.5,
    lastModified: "2026-06-17",
  },
  {
    path: "/contact-us",
    changeFrequency: "yearly",
    priority: 0.4,
    lastModified: "2026-06-17",
  },
  {
    path: "/privacy-policy",
    changeFrequency: "yearly",
    priority: 0.3,
    lastModified: "2026-06-06",
  },
];
