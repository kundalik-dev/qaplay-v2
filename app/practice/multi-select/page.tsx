import type { Metadata } from "next";
import { PracticePage } from "./_components/practice-page";
import { LearnTab } from "./_components/learn-tab";
import {
  multiSelectMeta,
  multiSelectTestCases,
  multiSelectLearnCode,
} from "@/data/practice-data/multi-select";
import { multiSelectPageMetadata } from "@/data/meta-data/practice/multi-select-page-meta-data";
import {
  multiSelectPageWebPageJsonLd,
  multiSelectPageBreadcrumbJsonLd,
  multiSelectPageFaqJsonLd,
} from "@/data/meta-data/practice/multi-select-structured-jsonld-data";
import { highlightLearnSnippet } from "@/lib/highlight";

export const metadata: Metadata = multiSelectPageMetadata;

export default async function MultiSelectPage() {
  const [native, custom, tags, searchable] = await Promise.all([
    highlightLearnSnippet(multiSelectLearnCode.native),
    highlightLearnSnippet(multiSelectLearnCode.custom),
    highlightLearnSnippet(multiSelectLearnCode.tags),
    highlightLearnSnippet(multiSelectLearnCode.searchable),
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(multiSelectPageWebPageJsonLd),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(multiSelectPageBreadcrumbJsonLd),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(multiSelectPageFaqJsonLd),
        }}
      />
      <PracticePage
        meta={multiSelectMeta}
        testCases={multiSelectTestCases}
        learnContent={
          <LearnTab snippets={{ native, custom, tags, searchable }} />
        }
      />
    </>
  );
}
