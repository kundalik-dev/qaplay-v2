import { basicDetails } from "./basic-details-data";
import {
  createOrganizationJsonLd,
  createWebSiteJsonLd,
} from "./structured-data";

/** Site-level Organization JSON-LD for brand identity. */
export const siteOrganizationJsonLd = createOrganizationJsonLd({
  sameAs: [
    basicDetails.author.url,
    "https://x.com/qaplayground",
    "https://github.com/kundalik-dev",
  ],
});

/** Site-level WebSite JSON-LD for the overall product/site entity. */
export const siteWebSiteJsonLd = createWebSiteJsonLd();
