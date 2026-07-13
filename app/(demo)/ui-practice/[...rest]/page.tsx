import { notFound } from "next/navigation";

/**
 * Catch-all for any /ui-practice/* path that doesn't have its own page yet
 * (e.g. /ui-practice/tables, /ui-practice/dropdowns before they're built).
 *
 * Matching this segment keeps the request inside the ui-practice layout
 * tree, so calling notFound() here renders the scoped
 * app/(demo)/ui-practice/not-found.tsx — with the sidebar still visible —
 * instead of the site-wide 404.
 *
 * Once a real page.tsx is added for a given slug (e.g.
 * app/(demo)/ui-practice/tables/page.tsx), Next.js prefers that static
 * route over this catch-all automatically.
 */
export default function UiPracticeCatchAll() {
  notFound();
}
