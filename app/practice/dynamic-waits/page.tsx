import type { Metadata } from "next";
import { PracticePage } from "./_components/practice-page";
import { LearnTab } from "./_components/learn-tab";
import {
  dynamicWaitsMeta,
  dynamicWaitsTestCases,
  dynamicWaitsLearnCode,
} from "@/data/practice-data/dynamic-waits";
import { dynamicWaitsPageMetadata } from "@/data/meta-data/practice/dynamic-waits-page-meta-data";
import {
  dynamicWaitsPageWebPageJsonLd,
  dynamicWaitsPageBreadcrumbJsonLd,
  dynamicWaitsPageFaqJsonLd,
} from "@/data/meta-data/practice/dynamic-waits-structured-jsonld-data";
import { highlightLearnSnippet } from "@/lib/highlight";

export const metadata: Metadata = dynamicWaitsPageMetadata;

export default async function DynamicWaitsPage() {
  const [selector, fn, state, selenium] = await Promise.all([
    highlightLearnSnippet(dynamicWaitsLearnCode.selector),
    highlightLearnSnippet(dynamicWaitsLearnCode.function),
    highlightLearnSnippet(dynamicWaitsLearnCode.state),
    highlightLearnSnippet(dynamicWaitsLearnCode.selenium),
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(dynamicWaitsPageWebPageJsonLd),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(dynamicWaitsPageBreadcrumbJsonLd),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(dynamicWaitsPageFaqJsonLd),
        }}
      />
      <PracticePage
        meta={dynamicWaitsMeta}
        testCases={dynamicWaitsTestCases}
        learnContent={
          <LearnTab snippets={{ selector, function: fn, state, selenium }} />
        }
      />
    </>
  );
}
