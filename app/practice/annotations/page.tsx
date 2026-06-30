import { JsonLd } from "@/components/seo";
import { PracticePage } from "./_components/practice-page";
import { LearnTab } from "./_components/learn-tab";
import { annotationsMeta } from "@/data/practice-data/annotations/meta";
import { annotationsTestCases } from "@/data/practice-data/annotations/test-cases";
import { annotationsLearnCode } from "@/data/practice-data/annotations/learn";
import { annotationsPageMetadata } from "@/data/meta-data/practice/annotations-page-meta-data";
import {
  annotationsPageWebPageJsonLd,
  annotationsPageBreadcrumbJsonLd,
  annotationsPageFaqJsonLd,
} from "@/data/meta-data/practice/annotations-structured-jsonld-data";
import { highlightLearnSnippet } from "@/lib/highlight";

export const metadata = annotationsPageMetadata;

export default async function AnnotationsPage() {
  const [snippet1, snippet2] = await Promise.all([
    highlightLearnSnippet(annotationsLearnCode.snippet1),
    highlightLearnSnippet(annotationsLearnCode.snippet2),
  ]);

  return (
    <>
      <JsonLd data={annotationsPageWebPageJsonLd} />
      <JsonLd data={annotationsPageBreadcrumbJsonLd} />
      <JsonLd data={annotationsPageFaqJsonLd} />
      <PracticePage
        meta={annotationsMeta}
        testCases={annotationsTestCases}
        learnContent={<LearnTab snippets={{ snippet1, snippet2 }} />}
      />
    </>
  );
}
