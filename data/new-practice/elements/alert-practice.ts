import type { ElementContent } from "../types";

/**
 * Alert Practice — content for the /new-practice/alert-practice workspace.
 * The Practice tab UI lives in the route's own _components (custom HTML/CSS);
 * this file only drives the reusable Test Cases and Learn views.
 */
export const alertPracticeContent: ElementContent = {
  meta: {
    slug: "alert-practice",
    title: "Alert Practice",
    description:
      "Trigger and handle native browser dialogs — alert, confirm, and prompt — and assert the resulting page state.",
    level: "Beginner",
    tags: ["Dialogs", "Browser"],
  },

  testCases: [
    {
      id: "ALERT_001",
      scenario: "Accept a simple alert dialog",
      expected: "The alert is dismissed and the result text reads 'Accepted'.",
      type: "positive",
      priority: "high",
      steps: [
        "Register a dialog handler before clicking the trigger.",
        "Click the <code>Show Alert</code> button.",
        "Accept the dialog.",
        "Assert the result element shows <code>Accepted</code>.",
      ],
    },
    {
      id: "ALERT_002",
      scenario: "Dismiss a confirm dialog",
      expected: "The confirm is cancelled and the result reads 'Cancelled'.",
      type: "negative",
      priority: "medium",
      steps: [
        "Register a dialog handler that dismisses the dialog.",
        "Click the <code>Show Confirm</code> button.",
        "Assert the result element shows <code>Cancelled</code>.",
      ],
    },
    {
      id: "ALERT_003",
      scenario: "Enter text into a prompt dialog",
      expected: "The entered text is echoed back into the result element.",
      type: "positive",
      priority: "high",
      steps: [
        "Register a dialog handler that accepts with a value.",
        "Click the <code>Show Prompt</code> button.",
        "Provide the prompt text and accept.",
        "Assert the result element contains the entered text.",
      ],
    },
    {
      id: "ALERT_004",
      scenario: "No handler registered before a dialog opens",
      expected:
        "Playwright auto-dismisses the dialog; the action still resolves.",
      type: "edge",
      priority: "low",
      steps: [
        "Click a dialog trigger without registering a handler.",
        "Observe that Playwright auto-dismisses by default.",
      ],
      note: "By default Playwright dismisses dialogs automatically when no handler is attached.",
    },
  ],

  learn: [
    {
      id: "what-are-dialogs",
      heading: "What are browser dialogs?",
      body: "Native dialogs (<code>alert</code>, <code>confirm</code>, <code>prompt</code>) are rendered by the browser, not the page DOM. You cannot click them with a normal locator — automation tools expose a dedicated event to handle them.",
    },
    {
      id: "handle-in-playwright",
      heading: "Handling dialogs in Playwright",
      body: "Attach a <code>page.on('dialog', ...)</code> listener <strong>before</strong> the action that opens the dialog, then accept or dismiss it.",
      bullets: [
        "<code>dialog.accept(promptText?)</code> — confirm / submit a prompt value.",
        "<code>dialog.dismiss()</code> — cancel the dialog.",
        "Register the handler before the click that triggers it.",
      ],
      code: [
        {
          lang: "ts",
          label: "Playwright",
          code: `page.on('dialog', async (dialog) => {
  expect(dialog.type()).toBe('confirm');
  await dialog.accept();
});

await page.getByTestId('show-confirm').click();`,
        },
      ],
    },
    {
      id: "common-pitfalls",
      heading: "Common pitfalls",
      bullets: [
        "Registering the handler <em>after</em> the click — the dialog is already gone.",
        "Forgetting that Playwright auto-dismisses dialogs with no handler.",
        "Trying to locate the dialog text with a DOM selector (it isn't in the DOM).",
      ],
    },
  ],
};
