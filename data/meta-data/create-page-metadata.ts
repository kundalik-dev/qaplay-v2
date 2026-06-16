import type { Metadata } from "next";

import type { PageMetadataInput } from "@/types/meta-data-types";

import { basicDetails } from "./basic-details-data";

/**
 * Builds a complete, SEO-ready Next.js `Metadata` object from a small
 * per-page input merged with the site-wide `basicDetails`.
 *
 * Use this for any page so titles, canonical URLs, Open Graph, Twitter
 * cards, and robots rules stay consistent and managed from one place.
 *
 * @example
 *   export const metadata = createPageMetadata({
 *     title: "Practice",
 *     description: "Hands-on Selenium, Playwright & Cypress challenges.",
 *     path: "/practice",
 *   });
 */
export function createPageMetadata(input: PageMetadataInput): Metadata {
  const {
    title,
    description = basicDetails.websiteDescription,
    path = "/",
    keywords = [],
    ogImage = basicDetails.defaultOgImage,
    ogType = "website",
    noIndex = false,
    useAbsoluteTitle = false,
  } = input;

  // Normalize the canonical path to a leading-slash relative path so it
  // composes cleanly with `metadataBase`.
  const canonicalPath = path.startsWith("/") ? path : `/${path}`;

  return {
    // Lets every relative URL (canonical, OG image) resolve to an absolute one.
    metadataBase: new URL(basicDetails.websiteURL),

    // `absolute` is used for the homepage (full brand title); other pages
    // flow through the title template defined in the root layout.
    title: useAbsoluteTitle ? { absolute: title } : title,

    description,

    // Site-wide keywords first, then page-specific ones (de-duplicated).
    keywords: Array.from(new Set([...basicDetails.defaultKeywords, ...keywords])),

    authors: [basicDetails.author],
    creator: basicDetails.author.name,
    publisher: basicDetails.websiteName,

    // Canonical URL prevents duplicate-content issues.
    alternates: {
      canonical: canonicalPath,
    },

    robots: noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
          },
        },

    openGraph: {
      type: ogType,
      siteName: basicDetails.websiteName,
      title,
      description,
      url: canonicalPath,
      locale: basicDetails.locale,
      images: [ogImage],
    },

    twitter: {
      card: "summary_large_image",
      site: basicDetails.twitterHandle,
      creator: basicDetails.twitterHandle,
      title,
      description,
      images: [ogImage.url],
    },

    icons: {
      icon: "/favicon.ico",
    },
  };
}
