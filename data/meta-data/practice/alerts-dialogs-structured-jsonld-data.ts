import {
  createBreadcrumbJsonLd,
  createFaqPageJsonLd,
  createWebPageJsonLd,
} from "../structured-data";
import { alertsDialogsFaq } from "@/data/practice-data/alerts-dialogs";

const alertsDialogsPageName =
  "How to Handle Alerts and Dialogs in Selenium and Playwright";
const alertsDialogsPageDescription =
  "Practice dialog automation — open, close, confirm, cancel, backdrop dismiss, Escape key, and scoped dialog locators in Selenium, Playwright, and Cypress.";

/** /practice/alerts-dialogs page-level WebPage JSON-LD. */
export const alertsDialogsPageWebPageJsonLd = createWebPageJsonLd({
  name: alertsDialogsPageName,
  description: alertsDialogsPageDescription,
  path: "/practice/alerts-dialogs",
  about: [
    "Alert dialog automation",
    "Selenium dialog",
    "Playwright dialog",
    "Cypress modal",
  ],
  mainEntity: {
    "@type": "Thing",
    name: "Alert & Dialog interactions",
    description: alertsDialogsPageDescription,
  },
});

/** /practice/alerts-dialogs breadcrumb structured data. */
export const alertsDialogsPageBreadcrumbJsonLd = createBreadcrumbJsonLd([
  { name: "Home", path: "/" },
  { name: "Practice", path: "/practice" },
  { name: "Alerts & Dialogs", path: "/practice/alerts-dialogs" },
]);

/**
 * /practice/alerts-dialogs FAQ structured data.
 * Built from the same FAQ list rendered in the Learn tab so the visible
 * content and the rich result stay in sync.
 */
export const alertsDialogsPageFaqJsonLd = createFaqPageJsonLd(
  alertsDialogsFaq.map((item) => ({
    question: item.question,
    answer: item.answer,
  })),
);
