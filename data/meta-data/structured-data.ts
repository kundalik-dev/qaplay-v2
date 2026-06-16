import type { ArticleStructuredDataInput } from "@/types/meta-data-types";

import { basicDetails } from "./basic-details-data";

/**
 * Structured data (JSON-LD) builders.
 *
 * These produce plain objects shaped to schema.org types. Render them with
 * the reusable `<JsonLd />` component. Site-wide values (author, publisher,
 * logo, origin) come from `basicDetails`, so structured data stays consistent
 * and managed from one place.
 */

/** Resolve a relative path/URL to an absolute one against the site origin. */
function toAbsoluteUrl(pathOrUrl: string): string {
  if (/^https?:\/\//.test(pathOrUrl)) return pathOrUrl;
  const path = pathOrUrl.startsWith("/") ? pathOrUrl : `/${pathOrUrl}`;
  return `${basicDetails.websiteURL}${path}`;
}

/**
 * Build schema.org/Article JSON-LD with the publication and modification
 * dates search engines look for, plus author and publisher (with logo).
 */
export function createArticleJsonLd(input: ArticleStructuredDataInput) {
  const {
    headline,
    description = basicDetails.websiteDescription,
    path = "/",
    image = basicDetails.defaultOgImage.url,
    datePublished,
    dateModified = datePublished,
  } = input;

  const url = toAbsoluteUrl(path);

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline,
    description,
    image: [toAbsoluteUrl(image)],
    datePublished,
    dateModified,
    inLanguage: basicDetails.locale.replace("_", "-"),
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    url,
    author: {
      "@type": "Person",
      name: basicDetails.author.name,
      url: basicDetails.author.url,
    },
    publisher: {
      "@type": "Organization",
      name: basicDetails.websiteName,
      logo: {
        "@type": "ImageObject",
        url: toAbsoluteUrl(basicDetails.publisherLogo.url),
        width: basicDetails.publisherLogo.width,
        height: basicDetails.publisherLogo.height,
      },
    },
  } as const;
}
