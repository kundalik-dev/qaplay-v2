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
    id: "ALD_003",
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
    id: "ALD_004",
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
    id: "ALD_005",
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
    id: "ALD_006",
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
    id: "ALD_007",
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
    id: "ALD_008",
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
    id: "ALD_009",
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
];
