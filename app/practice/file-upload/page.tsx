import type { Metadata } from "next";
import { PracticePage } from "./_components/practice-page";
import { LearnTab } from "./_components/learn-tab";
import {
  fileUploadMeta,
  fileUploadTestCases,
  fileUploadLearnCode,
} from "@/data/practice-data/file-upload";
import { fileUploadPageMetadata } from "@/data/meta-data/practice/file-upload-page-meta-data";
import {
  fileUploadPageWebPageJsonLd,
  fileUploadPageBreadcrumbJsonLd,
  fileUploadPageFaqJsonLd,
} from "@/data/meta-data/practice/file-upload-structured-jsonld-data";
import { highlightLearnSnippet } from "@/lib/highlight";

export const metadata: Metadata = fileUploadPageMetadata;

export default async function FileUploadPage() {
  const [native, dragdrop, hidden, validate] = await Promise.all([
    highlightLearnSnippet(fileUploadLearnCode.native),
    highlightLearnSnippet(fileUploadLearnCode.dragdrop),
    highlightLearnSnippet(fileUploadLearnCode.hidden),
    highlightLearnSnippet(fileUploadLearnCode.validate),
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(fileUploadPageWebPageJsonLd),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(fileUploadPageBreadcrumbJsonLd),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(fileUploadPageFaqJsonLd),
        }}
      />
      <PracticePage
        meta={fileUploadMeta}
        testCases={fileUploadTestCases}
        learnContent={
          <LearnTab snippets={{ native, dragdrop, hidden, validate }} />
        }
      />
    </>
  );
}
