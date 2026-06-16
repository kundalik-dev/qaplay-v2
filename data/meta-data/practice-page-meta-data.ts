import { createPageMetadata } from "./create-page-metadata";

/**
 * Metadata for the /practice page.
 *
 * Title, description, and keywords are aligned with the live site's SEO
 * so re-deploys stay consistent with existing search rankings.
 */
export const practicePageMetadata = createPageMetadata({
  title: "Practice Elements | QA Playground – Selenium, Playwright & Cypress",
  description:
    "Explore 14+ hands-on practice elements including Buttons, Forms, Tables, Alerts, File Upload, and more. Perfect for Selenium, Playwright, and Cypress automation engineers.",
  path: "/practice",
  useAbsoluteTitle: true,
  ogType: "website",
  keywords: [
    "practice input fields",
    "practice buttons",
    "practice forms",
    "practice tables",
    "practice alerts",
    "practice dropdowns",
    "practice date picker",
    "practice file upload",
    "Selenium practice elements",
    "Playwright practice elements",
    "Cypress practice elements",
    "QA automation practice elements",
    "automation testing UI",
  ],
});
