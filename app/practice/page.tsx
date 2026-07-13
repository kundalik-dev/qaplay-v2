import { practiceCards } from "@/data/practice-data/practice-elements-data";
import { practicePageMetadata } from "@/data/meta-data/practice/practice-page-meta-data";
import {
  practicePageBreadcrumbJsonLd,
  practicePageWebPageJsonLd,
} from "@/data/meta-data/practice/practice-structured-jsonld-data";
import { JsonLd } from "@/components/seo";
import { PracticeGrid } from "./_components/practice-grid";
import { NewPracticeGrid } from "./_components/new-practice-grid";

export const metadata = practicePageMetadata;

// Single switch for which /practice card UI renders:
//   true  -> compact card grid (new-practice-grid / new-practice-card)
//   false -> original large card grid (practice-grid / practice-card)
// Flip this one flag to compare the two designs.
const SHOW_COMPACT_PRACTICE_UI = true;

export default function PracticePage() {
  return (
    <section data-testid="practice-page" data-section="practice">
      <JsonLd data={practicePageWebPageJsonLd} />
      <JsonLd data={practicePageBreadcrumbJsonLd} />
      {SHOW_COMPACT_PRACTICE_UI ? (
        <NewPracticeGrid cards={practiceCards} />
      ) : (
        <PracticeGrid cards={practiceCards} />
      )}
    </section>
  );
}
