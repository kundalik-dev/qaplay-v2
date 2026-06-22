import {
  DocSection,
  LearnCodeBlock,
  MethodSummaryTable,
  FaqBlock,
  LearnToc,
} from "@/components/practice";
import {
  alertsDialogsLearnDesc,
  alertsDialogsMethodRows,
  alertsDialogsFaq,
  alertsDialogsTocItems,
} from "@/data/practice-data/alerts-dialogs/learn";
import type { HighlightedLearnCodeSnippet } from "@/data/practice-data/types";

interface LearnTabProps {
  snippets: {
    openVerify: HighlightedLearnCodeSnippet;
    closeButton: HighlightedLearnCodeSnippet;
    confirm: HighlightedLearnCodeSnippet;
    ariaLabel: HighlightedLearnCodeSnippet;
    backdrop: HighlightedLearnCodeSnippet;
    escape: HighlightedLearnCodeSnippet;
    scoped: HighlightedLearnCodeSnippet;
  };
}

export function LearnTab({ snippets }: LearnTabProps) {
  const {
    openVerify,
    closeButton,
    confirm,
    ariaLabel,
    backdrop,
    escape,
    scoped,
  } = snippets;

  return (
    <div className="mx-auto w-full max-w-[1280px] px-4 py-6 pb-16 sm:px-7 sm:py-8">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_200px] lg:gap-12">
        <main aria-label="Learn content" className="flex flex-col gap-5">
          <DocSection id="learn-overview" heading="Overview">
            <p className="text-[13px] leading-[1.6] text-muted-foreground">
              {alertsDialogsLearnDesc.overview}
            </p>
          </DocSection>

          <DocSection
            id="learn-open-verify"
            heading="1 · Open & Verify"
            desc={alertsDialogsLearnDesc.openVerify}
          >
            <LearnCodeBlock snippets={openVerify} />
          </DocSection>

          <DocSection
            id="learn-close-button"
            heading="2 · Close via Button"
            desc={alertsDialogsLearnDesc.closeButton}
          >
            <LearnCodeBlock snippets={closeButton} />
          </DocSection>

          <DocSection
            id="learn-confirm"
            heading="3 · Confirm Action"
            desc={alertsDialogsLearnDesc.confirm}
          >
            <LearnCodeBlock snippets={confirm} />
          </DocSection>

          <DocSection
            id="learn-aria-label"
            heading="4 · Aria-Label Targeting"
            desc={alertsDialogsLearnDesc.ariaLabel}
          >
            <LearnCodeBlock snippets={ariaLabel} />
          </DocSection>

          <DocSection
            id="learn-backdrop"
            heading="5 · Backdrop Click"
            desc={alertsDialogsLearnDesc.backdrop}
          >
            <LearnCodeBlock snippets={backdrop} />
          </DocSection>

          <DocSection
            id="learn-escape"
            heading="6 · Escape Key"
            desc={alertsDialogsLearnDesc.escape}
          >
            <LearnCodeBlock snippets={escape} />
          </DocSection>

          <DocSection
            id="learn-scoped"
            heading="7 · Scoped Locators"
            desc={alertsDialogsLearnDesc.scoped}
          >
            <LearnCodeBlock snippets={scoped} />
          </DocSection>

          <DocSection id="learn-methods" heading="Method Summary">
            <p className="mb-4 text-[13px] leading-[1.6] text-muted-foreground">
              Quick reference across all three frameworks.
            </p>
            <MethodSummaryTable rows={alertsDialogsMethodRows} />
          </DocSection>

          <DocSection id="learn-faq" heading="FAQ">
            <FaqBlock items={alertsDialogsFaq} />
          </DocSection>
        </main>

        <LearnToc items={alertsDialogsTocItems} />
      </div>
    </div>
  );
}
