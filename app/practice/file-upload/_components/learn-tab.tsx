import {
  DocSection,
  LearnCodeBlock,
  MethodSummaryTable,
  FaqBlock,
  LearnToc,
} from "@/components/practice";
import {
  fileUploadLearnDesc,
  fileUploadMethodRows,
  fileUploadFaq,
  fileUploadTocItems,
} from "@/data/practice-data/file-upload/learn";
import type { HighlightedLearnCodeSnippet } from "@/data/practice-data/types";

interface LearnTabProps {
  snippets: {
    native: HighlightedLearnCodeSnippet;
    dragdrop: HighlightedLearnCodeSnippet;
    hidden: HighlightedLearnCodeSnippet;
    validate: HighlightedLearnCodeSnippet;
  };
}

export function LearnTab({ snippets }: LearnTabProps) {
  const { native, dragdrop, hidden, validate } = snippets;

  return (
    <div className="mx-auto w-full max-w-[1280px] px-4 py-6 pb-16 sm:px-7 sm:py-8">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_200px] lg:gap-12">
        <main aria-label="Learn content" className="flex flex-col gap-5">
          <DocSection id="learn-overview" heading="Overview">
            <p className="text-[13px] leading-[1.6] text-muted-foreground">
              {fileUploadLearnDesc.overview}
            </p>
          </DocSection>

          <DocSection
            id="learn-native"
            heading="1 · setInputFiles"
            desc={fileUploadLearnDesc.native}
          >
            <LearnCodeBlock snippets={native} />
          </DocSection>

          <DocSection
            id="learn-dragdrop"
            heading="2 · Drag & Drop"
            desc={fileUploadLearnDesc.dragdrop}
          >
            <LearnCodeBlock snippets={dragdrop} />
          </DocSection>

          <DocSection
            id="learn-hidden"
            heading="3 · Hidden File Inputs"
            desc={fileUploadLearnDesc.hidden}
          >
            <LearnCodeBlock snippets={hidden} />
          </DocSection>

          <DocSection
            id="learn-validate"
            heading="4 · Validation Assertions"
            desc={fileUploadLearnDesc.validate}
          >
            <LearnCodeBlock snippets={validate} />
          </DocSection>

          <DocSection id="learn-methods" heading="Method Summary">
            <MethodSummaryTable rows={fileUploadMethodRows} />
          </DocSection>

          <DocSection id="learn-faq" heading="FAQ">
            <FaqBlock items={fileUploadFaq} />
          </DocSection>
        </main>
        <LearnToc items={fileUploadTocItems} />
      </div>
    </div>
  );
}
