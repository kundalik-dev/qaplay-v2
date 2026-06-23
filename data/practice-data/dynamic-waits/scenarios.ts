import type {
  ScenarioMeta,
  FrameworkMethods,
} from "@/data/practice-data/types";

export const dynamicWaitsScenarios: ScenarioMeta[] = [
  {
    id: "S01",
    title: "Scenario 1: Delayed Element Appearance",
    testId: "scenario-dw-delayed-element",
    resultId: "result-s01",
    initialResult: "Element not visible",
    hint: `Click <code>[data-testid="dw-trigger-delayed"]</code>, then use <code>waitForSelector('[data-testid="dw-delayed-result"]')</code> to wait for the element to appear after a 2-second delay.`,
  },
  {
    id: "S02",
    title: "Scenario 2: Loading Spinner / Skeleton",
    testId: "scenario-dw-spinner",
    resultId: "result-s02",
    initialResult: "Spinner not handled",
    hint: `Click <code>[data-testid="dw-trigger-spinner"]</code> → assert spinner <code>[data-testid="dw-spinner"]</code> appears, then <code>waitForSelector</code> it to disappear, then assert content is visible.`,
  },
  {
    id: "S03",
    title: "Scenario 3: Toast / Snackbar Message",
    testId: "scenario-dw-toast",
    resultId: "result-s03",
    initialResult: "Toast not captured",
    hint: `Click <code>[data-testid="dw-trigger-toast"]</code> → use <code>waitForSelector('[data-testid="dw-toast"]')</code> to capture the toast. It auto-dismisses after 3 seconds — assert text before it disappears.`,
  },
  {
    id: "S04",
    title: "Scenario 4: Polling Until Condition",
    testId: "scenario-dw-polling",
    resultId: "result-s04",
    initialResult: "Condition not met",
    hint: `Click <code>[data-testid="dw-trigger-poll"]</code> → counter increments every 500 ms. Use <code>waitForFunction</code> or <code>WebDriverWait</code> with <code>ExpectedConditions</code> until <code>[data-testid="dw-poll-count"]</code> text equals "5".`,
  },
  {
    id: "S05",
    title: "Scenario 5: Element Enabled After Delay",
    testId: "scenario-dw-enabled",
    resultId: "result-s05",
    initialResult: "Button still disabled",
    hint: `<code>[data-testid="dw-submit-btn"]</code> starts disabled. Wait for it to become enabled: Playwright <code>waitFor({ state: 'enabled' })</code> · Selenium <code>ExpectedConditions.elementToBeClickable()</code>.`,
  },
  {
    id: "S06",
    title: "Scenario 6: Text Changes (Hard)",
    testId: "scenario-dw-text-change",
    resultId: "result-s06",
    initialResult: "Text not asserted",
    hint: `No <code>data-testid</code> on the status span. Locate via: <code>//div[@data-testid="dw-status-panel"]//span[contains(@class, "status-value")]</code>. Click trigger and wait until text changes from "Idle" to "Done".`,
  },
  {
    id: "S07",
    title: "Scenario 7: Network-Dependent Content (Medium)",
    testId: "scenario-dw-network",
    resultId: "result-s07",
    initialResult: "Data not loaded",
    hint: `Click <code>[data-testid="dw-fetch-btn"]</code> → simulated API call. Use <code>page.waitForResponse()</code> or wait for <code>[data-testid="dw-fetch-result"]</code> to contain non-empty text.`,
  },
  {
    id: "S08",
    title: "Scenario 8: Race Condition / Flaky Element (Challenge)",
    testId: "scenario-dw-race",
    resultId: "result-s08",
    initialResult: "Race not handled",
    hint: `<code>[data-testid="dw-race-btn"]</code> appears and disappears randomly within a 4-second window. Use <code>page.waitForSelector({ timeout: 5000 })</code> and wrap in try/catch. No CSS class or text is stable — rely on the <code>data-testid</code> only.`,
    badge: "CHALLENGE",
  },
];

export const frameworkMethods: Record<
  "selenium" | "playwright" | "cypress",
  FrameworkMethods
> = {
  selenium: {
    label: "Selenium (Java)",
    methods: [
      { color: "purple", label: "WebDriverWait" },
      { color: "blue", label: "ExpectedConditions" },
      { color: "orange", label: "visibilityOfElementLocated()" },
      { color: "emerald", label: "elementToBeClickable()" },
      { color: "slate", label: "invisibilityOf()" },
    ],
  },
  playwright: {
    label: "Playwright JS / PY",
    methods: [
      { color: "purple", label: "waitForSelector()" },
      { color: "blue", label: "waitForFunction()" },
      { color: "orange", label: "waitFor({ state })" },
      { color: "emerald", label: "waitForResponse()" },
      { color: "slate", label: "waitForLoadState()" },
    ],
  },
  cypress: {
    label: "Cypress JS",
    methods: [
      { color: "purple", label: ".should('be.visible')" },
      { color: "blue", label: ".should('have.text', …)" },
      { color: "orange", label: ".should('not.exist')" },
      { color: "emerald", label: "cy.intercept()" },
      { color: "slate", label: "{ timeout: N }" },
    ],
  },
};
