import { TestCasesTable } from "@/components/practice";
import { alertsDialogsTestCases } from "@/data/practice-data/alerts-dialogs/test-cases";

/**
 * Test Cases panel for /ui-practice/dialog. Reuses the same
 * TestCasesTable shared component and TestCase data shape as
 * /practice/[element] pages — sourced from
 * data/practice-data/alerts-dialogs/test-cases.ts — just rendered
 * under this page's own top nav bar instead of MainTabs.
 */
export function DialogTestCasesTab() {
  return (
    <div className="mx-auto w-full max-w-[820px] px-0 py-5 pb-16">
      <TestCasesTable testCases={alertsDialogsTestCases} />
    </div>
  );
}
