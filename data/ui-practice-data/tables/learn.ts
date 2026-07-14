import type {
  FaqItem,
  LearnCodeSnippet,
  MethodRow,
  TocItem,
} from "@/data/practice-data/types";

/**
 * Learn content for /ui-practice/tables/learn.
 */
export const tablesTocItems: TocItem[] = [
  { id: "learn-overview", label: "Overview" },
  { id: "learn-static", label: "1 · Static Table" },
  { id: "learn-sortable", label: "2 · Sortable Columns" },
  { id: "learn-search-filter", label: "3 · Search & Filter" },
  { id: "learn-pagination", label: "4 · Pagination" },
  { id: "learn-row-actions", label: "5 · Row Actions" },
  { id: "learn-combined-grid", label: "6 · Combined Data Grid" },
  { id: "learn-methods", label: "Method Summary", dividerBefore: true },
  { id: "learn-faq", label: "FAQ" },
];

export const tablesLearnDesc: Record<string, string> = {
  overview:
    "Tables are one of the densest UI patterns to automate well — rows repeat the same structure, columns are sortable, and content changes with search, filters, and pagination. This page walks through locating rows/cells reliably and asserting behavior across all three frameworks.",
  static:
    "For a fixed table, use role-based locators (table/columnheader/row/cell) plus data-testid when a cell needs to be uniquely identified by row and column.",
  sortable:
    "Sortable headers usually cycle through three states: ascending, descending, and unsorted. Assert the aria-sort attribute rather than relying on visual arrows, and verify actual row order after each click.",
  searchFilter:
    "Search and dropdown filters often combine with AND logic. Test them independently first, then together, and always cover the empty-results state.",
  pagination:
    "Assert the exact row count per page, the disabled state of Prev/Next at the boundaries, and that the info text (e.g. 'Showing 1–5 of 15') updates after navigation.",
  rowActions:
    "Edit/Delete buttons repeat per row, so every locator must be scoped to that row's unique data-testid or id — never rely on a global button selector.",
  combinedGrid:
    "When search, sort, and pagination combine, changing any one of them typically resets the page back to 1. Assert that reset explicitly instead of assuming it.",
};

