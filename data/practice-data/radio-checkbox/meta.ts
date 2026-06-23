import type { PracticePageMeta } from "@/data/practice-data/types";

export const radioCheckboxMeta: PracticePageMeta = {
  element: "radio-checkbox",
  title: "How to Handle Radio Buttons and Checkboxes in Selenium and Playwright",
  description:
    "Practice radio button and checkbox automation — select, deselect, assert state, handle groups, indeterminate state, and dynamic lists in Playwright, Selenium & Cypress.",
  level: "Beginner",
  durationMin: 12,
  scenarioCount: 8,
  testCaseCount: 14,
  breadcrumb: [
    { label: "Home", href: "/" },
    { label: "Practice", href: "/practice" },
    { label: "Radio & Checkbox" },
  ],
  upNext: {
    icon: "📅",
    title: "Date Picker",
    description: "Open calendars, select dates, and handle date ranges",
    href: "/practice/date-picker",
  },
};
