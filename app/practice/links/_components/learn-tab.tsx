import { DocSection, LearnCodeBlock, MethodSummaryTable, FaqBlock, LearnToc } from "@/components/practice";
import { linksLearnDesc, linksMethodRows, linksFaq, linksTocItems } from "@/data/practice-data/links/learn";
import type { HighlightedLearnCodeSnippet } from "@/data/practice-data/types";

interface LearnTabProps {
  snippets: {
    basic: HighlightedLearnCodeSnippet;
    status: HighlightedLearnCodeSnippet;
  };
}

export function LearnTab({ snippets }: LearnTabProps) {
  const { basic, status } = snippets;

  return (
    <div className="mx-auto w-full max-w-[1280px] px-4 py-6 pb-16 sm:px-7 sm:py-8">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_200px] lg:gap-12">
        <main aria-label="Learn content" className="flex flex-col gap-5">

          <DocSection id="learn-overview" heading="Overview">
            <p className="text-[13px] leading-[1.6] text-muted-foreground">
              {linksLearnDesc.overview}
            </p>
          </DocSection>

          <DocSection id="learn-basic" heading="1 · Internal & External" desc={linksLearnDesc.basic}>
            <LearnCodeBlock snippets={basic} />
          </DocSection>

          <DocSection id="learn-status" heading="2 · Checking Status Codes" desc={linksLearnDesc.status}>
            <LearnCodeBlock snippets={status} />
          </DocSection>

          <DocSection id="learn-methods" heading="Method Summary">
            <MethodSummaryTable rows={linksMethodRows} />
          </DocSection>

          <DocSection id="learn-faq" heading="FAQ">
            <FaqBlock items={linksFaq} />
          </DocSection>

        </main>
        <LearnToc items={linksTocItems} />
      </div>
    </div>
  );
}
