"use client";

import { PageHeader } from "./page-header";
import { MainTabs } from "./main-tabs";
import { CodePanel } from "./code-panel";
import { TestCasesTable } from "./test-cases-table";
import { DocSection } from "./doc-section";
import { MethodSummaryTable } from "./method-summary-table";
import { FaqBlock } from "./faq-block";
import { LearnToc } from "./learn-toc";
import type { ElementPageData } from "@/data/practice-data/types";
import styles from "./practice-page.module.css";

interface PracticePageProps extends ElementPageData {
  /**
   * The interactive scenario elements rendered inside the Practice tab.
   * Each element page passes its own <ScenarioCard> instances here.
   */
  scenarioContent: React.ReactNode;
  /**
   * Optional learn doc sections. If not provided, a method summary + FAQ
   * placeholder is shown. Each element page builds its own DocSection tree.
   */
  learnContent?: React.ReactNode;
}

/**
 * Shared PracticePage shell.
 *
 * Composes the shared blocks into the three-tab layout. Reused by every
 * /practice/[element] route. Each element page provides:
 *   - Data (meta, codeSnippets, keyMethods, testCases, methodRows, faqItems, tocItems)
 *   - scenarioContent — the <ScenarioCard> nodes for the Practice tab
 *   - learnContent    — the <DocSection> nodes for the Learn tab (optional)
 *
 * Client component — manages tab state via MainTabs.
 */
export function PracticePage({
  meta,
  codeSnippets,
  keyMethods,
  testCases,
  methodRows,
  faqItems,
  tocItems,
  scenarioContent,
  learnContent,
}: PracticePageProps) {
  return (
    <div
      className="pt-[60px]"
      data-testid={`${meta.element}-page`}
      data-section="practice"
      data-element={meta.element}
    >
      {/* Block 1 — Page header */}
      <PageHeader
        title={meta.title}
        description={meta.description}
        level={meta.level}
        durationMin={meta.durationMin}
        scenarioCount={meta.scenarioCount}
        breadcrumb={meta.breadcrumb}
      />

      {/* Block 2 — Three-tab shell */}
      <MainTabs
        scenarioCount={meta.scenarioCount}
        testCaseCount={meta.testCaseCount}

        /* ── Practice tab ─────────────────────────────────────── */
        practiceContent={
          <div className={styles.tabContent}>
            <div className={styles.practiceLayout}>
              {/* Left: scenario cards */}
              <section
                className={styles.scenariosCol}
                aria-label="Interactive Scenarios"
              >
                <div className={styles.colHeading}>Interactive Scenarios</div>
                {scenarioContent}
              </section>

              {/* Right: Block 8 — sticky code panel */}
              <CodePanel
                totalScenarios={meta.scenarioCount}
                snippets={codeSnippets}
                keyMethods={keyMethods}
                upNext={meta.upNext}
              />
            </div>
          </div>
        }

        /* ── Test Cases tab ───────────────────────────────────── */
        testCasesContent={
          <div className={styles.tabContent}>
            <div className={styles.testCasesLayout}>
              <TestCasesTable testCases={testCases} />
            </div>
          </div>
        }

        /* ── Learn tab ────────────────────────────────────────── */
        learnContent={
          <div className={styles.tabContent}>
            <div className={styles.learnLayout}>
              <main aria-label="Learn content">
                {learnContent ?? (
                  <>
                    <DocSection
                      id="learn-methods"
                      heading="Key Methods Summary"
                      sectionNum="→"
                    >
                      <MethodSummaryTable rows={methodRows} />
                    </DocSection>

                    <DocSection id="learn-faq" heading="FAQ">
                      <FaqBlock items={faqItems} />
                    </DocSection>
                  </>
                )}
              </main>

              {/* Block 14 — Right TOC */}
              <LearnToc items={tocItems} />
            </div>
          </div>
        }
      />
    </div>
  );
}
