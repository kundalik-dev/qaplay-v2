/**
 * Practice Element Registry
 *
 * Maps URL slugs → ElementPageData bundles.
 * Import each element's data here as it is built and add it to the map.
 *
 * Usage in app/practice/[element]/page.tsx:
 *   import { getElementData } from "@/data/practice-data/registry";
 *   const data = getElementData(slug); // null if not yet implemented
 */
import type { ElementPageData } from "./types";

// ── Add imports here as elements are implemented ──────────────────────────────
// import { buttonsData }     from "./buttons";
// import { inputFieldsData } from "./input-fields";
// import { formsData }       from "./forms";

const registry: Record<string, () => Promise<ElementPageData>> = {
  // buttons:      () => import("./buttons").then((m) => m.buttonsData),
  // "input-fields": () => import("./input-fields").then((m) => m.inputFieldsData),
  // forms:        () => import("./forms").then((m) => m.formsData),
};

/** Returns the element page data for a given slug, or null if not found. */
export async function getElementData(
  slug: string
): Promise<ElementPageData | null> {
  const loader = registry[slug];
  if (!loader) return null;
  return loader();
}

/** All registered slugs — used for generateStaticParams. */
export function getRegisteredSlugs(): string[] {
  return Object.keys(registry);
}
