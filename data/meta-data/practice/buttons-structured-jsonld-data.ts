import {
  createBreadcrumbJsonLd,
  createFaqPageJsonLd,
  createWebPageJsonLd,
} from "../structured-data";
import { buttonsFaq } from "@/data/practice-data/buttons";

const buttonsPageName = "How to Handle Button Clicks in Selenium and Playwright";
const buttonsPageDescription =
  "Practice button automation — single click, double-click, right-click, disabled state, click-and-hold, coordinates, and computed styles in Selenium, Playwright, and Cypress.";

/** /practice/buttons page-level WebPage JSON-LD. */
export const buttonsPageWebPageJsonLd = createWebPageJsonLd({
  name: buttonsPageName,
  description: buttonsPageDescription,
  path: "/practice/buttons",
  about: [
    "Button automation",
    "Selenium click",
    "Playwright click",
    "Cypress click",
  ],
  mainEntity: {
    "@type": "Thing",
    name: "Button interactions",
    description: buttonsPageDescription,
  },
});

/** /practice/buttons breadcrumb structured data. */
export const buttonsPageBreadcrumbJsonLd = createBreadcrumbJsonLd([
  { name: "Home", path: "/" },
  { name: "Practice", path: "/practice" },
  { name: "Buttons", path: "/practice/buttons" },
]);

/**
 * /practice/buttons FAQ structured data.
 * Built from the same FAQ list rendered in the Learn tab so the visible
 * content and the rich result stay in sync.
 */
export const buttonsPageFaqJsonLd = createFaqPageJsonLd(
  buttonsFaq.map((item) => ({ question: item.question, answer: item.answer })),
);
