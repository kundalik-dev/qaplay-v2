import { createPageMetadata } from "@/data/meta-data/create-page-metadata";

import { DialogLearnTab } from "../_components/dialog-learn-tab";
import { alertsDialogsLearnCode } from "@/data/practice-data/alerts-dialogs/learn";
import { highlightLearnSnippet } from "@/lib/highlight";

/**
 * Learn content (code snippets, method summary, FAQ) is static — the
 * expensive part is server-side Shiki syntax highlighting below, so this
 * route is safe to cache for a day rather than re-highlighting on every
 * request.
 */
export const revalidate = 86400;

export const metadata = createPageMetadata({
  title: "Dialog Practice — Learn",
  description:
    "Learn how to open, verify, close, and dismiss dialogs — plus scoped locators and accessibility attributes — in Playwright, Selenium, and Cypress.",
  path: "/ui-practice/dialog/learn",
});

export default async function DialogLearnPage() {
  const [openVerify, closeButton, confirm, ariaLabel, backdrop, escape, scoped] =
    await Promise.all([
      highlightLearnSnippet(alertsDialogsLearnCode.openVerify),
      highlightLearnSnippet(alertsDialogsLearnCode.closeButton),
      highlightLearnSnippet(alertsDialogsLearnCode.confirm),
      highlightLearnSnippet(alertsDialogsLearnCode.ariaLabel),
      highlightLearnSnippet(alertsDialogsLearnCode.backdrop),
      highlightLearnSnippet(alertsDialogsLearnCode.escape),
      highlightLearnSnippet(alertsDialogsLearnCode.scoped),
    ]);

  return (
    <div data-testid="ui-practice-dialog-learn-page">
      <DialogLearnTab
        snippets={{
          openVerify,
          closeButton,
          confirm,
          ariaLabel,
          backdrop,
          escape,
          scoped,
        }}
      />
    </div>
  );
}
