import type { TestCase } from "@/data/practice-data/types";

/**
 * Test Cases for /ui-practice/tables/test-cases. Scenarios and steps
 * reference the real data-testids from
 * app/(demo)/ui-practice/tables/_components/*.
 */
export const tablesTestCases: TestCase[] = [
  {
    id: "TBL_001",
    scenario: "Static table renders every row and column",
    expected: "All 5 columns and every product row are present in the DOM",
    type: "positive",
    priority: "high",
    steps: [
      "Navigate to <code>/ui-practice/tables</code>",
      'Assert <code>[data-testid="static-table"]</code> is visible',
      'Count rows inside <code>[data-testid="static-tbody"]</code>',
      "Assert the row count matches the product data length",
    ],
  },
  {
    id: "TBL_002",
    scenario: "Clicking a sortable header once sorts ascending",
    expected: 'Column header gets aria-sort="ascending" and rows reorder',
    type: "positive",
    priority: "high",
    steps: [
      'Click <code>[data-testid="sort-th-name"]</code>',
      'Assert the header has <code>aria-sort="ascending"</code>',
      'Read the first row of <code>[data-testid="sort-tbody"]</code> and assert it is alphabetically first',
    ],
  },
  {
    id: "TBL_003",
    scenario: "Salary column sorts numerically, not lexically",
    expected: "Ascending sort orders salaries from lowest to highest number",
    type: "positive",
    priority: "medium",
    note: "A naive string sort would put 90000 before 8500 — assert true numeric order.",
    steps: [
      'Click <code>[data-testid="sort-th-salary"]</code>',
      'Read all <code>[data-testid^="sort-salary-"]</code> values',
      "Assert the parsed numeric values are in ascending order",
    ],
  },
  {
    id: "TBL_004",
    scenario: "Search input filters rows by employee name",
    expected: "Only rows whose name contains the query text remain visible",
    type: "positive",
    priority: "high",
    steps: [
      'Type a partial name into <code>[data-testid="search-input"]</code>',
      'Assert <code>[data-testid="search-result-count"]</code> updates its count',
      'Assert every remaining row in <code>[data-testid="search-tbody"]</code> contains the query text',
    ],
  },
  {
    id: "TBL_005",
    scenario: "Department dropdown filters rows by department",
    expected: "Only rows matching the selected department remain visible",
    type: "positive",
    priority: "medium",
    steps: [
      'Select a department in <code>[data-testid="dept-filter"]</code>',
      'Assert every visible row belongs to that department',
      'Assert <code>[data-testid="search-result-count"]</code> reflects the filtered count',
    ],
  },
  {
    id: "TBL_006",
    scenario: "Searching for a non-existent name shows the empty state",
    expected: '"No employees match your filters." message is shown',
    type: "negative",
    priority: "medium",
    steps: [
      'Type a name that matches no employee into <code>[data-testid="search-input"]</code>',
      'Assert <code>[data-testid="search-tbody"]</code> shows the empty-state row',
      'Assert <code>[data-testid="search-result-count"]</code> reads "Showing 0 of …"',
    ],
  },
  {
    id: "TBL_007",
    scenario: "Paginated table shows the correct rows and info text per page",
    expected: '"Showing 1–5 of 15" on page 1, with exactly 5 rows rendered',
    type: "positive",
    priority: "high",
    steps: [
      'Assert <code>[data-testid="pag-info"]</code> reads "Showing 1–5 of 15"',
      'Count rows inside <code>[data-testid="pag-tbody"]</code>',
      "Assert exactly 5 rows are rendered",
    ],
  },
  {
    id: "TBL_008",
    scenario: "Next button is disabled on the last page",
    expected: "The Next control cannot be activated on the final page",
    type: "negative",
    priority: "medium",
    steps: [
      'Navigate to the last page via <code>[data-testid="pag-btn-3"]</code>',
      'Assert <code>[data-testid="pag-next"]</code> is disabled',
    ],
  },
  {
    id: "TBL_009",
    scenario: "Edit → Save updates a row's values inline",
    expected: "Row exits edit mode and displays the newly saved values",
    type: "positive",
    priority: "high",
    steps: [
      'Click <code>[data-testid="edit-btn-1"]</code>',
      'Update <code>[data-testid="edit-name-1"]</code> to a new value',
      'Click <code>[data-testid="save-btn-1"]</code>',
      'Assert <code>[data-testid="actions-name-1"]</code> reflects the new value',
    ],
  },
  {
    id: "TBL_010",
    scenario: "Delete button removes the row from the DOM",
    expected: "The row no longer exists and the remaining row count decreases",
    type: "positive",
    priority: "high",
    steps: [
      'Read <code>[data-testid="actions-row-count"]</code> before deleting',
      'Click <code>[data-testid="delete-btn-1"]</code>',
      'Assert <code>[data-testid="actions-row-1"]</code> no longer exists',
      "Assert the row count text decreased by exactly one",
    ],
  },
];
