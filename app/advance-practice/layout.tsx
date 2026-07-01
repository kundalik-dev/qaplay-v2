import type { ReactNode } from "react";

import styles from "./_components/css-modules/practice-layout.module.css";
import { cn } from "@/lib/utils";

/**
 * Practice playground layout.
 *
 * - No global navbar/footer (suppressed via DASHBOARD_PREFIXES in
 *   components/app-nav/conditional-site-chrome.tsx).
 * - Paints its own calm, low-strain surface that covers the global grid
 *   background. Light/dark aware.
 */
const PracticeNewLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div
      data-testid="practice-layout"
      data-section="practice"
      className={cn(styles.surface, "")}
    >
      <div className={styles.container}>{children}</div>
    </div>
  );
};

export default PracticeNewLayout;
