import type { Metadata } from "next";
import { PracticePage } from "./_components/practice-page";
import { LearnTab } from "./_components/learn-tab";
import { infiniteScrollMeta } from "@/data/practice-data/infinite-scroll/meta";
import { infiniteScrollTestCases } from "@/data/practice-data/infinite-scroll/test-cases";
import { infiniteScrollLearnCode } from "@/data/practice-data/infinite-scroll/learn";
import { highlightLearnSnippet } from "@/lib/highlight";
import { infiniteScrollPageMetadata } from "@/data/meta-data/practice/infinite-scroll-page-meta-data";

export const metadata: Metadata = infiniteScrollPageMetadata;

export default async function InfiniteScrollPage() {
  const [evaluate, scrollIntoView] = await Promise.all([
    highlightLearnSnippet(infiniteScrollLearnCode.evaluate),
    highlightLearnSnippet(infiniteScrollLearnCode.scrollIntoView),
  ]);

  return (
    <PracticePage
      meta={infiniteScrollMeta}
      testCases={infiniteScrollTestCases}
      learnContent={<LearnTab snippets={{ evaluate, scrollIntoView }} />}
    />
  );
}
