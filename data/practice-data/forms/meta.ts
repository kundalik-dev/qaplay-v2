import type { PracticePageMeta } from "@/data/practice-data/types";

export const formsMeta: PracticePageMeta = {
  element: "forms",
  title: "Form Automation Practice",
  description:
    "Practice end-to-end form automation — filling inputs, selecting dropdowns, toggling checkboxes, triggering validation errors, and asserting success states.",
  level: "Intermediate",
  durationMin: 20,
  scenarioCount: 8,
  testCaseCount: 15,
  breadcrumb: [
    { label: "Home", href: "/" },
    { label: "Practice", href: "/practice" },
    { label: "Forms" },
  ],
  upNext: {
    icon: "⬇️",
    title: "Dropdowns",
    description: "Handle single and multi-option dropdown selections",
    href: "/practice/dropdowns",
  },
};
