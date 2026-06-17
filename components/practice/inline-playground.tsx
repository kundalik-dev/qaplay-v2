"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import styles from "./inline-playground.module.css";

interface InlinePlaygroundProps {
  title: string;
  /** e.g. "S01 · S02" — shown in the titlebar corner */
  scenarioTag?: string;
  badgeVariant?: "disabled" | "readonly";
  /** The practice element(s) rendered in the left column */
  leftColumn: React.ReactNode;
  /** Hint text below the elements */
  hint: string;
  /** id for the result <span> */
  resultId: string;
  /** Short illustrative code snippet */
  codeSnippet: string;
  codeLabel?: string;
  testId?: string;
  /** Controlled: call onFire() from children to signal an interaction happened */
  onFire?: () => void;
}

/**
 * Block 11 — InlinePlayground
 * macOS-style two-column practice panel embedded in Learn tab sections.
 * Left: element zone + hint. Right: terminal-style output + code snippet.
 * Client component.
 */
export function InlinePlayground({
  title,
  scenarioTag,
  badgeVariant,
  leftColumn,
  hint,
  resultId,
  codeSnippet,
  codeLabel = "All frameworks",
  testId,
}: InlinePlaygroundProps) {
  const [fired, setFired] = useState(false);
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(codeSnippet);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      // clipboard not available
    }
  }

  // Expose a fire trigger so parent can signal interactions
  function handleFire() {
    setFired(true);
  }

  return (
    <div className={styles.panel} data-testid={testId}>
      {/* macOS titlebar */}
      <div className={styles.titlebar}>
        <div className={styles.dots}>
          <span className={cn(styles.dot, styles.dotRed)}   />
          <span className={cn(styles.dot, styles.dotYellow)}/>
          <span className={cn(styles.dot, styles.dotGreen)} />
        </div>

        <span className={styles.titlebarLabel}>{title}</span>

        {scenarioTag && (
          <span className={styles.titlebarTag}>{scenarioTag}</span>
        )}

        {badgeVariant === "disabled" && (
          <span className="font-mono text-[9px] uppercase tracking-widest px-2 py-0.5
                           rounded border border-[var(--warning)]/30 bg-[var(--warning)]/10
                           text-[var(--warning)]">
            DISABLED
          </span>
        )}
        {badgeVariant === "readonly" && (
          <span className="font-mono text-[9px] uppercase tracking-widest px-2 py-0.5
                           rounded border border-[var(--info)]/30 bg-[var(--info)]/10
                           text-[var(--info)]">
            READ-ONLY
          </span>
        )}
      </div>

      {/* Two-column body */}
      <div className={styles.body}>
        {/* Left — element zone */}
        <div className={styles.leftCol}>
          <span className={styles.colLabel}>Element</span>

          {/* Wrap children and capture fire events via onClickCapture */}
          <div
            className="flex flex-col items-start gap-2"
            onClickCapture={handleFire}
          >
            {leftColumn}
          </div>

          <span className={styles.hint}>{hint}</span>
        </div>

        {/* Right — output + code */}
        <div className={styles.rightCol}>
          <span className={styles.colLabel}>Output</span>

          {/* Terminal output zone */}
          <div className={styles.outputZone}>
            <div className={cn(styles.outputBar, fired && styles.outputBarFired)}>
              {fired ? "● FIRED" : "○ WAITING"}
            </div>
            <div className={styles.outputBody}>
              <span
                id={resultId}
                data-testid={`playground-result-${resultId}`}
                className="text-[12px] text-muted-foreground font-mono"
              >
                No action yet…
              </span>
            </div>
          </div>

          {/* Inline code snippet */}
          <div className={styles.codeZone}>
            <div className={styles.codeZoneHeader}>
              <span className={styles.codeZoneLabel}>{codeLabel}</span>
              <button
                onClick={handleCopy}
                className="font-mono text-[9px] text-muted-foreground hover:text-primary
                           transition-colors px-1.5 py-0.5 rounded-sm hover:bg-primary/10"
              >
                {copied ? "✓" : "Copy"}
              </button>
            </div>
            <pre className={styles.codeZonePre}>{codeSnippet}</pre>
          </div>
        </div>
      </div>
    </div>
  );
}
