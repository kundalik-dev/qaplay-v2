import type {
  FaqItem,
  LearnCodeSnippet,
  MethodRow,
  TocItem,
} from "@/data/practice-data/types";

export const alertsDialogsTocItems: TocItem[] = [
  { id: "learn-overview", label: "Overview" },
  { id: "learn-open-verify", label: "1 · Open & Verify" },
  { id: "learn-close-button", label: "2 · Close via Button" },
  { id: "learn-confirm", label: "3 · Confirm Action" },
  { id: "learn-aria-label", label: "4 · Aria-Label Targeting" },
  { id: "learn-backdrop", label: "5 · Backdrop Click" },
  { id: "learn-escape", label: "6 · Escape Key" },
  { id: "learn-scoped", label: "7 · Scoped Locators" },
  { id: "learn-methods", label: "Method Summary", dividerBefore: true },
  { id: "learn-faq", label: "FAQ" },
];

export const alertsDialogsLearnDesc: Record<string, string> = {
  overview:
    "Dialogs appear in real applications for confirmations, warnings, and notifications. Automating them well means knowing how to open, assert, interact, and close them — including edge cases like backdrop clicks and keyboard dismissal.",
  openVerify:
    "Always assert that the dialog is visible before interacting with it. Race conditions can cause tests to fail if you click before the dialog renders.",
  closeButton:
    "Use a scoped locator to find the close button inside the dialog. This prevents false matches with other buttons on the page.",
  confirm:
    "Scope into the dialog before targeting the confirm or cancel button. Unscoped button clicks are fragile when similar buttons exist elsewhere on the page.",
  ariaLabel:
    "When a button has no data-testid, check for an aria-label. It is the most stable fallback when test ids are missing — more reliable than text alone.",
  backdrop:
    "Clicking the backdrop requires targeting a position outside the dialog box. A plain click() lands on the dialog box center, which stops propagation and does not close the dialog.",
  escape:
    "Keyboard dismissal is common in accessible UIs. Always verify the focus state before pressing Escape — some frameworks require focus on the dialog element.",
  scoped:
    "Repeated elements with the same data-testid require scoping to a unique parent. The data-notif-id attribute is the stable anchor for identifying the right item in the list.",
};

