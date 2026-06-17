import { qaClipperFaqItems, qaClipperPageDescription } from "@/data/chrome/qa-clipper-page-data";

import {
  createBreadcrumbJsonLd,
  createFaqPageJsonLd,
  createWebPageJsonLd,
} from "../structured-data";

export const qaClipperWebPageJsonLd = createWebPageJsonLd({
  name: "QA Playground Clipper Chrome Extension",
  description: qaClipperPageDescription,
  path: "/chrome/qa-clipper",
  about: [
    "QA learning resource collection",
    "study tracker workflow",
    "Chrome extension bookmarking",
  ],
});

export const qaClipperBreadcrumbJsonLd = createBreadcrumbJsonLd([
  { name: "Home", path: "/" },
  { name: "QA Playground Clipper", path: "/chrome/qa-clipper" },
]);

export const qaClipperFaqJsonLd = createFaqPageJsonLd(qaClipperFaqItems);
