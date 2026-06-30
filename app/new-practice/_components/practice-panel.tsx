import type { ReactNode } from "react";

import styles from "./css-modules/practice-shell.module.css";

interface PracticePanelProps {
  /** When true, removes inner padding (for full-bleed content like tables). */
  flush?: boolean;
  /** Stable id for automation hooks. */
  testId?: string;
  className?: string;
  children?: ReactNode;
}

/**
 * A calm card surface that holds the actual practice widget.
 * Sits on top of the layout surface and uses the shared card tokens, so it
 * adapts to light/dark automatically.
 */
export function PracticePanel({
  flush = false,
  testId = "practice-panel",
  className,
  children,
}: PracticePanelProps) {
  const classes = [styles.panel, flush ? styles.panelFlush : "", className]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={classes} data-testid={testId} data-card="practice-panel">
      {children}
    </div>
  );
}
