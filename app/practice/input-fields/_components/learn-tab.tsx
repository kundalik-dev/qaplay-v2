import {
  DocSection,
  LearnCodeBlock,
  MethodSummaryTable,
  FaqBlock,
  LearnToc,
} from "@/components/practice";
import {
  inputFieldsLearnDesc,
  inputFieldsLearnCode,
  inputFieldsMethodRows,
  inputFieldsFaq,
  inputFieldsTocItems,
} from "@/data/practice-data/input-fields/learn";

export function LearnTab() {
  return (
    <div className="mx-auto w-full max-w-[1280px] px-4 py-6 pb-16 sm:px-7 sm:py-8">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_200px] lg:gap-12">
        {/* ── Main doc content ─────────────────────────────────────────── */}
        <main aria-label="Learn content" className="flex flex-col gap-5">
          {/* Overview */}
          <DocSection id="learn-overview" heading="Overview">
            <p className="text-[13px] leading-[1.6] text-muted-foreground">
              {inputFieldsLearnDesc.overview}
            </p>
          </DocSection>

          {/* 1 · Typing Text */}
          <DocSection
            id="learn-type"
            heading="1 · Typing Text"
            desc={inputFieldsLearnDesc.type}
          >
            <LearnCodeBlock snippets={inputFieldsLearnCode.type} />
          </DocSection>

          {/* 2 · Append & Tab */}
          <DocSection
            id="learn-append"
            heading="2 · Append & Tab"
            desc={inputFieldsLearnDesc.append}
          >
            <LearnCodeBlock snippets={inputFieldsLearnCode.append} />
          </DocSection>

          {/* 3 · Read Value */}
          <DocSection
            id="learn-read"
            heading="3 · Read Value"
            desc={inputFieldsLearnDesc.read}
          >
            <LearnCodeBlock snippets={inputFieldsLearnCode.read} />
          </DocSection>

          {/* 4 · Clear Field */}
          <DocSection
            id="learn-clear"
            heading="4 · Clear Field"
            desc={inputFieldsLearnDesc.clear}
          >
            <LearnCodeBlock snippets={inputFieldsLearnCode.clear} />
          </DocSection>

          {/* 5 · Disabled State */}
          <DocSection
            id="learn-disabled"
            heading="5 · Disabled State"
            desc={inputFieldsLearnDesc.disabled}
          >
            <LearnCodeBlock snippets={inputFieldsLearnCode.disabled} />
          </DocSection>

          {/* 6 · Readonly State */}
          <DocSection
            id="learn-readonly"
            heading="6 · Readonly State"
            desc={inputFieldsLearnDesc.readonly}
          >
            <LearnCodeBlock snippets={inputFieldsLearnCode.readonly} />
          </DocSection>

          {/* Method Summary */}
          <DocSection id="learn-methods" heading="Method Summary">
            <p className="mb-4 text-[13px] leading-[1.6] text-muted-foreground">
              Quick reference across all three frameworks.
            </p>
            <MethodSummaryTable rows={inputFieldsMethodRows} />
          </DocSection>

          {/* FAQ */}
          <DocSection id="learn-faq" heading="FAQ">
            <FaqBlock items={inputFieldsFaq} />
          </DocSection>
        </main>

        {/* ── Right TOC ─────────────────────────────────────────────────── */}
        <LearnToc items={inputFieldsTocItems} />
      </div>
    </div>
  );
}
