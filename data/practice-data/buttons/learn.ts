import type { MethodRow, FaqItem, TocItem, LearnCodeSnippet } from "@/data/practice-data/types";

// ── TOC items ────────────────────────────────────────────────────────────────
export const buttonsTocItems: TocItem[] = [
  { id: "learn-overview",  label: "Overview" },
  { id: "learn-single",   label: "1 · Single Click" },
  { id: "learn-double",   label: "2 · Double Click" },
  { id: "learn-right",    label: "3 · Right Click" },
  { id: "learn-disabled", label: "4 · Disabled State" },
  { id: "learn-text",     label: "5 · Text Change" },
  { id: "learn-keyboard", label: "6 · Keyboard Enter" },
  { id: "learn-methods",  label: "Method Summary", dividerBefore: true },
  { id: "learn-faq",      label: "FAQ" },
];

// ── Learn doc sections description texts ─────────────────────────────────────
export const buttonsLearnDesc: Record<string, string> = {
  overview:
    "Buttons are the most fundamental interactive element you'll automate. This page covers 6 core interaction types — from simple single clicks to advanced hold actions — across Playwright, Selenium, and Cypress.",
  single:
    "The most common automation action. All three frameworks click and auto-wait for the element to be actionable.",
  double:
    "A single click won't trigger double-click events. Use the dedicated API in each framework.",
  right:
    "Triggers context menus. Selenium uses Actions API; Playwright and Cypress have first-class support.",
  disabled:
    "Assert the button is disabled before trying to interact. In Playwright, clicking a disabled button times out after the actionability check.",
  text:
    "Verifying that a button's label or an associated element's text changes after a click.",
  keyboard:
    "Keyboard activation is required for accessible automation. A focused button responds to Enter and Space the same as a click.",
};

// ── Code snippets per learn section ──────────────────────────────────────────
export const buttonsLearnCode: Record<string, LearnCodeSnippet> = {
  single: {
    pw:  { lang: "TypeScript", code: `// Playwright — auto-waits for actionability\nawait page.locator('#clickBtn').click();\nawait expect(\n  page.locator('#clickResult')\n).toBeVisible();` },
    sel: { lang: "Java",       code: `// Selenium WebDriver (Java)\ndriver.findElement(By.id("clickBtn")).click();\nassertTrue(driver.findElement(\n  By.id("clickResult")).isDisplayed());` },
    cy:  { lang: "JavaScript", code: `// Cypress\ncy.get('#clickBtn').click();\ncy.get('#clickResult').should('be.visible');` },
  },
  double: {
    pw:  { lang: "TypeScript", code: `// Playwright\nawait page.locator('#doubleClickBtn').dblclick();\nawait expect(\n  page.locator('#doubleClickResult')\n).toHaveText('Double clicked!');` },
    sel: { lang: "Java",       code: `// Selenium WebDriver (Java)\nWebElement btn = driver.findElement(\n  By.id("doubleClickBtn"));\nnew Actions(driver).doubleClick(btn).perform();\nassertEquals("Double clicked!",\n  driver.findElement(\n    By.id("doubleClickResult")).getText());` },
    cy:  { lang: "JavaScript", code: `// Cypress\ncy.get('#doubleClickBtn').dblclick();\ncy.get('#doubleClickResult')\n  .should('have.text', 'Double clicked!');` },
  },
  right: {
    pw:  { lang: "TypeScript", code: `// Playwright\nawait page.locator('#rightClickBtn')\n  .click({ button: 'right' });\nawait expect(\n  page.locator('#contextMenu')\n).toBeVisible();` },
    sel: { lang: "Java",       code: `// Selenium WebDriver (Java)\nWebElement btn = driver.findElement(\n  By.id("rightClickBtn"));\nnew Actions(driver).contextClick(btn).perform();\nassertTrue(driver.findElement(\n  By.id("contextMenu")).isDisplayed());` },
    cy:  { lang: "JavaScript", code: `// Cypress\ncy.get('#rightClickBtn').rightclick();\ncy.get('#contextMenu').should('be.visible');` },
  },
  disabled: {
    pw:  { lang: "TypeScript", code: `// Playwright — assert disabled, don't click\nawait expect(\n  page.locator('#disabledBtn')\n).toBeDisabled();` },
    sel: { lang: "Java",       code: `// Selenium WebDriver (Java)\nWebElement btn = driver.findElement(\n  By.id("disabledBtn"));\nassertFalse(btn.isEnabled());\nassertNotNull(btn.getAttribute("disabled"));` },
    cy:  { lang: "JavaScript", code: `// Cypress\ncy.get('#disabledBtn').should('be.disabled');` },
  },
  text: {
    pw:  { lang: "TypeScript", code: `// Playwright — capture before, compare after\nconst btn = page.locator('#toggleBtn');\nconst before = await btn.textContent();\nawait btn.click();\nexpect(await btn.textContent()).not.toBe(before);` },
    sel: { lang: "Java",       code: `// Selenium WebDriver (Java)\nWebElement btn = driver.findElement(\n  By.id("toggleBtn"));\nString before = btn.getText();\nbtn.click();\nassertNotEquals(before, btn.getText());` },
    cy:  { lang: "JavaScript", code: `// Cypress\ncy.get('#toggleBtn').then(($b) => {\n  const before = $b.text();\n  cy.wrap($b).click()\n    .should(($el) => {\n      expect($el.text()).not.to.eq(before);\n    });\n});` },
  },
  keyboard: {
    pw:  { lang: "TypeScript", code: `// Playwright\nawait page.locator('#submitBtn').press('Enter');` },
    sel: { lang: "Java",       code: `// Selenium WebDriver (Java)\ndriver.findElement(By.id("submitBtn"))\n  .sendKeys(Keys.ENTER);` },
    cy:  { lang: "JavaScript", code: `// Cypress\ncy.get('#submitBtn').type('{enter}');` },
  },
};

// Alias keys for component use (pw/sel/cy → playwright/selenium/cypress)
export type LearnFwKey = "pw" | "sel" | "cy";
export const learnFwLabels: Record<LearnFwKey, string> = {
  pw:  "Playwright",
  sel: "Selenium",
  cy:  "Cypress",
};

// ── Method summary table ──────────────────────────────────────────────────────
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
    playwrightPy: "click(button='righ