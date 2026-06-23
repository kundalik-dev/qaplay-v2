import type { Metadata } from "next";
import { PracticePage } from "./_components/practice-page";
import { LearnTab } from "./_components/learn-tab";
import {
  shadowDomMeta,
  shadowDomTestCases,
  shadowDomLearnCode,
} from "@/data/practice-data/shadow-dom";
import { shadowDomPageMetadata } from "@/data/meta-data/practice/shadow-dom-page-meta-data";
import {
  shadowDomPageWebPageJsonLd,
  shadowDomPageBreadcrumbJsonLd,
  shadowDomPageFaqJsonLd,
} from "@/data/meta-data/practice/shadow-dom-structured-jsonld-data";
import { highlightLearnSnippet } from "@/lib/highlight";

export const metadata: Metadata = shadowDomPageMetadata;

export default async function ShadowDomPage() {
  const [basic, nested, evaluate, closed] = await Promise.all([
    highlightLearnSnippet(shadowDomLearnCode.basic),
    highlightLearnSnippet(shadowDomLearnCode.nested),
    highlightLearnSnippet(shadowDomLearnCode.evaluate),
    highlightLearnSnippet(shadowDomLearnCode.closed),
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(shadowDomPageWebPageJsonLd),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(shadowDomPageBreadcrumbJsonLd),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(shadowDomPageFaqJsonLd),
        }}
      />
      <PracticePage
        meta={shadowDomMeta}
        testCases={shadowDomTestCases}
        learnContent={
          <LearnTab snippets={{ basic, nested, evaluate, closed }} />
        }
      />
    </>
  );
}
