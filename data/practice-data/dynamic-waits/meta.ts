import type { PracticePageMeta } from "@/data/practice-data/types";

export const dynamicWaitsMeta: PracticePageMeta = {
  element: "dynamic-waits",
  title: "How to Handle Dynamic Waits in Selenium and Playwright",
  description:
    "Practice dynamic waits — waitForSelector, explicit waits, polling, network idle, toast messages, skeleton loaders, and async content in Playwright, Selenium & Cypress.",
  level: "Intermediate",
  durationMin: 15,
  scenarioCount: 8,
  testCaseCount: 14,
  breadcrumb: [
    { label: "Home", href: "/" },
    { label: "Practice", href: "/practice" },
    { label: "Dynamic Waits" },
  ],
  upNext: {
    icon: "🪟",
    title: "Tabs & Windows",
    description: "Switch between browser tabs and popup windows",
    href: "/practice/tabs-windows",
  },
};
