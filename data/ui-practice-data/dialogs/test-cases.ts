import type { TestCase } from "@/data/practice-data/types";

/**
 * Test Cases for /ui-practice/dialog/test-cases. Ported from
 * data/practice-data/alerts-dialogs/test-cases.ts (which stays in place
 * for the classic /practice/alerts-dialogs page) - same scenarios, same
 * data-testids from app/(demo)/ui-practice/dialog/_components/*.
 */
export const dialogsTestCases: TestCase[] = [
  {
    id: "ALD_001",
    scenario: "Dialog opens after trigger button click",
    expected: "Dialog element is visible with role=dialog and aria-modal=true",
    type: "positive",
    priority: "high",
    steps: [
      "Navigate to <code>/ui-practice/dialog</code>",
      'Click <code>[data-testid="open-info-dialog"]</code>',
      'Assert <code>[data-testid="info-alert-dialog"]</code> is visible',
      'Assert the element has <code>role="dialog"</code> and <code>aria-modal="true"</code>',
    ],
  },
  {
    id: "ALD_002",
    scenario: "Dialog heading matches expected title",
    expected: 'Heading inside dialog reads "Session Notice" exactly',
    type: "positive",
    priority: "high",
    steps: [
      'Open the info dialog via <code>[data-testid="open-info-dialog"]</code>',
      'Assert <code>getByRole("heading", { name: "Session Notice" })</code> is visible',
      "Verify the h2 element text matches exactly using <code>toHaveText</code>",
    ],
  },
  {
    id: "ALD_003",
    scenario: "Close button dismisses the info dialog",
    expected: "Dialog disappears from the DOM after clicking the × button",
    type: "positive",
    priority: "high",
    steps: [
      "Open info dialog",
      'Click <code>[data-testid="info-dialog-close-btn"]</code>',
      "Assert dialog is no longer visible",
      'Assert <code>[data-testid="result-s01"]</code> confirms dismissal',
    ],
  },
  {
    id: "ALD_004",
    scenario: "Cancel button keeps dialog closed without triggering the action",
    expected: "Dialog closes and the confirm result is not updated",
    type: "negative",
    priority: "medium",
    steps: [
      'Open confirm dialog via <code>[data-testid="open-confirm-dialog"]</code>',
      'Click <code>[data-testid="confirm-cancel-btn"]</code>',
      "Assert the dialog is no longer visible",
      'Assert <code>[data-testid="result-s02"]</code> still reads its initial value',
    ],
  },
  {
    id: "ALD_005",
    scenario: "Confirm button triggers the expected action and closes dialog",
    expected: 'Result reads "Submission confirmed!" and dialog disappears',
    type: "positive",
    priority: "high",
    steps: [
      'Open confirm dialog via <code>[data-testid="open-confirm-dialog"]</code>',
      "Assert dialog is visible",
      'Click <code>[data-testid="confirm-ok-btn"]</code>',
      'Assert <code>[data-testid="result-s02"]</code> reads <code>Submission confirmed!</code>',
      "Assert dialog is no longer in the DOM",
    ],
  },
  {
    id: "ALD_006",
    scenario:
      "Destructive confirm button located by aria-label (no data-testid)",
    expected:
      'Result reads "Account deleted!" after clicking the danger button',
    type: "positive",
    priority: "high",
    note: "The Delete Account button intentionally has no data-testid — use aria-label or role+name.",
    steps: [
      'Open delete dialog via <code>[data-testid="open-delete-dialog"]</code>',
      "Scope into <code>[data-testid='delete-account-dialog']</code>",
      'Locate the button by <code>[aria-label="Confirm account deletion"]</code>',
      "Click it and assert result is updated",
    ],
  },
  {
    id: "ALD_007",
    scenario: "Backdrop click closes the modal dialog",
    expected: "Dialog closes when clicking the overlay behind the dialog box",
    type: "positive",
    priority: "medium",
    note: "Clicking the centered dialog box must not close the dialog — only the backdrop area outside it.",
    steps: [
      'Open backdrop dialog via <code>[data-testid="open-backdrop-dialog"]</code>',
      'Click <code>[data-testid="backdrop-dismiss-dialog"]</code> at <code>{ position: { x: 5, y: 5 } }</code>',
      "Assert dialog is no longer visible",
      'Assert <code>[data-testid="result-s05"]</code> confirms backdrop close',
    ],
  },
  {
    id: "ALD_008",
    scenario: "Escape key dismisses the dialog",
    expected: "Result confirms dialog closed via keyboard; dialog disappears",
    type: "positive",
    priority: "high",
    steps: [
      'Open escape dialog via <code>[data-testid="open-escape-dialog"]</code>',
      "Assert dialog is visible",
      "Press <code>Escape</code> key (<code>page.keyboard.press('Escape')</code>)",
      "Assert dialog is gone and result is updated",
    ],
  },
  {
    id: "ALD_009",
    scenario: "Dialog body text is assertable without data-testid",
    expected: "Text 'Sunday' is found inside the dialog body",
    type: "positive",
    priority: "medium",
    note: "The body paragraph has no data-testid — use scoped text locators.",
    steps: [
      'Open notification dialog via <code>[data-testid="open-notification-dialog"]</code>',
      'Scope into <code>[data-testid="system-notification-dialog"]</code>',
      "Assert <code>getByText(/Sunday/)</code> is visible inside the dialog",
      "Click the Acknowledge button and assert result",
    ],
  },
  {
    id: "ALD_010",
    scenario: "Dialog has correct aria attributes for accessibility",
    expected: "role=dialog, aria-modal=true, and aria-labelledby are present",
    type: "positive",
    priority: "medium",
    steps: [
      'Open any dialog, e.g. <code>[data-testid="open-info-dialog"]</code>',
      'Assert <code>getAttribute("role")</code> equals <code>dialog</code>',
      'Assert <code>getAttribute("aria-modal")</code> equals <code>true</code>',
      "Assert <code>aria-labelledby</code> points to a visible heading",
    ],
  },
  {
    id: "ALD_011",
    scenario: "aria-labelledby attribute references the visible heading",
    expected: "The heading element ID matches the dialog aria-labelledby value",
    type: "positive",
    priority: "medium",
    steps: [
      "Open the info dialog and read <code>aria-labelledby</code> attribute",
      "Locate element by that ID",
      "Assert the element is the visible <code>h2</code> heading",
      "Assert its text is non-empty",
    ],
  },
  {
    id: "ALD_012",
    scenario: "Correct notification targeted from repeated Dismiss buttons",
    expected:
      "The 'Session Expiring Soon' notification is dismissed, not the others",
    type: "positive",
    priority: "high",
    note: "All three dismiss buttons share the same data-testid — scoping to the parent is required.",
    steps: [
      'Locate <code>[data-notif-id="notif-2"] [data-testid="notif-dismiss-btn"]</code>',
      "Click it and confirm the dialog opens for Session Expiring Soon",
      'Assert the dialog <code>data-notif-id="notif-2"</code>',
      "Click confirm and assert result shows the correct notification title",
    ],
  },
  {
    id: "ALD_013",
    scenario: "Dismiss confirm dialog scoped by data-notif-id",
    expected:
      "Confirm button inside scoped dialog is clicked without ambiguity",
    type: "positive",
    priority: "medium",
    steps: [
      "Trigger dismiss for notif-2",
      'Assert <code>[data-testid="dismiss-confirm-dialog"][data-notif-id="notif-2"]</code> is visible',
      'Click <code>[aria-label*="Confirm dismiss"]</code> inside that dialog',
      "Assert result confirms the correct notification",
    ],
  },
  {
    id: "ALD_014",
    scenario: "Clicking dialog box does not fire backdrop close handler",
    expected: "Dialog remains open after clicking inside the dialog box",
    type: "edge",
    priority: "low",
    steps: [
      'Open backdrop dialog via <code>[data-testid="open-backdrop-dialog"]</code>',
      'Click the centered dialog box (<code>[data-testid="backdrop-dialog-box"]</code>)',
      "Assert the dialog is still visible — click did not close it",
    ],
  },
  {
    id: "ALD_015",
    scenario: "Escape key has no effect when no dialog is open",
    expected:
      "Page state remains unchanged when pressing Escape with no active dialog",
    type: "edge",
    priority: "low",
    steps: [
      "Ensure no dialog is currently open (initial page state)",
      "Press <code>Escape</code> on the page",
      "Assert no errors occur and no results change",
    ],
  },
  {
    id: "ALD_016",
    scenario: "Page loads without console errors",
    expected: "No uncaught errors are logged during initial load",
    type: "positive",
    priority: "high",
    steps: [
      "Attach listener to browser <code>console</code> and <code>pageerror</code> events",
      "Navigate to <code>/ui-practice/dialog</code>",
      "Assert no <code>error</code>-level messages were captured",
    ],
  },
];
