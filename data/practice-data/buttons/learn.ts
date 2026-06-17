import type {
  FaqItem,
  LearnCodeSnippet,
  MethodRow,
  TocItem,
} from "@/data/practice-data/types";

export const buttonsTocItems: TocItem[] = [
  { id: "learn-overview", label: "Overview" },
  { id: "learn-single", label: "1 · Single Click" },
  { id: "learn-double", label: "2 · Double Click" },
  { id: "learn-right", label: "3 · Right Click" },
  { id: "learn-disabled", label: "4 · Disabled State" },
  { id: "learn-text", label: "5 · Text Change" },
  { id: "learn-keyboard", label: "6 · Keyboard Enter" },
  { id: "learn-methods", label: "Method Summary", dividerBefore: true },
  { id: "learn-faq", label: "FAQ" },
];

export const buttonsLearnDesc: Record<string, string> = {
  overview:
    "Buttons are one of the most important UI targets in automation. This page walks through the core actions you will use across Playwright, Selenium, and Cypress.",
  single:
    "Single click is the baseline interaction. Use it to trigger navigation, updates, and normal action buttons.",
  double:
    "Double click requires its own framework-specific command. A normal click will not trigger a double-click event.",
  right:
    "Right click is useful for context-menu style flows. Framework support differs slightly, but all three can handle it.",
  disabled:
    "For disabled controls, assert state instead of forcing interaction. This is more stable and more realistic.",
  text:
    "Text-change validation is a good way to assert that a button action actually caused a visible UI update.",
  keyboard:
    "Keyboard support matters for accessibility and test realism. A focused button should respond to Enter consistently.",
};

export const buttonsLearnCode: Record<string, LearnCodeSnippet> = {
  single: {
    pw: {
      lang: "TypeScript",
      code: `// Playwright
await page.locator('#clickBtn').click();
await expect(page.locator('#clickResult')).toBeVisible();`,
    },
    sel: {
      lang: "Java",
      code: `// Selenium WebDriver
driver.findElement(By.id("clickBtn")).click();
assertTrue(driver.findElement(By.id("clickResult")).isDisplayed());`,
    },
    cy: {
      lang: "JavaScript",
      code: `// Cypress
cy.get('#clickBtn').click();
cy.get('#clickResult').should('be.visible');`,
    },
  },
  double: {
    pw: {
      lang: "TypeScript",
      code: `// Playwright
await page.locator('#doubleClickBtn').dblclick();`,
    },
    sel: {
      lang: "Java",
      code: `// Selenium WebDriver
new Actions(driver).doubleClick(
  driver.findElement(By.id("doubleClickBtn"))
).perform();`,
    },
    cy: {
      lang: "JavaScript",
      code: `// Cypress
cy.get('#doubleClickBtn').dblclick();`,
    },
  },
  right: {
    pw: {
      lang: "TypeScript",
      code: `// Playwright
await page.locator('#rightClickBtn').click({ button: 'right' });`,
    },
    sel: {
      lang: "Java",
      code: `// Selenium WebDriver
new Actions(driver).contextClick(
  driver.findElement(By.id("rightClickBtn"))
).perform();`,
    },
    cy: {
      lang: "JavaScript",
      code: `// Cypress
cy.get('#rightClickBtn').rightclick();`,
    },
  },
  disabled: {
    pw: {
      lang: "TypeScript",
      code: `// Playwright
await expect(page.locator('#disabledBtn')).toBeDisabled();`,
    },
    sel: {
      lang: "Java",
      code: `// Selenium WebDriver
assertFalse(driver.findElement(By.id("disabledBtn")).isEnabled());`,
    },
    cy: {
      lang: "JavaScript",
      code: `// Cypress
cy.get('#disabledBtn').should('be.disabled');`,
    },
  },
  text: {
    pw: {
      lang: "TypeScript",
      code: `// Playwright
const before = await page.locator('#toggleBtn').textContent();
await page.locator('#toggleBtn').click();`,
    },
    sel: {
      lang: "Java",
      code: `// Selenium WebDriver
String before = driver.findElement(By.id("toggleBtn")).getText();`,
    },
    cy: {
      lang: "JavaScript",
      code: `// Cypress
cy.get('#toggleBtn').invoke('text').then((before) => {
  cy.get('#toggleBtn').click();
});`,
    },
  },
  keyboard: {
    pw: {
      lang: "TypeScript",
      code: `// Playwright
await page.locator('#submitBtn').press('Enter');`,
    },
    sel: {
      lang: "Java",
      code: `// Selenium WebDriver
driver.findElement(By.id("submitBtn")).sendKeys(Keys.ENTER);`,
    },
    cy: {
      lang: "JavaScript",
      code: `// Cypress
cy.get('#submitBtn').type('{enter}');`,
    },
  },
};

export const buttonsMethodRows: MethodRow[] = [
  {
    action: "Single click",
    selenium: "element.click()",
    playwrightJs: "locator.click()",
    playwrightPy: "locator.click()",
    cypress: ".click()",
  },
  {
    action: "Double click",
    selenium: "actions.doubleClick(el)",
    playwrightJs: "locator.dblclick()",
    playwrightPy: "locator.dblclick()",
    cypress: ".dblclick()",
  },
  {
    action: "Right click",
    selenium: "actions.contextClick(el)",
    playwrightJs: "click({ button: 'right' })",
    playwrightPy: "click(button='right')",
    cypress: ".rightclick()",
  },
  {
    action: "Disabled assert",
    selenium: "!element.isEnabled()",
    playwrightJs: "expect(locator).toBeDisabled()",
    playwrightPy: "expect(locator).to_be_disabled()",
    cypress: ".should('be.disabled')",
  },
  {
    action: "Keyboard Enter",
    selenium: "sendKeys(Keys.ENTER)",
    playwrightJs: "locator.press('Enter')",
    playwrightPy: "locator.press('Enter')",
    cypress: ".type('{enter}')",
  },
];

export const buttonsFaq: FaqItem[] = [
  {
    question: "Why is disabled-state checking better than clicking?",
    answer:
      "Because disabled buttons should not fire actions. Stable tests assert the disabled state directly instead of trying to force interaction.",
    testId: "faq-1",
  },
  {
    question: "When should I use double click in automation?",
    answer:
      "Use it only when the UI explicitly listens for a double-click event. Otherwise a normal click is simpler and more reliable.",
    testId: "faq-2",
  },
  {
    question: "How do I validate a right-click flow?",
    answer:
      "Trigger the context-click action and assert the resulting message, menu, or UI state change rather than relying on browser-native visuals.",
    testId: "faq-3",
  },
];
