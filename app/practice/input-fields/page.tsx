import type { Metadata } from "next";
import { PracticePage } from "./_components/practice-page";
import { LearnTab } from "./_components/learn-tab";
import { inputFieldsMeta } from "@/data/practice-data/input-fields/meta";
import { inputFieldsTestCases } from "@/data/practice-data/input-fields/test-cases";
import { inputFieldsLearnCode } from "@/data/practice-data/input-fields/learn";
import { highlightLearnSnippet } from "@/lib/highlight";

export const metadata: Metadata = {
  title: `${inputFieldsMeta.title} | QA Playground`,
  description: inputFieldsMeta.description,
  openGraph: {
    title: `${inputFieldsMeta.title} | QA Playground`,
    description: inputFieldsMeta.description,
    url: "https://qaplayground.dev/practice/input-fields",
    siteName: "QA Playground",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${inputFieldsMeta.title} | QA Playground`,
    description: inputFieldsMeta.description,
  },
};

export default async function InputFieldsPage() {
  const [type, append, read, clear, disabled, readonly] = await Promise.all([
    highlightLearnSnippet(inputFieldsLearnCode.type),
    highlightLearnSnippet(inputFieldsLearnCode.append),
    highlightLearnSnippet(inputFieldsLearnCode.read),
    highlightLearnSnippet(inputFieldsLearnCode.clear),
    highlightLearnSnippet(inputFieldsLearnCode.disabled),
    highlightLearnSnippet(inputFieldsLearnCode.readonly),
  ]);

  return (
    <PracticePage
      meta={inputFieldsMeta}
      testCases={inputFieldsTestCases}
      learnContent={
        <LearnTab snippets={{ type, append, read, clear, disabled, readonly }} />
      }
    />
  );
}
