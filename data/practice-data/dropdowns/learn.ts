import type {
  FaqItem,
  LearnCodeSnippet,
  MethodRow,
  TocItem,
} from "@/data/practice-data/types";

export const dropdownsTocItems: TocItem[] = [
  { id: "learn-overview", label: "Overview" },
  { id: "learn-visible-text", label: "1. Visible Text" },
  { id: "learn-value", label: "2. Value Attribute" },
  { id: "learn-options", label: "3. Read Options" },
  { id: "learn-multi", label: "4. Multi-Select" },
  { id: "learn-custom", label: "5. Custom Listbox" },
  { id: "learn-searchable", label: "6. Searchable Combobox" },
  { id: "learn-methods", label: "Method Summary", dividerBefore: true },
  { id: "learn-faq", label: "FAQ" },
];

export const dropdownsLearnDesc: Record<string, string> = {
  overview:
    "Dropdown tests start with native HTML select elements, then become more realistic with custom listboxes and searchable comboboxes. Use semantic roles first, then scope with data attributes, text, and XPath relationships when the DOM is repeated or nested.",
  visibleText:
    "Visible-text selection is readable and mirrors how a tester describes the action. It is ideal when option labels are stable.",
  value:
    "Value-based selection is useful when the label may change but the submitted value is stable, such as country codes or business ids.",
  options:
    "Reading options lets you assert the choices loaded correctly before selecting one. This is a common guard for dynamic dropdown data.",
  multi:
    "Native multi-select controls can hold more than one selected option. Assert both the selected values and the checked option count.",
  custom:
    "Custom dropdowns are usually buttons plus listboxes. Automate them by opening the trigger, scoping to the listbox, and choosing an option by role, text, or business attribute.",
  searchable:
    "Searchable comboboxes combine typing and option selection. They are excellent practice for role locators, filtered text, dynamic ids, and XPath sibling traversal.",
};

export const dropdownsLearnCode: Record<string, LearnCodeSnippet> = {
  visibleText: {
    pw: {
      lang: "TypeScript",
      code: `// Playwright
await page.locator('#fruitSelect').selectOption({ label: 'Apple' });
await expect(page.locator('#fruitSelect')).toHaveValue('apple');`,
    },
    sel: {
      lang: "Java",
      code: `// Selenium WebDriver
Select select = new Select(driver.findElement(By.id("fruitSelect")));
select.selectByVisibleText("Apple");
assertEquals("Apple", select.getFirstSelectedOption().getText());`,
    },
    cy: {
      lang: "JavaScript",
      code: `// Cypress
cy.get('#fruitSelect').select('Apple');
cy.get('#fruitSelect').should('have.value', 'apple');`,
    },
  },
  value: {
    pw: {
      lang: "TypeScript",
      code: `// Playwright
await page.locator('#countrySelect').selectOption('india');
await expect(page.locator('#countrySelect')).toHaveValue('india');`,
    },
    sel: {
      lang: "Java",
      code: `// Selenium WebDriver
Select select = new Select(driver.findElement(By.id("countrySelect")));
select.selectByValue("india");`,
    },
    cy: {
      lang: "JavaScript",
      code: `// Cypress
cy.get('#countrySelect').select('india');
cy.get('#countrySelect').should('have.value', 'india');`,
    },
  },
  options: {
    pw: {
      lang: "TypeScript",
      code: `// Playwright
const options = await page.locator('#languageSelect option').allTextContents();
await page.locator('#languageSelect').selectOption({ index: options.length - 1 });`,
    },
    sel: {
      lang: "Java",
      code: `// Selenium WebDriver
Select select = new Select(driver.findElement(By.id("languageSelect")));
List<WebElement> options = select.getOptions();
select.selectByIndex(options.size() - 1);`,
    },
    cy: {
      lang: "JavaScript",
      code: `// Cypress
cy.get('#languageSelect option').then((options) => {
  cy.get('#languageSelect').select(options.last().val() as string);
});`,
    },
  },
  multi: {
    pw: {
      lang: "TypeScript",
      code: `// Playwright
await page.locator('#heroSelect').selectOption(['batman', 'aquaman']);
await expect(page.locator('#heroSelect option:checked')).toHaveCount(2);`,
    },
    sel: {
      lang: "Java",
      code: `// Selenium WebDriver
Select multi = new Select(driver.findElement(By.id("heroSelect")));
multi.selectByVisibleText("Batman");
multi.selectByVisibleText("Aquaman");`,
    },
    cy: {
      lang: "JavaScript",
      code: `// Cypress
cy.get('#heroSelect').select(['batman', 'aquaman']);
cy.get('#heroSelect option:selected').should('have.length', 2);`,
    },
  },
  custom: {
    pw: {
      lang: "TypeScript",
      code: `// Playwright
await page.getByTestId('priority-dropdown-trigger').click();
await page.getByTestId('priority-dropdown-list')
  .getByRole('option', { name: 'High Priority' })
  .click();`,
    },
    sel: {
      lang: "Java",
      code: `// Selenium WebDriver
driver.findElement(By.cssSelector("[data-testid='priority-dropdown-trigger']")).click();
driver.findElement(By.xpath("//*[@role='listbox']//*[@role='option' and normalize-space()='High Priority']")).click();`,
    },
    cy: {
      lang: "JavaScript",
      code: `// Cypress
cy.get('[data-testid="priority-dropdown-trigger"]').click();
cy.get('[data-testid="priority-dropdown-list"]')
  .contains('[role="option"]', 'High Priority')
  .click();`,
    },
  },
  searchable: {
    pw: {
      lang: "TypeScript",
      code: `// Playwright
await page.getByRole('combobox', { name: 'City' }).fill('Pun');
await page.getByRole('option', { name: 'Pune' }).click();`,
    },
    sel: {
      lang: "Java",
      code: `// Selenium WebDriver
WebElement input = driver.findElement(By.xpath("//label[normalize-space()='City']/following-sibling::div//input"));
input.sendKeys("Pun");
driver.findElement(By.cssSelector("[data-city-id='city-pune']")).click();`,
    },
    cy: {
      lang: "JavaScript",
      code: `// Cypress
cy.findByRole('combobox', { name: 'City' }).type('Pun');
cy.findByRole('option', { name: 'Pune' }).click();`,
    },
  },
};

