import {
  createBreadcrumbJsonLd,
  createFaqPageJsonLd,
  createWebPageJsonLd,
} from "../structured-data";
import { infiniteScrollFaq } from "@/data/practice-data/infinite-scroll";

const name = "How to Automate Infinite Scroll in Selenium and Playwright";
const description =
  "Handle lazy-loaded lists, scroll-triggered DOM updates, and virtualized lists in your test suites.";

export const infiniteScrollPageWebPageJsonLd = createWebPageJsonLd({
  name,
  description,
  path: "/practice/infinite-scroll",
  about: [
    "Infinite scroll automation",
    "Selenium scroll",
    "Playwright virtualized list",
    "Cypress scroll",
  ],
  mainEntity: {
    "@type": "Thing",
    name: "Scrolling interactions",
    description,
  },
});

export const infiniteScrollPageBreadcrumbJsonLd = createBreadcrumbJsonLd([
  { name: "Home", path: "/" },
  { name: "Practice", path: "/practice" },
  { name: "Infinite Scroll", path: "/practice/infinite-scroll" },
]);

export const infiniteScrollPageFaqJsonLd = createFaqPageJsonLd(
  infiniteScrollFaq.map((item) => ({
    question: item.question,
    answer: item.answer,
  })),
);
