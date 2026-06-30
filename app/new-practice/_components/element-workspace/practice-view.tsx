import type { ReactNode } from "react";

import styles from "./practice-view.module.css";

interface PracticeViewProps {
  /**
   * Your custom practice UI (HTML/CSS). Drop any markup here — buttons,
   * widgets, forms — and it renders inside the styled practice surface.
   */
  children?: ReactNode;
  /** Stable id suffix for automation hooks. */
  testId?: string;
}

/**
 * Reusable wrapper for the Practice tab.
 *
 * It provides the framing/surface; the actual interactive element is your own
 * custom HTML/CSS passed as children. Each element route writes its own
 * playground component and drops it in here.
 */
export function PracticeView({
  children,
  testId = "practice-view",
}: PracticeViewProps) {
  return (
    <div
      className={styles.surface}
      data-testid={testId}
      data-section="practice-view"
    >
      {children ?? (
        <div className={styles.placeholder} data-testid={`${testId}-placeholder`}>
          <p className={styles.placeholderTitle}>Practice UI goes here</p>
          <p className={styles.placeholderBody}>
            Add your custom HTML/CSS practice element as children of{" "}
            <code>&lt;PracticeView&gt;</code>.
          </p>
        </div>
      )}
    </div>
  );
}
