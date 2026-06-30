"use client";

import { useEffect, useRef, useState } from "react";
import {
  OutputBox,
  PracticeBlock,
  PracticeButton,
} from "../../../_components/practice-block";
import styles from "../alert-practice-playground.module.css";
import { ALERT_CARDS_DATA, CardData } from "../data/alert-cards-data";

type ResultValue = { text: string; tone?: "danger" | "success" };
type ToastItem = { id: number; message: string; type: "success" | "error" | "" };

const data = (id: string) => ALERT_CARDS_DATA.find((c: CardData) => c.id === id)!;

function BaseCard({ id, index, testId, children }: { id: string; index: number; testId: string; children?: React.ReactNode }) {
  const d = data(id);
  return (
    <PracticeBlock
      index={index.toString()}
      testId={testId}
      title={d.title}
      badges={d.badges}
      whatToTest={d.whatToTest}
      hint={d.hint}
    >
      {children}
    </PracticeBlock>
  );
}

export function NativeAlertCard({ index }: { index: number }) {
  return (
    <BaseCard id="native-alert" index={index} testId="block-simple-alert">
      <div className="btn-row">
        <PracticeButton id="simple-alert-btn" data-testid="simple-alert" onClick={() => alert("Hello! This is a simple alert.")}>Show Simple Alert</PracticeButton>
        <PracticeButton id="delayed-alert-btn" variant="secondary" data-testid="delayed-alert" onClick={() => setTimeout(() => alert("Delayed alert after 1.5s"), 1500)}>Show Delayed Alert (1.5s)</PracticeButton>
      </div>
    </BaseCard>
  );
}

export function ConfirmCard({ index }: { index: number }) {
  const [result, setResult] = useState<ResultValue | null>(null);

  const handleConfirm = () => {
    const ok = confirm("Are you sure you want to delete your account? This cannot be undone.");
    setResult(ok
      ? { text: "Account deleted (you clicked OK).", tone: "danger" }
      : { text: "Deletion cancelled (you clicked Cancel).", tone: "success" });
  };

  return (
    <BaseCard id="confirm" index={index} testId="block-confirm">
      <div className="btn-row">
        <PracticeButton id="confirm-btn" data-testid="confirm-action" onClick={handleConfirm}>Delete Account</PracticeButton>
      </div>
      <OutputBox id="confirm-result" testId="confirm-result" tone={result?.tone ?? "default"}>
        {result?.text ?? "Result will appear here…"}
      </OutputBox>
    </BaseCard>
  );
}

export function PromptCard({ index }: { index: number }) {
  const [result, setResult] = useState("Greeting will appear here…");

  const handlePrompt = () => {
    const name = prompt("What is your name?", "Guest");
    if (name === null) setResult("You dismissed the prompt (returned null).");
    else if (name.trim() === "") setResult("Hello, anonymous! (empty string submitted)");
    else setResult(`Hello, ${name}! Welcome aboard.`);
  };

  return (
    <BaseCard id="prompt" index={index} testId="block-prompt">
      <div className="btn-row">
        <PracticeButton id="prompt-btn" data-testid="prompt-action" onClick={handlePrompt}>Enter Your Name</PracticeButton>
      </div>
      <OutputBox id="prompt-result" testId="prompt-result">{result}</OutputBox>
    </BaseCard>
  );
}

