// =============================================================================
// CHALLENGES REGISTRY
// =============================================================================
// This is the SINGLE SOURCE OF TRUTH for every challenge on the platform.
//
// ── HOW TO ADD A NEW CHALLENGE (5 steps) ─────────────────────────────────────
//
//  1. Add a new object to the `challenges` array at the bottom of this file.
//     Fill in all required fields. Use existing entries as templates.
//
//  2. Create the Target UI playground component:
//     app/(dashboard)/challenges/[challengeId]/_components/<id>-playground.tsx
//     This is the interactive UI the automation script runs against.
//
//  3. Register the component in the page map:
//     app/(dashboard)/challenges/[challengeId]/page.tsx  →  PLAYGROUNDS record
//     Add one line: "your-challenge-id": <YourPlayground />
//
//  4. (Optional) Add a real API route if your playground needs one:
//     app/api/challenges/<id>/route.ts
//
//  5. Preview the AI prompt that will be sent at submission time:
//     console.log(buildValidationSystemPrompt(yourChallenge))
//
// ── WHERE THINGS LIVE ────────────────────────────────────────────────────────
//
//  data/challenges-registry.ts                          ← YOU ARE HERE
//  app/(dashboard)/challenges/page.tsx                  ← Dashboard (auto-reads registry)
//  app/(dashboard)/challenges/[challengeId]/page.tsx    ← Detail page (add to PLAYGROUNDS)
//  app/(dashboard)/challenges/[challengeId]/_components/← Playground UIs
//  app/(dashboard)/challenges/_components/AiValidationBox.tsx ← Calls buildValidationSystemPrompt()
//  app/(dashboard)/challenges/challenges.module.css     ← All challenge CSS
//
// =============================================================================

// ---------------------------------------------------------------------------
// TYPES
// ---------------------------------------------------------------------------

/**
 * A single required pattern — something the submitted code MUST do.
 * Both fields are plain English; the AI reads them as grading instructions.
 */
export interface RequiredPattern {
  /** What to look for. Be specific: "uses page.route() to intercept the request" */
  pattern: string;
  /** Why it matters — used in AI feedback when the pattern is missing */
  reason: string;
}

/**
 * A single forbidden pattern — an anti-pattern that causes automatic failure.
 */
export interface ForbiddenPattern {
  /** What to reject. Be specific: "uses page.waitForTimeout with a hardcoded value" */
  pattern: string;
  /** Why it's bad — used in AI feedback to explain the failure */
  reason: string;
}

/**
 * Structured configuration that drives the AI validation system prompt.
 *
 * This is the most important thing to fill in when adding a new challenge.
 * buildValidationSystemPrompt() converts it into a complete LLM system prompt —
 * you never write raw prompt strings anywhere in the codebase.
 *
 * Think of it as a rubric sheet that you'd hand to a senior QA reviewer.
 */
export interface ValidationConfig {
  /**
   * The automation skill or concept this challenge primarily tests.
   * One short phrase: "Shadow DOM traversal", "Smart dynamic waits", etc.
   */
  skill: string;

  /**
   * 2–4 sentences describing what a CORRECT solution accomplishes.
   * This is the core context the AI evaluates against. Be precise.
   */
  scenario: string;

  /**
   * Code patterns, APIs, or techniques the submission MUST include to pass.
   * ALL required patterns must be present — missing any one = fail.
   */
  requiredPatterns: RequiredPattern[];

  /**
   * Anti-patterns that trigger an AUTOMATIC FAIL regardless of other correctness.
   * Common examples: hardcoded sleeps, brittle XPath, DOM manipulation via evaluate().
   * Set to [] if there are no hard disqualifiers for this challenge.
   */
  forbiddenPatterns: ForbiddenPattern[];

  /**
   * How strictly the AI should grade:
   * - "strict"   → every required pattern must be present, no exceptions
   * - "moderate" → minor variations OK if the core concept is right
   * - "lenient"  → beginner-friendly; focus on the main concept only
   */
  strictness: "strict" | "moderate" | "lenient";

  /**
   * Optional freeform notes for the AI evaluator.
   * Use this for edge cases, common mistakes to watch for, or framework-specific
   * nuances that don't fit neatly into required/forbidden patterns.
   */
  evaluatorNotes?: string;
}

/**
 * Full metadata for a single challenge.
 * Every field either drives the dashboard UI or the AI validation system.
 */
export interface ChallengeMeta {
  /** URL slug — unique, kebab-case. Used in /challenges/[challengeId] */
  id: string;
  /** Display title on cards and the detail page header */
  title: string;
  /** One-sentence summary shown on dashboard cards */
  summary: string;
  /** Longer description shown in the challenge header */
  description: string;
  /** Controls the difficulty chip colour and filter options */
  difficulty: "Easy" | "Medium" | "Hard";
  /** XP awarded on passing */
  xp: number;
  /** Tag pills shown on cards and in the table view */
  tags: string[];

