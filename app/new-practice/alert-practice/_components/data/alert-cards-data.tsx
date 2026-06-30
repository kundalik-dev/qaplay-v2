import React from "react";
import styles from "../alert-practice-playground.module.css";

export type CardData = {
  id: string;
  group: string;
  title: React.ReactNode;
  badges: Array<{ label: string; tone: "green" | "blue" | "orange" | "red" }>;
  whatToTest?: React.ReactNode;
  hint?: React.ReactNode;
};

export const ALERT_CARDS_DATA: CardData[] = [
  {
    id: "native-alert",
    group: "Core Scenarios",
    title: (
      <>
        Native <code>alert()</code>
      </>
    ),
    badges: [{ label: "Beginner", tone: "green" }],
    whatToTest: (
      <>
        Register a <code>page.on(&apos;dialog&apos;)</code> handler{" "}
        <strong>before</strong> clicking, assert the message, then{" "}
        <code>accept()</code>. The delayed button proves Playwright auto-waits
        for the dialog.
      </>
    ),
    hint: (
      <>
        <p>
          Auto-dismissed by Playwright by default. To assert text, register a
          handler BEFORE the click:{" "}
          <code>
            page.on(&apos;dialog&apos;, d =&gt; {"{"}{" "}
            expect(d.message()).toBe(&apos;...&apos;); d.accept(); {"}"})
          </code>
        </p>
        <p>
          Interview note: a native dialog blocks the page.{" "}
          <code>dialog.type()</code> returns <code>&apos;alert&apos;</code>;
          only <code>accept()</code> is valid (no text).
        </p>
      </>
    ),
  },
  {
    id: "confirm",
    group: "Core Scenarios",
    title: (
      <>
        <code>confirm()</code> — OK / Cancel
      </>
    ),
    badges: [{ label: "Beginner", tone: "green" }],
    whatToTest: (
      <>
        Drive <strong>both branches</strong> — accept (OK) and dismiss (Cancel)
        — and assert the side effect in <code>#confirm-result</code>, not the
        dialog text.
      </>
    ),
    hint: (
      <>
        <p>
          Two branches to automate. <code>d.accept()</code> → returns{" "}
          <code>true</code> (OK), <code>d.dismiss()</code> → returns{" "}
          <code>false</code> (Cancel). Assert the resulting page state.
        </p>
        <p>
          Best-practice assertion: don&apos;t just read{" "}
          <code>dialog.message()</code> — verify the{" "}
          <strong>side effect</strong> in <code>#confirm-result</code> after
          accept vs dismiss.
        </p>
      </>
    ),
  },
  {
    id: "prompt",
    group: "Core Scenarios",
    title: (
      <>
        <code>prompt()</code> — text input
      </>
    ),
    badges: [{ label: "Intermediate", tone: "blue" }],
    whatToTest: (
      <>
        Cover three cases: (a) accept with text, (b) accept with empty string,
        (c) dismiss → returns <code>null</code>. Assert the greeting in{" "}
        <code>#prompt-result</code>.
      </>
    ),
    hint: (
      <p>
        Pass text into the dialog: <code>d.accept(&apos;My answer&apos;)</code>.
        Dismiss/empty → app uses default or null. Note the default value via{" "}
        <code>d.defaultValue()</code>.
      </p>
    ),
  },
  {
    id: "beforeunload",
    group: "Core Scenarios",
    title: (
      <>
        <code>beforeunload</code> — leave-page warning
      </>
    ),
    badges: [{ label: "Advanced", tone: "orange" }],
    whatToTest: (
      <>
        Type to make the page dirty, then assert the leave-page warning fires on
        navigation; verify <strong>Mark as Saved</strong> clears it.
      </>
    ),
    hint: (
      <p>
        Fires on navigation/close when there are unsaved changes. In Playwright
        the dialog only appears if you trigger an actual unload; handle it via{" "}
        <code>page.on(&apos;dialog&apos;)</code> with{" "}
        <code>d.type() === &apos;beforeunload&apos;</code>, or pass{" "}
        <code>runBeforeUnload</code> to <code>page.close()</code>.
      </p>
    ),
  },
  {
    id: "html-dialog",
    group: "Core Scenarios",
    title: (
      <>
        Native HTML <code>&lt;dialog&gt;</code> element
      </>
    ),
    badges: [{ label: "Intermediate", tone: "blue" }],
    whatToTest: (
      <>
        Open via <code>showModal()</code>/<code>show()</code>, use normal
        locators, and assert visibility plus the <code>returnValue</code> after
        closing.
      </>
    ),
    hint: (
      <>
        <p>
          This is real DOM — NOT a JS dialog. Use normal locators:{" "}
          <code>getByRole(&apos;dialog&apos;)</code>,{" "}
          <code>
            getByRole(&apos;button&apos;, {"{"}name:&apos;Confirm&apos;{"}"})
          </code>
          . <code>showModal()</code> adds a backdrop &amp; traps focus;{" "}
          <code>show()</code> is non-modal.
        </p>
        <p>
          <code>&lt;form method=&quot;dialog&quot;&gt;</code> closes the dialog
          and sets <code>dialog.returnValue</code> to the clicked button&apos;s{" "}
          <code>value</code>. Assert with{" "}
          <code>expect(dialog).toBeVisible()</code> / <code>toBeHidden()</code>.
        </p>
      </>
    ),
  },
  {
    id: "custom-modal",
    group: "Core Scenarios",
    title: "Custom Modal (overlay div)",
    badges: [
      { label: "Intermediate", tone: "blue" },
      { label: "Advanced", tone: "orange" },
    ],
    whatToTest: (
      <>
        Open the modal, then close it via the ✕, Cancel, overlay click, and{" "}
        <kbd className={styles.kbd}>Esc</kbd> — assert the close reason each
        time.
      </>
    ),
    hint: (
      <p>
        The most common real-world case (React/Vue modals). It&apos;s just a
        styled <code>div</code> with <code>role=&quot;dialog&quot;</code>.
        Locate by role/testid; wait for it with{" "}
        <code>expect(modal).toBeVisible()</code>. Closing via overlay-click /
        Esc / X are 3 paths to test.
      </p>
    ),
  },
  {
    id: "toast",
    group: "Core Scenarios",
    title: "Toast / Snackbar (auto-dismiss)",
    badges: [{ label: "Advanced", tone: "orange" }],
    whatToTest: (
      <>
        Trigger a toast and assert it becomes visible, then auto-hides after ~3s
        — using web-first waits, never hard <code>waitForTimeout</code>.
      </>
    ),
    hint: (
      <p>
        Appears then disappears after ~3s — a classic flaky-test trap. Assert
        with web-first <code>expect(toast).toBeVisible()</code> immediately,
        then <code>expect(toast).toBeHidden()</code>. Avoid hard{" "}
        <code>waitForTimeout</code>.
      </p>
    ),
  },
  {
    id: "cheatsheet-core",
    group: "Core Scenarios",
    title: "Dialog Handling Cheat Sheet",
    badges: [],
  },
  {
    id: "chained-dialogs",
    group: "Hard Scenarios",
    title: "Chained Native Dialogs",
    badges: [{ label: "Hard", tone: "orange" }],
    whatToTest: (
      <>
        One persistent <code>page.on(&apos;dialog&apos;)</code> handler must
        branch on <code>d.type()</code> to answer alert → confirm → prompt;
        assert the combined outcome.
      </>
    ),
    hint: (
      <>
        <p>
          One click fires <strong>alert → confirm → prompt</strong>{" "}
          back-to-back. A single persistent{" "}
          <code>page.on(&apos;dialog&apos;)</code> handler must branch on{" "}
          <code>d.type()</code>, because each dialog needs a different response.
          The result depends on ALL three answers.
        </p>
        <p>
          Interview trap: a <code>page.once(&apos;dialog&apos;)</code> handler
          only catches the FIRST dialog — the next two would auto-dismiss. Use{" "}
          <code>page.on</code> with type-based branching.
        </p>
      </>
    ),
  },
  {
    id: "dynamic-otp",
    group: "Hard Scenarios",
    title: "Dynamic / Random Dialog Message",
    badges: [{ label: "Hard", tone: "orange" }],
    whatToTest: (
      <>
        Capture <code>dialog.message()</code>, extract the OTP via regex, and
        echo it back with <code>accept(code)</code>; assert success.
      </>
    ),
    hint: (
      <>
        <p>
          The prompt embeds a fresh random OTP each time, then validates your
          echo. You can&apos;t hardcode the message — capture it with{" "}
          <code>dialog.message()</code>, extract the code via regex, and feed it
          back with <code>dialog.accept(code)</code>.
        </p>
        <p>
          Assert with <code>expect(message).toMatch(/code: \d{"{6}"}/)</code>,
          not string equality.
        </p>
      </>
    ),
  },
  {
    id: "looping-confirm",
    group: "Hard Scenarios",
    title: (
      <>
        Looping <code>confirm()</code>
      </>
    ),
    badges: [{ label: "Hard", tone: "orange" }],
    whatToTest: (
      <>
        Accept a <strong>bounded</strong> number of confirms, then{" "}
        <code>dismiss()</code>; assert the final item count.
      </>
    ),
    hint: (
      <>
        <p>
          Keeps asking &quot;Add another item?&quot; and re-fires{" "}
          <code>confirm()</code> as long as you accept. Your handler must{" "}
          <code>accept()</code> a bounded number of times, then{" "}
          <code>dismiss()</code> — otherwise the test loops forever. Count is
          reflected in the DOM.
        </p>
        <p>
          Pattern: keep a counter in the handler —{" "}
          <code>
            let n=0; page.on(&apos;dialog&apos;, d =&gt; n++ &lt; 3 ? d.accept()
            : d.dismiss())
          </code>
          .
        </p>
      </>
    ),
  },
  {
    id: "iframe-dialog",
    group: "Hard Scenarios",
    title: "Native Dialog Fired From Inside an Iframe",
    badges: [{ label: "Hard", tone: "orange" }],
    whatToTest: (
      <>
        Click the button via{" "}
        <code>page.frameLocator(&apos;#child-frame&apos;)</code>, but catch the
        native dialog at the <strong>page</strong> level.
      </>
    ),
    hint: (
      <>
        <p>
          The button lives in a cross-document iframe, but native dialogs are
          page-level: you still catch them with{" "}
          <code>page.on(&apos;dialog&apos;)</code>. The CLICK, however, needs{" "}
          <code>
            page.frameLocator(&apos;#child-frame&apos;).getByTestId(&apos;iframe-alert&apos;)
          </code>
          .
        </p>
        <p>
          Key point: the dialog is NOT scoped to the frame — there is no{" "}
          <code>frame.on(&apos;dialog&apos;)</code>.
        </p>
      </>
    ),
  },
  {
    id: "nonclick-triggers",
    group: "Hard Scenarios",
    title: "Dialogs On Non-Click Events",
    badges: [{ label: "Hard", tone: "orange" }],
    whatToTest: (
      <>
        Reproduce the exact event — <code>hover()</code>, <code>blur()</code>,{" "}
        <code>dblclick()</code> — to fire each dialog; a plain{" "}
        <code>click()</code> won&apos;t work.
      </>
    ),
    hint: (
      <p>
        Real apps fire dialogs on hover, blur, double-click, etc. You must
        reproduce the exact event (<code>hover()</code>, <code>blur()</code>,{" "}
        <code>dblclick()</code>) — a plain <code>click()</code> won&apos;t
        trigger them.
      </p>
    ),
  },
  {
    id: "stacked-modals",
    group: "Hard Scenarios",
    title: "Stacked (Nested) Modals",
    badges: [{ label: "Hard", tone: "orange" }],
    whatToTest: (
      <>
        Two <code>role=&quot;dialog&quot;</code> elements are open at once —
        disambiguate with <code>.last()</code>/testid and close in LIFO order.
      </>
    ),
    hint: (
      <p>
        Modal A opens Modal B on top of it. Two elements with{" "}
        <code>role=&quot;dialog&quot;</code> exist at once —{" "}
        <code>getByRole(&apos;dialog&apos;)</code> becomes strict-mode
        ambiguous. Disambiguate with <code>.last()</code>, testid, or{" "}
        <code>aria-label</code>, and close in LIFO order.
      </p>
    ),
  },
  {
    id: "focus-trap",
    group: "Hard Scenarios",
    title: "Focus-Trap Modal — Esc & Overlay Disabled",
    badges: [{ label: "Hard", tone: "red" }],
    whatToTest: (
      <>
        Esc and overlay clicks are disabled — locate and click the explicit{" "}
        <strong>Acknowledge</strong> button to dismiss.
      </>
    ),
    hint: (
      <p>
        Esc does nothing and clicking the backdrop does nothing — the ONLY way
        out is a specific button. Tests that blindly press Escape or click the
        overlay will hang. Must locate and click the explicit dismiss control.
      </p>
    ),
  },
  {
    id: "shadow-dom",
    group: "Hard Scenarios",
    title: "Modal Inside Shadow DOM",
    badges: [{ label: "Hard", tone: "red" }],
    whatToTest: (
      <>
        Pierce the open shadow root with <code>getByRole</code>/
        <code>getByTestId</code> to click <code>shadow-confirm</code> (raw
        CSS/XPath can&apos;t).
      </>
    ),
    hint: (
      <p>
        The dialog is rendered inside a shadow root. Playwright&apos;s{" "}
        <code>getByRole</code>/<code>getByText</code> pierce open shadow DOM
        automatically — but raw CSS chains and XPath do NOT. Good test: confirm{" "}
        <code>getByTestId(&apos;shadow-confirm&apos;)</code> works.
      </p>
    ),
  },
  {
    id: "async-race",
    group: "Hard Scenarios",
    title: "Async Race — Delayed Confirm & Queued Toasts",
    badges: [{ label: "Hard", tone: "red" }],
    whatToTest: (
      <>
        Register the dialog handler up front; the confirm appears after ~1.2s,
        then assert the queued toasts with web-first waits, never fixed sleeps.
      </>
    ),
    hint: (
      <p>
        The <code>confirm()</code> only appears AFTER a simulated 1.2s API call,
        and on accept three toasts fire in sequence (200ms apart) then
        auto-dismiss. Register the dialog handler up front; assert toasts with
        web-first waits, never fixed sleeps.
      </p>
    ),
  },
  {
    id: "cheatsheet-hard",
    group: "Hard Scenarios",
    title: "Hard-Pattern Cheat Sheet",
    badges: [],
  },
];
