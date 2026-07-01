import type { TestCase } from "@/data/practice-data/types";

export const infiniteScrollTestCases: TestCase[] = [
  {
    id: "SCR_001",
    scenario: "Simple list appends items when scrolled to bottom",
    expected: "New items are added, list length increases",
    type: "positive",
    priority: "high",
    steps: [
      'Locate the scroll container <code>[data-testid="scroll-container-simple"]</code>',
      "Scroll to the bottom of the container",
      "Assert the DOM list count has increased",
    ],
  },
  {
    id: "SCR_002",
    scenario: "Simple list reaches the end correctly",
    expected: "'End of List' message is displayed",
    type: "positive",
    priority: "medium",
    steps: [
      "Scroll the simple list until no more items load",
      'Assert <code>[data-testid="end-of-list-simple"]</code> is visible',
    ],
  },
  {
    id: "SCR_003",
    scenario: "Scroll to dynamic target",
    expected: "Target item is found and clicked",
    type: "positive",
    priority: "high",
    steps: [
      "Begin a scrolling loop in the dynamic container",
      'On each scroll, check for <code>[data-invoice-id="INV-042"]</code>',
      "Once visible, click the item action",
    ],
  },
  {
    id: "SCR_004",
    scenario: "Virtualized DOM removes off-screen items",
    expected: "Item 1 is no longer in the DOM when Item 50 is visible",
    type: "negative",
    priority: "high",
    steps: [
      "Verify Item 1 is present initially",
      "Scroll rapidly to Item 50",
      "Assert Item 1 does not exist in the DOM",
    ],
  },
  {
    id: "SCR_005",
    scenario: "Manual Load More button appears",
    expected: "Button becomes visible after threshold is reached",
    type: "positive",
    priority: "high",
    steps: [
      "Scroll the challenge container down twice",
      'Assert the "Load More" button is visible and clickable',
    ],
  },
  {
    id: "SCR_006",
    scenario: "Load More button fetches final items",
    expected: "Final target item is appended to list",
    type: "positive",
    priority: "medium",
    steps: [
      "Trigger the Load More button",
      "Wait for the loading indicator to disappear",
      "Locate the final target item and click it",
    ],
  },
  {
    id: "SCR_007",
    scenario: "Loading indicator appears during fetch",
    expected: "Spinner is briefly visible while items are retrieved",
    type: "edge",
    priority: "low",
    steps: [
      "Trigger a scroll to bottom",
      "Assert loading spinner is visible",
      "Wait and assert loading spinner is hidden",
    ],
  },
  {
    id: "SCR_008",
    scenario: "Scroll bounds logic functions correctly",
    expected: "Scrolling up does not trigger pagination requests",
    type: "negative",
    priority: "low",
    steps: [
      "Scroll down to load a batch",
      "Scroll back to the top of the container",
      "Assert no new items or loaders are appended to the top",
    ],
  },
];
