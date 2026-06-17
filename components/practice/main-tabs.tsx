"use client";

import * as TabsPrimitive from "@radix-ui/react-tabs";
import { PracticeShell } from "./practice-shell";
import styles from "./main-tabs.module.css";

interface MainTabsProps {
  scenarioCount: number;
  testCaseCount: number;
  practiceContent: React.ReactNode;
  testCasesContent: React.ReactNode;
  learnContent: React.ReactNode;
}

/**
 * Block 2 — MainTabs
 * Practice / Test Cases / Learn tab switcher.
 * Uses Radix Tabs primitives directly (not shadcn wrapper) so the
 * data-state CSS targeting in the CSS module works reliably.
 * Sticky below the page header.
 */
export function MainTabs({
  scenarioCount,
  testCaseCount,
  practiceContent,
  testCasesContent,
  learnContent,
}: MainTabsProps) {
  return (
    <TabsPrimitive.Root defaultValue="practice" className="w-full">
      {/* Sticky tab bar */}
      <div className={styles.tabBar}>
        <PracticeShell>
          <TabsPrimitive.List
            className={styles.tabList}
            data-testid="main-tabs"
            aria-label="Practice page sections"
          >
            <TabsPrimitive.Trigger
              value="practice"
              className={styles.trigger}
              data-testid="tab-practice"
              data-tab="practice"
            >
              🎮 Practice
              <span className={styles.badge}>{scenarioCount}</span>
            </TabsPrimitive.Trigger>

            <TabsPrimitive.Trigger
              value="testcases"
              className={styles.trigger}
              data-testid="tab-testcases"
              data-tab="testcases"
            >
              🧪 Test Cases
              <span className={styles.badge}>{testCaseCount}</span>
            </TabsPrimitive.Trigger>

            <TabsPrimitive.Trigger
              value="learn"
              className={styles.trigger}
              data-testid="tab-learn"
              data-tab="learn"
            >
              📖 Learn
            </TabsPrimitive.Trigger>
          </TabsPrimitive.List>
        </PracticeShell>
      </div>

      <TabsPrimitive.Content value="practice"  className="outline-none">
        {practiceContent}
      </TabsPrimitive.Content>
      <TabsPrimitive.Content value="testcases" className="outline-none">
        {testCasesContent}
      </TabsPrimitive.Content>
      <TabsPrimitive.Content value="learn"     className="outline-none">
        {learnContent}
      </TabsPrimitive.Content>
    </TabsPrimitive.Root>
  );
}
