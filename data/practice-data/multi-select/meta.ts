import type { PracticePageMeta } from "@/data/practice-data/types";

export const multiSelectMeta: PracticePageMeta = {
  element: "multi-select",
  title: "How to Handle Multi-Select in Selenium and Playwright",
  description:
    "Practice multi-select automation — native select, custom checkbox dropdowns, tag/pill removal, searchable multi-selects, and grouped options in Playwright, Selenium & Cypress.",
  level: "Intermediate",
  durationMin: 15,
  scenarioCount: 8,
  testCaseCount: 14,
  breadcrumb: [
    { label: "Home", href: "/" },
    { label: "Practice", href: "/practice" },
    { label: "Multi-Select" },
  ],
  upNext: {
    icon: "⏳",
    title: "Dynamic Waits",
    description: "Wait for async elements, spinners, and network responses",
    href: "/practice/dynamic-waits",
  },
};
