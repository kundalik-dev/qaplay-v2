import { createBreadcrumbJsonLd, createFaqPageJsonLd, createWebPageJsonLd } from "../structured-data";
import { shadowDomFaq } from "@/data/practice-data/shadow-dom";

const name = "How to Automate Shadow DOM in Selenium and Playwright";
const description =
  "Practice shadow DOM automation — piercing open shadow roots, scoping to shadow hosts, nested shadow trees, forms inside shadow DOM, and evaluating closed shadow roots in Playwright, Selenium, and Cypress.";

export const shadowDomPageWebPageJsonLd = createWebPageJsonLd({
  name,
  description,
  path: "/practice/shadow-dom",
  about: [
    "Shadow DOM automation",
    "Playwright shadow DOM piercing",
    "Selenium getShadowRoot",
    "Web Components testing",
    "Closed shadow root evaluation",
    "Nested shadow DOM traversal",
  ],
  mainEntity: {
    "@type": "Thing",
    name: "Shadow DOM interactions",
    description,
  },
});

export const shadowDomPageBreadcrumbJsonLd = createBreadcrumbJsonLd([
  { name: "Home",       path: "/" },
  { name: "Practice",   path: "/practice" },
  { name: "Shadow DOM", path: "/practice/shadow-dom" },
]);

export const shadowDomPageFaqJsonLd = createFaqPageJsonLd(
  shadowDomFaq.map((item) => ({ question: item.question, answer: item.answer })),
);
