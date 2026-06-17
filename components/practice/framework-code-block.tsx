"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import type { CodeSnippets } from "@/data/practice-data/types";
import styles from "./code-block.module.css";

type FwKey = "playwright" | "selenium" | "cypress";

const FW_LABELS: Record<FwKey, string> = {
  playwright: "PW JS",
  selenium:   "Selenium",
  cypress:    "Cypress",
};

const CODE_LANG: Record<FwKey, string> = {
  playwright: "Playwright · JavaScript",
  selenium:   "Selenium · Java",
  cypress:    "Cypress",
};

interface FrameworkCodeBlockProps {
  snippets: CodeSnippets;
}

/**
 * Block 7 — FrameworkCodeBlock
 * Tabbed code panel: Playwright JS / Selenium Java / Cypress.
 * Client component — manages framework switcher state.
 */
export function FrameworkCodeBlock({ snippets }: FrameworkCodeBlockProps) {
  const [active, setActive] = useState<FwKey>("playwright");
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(snippets[active]);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      // clipboard not available
    }
  }

  return (
    <div className="flex flex-col gap-2" data-testid="framework-code-block">
      {/* Framework switcher */}
      <div className="flex gap-1 bg-muted rounded-md p-1 border border-border">
        {(Object.keys(FW_LABELS) as FwKey[]).map((fw) => (
          <button
            key={fw}
            onClick={() => setActive(fw)}
            data-fw={fw}
            aria-pressed={active === fw}
            className={cn(
              "flex-1 text-[11px] font-mono font-semibold rounded-sm px-2 py-1 transition-all",
              active === fw
                ? "bg-card text-foreground border border-border shadow-sm"
                : "text-muted-foreground hover:text-foreground border border-transparent",
            )}
          >
            {FW_LABELS[fw]}
          </button>
        ))}
      </div>

      {/* Code block */}
      <div className="bg-card rounded-lg border border-border overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-3 py-2 border-b border-border bg-muted">
          <span className="font-mono text-[10px] text-muted-foreground">
            {CODE_LANG[active]}
          </span>
          <button
            onClick={handleCopy}
            className="h-6 px-2 text-[10px] font-mono text-muted-foreground
                       hover:text-primary transition-colors rounded-sm
                       hover:bg-primary/10"
            data-testid="copy-code-btn"
          >
            {copied ? "✓ Copied" : "Copy"}
          </button>
        </div>

        {/* Code body */}
        <div className="overflow-x-auto">
          <pre className={cn("p-4 text-[12px] leading-5", styles.codeBody)}>
            {snippets[active]}
          </pre>
        </div>
      </div>
    </div>
  );
}
