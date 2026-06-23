import { DocSection, LearnCodeBlock, MethodSummaryTable, FaqBlock, LearnToc } from "@/components/practice";
import {
  dragDropLearnDesc,
  dragDropMethodRows,
  dragDropFaq,
  dragDropTocItems,
} from "@/data/practice-data/drag-drop/learn";
import type { HighlightedLearnCodeSnippet } from "@/data/practice-data/types";

interface LearnTabProps {
  snippets: {
    basic:    HighlightedLearnCodeSnippet;
    locator:  HighlightedLearnCodeSnippet;
    mouse:    HighlightedLearnCodeSnippet;
    selenium: HighlightedLearnCodeSnippet;
  };
}

export function LearnTab({ snippets }: LearnTabProps) {
  const { basic, locator, mouse, selenium } = snippets;

  return (
    <div className="mx-auto w-full max-w-[1280px] px-4 py-6 pb-16 sm:px-7 sm:py-8">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_200px] lg:gap-12">
        <main aria-label="Learn content" className="flex flex-col gap-5">

          <DocSection id="learn-overview" heading="Overview">
            <p className="text-[13px] leading-[1.6] text-muted-foreground">
              {dragDropLearnDesc.overview}
            </p>
          </DocSection>

          <DocSection id="learn-basic" heading="1 · Basic dragAndDrop" desc={dragDropLearnDesc.basic}>
            <LearnCodeBlock snippets={basic} />
          </DocSection>

          <DocSection id="learn-locator" heading="2 · locator.dragTo()" desc={dragDropLearnDesc.locator}>
            <LearnCodeBlock snippets={locator} />
          </DocSection>

          <DocSection id="learn-mouse" heading="3 · Low-level mouse events" desc={dragDropLearnDesc.mouse}>
            <LearnCodeBlock snippets={mouse} />
          </DocSection>

          <DocSection id="learn-selenium" heading="4 · Selenium Actions API" desc={dragDropLearnDesc.selenium}>
            <LearnCodeBlock snippets={selenium} />
          </DocSection>

          <DocSection id="learn-methods" heading="Method Summary">
            <MethodSummaryTable rows={dragDropMethodRows} />
          </DocSection>

          <DocSection id="learn-faq" heading="FAQ">
            <FaqBlock items={dragDropFaq} />
          </DocSection>

        </main>
        <LearnToc items={dragDropTocItems} />
      </div>
    </div>
  );
}
