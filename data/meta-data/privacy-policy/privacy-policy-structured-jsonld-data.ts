import {
  createBreadcrumbJsonLd,
  createWebPageJsonLd,
} from "../structured-data";

const privacyPolicyDescription =
  "QA Playground Privacy Policy — what personal information we collect, how we use it, cookies and analytics, advertising, and your data rights under GDPR and CCPA.";

/** WebPage structured data for the Privacy Policy page. */
export const privacyPolicyWebPageJsonLd = createWebPageJsonLd({
  name: "Privacy Policy",
  description: privacyPolicyDescription,
  path: "/privacy-policy",
  about: ["privacy policy", "data protection", "cookies", "GDPR", "CCPA"],
});

export const privacyPolicyBreadcrumbJsonLd = createBreadcrumbJsonLd([
  { name: "Home", path: "/" },
  { name: "Privacy Policy", path: "/privacy-policy" },
]);
