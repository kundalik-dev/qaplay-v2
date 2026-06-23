import {
  DocSection,
  LearnCodeBlock,
  MethodSummaryTable,
  FaqBlock,
  LearnToc,
} from "@/components/practice";
import {
  dynamicWaitsLearnDesc,
  dynamicWaitsMethodRows,
  dynamicWaitsFaq,
  dynamicWaitsTocItems,
} from "@/data/practice-data/dynamic-waits/learn";
import type { HighlightedLearnCodeSnippet } from "@/data/practice-data/types";

interface LearnTabProps {
  snippets: {
    selector: HighlightedLearnCodeSnippet;
    function: HighlightedLearnCodeSnippet;
    state: HighlightedLearnCodeSnippet;
    selenium: HighlightedLearnCodeSnippet;
  };
}

export function LearnTab({ snippets }: LearnTabProps) {
  const { selector, function: fn, state, selenium } = snippets;

  return (
    <div className="mx-auto w-full max-w-[1280px] px-4 py-6 pb-16 sm:px-7 sm:py-8">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_200px] lg:gap-12">
        <main aria-label="Learn content" className="flex flex-col gap-5">
          <DocSection id="learn-overview" heading="Overview">
            <p className="text-[13px] leading-[1.6] text-muted-foreground">
              {dynamicWaitsLearnDesc.overview}
            </p>
          </DocSection>

          <DocSection
            id="learn-selector"
            heading="1 · waitForSelector"
            desc={dynamicWaitsLearnDesc.selector}
          >
            <LearnCodeBlock snippets={selector} />
          </DocSection>

          <DocSection
            id="learn-function"
            heading="2 · waitForFunction"
            desc={dynamicWaitsLearnDesc.function}
          >
            <LearnCodeBlock snippets={fn} />
          </DocSection>

          <DocSection
            id="learn-state"
            heading="3 · Element State Waits"
            desc={dynamicWaitsLearnDesc.state}
          >
            <LearnCodeBlock snippets={state} />
          </DocSection>

          <DocSection
            id="learn-selenium"
            heading="4 · Selenium WebDriverWait"
            desc={dynamicWaitsLearnDesc.selenium}
          >
            <LearnCodeBlock snippets={selenium} />
          </DocSection>

          <DocSection id="learn-methods" heading="Method Summary">
            <MethodSummaryTable rows={dynamicWaitsMethodRows} />
          </DocSection>

          <DocSection id="learn-faq" heading="FAQ">
            <FaqBlock items={dynamicWaitsFaq} />
          </DocSection>
        </main>
        <LearnToc items={dynamicWaitsTocItems} />
      </div>
    </div>
  );
}
