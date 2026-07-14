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
    scenario: "A specific cell can be located by row index and column",
    expected: "The targeted cell resolves to the expected product's price",
    type: "positive",
    priority: "medium",
    steps: [
      'Locate <code>[data-testid="static-row-1"]</code>',
      'Within it, locate <code>[data-testid="cell-1-price"]</code>',
      "Assert its text matches the first product's price",
    ],
  },
  {
    id: "TBL_003",
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
    id: "TBL_004",
    scenario: "Clicking the same sortable header twice sorts descending",
    expected: 'Column header gets aria-sort="descending" on the second click',
    type: "positive",
    priority: "high",
    steps: [
      'Click <code>[data-testid="sort-th-name"]</code> twice',
      'Assert <code>aria-sort="descending"</code>',
      "Assert the first row is now alphabetically last",
    ],
  },
  {
    id: "TBL_005",
    scenario: "A third click on the same header clears the sort",
    expected:
      'Column returns to aria-sort="none" and rows return to original order',
    type: "edge",
    priority: "medium",
    note: "Mirrors the 3-click cycle: unsorted → asc → desc → unsorted.",
    steps: [
      'Click <code>[data-testid="sort-th-name"]</code> three times',
      'Assert <code>aria-sort="none"</code> (or attribute absent)',
      "Assert row order matches the original unsorted data",
    ],
  },
  {
    id: "TBL_006",
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
    id: "TBL_007",
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
    id: "TBL_008",
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
    id: "TBL_009",
    scenario: "Search text and department filter combine with AND logic",
    expected: "Only rows matching both the query and the department remain",
    type: "positive",
    priority: "medium",
    steps: [
      'Type a name fragment into <code>[data-testid="search-input"]</code>',
      'Select a department in <code>[data-testid="dept-filter"]</code>',
      "Assert the visible rows satisfy both conditions simultaneously",
    ],
  },
  {
    id: "TBL_010",
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
    id: "TBL_011",
    scenario: "Clear button resets the search input and department filter",
    expected: "Both fields return to empty and the full row set reappears",
    type: "positive",
    priority: "low",
    steps: [
      "Apply a search query and a department filter",
      'Click <code>[data-testid="search-clear-btn"]</code>',
      'Assert <code>[data-testid="search-input"]</code> and <code>[data-testid="dept-filter"]</code> are both empty',
      "Assert the full, unfiltered row set is visible again",
    ],
  },
  {
    id: "TBL_012",
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
    id: "TBL_013",
    scenario: "Prev button is disabled on the first page",
    expected: "The Prev control cannot be activated while on page 1",
    type: "negative",
    priority: "medium",
    steps: [
      'On page 1, assert <code>[data-testid="pag-prev"]</code> is disabled',
      "Assert clicking it (if forced) does not change the page",
    ],
  },
  {
    id: "TBL_014",
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
    id: "TBL_015",
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
    id: "TBL_016",
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
