import type { ChallengeMeta } from "../types";

// ── Drag & Drop Puzzle ───────────────────────────────────────────────────────
export const dragDropPuzzle: ChallengeMeta = {
  id: "drag-drop-puzzle",
  title: "Drag & Drop Puzzle",
  summary: "Simulate mouse pointer events to drag a ticket to 'Done'.",
  description:
    "Native drag-and-drop can be tricky to automate. Simulate the full pointer event sequence to drag a ticket from the To Do column into the Done column.",
  difficulty: "Medium",
  xp: 10,
  tags: ["Mouse Events", "Drag & Drop", "Interactions"],
  problemStatement:
    'Drag-and-drop is one of the trickiest interactions to automate reliably. The browser fires a chain of pointer events — <code>pointerdown</code>, <code>pointermove</code>, <code>pointerup</code> — and frameworks like React listen to all of them. A simple <code>click()</code> won\'t work. This challenge simulates a real kanban board where you must drag a ticket from "To Do" to "Done" using Playwright\'s pointer simulation APIs.',
  expectedBehavior: [
    'Locate the draggable ticket in the "To Do" column',
    'Drag it to the "Done" column using Playwright\'s drag API or manual mouse events',
    "Assert that the ticket appears in the Done column after the drop",
    "Assert that a success indicator is visible confirming the drag completed",
  ],
  hints: [
    "Playwright's <code>locator.dragTo(target)</code> is the simplest approach — it handles the full pointer event sequence automatically.",
    "If <code>dragTo()</code> doesn't trigger the drop, try the manual approach: <code>await page.mouse.move()</code> + <code>mouse.down()</code> + <code>mouse.move()</code> + <code>mouse.up()</code>.",
    "Find the ticket with <code>page.getByTestId('ticket-ticket-1042')</code> and the drop target with <code>page.getByTestId('done-column')</code>.",
    "After the drag, assert <code>page.getByTestId('ticket-ticket-1042-done')</code> is visible to confirm the drop registered correctly.",
  ],
  instructions: [
    "Locate the ticket in the 'To Do' column (data-testid: ticket-ticket-1042).",
    "Drag it to the 'Done' column (data-testid: done-column).",
    "Use Playwright's locator.dragTo() or simulate mouse events manually.",
    "Assert that the ticket appears in the Done column after the drop.",
  ],
  boilerplate: `import { test, expect } from '@playwright/test';

test('drag ticket to Done', async ({ page }) => {
  await page.goto('http://localhost:3000/challenges/drag-drop-puzzle');

  const ticket = page.getByTestId('ticket-ticket-1042');
  const doneCol = page.getByTestId('done-column');

  // Playwright's high-level drag API handles the pointer event sequence
  await ticket.dragTo(doneCol);

  // Assert the ticket is now in Done
  await expect(page.getByTestId('ticket-ticket-1042-done')).toBeVisible();
  await expect(page.getByTestId('done-success-hint')).toBeVisible();
});`,
  validationConfig: {
    skill: "Drag-and-drop automation with pointer events",
    scenario:
      "The user must write a Playwright script that locates the draggable ticket in the To Do column, drags it to the Done column, and asserts that the ticket appears in Done. Either the high-level dragTo() API or manual mouse event simulation is acceptable.",
    requiredPatterns: [
      {
        pattern:
          "Locates the draggable ticket using a stable selector (getByTestId, id, or role)",
        reason: "The ticket must be reliably found before the drag can begin.",
      },
      {
        pattern:
          "Performs the drag using locator.dragTo(target), or a manual mouse.down / mouse.move / mouse.up sequence targeting the Done column",
        reason:
          "One of these approaches is required to simulate the full drag-and-drop pointer event chain.",
      },
      {
        pattern:
          "Asserts that the ticket or a success indicator appears in the Done column",
        reason:
          "Confirms the drop succeeded — a bare drag call is not sufficient.",
      },
    ],
    forbiddenPatterns: [
      {
        pattern:
          "Modifies the DOM directly via page.evaluate() to move the ticket without simulating drag events",
        reason:
          "Injecting JS to teleport the element skips event simulation entirely and proves nothing about drag-and-drop automation skill.",
      },
    ],
    strictness: "moderate",
    evaluatorNotes:
      "Accept both dragTo() and manual mouse event chains (mouse.down / mouse.move / mouse.up). The moderate strictness is intentional: drag-and-drop implementations vary, and minor differences in selector strategy should not fail an otherwise correct solution.",
  },
};
