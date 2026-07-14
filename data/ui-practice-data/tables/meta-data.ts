import type { PracticePageMeta } from "@/data/practice-data/types";

/**
 * Page-level metadata for /ui-practice/tables (Practice / Test Cases /
 * Learn). Same shape as data/ui-practice-data/dialogs/meta-data.ts -
 * every /ui-practice/[section] folder follows this file layout.
 */
export const tablesMeta: PracticePageMeta = {
  element: "tables",
  title: "Tables Automation Practice",
  description:
    "Practice Playwright, Selenium, and Cypress table locators — static tables, sortable columns, search & filter, pagination, row actions, and a combined data grid.",
  level: "Intermediate",
  durationMin: 20,
  scenarioCount: 6,
  testCaseCount: 16,
  breadcrumb: [
    { label: "Home", href: "/" },
    { label: "UI Practice", href: "/ui-practice" },
    { label: "Tables" },
  ],
  upNext: {
    icon: "💬",
    title: "Dialog",
    description: "Modals, alerts, and confirmation dialogs",
    href: "/ui-practice/dialog",
  },
};
