import type {
  ScenarioMeta,
  FrameworkMethods,
} from "@/data/practice-data/types";

export const annotationsScenarios: ScenarioMeta[] = [
  {
    id: "S01",
    title: "Feature Flag Toggle (test.skip)",
    testId: "scenario-feature-flag",
    resultId: "result-s01",
    initialResult: "Toggle the Beta UI flag and check the panel",
    hint: `Read <code>aria-checked</code> on <code>[data-testid="toggle-beta-ui"]</code>. If <code>"false"</code>, call <code>test.skip(true, 'Beta UI is OFF')</code>. Toggle ON → assert <code>[data-testid="beta-panel"]</code> is visible.`,
  },
  {
    id: "S02",
    title: "Slow Report Generation (test.slow)",
    testId: "scenario-slow-report",
    resultId: "result-s02",
    initialResult: "Click Generate Report and wait for data to load",
    hint: `Call <code>test.slow()</code> at the top of the test. Click <code>[data-testid="btn-gen-report"]</code>. Assert <code>aria-busy="true"</code> on the loading indicator. Then wait for <code>[data-testid="report-result"]</code> to be visible.`,
  },
  {
    id: "S03",
    title: "Buggy Counter (test.fixme)",
    testId: "scenario-buggy-counter",
    resultId: "result-s03",
    initialResult: "Click + three times and observe the counter value",
    hint: `Click <code>[data-testid="btn-buggy-inc"]</code> 3× — counter shows <code>6</code> (BUG-101: adds 2 per click). Annotate: <code>test.fixme(true, 'BUG-101: increments by 2')</code>. Decrement with <code>[data-testid="btn-buggy-dec"]</code> works correctly.`,
    badge: "BUG-101",
  },
  {
    id: "S04",
    title: "Flaky Action (test.fail)",
    testId: "scenario-flaky",
    resultId: "result-s04",
    initialResult: "Click the flaky button — result is non-deterministic",
    hint: `Click <code>[data-testid="btn-flaky"]</code> — succeeds ~50% of runs (<code>data-reliability="50pct"</code>). Use <code>test.fail()</code> to confirm the failure is expected, or add <code>retries: 2</code> in playwright.config.`,
    badge: "BUG-202",
  },
  {
    id: "S05",
    title: "Checkout Stepper (test.step)",
    testId: "scenario-checkout-step",
    resultId: "result-s05",
    initialResult: "Complete all 3 checkout steps to place an order",
    hint: `Wrap each step with <code>await test.step('name', async () => …)</code>. Use <code>[data-step="1"]</code>, <code>[data-step="2"]</code>, <code>[data-step="3"]</code> to assert active tab. Assert <code>[data-testid="order-confirmation"]</code> at the end.`,
  },
  {
    id: "S06",
    title: "Data-Driven Login (test.each / @DataProvider)",
    testId: "scenario-data-driven-login",
    resultId: "result-s06",
    initialResult: "Login with any credential from the table below",
    hint: `Fill <code>[data-testid="login-email"]</code> and <code>[data-testid="login-password"]</code>. Click <code>[data-testid="btn-login"]</code>. Assert <code>[data-testid="login-result"]</code> and <code>[data-role-panel="admin"]</code>. Use <code>test.each(users)</code> to iterate all 4 rows.`,
  },
];

export const frameworkMethods: Record<
  "selenium" | "playwright" | "cypress",
  FrameworkMethods
> = {
  playwright: {
    label: "Playwright JS / PY",
    methods: [
      { color: "purple", label: "test.skip(condition, 'reason')" },
      { color: "purple", label: "test.slow()" },
      { color: "purple", label: "test.fixme('BUG-ID')" },
      { color: "purple", label: "test.fail()" },
      { color: "purple", label: "await test.step('name', fn)" },
      { color: "purple", label: "test.each(data)" },
    ],
  },
  selenium: {
    label: "Selenium / TestNG",
    methods: [
      { color: "blue", label: "throw new SkipException()" },
      { color: "blue", label: "@Test(timeOut=90000)" },
      { color: "blue", label: "@Test(enabled=false)" },
      { color: "blue", label: "@Test(expectedExceptions=...)" },
      { color: "blue", label: "@Step (Allure)" },
      { color: "blue", label: "@DataProvider" },
    ],
  },
  cypress: {
    label: "Cypress JS",
    methods: [
      { color: "green", label: "cy.skip() / it.skip()" },
      { color: "green", label: "Cypress.config('defaultCommandTimeout')" },
      { color: "green", label: "it.skip('BUG-ID')" },
      { color: "green", label: ".should('have.text', ...) (expected fail)" },
      { color: "green", label: "cy.log() + step plugin" },
      { color: "green", label: "Cypress._.times() / data array" },
    ],
  },
};
