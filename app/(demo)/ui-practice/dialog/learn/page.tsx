import { createPageMetadata } from "@/data/meta-data/create-page-metadata";

import { DialogLearnTab } from "../_components/dialog-learn-tab";
import { dialogsLearnCode } from "@/data/ui-practice-data/dialogs";
import { highlightLearnSnippet } from "@/lib/highlight";

/**
 * Learn content (code snippets, method summary, FAQ) is static - the
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
  const [
    openVerify,
    closeButton,
    confirm,
    ariaLabel,
    backdrop,
    escape,
    scoped,
  ] = await Promise.all([
    highlightLearnSnippet(dialogsLearnCode.openVerify),
    highlightLearnSnippet(dialogsLearnCode.closeButton),
    highlightLearnSnippet(dialogsLearnCode.confirm),
    highlightLearnSnippet(dialogsLearnCode.ariaLabel),
    highlightLearnSnippet(dialogsLearnCode.backdrop),
    highlightLearnSnippet(dialogsLearnCode.escape),
    highlightLearnSnippet(dialogsLearnCode.scoped),
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
