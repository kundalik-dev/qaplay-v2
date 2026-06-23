import { DocSection, LearnCodeBlock, MethodSummaryTable, FaqBlock, LearnToc } from "@/components/practice";
import {
  iframesLearnDesc,
  iframesMethodRows,
  iframesFaq,
  iframesTocItems,
} from "@/data/practice-data/iframes/learn";
import type { HighlightedLearnCodeSnippet } from "@/data/practice-data/types";

interface LearnTabProps {
  snippets: {
    basic:   HighlightedLearnCodeSnippet;
    nested:  HighlightedLearnCodeSnippet;
    locate:  HighlightedLearnCodeSnippet;
    dynamic: HighlightedLearnCodeSnippet;
  };
}

export function LearnTab({ snippets }: LearnTabProps) {
  const { basic, nested, locate, dynamic } = snippets;

  return (
    <div className="mx-auto w-full max-w-[1280px] px-4 py-6 pb-16 sm:px-7 sm:py-8">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_200px] lg:gap-12">
        <main aria-label="Learn content" className="flex flex-col gap-5">

          <DocSection id="learn-overview" heading="Overview">
            <p className="text-[13px] leading-[1.6] text-muted-foreground">
              {iframesLearnDesc.overview}
            </p>
          </DocSection>

          <DocSection id="learn-basic" heading="1 · frameLocator basics" desc={iframesLearnDesc.basic}>
            <LearnCodeBlock snippets={basic} />
          </DocSection>

          <DocSection id="learn-nested" heading="2 · Nested iframes" desc={iframesLearnDesc.nested}>
            <LearnCodeBlock snippets={nested} />
          </DocSection>

          <DocSection id="learn-locate" heading="3 · Locate by name & title" desc={iframesLearnDesc.locate}>
            <LearnCodeBlock snippets={locate} />
          </DocSection>

          <DocSection id="learn-dynamic" heading="4 · Dynamic iframe content" desc={iframesLearnDesc.dynamic}>
            <LearnCodeBlock snippets={dynamic} />
          </DocSection>

          <DocSection id="learn-methods" heading="Method Summary">
            <MethodSummaryTable rows={iframesMethodRows} />
          </DocSection>

          <DocSection id="learn-faq" heading="FAQ">
            <FaqBlock items={iframesFaq} />
          </DocSection>

        </main>
        <LearnToc items={iframesTocItems} />
      </div>
    </div>
  );
}
