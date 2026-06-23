import type { PracticePageMeta } from "@/data/practice-data/types";

export const fileUploadMeta: PracticePageMeta = {
  element: "file-upload",
  title: "How to Handle File Upload in Selenium and Playwright",
  description:
    "Practice file upload automation — single file, multiple files, drag and drop, type restrictions, size validation, hidden inputs, and upload progress in Playwright, Selenium & Cypress.",
  level: "Intermediate",
  durationMin: 15,
  scenarioCount: 8,
  testCaseCount: 14,
  breadcrumb: [
    { label: "Home", href: "/" },
    { label: "Practice", href: "/practice" },
    { label: "File Upload" },
  ],
  upNext: {
    icon: "🔢",
    title: "Multi-Select",
    description: "Select multiple options from native and custom dropdowns",
    href: "/practice/multi-select",
  },
};
