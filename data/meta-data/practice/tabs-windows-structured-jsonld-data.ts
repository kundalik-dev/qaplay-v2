import {
  createBreadcrumbJsonLd,
  createFaqPageJsonLd,
  createWebPageJsonLd,
} from "../structured-data";
import { tabsWindowsFaq } from "@/data/practice-data/tabs-windows";

const name = "How to Handle Tabs and Windows in Selenium and Playwright";
const description =
  "Practice browser tab and window automation — open new tabs, switch contexts, close tabs, handle popups, and assert URL and title in Playwright, Selenium WebDriver, and Cypress.";

export const tabsWindowsPageWebPageJsonLd = createWebPageJsonLd({
  name,
  description,
  path: "/practice/tabs-windows",
  about: [
    "Browser tab automation",
    "Window switching Selenium",
    "Playwright new tab",
    "Popup handling automation",
    "Cypress tabs",
  ],
  mainEntity: {
    "@type": "Thing",
    name: "Browser tab and window interactions",
    description,
  },
});

export const tabsWindowsPageBreadcrumbJsonLd = createBreadcrumbJsonLd([
  { name: "Home", path: "/" },
  { name: "Practice", path: "/practice" },
  { name: "Tabs & Windows", path: "/practice/tabs-windows" },
]);

export const tabsWindowsPageFaqJsonLd = createFaqPageJsonLd(
  tabsWindowsFaq.map((item) => ({
    question: item.question,
    answer: item.answer,
  })),
);
