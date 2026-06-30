import {
  DocSection,
  LearnCodeBlock,
  MethodSummaryTable,
  FaqBlock,
  LearnToc,
} from "@/components/practice";
import {
  annotationsLearnDesc,
  annotationsMethodRows,
  annotationsFaq,
  annotationsTocItems,
} from "@/data/practice-data/annotations/learn";
import type { HighlightedLearnCodeSnippet } from "@/data/practice-data/types";

interface LearnTabProps {
  snippets: {
    snippet1: HighlightedLearnCodeSnippet;
    snippet2: HighlightedLearnCodeSnippet;
  };
}

export function LearnTab({ snippets }: LearnTabProps) {
  const { snippet1, snippet2 } = snippets;

  return (
    <div className="mx-auto w-full max-w-[1280px] px-4 py-6 pb-16 sm:px-7 sm:py-8">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_200px] lg:gap-12">
        <main aria-label="Learn content" className="flex flex-col gap-5">
          <DocSection id="learn-overview" heading="Overview">
            <p className="text-[13px] leading-[1.6] text-muted-foreground">
              {annotationsLearnDesc.overview}
            </p>
          </DocSection>

          <DocSection
            id="learn-skip"
            heading="1 · test.skip() — Conditional & Unconditional Skip"
            desc={annotationsLearnDesc.skip}
          >
            <LearnCodeBlock snippets={snippet1} />
          </DocSection>

          <DocSection
            id="learn-slow"
            heading="2 · test.slow() — Tripling the Timeout"
            desc={annotationsLearnDesc.slow}
          />

          <DocSection
            id="learn-fixme-fail"
            heading="3 · test.fixme() & test.fail() — Known Bugs"
            desc={annotationsLearnDesc.fixmeFail}
          >
            <LearnCodeBlock snippets={snippet2} />
          </DocSection>

          <DocSection
            id="learn-step"
            heading="4 · test.step() — Named Steps in Reports"
            desc={annotationsLearnDesc.step}
          />

          <DocSection
            id="learn-each"
            heading="5 · test.each() / @DataProvider — Parameterized Tests"
            desc={annotationsLearnDesc.each}
          />

          <DocSection id="learn-methods" heading="Method Summary">
            <p className="mb-4 text-[13px] leading-[1.6] text-muted-foreground">
              Quick reference across all three frameworks.
            </p>
            <MethodSummaryTable rows={annotationsMethodRows} />
          </DocSection>

          <DocSection id="learn-faq" heading="FAQ">
            <FaqBlock items={annotationsFaq} />
          </DocSection>
        </main>

        <LearnToc items={annotationsTocItems} />
      </div>
    </div>
  );
}
