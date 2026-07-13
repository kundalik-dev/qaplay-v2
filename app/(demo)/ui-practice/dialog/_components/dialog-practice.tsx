import "./dialog.css";

import Link from "next/link";

import { NativeAlertSection } from "./native-alert-section";
import { NativeConfirmSection } from "./native-confirm-section";
import { NativePromptSection } from "./native-prompt-section";
import { BeforeUnloadSection } from "./before-unload-section";
import { HtmlDialogSection } from "./html-dialog-section";
import { CustomModalSection } from "./custom-modal-section";
import { ToastSection } from "./toast-section";
import { CheatSheetSection } from "./cheat-sheet-section";

/**
 * Orchestrator for /ui-practice/dialog. Stays a Server Component — it
 * only composes the eight section components (each independently opts
 * into "use client" only where it actually needs state/browser APIs).
 *
 * The "Hard Scenarios" link points at /ui-practice/dialog/hard-scenarios,
 * which isn't built yet — it will render the scoped ui-practice not-found
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
        {/* <p className="intro-note pb-2">
          Two very different worlds: <strong>native JS dialogs</strong> (
          <code>alert</code>/<code>confirm</code>/<code>prompt</code>/
          <code>beforeunload</code> — handled with{" "}
          <code>page.on(&apos;dialog&apos;)</code>, NOT locators) vs{" "}
          <strong>in-DOM dialogs</strong> (HTML <code>&lt;dialog&gt;</code>,
          custom modals, toasts — handled with normal locators).
        </p> */}

        <NativeAlertSection />
        <NativeConfirmSection />
        <NativePromptSection />
        <BeforeUnloadSection />
        <HtmlDialogSection />
        <CustomModalSection />
        <ToastSection />
        <CheatSheetSection />
      </div>
    </div>
  );
}
