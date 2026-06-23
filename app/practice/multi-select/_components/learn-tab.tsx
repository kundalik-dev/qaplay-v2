import { DocSection, LearnCodeBlock, MethodSummaryTable, FaqBlock, LearnToc } from "@/components/practice";
import {
  multiSelectLearnDesc,
  multiSelectMethodRows,
  multiSelectFaq,
  multiSelectTocItems,
} from "@/data/practice-data/multi-select/learn";
import type { HighlightedLearnCodeSnippet } from "@/data/practice-data/types";

interface LearnTabProps {
  snippets: {
    native:     HighlightedLearnCodeSnippet;
    custom:     HighlightedLearnCodeSnippet;
    tags:       HighlightedLearnCodeSnippet;
    searchable: HighlightedLearnCodeSnippet;
  };
}

export function LearnTab({ snippets }: LearnTabProps) {
  const { native, custom, tags, searchable } = snippets;

  return (
    <div className="mx-auto w-full max-w-[1280px] px-4 py-6 pb-16 sm:px-7 sm:py-8">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_200px] lg:gap-12">
        <main aria-label="Learn content" className="flex flex-col gap-5">

          <DocSection id="learn-overview" heading="Overview">
            <p className="text-[13px] leading-[1.6] text-muted-foreground">
              {multiSelectLearnDesc.overview}
            </p>
          </DocSection>

          <DocSection id="learn-native" heading="1 · Native selectOption" desc={multiSelectLearnDesc.native}>
            <LearnCodeBlock snippets={native} />
          </DocSection>

          <DocSection id="learn-custom" heading="2 · Custom Checkbox Dropdown" desc={multiSelectLearnDesc.custom}>
            <LearnCodeBlock snippets={custom} />
          </DocSection>

          <DocSection id="learn-tags" heading="3 · Tag / Pill Removal" desc={multiSelectLearnDesc.tags}>
            <LearnCodeBlock snippets={tags} />
          </DocSection>

          <DocSection id="learn-searchable" heading="4 · Searchable Multi-Select" desc={multiSelectLearnDesc.searchable}>
            <LearnCodeBlock snippets={searchable} />
          </DocSection>

          <DocSection id="learn-methods" heading="Method Summary">
            <MethodSummaryTable rows={multiSelectMethodRows} />
          </DocSection>

          <DocSection id="learn-faq" heading="FAQ">
            <FaqBlock items={multiSelectFaq} />
          </DocSection>

        </main>
        <LearnToc items={multiSelectTocItems} />
      </div>
    </div>
  );
}
