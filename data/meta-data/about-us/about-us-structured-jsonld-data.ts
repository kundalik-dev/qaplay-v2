import { aboutOfferings } from "@/data/about-us/about-us-data";

import { allUrls } from "../basic-details-data";
import {
  createBreadcrumbJsonLd,
  createOrganizationJsonLd,
  createWebPageJsonLd,
} from "../structured-data";

const aboutUsDescription =
  "QA Playground is a free, purpose-built platform for QA automation engineers to practice Selenium, Playwright, and Cypress through 22+ interactive elements, a Bank Demo app, and a Study Tracker.";

/** WebPage structured data for the About Us page. */
export const aboutUsWebPageJsonLd = createWebPageJsonLd({
  name: "About QA Playground",
  description: aboutUsDescription,
  path: "/about-us",
  about: [
    "QA Playground",
    "automation testing practice",
    "Selenium, Playwright and Cypress",
  ],
  // Surface what the platform offers as an ItemList so search engines
  // understand the page describes a set of distinct capabilities.
  mainEntity: {
    "@type": "ItemList",
    itemListOrder: "https://schema.org/ItemListOrderAscending",
    numberOfItems: aboutOfferings.length,
    itemListElement: aboutOfferings.map((offering, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: offering.title,
      description: offering.description,
    })),
  },
});

/** Organization structured data — ideal on an About page for `sameAs`. */
export const aboutUsOrganizationJsonLd = createOrganizationJsonLd({
  description: aboutUsDescription,
  sameAs: [
    allUrls.youtubeURL,
    allUrls.githubURL,
    allUrls.linkedInURL,
    allUrls.twitterURL,
  ],
});

export const aboutUsBreadcrumbJsonLd = createBreadcrumbJsonLd([
  { name: "Home", path: "/" },
  { name: "About Us", path: "/about-us" },
]);
