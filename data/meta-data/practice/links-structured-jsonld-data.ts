import {
  createBreadcrumbJsonLd,
  createFaqPageJsonLd,
  createWebPageJsonLd,
} from "../structured-data";
import { linksFaq } from "@/data/practice-data/links";

const name = "How to Handle Links in Selenium and Playwright";
const description =
  "Learn how to automate link clicks, verify URLs, handle new tabs, and find links by text using Selenium WebDriver, Playwright, and Cypress.";

export const linksPageWebPageJsonLd = createWebPageJsonLd({
  name,
  description,
  path: "/practice/links",
  about: [
    "Link automation",
    "Selenium links",
    "Playwright links",
    "Cypress links",
  ],
  mainEntity: {
    "@type": "Thing",
    name: "Link interactions",
    description,
  },
});

export const linksPageBreadcrumbJsonLd = createBreadcrumbJsonLd([
  { name: "Home", path: "/" },
  { name: "Practice", path: "/practice" },
  { name: "Links", path: "/practice/links" },
]);

export const linksPageFaqJsonLd = createFaqPageJsonLd(
  linksFaq.map((item) => ({ question: item.question, answer: item.answer })),
);
