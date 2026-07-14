import { TestCasesTable } from "@/components/practice";
import { dialogsTestCases } from "@/data/ui-practice-data/dialogs";

/**
 * Test Cases content for /ui-practice/dialog/test-cases. Reuses the
 * same shared TestCasesTable component as /practice/[element] pages -
 * sourced from data/ui-practice-data/dialogs/test-cases.ts.
 */
export function DialogTestCasesTab() {
  return (
    <div className="mx-auto w-full max-w-[820px] px-0 py-5 pb-16">
      <TestCasesTable testCases={dialogsTestCases} />
    </div>
  );
}
