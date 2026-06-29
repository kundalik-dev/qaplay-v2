import type { Metadata } from "next";

import { alertPracticeContent } from "@/data/new-practice/elements/alert-practice";
import {
  ElementWorkspace,
  LearnView,
  PracticeView,
  TestCasesView,
} from "../_components";
import { AlertPracticePlayground } from "./_components/alert-practice-playground";

const { meta, testCases, learn } = alertPracticeContent;

export const metadata: Metadata = {
  title: `${meta.title} | QA Playground`,
  description: meta.description,
};

export default function AlertPracticePage() {
  return (
    <ElementWorkspace
      meta={meta}
      testCaseCount={testCases.length}
      practiceContent={
        <PracticeView testId="alert-practice-view">
          <AlertPracticePlayground />
        </PracticeView>
      }
      testCasesContent={<TestCasesView testCases={testCases} />}
      learnContent={<LearnView sections={learn} />}
    />
  );
}
