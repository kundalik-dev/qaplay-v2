import {
  createBreadcrumbJsonLd,
  createFaqPageJsonLd,
  createWebPageJsonLd,
} from "../structured-data";
import { dynamicWaitsFaq } from "@/data/practice-data/dynamic-waits";

const name = "How to Handle Dynamic Waits in Selenium and Playwright";
const description =
  "Practice dynamic waits — waitForSelector, WebDriverWait, polling, toast messages, spinners, and async content in Playwright, Selenium WebDriver, and Cypress.";

export const dynamicWaitsPageWebPageJsonLd = createWebPageJsonLd({
  name,
  description,
  path: "/practice/dynamic-waits",
  about: [
    "Dynamic waits automation",
    "Selenium WebDriverWait",
    "Playwright waitForSelector",
    "Cypress timeout",
    "Async content testing",
  ],
  mainEntity: {
    "@type": "Thing",
    name: "Dynamic wait strategies",
    description,
  },
});

export const dynamicWaitsPageBreadcrumbJsonLd = createBreadcrumbJsonLd([
  { name: "Home", path: "/" },
  { name: "Practice", path: "/practice" },
  { name: "Dynamic Waits", path: "/practice/dynamic-waits" },
]);

export const dynamicWaitsPageFaqJsonLd = createFaqPageJsonLd(
  dynamicWaitsFaq.map((item) => ({
    question: item.question,
    answer: item.answer,
  })),
);
