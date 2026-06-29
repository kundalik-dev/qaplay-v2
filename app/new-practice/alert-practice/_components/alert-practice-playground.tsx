"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import {
  OutputBox,
  PracticeBlock,
  PracticeButton,
  controlStyles as ui,
} from "../../_components/practice-block";
import styles from "./alert-practice-playground.module.css";

type ResultValue = { text: string; tone?: "danger" | "success" };
type ToastItem = { id: number; message: string; type: "success" | "error" | "" };

// Metadata for pagination header (group label + title mirror the block)
const CARD_META = [
  { group: "Core Scenarios", title: "Native alert()" },
  { group: "Core Scenarios", title: "confirm() — OK / Cancel" },
  { group: "Core Scenarios", title: "prompt() — text input" },
  { group: "Core Scenarios", title: "beforeunload — leave-page warning" },
  { group: "Core Scenarios", title: "Native HTML <dialog> element" },
  { group: "Core Scenarios", title: "Custom Modal (overlay div)" },
  { group: "Core Scenarios", title: "Toast / Snackbar (auto-dismiss)" },
  { group: "Core Scenarios", title: "Dialog Handling Cheat Sheet" },
  { group: "Hard Scenarios", title: "Chained Native Dialogs" },
  { group: "Hard Scenarios", title: "Dynamic / Random Dialog Message" },
  { group: "Hard Scenarios", title: "Looping confirm()" },
  { group: "Hard Scenarios", title: "Native Dialog Fired From Inside an Iframe" },
  { group: "Hard Scenarios", title: "Dialogs On Non-Click Events" },
  { group: "Hard Scenarios", title: "Stacked (Nested) Modals" },
  { group: "Hard Scenarios", title: "Focus-Trap Modal" },
  { group: "Hard Scenarios", title: "Modal Inside Shadow DOM" },
  { group: "Hard Scenarios", title: "Async Race — Delayed Confirm & Queued Toasts" },
  { group: "Hard Scenarios", title: "Hard-Pattern Cheat Sheet" },
];

