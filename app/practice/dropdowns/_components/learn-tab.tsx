import {
  DocSection,
  FaqBlock,
  LearnCodeBlock,
  LearnToc,
  MethodSummaryTable,
} from "@/components/practice";
import {
  dropdownsFaq,
  dropdownsLearnDesc,
  dropdownsMethodRows,
  dropdownsTocItems,
} from "@/data/practice-data/dropdowns/learn";
import type { HighlightedLearnCodeSnippet } from "@/data/practice-data/types";

interface LearnTabProps {
  snippets: {
    visibleText: HighlightedLearnCodeSnippet;
    value: HighlightedLearnCodeSnippet;
    options: HighlightedLearnCodeSnippet;
    multi: HighlightedLearnCodeSnippet;
    custom: HighlightedLearnCodeSnippet;
    searchable: HighlightedLearnCodeSnippet;
  };
}

export function LearnTab({ snippets }: LearnTabProps) {
  const { visibleText, value, options, multi, custom, searchable } = snippets;

  return (
    <div className="mx-auto w-full max-w-[1280px] px-4 py-6 pb-16 sm:px-7 sm:py-8">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_200px] lg:gap-12">
        <main aria-label="Learn content" className="flex flex-col gap-5">
          <DocSection id="learn-overview" heading="Overview">
            <p className="text-[13px] leading-[1.6] text-muted-foreground">
              {dropdownsLearnDesc.overview}
            </p>
          </DocSection>

          <DocSection
            id="learn-visible-text"
            heading="1. Select by visible text"
            desc={dropdownsLearnDesc.visibleText}
          >
            <LearnCodeBlock snippets={visibleText} />
          </DocSection>

          <DocSection
            id="learn-value"
            heading="2. Select by value attribute"
            desc={dropdownsLearnDesc.value}
          >
            <LearnCodeBlock snippets={value} />
          </DocSection>

          <DocSection
            id="learn-options"
            heading="3. Select last option and read all options"
            desc={dropdownsLearnDesc.options}
          >
            <LearnCodeBlock snippets={options} />
          </DocSection>

          <DocSection
            id="learn-multi"
            heading="4. Multi-select dropdown"
            desc={dropdownsLearnDesc.multi}
          >
            <LearnCodeBlock snippets={multi} />
          </DocSection>

          <DocSection
            id="learn-custom"
            heading="5. Custom dropdown listbox"
            desc={dropdownsLearnDesc.custom}
          >
            <LearnCodeBlock snippets={custom} />
          </DocSection>

          <DocSection
            id="learn-searchable"
            heading="6. Searchable combobox"
            desc={dropdownsLearnDesc.searchable}
          >
            <LearnCodeBlock snippets={searchable} />
          </DocSection>

          <DocSection id="learn-methods" heading="Method Summary">
            <p className="mb-4 text-[13px] leading-[1.6] text-muted-foreground">
              Quick reference across Selenium, Playwright, and Cypress.
            </p>
            <MethodSummaryTable rows={dropdownsMethodRows} />
          </DocSection>

          <DocSection id="learn-faq" heading="FAQ">
            <FaqBlock items={dropdownsFaq} />
          </DocSection>
        </main>

        <LearnToc items={dropdownsTocItems} />
      </div>
    </div>
  );
}
