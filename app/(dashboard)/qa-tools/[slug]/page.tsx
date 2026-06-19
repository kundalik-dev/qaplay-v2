import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { findTool } from "@/data/qa-tools/tools-data";

import { ToolShell } from "./_components/tool-shell";
import { ToolRenderer } from "./_components/tool-renderer";

// ── Types ──────────────────────────────────────────────────────────────────────

interface Props {
  params: Promise<{ slug: string }>;
}

// ── Metadata ───────────────────────────────────────────────────────────────────

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const tool = findTool(slug);

  if (!tool) {
    return { title: "Tool Not Found | QA Playground" };
  }

  const title = `${tool.name} | QA Playground`;
  const description = tool.description;
  const url = `https://qaplayground.dev/qa-tools/${slug}`;

  return {
    title,
    description,
    keywords: [
      tool.name.toLowerCase(),
      ...tool.tags,
      "qa tools",
      "free online tool",
    ],
    openGraph: {
      title,
      description,
      url,
      siteName: "QA Playground",
      type: "website",
    },
    alternates: {
      canonical: url,
    },
  };
}

// ── Static params for SSG of ready tools ──────────────────────────────────────

export async function generateStaticParams() {
  const { qaTools } = await import("@/data/qa-tools/tools-data");
  return qaTools
    .filter((t) => t.status === "ready")
    .map((t) => ({ slug: t.slug }));
}

// ── Page ───────────────────────────────────────────────────────────────────────

export default async function ToolPage({ params }: Props) {
  const { slug } = await params;
  const tool = findTool(slug);

  if (!tool || tool.status !== "ready") {
    notFound();
  }

  return (
    <ToolShell tool={tool}>
      <ToolRenderer slug={slug} />
    </ToolShell>
  );
}
