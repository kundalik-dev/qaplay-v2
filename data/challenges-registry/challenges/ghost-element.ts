import type { ChallengeMeta } from "../types";

// ── The Ghost Element ────────────────────────────────────────────────────────
export const ghostElement: ChallengeMeta = {
  id: "ghost-element",
  title: "The Ghost Element",
  summary: "Traverse the shadow DOM to interact with an encapsulated button.",
  description:
    "Dive into Web Components. Traverse the shadow DOM to find and interact with an encapsulated button. A must-know skill for modern web automation.",
  difficulty: "Hard",
  xp: 15,
  tags: ["Shadow DOM", "Web Components"],
  problemStatement:
    "Modern web apps increasingly use Web Components and Shadow DOM to encapsulate UI logic. This means elements are hidden inside a <code>#shadow-root</code> that standard CSS selectors and XPath can't reach — a common source of test failures on real projects. This challenge simulates that scenario: a button is rendered inside a component with an open shadow root, and your script must interact with it without resorting to fragile DOM hacks.",
  expectedBehavior: [
    "Navigate to the challenge page",
    'Locate the button labelled "Reveal Secret" inside the simulated shadow root',
    "Click the button using a stable, modern Playwright locator",
    "Assert that the secret token becomes visible after the click",
  ],
  hints: [
    "Playwright automatically pierces <strong>open</strong> shadow roots with its built-in locators — you don't need any special API or <code>evaluate()</code> call.",
    "Try <code>page.locator('#secret-btn')</code> or <code>page.getByRole('button', { name: 'Reveal Secret' })</code> — both work across shadow boundaries.",
    "After clicking, use <code>await expect(page.getByTestId('secret-token')).toBeVisible()</code> to assert the revealed token.",
  ],
  instructions: [
    "Open your local VS Code and start a Playwright script.",
    "Navigate to this page and locate the button labelled 'Reveal Secret'.",
    "The button lives inside a simulated #shadow-root — use Playwright's built-in shadow-piercing locators.",
    "Assert the revealed token text to confirm success.",
  ],
  boilerplate: `import { test, expect } from '@playwright/test';

test('pierce the shadow DOM', async ({ page }) => {
  await page.goto('http://localhost:3000/challenges/ghost-element');

  // Playwright pierces open shadow roots automatically with CSS selectors.
  // Hint: getByRole or getByText also work across shadow boundaries.
  const btn = page.locator('#secret-btn');
  await btn.click();

  // Assert the revealed token
  const token = page.getByTestId('secret-token');
  await expect(token).toBeVisible();
});`,
  validationConfig: {
    skill: "Shadow DOM traversal",
    scenario:
      "The user must write a Playwright script that navigates to the challenge page, locates a button rendered inside a simulated shadow root, clicks it, and asserts that the revealed secret token becomes visible. The script must use modern Playwright locators rather than fragile XPath or manual shadowRoot JS evaluation.",
    requiredPatterns: [
      {
        pattern: "Navigates to the challenge page with page.goto()",
        reason: "The script must target the actual page where the button lives.",
      },
      {
        pattern:
          "Locates the button using a semantic or stable locator (getByRole, getByText, getByTestId, or CSS selector like #secret-btn)",
        reason:
          "Playwright pierces open shadow roots automatically — no special API is needed, but the locator must be stable.",
      },
      {
        pattern: "Calls .click() on the located button",
        reason: "Clicking is the core action that triggers the token reveal.",
      },
      {
        pattern:
          "Asserts that a success or token element becomes visible after clicking",
        reason:
          "An assertion proves the script verified the outcome, not just clicked blindly.",
      },
    ],
    forbiddenPatterns: [
      {
        pattern:
          "Uses a deeply nested XPath like //div/span/button or a multi-step XPath expression",
        reason:
          "Brittle XPath selectors break whenever the DOM structure changes. Playwright's built-in locators are the correct approach.",
      },
      {
        pattern: "Uses page.waitForTimeout() with a hardcoded number",
        reason:
          "Hardcoded sleeps are a flakiness anti-pattern. Use expect().toBeVisible() instead.",
      },
      {
        pattern:
          "Uses page.evaluateHandle() or manually traverses shadowRoot in JavaScript to reach the button",
        reason:
          "Manually piercing shadow DOM with JS defeats the purpose of the challenge, which is to learn Playwright's built-in shadow-piercing capability.",
      },
    ],
    strictness: "strict",
    evaluatorNotes:
      "Accept any stable locator strategy (getByRole, getByText, getByTestId, CSS). The key insight is that Playwright pierces open shadow roots natively — the script should NOT use evaluate() to reach into the shadow root manually.",
  },
};
