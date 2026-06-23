import { createBreadcrumbJsonLd, createFaqPageJsonLd, createWebPageJsonLd } from "../structured-data";
import { radioCheckboxFaq } from "@/data/practice-data/radio-checkbox";

const name = "How to Handle Radio Buttons and Checkboxes in Selenium and Playwright";
const description =
  "Practice checkbox and radio button automation — check, uncheck, assert state, handle groups, disabled controls, and dynamic lists in Playwright, Selenium WebDriver, and Cypress.";

export const radioCheckboxPageWebPageJsonLd = createWebPageJsonLd({
  name,
  description,
  path: "/practice/radio-checkbox",
  about: [
    "Checkbox automation",
    "Radio button automation",
    "Selenium checkbox",
    "Playwright radio button",
    "Cypress checkbox",
  ],
  mainEntity: {
    "@type": "Thing",
    name: "Radio button and checkbox interactions",
    description,
  },
});

export const radioCheckboxPageBreadcrumbJsonLd = createBreadcrumbJsonLd([
  { name: "Home",           path: "/" },
  { name: "Practice",       path: "/practice" },
  { name: "Radio & Checkbox", path: "/practice/radio-checkbox" },
]);

export const radioCheckboxPageFaqJsonLd = createFaqPageJsonLd(
  radioCheckboxFaq.map((item) => ({ question: item.question, answer: item.answer })),
);
