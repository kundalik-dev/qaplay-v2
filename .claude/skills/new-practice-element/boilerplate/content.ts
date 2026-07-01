import type { ElementContent } from "../types";

/**
 * [Element] — content for the /new-practice/[element] workspace.
 *
 * The Practice tab UI lives in the route's own _components (your custom cards).
 * This file ONLY drives the reusable Test Cases and Learn views.
 *
 * Rename: replace every occurrence of "element" / "ELEMENT" / "ELM" with your
 * actual element slug and abbreviation.
 */
export const elementContent: ElementContent = {
  meta: {
    slug: "element",
    title: "Element Title",
    description:
      "Short description used in the workspace header and page metadata. Keep it under 160 chars.",
    level: "Beginner", // "Beginner" | "Intermediate" | "Advanced"
    tags: ["Tag1", "Tag2"],
    upNext: {
      title: "Next Element Title",
      description: "One-line description of the next playground.",
      href: "/new-practice/next-element",
      iconSrc: "/mainicons/next-icon.svg",
      iconAlt: "Next element icon",
    },
  },

  // ── Test Cases ─────────────────────────────────────────────────────────────
  // Rendered by the reusable TestCasesView / TestCasesTable component.
  // id prefix convention: 3-letter abbreviation matching the element (e.g. KBD_, NET_, DT_).

  testCases: [
    {
      id: "ELM_001",
      scenario: "Perform the basic positive action",
      expected: "The result element shows the expected text.",
      type: "positive", // "positive" | "negative" | "edge"
      priority: "high", // "high" | "medium" | "low"
      steps: [
        "Navigate to <code>/new-practice/element</code>.",
        'Locate <code>[data-testid="action-btn-1"]</code>.',
        "Click the button.",
        'Assert <code>[data-testid="result-1"]</code> contains <code>Action performed!</code>.',
      ],
    },
    {
      id: "ELM_002",
      scenario: "Verify the reset button clears the result",
      expected: "The result element returns to its initial placeholder text.",
      type: "positive",
      priority: "medium",
      steps: [
        "Trigger the action (ELM_001).",
        'Click <code>[data-testid="reset-btn-1"]</code>.',
        "Assert result returns to the initial placeholder.",
      ],
    },
    {
      id: "ELM_003",
      scenario: "Edge case or negative scenario",
      expected: "Expected outcome for the edge case.",
      type: "edge",
      priority: "low",
      steps: ["Step one.", "Step two.", "Assert the outcome."],
      note: "Optional note — e.g. browser-specific behaviour or known limitation.",
    },
  ],

  // ── Learn sections ─────────────────────────────────────────────────────────
  // Rendered by the reusable LearnView component.
  // Each section: { id, heading, desc?, body?, bullets?, snippets? }
  //   desc    — plain text under the heading
  //   body    — extra HTML paragraph (use sparingly)
  //   bullets — string[], each item may contain HTML
  //   snippets — { pw, sel, cy } tabbed code block with Copy + syntax highlight

  learn: [
    {
      id: "learn-overview",
      heading: "Overview",
      desc: "Describe the element type and why it matters for automation. What are the common real-world scenarios? What makes it tricky to automate?",
    },
    {
      id: "learn-basic",
      heading: "1 · Basic Interaction",
      desc: "Describe the fundamental interaction pattern and what to assert.",
      snippets: {
        pw: {
          lang: "TypeScript",
          code: `// Playwright
await page.getByTestId('action-btn-1').click();
await expect(page.getByTestId('result-1')).toContainText('Action performed!');`,
        },
        sel: {
          lang: "Java",
          code: `// Selenium WebDriver
driver.findElement(By.cssSelector("[data-testid='action-btn-1']")).click();

String result = driver
  .findElement(By.cssSelector("[data-testid='result-1']"))
  .getText();
assertTrue(result.contains("Action performed!"));`,
        },
        cy: {
          lang: "JavaScript",
          code: `// Cypress
cy.get('[data-testid="action-btn-1"]').click();
cy.get('[data-testid="result-1"]').should('contain', 'Action performed!');`,
        },
      },
    },
    {
      id: "learn-advanced",
      heading: "2 · Advanced Pattern",
      desc: "Describe a more complex variation or edge case worth knowing.",
      snippets: {
        pw: {
          lang: "TypeScript",
          code: `// Playwright — advanced pattern
// …`,
        },
        sel: {
          lang: "Java",
          code: `// Selenium — advanced pattern
// …`,
        },
        cy: {
          lang: "JavaScript",
          code: `// Cypress — advanced pattern
// …`,
        },
      },
    },
    {
      id: "learn-pitfalls",
      heading: "Common Pitfalls",
      desc: "Mistakes that commonly cause flaky or broken tests.",
      bullets: [
        "Pitfall one — description of the mistake and how to avoid it.",
        "Pitfall two — include <code>code references</code> where helpful.",
        "Pitfall three.",
      ],
    },
  ],
};
