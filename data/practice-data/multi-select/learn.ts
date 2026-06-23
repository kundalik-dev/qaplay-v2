import type { FaqItem, LearnCodeSnippet, MethodRow, TocItem } from "@/data/practice-data/types";

export const multiSelectTocItems: TocItem[] = [
  { id: "learn-overview",   label: "Overview" },
  { id: "learn-native",     label: "1 · Native selectOption" },
  { id: "learn-custom",     label: "2 · Custom Checkbox Dropdown" },
  { id: "learn-tags",       label: "3 · Tag / Pill Removal" },
  { id: "learn-searchable", label: "4 · Searchable Multi-Select" },
  { id: "learn-methods",    label: "Method Summary", dividerBefore: true },
  { id: "learn-faq",        label: "FAQ" },
];

export const multiSelectLearnDesc: Record<string, string> = {
  overview:
    "Multi-select controls come in two flavours: native HTML <select multiple> and custom JavaScript widgets built from divs, checkboxes, or comboboxes. Each requires a different automation approach. Playwright's selectOption handles native selects natively; custom widgets need role-based or attribute-based locators.",
  native:
    "Playwright's selectOption accepts a single value, an array of values, or option labels. Selenium uses the Select helper class which wraps the <select> element and exposes selectByValue, selectByVisibleText, and deselectByValue. Cypress uses .select() which also accepts arrays.",
  custom:
    "Custom dropdowns built from divs or checkboxes have no native selectOption support. You must click the trigger to open the panel, then click each option individually. Scope your locator to the panel's data-testid or role before clicking options to avoid targeting hidden duplicates.",
  tags:
    "Tag/pill interfaces show selected items as removable chips. The remove button often has no data-testid — locate it via the parent tag element's unique attribute (e.g. data-tag-value) and then target the child button by role or XPath.",
  searchable:
    "Searchable multi-selects expose a combobox input that filters a listbox. Fill the input to filter, then click the matching option. Use role='combobox' and role='option' for locating. When options have a stable data attribute (e.g. data-option-id), prefer that for robustness.",
};

