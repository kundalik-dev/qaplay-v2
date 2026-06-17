import { qaCaptureFaqItems, qaCapturePageDescription } from "@/data/chrome/qa-capture-page-data";

import {
  createBreadcrumbJsonLd,
  createFaqPageJsonLd,
  createWebPageJsonLd,
} from "../structured-data";

export const qaCaptureWebPageJsonLd = createWebPageJsonLd({
  name: "QA Capture Chrome Extension",
  description: qaCapturePageDescription,
  path: "/chrome/qa-capture",
  about: [
    "QA screenshot capture",
    "test step documentation",
    "bug reporting workflow",
  ],
});

export const qaCaptureBreadcrumbJsonLd = createBreadcrumbJsonLd([
  { name: "Home", path: "/" },
  { name: "QA Capture", path: "/chrome/qa-capture" },
]);

export const qaCaptureFaqJsonLd = createFaqPageJsonLd(qaCaptureFaqItems);