export function BeforeUnloadCard({ index }: { index: number }) {
  const [draft, setDraft] = useState("");
  const isDirty = draft.length > 0;
  
  useEffect(() => {
    const handler = (e: BeforeUnloadEvent) => {
      if (isDirty) { e.preventDefault(); e.returnValue = ""; }
    };
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [isDirty]);

  return (
    <BaseCard id="beforeunload" index={index} testId="block-beforeunload">
      <div className="form-field">
        <label className="form-label" htmlFor="draft-input">Edit this draft, then try to reload / navigate away</label>
        <input type="text" id="draft-input" data-testid="draft-input" className="form-input" placeholder="Type to make the page 'dirty'…" value={draft} onChange={(e) => setDraft(e.target.value)} />
      </div>
      <div className="btn-row">
        <PracticeButton id="reset-dirty-btn" variant="secondary" onClick={() => setDraft("")}>Mark as Saved (clears warning)</PracticeButton>
      </div>
      <p id="dirty-state" data-testid="dirty-state" style={{ marginTop: 10 }}>
        {isDirty ? "State: dirty — leaving the page will warn you" : "State: clean (no warning)"}
      </p>
    </BaseCard>
  );
}

export function HtmlDialogCard({ index }: { index: number }) {
  const htmlDialogRef = useRef<HTMLDialogElement>(null);
  const [result, setResult] = useState("returnValue will appear here…");

  useEffect(() => {
    const dialog = htmlDialogRef.current;
    if (!dialog) return;
    const onClose = () =>
      setResult(`Dialog closed. returnValue = "${dialog.returnValue || "(none)"}"`)
    dialog.addEventListener("close", onClose);
    return () => dialog.removeEventListener("close", onClose);
  }, []);

  return (
    <BaseCard id="html-dialog" index={index} testId="block-html-dialog">
      <div className="btn-row">
        <PracticeButton id="open-modal-dialog" data-testid="open-html-dialog" onClick={() => htmlDialogRef.current?.showModal()}>Open Modal Dialog</PracticeButton>
        <PracticeButton id="open-nonmodal-dialog" variant="secondary" data-testid="open-html-dialog-nonmodal" onClick={() => htmlDialogRef.current?.show()}>Open Non-Modal</PracticeButton>
      </div>
      <dialog ref={htmlDialogRef} id="html-dialog" data-testid="html-dialog" aria-labelledby="html-dialog-title" className={styles.htmlDialog}>
        <h3 id="html-dialog-title">Confirm Subscription</h3>
        <p>Do you want to subscribe to the newsletter?</p>
        <form method="dialog" className={styles.dialogActions}>
          <button value="cancel" data-testid="html-dialog-cancel" className="btn btn-secondary">Cancel</button>
          <button value="confirm" data-testid="html-dialog-confirm" className="btn btn-primary">Confirm</button>
        </form>
      </dialog>
      <OutputBox id="html-dialog-result" testId="html-dialog-result">{result}</OutputBox>
    </BaseCard>
  );
}

export function CustomModalCard({ index }: { index: number }) {
  const [customModalOpen, setCustomModalOpen] = useState(false);
  const [result, setResult] = useState("Last close reason…");

  const closeCustomModal = (reason: string) => {
    setCustomModalOpen(false);
    setResult(`Closed via: ${reason}`);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && customModalOpen) closeCustomModal("escape");
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [customModalOpen]);

  return (
    <BaseCard id="custom-modal" index={index} testId="block-custom-modal">
      <div className="btn-row">
        <PracticeButton id="open-custom-modal" data-testid="open-custom-modal" onClick={() => setCustomModalOpen(true)}>Open Custom Modal</PracticeButton>
      </div>
      
      <div className={`${styles.modalOverlay} ${customModalOpen ? styles.modalOverlayOpen : ""}`} id="custom-modal-overlay" data-testid="custom-modal-overlay" onClick={(e) => { if (e.target === e.currentTarget) closeCustomModal("overlay"); }}>
        <div className={styles.modal} role="dialog" aria-modal="true" aria-labelledby="custom-modal-title" data-testid="custom-modal">
          <button className={styles.modalClose} aria-label="Close" data-testid="custom-modal-close" onClick={() => closeCustomModal("x")}>&times;</button>
          <h3 id="custom-modal-title">Custom Modal Title</h3>
          <p>This modal lives in the DOM. Try closing via the ✕, the Cancel button, clicking the dark overlay, or pressing <kbd className={styles.kbd}>Esc</kbd>.</p>
          <div className={styles.modalActions}>
            <button className="btn btn-secondary" data-testid="custom-modal-cancel" onClick={() => closeCustomModal("cancel")}>Cancel</button>
            <button className="btn btn-danger" data-testid="custom-modal-confirm" onClick={() => closeCustomModal("confirm")}>Confirm</button>
          </div>
        </div>
      </div>

      <OutputBox id="custom-modal-result" testId="custom-modal-result">{result}</OutputBox>
    </BaseCard>
  );
}

