import {
  DocSection,
  LearnCodeBlock,
  MethodSummaryTable,
  FaqBlock,
  LearnToc,
} from "@/components/practice";
import {
  tablesLearnDesc,
  tablesMethodRows,
  tablesFaq,
  tablesTocItems,
} from "@/data/ui-practice-data/tables";
import type { HighlightedLearnCodeSnippet } from "@/data/practice-data/types";

interface TablesLearnTabProps {
  snippets: {
    static: HighlightedLearnCodeSnippet;
    sortable: HighlightedLearnCodeSnippet;
    searchFilter: HighlightedLearnCodeSnippet;
    pagination: HighlightedLearnCodeSnippet;
    rowActions: HighlightedLearnCodeSnippet;
    combinedGrid: HighlightedLearnCodeSnippet;
  };
}

/**
 * Learn content for /ui-practice/tables/learn. Same structure as
 * app/(demo)/ui-practice/dialog/_components/dialog-learn-tab.tsx -
 * DocSection + LearnCodeBlock + MethodSummaryTable + FaqBlock +
 * LearnToc, sourced from data/ui-practice-data/tables/learn.ts. Stays a
 * sync Server Component - all syntax-highlighting happens in
 * learn/page.tsx and is passed in as pre-highlighted `snippets` props
 * (see CLAUDE.md server/client boundary rule).
 */
export function TablesLearnTab({ snippets }: TablesLearnTabProps) {
  const { static: staticSnippet, sortable, searchFilter, pagination, rowActions, combinedGrid } =
    snippets;

  return (
    <div className="mx-auto w-full max-w-[1280px] px-4 py-6 pb-16 sm:px-7 sm:py-8">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_200px] lg:gap-12">
        {/* ── Main doc content ─────────────────────────────────────────── */}
        <main aria-label="Learn content" className="flex flex-col gap-5">
          {/* Overview */}
          <DocSection id="learn-overview" heading="Overview">
            <p className="text-[13px] leading-[1.6] text-muted-foreground">
              {tablesLearnDesc.overview}
            </p>
          </DocSection>

          {/* 1 · Static Table */}
          <DocSection
            id="learn-static"
            heading="1 · Static Table"
            desc={tablesLearnDesc.static}
          >
            <LearnCodeBlock snippets={staticSnippet} />
          </DocSection>

          {/* 2 · Sortable Columns */}
          <DocSection
            id="learn-sortable"
            heading="2 · Sortable Columns"
            desc={tablesLearnDesc.sortable}
          >
            <LearnCodeBlock snippets={sortable} />
          </DocSection>

          {/* 3 · Search & Filter */}
          <DocSection
            id="learn-search-filter"
            heading="3 · Search & Filter"
            desc={tablesLearnDesc.searchFilter}
          >
            <LearnCodeBlock snippets={searchFilter} />
          </DocSection>

          {/* 4 · Pagination */}
          <DocSection
            id="learn-pagination"
            heading="4 · Pagination"
            desc={tablesLearnDesc.pagination}
          >
            <LearnCodeBlock snippets={pagination} />
          </DocSection>

          {/* 5 · Row Actions */}
          <DocSection
            id="learn-row-actions"
            heading="5 · Row Actions"
            desc={tablesLearnDesc.rowActions}
          >
            <LearnCodeBlock snippets={rowActions} />
          </DocSection>

          {/* 6 · Combined Data Grid */}
          <DocSection
            id="learn-combined-grid"
            heading="6 · Combined Data Grid"
            desc={tablesLearnDesc.combinedGrid}
          >
            <LearnCodeBlock snippets={combinedGrid} />
          </DocSection>

          {/* Method Summary */}
          <DocSection id="learn-methods" heading="Method Summary">
            <p className="mb-4 text-[13px] leading-[1.6] text-muted-foreground">
              Quick reference across all three frameworks.
            </p>
            <MethodSummaryTable rows={tablesMethodRows} />
          </DocSection>

          {/* FAQ */}
          <DocSection id="learn-faq" heading="FAQ">
            <FaqBlock items={tablesFaq} />
          </DocSection>
        </main>

        {/* ── Right TOC ─────────────────────────────────────────────────── */}
        <LearnToc items={tablesTocItems} />
      </div>
    </div>
  );
}
