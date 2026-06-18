"use client";

import { useRef, useState } from "react";
import { cn } from "@/lib/utils";

type TabId = "practice" | "testcases" | "learn";

interface TabDef {
  id: TabId;
  label: string;
  count?: number;
}

interface MainTabsProps {
  scenarioCount: number;
  testCaseCount: number;
  practiceContent: React.ReactNode;
  testCasesContent: React.ReactNode;
  learnContent: React.ReactNode;
}

export function MainTabs({
  scenarioCount,
  testCaseCount,
  practiceContent,
  testCasesContent,
  learnContent,
}: MainTabsProps) {
  const [active, setActive] = useState<TabId>("practice");
  const tabRefs = useRef<Record<TabId, HTMLButtonElement | null>>({
    practice: null,
    testcases: null,
    learn: null,
  });

  const tabs: TabDef[] = [
    { id: "practice", label: "Practice", count: scenarioCount },
    { id: "testcases", label: "Test Cases", count: testCaseCount },
    { id: "learn", label: "Learn" },
  ];

  function focusTab(tabId: TabId) {
    setActive(tabId);
    tabRefs.current[tabId]?.focus();
  }

  function handleTabKeyDown(
    event: React.KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) {
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) {
      return;
    }

    event.preventDefault();

    if (event.key === "Home") {
      focusTab(tabs[0].id);
      return;
    }

    if (event.key === "End") {
      focusTab(tabs[tabs.length - 1].id);
      return;
    }

    const offset = event.key === "ArrowRight" ? 1 : -1;
    const nextIndex = (index + offset + tabs.length) % tabs.length;
    focusTab(tabs[nextIndex].id);
  }

  return (
    <div>
      <div
        className="sticky top-[var(--nav-offset,60px)] z-20 border-b border-border bg-background/90 backdrop-blur-sm"
        role="tablist"
        aria-label="Practice page tabs"
      >
        <div className="mx-auto flex w-full max-w-[1280px] items-center gap-0.5 px-7">
          {tabs.map((tab, index) => {
            const isActive = active === tab.id;
            const tabId = `practice-tab-${tab.id}`;
            const panelId = `practice-panel-${tab.id}`;

            return (
              <button
                key={tab.id}
                ref={(node) => {
                  tabRefs.current[tab.id] = node;
                }}
                type="button"
                role="tab"
                id={tabId}
                aria-selected={isActive}
                aria-controls={panelId}
                tabIndex={isActive ? 0 : -1}
                data-testid={`tab-${tab.id}`}
                data-tab={tab.id}
                onClick={() => setActive(tab.id)}
                onKeyDown={(event) => handleTabKeyDown(event, index)}
                className={cn(
                  "-mb-px flex items-center gap-[6px] border-b-2 whitespace-nowrap",
                  "px-4 py-[10px] text-[13.5px] font-medium transition-colors outline-none",
                  "focus-visible:ring-2 focus-visible:ring-primary/30",
                  isActive
                    ? "border-primary font-semibold text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground",
                )}
              >
                <span>{tab.label}</span>
                {tab.count !== undefined ? (
                  <span
                    className={cn(
                      "inline-flex h-5 min-w-[20px] items-center justify-center",
                      "rounded-full px-[5px] text-[11px] font-bold",
                      "font-[family-name:var(--font-ibm-plex-mono)]",
                      isActive
                        ? "bg-primary/10 text-primary"
                        : "bg-muted text-muted-foreground",
                    )}
                  >
                    {tab.count}
                  </span>
                ) : null}
              </button>
            );
          })}
        </div>
      </div>

      <div
        id="practice-panel-practice"
        role="tabpanel"
        aria-labelledby="practice-tab-practice"
        hidden={active !== "practice"}
        tabIndex={0}
      >
        {practiceContent}
      </div>
      <div
        id="practice-panel-testcases"
        role="tabpanel"
        aria-labelledby="practice-tab-testcases"
        hidden={active !== "testcases"}
        tabIndex={0}
      >
        {testCasesContent}
      </div>
      <div
        id="practice-panel-learn"
        role="tabpanel"
        aria-labelledby="practice-tab-learn"
        hidden={active !== "learn"}
        tabIndex={0}
      >
        {learnContent}
      </div>
    </div>
  );
}
