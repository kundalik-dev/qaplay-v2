import { basicDetails } from "../basic-details-data";
import { createArticleJsonLd } from "../structured-data";

/**
 * Homepage Article structured data.
 *
 * Update `datePublished` / `dateModified` here when the homepage content
 * meaningfully changes so search engines see an accurate publication date.
 */
export const homePageJsonLd = createArticleJsonLd({
  headline: `${basicDetails.websiteName} — Practice Selenium, Playwright & Cypress`,
  description: basicDetails.websiteDescription,
  path: "/",
  datePublished: "2026-01-01",
  dateModified: "2026-06-16",
});
