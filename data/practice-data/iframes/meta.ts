import type { PracticePageMeta } from "@/data/practice-data/types";

export const iframesMeta: PracticePageMeta = {
  element: "iframes",
  title: "How to Handle iFrames in Selenium and Playwright",
  description:
    "Practice iframe automation — switching into frames by testid, name, and title; interacting with nested iframes; waiting for dynamic iframe content; and handling form validation inside frames in Playwright, Selenium & Cypress.",
  level: "Intermediate",
  durationMin: 15,
  scenarioCount: 6,
  testCaseCount: 14,
  breadcrumb: [
    { label: "Home", href: "/" },
    { label: "Practice", href: "/practice" },
    { label: "iFrames" },
  ],
  upNext: {
    icon: "🌑",
    title: "Shadow DOM",
    description:
      "Pierce shadow roots and locate elements inside web components",
    href: "/practice/shadow-dom",
  },
};
