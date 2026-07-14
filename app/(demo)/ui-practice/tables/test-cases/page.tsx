import { createPageMetadata } from "@/data/meta-data/create-page-metadata";

import { TablesTestCasesTab } from "../_components/tables-test-cases-tab";

/** Test case data is static - safe to cache for a day. */
export const revalidate = 86400;

export const metadata = createPageMetadata({
  title: "Tables Practice — Test Cases",
  description:
    "Test cases for table automation — static tables, sortable columns, search & filter, pagination, row actions, and combined data grids in Playwright, Selenium, and Cypress.",
  path: "/ui-practice/tables/test-cases",
});

export default function TablesTestCasesPage() {
  return (
    <div data-testid="ui-practice-tables-test-cases-page">
      <TablesTestCasesTab />
    </div>
  );
}
