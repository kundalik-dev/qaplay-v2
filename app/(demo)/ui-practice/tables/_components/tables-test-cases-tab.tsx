import { TestCasesTable } from "@/components/practice";
import { tablesTestCases } from "@/data/ui-practice-data/tables";

/**
 * Test Cases content for /ui-practice/tables/test-cases. Reuses the
 * same shared TestCasesTable component as /practice/[element] pages -
 * sourced from data/ui-practice-data/tables/test-cases.ts.
 */
export function TablesTestCasesTab() {
  return (
    <div className="mx-auto w-full max-w-[900px] px-0 py-5 pb-16">
      <TestCasesTable testCases={tablesTestCases} />
    </div>
  );
}
