import { TestCasesTable } from "@/components/practice";
import type { TestCase } from "@/data/practice-data/types";

interface TestCasesViewProps {
  testCases: TestCase[];
}

/**
 * Reusable Test Cases tab content.
 * Wraps the shared TestCasesTable so every element page renders identically.
 */
export function TestCasesView({ testCases }: TestCasesViewProps) {
  return (
    <div data-testid="test-cases-view">
      <TestCasesTable testCases={testCases} />
    </div>
  );
}
