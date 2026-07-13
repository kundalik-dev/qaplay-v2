import { createPageMetadata } from "@/data/meta-data/create-page-metadata";

import { TablesPractice } from "./_components/tables-practice";

export const metadata = createPageMetadata({
  title: "Tables Practice",
  description:
    "Practice Playwright, Selenium, and Cypress table locators with static, sortable, searchable, paginated, row-action, and combined data grid tables.",
  path: "/ui-practice/tables",
});

export default function TablesPracticePage() {
  return <TablesPractice />;
}