export function AlertPracticePlayground() {
  const [currentCard, setCurrentCard] = useState(0);
  const total = CARD_META.length;
  const meta = CARD_META[currentCard];

  const goTo = (idx: number) => {
    if (idx >= 0 && idx < total) setCurrentCard(idx);
  };

  // ── Shared result state ──────────────────────────────────────────────────────
  const [results, setResults] = useState<Record<string, ResultValue>>({});
  const setResult = (id: string, value: string | ResultValue) =>
    setResults((prev) => ({
      ...prev,
      [id]: typeof value === "string" ? { text: value } : value,
    }));
  const out = (id: string, fallback: string) => results[id]?.text ?? fallback;
  const tone = (id: string) => results[id]?.tone ?? "default";

  // ── Section 4: beforeunload ──────────────────────────────────────────────────
  const [draft, setDraft] = useState("");
  const isDirty = draft.length > 0;
  useEffect(() => {
    const handler = (e: BeforeUnloadEvent) => {
      if (isDirty) { e.preventDefault(); e.returnValue = ""; }
    };
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [isDirty]);

  // ── Section 5: HTML <dialog> ─────────────────────────────────────────────────
  const htmlDialogRef = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const dialog = htmlDialogRef.current;
    if (!dialog) return;
    const onClose = () =>
      setResult("html-dialog-result", `Dialog closed. returnValue = "${dialog.returnValue || "(none)"}"`)
    dialog.addEventListener("close", onClose);
    return () => dialog.removeEventListener("close", onClose);
  }, []);

  // ── Section 6: custom modal ──────────────────────────────────────────────────
  const [customModalOpen, setCustomModalOpen] = useState(false);
  const openCustomModal = () => setCustomModalOpen(true);
  const closeCustomModal = (reason: string) => {
    setCustomModalOpen(false);
    setResult("custom-modal-result", `Closed via: ${reason}`);
  };

  // ── Hard 6/7: stacked + trap overlays ───────────────────────────────────────
  const [overlay1Open, setOverlay1Open] = useState(false);
  const [overlay2Open, setOverlay2Open] = useState(false);
  const [overlayTrapOpen, setOverlayTrapOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (customModalOpen) closeCustomModal("escape");
      if (overlay2Open) setOverlay2Open(false);
      if (overlay1Open) setOverlay1Open(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [customModalOpen, overlay1Open, overlay2Open]);

  // ── Toasts ───────────────────────────────────────────────────────────────────
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const toastId = useRef(0);
  const showToast = (message: string, type: ToastItem["type"]) => {
    const id = toastId.current++;
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 3000);
  };

  // ── Hard 8: shadow DOM modal ─────────────────────────────────────────────────
  const shadowHostRef = useRef<HTMLDivElement>(null);
  const openShadowModal = () => {
    const host = shadowHostRef.current;
    if (!host) return;
    const root = host.shadowRoot ?? host.attachShadow({ mode: "open" });
    root.innerHTML = `
      <style>
        .ov { position: fixed; inset: 0; background: rgba(31,41,51,0.45);
              display: flex; align-items: center; justify-content: center; z-index: 1030; }
        .m { background:#fff; border-radius:8px; padding:24px; max-width:420px;
             box-shadow:0 8px 30px rgba(0,0,0,0.25); font-family: Arial, sans-serif; }
        h3 { margin-top:0; color:#334e68; }
        button { margin-top:16px; padding:8px 18px; border:none; border-radius:5px;
                 color:#fff; background:#4a90d9; cursor:pointer; font-size:14px; }
      </style>
      <div class="ov" part="overlay">
        <div class="m" role="dialog" aria-modal="true" aria-label="Shadow Modal">
          <h3>Shadow DOM Modal</h3>
          <p>Rendered inside a shadow root. Confirm to close.</p>
          <button data-testid="shadow-confirm">Confirm (Shadow)</button>
        </div>
      </div>`;
    root.querySelector('[data-testid="shadow-confirm"]')
      ?.addEventListener("click", () => {
        root.innerHTML = "";
        setResult("shadow-result", "Shadow modal confirmed");
      });
  };

  const handleConfirm = () => {
    const ok = confirm("Are you sure you want to delete your account? This cannot be undone.");
    setResult("confirm-result", ok
      ? { text: "Account deleted (you clicked OK).", tone: "danger" }
      : { text: "Deletion cancelled (you clicked Cancel).", tone: "success" });
  };

  const handlePrompt = () => {
    const name = prompt("What is your name?", "Guest");
    if (name === null) setResult("prompt-result", "You dismissed the prompt (returned null).");
    else if (name.trim() === "") setResult("prompt-result", "Hello, anonymous! (empty string submitted)");
    else setResult("prompt-result", `Hello, ${name}! Welcome aboard.`);
  };

  const resetDirty = () => setDraft("");

  const runChain = () => {
    alert("Step 1 of 3: Your cart is ready.");
    const proceed = confirm("Step 2 of 3: Proceed to payment?");
    if (!proceed) { setResult("chain-result", "Checkout cancelled at payment step."); return; }
    const coupon = prompt("Step 3 of 3: Enter a coupon code (or leave blank):", "");
    setResult("chain-result", coupon && coupon.trim()
      ? `Order placed with coupon "${coupon.trim()}".`
      : "Order placed with no coupon.");
  };

  const verifyOtp = () => {
    const otp = String(Math.floor(100000 + Math.random() * 900000));
    const entered = prompt(`Enter the verification code: ${otp}`);
    const ok = entered !== null && entered.trim() === otp;
    setResult("otp-result", ok ? `Verified! (code ${otp})` : `Verification failed (expected ${otp}).`);
  };

  const runLoopConfirm = () => {
    let count = 0;
    while (confirm(`Item ${count + 1} added. Add another item?`)) {
      count++;
      if (count >= 50) break;
    }
    setResult("loop-result", `Items added: ${count}`);
  };

  const asyncSave = () => {
    setResult("async-result", "Saving…");
    setTimeout(() => {
      const ok = confirm("Server responded. Commit these changes?");
      if (!ok) { setResult("async-result", "Changes discarded."); return; }
      setResult("async-result", "Changes committed.");
      const msgs: Array<[string, ToastItem["type"]]> = [
        ["Validating…", ""], ["Uploading…", ""], ["Done!", "success"],
      ];
      msgs.forEach(([text, type], i) => setTimeout(() => showToast(text, type), i * 200));
    }, 1200);
  };

  // ── Card definitions ─────────────────────────────────────────────────────────
  const cards = [
    /* 0 — Native alert() */
    <PracticeBlock
      key="1"
      index="1"
      testId="block-simple-alert"
      title={<>Native <code>alert()</code></>}
      badges={[{ label: "Beginner", tone: "green" }]}
      whatToTest={<>Register a <code>page.on(&apos;dialog&apos;)</code> handler <strong>before</strong> clicking, assert the message, then <code>accept()</code>. The delayed button proves Playwright auto-waits for the dialog.</>}
      hint={<><p>Auto-dismissed by Playwright by default. To assert text, register a handler BEFORE the click: <code>page.on(&apos;dialog&apos;, d =&gt; {"{"} expect(d.message()).toBe(&apos;...&apos;); d.accept(); {"}"})</code></p><p>Interview note: a native dialog blocks the page. <code>dialog.type()</code> returns <code>&apos;alert&apos;</code>; only <code>accept()</code> is valid (no text).</p></>}
    >
      <div className={ui.btnRow}>
        <PracticeButton id="simple-alert-btn" data-testid="simple-alert" onClick={() => alert("Hello! This is a simple alert.")}>Show Simple Alert</PracticeButton>
        <PracticeButton id="delayed-alert-btn" variant="secondary" data-testid="delayed-alert" onClick={() => setTimeout(() => alert("Delayed alert after 1.5s"), 1500)}>Show Delayed Alert (1.5s)</PracticeButton>
      </div>
    </PracticeBlock>,

    /* 1 — confirm() */
    <PracticeBlock
      key="2"
      index="2"
      testId="block-confirm"
      title={<><code>confirm()</code> — OK / Cancel</>}
      badges={[{ label: "Beginner", tone: "green" }]}
      whatToTest={<>Drive <strong>both branches</strong> — accept (OK) and dismiss (Cancel) — and assert the side effect in <code>#confirm-result</code>, not the dialog text.</>}
      hint={<><p>Two branches to automate. <code>d.accept()</code> → returns <code>true</code> (OK), <code>d.dismiss()</code> → returns <code>false</code> (Cancel). Assert the resulting page state.</p><p>Best-practice assertion: don&apos;t just read <code>dialog.message()</code> — verify the <strong>side effect</strong> in <code>#confirm-result</code> after accept vs dismiss.</p></>}
    >
      <div className={ui.btnRow}>
        <PracticeButton id="confirm-btn" data-testid="confirm-action" onClick={handleConfirm}>Delete Account</PracticeButton>
      </div>
      <OutputBox id="confirm-result" testId="confirm-result" tone={tone("confirm-result")}>{out("confirm-result", "Result will appear here…")}</OutputBox>
    </PracticeBlock>,

    /* 2 — prompt() */
    <PracticeBlock
      key="3"
      index="3"
      testId="block-prompt"
      title={<><code>prompt()</code> — text input</>}
      badges={[{ label: "Intermediate", tone: "blue" }]}
      whatToTest={<>Cover three cases: (a) accept with text, (b) accept with empty string, (c) dismiss → returns <code>null</code>. Assert the greeting in <code>#prompt-result</code>.</>}
      hint={<p>Pass text into the dialog: <code>d.accept(&apos;My answer&apos;)</code>. Dismiss/empty → app uses default or null. Note the default value via <code>d.defaultValue()</code>.</p>}
    >
      <div className={ui.btnRow}>
        <PracticeButton id="prompt-btn" data-testid="prompt-action" onClick={handlePrompt}>Enter Your Name</PracticeButton>
      </div>
      <OutputBox id="prompt-result" testId="prompt-result">{out("prompt-result", "Greeting will appear here…")}</OutputBox>
    </PracticeBlock>,

    /* 3 — beforeunload */
    <PracticeBlock
      key="4"
      index="4"
      testId="block-beforeunload"
      title={<><code>beforeunload</code> — leave-page warning</>}
      badges={[{ label: "Advanced", tone: "orange" }]}
      whatToTest={<>Type to make the page dirty, then assert the leave-page warning fires on navigation; verify <strong>Mark as Saved</strong> clears it.</>}
      hint={<p>Fires on navigation/close when there are unsaved changes. In Playwright the dialog only appears if you trigger an actual unload; handle it via <code>page.on(&apos;dialog&apos;)</code> with <code>d.type() === &apos;beforeunload&apos;</code>, or pass <code>runBeforeUnload</code> to <code>page.close()</code>.</p>}
    >
      <div className={ui.field}>
        <label className={ui.label} htmlFor="draft-input">Edit this draft, then try to reload / navigate away</label>
        <input type="text" id="draft-input" data-testid="draft-input" className={ui.input} placeholder="Type to make the page 'dirty'…" value={draft} onChange={(e) => setDraft(e.target.value)} />
      </div>
      <div className={ui.btnRow}>
        <PracticeButton id="reset-dirty-btn" variant="secondary" onClick={resetDirty}>Mark as Saved (clears warning)</PracticeButton>
      </div>
      <p id="dirty-state" data-testid="dirty-state" style={{ marginTop: 10 }}>
        {isDirty ? "State: dirty — leaving the page will warn you" : "State: clean (no warning)"}
      </p>
    </PracticeBlock>,

    /* 4 — HTML <dialog> */
    <PracticeBlock
      key="5"
      index="5"
      testId="block-html-dialog"
      title={<>Native HTML <code>&lt;dialog&gt;</code> element</>}
      badges={[{ label: "Intermediate", tone: "blue" }]}
      whatToTest={<>Open via <code>showModal()</code>/<code>show()</code>, use normal locators, and assert visibility plus the <code>returnValue</code> after closing.</>}
      hint={<><p>This is real DOM — NOT a JS dialog. Use normal locators: <code>getByRole(&apos;dialog&apos;)</code>, <code>getByRole(&apos;button&apos;, {"{"}name:&apos;Confirm&apos;{"}"})</code>. <code>showModal()</code> adds a backdrop &amp; traps focus; <code>show()</code> is non-modal.</p><p><code>&lt;form method=&quot;dialog&quot;&gt;</code> closes the dialog and sets <code>dialog.returnValue</code> to the clicked button&apos;s <code>value</code>. Assert with <code>expect(dialog).toBeVisible()</code> / <code>toBeHidden()</code>.</p></>}
    >
      <div className={ui.btnRow}>
        <PracticeButton id="open-modal-dialog" data-testid="open-html-dialog" onClick={() => htmlDialogRef.current?.showModal()}>Open Modal Dialog</PracticeButton>
        <PracticeButton id="open-nonmodal-dialog" variant="secondary" data-testid="open-html-dialog-nonmodal" onClick={() => htmlDialogRef.current?.show()}>Open Non-Modal</PracticeButton>
      </div>
      <dialog ref={htmlDialogRef} id="html-dialog" data-testid="html-dialog" aria-labelledby="html-dialog-title" className={styles.htmlDialog}>
        <h3 id="html-dialog-title">Confirm Subscription</h3>
        <p>Do you want to subscribe to the newsletter?</p>
        <form method="dialog" className={styles.dialogActions}>
          <button value="cancel" data-testid="html-dialog-cancel" className={`${ui.btn} ${ui.btnSecondary}`}>Cancel</button>
          <button value="confirm" data-testid="html-dialog-confirm" className={`${ui.btn} ${ui.btnPrimary}`}>Confirm</button>
        </form>
      </dialog>
      <OutputBox id="html-dialog-result" testId="html-dialog-result">{out("html-dialog-result", "returnValue will appear here…")}</OutputBox>
    </PracticeBlock>,

    /* 5 — Custom modal */
    <PracticeBlock
      key="6"
      index="6"
      testId="block-custom-modal"
      title="Custom Modal (overlay div)"
      badges={[{ label: "Intermediate", tone: "blue" }, { label: "Advanced", tone: "orange" }]}
      whatToTest={<>Open the modal, then close it via the ✕, Cancel, overlay click, and <kbd className={styles.kbd}>Esc</kbd> — assert the close reason each time.</>}
      hint={<p>The most common real-world case (React/Vue modals). It&apos;s just a styled <code>div</code> with <code>role=&quot;dialog&quot;</code>. Locate by role/testid; wait for it with <code>expect(modal).toBeVisible()</code>. Closing via overlay-click / Esc / X are 3 paths to test.</p>}
    >
      <div className={ui.btnRow}>
        <PracticeButton id="open-custom-modal" data-testid="open-custom-modal" onClick={openCustomModal}>Open Custom Modal</PracticeButton>
      </div>
      <div className={`${styles.modalOverlay} ${customModalOpen ? styles.modalOverlayOpen : ""}`} id="custom-modal-overlay" data-testid="custom-modal-overlay" onClick={(e) => { if (e.target === e.currentTarget) closeCustomModal("overlay"); }}>
        <div className={styles.modal} role="dialog" aria-modal="true" aria-labelledby="custom-modal-title" data-testid="custom-modal">
          <button className={styles.modalClose} aria-label="Close" data-testid="custom-modal-close" onClick={() => closeCustomModal("x")}>&times;</button>
          <h3 id="custom-modal-title">Custom Modal Title</h3>
          <p>This modal lives in the DOM. Try closing via the ✕, the Cancel button, clicking the dark overlay, or pressing <kbd className={styles.kbd}>Esc</kbd>.</p>
          <div className={styles.modalActions}>
            <button className={`${ui.btn} ${ui.btnSecondary}`} data-testid="custom-modal-cancel" onClick={() => closeCustomModal("cancel")}>Cancel</button>
            <button className={`${ui.btn} ${ui.btnDanger}`} data-testid="custom-modal-confirm" onClick={() => closeCustomModal("confirm")}>Confirm</button>
          </div>
        </div>
      </div>
      <OutputBox id="custom-modal-result" testId="custom-modal-result">{out("custom-modal-result", "Last close reason…")}</OutputBox>
    </PracticeBlock>,

    /* 6 — Toast */
    <PracticeBlock
      key="7"
      index="7"
      testId="block-toast"
      title="Toast / Snackbar (auto-dismiss)"
      badges={[{ label: "Advanced", tone: "orange" }]}
      whatToTest={<>Trigger a toast and assert it becomes visible, then auto-hides after ~3s — using web-first waits, never hard <code>waitForTimeout</code>.</>}
      hint={<p>Appears then disappears after ~3s — a classic flaky-test trap. Assert with web-first <code>expect(toast).toBeVisible()</code> immediately, then <code>expect(toast).toBeHidden()</code>. Avoid hard <code>waitForTimeout</code>.</p>}
    >
      <div className={ui.btnRow}>
        <PracticeButton variant="secondary" data-testid="toast-success" onClick={() => showToast("Saved successfully!", "success")}>Trigger Success Toast</PracticeButton>
        <PracticeButton variant="danger" data-testid="toast-error" onClick={() => showToast("Something went wrong.", "error")}>Trigger Error Toast</PracticeButton>
      </div>
    </PracticeBlock>,

    /* 7 — Core cheat sheet */
    <PracticeBlock key="8" index="8" testId="block-cheatsheet-core" title="Dialog Handling Cheat Sheet">
      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead><tr><th>Type</th><th>Is it real DOM?</th><th>How to handle in Playwright</th><th>Key API</th></tr></thead>
          <tbody>
            <tr><td><code>alert()</code></td><td>No (browser-native)</td><td><code>page.on(&apos;dialog&apos;, d =&gt; d.accept())</code> before click</td><td><code>dialog.message()</code>, <code>accept()</code></td></tr>
            <tr><td><code>confirm()</code></td><td>No</td><td>Register handler, then <code>accept()</code> (OK) or <code>dismiss()</code> (Cancel)</td><td><code>accept()</code> / <code>dismiss()</code></td></tr>
            <tr><td><code>prompt()</code></td><td>No</td><td>Pass text: <code>d.accept(&apos;value&apos;)</code></td><td><code>defaultValue()</code>, <code>accept(text)</code></td></tr>
            <tr><td><code>beforeunload</code></td><td>No</td><td>Check <code>d.type()===&apos;beforeunload&apos;</code>; <code>page.close({"{"}runBeforeUnload:true{"}"})</code></td><td><code>dialog.type()</code></td></tr>
            <tr><td>HTML <code>&lt;dialog&gt;</code></td><td>Yes</td><td>Normal locators; assert visibility &amp; <code>returnValue</code></td><td><code>getByRole(&apos;dialog&apos;)</code></td></tr>
            <tr><td>Custom modal (div)</td><td>Yes</td><td>Locate by role/testid; web-first <code>toBeVisible()</code></td><td><code>expect(loc).toBeVisible()</code></td></tr>
            <tr><td>Toast / snackbar</td><td>Yes (transient)</td><td>Assert visible, then hidden; no hard sleeps</td><td><code>toBeVisible()</code> / <code>toBeHidden()</code></td></tr>
          </tbody>
        </table>
      </div>
    </PracticeBlock>,

    /* 8 — Chained dialogs */
    <PracticeBlock
      key="9"
      index="9"
      testId="block-chain"
      title="Chained Native Dialogs"
      badges={[{ label: "Hard", tone: "orange" }]}
      whatToTest={<>One persistent <code>page.on(&apos;dialog&apos;)</code> handler must branch on <code>d.type()</code> to answer alert → confirm → prompt; assert the combined outcome.</>}
      hint={<><p>One click fires <strong>alert → confirm → prompt</strong> back-to-back. A single persistent <code>page.on(&apos;dialog&apos;)</code> handler must branch on <code>d.type()</code>, because each dialog needs a different response. The result depends on ALL three answers.</p><p>Interview trap: a <code>page.once(&apos;dialog&apos;)</code> handler only catches the FIRST dialog — the next two would auto-dismiss. Use <code>page.on</code> with type-based branching.</p></>}
    >
      <div className={ui.btnRow}>
        <PracticeButton id="chain-btn" data-testid="chain-dialogs" onClick={runChain}>Start Checkout Flow</PracticeButton>
      </div>
      <OutputBox id="chain-result" testId="chain-result">{out("chain-result", "Outcome appears here…")}</OutputBox>
    </PracticeBlock>,

    /* 9 — Random OTP */
    <PracticeBlock
      key="10"
      index="10"
      testId="block-otp"
      title="Dynamic / Random Dialog Message"
      badges={[{ label: "Hard", tone: "orange" }]}
      whatToTest={<>Capture <code>dialog.message()</code>, extract the OTP via regex, and echo it back with <code>accept(code)</code>; assert success.</>}
      hint={<><p>The prompt embeds a fresh random OTP each time, then validates your echo. You can&apos;t hardcode the message — capture it with <code>dialog.message()</code>, extract the code via regex, and feed it back with <code>dialog.accept(code)</code>.</p><p>Assert with <code>expect(message).toMatch(/code: \d{"{6}"}/)</code>, not string equality.</p></>}
    >
      <div className={ui.btnRow}>
        <PracticeButton id="otp-btn" data-testid="otp-verify" onClick={verifyOtp}>Verify OTP</PracticeButton>
      </div>
      <OutputBox id="otp-result" testId="otp-result">{out("otp-result", "Verification result…")}</OutputBox>
    </PracticeBlock>,

    /* 10 — Looping confirm */
    <PracticeBlock
      key="11"
      index="11"
      testId="block-loop"
      title={<>Looping <code>confirm()</code></>}
      badges={[{ label: "Hard", tone: "orange" }]}
      whatToTest={<>Accept a <strong>bounded</strong> number of confirms, then <code>dismiss()</code>; assert the final item count.</>}
      hint={<><p>Keeps asking "Add another item?" and re-fires <code>confirm()</code> as long as you accept. Your handler must <code>accept()</code> a bounded number of times, then <code>dismiss()</code> — otherwise the test loops forever. Count is reflected in the DOM.</p><p>Pattern: keep a counter in the handler — <code>let n=0; page.on(&apos;dialog&apos;, d =&gt; n++ &lt; 3 ? d.accept() : d.dismiss())</code>.</p></>}
    >
      <div className={ui.btnRow}>
        <PracticeButton id="loop-btn" data-testid="loop-confirm" onClick={runLoopConfirm}>Build Cart</PracticeButton>
      </div>
      <OutputBox id="loop-result" testId="loop-result">{out("loop-result", "Items added: 0")}</OutputBox>
    </PracticeBlock>,

    /* 11 — Dialog in iframe */
    <PracticeBlock
      key="12"
      index="12"
      testId="block-iframe"
      title="Native Dialog Fired From Inside an Iframe"
      badges={[{ label: "Hard", tone: "orange" }]}
      whatToTest={<>Click the button via <code>page.frameLocator(&apos;#child-frame&apos;)</code>, but catch the native dialog at the <strong>page</strong> level.</>}
      hint={<><p>The button lives in a cross-document iframe, but native dialogs are page-level: you still catch them with <code>page.on(&apos;dialog&apos;)</code>. The CLICK, however, needs <code>page.frameLocator(&apos;#child-frame&apos;).getByTestId(&apos;iframe-alert&apos;)</code>.</p><p>Key point: the dialog is NOT scoped to the frame — there is no <code>frame.on(&apos;dialog&apos;)</code>.</p></>}
    >
      <iframe id="child-frame" data-testid="child-frame" title="child frame" className={styles.iframe}
        srcDoc={`<!DOCTYPE html><html><body style="font-family:Arial;margin:10px"><p style="font-size:13px;color:#486581">I am inside an iframe.</p><button data-testid="iframe-alert" style="padding:8px 16px;background:#4a90d9;color:#fff;border:none;border-radius:5px;cursor:pointer" onclick="alert('Alert raised from INSIDE the iframe!')">Alert From Iframe</button></body></html>`}
      />
    </PracticeBlock>,

    /* 12 — Non-click triggers */
    <PracticeBlock
      key="13"
      index="13"
      testId="block-nonclick"
      title="Dialogs On Non-Click Events"
      badges={[{ label: "Hard", tone: "orange" }]}
      whatToTest={<>Reproduce the exact event — <code>hover()</code>, <code>blur()</code>, <code>dblclick()</code> — to fire each dialog; a plain <code>click()</code> won&apos;t work.</>}
      hint={<p>Real apps fire dialogs on hover, blur, double-click, etc. You must reproduce the exact event (<code>hover()</code>, <code>blur()</code>, <code>dblclick()</code>) — a plain <code>click()</code> won&apos;t trigger them.</p>}
    >
      <div className={styles.hoverZone} id="hover-zone" data-testid="hover-zone" onMouseEnter={() => alert("Triggered by HOVER (mouseenter).")}>Hover over me — no click needed</div>
      <div className={ui.field} style={{ marginTop: 14 }}>
        <label className={ui.label} htmlFor="blur-input">Leave this field to trigger a dialog (blur)</label>
        <input type="text" id="blur-input" data-testid="blur-input" className={ui.input} placeholder="Type something, then click away…" onBlur={(e) => { if (e.target.value) alert("Field validated on BLUR: " + e.target.value); }} />
      </div>
      <div className={ui.btnRow}>
        <PracticeButton id="dblclick-btn" variant="secondary" data-testid="dblclick-confirm" onDoubleClick={() => setResult("dbl-result", confirm("DOUBLE-CLICK detected — proceed?") ? "Proceeded" : "Cancelled")}>Double-Click Me</PracticeButton>
      </div>
      <OutputBox id="dbl-result" testId="dbl-result">{out("dbl-result", "—")}</OutputBox>
    </PracticeBlock>,

    /* 13 — Stacked modals */
    <PracticeBlock
      key="14"
      index="14"
      testId="block-stacked"
      title="Stacked (Nested) Modals"
      badges={[{ label: "Hard", tone: "orange" }]}
      whatToTest={<>Two <code>role=&quot;dialog&quot;</code> elements are open at once — disambiguate with <code>.last()</code>/testid and close in LIFO order.</>}
      hint={<p>Modal A opens Modal B on top of it. Two elements with <code>role=&quot;dialog&quot;</code> exist at once — <code>getByRole(&apos;dialog&apos;)</code> becomes strict-mode ambiguous. Disambiguate with <code>.last()</code>, testid, or <code>aria-label</code>, and close in LIFO order.</p>}
    >
      <div className={ui.btnRow}>
        <PracticeButton id="open-stack" data-testid="open-stack" onClick={() => setOverlay1Open(true)}>Open First Modal</PracticeButton>
      </div>
      <OutputBox id="stack-result" testId="stack-result">{out("stack-result", "—")}</OutputBox>
    </PracticeBlock>,

    /* 14 — Focus-trap modal */
    <PracticeBlock
      key="15"
      index="15"
      testId="block-trap"
      title="Focus-Trap Modal — Esc & Overlay Disabled"
      badges={[{ label: "Hard", tone: "red" }]}
      whatToTest={<>Esc and overlay clicks are disabled — locate and click the explicit <strong>Acknowledge</strong> button to dismiss.</>}
      hint={<p>Esc does nothing and clicking the backdrop does nothing — the ONLY way out is a specific button. Tests that blindly press Escape or click the overlay will hang. Must locate and click the explicit dismiss control.</p>}
    >
      <div className={ui.btnRow}>
        <PracticeButton id="open-trap" variant="danger" data-testid="open-trap" onClick={() => setOverlayTrapOpen(true)}>Open Trap Modal</PracticeButton>
      </div>
      <OutputBox id="trap-result" testId="trap-result">{out("trap-result", "—")}</OutputBox>
    </PracticeBlock>,

    /* 15 — Shadow DOM */
    <PracticeBlock
      key="16"
      index="16"
      testId="block-shadow"
      title="Modal Inside Shadow DOM"
      badges={[{ label: "Hard", tone: "red" }]}
      whatToTest={<>Pierce the open shadow root with <code>getByRole</code>/<code>getByTestId</code> to click <code>shadow-confirm</code> (raw CSS/XPath can&apos;t).</>}
      hint={<p>The dialog is rendered inside a shadow root. Playwright&apos;s <code>getByRole</code>/<code>getByText</code> pierce open shadow DOM automatically — but raw CSS chains and XPath do NOT. Good test: confirm <code>getByTestId(&apos;shadow-confirm&apos;)</code> works.</p>}
    >
      <div className={ui.btnRow}>
        <PracticeButton id="open-shadow" data-testid="open-shadow" onClick={openShadowModal}>Open Shadow Modal</PracticeButton>
      </div>
      <div ref={shadowHostRef} id="shadow-host" />
      <OutputBox id="shadow-result" testId="shadow-result">{out("shadow-result", "—")}</OutputBox>
    </PracticeBlock>,

    /* 16 — Async race */
    <PracticeBlock
      key="17"
      index="17"
      testId="block-async"
      title="Async Race — Delayed Confirm & Queued Toasts"
      badges={[{ label: "Hard", tone: "red" }]}
      whatToTest={<>Register the dialog handler up front; the confirm appears after ~1.2s, then assert the queued toasts with web-first waits, never fixed sleeps.</>}
      hint={<p>The <code>confirm()</code> only appears AFTER a simulated 1.2s API call, and on accept three toasts fire in sequence (200ms apart) then auto-dismiss. Register the dialog handler up front; assert toasts with web-first waits, never fixed sleeps.</p>}
    >
      <div className={ui.btnRow}>
        <PracticeButton id="async-btn" data-testid="async-save" onClick={asyncSave}>Save (async)</PracticeButton>
      </div>
      <OutputBox id="async-result" testId="async-result">{out("async-result", "—")}</OutputBox>
    </PracticeBlock>,

    /* 17 — Hard cheat sheet */
    <PracticeBlock key="18" index="18" testId="block-cheatsheet-hard" title="Hard-Pattern Cheat Sheet">
      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead><tr><th>Scenario</th><th>Why it breaks naive tests</th><th>Fix</th></tr></thead>
          <tbody>
            <tr><td>Chained dialogs</td><td><code>page.once</code> catches only the first</td><td><code>page.on</code> + branch on <code>d.type()</code></td></tr>
            <tr><td>Random message</td><td>Hardcoded assertion fails</td><td>Regex on <code>d.message()</code>, echo via <code>accept(text)</code></td></tr>
            <tr><td>Looping confirm</td><td>Handler accepts forever</td><td>Bounded counter, then <code>dismiss()</code></td></tr>
            <tr><td>Dialog in iframe</td><td>No <code>frame.on(&apos;dialog&apos;)</code></td><td>Click via <code>frameLocator</code>, catch at <code>page</code> level</td></tr>
            <tr><td>Hover/blur/dblclick</td><td><code>click()</code> never fires it</td><td>Use <code>hover()</code>/<code>blur()</code>/<code>dblclick()</code></td></tr>
            <tr><td>Stacked modals</td><td>Strict-mode: 2 dialogs match</td><td><code>.last()</code> / testid / aria-label</td></tr>
            <tr><td>Focus-trap modal</td><td>Esc/overlay click hang the test</td><td>Click the explicit dismiss button</td></tr>
            <tr><td>Shadow DOM</td><td>CSS/XPath can&apos;t pierce</td><td><code>getByRole/getByTestId</code> pierce open roots</td></tr>
            <tr><td>Async/queued toasts</td><td>Fixed sleeps are flaky</td><td>Web-first <code>toBeVisible()</code>/<code>toBeHidden()</code></td></tr>
          </tbody>
        </table>
      </div>
    </PracticeBlock>,
  ];

  return (
    <div className={styles.playground} data-testid="alert-practice-playground">

      {/* ── Active card ────────────────────────────────────────────────────── */}
      <div data-testid={`practice-card-${currentCard + 1}`}>
        {cards[currentCard]}
      </div>

      {/* ── Pagination (below card) ────────────────────────────────────────── */}
      <div className={styles.paginationHeader}>
        <div className={styles.paginationMeta}>
          <span className={styles.groupLabel}>{meta.group}</span>
          <span className={styles.cardCounter}>{currentCard + 1} / {total}</span>
        </div>

        {/* Progress bar */}
        <div className={styles.progressTrack} role="progressbar" aria-valuenow={currentCard + 1} aria-valuemin={1} aria-valuemax={total}>
          <div className={styles.progressFill} style={{ width: `${((currentCard + 1) / total) * 100}%` }} />
        </div>

        {/* Prev / Next */}
        <div className={styles.paginationControls}>
          <button
            className={styles.navBtn}
            onClick={() => goTo(currentCard - 1)}
            disabled={currentCard === 0}
            data-testid="practice-prev"
            aria-label="Previous scenario"
          >
            <ChevronLeft size={15} />
            <span>Prev</span>
          </button>

          {/* Dot indicators */}
          <div className={styles.dots} aria-hidden="true">
            {cards.map((_, i) => (
              <button
                key={i}
                className={`${styles.dot} ${i === currentCard ? styles.dotActive : ""}`}
                onClick={() => goTo(i)}
                aria-label={`Go to scenario ${i + 1}`}
              />
            ))}
          </div>

          <button
            className={styles.navBtn}
            onClick={() => goTo(currentCard + 1)}
            disabled={currentCard === total - 1}
            data-testid="practice-next"
            aria-label="Next scenario"
          >
            <span>Next</span>
            <ChevronRight size={15} />
          </button>
        </div>
      </div>

      {/* ── Fixed overlays (always mounted, not paginated) ─────────────────── */}
      <div className={`${styles.modalOverlay} ${overlay1Open ? styles.modalOverlayOpen : ""}`} id="overlay-1" data-testid="overlay-1" onClick={(e) => { if (e.target === e.currentTarget) setOverlay1Open(false); }}>
        <div className={styles.modal} role="dialog" aria-modal="true" aria-label="First Modal" data-testid="modal-1">
          <h3>First Modal</h3>
          <p>This is the first modal. Open a second one stacked on top.</p>
          <div className={styles.modalActions}>
            <button className={`${ui.btn} ${ui.btnSecondary}`} data-testid="modal-1-close" onClick={() => setOverlay1Open(false)}>Close</button>
            <button className={`${ui.btn} ${ui.btnPrimary}`} data-testid="open-second" onClick={() => setOverlay2Open(true)}>Open Second Modal</button>
          </div>
        </div>
      </div>

      <div className={`${styles.modalOverlay} ${styles.overlay2} ${overlay2Open ? styles.modalOverlayOpen : ""}`} id="overlay-2" data-testid="overlay-2" onClick={(e) => { if (e.target === e.currentTarget) setOverlay2Open(false); }}>
        <div className={styles.modal} role="dialog" aria-modal="true" aria-label="Second Modal" data-testid="modal-2">
          <h3>Second Modal (on top)</h3>
          <p>Close me first (LIFO), then the first modal becomes interactive again.</p>
          <div className={styles.modalActions}>
            <button className={`${ui.btn} ${ui.btnDanger}`} data-testid="modal-2-confirm" onClick={() => { setOverlay2Open(false); setResult("stack-result", "Second modal confirmed"); }}>Confirm</button>
          </div>
        </div>
      </div>

      <div className={`${styles.modalOverlay} ${styles.overlayTrap} ${overlayTrapOpen ? styles.modalOverlayOpen : ""}`} id="overlay-trap" data-testid="overlay-trap">
        <div className={styles.modal} role="dialog" aria-modal="true" aria-label="Trap Modal" data-testid="modal-trap">
          <h3>Action Required</h3>
          <p>Esc and backdrop clicks are disabled. You must click <strong>Acknowledge</strong> to continue.</p>
          <div className={styles.modalActions}>
            <button className={`${ui.btn} ${ui.btnPrimary}`} data-testid="trap-acknowledge" onClick={() => { setOverlayTrapOpen(false); setResult("trap-result", "Acknowledged via button"); }}>Acknowledge</button>
          </div>
        </div>
      </div>

      {/* ── Toast mount ────────────────────────────────────────────────────── */}
      <div className={styles.toastStack} id="toast-stack">
        {toasts.map((t) => (
          <div key={t.id} role="status" data-testid="toast" className={`${styles.toast} ${t.type === "success" ? styles.toastSuccess : t.type === "error" ? styles.toastError : ""}`}>
            {t.message}
          </div>
        ))}
      </div>
    </div>
  );
}
