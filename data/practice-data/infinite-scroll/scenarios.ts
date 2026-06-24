import type { ScenarioMeta, FrameworkMethods } from "@/data/practice-data/types";

export const infiniteScrollScenarios: ScenarioMeta[] = [
  {
    id: "S01",
    title: "Simple Scroll Appends",
    testId: "scenario-scroll-simple",
    resultId: "result-s01",
    initialResult: "Waiting...",
    hint: `Target: Scroll down inside <code>[data-testid="scroll-container-simple"]</code> until you see the 'End of List' message or item 15.`,
  },
  {
    id: "S02",
    title: "Dynamic ID Target",
    testId: "scenario-scroll-dynamic",
    resultId: "result-s02",
    initialResult: "Waiting...",
    hint: `Target: Scroll to find an item with <code>[data-invoice-id="INV-042"]</code> and click its action button.`,
  },
  {
    id: "S03",
    title: "Virtualized DOM",
    testId: "scenario-scroll-virtual",
    resultId: "result-s03",
    initialResult: "Waiting...",
    hint: `Target: Notice how early items leave the DOM. Scroll to Item 50, then click it.`,
  },
  {
    id: "S04",
    title: "Manual Load More",
    testId: "scenario-scroll-challenge",
    resultId: "result-s04",
    initialResult: "Waiting...",
    hint: `Target: Scroll twice, then click the 'Load More' button to fetch the final batch and find the target.`,
  },
];

export const frameworkMethods: Record<"selenium" | "playwright" | "cypress", FrameworkMethods> = {
  selenium:   { label: "Selenium (Java)",   methods: [{ color: "blue", label: "executeScript('window.scrollBy()')" }] },
  playwright: { label: "Playwright JS / PY", methods: [{ color: "purple", label: "locator.scrollIntoViewIfNeeded()" }] },
  cypress:    { label: "Cypress JS",         methods: [{ color: "blue", label: "cy.scrollTo('bottom')" }] },
};
