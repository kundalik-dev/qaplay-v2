import type { TestCase } from "@/data/practice-data/types";

export const modalsTestCases: TestCase[] = [
  {
    id: "MDL_001",
    scenario: "Simple modal can be opened",
    expected: "Modal dialog becomes visible on screen",
    type: "positive",
    priority: "high",
    steps: [
      "Navigate to <code>/practice/modals</code>",
      'Locate <code>[data-testid="btn-open-simple-modal"]</code> and click',
      "Assert modal container is visible",
    ],
  },
  {
    id: "MDL_002",
    scenario: "Simple modal can be closed",
    expected: "Modal dialog is removed from screen and result updates",
    type: "positive",
    priority: "high",
    steps: [
      "Open the simple modal",
      'Locate <code>[data-testid="btn-close-simple-modal"]</code> and click',
      "Assert modal container is hidden",
      'Assert result text updates to "Closed"',
    ],
  },
  {
    id: "MDL_003",
    scenario: "Scoped modal from card can be opened",
    expected: "Correct modal tied to the card becomes visible",
    type: "positive",
    priority: "high",
    steps: [
      'Filter <code>[data-testid="card-course"]</code> by text',
      "Click the scoped open button",
      "Assert the modal header matches the card text",
    ],
  },
  {
    id: "MDL_004",
    scenario: "Scoped modal from card can be closed",
    expected: "Modal is closed and result updates",
    type: "positive",
    priority: "medium",
    steps: [
      "Open the card modal",
      "Locate the close button inside the active modal and click",
      "Assert result text updates",
    ],
  },
  {
    id: "MDL_005",
    scenario: "Dynamic ID modal can be confirmed",
    expected: "Confirm button is successfully located and clicked",
    type: "positive",
    priority: "medium",
    steps: [
      "Click the open button for dynamic modal",
      "Locate the confirm button using partial attributes (e.g. <code>starts-with</code>)",
      "Click the button and assert result updates",
    ],
  },
  {
    id: "MDL_006",
    scenario: "Missing locator modal can be accepted via ARIA",
    expected: "Accept button is successfully located without a test id",
    type: "positive",
    priority: "high",
    steps: [
      "Click the open button for missing locator modal",
      "Locate the modal using <code>getByRole('dialog')</code>",
      'Locate the "Accept" button using ARIA label or sibling text',
      "Click and assert result updates",
    ],
  },
  {
    id: "MDL_007",
    scenario: "Modal background overlay exists",
    expected: "Overlay prevents interaction with background elements",
    type: "edge",
    priority: "low",
    steps: [
      "Open any modal",
      "Attempt to click an element outside the modal",
      "Assert action is intercepted by overlay",
    ],
  },
  {
    id: "MDL_008",
    scenario: "Modal can be closed by clicking outside",
    expected: "Clicking the backdrop closes the modal",
    type: "edge",
    priority: "medium",
    steps: [
      "Open any modal",
      "Click on the modal overlay/backdrop",
      "Assert the modal is hidden",
    ],
  },
];