export const alertsDialogsLearnCode: Record<string, LearnCodeSnippet> = {
  openVerify: {
    pw: {
      lang: "TypeScript",
      code: `// Playwright — open dialog and assert it is visible
await page.getByTestId('open-info-dialog').click();

const dialog = page.getByRole('dialog', { name: 'Session Notice' });
await expect(dialog).toBeVisible();`,
    },
    sel: {
      lang: "Java",
      code: `// Selenium WebDriver
driver.findElement(By.cssSelector("[data-testid='open-info-dialog']")).click();

WebElement dialog = driver.findElement(By.cssSelector("[role='dialog']"));
assertTrue(dialog.isDisplayed());`,
    },
    cy: {
      lang: "JavaScript",
      code: `// Cypress
cy.get('[data-testid="open-info-dialog"]').click();

cy.get('[role="dialog"]').should('be.visible');`,
    },
  },
  closeButton: {
    pw: {
      lang: "TypeScript",
      code: `// Playwright — close dialog via × button
await page.getByTestId('open-info-dialog').click();

const dialog = page.getByTestId('info-alert-dialog');
await expect(dialog).toBeVisible();

await dialog.getByTestId('info-dialog-close-btn').click();
await expect(dialog).not.toBeVisible();`,
    },
    sel: {
      lang: "Java",
      code: `// Selenium WebDriver
driver.findElement(By.cssSelector("[data-testid='open-info-dialog']")).click();

WebElement dialog = driver.findElement(
  By.cssSelector("[data-testid='info-alert-dialog']")
);
dialog.findElement(
  By.cssSelector("[data-testid='info-dialog-close-btn']")
).click();`,
    },
    cy: {
      lang: "JavaScript",
      code: `// Cypress
cy.get('[data-testid="open-info-dialog"]').click();
cy.get('[data-testid="info-alert-dialog"]')
  .should('be.visible')
  .find('[data-testid="info-dialog-close-btn"]')
  .click();`,
    },
  },
  confirm: {
    pw: {
      lang: "TypeScript",
      code: `// Playwright — confirm action inside dialog
await page.getByTestId('open-confirm-dialog').click();

const dialog = page.getByTestId('confirm-action-dialog');
await expect(dialog.getByRole('heading')).toHaveText('Confirm Submission');

await dialog.getByTestId('confirm-ok-btn').click();
await expect(dialog).not.toBeVisible();`,
    },
    sel: {
      lang: "Java",
      code: `// Selenium WebDriver
driver.findElement(By.cssSelector("[data-testid='open-confirm-dialog']")).click();

WebElement dialog = driver.findElement(
  By.cssSelector("[data-testid='confirm-action-dialog']")
);
assertEquals("Confirm Submission",
  dialog.findElement(By.tagName("h2")).getText());
dialog.findElement(By.cssSelector("[data-testid='confirm-ok-btn']")).click();`,
    },
    cy: {
      lang: "JavaScript",
      code: `// Cypress
cy.get('[data-testid="open-confirm-dialog"]').click();
cy.get('[data-testid="confirm-action-dialog"]')
  .should('be.visible')
  .find('[data-testid="confirm-ok-btn"]')
  .click();`,
    },
  },
  ariaLabel: {
    pw: {
      lang: "TypeScript",
      code: `// Playwright — locate button by aria-label (no data-testid)
await page.getByTestId('open-delete-dialog').click();

const dialog = page.getByRole('dialog', { name: 'Delete Account' });

// The Delete button has aria-label but no data-testid
await dialog.getByRole('button', {
  name: 'Confirm account deletion'
}).click();`,
    },
    sel: {
      lang: "Java",
      code: `// Selenium WebDriver — aria-label CSS selector
driver.findElement(By.cssSelector("[data-testid='open-delete-dialog']")).click();

WebElement dialog = driver.findElement(
  By.cssSelector("[data-testid='delete-account-dialog']")
);
WebElement deleteBtn = dialog.findElement(
  By.cssSelector("[aria-label='Confirm account deletion']")
);
deleteBtn.click();`,
    },
    cy: {
      lang: "JavaScript",
      code: `// Cypress — aria-label attribute selector
cy.get('[data-testid="open-delete-dialog"]').click();
cy.get('[data-testid="delete-account-dialog"]')
  .find('[aria-label="Confirm account deletion"]')
  .click();`,
    },
  },
  backdrop: {
    pw: {
      lang: "TypeScript",
      code: `// Playwright — click backdrop (outside dialog box)
await page.getByTestId('open-backdrop-dialog').click();

const backdrop = page.getByTestId('backdrop-dismiss-dialog');
await expect(backdrop).toBeVisible();

// Click at top-left corner — outside the centered dialog box
await backdrop.click({ position: { x: 5, y: 5 } });
await expect(backdrop).not.toBeVisible();`,
    },
    sel: {
      lang: "Java",
      code: `// Selenium WebDriver — click at backdrop edge
driver.findElement(
  By.cssSelector("[data-testid='open-backdrop-dialog']")
).click();

WebElement backdrop = driver.findElement(
  By.cssSelector("[data-testid='backdrop-dismiss-dialog']")
);
int halfW = backdrop.getSize().getWidth() / 2;
int halfH = backdrop.getSize().getHeight() / 2;
new Actions(driver)
  .moveToElement(backdrop, -halfW + 10, -halfH + 10)
  .click()
  .perform();`,
    },
    cy: {
      lang: "JavaScript",
      code: `// Cypress — click top-left of backdrop
cy.get('[data-testid="open-backdrop-dialog"]').click();
cy.get('[data-testid="backdrop-dismiss-dialog"]')
  .should('be.visible')
  .click('topLeft');`,
    },
  },
  escape: {
    pw: {
      lang: "TypeScript",
      code: `// Playwright — press Escape to dismiss dialog
await page.getByTestId('open-escape-dialog').click();

const dialog = page.getByTestId('escape-dismiss-dialog');
await expect(dialog).toBeVisible();

await page.keyboard.press('Escape');
await expect(dialog).not.toBeVisible();`,
    },
    sel: {
      lang: "Java",
      code: `// Selenium WebDriver — send ESCAPE key
driver.findElement(
  By.cssSelector("[data-testid='open-escape-dialog']")
).click();

// Press ESCAPE on the body or any focused element
driver.findElement(By.tagName("body")).sendKeys(Keys.ESCAPE);`,
    },
    cy: {
      lang: "JavaScript",
      code: `// Cypress — type {esc}
cy.get('[data-testid="open-escape-dialog"]').click();
cy.get('[data-testid="escape-dismiss-dialog"]').should('be.visible');
cy.get('body').type('{esc}');
cy.get('[data-testid="escape-dismiss-dialog"]').should('not.exist');`,
    },
  },
  scoped: {
    pw: {
      lang: "TypeScript",
      code: `// Playwright — scope to the right notification before dismissing
// All Dismiss buttons share data-testid — scope to the unique parent
const targetNotif = page.locator(
  '[data-testid="notif-item"][data-notif-id="notif-2"]'
);
await targetNotif.getByTestId('notif-dismiss-btn').click();

// Confirm in the dialog scoped by data-notif-id
const dialog = page.locator(
  '[data-testid="dismiss-confirm-dialog"][data-notif-id="notif-2"]'
);
await dialog.getByRole('button', { name: /Confirm dismiss/i }).click();`,
    },
    sel: {
      lang: "Java",
      code: `// Selenium WebDriver — XPath with ancestor scoping
WebElement dismissBtn = driver.findElement(By.xpath(
  "//div[@data-testid='notif-item'][@data-notif-id='notif-2']" +
  "//*[@data-testid='notif-dismiss-btn']"
));
dismissBtn.click();

// Confirm in dialog by aria-label partial match
driver.findElement(By.cssSelector(
  "[data-testid='dismiss-confirm-dialog'][data-notif-id='notif-2']" +
  " [aria-label*='Confirm dismiss']"
)).click();`,
    },
    cy: {
      lang: "JavaScript",
      code: `// Cypress — parent + child chaining
cy.get('[data-testid="notif-item"][data-notif-id="notif-2"]')
  .find('[data-testid="notif-dismiss-btn"]')
  .click();

cy.get('[data-testid="dismiss-confirm-dialog"][data-notif-id="notif-2"]')
  .find('[aria-label*="Confirm dismiss"]')
  .click();`,
    },
  },
};

