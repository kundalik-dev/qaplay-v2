import type { Metadata } from "next";
import { PracticePage } from "./_components/practice-page";
import { LearnTab } from "./_components/learn-tab";
import { buttonsMeta } from "@/data/practice-data/buttons/meta";
import { buttonsTestCases } from "@/data/practice-data/buttons/test-cases";
import { buttonsLearnCode } from "@/data/practice-data/buttons/learn";
import { highlightLearnSnippet } from "@/lib/highlight";

export const metadata: Metadata = {
  title: `${buttonsMeta.title} | QA Playground`,
  description: buttonsMeta.description,
  openGraph: {
    title: `${buttonsMeta.title} | QA Playground`,
    description: buttonsMeta.description,
    url: "https://qaplayground.dev/practice/buttons",
    siteName: "QA Playground",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${buttonsMeta.title} | QA Playground`,
    description: buttonsMeta.description,
  },
};

export default async function ButtonsPage() {
  const [single, double, right, disabled, text, keyboard] = await Promise.all([
    highlightLearnSnippet(buttonsLearnCode.single),
    highlightLearnSnippet(buttonsLearnCode.double),
    highlightLearnSnippet(buttonsLearnCode.right),
    highlightLearnSnippet(buttonsLearnCode.disabled),
    highlightLearnSnippet(buttonsLearnCode.text),
    highlightLearnSnippet(buttonsLearnCode.keyboard),
  ]);

  return (
    <PracticePage
      meta={buttonsMeta}
      testCases={buttonsTestCases}
      learnContent={
        <LearnTab
          snippets={{ single, double, right, disabled, text, keyboard }}
        />
      }
    />
  );
}