  /**
   * The "what and why" shown in the Problem Statement section.
   * 2–4 sentences explaining the real-world scenario this challenge simulates.
   * Focus on WHY this skill matters in production QA work.
   */
  problemStatement: string;

  /**
   * What the user's automation script must accomplish — shown as "Expected Behaviour".
   * Write as 3–5 concrete bullet points, each starting with a verb.
   * Example: ["Navigate to the page", "Locate the button inside #shadow-root", ...]
   */
  expectedBehavior: string[];

  /**
   * Progressive hints rendered in the collapsible Hints section.
   * Order from least to most revealing. 2–4 hints is the sweet spot.
   * Can contain inline HTML: <code>...</code>, <strong>...</strong>.
   */
  hints: string[];

  /**
   * Step-by-step instructions rendered in the collapsible Instructions accordion.
   * Write as numbered actions the user takes with their local script.
   */
  instructions: string[];

  /**
   * Starter code pre-filled in the submission textarea.
   * Should import the right framework and define a test stub.
   */
  boilerplate: string;

  /**
   * Structured AI validation configuration.
   * buildValidationSystemPrompt() converts this into the LLM system prompt.
   */
  validationConfig: ValidationConfig;
}

// ---------------------------------------------------------------------------
// PROMPT BUILDER
// ---------------------------------------------------------------------------

/**
 * Converts a challenge's validationConfig into a complete LLM system prompt.
 *
 * Called by AiValidationBox at submission time.
 * To preview what the AI receives for any challenge, run in the browser console:
 *   import { buildValidationSystemPrompt, challenges } from '@/data/challenges-registry';
 *   console.log(buildValidationSystemPrompt(challenges[0]));
 */
export function buildValidationSystemPrompt(challenge: ChallengeMeta): string {
  const { title, validationConfig: c } = challenge;

  const strictnessNote =
    c.strictness === "strict"
      ? "Apply all rules exactly. A submission that misses even one required pattern must FAIL."
      : c.strictness === "moderate"
      ? "Minor stylistic variations are acceptable if the core technique is correct."
      : "Focus on the main concept. Forgive minor syntax issues or framework differences.";

  const requiredSection = c.requiredPatterns
    .map((p, i) => `  ${i + 1}. ${p.pattern}\n     Why: ${p.reason}`)
    .join("\n\n");

  const forbiddenSection =
    c.forbiddenPatterns.length > 0
      ? c.forbiddenPatterns
          .map((p, i) => `  ${i + 1}. ${p.pattern}\n     Why: ${p.reason}`)
          .join("\n\n")
      : "  (none for this challenge)";

  const evaluatorSection = c.evaluatorNotes
    ? `\n## Evaluator Notes\n${c.evaluatorNotes}\n`
    : "";

  return `You are a Senior QA Engineer and code reviewer evaluating an automation test script submission on QA Playground.

## Challenge
Title: ${title}
Skill Under Test: ${c.skill}

## What a Correct Solution Should Do
${c.scenario}

## Required Patterns — ALL must be present to PASS
${requiredSection}

## Forbidden Patterns — ANY present = automatic FAIL
${forbiddenSection}
${evaluatorSection}
## Grading Strictness: ${c.strictness.toUpperCase()}
${strictnessNote}

## Your Response
Respond ONLY with a valid JSON object — no markdown fences, no extra text outside the JSON:
{
  "pass": boolean,
  "feedback": "2–3 sentences: state the verdict, cite the specific pattern that decided it, and give one concrete improvement tip the user can act on immediately."
}`;
}

// ---------------------------------------------------------------------------
// CHALLENGES
// ---------------------------------------------------------------------------

