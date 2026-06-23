import type { PracticePageMeta } from "@/data/practice-data/types";

export const tabsWindowsMeta: PracticePageMeta = {
  element: "tabs-windows",
  title: "How to Handle Tabs and Windows in Selenium and Playwright",
  description:
    "Practice browser tab and window automation — open new tabs, switch between windows, close tabs, handle popups, and assert URL and title in Playwright, Selenium & Cypress.",
  level: "Intermediate",
  durationMin: 14,
  scenarioCount: 8,
  testCaseCount: 14,
  breadcrumb: [
    { label: "Home", href: "/" },
    { label: "Practice", href: "/practice" },
    { label: "Tabs & Windows" },
  ],
  upNext: {
    icon: "📋",
    title: "Alerts & Dialogs",
    description: "Handle browser alerts, confirms, and prompts",
    href: "/practice/alerts-dialogs",
  },
};
