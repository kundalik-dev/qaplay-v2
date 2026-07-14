import "./dialog.css";

import { NativeAlertSection } from "./native-alert-section";
import { BeforeUnloadSection } from "./before-unload-section";
import { ToastSection } from "./toast-section";
import { CheatSheetSection } from "./cheat-sheet-section";

/**
 * Orchestrator for /ui-practice/dialog (the "Practice" tab - Test Cases
 * and Learn are their own sub-routes, see ./test-cases/page.tsx and
 * ./learn/page.tsx, driven by the shared UiPracticeTopBar in
 * app/(demo)/ui-practice/_components/ui-practice-topbar.tsx).
 *
 * Stays a Server Component - it only composes the four section
 * components (each independently opts into "use client" only where it
 * actually needs state/browser APIs). NativeAlertSection merges the
 * alert()/confirm()/prompt() native dialogs into one card.
 *
 * The "Hard Scenarios" link points at /ui-practice/dialog/hard-scenarios,
 * which isn't built yet - it will render the scoped ui-practice not-found
 * page (sidebar still visible) via the [...rest] catch-all until that
 * route is added.
 */
export function DialogPractice() {
  return (
    <div
      className="ui-practice-dialog-page"
      data-testid="ui-practice-dialog-page"
    >
      <div className="container">
        <h1 className="pb-2">Alerts / Dialogs — Playwright Practice</h1>

        <NativeAlertSection />
        <BeforeUnloadSection />
        <ToastSection />
        <CheatSheetSection />
      </div>
    </div>
  );
}
