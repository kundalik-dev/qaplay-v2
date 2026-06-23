import { DocSection, LearnCodeBlock, MethodSummaryTable, FaqBlock, LearnToc } from "@/components/practice";
import {
  radioCheckboxLearnDesc,
  radioCheckboxMethodRows,
  radioCheckboxFaq,
  radioCheckboxTocItems,
} from "@/data/practice-data/radio-checkbox/learn";
import type { HighlightedLearnCodeSnippet } from "@/data/practice-data/types";

interface LearnTabProps {
  snippets: {
    checkbox: HighlightedLearnCodeSnippet;
    radio:    HighlightedLearnCodeSnippet;
    assert:   HighlightedLearnCodeSnippet;
    disabled: HighlightedLearnCodeSnippet;
  };
}

export function LearnTab({ snippets }: LearnTabProps) {
  const { checkbox, radio, assert, disabled } = snippets;

  return (
    <div className="mx-auto w-full max-w-[1280px] px-4 py-6 pb-16 sm:px-7 sm:py-8">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_200px] lg:gap-12">
        <main aria-label="Learn content" className="flex flex-col gap-5">

          <DocSection id="learn-overview" heading="Overview">
            <p className="text-[13px] leading-[1.6] text-muted-foreground">
              {radioCheckboxLearnDesc.overview}
            </p>
          </DocSection>

          <DocSection id="learn-checkbox" heading="1 · Check / Uncheck" desc={radioCheckboxLearnDesc.checkbox}>
            <LearnCodeBlock snippets={checkbox} />
          </DocSection>

          <DocSection id="learn-radio" heading="2 · Radio Groups" desc={radioCheckboxLearnDesc.radio}>
            <LearnCodeBlock snippets={radio} />
          </DocSection>

          <DocSection id="learn-assert" heading="3 · Assert State" desc={radioCheckboxLearnDesc.assert}>
            <LearnCodeBlock snippets={assert} />
          </DocSection>

          <DocSection id="learn-disabled" heading="4 · Disabled Controls" desc={radioCheckboxLearnDesc.disabled}>
            <LearnCodeBlock snippets={disabled} />
          </DocSection>

          <DocSection id="learn-methods" heading="Method Summary">
            <MethodSummaryTable rows={radioCheckboxMethodRows} />
          </DocSection>

          <DocSection id="learn-faq" heading="FAQ">
            <FaqBlock items={radioCheckboxFaq} />
          </DocSection>

        </main>
        <LearnToc items={radioCheckboxTocItems} />
      </div>
    </div>
  );
}
