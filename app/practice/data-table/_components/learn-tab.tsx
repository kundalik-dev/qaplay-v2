import {
  DocSection,
  LearnCodeBlock,
  MethodSummaryTable,
  FaqBlock,
  LearnToc,
} from "@/components/practice";
import {
  dataTableLearnDesc,
  dataTableLearnCode,
  dataTableMethodRows,
  dataTableFaq,
  dataTableTocItems,
} from "@/data/practice-data/data-table/learn";
import { highlightLearnSnippet } from "@/lib/highlight";

export async function LearnTab() {
  const [countRows, readCell, readHeaders, findRow, allRows, verifyEmpty] =
    await Promise.all([
      highlightLearnSnippet(dataTableLearnCode.countRows),
      highlightLearnSnippet(dataTableLearnCode.readCell),
      highlightLearnSnippet(dataTableLearnCode.readHeaders),
      highlightLearnSnippet(dataTableLearnCode.findRow),
      highlightLearnSnippet(dataTableLearnCode.allRows),
      highlightLearnSnippet(dataTableLearnCode.verifyEmpty),
    ]);

  return (
    <div className="mx-auto w-full max-w-[1280px] px-4 py-6 pb-16 sm:px-7 sm:py-8">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_200px] lg:gap-12">
        {/* ── Main content ──────────────────────────────────────────────── */}
        <main aria-label="Learn content" className="flex flex-col gap-5">
          <DocSection id="learn-overview" heading="Overview">
            <p className="text-[13px] leading-[1.6] text-muted-foreground">
              {dataTableLearnDesc.overview}
            </p>
          </DocSection>

          <DocSection
            id="learn-count-rows"
            heading="1 · Count Rows & Columns"
            desc={dataTableLearnDesc.countRows}
          >
            <LearnCodeBlock snippets={countRows} />
          </DocSection>

          <DocSection
            id="learn-read-cell"
            heading="2 · Read a Specific Cell"
            desc={dataTableLearnDesc.readCell}
          >
            <LearnCodeBlock snippets={readCell} />
          </DocSection>

          <DocSection
            id="learn-read-headers"
            heading="3 · Read All Headers"
            desc={dataTableLearnDesc.readHeaders}
          >
            <LearnCodeBlock snippets={readHeaders} />
          </DocSection>

          <DocSection
            id="learn-find-row"
            heading="4 · Find Row by Content"
            desc={dataTableLearnDesc.findRow}
          >
            <LearnCodeBlock snippets={findRow} />
          </DocSection>

          <DocSection
            id="learn-all-rows"
            heading="5 · Iterate All Rows"
            desc={dataTableLearnDesc.allRows}
          >
            <LearnCodeBlock snippets={allRows} />
          </DocSection>

          <DocSection
            id="learn-verify-empty"
            heading="6 · Verify Empty State"
            desc={dataTableLearnDesc.verifyEmpty}
          >
            <LearnCodeBlock snippets={verifyEmpty} />
          </DocSection>

          <DocSection id="learn-methods" heading="Method Summary">
            <p className="mb-4 text-[13px] leading-[1.6] text-muted-foreground">
              Quick reference across all three frameworks for common table
              automation tasks.
            </p>
            <MethodSummaryTable rows={dataTableMethodRows} />
          </DocSection>

          <DocSection id="learn-faq" heading="FAQ">
            <FaqBlock items={dataTableFaq} />
          </DocSection>
        </main>

        {/* ── TOC ───────────────────────────────────────────────────────── */}
        <LearnToc items={dataTableTocItems} />
      </div>
    </div>
  );
}
