import type { PracticePageMeta } from "@/data/practice-data/types";

export const alertsDialogsMeta: PracticePageMeta = {
  element: "alerts-dialogs",
  title: "Alerts & Dialogs Automation Practice",
  description:
    "Master dialog interactions — open, close, confirm, cancel, backdrop dismiss, Escape key, accessibility assertions, and scoped dialog locators in Selenium, Playwright, and Cypress.",
  level: "Intermediate",
  durationMin: 15,
  scenarioCount: 8,
  testCaseCount: 16,
  breadcrumb: [
    { label: "Home", href: "/" },
    { label: "Practice", href: "/practice" },
    { label: "Alerts & Dialogs" },
  ],
  upNext: {
    icon: "☑️",
    title: "Radio & Checkbox",
    description: "Toggle radio buttons and checkboxes across different states",
    href: "/practice/radio-checkbox",
  },
};
