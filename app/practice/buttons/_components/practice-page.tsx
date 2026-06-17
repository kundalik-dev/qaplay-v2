"use client";

import { PageHeader, MainTabs } from "@/components/practice";
import { PracticeTab }   from "./practice-tab";
import { TestCasesTab }  from "./test-cases-tab";
import { LearnTab }      from "./learn-tab";
import type { PracticePageMeta, TestCase } from "@/data/practice-data/types";

interface PracticePageProps {
  meta: PracticePageMeta;
  testCases: TestCase[];
}

export function PracticePage({ meta, testCases }: PracticePageProps) {
  return (
    <div
      data-testid={`${meta.element}-page`}
      data-section="practice"
      data-element={meta.element}
    >
      {/* Page header: breadcrumb + H1 + pills */}
      <PageHeader
        title={meta.title}
        description={meta.description}
        level={meta.level}
        durationMin={meta.durationMin}
        scenarioCount={meta.scenarioCount}
        testCaseCount={meta.testCaseCount}
        breadcrumb={meta.breadcrumb}
      />

      {/* Three-tab shell */}
      <MainTabs
        scenarioCount={meta.scenarioCount}
        testCaseCount={meta.testCaseCount}
        practiceContent={<PracticeTab upNext={meta.upNext} />}
        testCasesContent={<TestCasesTab testCases={testCases} />}
        learnContent={<LearnTab />}
      />
    </div>
  );
}
