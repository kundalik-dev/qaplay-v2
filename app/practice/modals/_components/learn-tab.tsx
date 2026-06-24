import { DocSection, LearnCodeBlock, MethodSummaryTable, FaqBlock, LearnToc } from "@/components/practice";
import { modalsLearnDesc, modalsMethodRows, modalsFaq, modalsTocItems } from "@/data/practice-data/modals/learn";
import type { HighlightedLearnCodeSnippet } from "@/data/practice-data/types";

interface LearnTabProps {
  snippets: {
    locating: HighlightedLearnCodeSnippet;
    interacting: HighlightedLearnCodeSnippet;
  };
}

export function LearnTab({ snippets }: LearnTabProps) {
  const { locating, interacting } = snippets;

  return (
    <div className="mx-auto w-full max-w-[1280px] px-4 py-6 pb-16 sm:px-7 sm:py-8">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_200px] lg:gap-12">
        <main aria-label="Learn content" className="flex flex-col gap-5">

          <DocSection id="learn-overview" heading="Overview">
            <p className="text-[13px] leading-[1.6] text-muted-foreground">
              {modalsLearnDesc.overview}
            </p>
          </DocSection>

          <DocSection id="learn-locating" heading="1 · Locating Modals" desc={modalsLearnDesc.locating}>
            <LearnCodeBlock snippets={locating} />
          </DocSection>

          <DocSection id="learn-interacting" heading="2 · Interacting Inside Modals" desc={modalsLearnDesc.interacting}>
            <LearnCodeBlock snippets={interacting} />
          </DocSection>

          <DocSection id="learn-methods" heading="Method Summary">
            <MethodSummaryTable rows={modalsMethodRows} />
          </DocSection>

          <DocSection id="learn-faq" heading="FAQ">
            <FaqBlock items={modalsFaq} />
          </DocSection>

        </main>
        <LearnToc items={modalsTocItems} />
      </div>
    </div>
  );
}
