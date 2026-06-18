import { TestCasesTable } from "@/components/practice";
import type { TestCase } from "@/data/practice-data/types";

interface TestCasesTabProps {
  testCases: TestCase[];
}

export function TestCasesTab({ testCases }: TestCasesTabProps) {
  return (
    <div className="mx-auto w-full max-w-[1280px] px-4 py-5 pb-16 sm:px-7 sm:py-6">
      <TestCasesTable testCases={testCases} />
    </div>
  );
}
