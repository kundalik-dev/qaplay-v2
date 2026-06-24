import type { PracticePageMeta } from "@/data/practice-data/types";

export const modalsMeta: PracticePageMeta = {
  element: "modals",
  title: "Modal Windows Automation Practice",
  description: "Practice interacting with, asserting, and closing modal dialogs and overlays in your test suites.",
  level: "Beginner",
  durationMin: 10,
  scenarioCount: 4,
  testCaseCount: 8,
  breadcrumb: [
    { label: "Home", href: "/" },
    { label: "Practice", href: "/practice" },
    { label: "Modal Windows" },
  ],
  upNext: {
    icon: "📜",
    title: "Infinite Scroll",
    description: "Handle lazy-loaded lists and scroll-triggered content loading patterns.",
    href: "/practice/infinite-scroll",
  },
};
