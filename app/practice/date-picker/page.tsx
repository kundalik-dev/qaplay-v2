import type { Metadata } from "next";
import { PracticePage } from "./_components/practice-page";
import { LearnTab } from "./_components/learn-tab";
import {
  datePickerMeta,
  datePickerTestCases,
  datePickerLearnCode,
} from "@/data/practice-data/date-picker";
import { datePickerPageMetadata } from "@/data/meta-data/practice/date-picker-page-meta-data";
import {
  datePickerPageWebPageJsonLd,
  datePickerPageBreadcrumbJsonLd,
  datePickerPageFaqJsonLd,
} from "@/data/meta-data/practice/date-picker-structured-jsonld-data";
import { highlightLearnSnippet } from "@/lib/highlight";

export const metadata: Metadata = datePickerPageMetadata;

export default async function DatePickerPage() {
  const [native, calendar, range, constraints] = await Promise.all([
    highlightLearnSnippet(datePickerLearnCode.native),
    highlightLearnSnippet(datePickerLearnCode.calendar),
    highlightLearnSnippet(datePickerLearnCode.range),
    highlightLearnSnippet(datePickerLearnCode.constraints),
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(datePickerPageWebPageJsonLd),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(datePickerPageBreadcrumbJsonLd),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(datePickerPageFaqJsonLd),
        }}
      />
      <PracticePage
        meta={datePickerMeta}
        testCases={datePickerTestCases}
        learnContent={
          <LearnTab snippets={{ native, calendar, range, constraints }} />
        }
      />
    </>
  );
}
