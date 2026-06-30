import type { ChallengeMeta } from "../types";

// ── The Stubborn API ─────────────────────────────────────────────────────────
export const stubbornApi: ChallengeMeta = {
  id: "stubborn-api",
  title: "The Stubborn API",
  summary: "Intercept a broken API request and mock a 200 OK response.",
  description:
    "The frontend works, but the API is hardcoded to return 500. Use Playwright's network interception to mock the response to 200 OK and fix the broken UI widget.",
  difficulty: "Hard",
  xp: 15,
  tags: ["Network Interception", "API Mocking"],
  problemStatement:
    "QA engineers frequently need to test how the UI handles edge cases that the real backend doesn't expose on demand — 500 errors, empty datasets, edge-case payloads. Playwright's <code>page.route()</code> lets you intercept any network request and return a mocked response without touching the server. This challenge puts you in that scenario: the <code>/api/user-stats</code> endpoint is hardcoded to fail, and your job is to make the UI think it succeeded.",
  expectedBehavior: [
    "Register a page.route() intercept for /api/user-stats BEFORE navigating",
    "Mock the response with HTTP 200 and body <code>{ status: 'success', users: 42 }</code>",
    "Navigate to the page — the intercept must catch the very first load request",
    "Assert that the success widget renders the mocked data correctly",
  ],
  hints: [
    "Register your <code>page.route()</code> handler <strong>before</strong> calling <code>page.goto()</code> — the API request fires on page load and will be missed if you register late.",
    "Use <code>route.fulfill()</code> to provide a mocked response. Pass <code>status: 200</code>, <code>contentType: 'application/json'</code>, and <code>body: JSON.stringify({ status: 'success', users: 42 })</code>.",
    "The URL glob <code>'**/api/user-stats'</code> matches the request regardless of the base domain — safe to use in any environment.",
    "After navigation, assert the success element: <code>await expect(page.getByTestId('api-success-box')).toBeVisible()</code>.",
  ],
  instructions: [
    "The page makes a GET request to /api/user-stats on load — it always returns 500.",
    "Set up a page.route() handler BEFORE navigating so the first load is already mocked.",
    "Fulfill the route with status 200 and body: { status: 'success', users: 42 }.",
    "Assert that the success widget renders with the mocked data.",
  ],
  boilerplate: `import { test, expect } from '@playwright/test';

test('mock the stubborn API', async ({ page }) => {
  // Intercept BEFORE navigating so the first load is already mocked
  await page.route('**/api/user-stats', async route => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ status: 'success', users: 42 }),
    });
  });

  await page.goto('http://localhost:3000/challenges/stubborn-api');

  // The widget should now show success state
  await expect(page.getByTestId('api-success-box')).toBeVisible();
});`,
  validationConfig: {
    skill: "Network interception and API response mocking",
    scenario:
      "The user must write a Playwright script that intercepts the GET /api/user-stats request using page.route() before the page loads, mocks the response with HTTP 200 and body { status: 'success', users: 42 }, then asserts the UI renders the success state.",
    requiredPatterns: [
      {
        pattern:
          "Calls page.route() with a URL pattern matching /api/user-stats",
        reason: "Without route(), no interception happens at all.",
      },
      {
        pattern: "The route handler calls route.fulfill() with status: 200",
        reason:
          "fulfill() is the correct API for mocking responses; abort() and continue() do not provide a mocked body.",
      },
      {
        pattern:
          "The fulfilled response body contains { status: 'success', users: 42 }",
        reason:
          "The challenge specifies an exact payload — the UI conditionally renders based on this data.",
      },
      {
        pattern: "page.route() is called BEFORE page.goto()",
        reason:
          "The request fires on page load. A late intercept misses it and the UI renders the 500 error state.",
      },
      {
        pattern: "Asserts the success UI element is visible after navigation",
        reason:
          "An assertion confirms the mock worked — not just that the script ran without errors.",
      },
    ],
    forbiddenPatterns: [
      {
        pattern: "Calls page.goto() before setting up page.route()",
        reason:
          "The request fires on load — a late intercept misses it entirely.",
      },
      {
        pattern:
          "Uses route.abort() or route.continue() instead of route.fulfill()",
        reason:
          "abort() blocks the request; continue() passes it to the real server. Neither provides a mocked 200 response.",
      },
    ],
    strictness: "strict",
    evaluatorNotes:
      "Accept both glob patterns (**/api/user-stats) and exact URL strings. The JSON body can be passed as a string (body: JSON.stringify(...)) or as an object. Both are correct. The key signals: route registered before goto, fulfill called with 200, and a UI assertion present.",
  },
};
