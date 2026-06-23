import type {
  ScenarioMeta,
  FrameworkMethods,
} from "@/data/practice-data/types";

export const alertsDialogsScenarios: ScenarioMeta[] = [
  {
    id: "S01",
    title: "Close Info Alert Dialog",
    testId: "scenario-close-info-dialog",
    resultId: "result-s01",
    initialResult: "No action yet",
    hint: `Open <code>[data-testid="info-alert-dialog"]</code> — click the × close button via <code>[data-testid="info-dialog-close-btn"]</code> or <code>getByRole('button', { name: 'Close info dialog' })</code>`,
  },
  {
    id: "S02",
    title: "Confirm Action in Dialog",
    testId: "scenario-confirm-action",
    resultId: "result-s02",
    initialResult: "Awaiting confirmation",
    hint: `Open <code>[data-testid="confirm-action-dialog"]</code> — click <code>[data-testid="confirm-ok-btn"]</code> to confirm. Assert <code>result-s02</code> reads "Submission confirmed!"`,
  },
  {
    id: "S03",
    title: "Cancel and Stay on Page",
    testId: "scenario-cancel-stay",
    resultId: "result-s03",
    initialResult: "Dialog not opened",
    hint: `In <code>[data-testid="unsaved-changes-dialog"]</code> click <code>[data-testid="stay-on-page-btn"]</code>. The Leave button has no <code>data-testid</code> — practice scoping to the dialog first`,
  },
  {
    id: "S04",
    title: "Destructive Delete Confirm",
    testId: "scenario-destructive-confirm",
    resultId: "result-s04",
    initialResult: "No deletion yet",
    badge: "DANGER",
    hint: `Inside <code>[data-testid="delete-account-dialog"]</code> the danger button has no <code>data-testid</code>. Use <code>aria-label="Confirm account deletion"</code> or <code>getByRole('button', { name: 'Delete Account' })</code>`,
  },
  {
    id: "S05",
    title: "Backdrop Click to Dismiss",
    testId: "scenario-backdrop-click",
    resultId: "result-s05",
    initialResult: "Dialog not opened",
    hint: `Click the dark backdrop — NOT the dialog box. In Playwright: <code>page.locator('[data-testid="backdrop-dismiss-dialog"]').click({ position: { x: 5, y: 5 } })</code>. In Cypress: <code>.click('topLeft')</code>`,
  },
  {
    id: "S06",
    title: "Escape Key to Dismiss",
    testId: "scenario-escape-key",
    resultId: "result-s06",
    initialResult: "Dialog not opened",
    hint: `This dialog has no close button — keyboard only. Playwright: <code>page.keyboard.press('Escape')</code> · Selenium: <code>sendKeys(Keys.ESCAPE)</code> · Cypress: <code>cy.get('body').type('{esc}')</code>`,
  },
  {
    id: "S07",
    title: "Assert Dialog Content",
    testId: "scenario-assert-content",
    resultId: "result-s07",
    initialResult: "Awaiting acknowledgement",
    hint: `None of the dialog text elements have <code>data-testid</code>. Assert the heading: <code>getByRole('heading', { name: 'Maintenance Window' })</code>. Assert body: <code>getByRole('dialog').getByText('Sunday')</code>`,
  },
  {
    id: "S08",
    title: "Scoped Dismiss — Repeated Triggers",
    testId: "scenario-scoped-dismiss",
    resultId: "result-s08",
    initialResult: "No notification dismissed",
    badge: "CHALLENGE",
    hint: `All three "Dismiss" buttons share <code>data-testid="notif-dismiss-btn"</code>. Scope to the right parent: <code>page.locator('[data-notif-id="notif-2"] [data-testid="notif-dismiss-btn"]').click()</code>. XPath: <code>//div[@data-notif-id="notif-2"]//*[@data-testid="notif-dismiss-btn"]</code>`,
  },
];

export const notifications = [
  { id: "notif-1", title: "Low Disk Space", severity: "warning" as const },
  { id: "notif-2", title: "Session Expiring Soon", severity: "info" as const },
  { id: "notif-3", title: "Security Alert", severity: "danger" as const },
];

export const frameworkMethods: Record<
  "selenium" | "playwright" | "cypress",
  FrameworkMethods
> = {
  selenium: {
    label: "Selenium (Java)",
    methods: [
      { color: "purple", label: "findElement(By.css('[role=dialog]'))" },
      { color: "blue", label: "isDisplayed()" },
      { color: "orange", label: "sendKeys(Keys.ESCAPE)" },
      { color: "green", label: 'findElement(By.cssSelector("[aria-label]"))' },
      { color: "yellow", label: "Actions.moveToElement()" },
    ],
  },
  playwright: {
    label: "Playwright JS / PY",
    methods: [
      { color: "purple", label: "getByRole('dialog')" },
      { color: "blue", label: "toBeVisible()" },
      { color: "orange", label: "keyboard.press('Escape')" },
      { color: "green", label: "getByRole('button', { name })" },
      { color: "yellow", label: "click({ position: {x, y} })" },
    ],
  },
  cypress: {
    label: "Cypress JS",
    methods: [
      { color: "purple", label: "get('[role=\"dialog\"]')" },
      { color: "blue", label: "should('be.visible')" },
      { color: "orange", label: "type('{esc}')" },
      { color: "green", label: ".find('button')" },
      { color: "yellow", label: ".click('topLeft')" },
    ],
  },
};
