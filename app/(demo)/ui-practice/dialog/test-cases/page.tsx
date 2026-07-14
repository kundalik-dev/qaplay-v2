import { createPageMetadata } from "@/data/meta-data/create-page-metadata";

import { DialogTestCasesTab } from "../_components/dialog-test-cases-tab";

/** Test case data is static - safe to cache for a day. */
export const revalidate = 86400;

export const metadata = createPageMetadata({
  title: "Dialog Practice — Test Cases",
  description:
    "Test cases for dialog and alert automation — open/close, confirm/cancel, backdrop dismiss, Escape key, and accessibility assertions in Playwright, Selenium, and Cypress.",
  path: "/ui-practice/dialog/test-cases",
});

export default function DialogTestCasesPage() {
  return (
    <div data-testid="ui-practice-dialog-test-cases-page">
      <DialogTestCasesTab />
    </div>
  );
}
