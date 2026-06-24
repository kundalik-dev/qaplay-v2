import { DocSection, LearnCodeBlock, MethodSummaryTable, FaqBlock, LearnToc } from "@/components/practice";
import { infiniteScrollLearnDesc, infiniteScrollMethodRows, infiniteScrollFaq, infiniteScrollTocItems } from "@/data/practice-data/infinite-scroll/learn";
import type { HighlightedLearnCodeSnippet } from "@/data/practice-data/types";

interface LearnTabProps {
  snippets: {
    evaluate: HighlightedLearnCodeSnippet;
    scrollIntoView: HighlightedLearnCodeSnippet;
  };
}

export function LearnTab({ snippets }: LearnTabProps) {
  const { evaluate, scrollIntoView } = snippets;

  return (
    <div className="mx-auto w-full max-w-[1280px] px-4 py-6 pb-16 sm:px-7 sm:py-8">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_200px] lg:gap-12">
        <main aria-label="Learn content" className="flex flex-col gap-5">

          <DocSection id="learn-overview" heading="Overview">
            <p className="text-[13px] leading-[1.6] text-muted-foreground">
              {infiniteScrollLearnDesc.overview}
            </p>
          </DocSection>

          <DocSection id="learn-evaluate" heading="1 · Scroll via Evaluation" desc={infiniteScrollLearnDesc.evaluate}>
            <LearnCodeBlock snippets={evaluate} />
          </DocSection>

          <DocSection id="learn-scrollIntoView" heading="2 · Scroll Into View" desc={infiniteScrollLearnDesc.scrollIntoView}>
            <LearnCodeBlock snippets={scrollIntoView} />
          </DocSection>

          <DocSection id="learn-methods" heading="Method Summary">
            <MethodSummaryTable rows={infiniteScrollMethodRows} />
          </DocSection>

          <DocSection id="learn-faq" heading="FAQ">
            <FaqBlock items={infiniteScrollFaq} />
          </DocSection>

        </main>
        <LearnToc items={infiniteScrollTocItems} />
      </div>
    </div>
  );
}
