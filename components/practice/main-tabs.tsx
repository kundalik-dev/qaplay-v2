"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

type TabId = "practice" | "testcases" | "learn";

interface TabDef {
  id: TabId;
  label: string;
  emoji: string;
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

  const tabs: TabDef[] = [
    { id: "practice", label: "Practice", emoji: "🎮", count: scenarioCount },
    { id: "testcases", label: "Test Cases", emoji: "🧪", count: testCaseCount },
    { id: "learn", label: "Learn", emoji: "📖" },
  ];

  return (
    <div>
      <div
        className="sticky top-[var(--nav-offset,60px)] z-20 border-b border-border bg-background/90 backdrop-blur-sm"
        role="tablist"
        aria-label="Practice page tabs"
      >
        <div className="mx-auto flex w-full max-w-[1280px] items-center gap-0.5 px-7">
          {tabs.map((tab) => {
            const isActive = active === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                data-testid={`tab-${tab.id}`}
                data-tab={tab.id}
                onClick={() => setActive(tab.id)}
                className={cn(
                  "-mb-px flex items-center gap-[6px] border-b-2 whitespace-nowrap",
                  "px-4 py-[10px] text-[13.5px] font-medium transition-colors outline-none",
                  "focus-visible:ring-2 focus-visible:ring-primary/30",
                  isActive
                    ? "border-primary font-semibold text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground",
                )}
              >
                <span>{tab.emoji}</span>
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

      <div hidden={active !== "practice"}>{practiceContent}</div>
      <div hidden={active !== "testcases"}>{testCasesContent}</div>
      <div hidden={active !== "learn"}>{learnContent}</div>
    </div>
  );
}