export const challenges: ChallengeMeta[] = [

  // ── 1. Ghost Element ─────────────────────────────────────────────────────
  {
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
      "Locate the button labelled \"Reveal Secret\" inside the simulated shadow root",
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
          pattern: "Asserts that a success or token element becomes visible after clicking",
          reason: "An assertion proves the script verified the outcome, not just clicked blindly.",
        },
      ],
      forbiddenPatterns: [
        {
          pattern: "Uses a deeply nested XPath like //div/span/button or a multi-step XPath expression",
          reason:
            "Brittle XPath selectors break whenever the DOM structure changes. Playwright's built-in locators are the correct approach.",
        },
        {
          pattern: "Uses page.waitForTimeout() with a hardcoded number",
          reason: "Hardcoded sleeps are a flakiness anti-pattern. Use expect().toBeVisible() instead.",
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
  },

  // ── 2. Impatient User ────────────────────────────────────────────────────
  {
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
      "Click the \"Start Processing\" button to trigger the async operation",
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
          pattern: "Asserts the toast's text content with toContainText() or toHaveText()",
          reason: "A bare visibility check is insufficient — the user must confirm the correct message appeared.",
        },
      ],
      forbiddenPatterns: [
        {
          pattern: "Uses page.waitForTimeout() with any numeric millisecond value",
          reason:
            "Hardcoded sleeps are the exact anti-pattern this challenge is designed to teach against. Any use of waitForTimeout fails the submission.",
        },
        {
          pattern: "Uses a fixed sleep, setTimeout, or sleep() equivalent anywhere in the test code",
          reason: "Same reason — hardcoded delays make tests flaky.",
        },
      ],
      strictness: "strict",
      evaluatorNotes:
        "The toast's 800ms visibility window is intentionally tight. A solution that passes only sometimes (because it accidentally sleeps just right) should be marked fail. Look for a smart wait API: page.waitForSelector, expect.toBeVisible, and waitForFunction are all acceptable.",
    },
  },

  // ── 3. Stubborn API ──────────────────────────────────────────────────────
  {
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
          pattern: "Calls page.route() with a URL pattern matching /api/user-stats",
          reason: "Without route(), no interception happens at all.",
        },
        {
          pattern: "The route handler calls route.fulfill() with status: 200",
          reason: "fulfill() is the correct API for mocking responses; abort() and continue() do not provide a mocked body.",
        },
        {
          pattern: "The fulfilled response body contains { status: 'success', users: 42 }",
          reason: "The challenge specifies an exact payload — the UI conditionally renders based on this data.",
        },
        {
          pattern: "page.route() is called BEFORE page.goto()",
          reason:
            "The request fires on page load. A late intercept misses it and the UI renders the 500 error state.",
        },
        {
          pattern: "Asserts the success UI element is visible after navigation",
          reason: "An assertion confirms the mock worked — not just that the script ran without errors.",
        },
      ],
      forbiddenPatterns: [
        {
          pattern: "Calls page.goto() before setting up page.route()",
          reason: "The request fires on load — a late intercept misses it entirely.",
        },
        {
          pattern: "Uses route.abort() or route.continue() instead of route.fulfill()",
          reason: "abort() blocks the request; continue() passes it to the real server. Neither provides a mocked 200 response.",
        },
      ],
      strictness: "strict",
      evaluatorNotes:
        "Accept both glob patterns (**/api/user-stats) and exact URL strings. The JSON body can be passed as a string (body: JSON.stringify(...)) or as an object. Both are correct. The key signals: route registered before goto, fulfill called with 200, and a UI assertion present.",
    },
  },

  // ── 4. Drag & Drop ───────────────────────────────────────────────────────
  {
    id: "drag-drop-puzzle",
    title: "Drag & Drop Puzzle",
    summary: "Simulate mouse pointer events to drag a ticket to 'Done'.",
    description:
      "Native drag-and-drop can be tricky to automate. Simulate the full pointer event sequence to drag a ticket from the To Do column into the Done column.",
    difficulty: "Medium",
    xp: 10,
    tags: ["Mouse Events", "Drag & Drop", "Interactions"],
    problemStatement:
      "Drag-and-drop is one of the trickiest interactions to automate reliably. The browser fires a chain of pointer events — <code>pointerdown</code>, <code>pointermove</code>, <code>pointerup</code> — and frameworks like React listen to all of them. A simple <code>click()</code> won't work. This challenge simulates a real kanban board where you must drag a ticket from \"To Do\" to \"Done\" using Playwright's pointer simulation APIs.",
    expectedBehavior: [
      "Locate the draggable ticket in the \"To Do\" column",
      "Drag it to the \"Done\" column using Playwright's drag API or manual mouse events",
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
          pattern: "Locates the draggable ticket using a stable selector (getByTestId, id, or role)",
          reason: "The ticket must be reliably found before the drag can begin.",
        },
        {
          pattern:
            "Performs the drag using locator.dragTo(target), or a manual mouse.down / mouse.move / mouse.up sequence targeting the Done column",
          reason: "One of these approaches is required to simulate the full drag-and-drop pointer event chain.",
        },
        {
          pattern: "Asserts that the ticket or a success indicator appears in the Done column",
          reason: "Confirms the drop succeeded — a bare drag call is not sufficient.",
        },
      ],
      forbiddenPatterns: [
        {
          pattern: "Modifies the DOM directly via page.evaluate() to move the ticket without simulating drag events",
          reason:
            "Injecting JS to teleport the element skips event simulation entirely and proves nothing about drag-and-drop automation skill.",
        },
      ],
      strictness: "moderate",
      evaluatorNotes:
        "Accept both dragTo() and manual mouse event chains (mouse.down / mouse.move / mouse.up). The moderate strictness is intentional: drag-and-drop implementations vary, and minor differences in selector strategy should not fail an otherwise correct solution.",
    },
  },

];
