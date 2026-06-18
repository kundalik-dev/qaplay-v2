import type { PracticePageMeta } from "@/data/practice-data/types";

export const dataTableMeta: PracticePageMeta = {
  element: "data-table",
  title: "Data Table Automation Practice",
  description:
    "Practice reading, counting, sorting, and locating rows and cells in a realistic HTML table — essential skills for Selenium & Playwright table automation.",
  level: "Intermediate",
  durationMin: 20,
  scenarioCount: 6,
  testCaseCount: 12,
  breadcrumb: [
    { label: "Home", href: "/" },
    { label: "Practice", href: "/practice" },
    { label: "Data Table" },
  ],
  upNext: {
    icon: "🔔",
    title: "Alerts & Dialogs",
    description: "Handle confirm, alert, and prompt dialogs",
    href: "/practice/alerts-dialogs",
  },
};