export const tablesLearnCode: Record<string, LearnCodeSnippet> = {
  static: {
    pw: {
      lang: "TypeScript",
      code: `// Playwright — locate a cell by row and column testid
const table = page.getByTestId('static-table');
await expect(table).toBeVisible();

const cell = page.getByTestId('cell-1-price');
await expect(cell).toHaveText('$1,299');`,
    },
    sel: {
      lang: "Java",
      code: `// Selenium WebDriver
WebElement table = driver.findElement(By.cssSelector("[data-testid='static-table']"));
assertTrue(table.isDisplayed());

WebElement cell = driver.findElement(By.cssSelector("[data-testid='cell-1-price']"));
assertEquals("$1,299", cell.getText());`,
    },
    cy: {
      lang: "JavaScript",
      code: `// Cypress
cy.get('[data-testid="static-table"]').should('be.visible');
cy.get('[data-testid="cell-1-price"]').should('have.text', '$1,299');`,
    },
  },
  sortable: {
    pw: {
      lang: "TypeScript",
      code: `// Playwright — 3-click sort cycle: asc -> desc -> unsorted
const header = page.getByTestId('sort-th-name');

await header.click();
await expect(header).toHaveAttribute('aria-sort', 'ascending');

await header.click();
await expect(header).toHaveAttribute('aria-sort', 'descending');

await header.click();
await expect(header).toHaveAttribute('aria-sort', 'none');`,
    },
    sel: {
      lang: "Java",
      code: `// Selenium WebDriver
WebElement header = driver.findElement(By.cssSelector("[data-testid='sort-th-name']"));

header.click();
assertEquals("ascending", header.getAttribute("aria-sort"));

header.click();
assertEquals("descending", header.getAttribute("aria-sort"));

header.click();
assertEquals("none", header.getAttribute("aria-sort"));`,
    },
    cy: {
      lang: "JavaScript",
      code: `// Cypress
cy.get('[data-testid="sort-th-name"]').click()
  .should('have.attr', 'aria-sort', 'ascending');

cy.get('[data-testid="sort-th-name"]').click()
  .should('have.attr', 'aria-sort', 'descending');

cy.get('[data-testid="sort-th-name"]').click()
  .should('have.attr', 'aria-sort', 'none');`,
    },
  },
  searchFilter: {
    pw: {
      lang: "TypeScript",
      code: `// Playwright — search + department filter (AND logic)
await page.getByTestId('search-input').fill('Priya');
await page.getByTestId('dept-filter').selectOption('Engineering');

await expect(page.getByTestId('search-result-count')).toContainText('Showing');`,
    },
    sel: {
      lang: "Java",
      code: `// Selenium WebDriver
driver.findElement(By.cssSelector("[data-testid='search-input']")).sendKeys("Priya");

new Select(driver.findElement(By.cssSelector("[data-testid='dept-filter']")))
  .selectByVisibleText("Engineering");

String count = driver.findElement(
  By.cssSelector("[data-testid='search-result-count']")
).getText();
assertTrue(count.contains("Showing"));`,
    },
    cy: {
      lang: "JavaScript",
      code: `// Cypress
cy.get('[data-testid="search-input"]').type('Priya');
cy.get('[data-testid="dept-filter"]').select('Engineering');
cy.get('[data-testid="search-result-count"]').should('contain.text', 'Showing');`,
    },
  },
  pagination: {
    pw: {
      lang: "TypeScript",
      code: `// Playwright — pagination boundaries
await expect(page.getByTestId('pag-info')).toHaveText('Showing 1–5 of 15');
await expect(page.getByTestId('pag-prev')).toBeDisabled();

await page.getByTestId('pag-btn-3').click();
await expect(page.getByTestId('pag-next')).toBeDisabled();`,
    },
    sel: {
      lang: "Java",
      code: `// Selenium WebDriver
assertEquals("Showing 1–5 of 15",
  driver.findElement(By.cssSelector("[data-testid='pag-info']")).getText());
assertFalse(driver.findElement(By.cssSelector("[data-testid='pag-prev']")).isEnabled());

driver.findElement(By.cssSelector("[data-testid='pag-btn-3']")).click();
assertFalse(driver.findElement(By.cssSelector("[data-testid='pag-next']")).isEnabled());`,
    },
    cy: {
      lang: "JavaScript",
      code: `// Cypress
cy.get('[data-testid="pag-info"]').should('have.text', 'Showing 1–5 of 15');
cy.get('[data-testid="pag-prev"]').should('be.disabled');

cy.get('[data-testid="pag-btn-3"]').click();
cy.get('[data-testid="pag-next"]').should('be.disabled');`,
    },
  },
  rowActions: {
    pw: {
      lang: "TypeScript",
      code: `// Playwright — scoped edit / save
await page.getByTestId('edit-btn-1').click();
await page.getByTestId('edit-name-1').fill('New Name');
await page.getByTestId('save-btn-1').click();

await expect(page.getByTestId('actions-name-1')).toHaveText('New Name');`,
    },
    sel: {
      lang: "Java",
      code: `// Selenium WebDriver
driver.findElement(By.cssSelector("[data-testid='edit-btn-1']")).click();

WebElement nameInput = driver.findElement(By.cssSelector("[data-testid='edit-name-1']"));
nameInput.clear();
nameInput.sendKeys("New Name");

driver.findElement(By.cssSelector("[data-testid='save-btn-1']")).click();

assertEquals("New Name",
  driver.findElement(By.cssSelector("[data-testid='actions-name-1']")).getText());`,
    },
    cy: {
      lang: "JavaScript",
      code: `// Cypress
cy.get('[data-testid="edit-btn-1"]').click();
cy.get('[data-testid="edit-name-1"]').clear().type('New Name');
cy.get('[data-testid="save-btn-1"]').click();
cy.get('[data-testid="actions-name-1"]').should('have.text', 'New Name');`,
    },
  },
  combinedGrid: {
    pw: {
      lang: "TypeScript",
      code: `// Playwright — sort resets the combined grid to page 1
await page.getByTestId('grid-search').fill('a');
await page.getByTestId('grid-btn-2').click(); // go to page 2

await page.getByTestId('grid-th-name').click(); // sort
await expect(page.getByTestId('grid-btn-1')).toHaveAttribute('aria-current', 'page');`,
    },
    sel: {
      lang: "Java",
      code: `// Selenium WebDriver
driver.findElement(By.cssSelector("[data-testid='grid-search']")).sendKeys("a");
driver.findElement(By.cssSelector("[data-testid='grid-btn-2']")).click();

driver.findElement(By.cssSelector("[data-testid='grid-th-name']")).click();

assertEquals("page",
  driver.findElement(By.cssSelector("[data-testid='grid-btn-1']")).getAttribute("aria-current"));`,
    },
    cy: {
      lang: "JavaScript",
      code: `// Cypress
cy.get('[data-testid="grid-search"]').type('a');
cy.get('[data-testid="grid-btn-2"]').click();

cy.get('[data-testid="grid-th-name"]').click();
cy.get('[data-testid="grid-btn-1"]').should('have.attr', 'aria-current', 'page');`,
    },
  },
};