export const alertsDialogsMethodRows: MethodRow[] = [
  {
    action: "Open dialog",
    selenium: "element.click()",
    playwrightJs: "locator.click()",
    playwrightPy: "locator.click()",
    cypress: ".click()",
  },
  {
    action: "Assert visible",
    selenium: "isDisplayed()",
    playwrightJs: "expect(dialog).toBeVisible()",
    playwrightPy: "expect(dialog).to_be_visible()",
    cypress: "should('be.visible')",
  },
  {
    action: "Scope to dialog",
    selenium: "findElement(By.css('[role=\"dialog\"]'))",
    playwrightJs: "getByRole('dialog')",
    playwrightPy: "get_by_role('dialog')",
    cypress: "get('[role=\"dialog\"]')",
  },
  {
    action: "Escape key",
    selenium: "sendKeys(Keys.ESCAPE)",
    playwrightJs: "keyboard.press('Escape')",
    playwrightPy: "keyboard.press('Escape')",
    cypress: "type('{esc}')",
  },
  {
    action: "Backdrop click",
    selenium: "Actions.moveToElement(el, x, y).click()",
    playwrightJs: "click({ position: {x,y} })",
    playwrightPy: "click(position={'x':5,'y':5})",
    cypress: ".click('topLeft')",
  },
  {
    action: "Aria-label button",
    selenium: "findElement(By.css(\"[aria-label='...']\"))",
    playwrightJs: "getByRole('button', { name: '...' })",
    playwrightPy: "get_by_role('button', name='...')",
    cypress: "find(\"[aria-label='...']\")",
  },
];

export const alertsDialogsFaq: FaqItem[] = [
  {
    question:
      "How do I wait for a dialog to appear before interacting with it?",
    answer:
      "Use Playwright's expect(dialog).toBeVisible(), Selenium's WebDriverWait with visibilityOf, or Cypress's should('be.visible'). Never interact with elements before asserting visibility.",
    testId: "faq-1",
  },
  {
    question: "How do I handle a dialog button that has no data-testid?",
    answer:
      "First scope into the dialog with getByRole('dialog') or getByTestId on the dialog root. Then target the button by aria-label, role + name, or visible text. Avoid unscoped text selectors that could match buttons elsewhere on the page.",
    testId: "faq-2",
  },
  {
    question:
      "What is the difference between clicking the backdrop vs the dialog box?",
    answer:
      "The backdrop is the full-screen overlay. The dialog box is the centered panel on top. Clicking the dialog box stops propagation so the backdrop close handler never fires. To click the backdrop, use a position value in the corner of the overlay element — outside the dialog box bounds.",
    testId: "faq-3",
  },
  {
    question:
      "What is the difference between a native browser alert and a CSS modal dialog?",
    answer:
      "Native browser alerts (alert(), confirm(), prompt()) are handled via page.on('dialog') in Playwright or driver.switchTo().alert() in Selenium. CSS modals are regular DOM elements targeted with standard locators like any other element — no special dialog API needed.",
    testId: "faq-4",
  },
];
