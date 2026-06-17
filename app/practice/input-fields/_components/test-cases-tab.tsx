import { TestCasesTable } from "@/components/practice";
import type { TestCase } from "@/data/practice-data/types";

interface TestCasesTabProps {
  testCases: TestCase[];
}

export function TestCasesTab({ testCases }: TestCasesTabProps) {
  return (
    <div className="w-full max-w-[1280px] mx-auto px-7 py-6 pb-16">
      <TestCasesTable testCases={testCases} />
    </div>
  );
}
