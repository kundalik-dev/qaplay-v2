import { qaClipperPageDescription } from "@/data/chrome/qa-clipper-page-data";

import { createPageMetadata } from "../create-page-metadata";

export const qaClipperPageMetadata = createPageMetadata({
  title: "QA Playground Clipper Chrome Extension",
  description: qaClipperPageDescription,
  path: "/chrome/qa-clipper",
  keywords: [
    "QA learning resources",
    "Chrome extension bookmark",
    "save webpage to study tracker",
    "QA resource manager",
    "clip articles for QA",
    "QA Playground extension",
    "learning library chrome extension",
    "QA engineer tools",
    "save videos for QA learning",
    "automation testing resources",
  ],
  ogType: "website",
});
