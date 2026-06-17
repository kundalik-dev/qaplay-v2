import {
  chromeExtensions,
  chromePageDescription,
  chromePageTitle,
} from "@/data/chrome/chrome-extensions-data";

import { basicDetails } from "../basic-details-data";
import {
  createBreadcrumbJsonLd,
  createWebPageJsonLd,
} from "../structured-data";

/** Resolve internal (relative) store URLs to absolute ones for JSON-LD. */
function toAbsoluteStoreUrl(url: string): string {
  return url.startsWith("/") ? `${basicDetails.websiteURL}${url}` : url;
}

export const chromeWebPageJsonLd = createWebPageJsonLd({
  name: chromePageTitle,
  description: chromePageDescription,
  path: "/chrome",
  about: [
    "QA Chrome extensions",
    "accessibility testing tools",
    "test automation tools",
    "API inspection tools",
  ],
  // Surface the curated list as an ItemList so search engines understand the
  // page is a collection of distinct, linkable software tools.
  mainEntity: {
    "@type": "ItemList",
    itemListOrder: "https://schema.org/ItemListOrderAscending",
    numberOfItems: chromeExtensions.length,
    itemListElement: chromeExtensions.map((extension, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "SoftwareApplication",
        name: extension.name,
        description: extension.description,
        applicationCategory: "BrowserApplication",
        operatingSystem: "Chrome",
        url: toAbsoluteStoreUrl(extension.storeUrl),
        author: {
          "@type": "Organization",
          name: extension.developer,
        },
      },
    })),
  },
});

export const chromeBreadcrumbJsonLd = createBreadcrumbJsonLd([
  { name: "Home", path: "/" },
  { name: "Chrome Extensions", path: "/chrome" },
]);
