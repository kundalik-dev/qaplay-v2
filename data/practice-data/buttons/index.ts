/**
 * Buttons element data bundle.
 *
 * Assembles the per-concern data files into a single ElementPageData object
 * consumed by app/practice/buttons/page.tsx.
 */
import type { ElementPageData } from "@/data/practice-data/types";
import { buttonsMeta } from "./meta";
import { buttonsCodeSnippets } from "./code-snippets";
import { buttonsKeyMethods } from "./key-methods";
import { buttonsTestCases } from "./test-cases";
import { buttonsMethodRows, buttonsFaq, buttonsTocItems } from "./learn";

export const buttonsData: ElementPageData = {
  meta: buttonsMeta,
  codeSnippets: buttonsCodeSnippets,
  keyMethods: buttonsKeyMethods,
  testCases: buttonsTestCases,
  methodRows: buttonsMethodRows,
  faqItems: buttonsFaq,
  tocItems: buttonsTocItems,
};

export {
  buttonsMeta,
  buttonsCodeSnippets,
  buttonsKeyMethods,
  buttonsTestCases,
  buttonsMethodRows,
  buttonsFaq,
  buttonsTocItems,
};
export { buttonsLearnCode } from "./learn";
