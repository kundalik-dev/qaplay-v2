import type { PracticePageMeta } from "@/data/practice-data/types";

export const buttonsMeta: PracticePageMeta = {
  element: "buttons",
  title: "Button Automation Practice",
  description:
    "Master button interactions in Selenium, Playwright & Cypress — single click, double-click, right-click, disabled state, click-and-hold, coordinates, and computed styles.",
  level: "Beginner",
  durationMin: 10,
  scenarioCount: 8,
  testCaseCount: 15,
  breadcrumb: [
    { label: "Home", href: "/" },
    { label: "Practice", href: "/practice" },
    { label: "Buttons" },
  ],
  upNext: {
    icon: "📋",
    title: "Forms",
    description: "Fill and submit forms with validation",
    href: "/practice/forms",
  },
};
