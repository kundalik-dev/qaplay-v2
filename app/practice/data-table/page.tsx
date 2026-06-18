import type { Metadata } from "next";
import { PracticePage } from "./_components/practice-page";
import { LearnTab } from "./_components/learn-tab";
import { dataTableMeta } from "@/data/practice-data/data-table/meta";
import { dataTableTestCases } from "@/data/practice-data/data-table/test-cases";
import { dataTableLearnCode } from "@/data/practice-data/data-table/learn";
import { highlightLearnSnippet } from "@/lib/highlight";

export const metadata: Metadata = {
  title: `${dataTableMeta.title} | QA Playground`,
  description: dataTableMeta.description,
  openGraph: {
    title: `${dataTableMeta.title} | QA Playground`,
    description: dataTableMeta.description,
    url: "https://qaplayground.dev/practice/data-table",
    siteName: "QA Playground",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${dataTableMeta.title} | QA Playground`,
    description: dataTableMeta.description,
  },
};

export default async function DataTablePage() {
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
    <PracticePage
      meta={dataTableMeta}
      testCases={dataTableTestCases}
      learnContent={
        <LearnTab
          snippets={{
            countRows,
            readCell,
            readHeaders,
            findRow,
            allRows,
            verifyEmpty,
          }}
        />
      }
    />
  );
}
