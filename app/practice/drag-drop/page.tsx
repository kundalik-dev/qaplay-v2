import type { Metadata } from "next";
import { PracticePage } from "./_components/practice-page";
import { LearnTab }      from "./_components/learn-tab";
import { dragDropMeta, dragDropTestCases, dragDropLearnCode } from "@/data/practice-data/drag-drop";
import { dragDropPageMetadata } from "@/data/meta-data/practice/drag-drop-page-meta-data";
import {
  dragDropPageWebPageJsonLd,
  dragDropPageBreadcrumbJsonLd,
  dragDropPageFaqJsonLd,
} from "@/data/meta-data/practice/drag-drop-structured-jsonld-data";
import { highlightLearnSnippet } from "@/lib/highlight";

export const metadata: Metadata = dragDropPageMetadata;

export default async function DragDropPage() {
  const [basic, locator, mouse, selenium] = await Promise.all([
    highlightLearnSnippet(dragDropLearnCode.basic),
    highlightLearnSnippet(dragDropLearnCode.locator),
    highlightLearnSnippet(dragDropLearnCode.mouse),
    highlightLearnSnippet(dragDropLearnCode.selenium),
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(dragDropPageWebPageJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(dragDropPageBreadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(dragDropPageFaqJsonLd) }}
      />
      <PracticePage
        meta={dragDropMeta}
        testCases={dragDropTestCases}
        learnContent={<LearnTab snippets={{ basic, locator, mouse, selenium }} />}
      />
    </>
  );
}
