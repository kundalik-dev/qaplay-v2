import {
  createBreadcrumbJsonLd,
  createFaqPageJsonLd,
  createWebPageJsonLd,
} from "../structured-data";
import { iframesFaq } from "@/data/practice-data/iframes";

const name = "How to Handle iFrames in Selenium and Playwright";
const description =
  "Practice iframe automation — switch into frames by testid, name, and title; interact with nested iframes; wait for dynamic iframe content; and handle form validation inside frames in Playwright, Selenium, and Cypress.";

export const iframesPageWebPageJsonLd = createWebPageJsonLd({
  name,
  description,
  path: "/practice/iframes",
  about: [
    "iframe automation",
    "Playwright frameLocator",
    "Selenium switchTo frame",
    "Cypress iframe",
    "Nested iframe testing",
    "Dynamic iframe content",
  ],
  mainEntity: {
    "@type": "Thing",
    name: "iframe interactions",
    description,
  },
});

export const iframesPageBreadcrumbJsonLd = createBreadcrumbJsonLd([
  { name: "Home", path: "/" },
  { name: "Practice", path: "/practice" },
  { name: "iFrames", path: "/practice/iframes" },
]);

export const iframesPageFaqJsonLd = createFaqPageJsonLd(
  iframesFaq.map((item) => ({ question: item.question, answer: item.answer })),
);
