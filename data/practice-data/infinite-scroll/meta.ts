import type { PracticePageMeta } from "@/data/practice-data/types";

export const infiniteScrollMeta: PracticePageMeta = {
  element: "infinite-scroll",
  title: "Infinite Scroll Automation Practice",
  description:
    "Handle lazy-loaded lists, scroll-triggered DOM updates, and virtualized lists in your test suites.",
  level: "Advanced",
  durationMin: 15,
  scenarioCount: 4,
  testCaseCount: 8,
  breadcrumb: [
    { label: "Home", href: "/" },
    { label: "Practice", href: "/practice" },
    { label: "Infinite Scroll" },
  ],
  upNext: {
    icon: "🏦",
    title: "Bank App",
    description:
      "End-to-end POM practice with a realistic bank demo application.",
    href: "/demo/bank",
  },
};
