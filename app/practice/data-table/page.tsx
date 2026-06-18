import type { Metadata } from "next";
import { PracticePage } from "./_components/practice-page";
import { dataTableMeta } from "@/data/practice-data/data-table/meta";
import { dataTableTestCases } from "@/data/practice-data/data-table/test-cases";

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

export default function DataTablePage() {
  return <PracticePage meta={dataTableMeta} testCases={dataTableTestCases} />;
}
