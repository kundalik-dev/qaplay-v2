"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

export interface ScenarioCtx {
  setResult: (text: string) => void;
  complete: () => void;
  isCompleted: boolean;
}

interface ScenarioCardProps {
  id: string;
  title: string;
  testId: string;
  resultId: string;
  initialResult: string;
  hint: string;         // HTML-safe string, may contain <code> tags
  badge?: string;
  onComplete?: () => void;
  children: (ctx: ScenarioCtx) => React.ReactNode;
}

export function ScenarioCard({
  id,
  title,
  testId,
  resultId,
  initialResult,
  hint,
  badge,
  onComplete,
  children,
}: ScenarioCardProps) {
  const [result, setResultText] = useState(initialResult);
  const [hasResult, setHasResult] = useState(false);
  const [hintOpen, setHintOpen] = useState(false);

  function setResult(text: string) {
    setResultText(text);
    if (!hasResult) {
      setHasResult(true);
      onComplete?.();
    }
  }

  function complete() {
    if (!hasResult) {
      setHasResult(true);
      onComplete?.();
    }
  }

  const ctx: ScenarioCtx = { setResult, complete, isCompleted: hasResult };

  return (
    <div
      className="bg-card border border-border rounded-[10px] overflow-hidden transition-shadow hover:shadow-sm hover:border-border/80"
      data-testid={testId}
      data-section={`scenario-${id.toLowerCase()}`}
    >
      {/* Card header */}
      <div className="flex items-center gap-3 px-4 py-[14px]">
        <span className="font-[family-name:var(--font-ibm-plex-mono)] text-[10px] font-bold tracking-[0.05em] text-muted-foreground bg-muted border border-border px-[7px] py-[2px] rounded-[4px] flex-shrink-0">
          {id}
        </span>
        <span className="text-[14px] font-semibold text-foreground flex-1">
          {title}
        </span>
        {badge && (
          <span className="text-[10px] font-bold tracking-[0.05em] px-2 py-[2px] rounded-[4px] bg-[color-mix(in_srgb,var(--warning)_10%,transparent)] text-[var(--warning)] border border-[color-mix(in_srgb,var(--warning)_30%,transparent)]">
            {badge}
          </span>
        )}
      </div>

      {/* Card body */}
      <div className="px-4 pb-4 border-t border-border/50">
        {/* Interactive row */}
        <div className="flex items-center gap-2.5 pt-[14px]">
          {children(ctx)}

          {/* Result span */}
          <span
            id={resultId}
            data-testid={resultId}
            className={cn(
              "flex-1 text-[12.5px] font-[family-name:var(--font-ibm-plex-mono)] px-2.5 py-1.5",
              "bg-muted border border-border/50 rounded-[6px] min-h-8 flex items-center",
              "transition-colors",
              hasResult
                ? "text-[var(--success)] bg-[color-mix(in_srgb,var(--success)_8%,transparent)] border-[color-mix(in_srgb,var(--success)_25%,transparent)]"
                : "text-muted-foreground"
            )}
          >
            {result}
          </span>

          {/* Hint toggle */}
          <button
            onClick={() => setHintOpen((o) => !o)}
            className={cn(
              "flex-shrink-0 inline-flex items-center gap-[5px] px-3 py-[5px]",
              "rounded-[20px] text-[12px] font-semibold border transition-all",
              hintOpen
                ? "border-primary/40 text-primary bg-[color-mix(in_srgb,var(--primary)_10%,transparent)]"
                : "border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-primary hover:bg-[color-mix(in_srgb,var(--primary)_8%,transparent)]"
            )}
          >
            💡 {hintOpen ? "Hide Hint" : "Show Hint"}
          </button>
        </div>

        {/* Hint panel */}
        {hintOpen && (
          <div
  