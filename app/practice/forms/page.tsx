import type { Metadata } from "next";
import { PracticePage } from "./_components/practice-page";
import { formsMeta } from "@/data/practice-data/forms/meta";
import { formsTestCases } from "@/data/practice-data/forms/test-cases";

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

export default function FormsPage() {
  return <PracticePage meta={formsMeta} testCases={formsTestCases} />;
}