export const dropdownsMethodRows: MethodRow[] = [
  {
    action: "Select by visible text",
    selenium: "selectByVisibleText(text)",
    playwrightJs: "selectOption({ label })",
    playwrightPy: "select_option(label=label)",
    cypress: ".select(label)",
  },
  {
    action: "Select by value",
    selenium: "selectByValue(value)",
    playwrightJs: "selectOption(value)",
    playwrightPy: "select_option(value)",
    cypress: ".select(value)",
  },
  {
    action: "Select by index",
    selenium: "selectByIndex(index)",
    playwrightJs: "selectOption({ index })",
    playwrightPy: "select_option(index=index)",
    cypress: ".find('option').eq(index)",
  },
  {
    action: "Get all options",
    selenium: "getOptions()",
    playwrightJs: "locator('option').allTextContents()",
    playwrightPy: "locator('option').all_text_contents()",
    cypress: ".find('option')",
  },
  {
    action: "Get selected values",
    selenium: "getAllSelectedOptions()",
    playwrightJs: "locator('option:checked')",
    playwrightPy: "locator('option:checked')",
    cypress: "option:selected",
  },
  {
    action: "Custom option",
    selenium: "By.xpath(role/text)",
    playwrightJs: "getByRole('option')",
    playwrightPy: "get_by_role('option')",
    cypress: ".contains('[role=option]')",
  },
];

export const dropdownsFaq: FaqItem[] = [
  {
    question: "Should I use visible text or value for native selects?",
    answer:
      "Use visible text when the label is the behavior you care about. Use value when the submitted value is the stable contract, such as india, US, or a product id.",
    testId: "faq-1",
  },
  {
    question: "Why does the custom dropdown use role=listbox and role=option?",
    answer:
      "Those roles give automation tools and assistive technology a semantic target. They also let Playwright use getByRole instead of brittle CSS-only selectors.",
    testId: "faq-2",
  },
  {
    question: "How do I test a searchable dropdown reliably?",
    answer:
      "Type into the combobox, wait for the expected option to appear, then click by role, visible text, or a stable business attribute like data-city-id.",
    testId: "faq-3",
  },
];
