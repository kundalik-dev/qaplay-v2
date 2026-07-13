import { createPageMetadata } from "@/data/meta-data/create-page-metadata";

import { UiPracticeOverview } from "./_components/ui-practice-overview";

export const metadata = createPageMetadata({
  title: "UI Practice",
  description:
    "Standalone UI elements — tables, iframes, dialogs, annotations, checkboxes, tabs & windows, and dropdowns — for practicing Playwright, Selenium, and Cypress locators.",
  path: "/ui-practice",
});

export default function UiPracticeSetupPage() {
  return <UiPracticeOverview />;
}
