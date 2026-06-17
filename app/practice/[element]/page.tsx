import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getElementData, getRegisteredSlugs } from "@/data/practice-data/registry";
import { PracticePage } from "@/components/practice";

interface Props {
  params: Promise<{ element: string }>;
}

/** Pre-render all registered element slugs at build time. */
export async function generateStaticParams() {
  return getRegisteredSlugs().map((slug) => ({ element: slug }));
}

/** Dynamic metadata per element page. */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { element } = await params;
  const data = await getElementData(element);

  if (!data) {
    return {
      title: "Element Not Found | QA Playground",
      description: "This practice element page does not exist yet.",
    };
  }

  const { meta } = data;

  return {
    title: `${meta.title} | QA Playground`,
    description: meta.description,
    openGraph: {
      title: `${meta.title} | QA Playground`,
      description: meta.description,
      url: `https://qaplayground.com/practice/${meta.element}`,
      siteName: "QA Playground",
      type: "website",
    },
  };
}

/**
 * Dynamic practice element page — /practice/[element]
 *
 * Server component. Loads element data from the registry and passes it to the
 * <PracticePage> client shell. Each new element is registered in:
 *   data/practice-data/registry.ts
 *
 * To add a new element:
 * 1. Create data/practice-data/[element]/ with meta, scenarios, test-cases,
 *    code-snippets, and learn data files.
 * 2. Register the slug in data/practice-data/registry.ts.
 * 3. Create app/practice/[element]/_components/ with element-specific
 *    ScenarioCards and optional LearnContent.
 */
export default async function ElementPage({ params }: Props) {
  const { element } = await params;
  const data = await getElementData(element);

  if (!data) notFound();

  return (
    <PracticePage
      {...data}
      /*
       * scenarioContent and learnContent are element-specific.
       * This generic page.tsx is intentionally minimal — each element creates
       * its own page.tsx that imports its own ScenarioCards and LearnContent
       * and passes them through.
       *
       * For the generic route to work before element-specific pages exist,
       * we pass empty placeholders here. Once a proper element page is built,
       * it should replace this generic handler (or the registry can point to
       * a per-element page component instead).
       */
      scenarioContent={
        <p className="text-muted-foreground font-mono text-sm py-8 text-center">
          Scenarios coming soon — add ScenarioCard components here.
        </p>
      }
    />
  );
}
