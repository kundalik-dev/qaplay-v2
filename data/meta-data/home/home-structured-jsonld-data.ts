import { faqItems } from "@/data/faq-data";

import { basicDetails } from "../basic-details-data";
import {
  createArticleJsonLd,
  createFaqPageJsonLd,
  createWebPageJsonLd,
} from "../structured-data";

/**
 * Homepage Article structured data.
 *
 * Update `datePublished` / `dateModified` here when the homepage content
 * meaningfully changes so search engines see an accurate publication date.
 */
export const homePageArticleJsonLd = createArticleJsonLd({
  headline: `${basicDetails.websiteName} - Practice Selenium, Playwright & Cypress`,
  description: basicDetails.websiteDescription,
  path: "/",
  datePublished: "2026-01-01",
  dateModified: "2026-06-16",
});

/** Homepage WebPage structured data. */
export const homePageWebPageJsonLd = createWebPageJsonLd({
  name: `${basicDetails.websiteName} - Practice Selenium, Playwright & Cypress`,
  description: basicDetails.websiteDescription,
  path: "/",
  about: [
    "Selenium practice",
    "Playwright practice",
    "Cypress practice",
    "QA interview preparation",
  ],
});

/** Homepage FAQ structured data aligned with the visible FAQ section. */
export const homePageFaqJsonLd = createFaqPageJsonLd(faqItems);
