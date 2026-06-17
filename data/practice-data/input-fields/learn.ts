import type {
  FaqItem,
  LearnCodeSnippet,
  MethodRow,
  TocItem,
} from "@/data/practice-data/types";

export const inputFieldsTocItems: TocItem[] = [
  { id: "learn-overview", label: "Overview" },
  { id: "learn-type", label: "1 · Typing Text" },
  { id: "learn-append", label: "2 · Append & Tab" },
  { id: "learn-read", label: "3 · Read Value" },
  { id: "learn-clear", label: "4 · Clear Field" },
  { id: "learn-disabled", label: "5 · Disabled State" },
  { id: "learn-readonly", label: "6 · Readonly State" },
  { id: "learn-methods", label: "Method Summary", dividerBefore: true },
  { id: "learn-faq", label: "FAQ" },
];

export const inputFieldsLearnDesc: Record<string, string> = {
  overview:
    "Text inputs are the most common element you will automate. This page covers the core actions across Playwright, Selenium, and Cypress: typing, appending, reading values, clearing, and detecting disabled & readonly states.",
  type: "Typing is the baseline interaction. Selenium's sendKeys() appends to existing content, while Playwright's fill() replaces the whole value first.",
  append:
    "To add to existing text instead of replacing it, avoid fill(). Click into the field and type with the keyboard so the current value is preserved, then press Tab to trigger blur events.",
  read: "Reading the current value lets you assert what the user (or your script) actually entered. Use the value attribute or the framework's input-value helper.",
  clear:
    "Clearing removes the existing content so a fresh value can be entered. Always assert the field is empty afterwards.",
  disabled:
    "Disabled inputs cannot receive focus or text. Assert the disabled state directly rather than trying to type, which keeps tests stable.",
  readonly:
    "Readonly inputs display a value that the user cannot change. The value is still readable, but typing has no effect — assert the readonly attribute.",
};

export const inputFieldsLearnCode: Record<string, LearnCodeSnippet> = {
  type: {
    pw: {
      lang: "TypeScript",
      code: `// Playwright
await page.locator('#movieNameInput').fill('Interstellar');
await expect(page.locator('#movieNameInput')).toHaveValue('Interstellar');`,
    },
    sel: {
      lang: "Java",
      code: `// Selenium WebDriver
WebElement input = driver.findElement(By.id("movieNameInput"));
input.sendKeys("Interstellar");
assertEquals("Interstellar", input.getAttribute("value"));`,
    },
    cy: {
      lang: "JavaScript",
      code: `// Cypress
cy.get('#movieNameInput').type('Interstellar');
cy.get('#movieNameInput').should('have.value', 'Interstellar');`,
    },
  },
  append: {
    pw: {
      lang: "TypeScript",
      code: `// Playwright — fill() would clear first, so type instead
await page.locator('#appendInput').click();
await page.keyboard.type(' Endgame');
await page.keyboard.press('Tab');`,
    },
    sel: {
      lang: "Java",
      code: `// Selenium — sendKeys appends by default
WebElement input = driver.findElement(By.id("appendInput"));
input.sendKeys(" Endgame");
input.sendKeys(Keys.TAB);`,
    },
    cy: {
      lang: "JavaScript",
      code: `// Cypress — type() appends to existing value
cy.get('#appendInput').type(' Endgame').tab();`,
    },
  },
  read: {
    pw: {
      lang: "TypeScript",
      code: `// Playwright
const value = await page.locator('#readValueInput').inputValue();
expect(value).not.toBe('');`,
    },
    sel: {
      lang: "Java",
      code: `// Selenium WebDriver
String value = driver.findElement(By.id("readValueInput"))
                     .getAttribute("value");`,
    },
    cy: {
      lang: "JavaScript",
      code: `// Cypress
cy.get('#readValueInput').invoke('val').should('not.be.empty');`,
    },
  },
  clear: {
    pw: {
      lang: "TypeScript",
      code: `// Playwright
await page.locator('#clearInput').fill('');
await expect(page.locator('#clearInput')).toHaveValue('');`,
    },
    sel: {
      lang: "Java",
      code: `// Selenium WebDriver
WebElement input = driver.findElement(By.id("clearInput"));
input.clear();
assertEquals("", input.getAttribute("value"));`,
    },
    cy: {
      lang: "JavaScript",
      code: `// Cypress
cy.get('#clearInput').clear();
cy.get('#clearInput').should('have.value', '');`,
    },
  },
  disabled: {
    pw: {
      lang: "TypeScript",
      code: `// Playwright
await expect(page.locator('#disabledInput')).toBeDisabled();`,
    },
    sel: {
      lang: "Java",
      code: `// Selenium WebDriver
assertFalse(driver.findElement(By.id("disabledInput")).isEnabled());`,
    },
    cy: {
      lang: "JavaScript",
      code: `// Cypress
cy.get('#disabledInput').should('be.disabled');`,
    },
  },
  readonly: {
    pw: {
      lang: "TypeScript",
      code: `// Playwright
await expect(page.locator('#readonlyInput'))
  .toHaveAttribute('readonly', '');`,
    },
    sel: {
      lang: "Java",
      code: `// Selenium WebDriver
String ro = driver.findElement(By.id("readonlyInput"))
                  .getAttribute("readonly");
assertNotNull(ro);`,
    },
    cy: {
      lang: "JavaScript",
      code: `// Cypress
cy.get('#readonlyInput').should('have.attr', 'readonly');`,
    },
  },
};

