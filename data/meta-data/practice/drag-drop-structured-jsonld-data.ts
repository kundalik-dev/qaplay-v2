import {
  createBreadcrumbJsonLd,
  createFaqPageJsonLd,
  createWebPageJsonLd,
} from "../structured-data";
import { dragDropFaq } from "@/data/practice-data/drag-drop";

const name = "How to Automate Drag and Drop in Selenium and Playwright";
const description =
  "Practice drag-and-drop automation — simple drop zones, sortable lists, kanban board column transfers, type-restricted zones, and multi-column boards in Playwright, Selenium, and Cypress.";

export const dragDropPageWebPageJsonLd = createWebPageJsonLd({
  name,
  description,
  path: "/practice/drag-drop",
  about: [
    "Drag and drop automation",
    "Playwright dragAndDrop",
    "Selenium Actions dragAndDrop",
    "Cypress drag and drop",
    "Sortable list testing",
    "Kanban board automation",
  ],
  mainEntity: {
    "@type": "Thing",
    name: "Drag and drop interactions",
    description,
  },
});

export const dragDropPageBreadcrumbJsonLd = createBreadcrumbJsonLd([
  { name: "Home", path: "/" },
  { name: "Practice", path: "/practice" },
  { name: "Drag & Drop", path: "/practice/drag-drop" },
]);

export const dragDropPageFaqJsonLd = createFaqPageJsonLd(
  dragDropFaq.map((item) => ({ question: item.question, answer: item.answer })),
);
