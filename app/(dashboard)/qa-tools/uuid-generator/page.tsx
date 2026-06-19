/**
 * /qa-tools/uuid-generator
 *
 * Static route for the UUID Generator tool. Next.js gives priority to named
 * routes over dynamic [slug] segments, so this file must exist and render the
 * tool directly — not redirect to itself.
 *
 * All shared rendering logic lives in the [slug] route's _components folder.
 */

import type { Metadata } from "next";

import { findTool } from "@/data/qa-tools/tools-data";

// Shared shell and renderer from the dynamic route
import { ToolShell } from "../[slug]/_components/tool-shell";
import { ToolRenderer } from "../[slug]/_components/tool-renderer";

const SLUG = "uuid-generator";

export async function generateMetadata(): Promise<Metadata> {
  const tool = findTool(SLUG)!;
  const title = `${tool.name} | QA Playground`;
  const url = `https://qaplayground.dev/qa-tools/${SLUG}`;

  return {
    title,
    description: tool.description,
    keywords: [
      tool.name.toLowerCase(),
      ...tool.tags,
      "qa tools",
      "free online tool",
    ],
    openGraph: {
      title,
      description: tool.description,
      url,
      siteName: "QA Playground",
      type: "website",
    },
    alternates: { canonical: url },
  };
}

export default function UuidGeneratorPage() {
  const tool = findTool(SLUG)!;

  return (
    <ToolShell tool={tool}>
      <ToolRenderer slug={SLUG} />
    </ToolShell>
  );
}
