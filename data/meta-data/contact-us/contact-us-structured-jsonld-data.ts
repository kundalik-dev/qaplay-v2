import { allUrls, basicDetails } from "../basic-details-data";
import {
  createBreadcrumbJsonLd,
  createOrganizationJsonLd,
  createWebPageJsonLd,
} from "../structured-data";

const contactDescription =
  "Have a question, suggestion, or want to collaborate? Reach out to the QA Playground team. We typically respond within 2 business days.";

/** WebPage structured data for the Contact Us page. */
export const contactUsWebPageJsonLd = createWebPageJsonLd({
  name: "Contact QA Playground",
  description: contactDescription,
  path: "/contact-us",
  about: [
    "contact form",
    "bug reports",
    "feature requests",
    "automation testing help",
  ],
  mainEntity: {
    "@type": "ContactPage",
    name: "QA Playground Contact",
    description: contactDescription,
    url: `${basicDetails.websiteURL}/contact-us`,
    contactOption: "TollFree",
    contactType: "Customer Support",
    email: basicDetails.websiteEmail,
    availableLanguage: "English",
  },
});

/** ContactPage schema — explicitly tells search engines this is a contact page. */
export const contactPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Contact QA Playground",
  description: contactDescription,
  url: `${basicDetails.websiteURL}/contact-us`,
  publisher: {
    "@type": "Organization",
    name: basicDetails.websiteName,
    url: basicDetails.websiteURL,
    email: basicDetails.websiteEmail,
    sameAs: [
      allUrls.youtubeURL,
      allUrls.githubURL,
      allUrls.linkedInURL,
      allUrls.twitterURL,
    ],
  },
} as const;

/** Breadcrumb for the Contact Us page. */
export const contactUsBreadcrumbJsonLd = createBreadcrumbJsonLd([
  { name: "Home", path: "/" },
  { name: "Contact Us", path: "/contact-us" },
]);

/** Organization structured data — useful on the contact page for `sameAs`. */
export const contactUsOrganizationJsonLd = createOrganizationJsonLd({
  description: contactDescription,
  sameAs: [
    allUrls.youtubeURL,
    allUrls.githubURL,
    allUrls.linkedInURL,
    allUrls.twitterURL,
  ],
});