export const multiSelectLearnCode: Record<string, LearnCodeSnippet> = {
  native: {
    pw: {
      lang: "TypeScript",
      code: `// Select a single option by value
await page.getByTestId('ms-native-select').selectOption('playwright');

// Select multiple options by value array
await page.getByTestId('ms-native-select').selectOption(['playwright', 'cypress']);

// Select by visible label
await page.getByTestId('ms-native-select').selectOption({ label: 'Playwright' });

// Assert selected values
const selected = await page.getByTestId('ms-native-select').inputValue();
// For multi-select use evaluate:
const values = await page.getByTestId('ms-native-select').evaluate(
  (el: HTMLSelectElement) => [...el.selectedOptions].map(o => o.value)
);
expect(values).toEqual(['playwright', 'cypress']);`,
    },
    sel: {
      lang: "Java",
      code: `import org.openqa.selenium.support.ui.Select;

WebElement el = driver.findElement(By.cssSelector("[data-testid='ms-native-select']"));
Select select = new Select(el);

// Single select
select.selectByValue("playwright");

// Multiple options (hold Ctrl via Actions for UI; or call selectByValue multiple times with Select class)
select.selectByValue("playwright");
select.selectByValue("cypress");

// Deselect one
select.deselectByValue("selenium");

// Assert
List<WebElement> chosen = select.getAllSelectedOptions();
assertEquals(2, chosen.size());`,
    },
    cy: {
      lang: "JavaScript",
      code: `// Select single option
cy.get('[data-testid="ms-native-select"]').select('playwright');

// Select multiple options
cy.get('[data-testid="ms-native-select"]').select(['playwright', 'cypress']);

// Assert selected values
cy.get('[data-testid="ms-native-select"]')
  .invoke('val')
  .should('deep.equal', ['playwright', 'cypress']);`,
    },
  },
  custom: {
    pw: {
      lang: "TypeScript",
      code: `// Open the custom dropdown
await page.getByTestId('ms-custom-trigger').click();

// Assert panel is visible
const panel = page.getByTestId('ms-custom-panel');
await expect(panel).toBeVisible();

// Click an option by its data-value attribute
await page.locator('[data-testid="ms-custom-option"][data-value="react"]').click();

// Scoped locator with filter (medium difficulty)
await panel.getByRole('option', { name: 'Vue.js' }).click();

// XPath: ancestor-scoped option click
// //div[@data-testid="ms-custom-panel"]//*[@role="option" and @data-value="angular"]

// Select All
await page.getByTestId('ms-select-all-btn').click();`,
    },
    sel: {
      lang: "Java",
      code: `// Open the trigger
driver.findElement(By.cssSelector("[data-testid='ms-custom-trigger']")).click();

// Wait for panel
WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(3));
WebElement panel = wait.until(ExpectedConditions.visibilityOfElementLocated(
    By.cssSelector("[data-testid='ms-custom-panel']")
));

// Click option by data-value
panel.findElement(By.cssSelector("[data-value='react']")).click();

// XPath inside panel
driver.findElement(By.xpath(
    "//*[@data-testid='ms-custom-panel']//*[@role='option' and @data-value='angular']"
)).click();

// Select All button
driver.findElement(By.cssSelector("[data-testid='ms-select-all-btn']")).click();`,
    },
    cy: {
      lang: "JavaScript",
      code: `// Open dropdown
cy.get('[data-testid="ms-custom-trigger"]').click();

// Assert panel visible
cy.get('[data-testid="ms-custom-panel"]').should('be.visible');

// Click option by attribute
cy.get('[data-testid="ms-custom-option"][data-value="react"]').click();

// Select All
cy.get('[data-testid="ms-select-all-btn"]').click();

// Clear All
cy.get('[data-testid="ms-clear-all-btn"]').click();`,
    },
  },
  tags: {
    pw: {
      lang: "TypeScript",
      code: `// Tags have data-testid="ms-tag" and data-tag-value attribute
// The remove button has NO data-testid — practice locating via parent

// Approach 1: parent → child role
await page.locator('[data-tag-value="javascript"]').getByRole('button').click();

// Approach 2: XPath following-sibling or descendant
// //li[@data-testid="ms-tag" and @data-tag-value="javascript"]//button

// Approach 3: aria-label (if present on button)
await page.getByRole('button', { name: 'Remove JavaScript' }).click();

// Assert tag is removed
await expect(page.locator('[data-tag-value="javascript"]')).not.toBeVisible();`,
    },
    sel: {
      lang: "Java",
      code: `// Locate tag by data-tag-value attribute
WebElement tag = driver.findElement(
    By.cssSelector("[data-testid='ms-tag'][data-tag-value='javascript']")
);

// Find remove button inside (no data-testid)
WebElement removeBtn = tag.findElement(By.tagName("button"));
removeBtn.click();

// XPath alternative
driver.findElement(By.xpath(
    "//li[@data-tag-value='javascript']//button"
)).click();

// Assert tag is gone
assertTrue(driver.findElements(
    By.cssSelector("[data-tag-value='javascript']")
).isEmpty());`,
    },
    cy: {
      lang: "JavaScript",
      code: `// Locate tag and its remove button
cy.get('[data-tag-value="javascript"]')
  .find('button')
  .click();

// Assert tag is removed from the list
cy.get('[data-tag-value="javascript"]').should('not.exist');

// Alternatively via aria-label if present
cy.get('[aria-label="Remove JavaScript"]').click();`,
    },
  },
  searchable: {
    pw: {
      lang: "TypeScript",
      code: `// Fill the combobox to filter options
await page.getByTestId('ms-search-input').fill('vue');

// Assert filtered results
const results = page.getByTestId('ms-search-results');
await expect(results).toBeVisible();
await expect(results.getByRole('option')).toHaveCount(1);

// Click matching option by data-option-id (stable attribute)
await page.locator('[role="option"][data-option-id="opt-vue"]').click();

// XPath: inside listbox by option id
// //*[@data-testid="ms-search-results"]//*[@role="option" and @data-option-id="opt-vue"]

// Assert chosen
await expect(page.getByTestId('ms-search-chosen')).toContainText('Vue.js');`,
    },
    sel: {
      lang: "Java",
      code: `// Fill the combobox
driver.findElement(By.cssSelector("[data-testid='ms-search-input']")).sendKeys("vue");

// Wait for results
WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(2));
wait.until(ExpectedConditions.visibilityOfElementLocated(
    By.cssSelector("[data-testid='ms-search-results']")
));

// Click by data-option-id
driver.findElement(By.cssSelector("[role='option'][data-option-id='opt-vue']")).click();

// XPath with listbox scope
driver.findElement(By.xpath(
    "//*[@data-testid='ms-search-results']//*[@role='option' and @data-option-id='opt-vue']"
)).click();`,
    },
    cy: {
      lang: "JavaScript",
      code: `// Type in the combobox
cy.get('[data-testid="ms-search-input"]').type('vue');

// Assert results appear
cy.get('[data-testid="ms-search-results"]').should('be.visible');

// Click the option
cy.get('[role="option"][data-option-id="opt-vue"]').click();

// Assert it's been added to chosen list
cy.get('[data-testid="ms-search-chosen"]').should('contain.text', 'Vue.js');`,
    },
  },
};

