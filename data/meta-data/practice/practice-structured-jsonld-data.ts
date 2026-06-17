import { basicDetails } from "../basic-details-data";
import {
  createBreadcrumbJsonLd,
  createWebPageJsonLd,
} from "../structured-data";

const practicePageName =
  "Practice Elements | QA Playground - Selenium, Playwright & Cypress";
const practicePageDescription =
  "Explore 14+ hands-on practice elements including Buttons, Forms, Tables, Alerts, File Upload, and more. Perfect for Selenium, Playwright, and Cypress automation engineers.";

/** /practice page-level WebPage JSON-LD. */
export const practicePageWebPageJsonLd = createWebPageJsonLd({
  name: practicePageName,
  description: practicePageDescription,
  path: "/practice",
  about: [
    "UI automation practice",
    "Selenium exercises",
    "Playwright exercises",
    "Cypress exercises",
  ],
  mainEntity: {
    "@type": "Thing",
    name: `${basicDetails.websiteName} practice elements`,
    description: practicePageDescription,
  },
});

/** /practice breadcrumb structured data. */
export const practicePageBreadcrumbJsonLd = createBreadcrumbJsonLd([
  { name: "Home", path: "/" },
  { name: "Practice", path: "/practice" },
]);
