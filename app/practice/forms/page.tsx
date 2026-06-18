import type { Metadata } from "next";
import { PracticePage } from "./_components/practice-page";
import { LearnTab } from "./_components/learn-tab";
import { formsMeta } from "@/data/practice-data/forms/meta";
import { formsTestCases } from "@/data/practice-data/forms/test-cases";
import { formsLearnCode } from "@/data/practice-data/forms/learn";
import { highlightLearnSnippet } from "@/lib/highlight";

export const metadata: Metadata = {
  title: `${formsMeta.title} | QA Playground`,
  description: formsMeta.description,
  openGraph: {
    title: `${formsMeta.title} | QA Playground`,
    description: formsMeta.description,
    url: "https://qaplayground.dev/practice/forms",
    siteName: "QA Playground",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${formsMeta.title} | QA Playground`,
    description: formsMeta.description,
  },
};

export default async function FormsPage() {
  const [fillText, dob, radio, country, checkboxes, password, terms, errors] =
    await Promise.all([
      highlightLearnSnippet(formsLearnCode.fillText),
      highlightLearnSnippet(formsLearnCode.dob),
      highlightLearnSnippet(formsLearnCode.radio),
      highlightLearnSnippet(formsLearnCode.country),
      highlightLearnSnippet(formsLearnCode.checkboxes),
      highlightLearnSnippet(formsLearnCode.password),
      highlightLearnSnippet(formsLearnCode.terms),
      highlightLearnSnippet(formsLearnCode.errors),
    ]);

  return (
    <PracticePage
      meta={formsMeta}
      testCases={formsTestCases}
      learnContent={
        <LearnTab
          snippets={{
            fillText,
            dob,
            radio,
            country,
            checkboxes,
            password,
            terms,
            errors,
          }}
        />
      }
    />
  );
}
