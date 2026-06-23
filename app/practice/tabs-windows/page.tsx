import type { Metadata } from "next";
import { PracticePage } from "./_components/practice-page";
import { LearnTab } from "./_components/learn-tab";
import {
  tabsWindowsMeta,
  tabsWindowsTestCases,
  tabsWindowsLearnCode,
} from "@/data/practice-data/tabs-windows";
import { tabsWindowsPageMetadata } from "@/data/meta-data/practice/tabs-windows-page-meta-data";
import {
  tabsWindowsPageWebPageJsonLd,
  tabsWindowsPageBreadcrumbJsonLd,
  tabsWindowsPageFaqJsonLd,
} from "@/data/meta-data/practice/tabs-windows-structured-jsonld-data";
import { highlightLearnSnippet } from "@/lib/highlight";

export const metadata: Metadata = tabsWindowsPageMetadata;

export default async function TabsWindowsPage() {
  const [newTab, switchTab, popup, close] = await Promise.all([
    highlightLearnSnippet(tabsWindowsLearnCode.newTab),
    highlightLearnSnippet(tabsWindowsLearnCode.switch),
    highlightLearnSnippet(tabsWindowsLearnCode.popup),
    highlightLearnSnippet(tabsWindowsLearnCode.close),
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(tabsWindowsPageWebPageJsonLd),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(tabsWindowsPageBreadcrumbJsonLd),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(tabsWindowsPageFaqJsonLd),
        }}
      />
      <PracticePage
        meta={tabsWindowsMeta}
        testCases={tabsWindowsTestCases}
        learnContent={
          <LearnTab snippets={{ newTab, switch: switchTab, popup, close }} />
        }
      />
    </>
  );
}