export function ToastCard({ index }: { index: number }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const toastId = useRef(0);
  const showToast = (message: string, type: ToastItem["type"]) => {
    const id = toastId.current++;
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 3000);
  };

  return (
    <BaseCard id="toast" index={index} testId="block-toast">
      <div className="btn-row">
        <PracticeButton variant="secondary" data-testid="toast-success" onClick={() => showToast("Saved successfully!", "success")}>Trigger Success Toast</PracticeButton>
        <PracticeButton variant="danger" data-testid="toast-error" onClick={() => showToast("Something went wrong.", "error")}>Trigger Error Toast</PracticeButton>
      </div>
      <div className="toast-stack" id="toast-stack">
        {toasts.map((t) => (
          <div key={t.id} role="status" data-testid="toast" className={`toast ${t.type === "success" ? "toast-success" : t.type === "error" ? "toast-error" : ""}`}>
            {t.message}
          </div>
        ))}
      </div>
    </BaseCard>
  );
}

export function CheatSheetCoreCard({ index }: { index: number }) {
  return (
    <BaseCard id="cheatsheet-core" index={index} testId="block-cheatsheet-core">
      <div className="table-wrap">
        <table className="table">
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
    </BaseCard>
  );
}

export function ChainedDialogsCard({ index }: { index: number }) {
  const [result, setResult] = useState("Outcome appears here…");
  const runChain = () => {
    alert("Step 1 of 3: Your cart is ready.");
    const proceed = confirm("Step 2 of 3: Proceed to payment?");
    if (!proceed) { setResult("Checkout cancelled at payment step."); return; }
    const coupon = prompt("Step 3 of 3: Enter a coupon code (or leave blank):", "");
    setResult(coupon && coupon.trim()
      ? `Order placed with coupon "${coupon.trim()}".`
      : "Order placed with no coupon.");
  };

  return (
    <BaseCard id="chained-dialogs" index={index} testId="block-chain">
      <div className="btn-row">
        <PracticeButton id="chain-btn" data-testid="chain-dialogs" onClick={runChain}>Start Checkout Flow</PracticeButton>
      </div>
      <OutputBox id="chain-result" testId="chain-result">{result}</OutputBox>
    </BaseCard>
  );
}

export function DynamicOtpCard({ index }: { index: number }) {
  const [result, setResult] = useState("Verification result…");
  const verifyOtp = () => {
    const otp = String(Math.floor(100000 + Math.random() * 900000));
    const entered = prompt(`Enter the verification code: ${otp}`);
    const ok = entered !== null && entered.trim() === otp;
    setResult(ok ? `Verified! (code ${otp})` : `Verification failed (expected ${otp}).`);
  };

  return (
    <BaseCard id="dynamic-otp" index={index} testId="block-otp">
      <div className="btn-row">
        <PracticeButton id="otp-btn" data-testid="otp-verify" onClick={verifyOtp}>Verify OTP</PracticeButton>
      </div>
      <OutputBox id="otp-result" testId="otp-result">{result}</OutputBox>
    </BaseCard>
  );
}

export function LoopingConfirmCard({ index }: { index: number }) {
  const [result, setResult] = useState("Items added: 0");
  const runLoopConfirm = () => {
    let count = 0;
    while (confirm(`Item ${count + 1} added. Add another item?`)) {
      count++;
      if (count >= 50) break;
    }
    setResult(`Items added: ${count}`);
  };

  return (
    <BaseCard id="looping-confirm" index={index} testId="block-loop">
      <div className="btn-row">
        <PracticeButton id="loop-btn" data-testid="loop-confirm" onClick={runLoopConfirm}>Build Cart</PracticeButton>
      </div>
      <OutputBox id="loop-result" testId="loop-result">{result}</OutputBox>
    </BaseCard>
  );
}

