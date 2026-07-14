import {
  DocSection,
  LearnCodeBlock,
  MethodSummaryTable,
  FaqBlock,
  LearnToc,
} from "@/components/practice";
import {
  dialogsLearnDesc,
  dialogsMethodRows,
  dialogsFaq,
  dialogsTocItems,
} from "@/data/ui-practice-data/dialogs";
import type { HighlightedLearnCodeSnippet } from "@/data/practice-data/types";

interface DialogLearnTabProps {
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

/**
 * Learn content for /ui-practice/dialog/learn. Mirrors the structure of
 * app/practice/buttons/_components/learn-tab.tsx (DocSection +
 * LearnCodeBlock + MethodSummaryTable + FaqBlock + LearnToc), sourced
 * from data/ui-practice-data/dialogs/learn.ts. Stays a sync Server
 * Component - all syntax-highlighting happens in learn/page.tsx and is
 * passed in as pre-highlighted `snippets` props (see CLAUDE.md
 * server/client boundary rule).
 */
export function DialogLearnTab({ snippets }: DialogLearnTabProps) {
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
        {/* ── Main doc content ─────────────────────────────────────────── */}
        <main aria-label="Learn content" className="flex flex-col gap-5">
          {/* Overview */}
          <DocSection id="learn-overview" heading="Overview">
            <p className="text-[13px] leading-[1.6] text-muted-foreground">
              {dialogsLearnDesc.overview}
            </p>
          </DocSection>

          {/* 1 · Open & Verify */}
          <DocSection
            id="learn-open-verify"
            heading="1 · Open & Verify"
            desc={dialogsLearnDesc.openVerify}
          >
            <LearnCodeBlock snippets={openVerify} />
          </DocSection>

          {/* 2 · Close via Button */}
          <DocSection
            id="learn-close-button"
            heading="2 · Close via Button"
            desc={dialogsLearnDesc.closeButton}
          >
            <LearnCodeBlock snippets={closeButton} />
          </DocSection>

          {/* 3 · Confirm Action */}
          <DocSection
            id="learn-confirm"
            heading="3 · Confirm Action"
            desc={dialogsLearnDesc.confirm}
          >
            <LearnCodeBlock snippets={confirm} />
          </DocSection>

          {/* 4 · Aria-Label Targeting */}
          <DocSection
            id="learn-aria-label"
            heading="4 · Aria-Label Targeting"
            desc={dialogsLearnDesc.ariaLabel}
          >
            <LearnCodeBlock snippets={ariaLabel} />
          </DocSection>

          {/* 5 · Backdrop Click */}
          <DocSection
            id="learn-backdrop"
            heading="5 · Backdrop Click"
            desc={dialogsLearnDesc.backdrop}
          >
            <LearnCodeBlock snippets={backdrop} />
          </DocSection>

          {/* 6 · Escape Key */}
          <DocSection
            id="learn-escape"
            heading="6 · Escape Key"
            desc={dialogsLearnDesc.escape}
          >
            <LearnCodeBlock snippets={escape} />
          </DocSection>

          {/* 7 · Scoped Locators */}
          <DocSection
            id="learn-scoped"
            heading="7 · Scoped Locators"
            desc={dialogsLearnDesc.scoped}
          >
            <LearnCodeBlock snippets={scoped} />
          </DocSection>

          {/* Method Summary */}
          <DocSection id="learn-methods" heading="Method Summary">
            <p className="mb-4 text-[13px] leading-[1.6] text-muted-foreground">
              Quick reference across all three frameworks.
            </p>
            <MethodSummaryTable rows={dialogsMethodRows} />
          </DocSection>

          {/* FAQ */}
          <DocSection id="learn-faq" heading="FAQ">
            <FaqBlock items={dialogsFaq} />
          </DocSection>
        </main>

        {/* ── Right TOC ─────────────────────────────────────────────────── */}
        <LearnToc items={dialogsTocItems} />
      </div>
    </div>
  );
}
