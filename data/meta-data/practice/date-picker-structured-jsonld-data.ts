import {
  createBreadcrumbJsonLd,
  createFaqPageJsonLd,
  createWebPageJsonLd,
} from "../structured-data";
import { datePickerFaq } from "@/data/practice-data/date-picker";

const name = "How to Handle Date Pickers in Selenium and Playwright";
const description =
  "Practice date picker automation — open calendars, pick dates, navigate months, handle date ranges and constraints in Playwright, Selenium WebDriver, and Cypress.";

export const datePickerPageWebPageJsonLd = createWebPageJsonLd({
  name,
  description,
  path: "/practice/date-picker",
  about: [
    "Date picker automation",
    "Selenium date picker",
    "Playwright date picker",
    "Cypress date picker",
    "Calendar widget testing",
  ],
  mainEntity: {
    "@type": "Thing",
    name: "Date picker interactions",
    description,
  },
});

export const datePickerPageBreadcrumbJsonLd = createBreadcrumbJsonLd([
  { name: "Home", path: "/" },
  { name: "Practice", path: "/practice" },
  { name: "Date Picker", path: "/practice/date-picker" },
]);

export const datePickerPageFaqJsonLd = createFaqPageJsonLd(
  datePickerFaq.map((item) => ({
    question: item.question,
    answer: item.answer,
  })),
);