export function IframeDialogCard({ index }: { index: number }) {
  return (
    <BaseCard id="iframe-dialog" index={index} testId="block-iframe">
      <iframe id="child-frame" data-testid="child-frame" title="child frame" className={styles.iframe}
        srcDoc={`<!DOCTYPE html><html><body style="font-family:Arial;margin:10px"><p style="font-size:13px;color:#486581">I am inside an iframe.</p><button data-testid="iframe-alert" style="padding:8px 16px;background:#4a90d9;color:#fff;border:none;border-radius:5px;cursor:pointer" onclick="alert('Alert raised from INSIDE the iframe!')">Alert From Iframe</button></body></html>`}
      />
    </BaseCard>
  );
}

export function NonClickTriggersCard({ index }: { index: number }) {
  const [result, setResult] = useState("—");
  return (
    <BaseCard id="nonclick-triggers" index={index} testId="block-nonclick">
      <div className={styles.hoverZone} id="hover-zone" data-testid="hover-zone" onMouseEnter={() => alert("Triggered by HOVER (mouseenter).")}>Hover over me — no click needed</div>
      <div className="form-field" style={{ marginTop: 14 }}>
        <label className="form-label" htmlFor="blur-input">Leave this field to trigger a dialog (blur)</label>
        <input type="text" id="blur-input" data-testid="blur-input" className="form-input" placeholder="Type something, then click away…" onBlur={(e) => { if (e.target.value) alert("Field validated on BLUR: " + e.target.value); }} />
      </div>
      <div className="btn-row">
        <PracticeButton id="dblclick-btn" variant="secondary" data-testid="dblclick-confirm" onDoubleClick={() => setResult(confirm("DOUBLE-CLICK detected — proceed?") ? "Proceeded" : "Cancelled")}>Double-Click Me</PracticeButton>
      </div>
      <OutputBox id="dbl-result" testId="dbl-result">{result}</OutputBox>
    </BaseCard>
  );
}

export function StackedModalsCard({ index }: { index: number }) {
  const [overlay1Open, setOverlay1Open] = useState(false);
  const [overlay2Open, setOverlay2Open] = useState(false);
  const [result, setResult] = useState("—");

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (overlay2Open) setOverlay2Open(false);
        else if (overlay1Open) setOverlay1Open(false);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [overlay1Open, overlay2Open]);

  return (
    <BaseCard id="stacked-modals" index={index} testId="block-stacked">
      <div className="btn-row">
        <PracticeButton id="open-stack" data-testid="open-stack" onClick={() => setOverlay1Open(true)}>Open First Modal</PracticeButton>
      </div>
      <OutputBox id="stack-result" testId="stack-result">{result}</OutputBox>

      <div className={`${styles.modalOverlay} ${overlay1Open ? styles.modalOverlayOpen : ""}`} id="overlay-1" data-testid="overlay-1" onClick={(e) => { if (e.target === e.currentTarget) setOverlay1Open(false); }}>
        <div className={styles.modal} role="dialog" aria-modal="true" aria-label="First Modal" data-testid="modal-1">
          <h3>First Modal</h3>
          <p>This is the first modal. Open a second one stacked on top.</p>
          <div className={styles.modalActions}>
            <button className="btn btn-secondary" data-testid="modal-1-close" onClick={() => setOverlay1Open(false)}>Close</button>
            <button className="btn btn-primary" data-testid="open-second" onClick={() => setOverlay2Open(true)}>Open Second Modal</button>
          </div>
        </div>
      </div>

      <div className={`${styles.modalOverlay} ${styles.overlay2} ${overlay2Open ? styles.modalOverlayOpen : ""}`} id="overlay-2" data-testid="overlay-2" onClick={(e) => { if (e.target === e.currentTarget) setOverlay2Open(false); }}>
        <div className={styles.modal} role="dialog" aria-modal="true" aria-label="Second Modal" data-testid="modal-2">
          <h3>Second Modal (on top)</h3>
          <p>Close me first (LIFO), then the first modal becomes interactive again.</p>
          <div className={styles.modalActions}>
            <button className="btn btn-danger" data-testid="modal-2-confirm" onClick={() => { setOverlay2Open(false); setResult("Second modal confirmed"); }}>Confirm</button>
          </div>
        </div>
      </div>
    </BaseCard>
  );
}

