import { createPageMetadata } from "@/data/meta-data/create-page-metadata";

import { DialogPractice } from "./_components/dialog-practice";

export const metadata = createPageMetadata({
  title: "Dialog Practice",
  description:
    "Practice Playwright, Selenium, and Cypress dialog handling with native alert/confirm/prompt/beforeunload dialogs, the HTML <dialog> element, custom modals, and toasts.",
  path: "/ui-practice/dialog",
});

export default function DialogPracticePage() {
  return <DialogPractice />;
}
