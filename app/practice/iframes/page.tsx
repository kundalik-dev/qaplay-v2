import type { Metadata } from "next";
import { PracticePage } from "./_components/practice-page";
import { LearnTab } from "./_components/learn-tab";
import {
  iframesMeta,
  iframesTestCases,
  iframesLearnCode,
} from "@/data/practice-data/iframes";
import { iframesPageMetadata } from "@/data/meta-data/practice/iframes-page-meta-data";
import {
  iframesPageWebPageJsonLd,
  iframesPageBreadcrumbJsonLd,
  iframesPageFaqJsonLd,
} from "@/data/meta-data/practice/iframes-structured-jsonld-data";
import { highlightLearnSnippet } from "@/lib/highlight";

export const metadata: Metadata = iframesPageMetadata;

export default async function IframesPage() {
  const [basic, nested, locate, dynamic] = await Promise.all([
    highlightLearnSnippet(iframesLearnCode.basic),
    highlightLearnSnippet(iframesLearnCode.nested),
    highlightLearnSnippet(iframesLearnCode.locate),
    highlightLearnSnippet(iframesLearnCode.dynamic),
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(iframesPageWebPageJsonLd),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(iframesPageBreadcrumbJsonLd),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(iframesPageFaqJsonLd),
        }}
      />
      <PracticePage
        meta={iframesMeta}
        testCases={iframesTestCases}
        learnContent={
          <LearnTab snippets={{ basic, nested, locate, dynamic }} />
        }
      />
    </>
  );
}
