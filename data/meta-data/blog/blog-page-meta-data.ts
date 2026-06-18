import { createPageMetadata } from "../create-page-metadata";

/** Metadata for the /blog index page. */
export const blogPageMetadata = createPageMetadata({
  title: "Blog | QA Playground — Automation Testing Guides & Tutorials",
  description:
    "Hands-on guides, tutorials, and tips for Selenium, Playwright, and Cypress automation testing — written for practising QA engineers.",
  path: "/blog",
  useAbsoluteTitle: true,
  ogType: "website",
  keywords: [
    "QA blog",
    "automation testing blog",
    "Playwright tutorials",
    "Selenium tutorials",
    "Cypress tutorials",
    "test automation guides",
  ],
});
