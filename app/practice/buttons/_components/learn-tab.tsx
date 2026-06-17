import { DocSection, LearnCodeBlock, MethodSummaryTable, FaqBlock, LearnToc } from "@/components/practice";
import {
  buttonsLearnDesc,
  buttonsLearnCode,
  buttonsMethodRows,
  buttonsFaq,
  buttonsTocItems,
} from "@/data/practice-data/buttons/learn";

export function LearnTab() {
  return (
    <div className="w-full max-w-[1280px] mx-auto px-7 py-8 pb-16">
      <div className="grid gap-12" style={{ gridTemplateColumns: "1fr 200px" }}>

        {/* ── Main doc content ─────────────────────────────────────────── */}
        <main aria-label="Learn content" className="flex flex-col gap-5">

          {/* Overview */}
          <DocSection id="learn-overview" heading="Overview">
            <p className="text-[13px] text-muted-foreground leading-[1.6]">
              {buttonsLearnDesc.overview}
            </p>
          </DocSection>

          {/* 1 · Single Click */}
          <DocSection
            id="learn-single"
            heading="1 · Single Click"
            desc={buttonsLearnDesc.single}
          >
            <LearnCodeBlock snippets={buttonsLearnCode.single} />
          </DocSection>

          {/* 2 · Double Click */}
          <DocSection
            id="learn-double"
            heading="2 · Double Click"
            desc={buttonsLearnDesc.double}
          >
            <LearnCodeBlock snippets={buttonsLearnCode.double} />
          </DocSection>

          {/* 3 · Right Click */}
          <DocSection
            id="learn-right"
            heading="3 · Right Click"
            desc={buttonsLearnDesc.right}
          >
            <LearnCodeBlock snippets={buttonsLearnCode.right} />
          </DocSection>

          {/* 4 · Disabled State */}
          <DocSection
            id="learn-disabled"
            heading="4 · Disabled State"
            desc={buttonsLearnDesc.disabled}
          >
            <LearnCodeBlock snippets={buttonsLearnCode.disabled} />
          </DocSection>

          {/* 5 · Text Change */}
          <DocSection
            id="learn-text"
            heading="5 · Text Change"
            desc={buttonsLearnDesc.text}
          >
            <LearnCodeBlock snippets={buttonsLearnCode.text} />
          </DocSection>

          {/* 6 · Keyboard Enter */}
          <DocSection
            id="learn-keyboard"
            heading="6 · Keyboard Enter"
            desc={buttonsLearnDesc.keyboard}
          >
            <LearnCodeBlock snippets={buttonsLearnCode.keyboard} />
          </DocSection>

          {/* Method Summary */}
          <DocSection id="learn-methods" heading="Method Summary">
            <p className="text-[13px] text-muted-foreground leading-[1.6] mb-4">
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
