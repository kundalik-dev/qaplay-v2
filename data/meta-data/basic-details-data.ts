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

  websiteEmail: "kundalik.dev@gmail.com",

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

/**
 * Outbound links to owned channels, communities, and product pages.
 *
 * Kept alongside `basicDetails` so every page (contact, about, footer)
 * pulls these from one place. `*ShareURL` helpers are derived from the
 * canonical site URL above.
 */
export const allUrls = {
  youtubeURL: "https://www.youtube.com/@qaplayground",
  githubURL: "https://github.com/kundalik-dev",
  githubIssue: "https://github.com/kundalik-dev/qaplayground-support/issues",
  automationFrameworkURL:
    "https://github.com/kundalik5545/QA_PlayGround_Automation_Framework",
  linkedInURL: "https://www.linkedin.com/in/kundalik-jadhav",
  telegramBotURL: "https://t.me/QAPlayGround_Bot",
  telegramShareURL: `https://t.me/share/url?url=${encodeURIComponent(
    basicDetails.websiteURL,
  )}`,
  twitterURL: "https://x.com/qaplayground",
  twitterShareURL: "https://x.com/qaplayground",
  whatsappCommunityURL: "https://chat.whatsapp.com/IOrvSZXdGokFXBz85QcP6R",
  qaCaptureChromeURL:
    "https://chromewebstore.google.com/detail/jhgkhnokloeklnagbkgkgcfphafifefg?utm_source=item-share-cb",
  qaClipperChromeURL:
    "https://chromewebstore.google.com/detail/jegdkegbomfbmhhimfjgacdblcoodfpd?utm_source=item-share-cb",
} as const;

/** Public social handles/usernames used for display and JSON-LD `sameAs`. */
export const socialHandles = {
  facebookId: "qaplayground",
  githubId: "kundalik-dev",
  whatsappId: "qaplayground",
  twitterId: "qaplayground",
  telegramId: "qaplayground",
  youtubeId: "qaplayground",
} as const;
