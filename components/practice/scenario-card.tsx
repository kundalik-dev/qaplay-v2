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
  hint: string;
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

  return (
    <div
      className="rounded-[10px] border border-border bg-card transition-shadow hover:border-border/80 hover:shadow-sm"
      data-testid={testId}
      data-section={`scenario-${id.toLowerCase()}`}
    >
      <div className="flex flex-wrap items-center gap-3 px-4 py-[14px]">
        <span className="flex-shrink-0 rounded-[4px] border border-border bg-muted px-[7px] py-[2px] font-[family-name:var(--font-ibm-plex-mono)] text-[10px] font-bold tracking-[0.05em] text-muted-foreground">
          {id}
        </span>

        <span className="min-w-0 flex-1 text-[14px] font-semibold text-foreground">
          {title}
        </span>

        {badge ? (
          <span className="rounded-[4px] border border-[color-mix(in_srgb,var(--warning)_30%,transparent)] bg-[color-mix(in_srgb,var(--warning)_10%,transparent)] px-2 py-[2px] text-[10px] font-bold tracking-[0.05em] text-[var(--warning-readable)]">
            {badge}
          </span>
        ) : null}
      </div>

      <div className="border-t border-border/50 px-4 pb-4">
        <div className="flex flex-wrap items-center gap-2.5 pt-[14px]">
          {children({ setResult, complete, isCompleted: hasResult })}

          <span
            id={resultId}
            data-testid={resultId}
            className={cn(
              "flex min-h-8 min-w-[220px] flex-1 items-center rounded-[6px] border px-2.5 py-1.5 font-[family-name:var(--font-ibm-plex-mono)] text-[12.5px] transition-colors max-sm:min-w-full",
              hasResult
                ? "border-[color-mix(in_srgb,var(--success)_25%,transparent)] bg-[color-mix(in_srgb,var(--success)_8%,transparent)] text-[var(--success-readable)]"
                : "border-border/50 bg-muted text-muted-foreground",
            )}
          >
            {result}
          </span>

          <button
            type="button"
            onClick={() => setHintOpen((open) => !open)}
            className={cn(
              "inline-flex flex-shrink-0 items-center gap-[5px] rounded-[20px] border px-3 py-[5px] text-[12px] font-semibold transition-all max-sm:w-full max-sm:justify-center",
              hintOpen
                ? "border-primary/40 bg-primary/10 text-primary"
                : "border-border bg-card text-muted-foreground hover:border-primary/40 hover:bg-primary/5 hover:text-primary",
            )}
          >
            💡 {hintOpen ? "Hide Hint" : "Show Hint"}
          </button>
        </div>

        {hintOpen ? (
          <div
            className="mt-2.5 flex items-start gap-[7px] rounded-[6px] bg-primary/10 px-3 py-2.5 text-[12px] text-primary"
            data-testid={`${testId}-hint`}
          >
            <span aria-hidden="true">💡</span>
            <span
              className="leading-[1.5]"
              dangerouslySetInnerHTML={{ __html: hint }}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
}
