import { createPageMetadata } from "@/data/meta-data/create-page-metadata";

import { TablesPractice } from "./_components/tables-practice";

/** Static, framework-content-only page - safe to cache for a day. */
export const revalidate = 86400;

export const metadata = createPageMetadata({
  title: "Tables Practice",
  description:
    "Practice Playwright, Selenium, and Cypress table locators with static, sortable, searchable, paginated, row-action, and combined data grid tables.",
  path: "/ui-practice/tables",
});

export default function TablesPracticePage() {
  return <TablesPractice />;
}
