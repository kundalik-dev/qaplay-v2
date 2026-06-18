import type {
  FaqItem,
  LearnCodeSnippet,
  MethodRow,
  TocItem,
} from "@/data/practice-data/types";

export const dataTableTocItems: TocItem[] = [
  { id: "learn-overview", label: "Overview" },
  { id: "learn-count-rows", label: "1 · Count Rows & Columns" },
  { id: "learn-read-cell", label: "2 · Read a Specific Cell" },
  { id: "learn-read-headers", label: "3 · Read All Headers" },
  { id: "learn-find-row", label: "4 · Find Row by Content" },
  { id: "learn-all-rows", label: "5 · Iterate All Rows" },
  { id: "learn-verify-empty", label: "6 · Verify Empty State" },
  { id: "learn-methods", label: "Method Summary", dividerBefore: true },
  { id: "learn-faq", label: "FAQ" },
];

export const dataTableLearnDesc: Record<string, string> = {
  overview:
    "HTML tables are everywhere in dashboards, reports, and data-driven UIs. Automating them requires counting rows, reading specific cells, finding rows by content, and verifying headers — all of which have slightly different approaches across frameworks.",
  countRows:
    "Row and column counts are the first assertion you'll make on any table. Use CSS selectors targeting tbody tr for rows and thead th for columns.",
  readCell:
    "Reading a specific cell means combining a row selector (nth-child) with a column selector. The same pattern works for reading any cell at a known position.",
  readHeaders:
    "Headers are th elements inside thead. allTextContents() in Playwright and findElements by tagName in Selenium both return them as a list you can assert against.",
  findRow:
    "Finding a row by content is a pattern you'll use constantly — filter rows until you find one containing the target text, then scope your next action inside that row.",
  allRows:
    "Iterating all rows is useful for building lists, validating column-wide constraints, or checking every row satisfies a condition. Loop with nth() in Playwright or a for-loop in Selenium.",
  verifyEmpty:
    "Empty-state assertions prevent false positives when a table hasn't loaded yet. Assert row count is zero, or assert the empty-state message is visible.",
};

export const dataTableLearnCode: Record<string, LearnCodeSnippet> = {
  countRows: {
    pw: {
      lang: "TypeScript",
      code: `// Playwright — count rows and columns
const rowCount = await page.locator("#dataTable tbody tr").count();
const colCount = await page.locator("#dataTable thead th").count();
console.log("Rows:", rowCount, "Cols:", colCount);`,
    },
    sel: {
      lang: "Java",
      code: `// Selenium WebDriver
List<WebElement> rows = driver.findElements(
  By.cssSelector("#dataTable tbody tr")
);
List<WebElement> cols = driver.findElements(
  By.cssSelector("#dataTable thead th")
);
System.out.println("Rows: " + rows.size() + " Cols: " + cols.size());`,
    },
    cy: {
      lang: "JavaScript",
      code: `// Cypress
cy.get("#dataTable tbody tr").its("length").then((count) => {
  cy.log("Row count:", count);
});
cy.get("#dataTable thead th").its("length").should("eq", 7);`,
    },
  },
  readCell: {
    pw: {
      lang: "TypeScript",
      code: `// Playwright — row 2, column 2 (1-based CSS)
const cellText = await page
  .locator("#dataTable tbody tr:nth-child(2) td:nth-child(2)")
  .textContent();
console.log("Cell:", cellText?.trim()); // "Clean Code"`,
    },
    sel: {
      lang: "Java",
      code: `// Selenium WebDriver — row 2, column 2
String cellText = driver.findElement(
  By.cssSelector("#dataTable tbody tr:nth-child(2) td:nth-child(2)")
).getText();
System.out.println("Cell: " + cellText); // "Clean Code"`,
    },
    cy: {
      lang: "JavaScript",
      code: `// Cypress — row 2, column 2
cy.get("#dataTable tbody tr:nth-child(2) td:nth-child(2)")
  .invoke("text")
  .should("eq", "Clean Code");`,
    },
  },
  readHeaders: {
    pw: {
      lang: "TypeScript",
      code: `// Playwright — read all header names
const headers = await page
  .locator("#dataTable thead th")
  .allTextContents();
console.log(headers);
// ["Sr No.", "Book Name", "Book Genre", "Book Author", "Book ISBN", "Book Published", "Actions"]`,
    },
    sel: {
      lang: "Java",
      code: `// Selenium WebDriver — read all headers
List<WebElement> headers = driver.findElements(
  By.cssSelector("#dataTable thead th")
);
for (WebElement h : headers) {
  System.out.println(h.getText());
}`,
    },
    cy: {
      lang: "JavaScript",
      code: `// Cypress — assert specific header exists
cy.get("#dataTable thead th")
  .contains("Book Author")
  .should("be.visible");`,
    },
  },
  findRow: {
    pw: {
      lang: "TypeScript",
      code: `// Playwright — find row by author, click Edit
const row = page
  .locator("[data-testid='book-row']")
  .filter({ hasText: "George Orwell" });

await expect(row).toBeVisible();
await row.locator("[data-testid='btn-edit-book']").click();`,
    },
    sel: {
      lang: "Java",
      code: `// Selenium WebDriver — find row by author text
List<WebElement> rows = driver.findElements(
  By.cssSelector("#dataTable tbody tr")
);
for (WebElement row : rows) {
  if (row.getText().contains("George Orwell")) {
    row.findElement(
      By.cssSelector("[data-testid='btn-edit-book']")
    ).click();
    break;
  }
}`,
    },
    cy: {
      lang: "JavaScript",
      code: `// Cypress — find row by text
cy.get("[data-testid='book-row']")
  .contains("George Orwell")
  .closest("tr")
  .find("[data-testid='btn-edit-book']")
  .click();`,
    },
  },
  allRows: {
    pw: {
      lang: "TypeScript",
      code: `// Playwright — collect all book names from column 2
const rows = page.locator("#dataTable tbody tr");
const count = await rows.count();
const names: string[] = [];

for (let i = 0; i < count; i++) {
  const name = await rows
    .nth(i)
    .locator("td:nth-child(2)")
    .textContent();
  names.push(name?.trim() ?? "");
}
console.log(names);`,
    },
    sel: {
      lang: "Java",
      code: `// Selenium WebDriver — collect all ISBNs
List<WebElement> rows = driver.findElements(
  By.cssSelector("#dataTable tbody tr")
);
List<String> isbns = new ArrayList<>();
for (WebElement row : rows) {
  String isbn = row.findElement(
    By.cssSelector("td[data-col='book-isbn']")
  ).getText();
  isbns.add(isbn);
}
System.out.println(isbns);`,
    },
    cy: {
      lang: "JavaScript",
      code: `// Cypress — assert all ISBNs start with "ISBN-"
cy.get("td[data-col='book-isbn']").each(($cell) => {
  expect($cell.text().trim()).to.match(/^ISBN-/);
});`,
    },
  },
  verifyEmpty: {
    pw: {
      lang: "TypeScript",
      code: `// Playwright — assert table is not empty
const rowCount = await page
  .locator("#dataTable tbody tr")
  .count();
expect(rowCount).toBeGreaterThan(0);

// Assert empty-state message is hidden
await expect(
  page.locator("[data-testid='empty-table-msg']")
).toBeHidden();`,
    },
    sel: {
      lang: "Java",
      code: `// Selenium WebDriver — assert table has rows
List<WebElement> rows = driver.findElements(
  By.cssSelector("#dataTable tbody tr")
);
assertFalse(rows.isEmpty());`,
    },
    cy: {
      lang: "JavaScript",
      code: `// Cypress — assert row count > 0
cy.get("#dataTable tbody tr")
  .its("length")
  .should("be.gt", 0);`,
    },
  },
};

