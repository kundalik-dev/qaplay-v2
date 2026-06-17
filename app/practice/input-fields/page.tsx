import type { Metadata } from "next";
import { PracticePage } from "./_components/practice-page";
import { inputFieldsMeta } from "@/data/practice-data/input-fields/meta";
import { inputFieldsTestCases } from "@/data/practice-data/input-fields/test-cases";

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

export default function InputFieldsPage() {
  return (
    <PracticePage meta={inputFieldsMeta} testCases={inputFieldsTestCases} />
  );
}
