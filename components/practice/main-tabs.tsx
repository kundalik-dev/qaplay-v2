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
    { id: "practice",  emoji: "🎮", label: "Practice",   count: scenarioCount },
    { id: "testcases", emoji: "🧪", label: "Test Cases", count: testCaseCount },
    { id: "learn",     emoji: "📖", label: "Learn" },
  ];

  return (
    <div>
      {/* Tab bar */}
      <div
        className="sticky top-[var(--nav-offset,60px)] z-20 bg-background/90 backdrop-blur-sm border-b border-border"
        role="tablist"
        aria-label="Practice page tabs"
      >
        <div className="w-full max-w-[1280px] mx-auto px-7 flex items-center gap-0.5">
          {tabs.map((tab) => {
            const isActive = active === tab.id;
            return (
              <button
                key={tab.id}
                role="tab"
                aria-selected={isActive}
                data-testid={`tab-${tab.id}`}
                data-tab={tab.id}
                onClick={() => setActive(tab.id)}
                className={cn(
                  "flex items-center gap-[6px] px-4 py-[10px] text-[13.5px] font-medium",
                  "border-b-2 -mb-px transition-colors whitespace-nowrap outline-none",
                  "focus-visible:ring-2 focus-visible:ring-primary/30",
                  isActive
                    ? "border-primary text-primary font-semibold"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                )}
              >
                <span>{tab.emoji}</span>
                {tab.label}
                {tab.count !== undefined && (
                  <span
                    className={cn(
                      "inline-flex items-center justify-center min-w-[20px] h-5 px-[5px]",
                      "rounded-[10px] text-[11px] font-bold font-[family-name:var(--font-ibm-plex-mono)]",
                      isActive
                        ? "bg-[col