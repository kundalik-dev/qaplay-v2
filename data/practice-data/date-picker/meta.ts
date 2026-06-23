import type { PracticePageMeta } from "@/data/practice-data/types";

export const datePickerMeta: PracticePageMeta = {
  element: "date-picker",
  title: "How to Handle Date Pickers in Selenium and Playwright",
  description:
    "Practice date picker automation — open calendars, select dates, navigate months, handle date ranges, constraints, and keyboard entry in Playwright, Selenium & Cypress.",
  level: "Intermediate",
  durationMin: 15,
  scenarioCount: 8,
  testCaseCount: 14,
  breadcrumb: [
    { label: "Home", href: "/" },
    { label: "Practice", href: "/practice" },
    { label: "Date Picker" },
  ],
  upNext: {
    icon: "☑️",
    title: "Checkboxes",
    description: "Check, uncheck, and assert checkbox state",
    href: "/practice/checkboxes",
  },
};
