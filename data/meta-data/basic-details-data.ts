import type { SiteBasicDetails } from "@/types/meta-data-types";

/**
 * Single source of truth for site-wide details.
 *
 * Update values here and they propagate to every page's metadata through
 * `createPageMetadata`. Keep this file free of page-specific content.
 */
export const basicDetails: SiteBasicDetails = {
  websiteName: "QA Playground",
  websiteShortName: "QAPlay",

  // Canonical origin — NO trailing slash. Used as `metadataBase` and for
  // building canonical + Open Graph URLs. Update to the production domain.
  websiteURL: "https://qaplayground.com",

  websiteDescription:
    "Practice Selenium, Playwright & Cypress with 14+ interactive UI elements, demo apps and rehersal AI-powered mock interviews.",

  tagline: "Master Automation Testing",

  locale: "en_US",

  author: {
    name: "Kundalik",
    url: "https://github.com/kundalik-dev",
  },

  twitterHandle: "@qaplayground",

  defaultKeywords: [
    "QA Playground",
    "automation testing",
    "Selenium testing",
    "Playwright testing",
    "Cypress testing",
    "Selenium WebDriver",
    "test automation",
    "QA automation practice",
    "QA mock interview",
    "QA study tracker",
  ],

  defaultOgImage: {
    url: "/og-image.png",
    width: 1200,
    height: 630,
    alt: "QA Playground — Master Automation Testing",
  },

  // Raster logo for JSON-LD `publisher.logo` (Google rejects SVG here).
  publisherLogo: {
    url: "/icons/android-chrome-512x512.png",
    width: 512,
    height: 512,
    alt: "QA Playground logo",
  },
};
