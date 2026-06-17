import type { ChromeExtension } from "./types";

/**
 * Content + data for the `/chrome` extensions wall.
 *
 * Everything the page renders lives here so it stays easy to maintain and
 * scale. To add a new extension, append an object to `chromeExtensions` — the
 * grid, search, filters, and structured data all read from this single array.
 */

export const chromePageEyebrow = "QA Toolbox";

export const chromePageTitle =
  "Chrome Extensions Every QA Engineer Should Have";

export const chromePageDescription =
  "A curated wall of the most useful Chrome extensions for QA engineers — accessibility checkers, automation recorders, API inspectors, and more. Search, filter by category, and install any of them in one click from the Chrome Web Store.";

/** Short, single-line subtitle shown under the page H1 (the long version above
 *  stays the SEO/meta description). */
export const chromePageSubtitle =
  "Curated, install-ready Chrome extensions that speed up everyday QA work — search or filter to find your next one.";

/**
 * The extension catalog. Keep `id` stable (used for keys + test ids) and point
 * `storeUrl` at the Chrome Web Store detail page so "Add to Chrome" works.
 */
export const chromeExtensions: ChromeExtension[] = [
  {
    id: "qa-capture",
    name: "QA Capture",
    tagline: "Screenshot every test step, export in one click",
    description:
      "Our own extension. Capture screenshots continuously during testing, name each step, and export the whole session as PDF, Markdown, or HTML — perfect for bug reports and test evidence.",
    category: "Documentation",
    tags: ["screenshots", "documentation", "bug reports", "evidence"],
    icon: "camera",
    tone: "blue",
    storeUrl: "/chrome/qa-capture",
    internal: true,
    developer: "QA Playground",
    featured: true,
  },
  {
    id: "qa-clipper",
    name: "QA Clipper",
    tagline: "Clip articles & courses into your Study Tracker",
    description:
      "Our own extension. Save articles, videos, courses, and docs straight into your QA Playground Study Tracker with one click, so your learning resources stay organized in one place.",
    category: "Productivity",
    tags: ["study tracker", "bookmarks", "learning", "productivity"],
    icon: "bookmark",
    tone: "violet",
    storeUrl: "/chrome/qa-clipper",
    internal: true,
    developer: "QA Playground",
    featured: true,
  },
  {
    id: "axe-devtools",
    name: "axe DevTools",
    tagline: "Catch accessibility issues before users do",
    description:
      "Deque's industry-standard accessibility testing engine. Run an automated WCAG audit on any page in seconds, get zero-false-positive issue lists, and see exactly which element and rule failed.",
    category: "Accessibility",
    tags: ["accessibility", "a11y", "wcag", "audit"],
    icon: "shield-check",
    tone: "violet",
    storeUrl:
      "https://chromewebstore.google.com/detail/axe-devtools-web-accessib/lhdoppojpmngadmnindnejefpokejbdd",
    developer: "Deque Systems",
    featured: true,
  },
  {
    id: "selenium-ide",
    name: "Selenium IDE",
    tagline: "Record and replay browser test flows",
    description:
      "Record your interactions into a reusable test, replay them across runs, and export the script to WebDriver code. A fast way to prototype automation and reproduce bugs step by step.",
    category: "Automation",
    tags: ["automation", "selenium", "record", "playback"],
    icon: "zap",
    tone: "blue",
    storeUrl:
      "https://chromewebstore.google.com/detail/selenium-ide/mooikfkahbdckldjjndioackbalphokd",
    developer: "Selenium",
    featured: true,
  },
  {
    id: "json-viewer-pro",
    name: "JSON Viewer Pro",
    tagline: "Read and inspect API responses cleanly",
    description:
      "Automatically formats raw JSON into a collapsible, searchable, syntax-highlighted tree. Essential for verifying API responses and debugging network payloads while testing.",
    category: "API & Network",
    tags: ["api", "json", "network", "debugging"],
    icon: "code-2",
    tone: "emerald",
    storeUrl:
      "https://chromewebstore.google.com/detail/json-viewer-pro/eifflpmocdbdmepbjaopkkhbfmdgijcc",
    developer: "tulios",
  },
  {
    id: "cookie-editor",
    name: "Cookie-Editor",
    tagline: "Edit cookies to test sessions & auth",
    description:
      "Create, edit, delete, import, and export cookies from a clean popup. Perfect for testing authenticated states, session expiry, and feature flags without leaving the page under test.",
    category: "Sessions & Cookies",
    tags: ["cookies", "session", "auth", "storage"],
    icon: "key",
    tone: "yellow",
    storeUrl:
      "https://chromewebstore.google.com/detail/cookie-editor/hlkenndednhfkekhgcdicdfddnkalmdm",
    developer: "Moustachauve",
  },
  {
    id: "wappalyzer",
    name: "Wappalyzer",
    tagline: "Identify the tech stack of any site",
    description:
      "Instantly reveals the frameworks, analytics, CMS, and libraries a site runs on. Great for understanding the system under test and planning the right automation strategy.",
    category: "Tech Stack",
    tags: ["tech stack", "frameworks", "analysis", "recon"],
    icon: "layers",
    tone: "teal",
    storeUrl:
      "https://chromewebstore.google.com/detail/wappalyzer-technology-pro/gppongmhjkpfnbhagpmjfkannfbllamg",
    developer: "Wappalyzer",
  },
  {
    id: "check-my-links",
    name: "Check My Links",
    tagline: "Find broken links across a page",
    description:
      "Crawls every link on the current page and highlights the broken ones in red. A quick, reliable smoke test for content, navigation, and regression checks before release.",
    category: "Links & SEO",
    tags: ["links", "broken links", "seo", "smoke test"],
    icon: "globe",
    tone: "orange",
    storeUrl:
      "https://chromewebstore.google.com/detail/check-my-links/ojkcdipcgfaekbeaelaapakgnjflfglf",
    developer: "Paul Livesey",
  },
];
