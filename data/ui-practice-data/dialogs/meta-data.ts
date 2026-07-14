import type { PracticePageMeta } from "@/data/practice-data/types";

/**
 * Page-level metadata for /ui-practice/dialog (Practice / Test Cases /
 * Learn). Same shape as data/practice-data/*\/meta.ts - reuses the
 * shared PracticePageMeta type so both the classic /practice/[element]
 * pages and these /ui-practice/[section] pages stay consistent.
 */
export const dialogsMeta: PracticePageMeta = {
  element: "dialog",
  title: "Alerts & Dialogs Automation Practice",
  description:
    "Master dialog interactions - open, close, confirm, cancel, backdrop dismiss, Escape key, accessibility assertions, and scoped dialog locators in Selenium, Playwright, and Cypress.",
  level: "Intermediate",
  durationMin: 15,
  scenarioCount: 8,
  testCaseCount: 16,
  breadcrumb: [
    { label: "Home", href: "/" },
    { label: "UI Practice", href: "/ui-practice" },
    { label: "Dialog" },
  ],
  upNext: {
    icon: "🗂️",
    title: "Tables",
    description: "Sortable, paginated, and dynamic data tables",
    href: "/ui-practice/tables",
  },
};