export function FocusTrapModalCard({ index }: { index: number }) {
  const [overlayTrapOpen, setOverlayTrapOpen] = useState(false);
  const [result, setResult] = useState("—");

  return (
    <BaseCard id="focus-trap" index={index} testId="block-trap">
      <div className="btn-row">
        <PracticeButton id="open-trap" variant="danger" data-testid="open-trap" onClick={() => setOverlayTrapOpen(true)}>Open Trap Modal</PracticeButton>
      </div>
      <OutputBox id="trap-result" testId="trap-result">{result}</OutputBox>

      <div className={`${styles.modalOverlay} ${styles.overlayTrap} ${overlayTrapOpen ? styles.modalOverlayOpen : ""}`} id="overlay-trap" data-testid="overlay-trap">
        <div className={styles.modal} role="dialog" aria-modal="true" aria-label="Trap Modal" data-testid="modal-trap">
          <h3>Action Required</h3>
          <p>Esc and backdrop clicks are disabled. You must click <strong>Acknowledge</strong> to continue.</p>
          <div className={styles.modalActions}>
            <button className="btn btn-primary" data-testid="trap-acknowledge" onClick={() => { setOverlayTrapOpen(false); setResult("Acknowledged via button"); }}>Acknowledge</button>
          </div>
        </div>
      </div>
    </BaseCard>
  );
}

export function ShadowDomModalCard({ index }: { index: number }) {
  const shadowHostRef = useRef<HTMLDivElement>(null);
  const [result, setResult] = useState("—");

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
        setResult("Shadow modal confirmed");
      });
  };

  return (
    <BaseCard id="shadow-dom" index={index} testId="block-shadow">
      <div className="btn-row">
        <PracticeButton id="open-shadow" data-testid="open-shadow" onClick={openShadowModal}>Open Shadow Modal</PracticeButton>
      </div>
      <div ref={shadowHostRef} id="shadow-host" />
      <OutputBox id="shadow-result" testId="shadow-result">{result}</OutputBox>
    </BaseCard>
  );
}

export function AsyncRaceCard({ index }: { index: number }) {
  const [result, setResult] = useState("—");
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const toastId = useRef(0);

  const showToast = (message: string, type: ToastItem["type"]) => {
    const id = toastId.current++;
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 3000);
  };

  const asyncSave = () => {
    setResult("Saving…");
    setTimeout(() => {
      const ok = confirm("Server responded. Commit these changes?");
      if (!ok) { setResult("Changes discarded."); return; }
      setResult("Changes committed.");
      const msgs: Array<[string, ToastItem["type"]]> = [
        ["Validating…", ""], ["Uploading…", ""], ["Done!", "success"],
      ];
      msgs.forEach(([text, type], i) => setTimeout(() => showToast(text, type), i * 200));
    }, 1200);
  };

  return (
    <BaseCard id="async-race" index={index} testId="block-async">
      <div className="btn-row">
        <PracticeButton id="async-btn" data-testid="async-save" onClick={asyncSave}>Save (async)</PracticeButton>
      </div>
      <OutputBox id="async-result" testId="async-result">{result}</OutputBox>
      <div className="toast-stack" id="toast-stack-async">
        {toasts.map((t) => (
          <div key={t.id} role="status" data-testid="toast" className={`toast ${t.type === "success" ? "toast-success" : t.type === "error" ? "toast-error" : ""}`}>
            {t.message}
          </div>
        ))}
      </div>
    </BaseCard>
  );
}

export function CheatSheetHardCard({ index }: { index: number }) {
  return (
    <BaseCard id="cheatsheet-hard" index={index} testId="block-cheatsheet-hard">
      <div className="table-wrap">
        <table className="table">
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
    </BaseCard>
  );
}

export const ALERT_CARDS = [
  NativeAlertCard,
  ConfirmCard,
  PromptCard,
  BeforeUnloadCard,
  HtmlDialogCard,
  CustomModalCard,
  ToastCard,
  CheatSheetCoreCard,
  ChainedDialogsCard,
  DynamicOtpCard,
  LoopingConfirmCard,
  IframeDialogCard,
  NonClickTriggersCard,
  StackedModalsCard,
  FocusTrapModalCard,
  ShadowDomModalCard,
  AsyncRaceCard,
  CheatSheetHardCard
];
