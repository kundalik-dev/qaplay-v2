import {
  createBreadcrumbJsonLd,
  createFaqPageJsonLd,
  createWebPageJsonLd,
} from "../structured-data";
import { modalsFaq } from "@/data/practice-data/modals";

const name = "How to Automate Modal Windows in Selenium and Playwright";
const description =
  "Practice interacting with, asserting, and closing modal dialogs and overlays in your test suites.";

export const modalsPageWebPageJsonLd = createWebPageJsonLd({
  name,
  description,
  path: "/practice/modals",
  about: [
    "Modal window automation",
    "Selenium modals",
    "Playwright dialogs",
    "Cypress modals",
  ],
  mainEntity: {
    "@type": "Thing",
    name: "Modal interactions",
    description,
  },
});

export const modalsPageBreadcrumbJsonLd = createBreadcrumbJsonLd([
  { name: "Home", path: "/" },
  { name: "Practice", path: "/practice" },
  { name: "Modals", path: "/practice/modals" },
]);

export const modalsPageFaqJsonLd = createFaqPageJsonLd(
  modalsFaq.map((item) => ({ question: item.question, answer: item.answer })),
);
