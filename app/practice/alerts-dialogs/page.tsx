import { JsonLd } from "@/components/seo";
import { PracticePage } from "./_components/practice-page";
import { LearnTab } from "./_components/learn-tab";
import { alertsDialogsMeta } from "@/data/practice-data/alerts-dialogs/meta";
import { alertsDialogsTestCases } from "@/data/practice-data/alerts-dialogs/test-cases";
import { alertsDialogsLearnCode } from "@/data/practice-data/alerts-dialogs/learn";
import { alertsDialogsPageMetadata } from "@/data/meta-data/practice/alerts-dialogs-page-meta-data";
import {
  alertsDialogsPageWebPageJsonLd,
  alertsDialogsPageBreadcrumbJsonLd,
  alertsDialogsPageFaqJsonLd,
} from "@/data/meta-data/practice/alerts-dialogs-structured-jsonld-data";
import { highlightLearnSnippet } from "@/lib/highlight";

export const metadata = alertsDialogsPageMetadata;

export default async function AlertsDialogsPage() {
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
    <>
      <JsonLd data={alertsDialogsPageWebPageJsonLd} />
      <JsonLd data={alertsDialogsPageBreadcrumbJsonLd} />
      <JsonLd data={alertsDialogsPageFaqJsonLd} />
      <PracticePage
        meta={alertsDialogsMeta}
        testCases={alertsDialogsTestCases}
        learnContent={
          <LearnTab
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
        }
      />
    </>
  );
}
