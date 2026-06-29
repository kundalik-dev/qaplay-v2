import type { PracticePageMeta } from "@/data/practice-data/types";

export const annotationsMeta: PracticePageMeta = {
  element: "annotations",
  title: "Annotations Automation Practice",
  description:
    "Practice Playwright test annotations — test.skip(), test.slow(), test.fixme(), test.fail(), test.step(), and test.each() — plus TestNG equivalents across realistic interactive scenarios.",
  level: "Intermediate",
  durationMin: 20,
  scenarioCount: 6,
  testCaseCount: 14,
  breadcrumb: [
    { label: "Home", href: "/" },
    { label: "Practice", href: "/practice" },
    { label: "Annotations" },
  ],
  upNext: {
    icon: "🖱️",
    title: "Drag & Drop",
    description: "Practice drag-and-drop interactions, sortable lists, and reordering elements",
    href: "/practice/drag-drop",
  },
};