export const multiSelectMethodRows: MethodRow[] = [
  {
    action:       "Select by value",
    selenium:     "Select.selectByValue('v')",
    playwrightJs: "selectOption('v')",
    playwrightPy: "select_option('v')",
    cypress:      ".select('v')",
  },
  {
    action:       "Select multiple",
    selenium:     "selectByValue() × N (Select class)",
    playwrightJs: "selectOption(['v1','v2'])",
    playwrightPy: "select_option(['v1','v2'])",
    cypress:      ".select(['v1','v2'])",
  },
  {
    action:       "Deselect by value",
    selenium:     "Select.deselectByValue('v')",
    playwrightJs: "selectOption(remaining[])",
    playwrightPy: "select_option(remaining[])",
    cypress:      ".select(remaining[])",
  },
  {
    action:       "Custom option click",
    selenium:     "panel.findElement(By.css('[data-value]')).click()",
    playwrightJs: "locator('[data-value=\\'v\\']').click()",
    playwrightPy: "locator('[data-value=\"v\"]').click()",
    cypress:      ".get('[data-value=\"v\"]').click()",
  },
  {
    action:       "Child button (no testid)",
    selenium:     "tag.findElement(By.tagName('button'))",
    playwrightJs: "locator('[data-tag-value]').getByRole('button')",
    playwrightPy: "locator('[data-tag-value]').get_by_role('button')",
    cypress:      ".find('button').click()",
  },
];

export const multiSelectFaq: FaqItem[] = [
  {
    question: "Why doesn't selectOption work on a custom multi-select dropdown?",
    answer:
      "selectOption and the Selenium Select helper only work on native HTML <select> elements. Custom dropdowns built from divs or ul/li elements need to be interacted with by clicking the trigger to open, then clicking each option individually using role, text, or attribute locators.",
    testId: "faq-1",
  },
  {
    question: "How do I select multiple options in a native <select multiple> with Playwright?",
    answer:
      "Pass an array to selectOption: await locator.selectOption(['value1', 'value2']). Playwright handles the multi-selection internally without needing Ctrl key simulation. To deselect specific items, call selectOption with only the values you want to keep selected.",
    testId: "faq-2",
  },
  {
    question: "How do I locate a remove button inside a tag/pill when it has no data-testid?",
    answer:
      "Scope from the parent tag element using its stable attribute (data-tag-value), then navigate to the child button: page.locator('[data-tag-value=\"react\"]').getByRole('button'). In XPath use: //li[@data-tag-value=\"react\"]//button. Always prefer the parent's stable attribute over a positional nth() selector.",
    testId: "faq-3",
  },
  {
    question: "How do I select an option inside a specific optgroup?",
    answer:
      "In Playwright, selectOption by value works regardless of group: selectOption('node'). For XPath that enforces group membership use: //select[@data-testid=\"ms-grouped-select\"]//optgroup[@label=\"Backend\"]//option[@value=\"node\"]. In Selenium, Select.selectByValue('node') works too, but to assert the group you need to walk the DOM.",
    testId: "faq-4",
  },
];
