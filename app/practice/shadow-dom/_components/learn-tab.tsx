import {
  DocSection,
  LearnCodeBlock,
  MethodSummaryTable,
  FaqBlock,
  LearnToc,
} from "@/components/practice";
import {
  shadowDomLearnDesc,
  shadowDomMethodRows,
  shadowDomFaq,
  shadowDomTocItems,
} from "@/data/practice-data/shadow-dom/learn";
import type { HighlightedLearnCodeSnippet } from "@/data/practice-data/types";

interface LearnTabProps {
  snippets: {
    basic: HighlightedLearnCodeSnippet;
    nested: HighlightedLearnCodeSnippet;
    evaluate: HighlightedLearnCodeSnippet;
    closed: HighlightedLearnCodeSnippet;
  };
}

export function LearnTab({ snippets }: LearnTabProps) {
  const { basic, nested, evaluate, closed } = snippets;

  return (
    <div className="mx-auto w-full max-w-[1280px] px-4 py-6 pb-16 sm:px-7 sm:py-8">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_200px] lg:gap-12">
        <main aria-label="Learn content" className="flex flex-col gap-5">
          <DocSection id="learn-overview" heading="Overview">
            <p className="text-[13px] leading-[1.6] text-muted-foreground">
              {shadowDomLearnDesc.overview}
            </p>
          </DocSection>

          <DocSection
            id="learn-basic"
            heading="1 · Basic shadow root"
            desc={shadowDomLearnDesc.basic}
          >
            <LearnCodeBlock snippets={basic} />
          </DocSection>

          <DocSection
            id="learn-nested"
            heading="2 · Nested shadow DOM"
            desc={shadowDomLearnDesc.nested}
          >
            <LearnCodeBlock snippets={nested} />
          </DocSection>

          <DocSection
            id="learn-evaluate"
            heading="3 · evaluate() pattern"
            desc={shadowDomLearnDesc.evaluate}
          >
            <LearnCodeBlock snippets={evaluate} />
          </DocSection>

          <DocSection
            id="learn-closed"
            heading="4 · Closed shadow roots"
            desc={shadowDomLearnDesc.closed}
          >
            <LearnCodeBlock snippets={closed} />
          </DocSection>

          <DocSection id="learn-methods" heading="Method Summary">
            <MethodSummaryTable rows={shadowDomMethodRows} />
          </DocSection>

          <DocSection id="learn-faq" heading="FAQ">
            <FaqBlock items={shadowDomFaq} />
          </DocSection>
        </main>
        <LearnToc items={shadowDomTocItems} />
      </div>
    </div>
  );
}
