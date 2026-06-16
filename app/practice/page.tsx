import { practiceCards } from "@/data/practice-data/practice-elements-data";
import { practicePageMetadata } from "@/data/meta-data/practice-page-meta-data";
import { PracticeGrid } from "./_components/practice-grid";

export const metadata = practicePageMetadata;

export default function PracticePage() {
  return (
    <main data-testid="practice-page" data-section="practice">
      <PracticeGrid cards={practiceCards} />
    </main>
  );
}
