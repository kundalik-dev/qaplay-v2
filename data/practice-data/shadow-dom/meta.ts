import type { PracticePageMeta } from "@/data/practice-data/types";

export const shadowDomMeta: PracticePageMeta = {
  element: "shadow-dom",
  title: "How to Automate Shadow DOM in Selenium and Playwright",
  description:
    "Practice shadow DOM automation — piercing open shadow roots, scoping to shadow hosts, nested shadow trees, forms inside shadow DOM, and evaluating closed shadow roots in Playwright, Selenium & Cypress.",
  level: "Advanced",
  durationMin: 20,
  scenarioCount: 6,
  testCaseCount: 14,
  breadcrumb: [
    { label: "Home", href: "/" },
    { label: "Practice", href: "/practice" },
    { label: "Shadow DOM" },
  ],
  upNext: {
    icon: "🪟",
    title: "Modal Windows",
    description: "Open, close, and assert modal dialogs and overlay behavior",
    href: "/practice/modals",
  },
};
