import type {
  CodeSnippets,
  FaqItem,
  MethodRow,
  TocItem,
} from "@/data/practice-data/types";

/** Five-column method comparison shown in the Learn tab. */
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
    action: "Is disabled",
    selenium: "!el.isEnabled()",
    playwrightJs: "toBeDisabled()",
    playwrightPy: "to_be_disabled()",
    cypress: "should('be.disabled')",
  },
  {
    action: "Get text",
    selenium: "el.getText()",
    playwrightJs: "textContent()",
    playwrightPy: "text_content()",
    cypress: ".invoke('text')",
  },
  {
    action: "Press Enter",
    selenium: "sendKeys(Keys.ENTER)",
    playwrightJs: "press('Enter')",
    playwrightPy: "press('Enter')",
    cypress: ".type('{enter}')",
  },
];

/** Per-technique code snippets rendered inside each Learn DocSection. */
export const buttonsLearnCode: Record<string, CodeSnippets> = {
  singleClick: {
    playwright: `await page.locator('#clickBtn').click();
await expect(
  page.locator('#clickResult')
).toBeVisible();`,
    selenium: `driver.findElement(By.id("clickBtn")).click();
assertTrue(driver.findElement(
  By.id("clickResult")).isDisplayed());`,
    cypress: `cy.get('#clickBtn').click();
cy.get('#clickResult').should('be.visible');`,
  },
  doubleClick: {
    playwright: `await page.locator('#doubleClickBtn').dblclick();
await expect(
  page.locator('#doubleClickResult')
).toHaveText('Double clicked!');`,
    selenium: `WebElement btn = driver.findElement(
  By.id("doubleClickBtn"));
new Actions(driver).doubleClick(btn).perform();
assertEquals("Double clicked!",
  driver.findElement(
    By.id("doubleClickResult")).getText());`,
    cypress: `cy.get('#doubleClickBtn').dblclick();
cy.get('#doubleClickResult')
  .should('have.text', 'Double clicked!');`,
  },
  rightClick: {
    playwright: `await page.locator('#rightClickBtn')
  .click({ button: 'right' });
await expect(
  page.locator('#contextMenu')
).toBeVisible();`,
    selenium: `WebElement btn = driver.findElement(
  By.id("rightClickBtn"));
new Actions(driver).contextClick(btn).perform();
assertTrue(driver.findElement(
  By.id("contextMenu")).isDisplayed());`,
    cypress: `cy.get('#rightClickBtn').rightclick();
cy.get('#contextMenu').should('be.visible');`,
  },
  disabled: {
    playwright: `await expect(
  page.locator('#disabledBtn')
).toBeDisabled();`,
    selenium: `WebElement btn = driver.findElement(
  By.id("disabledBtn"));
assertFalse(btn.isEnabled());
assertNotNull(btn.getAttribute("disabled"));`,
    cypress: `cy.get('#disabledBtn').should('be.disabled');`,
  },
  textChange: {
    playwright: `const btn = page.locator('#toggleBtn');
const before = await btn.textContent();
await btn.click();
expect(await btn.textContent()).not.toBe(before);`,
    selenium: `WebElement btn = driver.findElement(
  By.id("toggleBtn"));
String before = btn.getText();
btn.click();
assertNotEquals(before, btn.getText());`,
    cypress: `cy.get('#toggleBtn').then(($b) => {
  const before = $b.text();
  cy.wrap($b).click()
    .should(($el) => {
      expect($el.text()).not.to.eq(before);
    });
});`,
  },
  keyboard: {
    playwright: `await page.locator('#submitBtn').press('Enter');`,
    selenium: `driver.findElement(By.id("submitBtn"))
  .sendKeys(Keys.ENTER);`,
    cypress: `cy.get('#submitBtn').type('{enter}');`,
  },
};

/** Accordion FAQ. Answers may contain inline <code>/<a> markup. */
export const buttonsFaq: FaqItem[] = [
  {
    question: "How do I click a button using Selenium WebDriver?",
    answer:
      "Locate the element with a stable selector and call <code>click()</code>, e.g. <code>driver.findElement(By.cssSelector(\"[data-testid='btn-navigate-home']\")).click();</code>. Prefer <code>data-testid</code> or <code>id</code> over brittle XPath. Selenium scrolls the element into view automatically before clicking.",
    testId: "faq-1",
  },
  {
    question: "How do I perform a double-click on a button in Selenium WebDriver?",
    answer:
      "A plain <code>click()</code> cannot express a double click — use the Actions API: <code>new Actions(driver).doubleClick(element).perform();</code>. In Playwright use <code>locator.dblclick()</code> and in Cypress <code>cy.get(sel).dblclick()</code>.",
    testId: "faq-2",
  },
  {
    question: "How do I right-click a button to trigger a context menu in Selenium?",
    answer:
      "Use <code>new Actions(driver).contextClick(element).perform();</code>. Playwright: <code>locator.click({ button: 'right' })</code>; Cypress: <code>cy.get(sel).rightclick()</code>. If the app renders a custom menu, assert it becomes visible afterwards.",
    testId: "faq-3",
  },
  {
    question: "How do I check if a button is disabled before clicking it?",
    answer:
      "Assert the state instead of clicking. Selenium: <code>element.isEnabled()</code> returns <code>false</code> for disabled buttons. Playwright: <code>await expect(locator).toBeDisabled()</code>. Clicking a disabled button in Playwright throws after the actionability timeout, so guard with the assertion first.",
    testId: "faq-4",
  },
  {
    question: "How do I wait for a button to become clickable in Playwright or Selenium?",
    answer:
      "Playwright auto-waits for actionability (visible, enabled, stable) on every action, so no explicit wait is needed. Selenium needs an explicit wait: <code>new WebDriverWait(driver, Duration.ofSeconds(10)).until(ExpectedConditions.elementToBeClickable(locator));</code>.",
    testId: "faq-5",
  },
];

/** Right-rail table of contents — ids must match the Learn DocSection ids. */
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
