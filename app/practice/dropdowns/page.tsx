import type { Metadata } from "next";
import { dropdownsMeta } from "@/data/practice-data/dropdowns/meta";
import { dropdownsTestCases } from "@/data/practice-data/dropdowns/test-cases";
import { dropdownsLearnCode } from "@/data/practice-data/dropdowns/learn";
import { highlightLearnSnippet } from "@/lib/highlight";
import { PracticePage } from "./_components/practice-page";
import { LearnTab } from "./_components/learn-tab";

export const metadata: Metadata = {
  title: "How to Handle Dropdowns in Selenium and Playwright | QA Playground",
  description: dropdownsMeta.description,
  openGraph: {
    title: "How to Handle Dropdowns in Selenium and Playwright | QA Playground",
    description: dropdownsMeta.description,
    url: "https://qaplayground.dev/practice/dropdowns",
    siteName: "QA Playground",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "How to Handle Dropdowns in Selenium and Playwright | QA Playground",
    description: dropdownsMeta.description,
  },
};

export default async function DropdownsPage() {
  const [visibleText, value, options, multi, custom, searchable] =
    await Promise.all([
      highlightLearnSnippet(dropdownsLearnCode.visibleText),
      highlightLearnSnippet(dropdownsLearnCode.value),
      highlightLearnSnippet(dropdownsLearnCode.options),
      highlightLearnSnippet(dropdownsLearnCode.multi),
      highlightLearnSnippet(dropdownsLearnCode.custom),
      highlightLearnSnippet(dropdownsLearnCode.searchable),
    ]);

  return (
    <PracticePage
      meta={dropdownsMeta}
      testCases={dropdownsTestCases}
      learnContent={
        <LearnTab snippets={{ visibleText, value, options, multi, custom, searchable }} />
      }
    />
  );
}