export const inputFieldsMethodRows: MethodRow[] = [
  {
    action: "Type text",
    selenium: 'element.sendKeys("text")',
    playwrightJs: 'locator.fill("text")',
    playwrightPy: 'locator.fill("text")',
    cypress: ".type('text')",
  },
  {
    action: "Append text",
    selenium: 'element.sendKeys("text")',
    playwrightJs: "keyboard.type('text')",
    playwrightPy: "keyboard.type('text')",
    cypress: ".type('text')",
  },
  {
    action: "Read value",
    selenium: 'getAttribute("value")',
    playwrightJs: "locator.inputValue()",
    playwrightPy: "locator.input_value()",
    cypress: ".invoke('val')",
  },
  {
    action: "Clear field",
    selenium: "element.clear()",
    playwrightJs: 'locator.fill("")',
    playwrightPy: 'locator.fill("")',
    cypress: ".clear()",
  },
  {
    action: "Disabled assert",
    selenium: "!element.isEnabled()",
    playwrightJs: "expect(locator).toBeDisabled()",
    playwrightPy: "expect(locator).to_be_disabled()",
    cypress: ".should('be.disabled')",
  },
  {
    action: "Readonly assert",
    selenium: 'getAttribute("readonly")',
    playwrightJs: "toHaveAttribute('readonly', '')",
    playwrightPy: "to_have_attribute('readonly', '')",
    cypress: ".should('have.attr', 'readonly')",
  },
];

export const inputFieldsFaq: FaqItem[] = [
  {
    question: "Why does Playwright's fill() erase my existing text?",
    answer:
      "fill() is designed to set a field to an exact value, so it clears the input first. To append, click into the field and use keyboard.type() so the current value is preserved.",
    testId: "faq-1",
  },
  {
    question: "How do I read what is currently in an input?",
    answer:
      "Read the value attribute. Use getAttribute('value') in Selenium, inputValue() in Playwright, or .invoke('val') in Cypress — reading textContent will not work for inputs.",
    testId: "faq-2",
  },
  {
    question: "What is the difference between disabled and readonly?",
    answer:
      "A disabled field cannot be focused, typed into, or submitted with the form. A readonly field still shows a value and can be read and submitted, but the user cannot edit it.",
    testId: "faq-3",
  },
];
