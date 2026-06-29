"use client";

import { useState } from "react";
import type { ReactNode } from "react";
import { Lightbulb, Target } from "lucide-react";

import { cn } from "@/lib/utils";

import styles from "./practice-block.module.css";

export type BadgeTone = "green" | "blue" | "orange" | "red";

export interface BlockBadge {
  label: string;
  tone?: BadgeTone;
}

const toneClass: Record<BadgeTone, string> = {
  green: styles.badgeGreen,
  blue: styles.badgeBlue,
  orange: styles.badgeOrange,
  red: styles.badgeRed,
};

interface PracticeBlockProps {
  /** Number shown in the title pill, e.g. "1". */
  index?: string | number;
  /** Scenario title (HTML/code formatting allowed via ReactNode). */
  title: ReactNode;
  /** Difficulty badges. */
  badges?: BlockBadge[];
  /** Short "what to test" guidance, shown under the practice UI. */
  whatToTest?: ReactNode;
  /** Detailed hint, collapsed behind a "Show hint" toggle. */
  hint?: ReactNode;
  /** Stable id for automation hooks. */
  testId?: string;
  /**
   * The interactive practice UI. Drop in plain, class-less HTML
   * (`<button>`, `<input>`, `<label>`, `<output>`, …) and it is auto-styled by
   * the design system — no helper components required. Reach for
   * <PracticeButton> / <OutputBox> only when you need variants or tones.
   */
  children: ReactNode;
}

/**
 * Reusable scenario container for ANY practice element — the standard building
 * block for every `new-practice/*` route.
 *
 * Renders, in order:
 *   1. title (+ index pill and difficulty badges)
 *   2. the interactive practice UI you pass as `children`
 *   3. the "What to test" callout
 *   4. the collapsible "Show hint" toggle
 *
 * Future elements just compose these blocks and pass their own markup:
 *
 *   <PracticeBlock
 *     index="1"
 *     title="My Element"
 *     badges={[{ label: "Beginner", tone: "green" }]}
 *     whatToTest={<>Assert the result in <code>#out</code>.</>}
 *     hint={<p>Helpful guidance…</p>}
 *   >
 *     <button data-testid="go">Run</button>
 *     <output data-testid="out">Result appears here…</output>
 *   </PracticeBlock>
 */
export function PracticeBlock({
  index,
  title,
  badges,
  whatToTest,
  hint,
  testId,
  children,
}: PracticeBlockProps) {
  const [showHint, setShowHint] = useState(false);

  return (
    <section
      className={styles.block}
      data-testid={testId}
      data-section="practice-block"
    >
      <header className={styles.head}>
        <h3 className={styles.title}>
          {index !== undefined && <span className={styles.index}>{index}</span>}
          <span>{title}</span>
          {badges?.map((b) => (
            <span
              key={b.label}
              className={cn(styles.badge, toneClass[b.tone ?? "blue"])}
            >
              {b.label}
            </span>
          ))}
        </h3>
      </header>

      <div className={styles.blockBody}>{children}</div>

      {(whatToTest || hint) && (
        <footer className={styles.footer} data-section="practice-block-footer">
          {whatToTest && (
            <div className={styles.whatToTest} data-testid="what-to-test">
              <span className={styles.whatToTestLabel}>
                <Target className={styles.whatToTestIcon} aria-hidden="true" />
                What to test
              </span>
              <p className={styles.whatToTestText}>{whatToTest}</p>
            </div>
          )}

          {hint && (
            <>
              <button
                type="button"
                className={styles.hintToggle}
                onClick={() => setShowHint((v) => !v)}
                data-testid="hint-toggle"
                aria-expanded={showHint}
              >
                <Lightbulb className={styles.hintIcon} aria-hidden="true" />
                {showHint ? "Hide hint" : "Show hint"}
              </button>
              {showHint && (
                <div className={styles.hintPanel} data-testid="hint-panel">
                  {hint}
                </div>
              )}
            </>
          )}
        </footer>
      )}
    </section>
  );
}
