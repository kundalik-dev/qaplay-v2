import {
  DocSection,
  LearnCodeBlock,
  MethodSummaryTable,
  FaqBlock,
  LearnToc,
} from "@/components/practice";
import {
  formsLearnDesc,
  formsLearnCode,
  formsMethodRows,
  formsFaq,
  formsTocItems,
} from "@/data/practice-data/forms/learn";
import { highlightLearnSnippet } from "@/lib/highlight";

export async function LearnTab() {
  const [fillText, dob, radio, country, checkboxes, password, terms, errors] =
    await Promise.all([
      highlightLearnSnippet(formsLearnCode.fillText),
      highlightLearnSnippet(formsLearnCode.dob),
      highlightLearnSnippet(formsLearnCode.radio),
      highlightLearnSnippet(formsLearnCode.country),
      highlightLearnSnippet(formsLearnCode.checkboxes),
      highlightLearnSnippet(formsLearnCode.password),
      highlightLearnSnippet(formsLearnCode.terms),
      highlightLearnSnippet(formsLearnCode.errors),
    ]);

  return (
    <div className="mx-auto w-full max-w-[1280px] px-4 py-6 pb-16 sm:px-7 sm:py-8">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_200px] lg:gap-12">
        {/* ── Main doc content ─────────────────────────────────────────── */}
        <main aria-label="Learn content" className="flex flex-col gap-5">
          <DocSection id="learn-overview" heading="Overview">
            <p className="text-[13px] leading-[1.6] text-muted-foreground">
              {formsLearnDesc.overview}
            </p>
          </DocSection>

          <DocSection
            id="learn-fill-text"
            heading="1 · Fill Text Inputs"
            desc={formsLearnDesc.fillText}
          >
            <LearnCodeBlock snippets={fillText} />
          </DocSection>

          <DocSection
            id="learn-dob"
            heading="2 · Fill Date of Birth"
            desc={formsLearnDesc.dob}
          >
            <LearnCodeBlock snippets={dob} />
          </DocSection>

          <DocSection
            id="learn-radio"
            heading="3 · Select Radio Button (Gender)"
            desc={formsLearnDesc.radio}
          >
            <LearnCodeBlock snippets={radio} />
          </DocSection>

          <DocSection
            id="learn-country"
            heading="4 · Select Country from Dropdown"
            desc={formsLearnDesc.country}
          >
            <LearnCodeBlock snippets={country} />
          </DocSection>

          <DocSection
            id="learn-checkboxes"
            heading="5 · Check Interest Checkboxes"
            desc={formsLearnDesc.checkboxes}
          >
            <LearnCodeBlock snippets={checkboxes} />
          </DocSection>

          <DocSection
            id="learn-password"
            heading="6 · Fill Password & Confirm Password"
            desc={formsLearnDesc.password}
          >
            <LearnCodeBlock snippets={password} />
          </DocSection>

          <DocSection
            id="learn-terms"
            heading="7 · Accept Terms &amp; Submit"
            desc={formsLearnDesc.terms}
          >
            <LearnCodeBlock snippets={terms} />
          </DocSection>

          <DocSection
            id="learn-errors"
            heading="8 · Assert Validation Errors"
            desc={formsLearnDesc.errors}
          >
            <LearnCodeBlock snippets={errors} />
          </DocSection>

          <DocSection id="learn-methods" heading="Method Summary">
            <p className="mb-4 text-[13px] leading-[1.6] text-muted-foreground">
              Quick reference across all three frameworks.
            </p>
            <MethodSummaryTable rows={formsMethodRows} />
          </DocSection>

          <DocSection id="learn-faq" heading="FAQ">
            <FaqBlock items={formsFaq} />
          </DocSection>
        </main>

        {/* ── Right TOC ─────────────────────────────────────────────────── */}
        <LearnToc items={formsTocItems} />
      </div>
    </div>
  );
}
