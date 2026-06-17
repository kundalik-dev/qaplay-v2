import type { Metadata } from "next";
import { PracticePage } from "./_components/practice-page";
import { buttonsMeta } from "@/data/practice-data/buttons/meta";
import { buttonsTestCases } from "@/data/practice-data/buttons/test-cases";

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

export default function ButtonsPage() {
  return <PracticePage meta={buttonsMeta} testCases={buttonsTestCases} />;
}
