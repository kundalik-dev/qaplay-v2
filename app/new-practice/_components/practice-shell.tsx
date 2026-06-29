import type { ReactNode } from "react";

import styles from "./css-modules/practice-shell.module.css";

interface PracticeShellProps {
  /** Optional small uppercase label shown above the title. */
  eyebrow?: string;
  /** Page heading. */
  title?: string;
  /** Short supporting copy under the title. */
  description?: string;
  /** Right-aligned controls in the header (buttons, theme toggle, etc.). */
  actions?: ReactNode;
  /** Stable id suffix for automation hooks. */
  testId?: string;
  children: ReactNode;
}

/**
 * Page-level wrapper for a practice playground.
 * Renders an optional header (eyebrow / title / description / actions) and the
 * playground content below it.
 */
export function PracticeShell({
  eyebrow,
  title,
  description,
  actions,
  testId = "practice-shell",
  children,
}: PracticeShellProps) {
  const hasHeader = Boolean(eyebrow || title || description || actions);

  return (
    <section
      className={styles.shell}
      data-testid={testId}
      data-section="practice-shell"
    >
      {hasHeader && (
        <header className={styles.header} data-testid={`${testId}-header`}>
          <div className={styles.headingGroup}>
            {eyebrow && <span className={styles.eyebrow}>{eyebrow}</span>}
            {title && <h1 className={styles.title}>{title}</h1>}
            {description && <p className={styles.description}>{description}</p>}
          </div>
          {actions && <div className={styles.actions}>{actions}</div>}
        </header>
      )}

      <div data-testid={`${testId}-content`}>{children}</div>
    </section>
  );
}
