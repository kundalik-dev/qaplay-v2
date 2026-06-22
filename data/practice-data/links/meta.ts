import type { PracticePageMeta } from "@/data/practice-data/types";

export const linksMeta: PracticePageMeta = {
  element: "links",
  title: "How to Handle Links in Selenium and Playwright",
  description:
    "Master link interactions in Selenium & Playwright — internal links, external links, broken links, image links, button links, anchor navigation, and HTTP status code assertions.",
  level: "Beginner",
  durationMin: 8,
  scenarioCount: 7,
  testCaseCount: 12,
  breadcrumb: [
    { label: "Home", href: "/" },
    { label: "Practice", href: "/practice" },
    { label: "Links" },
  ],
  upNext: {
    icon: "📋",
    title: "Tabs & Windows",
    description: "Switch between browser tabs and pop-up windows",
    href: "/practice/tabs-windows",
  },
};
