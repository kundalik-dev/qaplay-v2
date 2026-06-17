"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { ProgressWidget } from "./progress-widget";
import { FrameworkCodeBlock } from "./framework-code-block";
import { UpNextCard } from "./up-next-card";
import type { CodeSnippets, KeyMethod, PracticePageMeta } from "@/data/practice-data/types";
import styles from "./code-panel.module.css";

const dotColors: Record<string, string> = {
  green:  "bg-[var(--success)]",
  blue:   "bg-[var(--info)]",
  orange: "bg-[var(--brand-tertiary,#ff6b35)]",
  yellow: "bg-[var(--warning)]",
  purple: "bg-[var(--secondary)]",
};

interface CodePanelProps {
  totalScenarios: number;
  completedScenarios?: number;
  snippets: CodeSnippets;
  keyMethods: KeyMethod[];
  upNext: PracticePageMeta["upNext"];
}

/**
 * Block 8 — CodePanel
 * Sticky right panel in the Practice tab.
 * Composes: ProgressWidget + FrameworkCodeBlock + key methods + UpNextCard.
 * Client component.
 */
export function CodePanel({
  totalScenarios,
  completedScenarios = 0,
  snippets,
  keyMethods,
  upNext,
}: CodePanelProps) {
  return (
    <aside
      className={`sticky top-[var(--panel-top,108px)] h-[calc(100vh-var(--panel-top,108px))] w-full ${styles.panel}`}
      data-testid="code-panel"
    >
      <ScrollArea className="h-full">
        <div className="flex flex-col gap-4 p-4">
          {/* Progress */}
          <ProgressWidget completed={completedScenarios} total={totalScenarios} />

          {/* Framework code */}
          <FrameworkCodeBlock snippets={snippets} />

          <Separator className="bg-border" />

          {/* Key methods list */}
          <div className="flex flex-col gap-1.5">
            <span className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground">
              Key Methods
            </span>
            {keyMethods.map((m, i) => (
              <div key={i} className="flex items-center gap-2 text-[12px] text-muted-foreground">
                <span
                  className={`w-2 h-2 rounded-full flex-shrink-0 ${dotColors[m.color] ?? "bg-muted"}`}
                />
                <span className="font-mono">{m.label}</span>
              </div>
            ))}
          </div>

          <Separator className="bg-border" />

          {/* Up next */}
          <UpNextCard {...upNext} />
        </div>
      </ScrollArea>
    </aside>
  );
}
