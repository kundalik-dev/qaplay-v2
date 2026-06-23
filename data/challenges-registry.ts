export interface ChallengeMeta {
  id: string;
  title: string;
  summary: string;
  description: string;
  difficulty: "Easy" | "Medium" | "Hard";
  xp: number;
  tags: string[];
  instructions: string[];
  boilerplate: string;
  validationPrompt: string;
}

export const challenges: ChallengeMeta[] = [
  {
    id: "ghost-element",
    title: "The Ghost Element",
    summary: "Traverse the shadow DOM to interact with an encapsulated button.",
    description: "Dive into Web Components. Traverse the shadow DOM to find and interact with an encapsulated button. A must-know skill for modern web automation.",
    difficulty: "Hard",
    xp: 15,
    tags: ["Shadow DOM", "Advanced"],
    instructions: [
      "Open your local VS Code and start a Playwright script.",
      "Navigate to this page and locate the button labelled 'Reveal Secret'.",
      "The button is hidden inside a `#shadow-root`. Click it."
    ],
    boilerplate: "import { test } from '@playwright/test';\n\ntest('Find ghost', async ({ page }) => {\n  // your code\n});",
    validationPrompt: "Check if the playwright code successfully pierces the shadow root. Ensure they do not use exact xpaths, but rather modern locators."
  },
  {
    id: "impatient-user",
    title: "The Impatient User",
    summary: "Wait for a random delay before a success toast disappears.",
    description: "A common flakiness cause in E2E tests is hardcoded sleeps. This challenge forces users to use smart, dynamic waits for elements that appear and disappear rapidly.",
    difficulty: "Medium",
    xp: 10,
    tags: ["Dynamic Waits", "Timing"],
    instructions: [
      "Click the 'Start Processing' button.",
      "Wait for the random loading delay to finish.",
      "A success message will flash for 800ms. Assert its text before it disappears."
    ],
    boilerplate: "import { test, expect } from '@playwright/test';\n\ntest('Dynamic wait', async ({ page }) => {\n  // your code\n});",
    validationPrompt: "Check if the playwright code correctly waits for the element state (e.g., using waitForSelector or expect.toBeVisible). Deduct points or fail if they use hardcoded page.waitForTimeout."
  },
  {
    id: "stubborn-api",
    title: "The Stubborn API",
    summary: "Intercept a broken API request and mock a 200 OK response.",
    description: "The frontend works, but the API is returning 500. Use network interception to mock the response to 200 OK and fix the UI.",
    difficulty: "Hard",
    xp: 15,
    tags: ["Network", "Mocking"],
    instructions: [
      "The page automatically makes a GET request to /api/user-stats.",
      "It currently fails with a 500 Error.",
      "Intercept the request using Playwright's route handler.",
      "Fulfill the request with a 200 status and body: { status: 'success', users: 42 }."
    ],
    boilerplate: "import { test, expect } from '@playwright/test';\n\ntest('Mock API', async ({ page }) => {\n  await page.route('**/api/user-stats', route => {\n    // mock here\n  });\n  // ...\n});",
    validationPrompt: "Check if the code uses page.route to intercept the correct endpoint and correctly mocks the response body and status 200."
  },
  {
    id: "drag-drop-puzzle",
    title: "Drag & Drop Puzzle",
    summary: "Simulate mouse pointer events to drag a ticket to 'Done'.",
    description: "Native drag and drop can be tricky. Simulate mousedown, mousemove, and mouseup to drag the ticket from the To Do column to the Done column.",
    difficulty: "Medium",
    xp: 10,
    tags: ["Mouse Events", "Interactions"],
    instructions: [
      "Find the ticket element in the 'To Do' column.",
      "Drag the ticket using pointer/mouse simulation.",
      "Drop it into the 'Done' column."
    ],
    boilerplate: "import { test, expect } from '@playwright/test';\n\ntest('Drag and drop', async ({ page }) => {\n  // your code\n});",
    validationPrompt: "Check if they used appropriate Playwright drag-and-drop methods (e.g. locator.dragTo) or simulated mouse events properly."
  }
];
