"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import {
  ScenarioCard,
  ProgressWidget,
  FrameworkMethodsPanel,
  UpNextCard,
} from "@/components/practice";
import type { ProgressItem } from "@/components/practice";
import {
  shadowDomScenarios,
  shadowDomFrameworkMethods,
} from "@/data/practice-data/shadow-dom/scenarios";
import type { PracticePageMeta } from "@/data/practice-data/types";
import styles from "./shadow-dom.module.css";

interface PracticeTabProps {
  upNext: PracticePageMeta["upNext"];
}

/* ══════════════════════════════════════════════════════════════
   Shared helper — shadow host shell label
══════════════════════════════════════════════════════════════ */
function ShadowBadge({ mode }: { mode: "open" | "closed" }) {
  return (
    <span
      className={`${styles.shadowBadge} ${mode === "closed" ? styles.shadowBadgeClosed : ""}`}
    >
      shadow: {mode}
    </span>
  );
}

/* ══════════════════════════════════════════════════════════════
   S01 · Basic shadow host — open mode, button with testid
   Beginner — auto-pierce by data-testid
══════════════════════════════════════════════════════════════ */
function BasicShadowScenario({
  onComplete,
}: {
  onComplete: (msg: string) => void;
}) {
  const hostRef = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState(0);
  const onCompleteStable = useCallback(
    (msg: string) => onComplete(msg),
    [onComplete],
  );

  useEffect(() => {
    const el = hostRef.current;
    if (!el || el.shadowRoot) return;
    const shadow = el.attachShadow({ mode: "open" });
    shadow.innerHTML = `
      <style>
        :host { display: block; padding: 14px 16px; }
        .row { display: flex; align-items: center; gap: 12px; }
        button {
          height: 32px; padding: 0 16px;
          background: var(--primary, #6366f1); color: #fff;
          border: none; border-radius: 6px; font-size: 13px; cursor: pointer;
          font-family: inherit;
        }
        button:hover { opacity: 0.88; }
        .count { font-size: 12px; color: #6b7280; }
      </style>
      <div class="row">
        <button data-testid="shadow-btn-basic" type="button">Click inside Shadow</button>
        <span class="count">Clicks: <span id="shadow-click-count">0</span></span>
      </div>
    `;
    let c = 0;
    shadow.querySelector("button")!.addEventListener("click", () => {
      c++;
      shadow.getElementById("shadow-click-count")!.textContent = String(c);
      setCount(c);
      onCompleteStable(`Shadow button clicked ${c} time(s) ✓`);
    });
  }, [onCompleteStable]);

  return (
    <div className="flex flex-col gap-3">
      <p className="text-[11px] text-muted-foreground">
        Click the button rendered inside an open shadow root. Playwright
        auto-pierces — just chain locators.
      </p>
      <div className={styles.shadowHostShell}>
        <div className={styles.shadowHostLabel}>
          <code className="text-[10px]">
            [data-testid=&quot;shadow-host-basic&quot;]
          </code>
          <ShadowBadge mode="open" />
        </div>
        <div
          ref={hostRef}
          data-testid="shadow-host-basic"
          data-shadow-mode="open"
          className={styles.shadowHostContent}
        />
      </div>
      {count > 0 && (
        <div className={styles.shadowResultBanner}>
          ✓ Clicked {count} time{count !== 1 ? "s" : ""}
        </div>
      )}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   S02 · Multiple shadow hosts — scope by data-host-id
   Medium — same testid on all buttons; scope to correct host
══════════════════════════════════════════════════════════════ */
const HOST_IDS = ["host-1", "host-2", "host-3"] as const;
type HostId = (typeof HOST_IDS)[number];

function MultiHostScenario({
  onComplete,
}: {
  onComplete: (msg: string) => void;
}) {
  const refs = useRef<Record<HostId, HTMLDivElement | null>>({
    "host-1": null,
    "host-2": null,
    "host-3": null,
  });
  const [activated, setActivated] = useState<HostId | null>(null);
  const onCompleteStable = useCallback(
    (msg: string) => onComplete(msg),
    [onComplete],
  );

  useEffect(() => {
    HOST_IDS.forEach((hostId) => {
      const el = refs.current[hostId];
      if (!el || el.shadowRoot) return;
      const label = hostId
        .replace("-", " ")
        .replace(/\b\w/g, (l) => l.toUpperCase());
      const shadow = el.attachShadow({ mode: "open" });
      shadow.innerHTML = `
        <style>
          :host { display: block; padding: 10px 12px; }
          button {
            height: 30px; padding: 0 12px;
            background: var(--primary, #6366f1); color: #fff;
            border: none; border-radius: 5px; font-size: 12px; cursor: pointer;
            font-family: inherit;
          }
          button:hover { opacity: 0.88; }
        </style>
        <button data-testid="shadow-action-btn" type="button">Activate ${label}</button>
      `;
      shadow.querySelector("button")!.addEventListener("click", () => {
        setActivated(hostId);
        onCompleteStable(`${label} activated ✓`);
      });
    });
  }, [onCompleteStable]);

  return (
    <div className="flex flex-col gap-3">
      <p className="text-[11px] text-muted-foreground">
        Three shadow hosts share{" "}
        <code>data-testid=&quot;shadow-host&quot;</code>. Scope to the correct
        one using <code>data-host-id</code>.
      </p>
      <div className={styles.multiHostGrid}>
        {HOST_IDS.map((hostId) => (
          <div key={hostId} className={styles.shadowHostShell}>
            <div className={styles.shadowHostLabel}>
              <code className="text-[10px]">
                [data-host-id=&quot;{hostId}&quot;]
              </code>
              <ShadowBadge mode="open" />
            </div>
            <div
              ref={(el) => {
                refs.current[hostId] = el;
              }}
              data-testid="shadow-host"
              data-host-id={hostId}
              data-shadow-mode="open"
              className={`${styles.shadowHostContent} ${activated === hostId ? styles.shadowHostActivated : ""}`}
            />
          </div>
        ))}
      </div>
      {activated && (
        <div className={styles.shadowResultBanner}>
          ✓{" "}
          {activated.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase())}{" "}
          activated
        </div>
      )}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   S03 · Nested shadow DOM — 2 levels
   Medium — outer host has testid; inner host has class + data-inner only
══════════════════════════════════════════════════════════════ */
function NestedShadowScenario({
  onComplete,
}: {
  onComplete: (msg: string) => void;
}) {
  const outerRef = useRef<HTMLDivElement>(null);
  const [done, setDone] = useState(false);
  const onCompleteStable = useCallback(
    (msg: string) => onComplete(msg),
    [onComplete],
  );

  useEffect(() => {
    const outerEl = outerRef.current;
    if (!outerEl || outerEl.shadowRoot) return;

    // Outer shadow root
    const outerShadow = outerEl.attachShadow({ mode: "open" });
    outerShadow.innerHTML = `
      <style>
        :host { display: block; padding: 12px; }
        .outer-label {
          font-size: 10px; color: #9ca3af; margin-bottom: 8px;
          font-family: monospace; text-transform: uppercase; letter-spacing: 0.06em;
        }
        .inner-boundary {
          border: 1px dashed #d1d5db; border-radius: 6px; padding: 10px;
          background: rgba(99,102,241,0.04);
        }
      </style>
      <p class="outer-label">Outer Shadow Root</p>
      <div class="inner-boundary">
        <div class="shadow-inner-host" data-inner="true"></div>
      </div>
    `;

    // Inner shadow root (inside outer shadow)
    const innerHostEl = outerShadow.querySelector(
      ".shadow-inner-host",
    ) as HTMLElement;
    const innerShadow = innerHostEl.attachShadow({ mode: "open" });
    innerShadow.innerHTML = `
      <style>
        :host { display: block; padding: 10px; }
        .inner-label {
          font-size: 10px; color: #9ca3af; margin-bottom: 6px;
          font-family: monospace; text-transform: uppercase; letter-spacing: 0.06em;
        }
        button {
          height: 30px; padding: 0 14px;
          background: var(--primary, #6366f1); color: #fff;
          border: none; border-radius: 5px; font-size: 12px; cursor: pointer;
          font-family: inherit;
        }
        button:hover { opacity: 0.88; }
      </style>
      <p class="inner-label">Inner Shadow Root (level 2)</p>
      <button data-testid="shadow-inner-btn" type="button">Activate Inner Shadow</button>
    `;

    innerShadow.querySelector("button")!.addEventListener("click", () => {
      setDone(true);
      onCompleteStable("Inner shadow activated ✓");
    });
  }, [onCompleteStable]);

  return (
    <div className="flex flex-col gap-3">
      <div className={styles.shadowDepthIndicator}>
        <span>document</span>
        <span className={styles.depthArrow}>→</span>
        <span>outer shadow root</span>
        <span className={styles.depthArrow}>→</span>
        <span>inner shadow root</span>
      </div>
      <div className={styles.shadowHostShell}>
        <div className={styles.shadowHostLabel}>
          <code className="text-[10px]">
            [data-testid=&quot;shadow-outer-host&quot;]
          </code>
          <ShadowBadge mode="open" />
        </div>
        <div
          ref={outerRef}
          data-testid="shadow-outer-host"
          data-shadow-mode="open"
          className={styles.shadowHostContent}
        />
      </div>
      <p className="text-[11px] text-muted-foreground">
        Inner host has <code>class=&quot;shadow-inner-host&quot;</code> and{" "}
        <code>data-inner=&quot;true&quot;</code> but <strong>no testid</strong>.
        Playwright pierces both levels automatically.
      </p>
      {done && (
        <div className={styles.shadowResultBanner}>
          ✓ Inner shadow (level 2) activated
        </div>
      )}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   S04 · Form inside shadow DOM — getByRole / getByLabel
   Hard — input/select have no testid; submit button has testid
══════════════════════════════════════════════════════════════ */
function FormShadowScenario({
  onComplete,
}: {
  onComplete: (msg: string) => void;
}) {
  const hostRef = useRef<HTMLDivElement>(null);
  const [submitted, setSubmitted] = useState<string | null>(null);
  const onCompleteStable = useCallback(
    (msg: string) => onComplete(msg),
    [onComplete],
  );

  useEffect(() => {
    const el = hostRef.current;
    if (!el || el.shadowRoot) return;
    const shadow = el.attachShadow({ mode: "open" });
    shadow.innerHTML = `
      <style>
        :host { display: block; padding: 14px 16px; }
        .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
        .field { display: flex; flex-direction: column; gap: 4px; }
        label { font-size: 11px; font-weight: 600; color: #374151; font-family: inherit; }
        input, select {
          height: 32px; padding: 0 10px; border: 1px solid #d1d5db;
          border-radius: 6px; font-size: 12px; font-family: inherit;
          background: #fff; color: #111827; outline: none;
        }
        input:focus, select:focus { border-color: #6366f1; box-shadow: 0 0 0 2px rgba(99,102,241,0.15); }
        button {
          margin-top: 10px; height: 32px; padding: 0 16px;
          background: #6366f1; color: #fff;
          border: none; border-radius: 6px; font-size: 12px; cursor: pointer;
          font-family: inherit;
        }
        button:hover { background: #4f46e5; }
      </style>
      <form>
        <div class="form-grid">
          <div class="field">
            <label for="shadow-name-input">Full name</label>
            <input id="shadow-name-input" name="shadowName" type="text" placeholder="Ada Lovelace" />
          </div>
          <div class="field">
            <label for="shadow-role-select">Role</label>
            <select id="shadow-role-select" name="shadowRole">
              <option value="">— select —</option>
              <option value="engineer">Engineer</option>
              <option value="qa">QA Engineer</option>
              <option value="manager">Manager</option>
            </select>
          </div>
        </div>
        <button data-testid="shadow-submit-btn" type="submit">Submit Shadow Form</button>
      </form>
    `;
    shadow.querySelector("form")!.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = (
        shadow.getElementById("shadow-name-input") as HTMLInputElement
      ).value.trim();
      const role = (
        shadow.getElementById("shadow-role-select") as HTMLSelectElement
      ).value;
      const msg = name
        ? `Submitted: ${name} (${role || "no role"}) ✓`
        : "Please fill in a name";
      setSubmitted(msg);
      if (name) onCompleteStable(msg);
    });
  }, [onCompleteStable]);

  return (
    <div className="flex flex-col gap-3">
      <p className="text-[11px] text-muted-foreground">
        Input and select have <code>id</code> and <code>name</code> but{" "}
        <strong>no data-testid</strong>. Use <code>getByRole</code> or{" "}
        <code>getByLabel</code> inside the shadow scope.
      </p>
      <div className={styles.shadowHostShell}>
        <div className={styles.shadowHostLabel}>
          <code className="text-[10px]">
            [data-testid=&quot;shadow-form-host&quot;]
          </code>
          <ShadowBadge mode="open" />
        </div>
        <div
          ref={hostRef}
          data-testid="shadow-form-host"
          data-shadow-mode="open"
          className={styles.shadowHostContent}
        />
      </div>
      {submitted && (
        <div className={styles.shadowResultBanner}>{submitted}</div>
      )}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   S05 · Dynamic content in shadow DOM
   Hard — content appears after delay; button has only aria-label
══════════════════════════════════════════════════════════════ */
function DynamicShadowScenario({
  onComplete,
}: {
  onComplete: (msg: string) => void;
}) {
  const hostRef = useRef<HTMLDivElement>(null);
  const [triggered, setTriggered] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const onCompleteStable = useCallback(
    (msg: string) => onComplete(msg),
    [onComplete],
  );

  useEffect(() => {
    const el = hostRef.current;
    if (!el || el.shadowRoot) return;
    const shadow = el.attachShadow({ mode: "open" });

    // Initial state: spinner
    shadow.innerHTML = `
      <style>
        :host { display: block; padding: 16px; min-height: 52px; }
        .spinner {
          display: inline-block; width: 18px; height: 18px;
          border: 2px solid #e5e7eb; border-top-color: #6366f1;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
        }
        @keyframes spin { to { transform: rotate(360deg); } }
        .loader { display: flex; align-items: center; gap: 8px; font-size: 12px; color: #9ca3af; }
        button {
          height: 32px; padding: 0 16px;
          background: #6366f1; color: #fff;
          border: none; border-radius: 6px; font-size: 12px; cursor: pointer;
          font-family: inherit;
        }
        button:hover { opacity: 0.88; }
      </style>
      <div class="loader">
        <span class="spinner" role="status" aria-label="Loading shadow content"></span>
        Loading shadow content…
      </div>
    `;

    // Reveal content after 1.5s
    const timer = setTimeout(() => {
      shadow.innerHTML = `
        <style>
          :host { display: block; padding: 14px 16px; }
          button {
            height: 32px; padding: 0 16px;
            background: #6366f1; color: #fff;
            border: none; border-radius: 6px; font-size: 12px; cursor: pointer;
            font-family: inherit;
          }
          button:hover { opacity: 0.88; }
        </style>
        <button aria-label="Trigger Shadow Action" type="button">Trigger Shadow Action</button>
      `;
      setLoaded(true);
      shadow.querySelector("button")!.addEventListener("click", () => {
        setTriggered(true);
        onCompleteStable("Dynamic shadow action triggered ✓");
      });
    }, 1500);

    return () => clearTimeout(timer);
  }, [onCompleteStable]);

  return (
    <div className="flex flex-col gap-3">
      <p className="text-[11px] text-muted-foreground">
        Content loads after ~1.5 s. The revealed button has{" "}
        <code>aria-label=&quot;Trigger Shadow Action&quot;</code> but{" "}
        <strong>no testid</strong>. Spinner has{" "}
        <code>role=&quot;status&quot;</code> only.
      </p>
      <div className={styles.shadowHostShell}>
        <div className={styles.shadowHostLabel}>
          <code className="text-[10px]">
            [data-testid=&quot;shadow-dynamic-host&quot;]
          </code>
          <ShadowBadge mode="open" />
          {!loaded && (
            <span className={styles.shadowLoadingPill}>loading…</span>
          )}
          {loaded && <span className={styles.shadowReadyPill}>ready</span>}
        </div>
        <div
          ref={hostRef}
          data-testid="shadow-dynamic-host"
          data-shadow-mode="open"
          className={styles.shadowHostContent}
        />
      </div>
      {triggered && (
        <div className={styles.shadowResultBanner}>
          ✓ Dynamic shadow action triggered
        </div>
      )}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   S06 · evaluate() — no stable attributes on inner elements
   Challenge — input has only name="evalCode"; button plain text only
══════════════════════════════════════════════════════════════ */
function EvalShadowScenario({
  onComplete,
}: {
  onComplete: (msg: string) => void;
}) {
  const hostRef = useRef<HTMLDivElement>(null);
  const [executed, setExecuted] = useState(false);
  const onCompleteStable = useCallback(
    (msg: string) => onComplete(msg),
    [onComplete],
  );

  useEffect(() => {
    const el = hostRef.current;
    if (!el || el.shadowRoot) return;
    const shadow = el.attachShadow({ mode: "open" });
    shadow.innerHTML = `
      <style>
        :host { display: block; padding: 14px 16px; }
        .row { display: flex; align-items: center; gap: 8px; }
        input {
          flex: 1; height: 32px; padding: 0 10px; border: 1px solid #d1d5db;
          border-radius: 6px; font-size: 12px; font-family: inherit;
          background: #fff; color: #111827; outline: none;
        }
        input:focus { border-color: #6366f1; }
        button {
          height: 32px; padding: 0 14px;
          background: #374151; color: #fff;
          border: none; border-radius: 6px; font-size: 12px; cursor: pointer;
          font-family: inherit;
        }
        button:hover { background: #1f2937; }
      </style>
      <div class="row">
        <input name="evalCode" type="text" placeholder="(no testid, no id, no label)" />
        <button type="button">Execute</button>
      </div>
    `;

    // Store shadow reference on host element for evaluate() access
    (el as HTMLElement & { __shadow?: ShadowRoot }).__shadow = shadow;

    shadow.querySelector("button")!.addEventListener("click", () => {
      const val = (shadow.querySelector("input") as HTMLInputElement).value;
      el.setAttribute("data-eval-done", "true");
      el.setAttribute("data-eval-value", val || "empty");
      setExecuted(true);
      onCompleteStable(`Evaluated: "${val || "(empty)"}" ✓`);
    });
  }, [onCompleteStable]);

  return (
    <div className="flex flex-col gap-3">
      <p className="text-[11px] text-muted-foreground">
        Input has only <code>name=&quot;evalCode&quot;</code>. The button has{" "}
        <strong>no attributes at all</strong> — just text &quot;Execute&quot;.
        Standard locators cannot target these. Use <code>page.evaluate()</code>.
      </p>
      <div className={styles.shadowEvalNote}>
        <span className={styles.shadowEvalIcon}>⚠</span>
        Standard locators (<code>getByTestId</code>, <code>getByRole</code>,{" "}
        <code>getByLabel</code>) will NOT find elements with no stable
        attributes inside shadow DOM. You must use <code>page.evaluate()</code>{" "}
        or <code>js.executeScript()</code>.
      </div>
      <div className={styles.shadowHostShell}>
        <div className={styles.shadowHostLabel}>
          <code className="text-[10px]">
            [data-testid=&quot;shadow-eval-host&quot;]
          </code>
          <ShadowBadge mode="open" />
        </div>
        <div
          ref={hostRef}
          data-testid="shadow-eval-host"
          data-shadow-mode="open"
          className={styles.shadowHostContent}
        />
      </div>
      {executed && (
        <div className={styles.shadowResultBanner}>
          ✓ evaluate() executed successfully
        </div>
      )}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   Main PracticeTab
══════════════════════════════════════════════════════════════ */
export function PracticeTab({ upNext }: PracticeTabProps) {
  const [completedIds, setCompletedIds] = useState<Set<string>>(new Set());

  function markDone(id: string) {
    setCompletedIds((prev) => new Set([...prev, id]));
  }

  const progressItems: ProgressItem[] = shadowDomScenarios.map((s) => ({
    id: s.id.toLowerCase(),
    label: s.title,
    done: completedIds.has(s.id.toLowerCase()),
  }));

  return (
    <div
      className="mx-auto w-full max-w-[1280px] px-4 sm:px-7"
      data-testid="practice-tab"
      data-section="practice"
    >
      <div className={styles.practiceLayout}>
        <section aria-label="Interactive Scenarios">
          <p className="mb-3 text-[10.5px] font-bold tracking-[0.08em] text-muted-foreground uppercase">
            Interactive Scenarios
          </p>
          <div
            className="flex flex-col gap-[10px]"
            data-testid="scenarios-list"
          >
            {/* ── S01: Basic open shadow host ───────────────────── */}
            <ScenarioCard
              {...shadowDomScenarios[0]}
              onComplete={() => markDone("s01")}
            >
              {({ setResult }) => (
                <BasicShadowScenario
                  onComplete={(msg) => {
                    setResult(msg);
                    if (msg.includes("✓")) markDone("s01");
                  }}
                />
              )}
            </ScenarioCard>

            {/* ── S02: Multiple shadow hosts ────────────────────── */}
            <ScenarioCard
              {...shadowDomScenarios[1]}
              onComplete={() => markDone("s02")}
            >
              {({ setResult }) => (
                <MultiHostScenario
                  onComplete={(msg) => {
                    setResult(msg);
                    if (msg.includes("✓")) markDone("s02");
                  }}
                />
              )}
            </ScenarioCard>

            {/* ── S03: Nested shadow DOM ────────────────────────── */}
            <ScenarioCard
              {...shadowDomScenarios[2]}
              onComplete={() => markDone("s03")}
            >
              {({ setResult }) => (
                <NestedShadowScenario
                  onComplete={(msg) => {
                    setResult(msg);
                    if (msg.includes("✓")) markDone("s03");
                  }}
                />
              )}
            </ScenarioCard>

            {/* ── S04: Form inside shadow DOM ───────────────────── */}
            <ScenarioCard
              {...shadowDomScenarios[3]}
              onComplete={() => markDone("s04")}
            >
              {({ setResult }) => (
                <FormShadowScenario
                  onComplete={(msg) => {
                    setResult(msg);
                    if (msg.includes("✓")) markDone("s04");
                  }}
                />
              )}
            </ScenarioCard>

            {/* ── S05: Dynamic shadow content ───────────────────── */}
            <ScenarioCard
              {...shadowDomScenarios[4]}
              onComplete={() => markDone("s05")}
            >
              {({ setResult }) => (
                <DynamicShadowScenario
                  onComplete={(msg) => {
                    setResult(msg);
                    if (msg.includes("✓")) markDone("s05");
                  }}
                />
              )}
            </ScenarioCard>

            {/* ── S06: evaluate() to pierce shadow ─────────────── */}
            <ScenarioCard
              {...shadowDomScenarios[5]}
              onComplete={() => markDone("s06")}
            >
              {({ setResult }) => (
                <EvalShadowScenario
                  onComplete={(msg) => {
                    setResult(msg);
                    if (msg.includes("✓")) markDone("s06");
                  }}
                />
              )}
            </ScenarioCard>
          </div>
        </section>

        {/* ── Sidebar ────────────────────────────────────────── */}
        <aside className={styles.practiceSidebar} aria-label="Practice sidebar">
          <ProgressWidget items={progressItems} />
          <FrameworkMethodsPanel methods={shadowDomFrameworkMethods} />
          <UpNextCard {...upNext} />
        </aside>
      </div>
    </div>
  );
}
