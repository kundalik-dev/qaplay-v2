import type { ReactNode } from "react";

import { UiPracticeShell } from "./_components/ui-practice-shell";

/**
 * UI Practice group layout.
 *
 * Applies to: /ui-practice and every /ui-practice/* sub-route.
 *
 * Renders a fixed, collapsible left sidebar + scrollable main area.
 * The global QA Playground top nav and footer are hidden for this route
 * (see DASHBOARD_PREFIXES in components/app-nav/conditional-site-chrome.tsx).
 */
export default function UiPracticeLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <UiPracticeShell>{children}</UiPracticeShell>;
}
