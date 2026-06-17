import type {
  ArticleStructuredDataInput,
  BreadcrumbItemStructuredDataInput,
  FaqStructuredDataItemInput,
  OpenGraphImage,
  OrganizationStructuredDataInput,
  WebPageStructuredDataInput,
  WebSiteStructuredDataInput,
} from "@/types/meta-data-types";

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

/** Normalize a relative path to an absolute URL. */
function toCanonicalUrl(path = "/"): string {
  return toAbsoluteUrl(path);
}

/** Convert a URL or OG image object into a schema.org ImageObject. */
function toImageObject(
  image: string | OpenGraphImage = basicDetails.defaultOgImage,
) {
  if (typeof image === "string") {
    return {
      "@type": "ImageObject",
      url: toAbsoluteUrl(image),
    };
  }

  return {
    "@type": "ImageObject",
    url: toAbsoluteUrl(image.url),
    width: image.width,
    height: image.height,
  };
}

/** Shared organization shape reused by Article and Organization schemas. */
function createPublisherOrganization() {
  return {
    "@type": "Organization",
    name: basicDetails.websiteName,
    url: basicDetails.websiteURL,
    logo: toImageObject(basicDetails.publisherLogo),
  };
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

  const url = toCanonicalUrl(path);

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    name: headline,
    headline,
    description,
    image: toImageObject(image),
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
    publisher: createPublisherOrganization(),
  } as const;
}

/** Build schema.org/WebPage JSON-LD for major crawlable pages. */
export function createWebPageJsonLd(input: WebPageStructuredDataInput) {
  const {
    name,
    description = basicDetails.websiteDescription,
    path = "/",
    image = basicDetails.defaultOgImage,
    about,
    mainEntity,
  } = input;

  const url = toCanonicalUrl(path);

  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name,
    description,
    url,
    inLanguage: basicDetails.locale.replace("_", "-"),
    image: toImageObject(image),
    ...(about && about.length > 0 ? { about } : {}),
    ...(mainEntity ? { mainEntity } : {}),
  } as const;
}

/** Build schema.org/BreadcrumbList JSON-LD from a list of route segments. */
export function createBreadcrumbJsonLd(
  items: BreadcrumbItemStructuredDataInput[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: toCanonicalUrl(item.path),
    })),
  } as const;
}

/** Build schema.org/FAQPage JSON-LD from visible question and answer pairs. */
export function createFaqPageJsonLd(items: FaqStructuredDataItemInput[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  } as const;
}

/** Build site-level schema.org/Organization JSON-LD. */
export function createOrganizationJsonLd(
  input: OrganizationStructuredDataInput = {},
) {
  const {
    name = basicDetails.websiteName,
    url = basicDetails.websiteURL,
    description = basicDetails.websiteDescription,
    sameAs,
    logo = basicDetails.publisherLogo,
  } = input;

  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name,
    url: toAbsoluteUrl(url),
    description,
    logo: toImageObject(logo),
    ...(sameAs && sameAs.length > 0 ? { sameAs } : {}),
  } as const;
}

/** Build site-level schema.org/WebSite JSON-LD. */
export function createWebSiteJsonLd(input: WebSiteStructuredDataInput = {}) {
  const {
    name = basicDetails.websiteName,
    url = basicDetails.websiteURL,
    description = basicDetails.websiteDescription,
    searchTarget,
  } = input;

  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name,
    url: toAbsoluteUrl(url),
    description,
    inLanguage: basicDetails.locale.replace("_", "-"),
    ...(searchTarget
      ? {
          potentialAction: {
            "@type": "SearchAction",
            target: toAbsoluteUrl(searchTarget),
            "query-input": "required name=search_term_string",
          },
        }
      : {}),
  } as const;
}
