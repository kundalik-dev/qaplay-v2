import {
  createBreadcrumbJsonLd,
  createFaqPageJsonLd,
  createWebPageJsonLd,
} from "../structured-data";
import { annotationsFaq } from "@/data/practice-data/annotations";

const pageName = "How to Use Test Annotations in Playwright and Selenium";
const pageDescription =
  "Practice Playwright test.skip(), test.slow(), test.fixme(), test.fail(), test.step(), and test.each() — plus TestNG @DataProvider and @Test equivalents — in realistic interactive scenarios.";

export const annotationsPageWebPageJsonLd = createWebPageJsonLd({
  name: pageName,
  description: pageDescription,
  path: "/practice/annotations",
  about: [
    "Playwright test annotations",
    "TestNG annotations",
    "test.skip automation",
    "test.fixme tutorial",
    "parameterized test automation",
  ],
  mainEntity: {
    "@type": "Thing",
    name: "Test annotations practice",
    description: pageDescription,
  },
});

export const annotationsPageBreadcrumbJsonLd = createBreadcrumbJsonLd([
  { name: "Home", path: "/" },
  { name: "Practice", path: "/practice" },
  { name: "Annotations", path: "/practice/annotations" },
]);

export const annotationsPageFaqJsonLd = createFaqPageJsonLd(
  annotationsFaq.map((item) => ({
    question: item.question,
    answer: item.answer,
  })),
);
