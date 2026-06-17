import type { PracticePageMeta } from "@/data/practice-data/types";

export const inputFieldsMeta: PracticePageMeta = {
  element: "input-fields",
  title: "Input Field Automation Practice",
  description:
    "Master text input interactions in Selenium, Playwright & Cypress — typing, appending with Tab, reading values, clearing fields, and detecting disabled & readonly states.",
  level: "Beginner",
  durationMin: 8,
  scenarioCount: 6,
  testCaseCount: 12,
  breadcrumb: [
    { label: "Home", href: "/" },
    { label: "Practice", href: "/practice" },
    { label: "Input Fields" },
  ],
  upNext: {
    icon: "🖱️",
    title: "Buttons",
    description: "Click, double-click, right-click, and disabled states",
    href: "/practice/buttons",
  },
};
