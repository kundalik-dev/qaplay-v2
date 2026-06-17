import { qaCapturePageDescription } from "@/data/chrome/qa-capture-page-data";

import { createPageMetadata } from "../create-page-metadata";

export const qaCapturePageMetadata = createPageMetadata({
  title: "QA Capture Chrome Extension",
  description: qaCapturePageDescription,
  path: "/chrome/qa-capture",
  keywords: [
    "QA screenshot tool",
    "Chrome extension screenshot",
    "continuous screenshot capture",
    "QA documentation tool",
    "export screenshots to PDF",
    "screenshot to markdown",
    "bug report screenshots",
    "QA process documentation",
    "test step screenshots",
    "QA engineer tools",
  ],
  ogType: "website",
});
