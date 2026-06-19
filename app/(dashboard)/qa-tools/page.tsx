import type { Metadata } from "next";

import { filterTools, qaTools } from "@/data/qa-tools/tools-data";

import { ToolsWall } from "./_components/tools-wall";

export const metadata: Metadata = {
  title: "QA Tools | QA Playground",
  description:
    "Free online QA tools — UUID generator, JSON formatter, regex tester, base64 encoder and more. Built for testers and developers.",
  keywords: [
    "qa tools",
    "uuid generator",
    "online qa tools",
    "free testing tools",
    "json formatter",
    "regex tester",
    "base64 encoder",
  ],
  openGraph: {
    title: "Free QA Tools | QA Playground",
    description:
      "Free online QA tools — UUID generator, JSON formatter, regex tester, base64 encoder and more. Built for testers and developers.",
    url: "https://qaplayground.dev/qa-tools",
    siteName: "QA Playground",
    type: "website",
  },
};

interface QaToolsPageProps {
  searchParams: Promise<{ q?: string; category?: string }>;
}

/**
 * /qa-tools — SSR tool index.
 *
 * Search and category filtering are done server-side by reading searchParams.
 * The filter bar (client component) updates the URL which triggers a server
 * re-render with the new params.
 */
export default async function QaToolsPage({ searchParams }: QaToolsPageProps) {
  const { q = "", category = "" } = await searchParams;

  const filteredTools = filterTools(qaTools, q, category);

  return <ToolsWall allTools={qaTools} filteredTools={filteredTools} />;
}
