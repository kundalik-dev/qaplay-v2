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
    <div className="pt-24 pb-16 md:pt-28">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <section data-testid="practice-page" data-section="practice">
          <JsonLd data={practicePageWebPageJsonLd} />
          <JsonLd data={practicePageBreadcrumbJsonLd} />
          <PracticeGrid cards={practiceCards} />
        </section>
      </div>
    </div>
  );
}
