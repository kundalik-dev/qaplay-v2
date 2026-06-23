import { DocSection, LearnCodeBlock, MethodSummaryTable, FaqBlock, LearnToc } from "@/components/practice";
import {
  tabsWindowsLearnDesc,
  tabsWindowsMethodRows,
  tabsWindowsFaq,
  tabsWindowsTocItems,
} from "@/data/practice-data/tabs-windows/learn";
import type { HighlightedLearnCodeSnippet } from "@/data/practice-data/types";

interface LearnTabProps {
  snippets: {
    newTab: HighlightedLearnCodeSnippet;
    switch: HighlightedLearnCodeSnippet;
    popup:  HighlightedLearnCodeSnippet;
    close:  HighlightedLearnCodeSnippet;
  };
}

export function LearnTab({ snippets }: LearnTabProps) {
  const { newTab, switch: switchTab, popup, close } = snippets;

  return (
    <div className="mx-auto w-full max-w-[1280px] px-4 py-6 pb-16 sm:px-7 sm:py-8">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_200px] lg:gap-12">
        <main aria-label="Learn content" className="flex flex-col gap-5">

          <DocSection id="learn-overview" heading="Overview">
            <p className="text-[13px] leading-[1.6] text-muted-foreground">
              {tabsWindowsLearnDesc.overview}
            </p>
          </DocSection>

          <DocSection id="learn-new-tab" heading="1 · Open & Capture New Tab" desc={tabsWindowsLearnDesc.newTab}>
            <LearnCodeBlock snippets={newTab} />
          </DocSection>

          <DocSection id="learn-switch" heading="2 · Switch & Return" desc={tabsWindowsLearnDesc.switch}>
            <LearnCodeBlock snippets={switchTab} />
          </DocSection>

          <DocSection id="learn-popup" heading="3 · Popups (window.open)" desc={tabsWindowsLearnDesc.popup}>
            <LearnCodeBlock snippets={popup} />
          </DocSection>

          <DocSection id="learn-close" heading="4 · Close a Tab" desc={tabsWindowsLearnDesc.close}>
            <LearnCodeBlock snippets={close} />
          </DocSection>

          <DocSection id="learn-methods" heading="Method Summary">
            <MethodSummaryTable rows={tabsWindowsMethodRows} />
          </DocSection>

          <DocSection id="learn-faq" heading="FAQ">
            <FaqBlock items={tabsWindowsFaq} />
          </DocSection>

        </main>
        <LearnToc items={tabsWindowsTocItems} />
      </div>
    </div>
  );
}
