import {
  DocSection,
  LearnCodeBlock,
  MethodSummaryTable,
  FaqBlock,
  LearnToc,
} from "@/components/practice";
import {
  datePickerLearnDesc,
  datePickerMethodRows,
  datePickerFaq,
  datePickerTocItems,
} from "@/data/practice-data/date-picker/learn";
import type { HighlightedLearnCodeSnippet } from "@/data/practice-data/types";

interface LearnTabProps {
  snippets: {
    native: HighlightedLearnCodeSnippet;
    calendar: HighlightedLearnCodeSnippet;
    range: HighlightedLearnCodeSnippet;
    constraints: HighlightedLearnCodeSnippet;
  };
}

export function LearnTab({ snippets }: LearnTabProps) {
  const { native, calendar, range, constraints } = snippets;

  return (
    <div className="mx-auto w-full max-w-[1280px] px-4 py-6 pb-16 sm:px-7 sm:py-8">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_200px] lg:gap-12">
        <main aria-label="Learn content" className="flex flex-col gap-5">
          <DocSection id="learn-overview" heading="Overview">
            <p className="text-[13px] leading-[1.6] text-muted-foreground">
              {datePickerLearnDesc.overview}
            </p>
          </DocSection>

          <DocSection
            id="learn-native"
            heading="1 · Native Date Input"
            desc={datePickerLearnDesc.native}
          >
            <LearnCodeBlock snippets={native} />
          </DocSection>

          <DocSection
            id="learn-calendar"
            heading="2 · Calendar Widget"
            desc={datePickerLearnDesc.calendar}
          >
            <LearnCodeBlock snippets={calendar} />
          </DocSection>

          <DocSection
            id="learn-range"
            heading="3 · Date Range"
            desc={datePickerLearnDesc.range}
          >
            <LearnCodeBlock snippets={range} />
          </DocSection>

          <DocSection
            id="learn-constraints"
            heading="4 · Min / Max Constraints"
            desc={datePickerLearnDesc.constraints}
          >
            <LearnCodeBlock snippets={constraints} />
          </DocSection>

          <DocSection id="learn-methods" heading="Method Summary">
            <MethodSummaryTable rows={datePickerMethodRows} />
          </DocSection>

          <DocSection id="learn-faq" heading="FAQ">
            <FaqBlock items={datePickerFaq} />
          </DocSection>
        </main>
        <LearnToc items={datePickerTocItems} />
      </div>
    </div>
  );
}
