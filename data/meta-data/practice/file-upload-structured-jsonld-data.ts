import { createBreadcrumbJsonLd, createFaqPageJsonLd, createWebPageJsonLd } from "../structured-data";
import { fileUploadFaq } from "@/data/practice-data/file-upload";

const name = "How to Handle File Upload in Selenium and Playwright";
const description =
  "Practice file upload automation — setInputFiles, drag and drop, hidden file inputs, type and size validation, upload progress, and custom upload buttons in Playwright, Selenium, and Cypress.";

export const fileUploadPageWebPageJsonLd = createWebPageJsonLd({
  name,
  description,
  path: "/practice/file-upload",
  about: [
    "File upload automation",
    "Playwright setInputFiles",
    "Selenium sendKeys file",
    "Cypress selectFile",
    "Drag and drop upload",
    "Hidden file input",
  ],
  mainEntity: {
    "@type": "Thing",
    name: "File upload interactions",
    description,
  },
});

export const fileUploadPageBreadcrumbJsonLd = createBreadcrumbJsonLd([
  { name: "Home",        path: "/" },
  { name: "Practice",   path: "/practice" },
  { name: "File Upload", path: "/practice/file-upload" },
]);

export const fileUploadPageFaqJsonLd = createFaqPageJsonLd(
  fileUploadFaq.map((item) => ({ question: item.question, answer: item.answer })),
);
