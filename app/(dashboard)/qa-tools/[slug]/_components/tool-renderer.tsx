"use client";

/**
 * Tool renderer — maps a tool slug to its interactive client component.
 * Must be a Client Component because next/dynamic with { ssr: false } is
 * only permitted inside Client Components.
 *
 * To add a new tool:
 *   1. Create the component in `./<slug>/<slug>-tool.tsx` (must be "use client")
 *   2. Add an import + case below.
 */

import dynamic from "next/dynamic";

const UuidGeneratorTool = dynamic(
  () => import("./uuid-generator/uuid-generator-tool"),
  { ssr: false },
);

interface ToolRendererProps {
  slug: string;
}

export function ToolRenderer({ slug }: ToolRendererProps) {
  switch (slug) {
    case "uuid-generator":
      return <UuidGeneratorTool />;
    default:
      return null;
  }
}
