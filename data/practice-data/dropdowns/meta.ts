import type { PracticePageMeta } from "@/data/practice-data/types";

export const dropdownsMeta: PracticePageMeta = {
  element: "dropdowns",
  title: "Dropdown Automation Practice",
  description:
    "Master native select, multi-select, custom listbox, and searchable combobox interactions in Selenium, Playwright, and Cypress.",
  level: "Beginner",
  durationMin: 12,
  scenarioCount: 6,
  testCaseCount: 14,
  breadcrumb: [
    { label: "Home", href: "/" },
    { label: "Practice", href: "/practice" },
    { label: "Dropdowns" },
  ],
  upNext: {
    icon: "DT",
    title: "Data Table",
    description: "Read, filter, sort, and assert row data",
    href: "/practice/data-table",
  },
};
