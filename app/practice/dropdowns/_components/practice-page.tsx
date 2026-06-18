import { MainTabs, PageHeader } from "@/components/practice";
import type { PracticePageMeta, TestCase } from "@/data/practice-data/types";
import type { ReactNode } from "react";
import { PracticeTab } from "./practice-tab";
import { TestCasesTab } from "./test-cases-tab";

interface PracticePageProps {
  meta: PracticePageMeta;
  testCases: TestCase[];
  learnContent: ReactNode;
}

export function PracticePage({ meta, testCases, learnContent }: PracticePageProps) {
  return (
    <div
      data-testid={`${meta.element}-page`}
      data-section="practice"
      data-element={meta.element}
    >
      <PageHeader
        title={meta.title}
        description={meta.description}
        level={meta.level}
        durationMin={meta.durationMin}
        scenarioCount={meta.scenarioCount}
        testCaseCount={meta.testCaseCount}
        breadcrumb={meta.breadcrumb}
      />

      <MainTabs
        scenarioCount={meta.scenarioCount}
        testCaseCount={meta.testCaseCount}
        practiceContent={<PracticeTab upNext={meta.upNext} />}
        testCasesContent={<TestCasesTab testCases={testCases} />}
        learnContent={learnContent}
      />
    </div>
  );
}
