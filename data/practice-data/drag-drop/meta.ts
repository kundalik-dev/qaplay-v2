import type { PracticePageMeta } from "@/data/practice-data/types";

export const dragDropMeta: PracticePageMeta = {
  element: "drag-drop",
  title: "How to Automate Drag and Drop in Selenium and Playwright",
  description:
    "Practice drag-and-drop automation — simple drop zones, sortable lists, kanban column transfers, type-restricted zones, and multi-column boards in Playwright, Selenium & Cypress.",
  level: "Advanced",
  durationMin: 20,
  scenarioCount: 6,
  testCaseCount: 14,
  breadcrumb: [
    { label: "Home", href: "/" },
    { label: "Practice", href: "/practice" },
    { label: "Drag & Drop" },
  ],
  upNext: {
    icon: "🖼️",
    title: "iFrames",
    description: "Switch into nested iframes and interact with embedded content",
    href: "/practice/iframes",
  },
};
