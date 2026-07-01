import type { Metadata } from "next";
import { PracticePage } from "./_components/practice-page";
import { LearnTab } from "./_components/learn-tab";
import { modalsMeta } from "@/data/practice-data/modals/meta";
import { modalsTestCases } from "@/data/practice-data/modals/test-cases";
import { modalsLearnCode } from "@/data/practice-data/modals/learn";
import { highlightLearnSnippet } from "@/lib/highlight";
import { modalsPageMetadata } from "@/data/meta-data/practice/modals-page-meta-data";

export const metadata: Metadata = modalsPageMetadata;

export default async function ModalsPage() {
  const [locating, interacting] = await Promise.all([
    highlightLearnSnippet(modalsLearnCode.locating),
    highlightLearnSnippet(modalsLearnCode.interacting),
  ]);

  return (
    <PracticePage
      meta={modalsMeta}
      testCases={modalsTestCases}
      learnContent={<LearnTab snippets={{ locating, interacting }} />}
    />
  );
}
