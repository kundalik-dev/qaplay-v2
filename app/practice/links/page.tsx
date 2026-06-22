import type { Metadata } from "next";
import { PracticePage }   from "./_components/practice-page";
import { LearnTab }        from "./_components/learn-tab";
import { linksMeta, linksTestCases, linksLearnCode } from "@/data/practice-data/links";
import { linksPageMetadata } from "@/data/meta-data/practice/links-page-meta-data";
import { highlightLearnSnippet } from "@/lib/highlight";

export const metadata: Metadata = linksPageMetadata;

export default async function LinksPage() {
  const [basic, status] = await Promise.all([
    highlightLearnSnippet(linksLearnCode.basic),
    highlightLearnSnippet(linksLearnCode.status),
  ]);

  return (
    <PracticePage
      meta={linksMeta}
      testCases={linksTestCases}
      learnContent={<LearnTab snippets={{ basic, status }} />}
    />
  );
}
