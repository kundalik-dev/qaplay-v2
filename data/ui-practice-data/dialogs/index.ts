/**
 * Barrel for /ui-practice/dialog's data. Standard shape followed by
 * every data/ui-practice-data/[section]/ folder:
 *   meta-data.ts  → PracticePageMeta
 *   test-cases.ts → TestCase[]
 *   learn.ts      → toc / descriptions / code snippets / method table / faq
 *   index.ts      → re-exports all of the above (this file)
 */
export * from "./meta-data";
export * from "./test-cases";
export * from "./learn";
