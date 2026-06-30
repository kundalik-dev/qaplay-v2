import type { ChallengeMeta } from "../types";

// ── The Impatient User ───────────────────────────────────────────────────────
export const impatientUser: ChallengeMeta = {
  id: "impatient-user",
  title: "The Impatient User",
  summary: "Wait for a randomly-delayed success toast before it disappears.",
  description:
    "A common flakiness cause in E2E tests is hardcoded sleeps. This challenge forces you to use smart, dynamic waits for elements that appear and disappear rapidly.",
  difficulty: "Medium",
  xp: 10,
  tags: ["Dynamic Waits", "Timing", "Flakiness"],
  problemStatement:
    "The #1 cause of flaky E2E tests is hardcoded sleeps like <code>page.waitForTimeout(3000)</code>. If the actual delay is longer than 3 seconds, your test fails. If it's shorter, you waste time. This challenge forces you to replace that habit with Playwright's smart waiting APIs, which poll the DOM until the element is in the expected state — no guessing, no flaking.",
  expectedBehavior: [
    'Click the "Start Processing" button to trigger the async operation',
    "Wait dynamically for the success toast — do NOT use hardcoded sleeps",
    "Assert the toast's exact text while it is still visible",
    "Your script must handle any delay between 1 and 7 seconds reliably",
  ],
  hints: [
    "<code>expect(locator).toBeVisible()</code> is a smart wait by default — it retries until the element appears or the timeout expires.",
    "Pass a generous timeout to handle the full 7-second delay: <code>await expect(toast).toBeVisible({ timeout: 10_000 })</code>.",
    "The toast disappears after 800 ms. Assert its text <em>while waiting</em> for visibility — <code>toBeVisible</code> and <code>toContainText</code> can be chained or used back-to-back before it vanishes.",
    "Never use <code>page.waitForTimeout()</code> here. If you feel tempted to add a sleep, that's the signal to use <code>waitForSelector</code> or <code>expect(...).toBeVisible()</code> instead.",
  ],
  instructions: [
    "Click the 'Start Processing' button in the right panel.",
    "A spinner will appear for a random 1–7 second delay.",
    "A success toast flashes for exactly 800 ms before vanishing.",
    "Your script must assert the toast's text before it disappears — without using hardcoded sleeps.",
  ],
  boilerplate: `import { test, expect } from '@playwright/test';

test('catch the fleeting success toast', async ({ page }) => {
  await page.goto('http://localhost:3000/challenges/impatient-user');

  await page.getByTestId('start-processing-btn').click();

  // Do NOT use page.waitForTimeout() — it's too brittle.
  // Use Playwright's smart wait instead:
  const toast = page.getByTestId('success-toast');
  await expect(toast).toBeVisible({ timeout: 10000 });
  await expect(toast).toContainText('Processing Complete');
});`,
  validationConfig: {
    skill: "Smart dynamic waits and synchronisation",
    scenario:
      "The user must click 'Start Processing', then dynamically wait for a success toast to appear after a random 1–7s delay, and assert its text within the 800ms window it remains visible. The script must use Playwright's smart waiting APIs, not hardcoded sleeps.",
    requiredPatterns: [
      {
        pattern: "Clicks the 'Start Processing' button using a stable locator",
        reason: "The button click is what triggers the processing sequence.",
      },
      {
        pattern:
          "Uses expect(...).toBeVisible() with a timeout, or page.waitForSelector(), to wait for the toast",
        reason:
          "This is the smart-wait pattern — it polls until the element appears rather than sleeping a fixed amount.",
      },
      {
        pattern:
          "Asserts the toast's text content with toContainText() or toHaveText()",
        reason:
          "A bare visibility check is insufficient — the user must confirm the correct message appeared.",
      },
    ],
    forbiddenPatterns: [
      {
        pattern:
          "Uses page.waitForTimeout() with any numeric millisecond value",
        reason:
          "Hardcoded sleeps are the exact anti-pattern this challenge is designed to teach against. Any use of waitForTimeout fails the submission.",
      },
      {
        pattern:
          "Uses a fixed sleep, setTimeout, or sleep() equivalent anywhere in the test code",
        reason: "Same reason — hardcoded delays make tests flaky.",
      },
    ],
    strictness: "strict",
    evaluatorNotes:
      "The toast's 800ms visibility window is intentionally tight. A solution that passes only sometimes (because it accidentally sleeps just right) should be marked fail. Look for a smart wait API: page.waitForSelector, expect.toBeVisible, and waitForFunction are all acceptable.",
  },
};
