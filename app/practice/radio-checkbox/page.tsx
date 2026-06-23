import type { Metadata } from "next";
import { PracticePage } from "./_components/practice-page";
import { LearnTab } from "./_components/learn-tab";
import {
  radioCheckboxMeta,
  radioCheckboxTestCases,
  radioCheckboxLearnCode,
} from "@/data/practice-data/radio-checkbox";
import { radioCheckboxPageMetadata } from "@/data/meta-data/practice/radio-checkbox-page-meta-data";
import {
  radioCheckboxPageWebPageJsonLd,
  radioCheckboxPageBreadcrumbJsonLd,
  radioCheckboxPageFaqJsonLd,
} from "@/data/meta-data/practice/radio-checkbox-structured-jsonld-data";
import { highlightLearnSnippet } from "@/lib/highlight";

export const metadata: Metadata = radioCheckboxPageMetadata;

export default async function RadioCheckboxPage() {
  const [checkbox, radio, assert, disabled] = await Promise.all([
    highlightLearnSnippet(radioCheckboxLearnCode.checkbox),
    highlightLearnSnippet(radioCheckboxLearnCode.radio),
    highlightLearnSnippet(radioCheckboxLearnCode.assert),
    highlightLearnSnippet(radioCheckboxLearnCode.disabled),
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(radioCheckboxPageWebPageJsonLd),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(radioCheckboxPageBreadcrumbJsonLd),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(radioCheckboxPageFaqJsonLd),
        }}
      />
      <PracticePage
        meta={radioCheckboxMeta}
        testCases={radioCheckboxTestCases}
        learnContent={
          <LearnTab snippets={{ checkbox, radio, assert, disabled }} />
        }
      />
    </>
  );
}
