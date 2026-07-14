import { createPageMetadata } from "@/data/meta-data/create-page-metadata";

import { TablesLearnTab } from "../_components/tables-learn-tab";
import { tablesLearnCode } from "@/data/ui-practice-data/tables";
import { highlightLearnSnippet } from "@/lib/highlight";

/**
 * Learn content (code snippets, method summary, FAQ) is static - the
 * expensive part is server-side Shiki syntax highlighting below, so this
 * route is safe to cache for a day rather than re-highlighting on every
 * request.
 */
export const revalidate = 86400;

export const metadata = createPageMetadata({
  title: "Tables Practice — Learn",
  description:
    "Learn how to locate rows/cells, sort columns, filter, paginate, and edit table rows reliably in Playwright, Selenium, and Cypress.",
  path: "/ui-practice/tables/learn",
});

export default async function TablesLearnPage() {
  const [staticSnippet, sortable, searchFilter, pagination, rowActions, combinedGrid] =
    await Promise.all([
      highlightLearnSnippet(tablesLearnCode.static),
      highlightLearnSnippet(tablesLearnCode.sortable),
      highlightLearnSnippet(tablesLearnCode.searchFilter),
      highlightLearnSnippet(tablesLearnCode.pagination),
      highlightLearnSnippet(tablesLearnCode.rowActions),
      highlightLearnSnippet(tablesLearnCode.combinedGrid),
    ]);

  return (
    <div data-testid="ui-practice-tables-learn-page">
      <TablesLearnTab
        snippets={{
          static: staticSnippet,
          sortable,
          searchFilter,
          pagination,
          rowActions,
          combinedGrid,
        }}
      />
    </div>
  );
}
