import { createBreadcrumbJsonLd, createFaqPageJsonLd, createWebPageJsonLd } from "../structured-data";
import { multiSelectFaq } from "@/data/practice-data/multi-select";

const name = "How to Handle Multi-Select in Selenium and Playwright";
const description =
  "Practice multi-select automation — native select, custom checkbox dropdowns, tag/pill removal, searchable combobox, and grouped optgroup options in Playwright, Selenium, and Cypress.";

export const multiSelectPageWebPageJsonLd = createWebPageJsonLd({
  name,
  description,
  path: "/practice/multi-select",
  about: [
    "Multi-select automation",
    "Selenium Select class",
    "Playwright selectOption",
    "Cypress select",
    "Custom dropdown locators",
    "Combobox automation",
  ],
  mainEntity: {
    "@type": "Thing",
    name: "Multi-select interactions",
    description,
  },
});

export const multiSelectPageBreadcrumbJsonLd = createBreadcrumbJsonLd([
  { name: "Home",         path: "/" },
  { name: "Practice",     path: "/practice" },
  { name: "Multi-Select", path: "/practice/multi-select" },
]);

export const multiSelectPageFaqJsonLd = createFaqPageJsonLd(
  multiSelectFaq.map((item) => ({ question: item.question, answer: item.answer })),
);
