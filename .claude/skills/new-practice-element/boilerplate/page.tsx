import type { Metadata } from "next";

import { elementContent } from "@/data/new-practice/elements/element";
import type { HighlightedLearnCodeSnippet } from "@/data/practice-data/types";
import { highlightLearnSnippet } from "@/lib/highlight";
import {
  ElementWorkspace,
  LearnView,
  PracticeView,
  TestCasesView,
} from "../_components";
import { ElementPlayground } from "./_components/element-playground";

const { meta, testCases, learn } = elementContent;

export const metadata: Metadata = {
  title: `${meta.title} | QA Playground`,
  description: meta.description,
};

export default async function ElementPage() {
  // Pre-highlight every learn snippet on the server, keyed by section id.
  const highlightedEntries = await Promise.all(
    learn
      .filter((section) => section.snippets)
      .map(
        async (section) =>
          [
            section.id,
            await highlightLearnSnippet(section.snippets!),
          ] as const,
      ),
  );
  const highlighted: Record<string, HighlightedLearnCodeSnippet> =
    Object.fromEntries(highlightedEntries);

  return (
    <ElementWorkspace
      meta={meta}
      testCaseCount={testCases.length}
      practiceContent={
        <PracticeView testId="element-practice-view">
          <ElementPlayground />
        </PracticeView>
      }
      testCasesContent={<TestCasesView testCases={testCases} />}
      learnContent={
        <LearnView
          sections={learn}
          highlighted={highlighted}
          sectionClassName="border-0 bg-transparent rounded-none shadow-none"
        />
      }
    />
  );
}