export const dataTableMethodRows: MethodRow[] = [
  {
    action: "Count rows",
    selenium: "findElements(cssSelector(\"tbody tr\")).size()",
    playwrightJs: "locator(\"tbody tr\").count()",
    playwrightPy: "locator(\"tbody tr\").count()",
    cypress: ".get(\"tbody tr\").its(\"length\")",
  },
  {
    action: "Count columns",
    selenium: "findElements(cssSelector(\"thead th\")).size()",
    playwrightJs: "locator(\"thead th\").count()",
    playwrightPy: "locator(\"thead th\").count()",
    cypress: ".get(\"thead th\").its(\"length\")",
  },
  {
    action: "Get cell text",
    selenium: "findElement(cssSelector(\"tr:nth-child(2) td:nth-child(2)\"))",
    playwrightJs: "locator(\"tr:nth-child(2) td:nth-child(2)\").textContent()",
    playwrightPy: "text_content()",
    cypress: ".get(\"tr:nth-child(2) td:nth-child(2)\").invoke(\"text\")",
  },
  {
    action: "Get all headers",
    selenium: "findElements(By.tagName(\"th\"))",
    playwrightJs: "locator(\"th\").allTextContents()",
    playwrightPy: "all_text_contents()",
    cypress: ".get(\"th\").invoke(\"text\")",
  },
  {
    action: "Find row by text",
    selenium: "row.getText().contains(\"text\")",
    playwrightJs: ".filter({ hasText: \"text\" })",
    playwrightPy: ".filter(has_text=\"text\")",
    cypress: ".contains(\"text\").closest(\"tr\")",
  },
];

export const dataTableFaq: FaqItem[] = [
  {
    question: "How do I locate a specific cell using XPath in Selenium?",
    answer:
      "Use XPath axes: //tr[td[normalize-space()='George Orwell']]//td[4] finds the 4th cell in the row that contains 'George Orwell'.",
    testId: "faq-dt-1",
  },
  {
    question: "Why use data-book-id when I can filter by text?",
    answer:
      "Text-based filtering is fragile if the same text appears in multiple rows. A stable id attribute like data-book-id='book-004' gives you an unambiguous selector.",
    testId: "faq-dt-2",
  },
  {
    question: "How do I wait for a dynamically loaded table in Playwright?",
    answer:
      "Use await expect(page.locator('#dataTable tbody tr')).toHaveCount(10) — Playwright will wait until the assertion passes or the timeout fires.",
    testId: "faq-dt-3",
  },
  {
    question: "How do I iterate all rows and check each value?",
    answer:
      "In Playwright use a for-loop with rows.nth(i). In Selenium use findElements to get a List<WebElement> and iterate with a for-each.",
    testId: "faq-dt-4",
  },
];
