import {
  DocSection,
  LearnCodeBlock,
  MethodSummaryTable,
  FaqBlock,
  LearnToc,
} from "@/components/practice";
import {
  buttonsLearnDesc,
  buttonsMethodRows,
  buttonsFaq,
  buttonsTocItems,
} from "@/data/practice-data/buttons/learn";
import type { HighlightedLearnCodeSnippet } from "@/data/practice-data/types";

interface LearnTabProps {
  snippets: {
    single: HighlightedLearnCodeSnippet;
    double: HighlightedLearnCodeSnippet;
    right: HighlightedLearnCodeSnippet;
    disabled: HighlightedLearnCodeSnippet;
    text: HighlightedLearnCodeSnippet;
    keyboard: HighlightedLearnCodeSnippet;
  };
}

export function LearnTab({ snippets }: LearnTabProps) {
  const { single, double, right, disabled, text, keyboard } = snippets;

  return (
    <div className="mx-auto w-full max-w-[1280px] px-4 py-6 pb-16 sm:px-7 sm:py-8">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_200px] lg:gap-12">
        {/* ── Main doc content ─────────────────────────────────────────── */}
        <main aria-label="Learn content" className="flex flex-col gap-5">
          {/* Overview */}
          <DocSection id="learn-overview" heading="Overview">
            <p className="text-[13px] leading-[1.6] text-muted-foreground">
              {buttonsLearnDesc.overview}
            </p>
          </DocSection>

          {/* 1 · Single Click */}
          <DocSection
            id="learn-single"
            heading="1 · Single Click"
            desc={buttonsLearnDesc.single}
          >
            <LearnCodeBlock snippets={single} />
          </DocSection>

          {/* 2 · Double Click */}
          <DocSection
            id="learn-double"
            heading="2 · Double Click"
            desc={buttonsLearnDesc.double}
          >
            <LearnCodeBlock snippets={double} />
          </DocSection>

          {/* 3 · Right Click */}
          <DocSection
            id="learn-right"
            heading="3 · Right Click"
            desc={buttonsLearnDesc.right}
          >
            <LearnCodeBlock snippets={right} />
          </DocSection>

          {/* 4 · Disabled State */}
          <DocSection
            id="learn-disabled"
            heading="4 · Disabled State"
            desc={buttonsLearnDesc.disabled}
          >
            <LearnCodeBlock snippets={disabled} />
          </DocSection>

          {/* 5 · Text Change */}
          <DocSection
            id="learn-text"
            heading="5 · Text Change"
            desc={buttonsLearnDesc.text}
          >
            <LearnCodeBlock snippets={text} />
          </DocSection>

          {/* 6 · Keyboard Enter */}
          <DocSection
            id="learn-keyboard"
            heading="6 · Keyboard Enter"
            desc={buttonsLearnDesc.keyboard}
          >
            <LearnCodeBlock snippets={keyboard} />
          </DocSection>

          {/* Method Summary */}
          <DocSection id="learn-methods" heading="Method Summary">
            <p className="mb-4 text-[13px] leading-[1.6] text-muted-foreground">
              Quick reference across all three frameworks.
            </p>
            <MethodSummaryTable rows={buttonsMethodRows} />
          </DocSection>

          {/* FAQ */}
          <DocSection id="learn-faq" heading="FAQ">
            <FaqBlock items={buttonsFaq} />
          </DocSection>
        </main>

        {/* ── Right TOC ─────────────────────────────────────────────────── */}
        <LearnToc items={buttonsTocItems} />
      </div>
    </div>
  );
}