export const tablesMethodRows: MethodRow[] = [
  {
    action: "Locate a cell by row + column",
    selenium: "findElement(By.css(\"[data-testid='cell-1-price']\"))",
    playwrightJs: "getByTestId('cell-1-price')",
    playwrightPy: "get_by_test_id('cell-1-price')",
    cypress: "get('[data-testid=\"cell-1-price\"]')",
  },
  {
    action: "Assert sort state",
    selenium: 'getAttribute("aria-sort")',
    playwrightJs: "toHaveAttribute('aria-sort', 'ascending')",
    playwrightPy: "to_have_attribute('aria-sort', 'ascending')",
    cypress: "should('have.attr', 'aria-sort', 'ascending')",
  },
  {
    action: "Select a dropdown filter",
    selenium: "new Select(el).selectByVisibleText(...)",
    playwrightJs: "selectOption('Engineering')",
    playwrightPy: "select_option('Engineering')",
    cypress: ".select('Engineering')",
  },
  {
    action: "Assert disabled pagination button",
    selenium: "!element.isEnabled()",
    playwrightJs: "expect(locator).toBeDisabled()",
    playwrightPy: "expect(locator).to_be_disabled()",
    cypress: ".should('be.disabled')",
  },
  {
    action: "Scope a row action button",
    selenium: "findElement(By.css(\"[data-testid='edit-btn-1']\"))",
    playwrightJs: "getByTestId('edit-btn-1')",
    playwrightPy: "get_by_test_id('edit-btn-1')",
    cypress: "get('[data-testid=\"edit-btn-1\"]')",
  },
];

export const tablesFaq: FaqItem[] = [
  {
    question: "How do I assert sort order without depending on visual arrows?",
    answer:
      "Read the aria-sort attribute on the header (ascending/descending/none) and independently read the rendered row values to confirm the actual order — don't rely on CSS classes or icon visibility.",
    testId: "faq-1",
  },
  {
    question:
      "What is the safest way to target a button that repeats on every row?",
    answer:
      "Scope by the row's unique identifier — a data-testid suffixed with the row id (e.g. edit-btn-1) or a parent row locator combined with getByRole('button', { name }) inside that scope. Never use a bare, unscoped selector for a repeated element.",
    testId: "faq-2",
  },
  {
    question:
      "Why does changing a filter or sort reset pagination back to page 1?",
    answer:
      "Because the underlying row set changes size — page 2 of a 15-row set may not exist after filtering down to 3 rows. Well-built grids reset to page 1 automatically; your test should assert that behavior explicitly rather than assuming the page number stays put.",
    testId: "faq-3",
  },
  {
    question: "How do I test the empty state for search or filters?",
    answer:
      "Search for a value with zero real matches and assert the empty-state row/message renders, plus that the result-count text reflects zero results. This is an easy case to forget but a common real-world bug.",
    testId: "faq-4",
  },
];
