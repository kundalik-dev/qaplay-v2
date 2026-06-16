import { basicDetails } from "../basic-details-data";
import { createPageMetadata } from "../create-page-metadata";

/**
 * Homepage metadata.
 *
 * Built from `basicDetails` via `createPageMetadata`, so site-wide values
 * (name, URL, social handles, OG image, robots) stay managed in one place.
 * The homepage uses an absolute title carrying the full brand + tagline.
 */
export const homePageMetadata = createPageMetadata({
  title: `${basicDetails.websiteName} — Practice Selenium, Playwright & Cypress`,
  description: basicDetails.websiteDescription,
  path: "/",
  useAbsoluteTitle: true,
  ogType: "website",
});
