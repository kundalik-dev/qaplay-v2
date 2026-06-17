import { practiceCards } from "@/data/practice-data/practice-elements-data";
import { practicePageMetadata } from "@/data/meta-data/practice/practice-page-meta-data";
import {
  practicePageBreadcrumbJsonLd,
  practicePageWebPageJsonLd,
} from "@/data/meta-data/practice/practice-structured-jsonld-data";
import { JsonLd } from "@/components/seo";
import { PracticeGrid } from "./_components/practice-grid";

export const metadata = practicePageMetadata;

export default function PracticePage() {
  return (
    <section data-testid="practice-page" data-section="practice">
      <JsonLd data={practicePageWebPageJsonLd} />
      <JsonLd data={practicePageBreadcrumbJsonLd} />
      <PracticeGrid cards={practiceCards} />
    </section>
  );
}
