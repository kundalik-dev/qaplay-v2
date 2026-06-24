import type { ScenarioMeta, FrameworkMethods } from "@/data/practice-data/types";

export const modalScenarios: ScenarioMeta[] = [
  {
    id: "S01",
    title: "Simple Modal",
    testId: "scenario-modal-simple",
    resultId: "result-s01",
    initialResult: "Not opened yet",
    hint: `Target: <code>[data-testid="btn-open-simple-modal"]</code> → assert modal visible, then close via <code>[data-testid="btn-close-simple-modal"]</code>`,
  },
  {
    id: "S02",
    title: "Modal from Repeated Card",
    testId: "scenario-modal-card",
    resultId: "result-s02",
    initialResult: "Not opened yet",
    hint: `Target: <code>[data-testid="card-course"]</code> filtering by text, click its open button, then close the modal.`,
  },
  {
    id: "S03",
    title: "Dynamic ID Modal",
    testId: "scenario-modal-dynamic",
    resultId: "result-s03",
    initialResult: "Not opened yet",
    hint: `Target: Modal with dynamic attribute using <code>starts-with</code> or partial match to locate the confirm button.`,
  },
  {
    id: "S04",
    title: "Missing Locator Modal",
    testId: "scenario-modal-challenge",
    resultId: "result-s04",
    initialResult: "Not opened yet",
    hint: `Target: Use ARIA labels or sibling relationships to locate the correct 'Accept' button inside the modal.`,
  },
];

export const frameworkMethods: Record<"selenium" | "playwright" | "cypress", FrameworkMethods> = {
  selenium:   { label: "Selenium (Java)",   methods: [{ color: "blue", label: "switchTo().activeElement()" }, { color: "purple", label: "click()" }] },
  playwright: { label: "Playwright JS / PY", methods: [{ color: "blue", label: "getByRole('dialog')" }, { color: "purple", label: "click()" }] },
  cypress:    { label: "Cypress JS",         methods: [{ color: "blue", label: "cy.get('.modal')" }, { color: "purple", label: ".click()" }] },
};
