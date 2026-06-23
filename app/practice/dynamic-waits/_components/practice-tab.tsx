"use client";

import { useState, useRef } from "react";
import {
  ScenarioCard,
  ProgressWidget,
  FrameworkMethodsPanel,
  UpNextCard,
} from "@/components/practice";
import type { ProgressItem } from "@/components/practice";
import {
  dynamicWaitsScenarios,
  frameworkMethods,
} from "@/data/practice-data/dynamic-waits/scenarios";
import type { PracticePageMeta } from "@/data/practice-data/types";
import styles from "./dynamic-waits.module.css";

interface PracticeTabProps {
  upNext: PracticePageMeta["upNext"];
}

/* ── Sub-components ──────────────────────────────────────────── */

function SpinnerScenario({
  onComplete,
}: {
  onComplete: (msg: string) => void;
}) {
  const [phase, setPhase] = useState<"idle" | "loading" | "done">("idle");

  function trigger() {
    if (phase !== "idle") return;
    setPhase("loading");
    setTimeout(() => {
      setPhase("done");
      onComplete("Data loaded — spinner gone ✓");
    }, 2500);
  }

  return (
    <div className="flex flex-col gap-3">
      <button
        type="button"
        data-testid="dw-trigger-spinner"
        disabled={phase !== "idle"}
        onClick={trigger}
        className="inline-flex h-8 w-fit items-center gap-2 rounded-md border border-input bg-background px-3 text-xs font-medium shadow-sm transition-colors hover:bg-accent disabled:cursor-not-allowed disabled:opacity-50"
      >
        {phase === "idle"
          ? "▶ Trigger Spinner"
          : phase === "loading"
            ? "Loading…"
            : "✓ Done"}
      </button>
      {phase === "loading" && (
        <div
          className="flex items-center gap-3"
          data-testid="dw-spinner"
          aria-label="Loading"
        >
          <span className={styles.spinner} />
          <div className="flex flex-1 flex-col gap-1.5">
            <div className={styles.skeletonLine} style={{ width: "80%" }} />
            <div className={styles.skeletonLine} style={{ width: "55%" }} />
          </div>
        </div>
      )}
      {phase === "done" && (
        <div
          data-testid="dw-spinner-content"
          className="text-sm font-medium text-foreground"
        >
          ✅ Content loaded successfully
        </div>
      )}
    </div>
  );
}

function ToastScenario({ onComplete }: { onComplete: (msg: string) => void }) {
  const [toast, setToast] = useState<{
    text: string;
    type: "success" | "error";
  } | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  function trigger(type: "success" | "error") {
    if (timerRef.current) clearTimeout(timerRef.current);
    const text =
      type === "success"
        ? "✓ Success — action completed"
        : "✕ Error — something went wrong";
    setToast({ text, type });
    onComplete(`Toast appeared: "${text}"`);
    timerRef.current = setTimeout(() => setToast(null), 3000);
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          data-testid="dw-trigger-toast"
          data-toast-type="success"
          onClick={() => trigger("success")}
          className="inline-flex h-8 items-center rounded-md border border-input bg-background px-3 text-xs font-medium shadow-sm transition-colors hover:bg-accent"
        >
          ▶ Success Toast
        </button>
        <button
          type="button"
          data-testid="dw-trigger-toast-error"
          data-toast-type="error"
          onClick={() => trigger("error")}
          className="inline-flex h-8 items-center rounded-md border border-input bg-background px-3 text-xs font-medium shadow-sm transition-colors hover:bg-accent"
        >
          ▶ Error Toast
        </button>
      </div>
      {toast && (
        <div
          data-testid="dw-toast"
          data-toast-type={toast.type}
          role="status"
          aria-live="polite"
          className={`${styles.toast} ${toast.type === "success" ? styles.toastSuccess : styles.toastError}`}
        >
          {toast.text}
          <span className="ml-auto text-[10px] opacity-60">
            auto-dismiss 3s
          </span>
        </div>
      )}
    </div>
  );
}

function PollScenario({ onComplete }: { onComplete: (msg: string) => void }) {
  const [count, setCount] = useState(0);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  function start() {
    if (running) return;
    setCount(0);
    setRunning(true);

    let currentCount = 0;
    intervalRef.current = setInterval(() => {
      currentCount++;
      setCount(currentCount);

      if (currentCount >= 5) {
        clearInterval(intervalRef.current!);
        setRunning(false);
        onComplete("Counter reached 5 ✓");
      }
    }, 500);
  }

  function reset() {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setRunning(false);
    setCount(0);
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          data-testid="dw-trigger-poll"
          disabled={running}
          onClick={start}
          className="inline-flex h-8 items-center rounded-md border border-input bg-background px-3 text-xs font-medium shadow-sm transition-colors hover:bg-accent disabled:cursor-not-allowed disabled:opacity-50"
        >
          ▶ Start Counter
        </button>
        <button
          type="button"
          data-testid="dw-poll-reset"
          onClick={reset}
          className="inline-flex h-8 items-center rounded-md border border-input bg-background px-3 text-xs font-medium shadow-sm transition-colors hover:bg-accent"
        >
          ↺ Reset
        </button>
      </div>
      <div className={styles.pollCounter}>
        <span
          className={styles.pollValue}
          data-testid="dw-poll-count"
          aria-live="polite"
        >
          {count}
        </span>
        <span className="text-xs text-muted-foreground">
          / 5 — increments every 500 ms
        </span>
      </div>
    </div>
  );
}

function EnabledAfterDelayScenario({
  onComplete,
}: {
  onComplete: (msg: string) => void;
}) {
  const [enabled, setEnabled] = useState(false);
  const [armed, setArmed] = useState(false);

  function arm() {
    if (armed) return;
    setArmed(true);
    setTimeout(() => setEnabled(true), 3000);
  }

  return (
    <div className="flex flex-col gap-3">
      <button
        type="button"
        data-testid="dw-arm-enable"
        disabled={armed}
        onClick={arm}
        className="inline-flex h-8 w-fit items-center rounded-md border border-input bg-background px-3 text-xs font-medium shadow-sm transition-colors hover:bg-accent disabled:opacity-50"
      >
        {armed ? (enabled ? "✓ Ready" : "⏳ Enabling in 3s…") : "▶ Arm Button"}
      </button>
      <button
        type="button"
        id="dw-submit-btn"
        data-testid="dw-submit-btn"
        disabled={!enabled}
        onClick={() => onComplete("Submit clicked after wait ✓")}
        className="inline-flex h-8 w-fit items-center rounded-md bg-primary px-3 text-xs font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-40"
      >
        Submit
      </button>
      <p className="text-xs text-muted-foreground">
        Button becomes enabled 3 seconds after arming. Wait for{" "}
        <code>state: &apos;enabled&apos;</code>.
      </p>
    </div>
  );
}

function StatusPanelScenario({
  onComplete,
}: {
  onComplete: (msg: string) => void;
}) {
  const STATUSES = ["Idle", "Connecting", "Processing", "Done"] as const;
  const [idx, setIdx] = useState(0);
  const [running, setRunning] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  function trigger() {
    if (running) return;
    setRunning(true);
    setIdx(0);

    function advance(i: number) {
      if (i >= STATUSES.length) {
        setRunning(false);
        return;
      }
      setIdx(i);
      if (STATUSES[i] === "Done") onComplete("Status changed to Done ✓");
      timerRef.current = setTimeout(() => advance(i + 1), 1000);
    }
    advance(1);
  }

  const status = STATUSES[idx];

  return (
    <div data-testid="dw-status-panel" className="flex flex-col gap-3">
      <button
        type="button"
        data-testid="dw-trigger-status"
        disabled={running}
        onClick={trigger}
        className="inline-flex h-8 w-fit items-center rounded-md border border-input bg-background px-3 text-xs font-medium shadow-sm transition-colors hover:bg-accent disabled:opacity-50"
      >
        ▶ Run Status Sequence
      </button>
      <div className={styles.statusPanel}>
        <span
          className={`${styles.statusDot} ${status === "Done" ? styles.statusDotActive : ""}`}
        />
        <span className="text-xs text-muted-foreground">Status:</span>
        {/* No data-testid intentionally — practice XPath text-based wait */}
        <span
          className="status-value text-sm font-semibold text-foreground"
          aria-live="polite"
        >
          {status}
        </span>
      </div>
      <p className="text-[11px] text-muted-foreground">
        Locate via:{" "}
        <code>{`//div[@data-testid="dw-status-panel"]//span[contains(@class,"status-value")]`}</code>
      </p>
    </div>
  );
}

function FetchScenario({ onComplete }: { onComplete: (msg: string) => void }) {
  const [state, setState] = useState<"idle" | "loading" | "done">("idle");
  const FAKE_DATA = { id: 42, name: "QA Playground User", role: "Tester" };

  function fetch_() {
    if (state !== "idle") return;
    setState("loading");
    setTimeout(() => {
      setState("done");
      onComplete(`Fetched: ${JSON.stringify(FAKE_DATA)}`);
    }, 2000);
  }

  return (
    <div className="flex flex-col gap-3">
      <button
        type="button"
        data-testid="dw-fetch-btn"
        disabled={state !== "idle"}
        onClick={fetch_}
        className="inline-flex h-8 w-fit items-center gap-2 rounded-md border border-input bg-background px-3 text-xs font-medium shadow-sm transition-colors hover:bg-accent disabled:opacity-50"
      >
        {state === "loading" ? (
          <>
            <span
              className={styles.spinner}
              style={{ width: 14, height: 14 }}
            />{" "}
            Fetching…
          </>
        ) : (
          "▶ Fetch Data"
        )}
      </button>
      {state === "done" && (
        <pre
          data-testid="dw-fetch-result"
          className="rounded border border-border bg-muted p-2 font-mono text-[11px] leading-relaxed"
        >
          {JSON.stringify(FAKE_DATA, null, 2)}
        </pre>
      )}
    </div>
  );
}

function DelayedElementScenario({
  onComplete,
}: {
  onComplete: (msg: string) => void;
}) {
  const [shown, setShown] = useState(false);
  const [loading, setLoading] = useState(false);

  return (
    <div className="flex flex-col gap-3">
      <button
        type="button"
        data-testid="dw-trigger-delayed"
        disabled={loading || shown}
        onClick={() => {
          setLoading(true);
          setTimeout(() => {
            setShown(true);
            setLoading(false);
            onComplete("Element appeared after 2s delay ✓");
          }, 2000);
        }}
        className="inline-flex h-8 w-fit items-center gap-2 rounded-md border border-input bg-background px-3 text-xs font-medium shadow-sm transition-colors hover:bg-accent disabled:opacity-50"
      >
        {loading ? (
          <>
            <span
              className={styles.spinner}
              style={{ width: 13, height: 13 }}
            />{" "}
            Waiting 2s…
          </>
        ) : (
          "▶ Trigger Delay"
        )}
      </button>
      {shown && (
        <div
          id="dw-delayed-result"
          data-testid="dw-delayed-result"
          data-appeared="true"
          className="rounded border border-border bg-muted px-3 py-2 text-sm font-medium text-foreground"
        >
          ✅ I appeared after a 2-second delay
        </div>
      )}
    </div>
  );
}

function RaceScenario({ onComplete }: { onComplete: (msg: string) => void }) {
  const [visible, setVisible] = useState(false);
  const [armed, setArmed] = useState(false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  function arm() {
    if (armed) return;
    setArmed(true);
    const delay = 500 + Math.random() * 3000;
    const show = setTimeout(() => {
      setVisible(true);
      onComplete("Race element caught in time ✓");
      const hide = setTimeout(() => setVisible(false), 800);
      timers.current.push(hide);
    }, delay);
    timers.current.push(show);
  }

  function reset() {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    setArmed(false);
    setVisible(false);
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          data-testid="dw-trigger-race"
          disabled={armed}
          onClick={arm}
          className="inline-flex h-8 items-center rounded-md border border-input bg-background px-3 text-xs font-medium shadow-sm transition-colors hover:bg-accent disabled:opacity-50"
        >
          ▶ Arm Race Element
        </button>
        <button
          type="button"
          data-testid="dw-race-reset"
          onClick={reset}
          className="inline-flex h-8 items-center rounded-md border border-input bg-background px-3 text-xs font-medium shadow-sm transition-colors hover:bg-accent"
        >
          ↺ Reset
        </button>
      </div>
      <p className="text-[11px] text-muted-foreground">
        Element appears at a random delay (0.5–3.5 s) and vanishes after 800 ms.
        Catch it with <code>waitForSelector</code>.
      </p>
      {visible && (
        <div
          data-testid="dw-race-target"
          data-race-appeared="true"
          className={styles.raceTarget}
          aria-live="assertive"
        >
          ⚡ Race element visible — catch me!
        </div>
      )}
    </div>
  );
}

/* ── Main PracticeTab ────────────────────────────────────────── */

export function PracticeTab({ upNext }: PracticeTabProps) {
  const [completedIds, setCompletedIds] = useState<Set<string>>(new Set());

  function markDone(id: string) {
    setCompletedIds((prev) => new Set([...prev, id]));
  }

  const progressItems: ProgressItem[] = dynamicWaitsScenarios.map((s) => ({
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
            {/* ── S01: Delayed Element Appearance ──────────────────────── */}
            <ScenarioCard
              {...dynamicWaitsScenarios[0]}
              onComplete={() => markDone("s01")}
            >
              {({ setResult }) => (
                <DelayedElementScenario
                  onComplete={(msg) => {
                    setResult(msg);
                    markDone("s01");
                  }}
                />
              )}
            </ScenarioCard>

            {/* ── S02: Spinner / Skeleton ───────────────────────────────── */}
            <ScenarioCard
              {...dynamicWaitsScenarios[1]}
              onComplete={() => markDone("s02")}
            >
              {({ setResult }) => (
                <SpinnerScenario
                  onComplete={(msg) => {
                    setResult(msg);
                    markDone("s02");
                  }}
                />
              )}
            </ScenarioCard>

            {/* ── S03: Toast Message ───────────────────────────────────── */}
            <ScenarioCard
              {...dynamicWaitsScenarios[2]}
              onComplete={() => markDone("s03")}
            >
              {({ setResult }) => (
                <ToastScenario
                  onComplete={(msg) => {
                    setResult(msg);
                    markDone("s03");
                  }}
                />
              )}
            </ScenarioCard>

            {/* ── S04: Polling Until Condition ─────────────────────────── */}
            <ScenarioCard
              {...dynamicWaitsScenarios[3]}
              onComplete={() => markDone("s04")}
            >
              {({ setResult }) => (
                <PollScenario
                  onComplete={(msg) => {
                    setResult(msg);
                    markDone("s04");
                  }}
                />
              )}
            </ScenarioCard>

            {/* ── S05: Element Enabled After Delay ─────────────────────── */}
            <ScenarioCard
              {...dynamicWaitsScenarios[4]}
              onComplete={() => markDone("s05")}
            >
              {({ setResult }) => (
                <EnabledAfterDelayScenario
                  onComplete={(msg) => {
                    setResult(msg);
                    markDone("s05");
                  }}
                />
              )}
            </ScenarioCard>

            {/* ── S06: Text Change (Hard — no testid on span) ──────────── */}
            <ScenarioCard
              {...dynamicWaitsScenarios[5]}
              onComplete={() => markDone("s06")}
            >
              {({ setResult }) => (
                <StatusPanelScenario
                  onComplete={(msg) => {
                    setResult(msg);
                    markDone("s06");
                  }}
                />
              )}
            </ScenarioCard>

            {/* ── S07: Network-Dependent Content ───────────────────────── */}
            <ScenarioCard
              {...dynamicWaitsScenarios[6]}
              onComplete={() => markDone("s07")}
            >
              {({ setResult }) => (
                <FetchScenario
                  onComplete={(msg) => {
                    setResult(msg);
                    markDone("s07");
                  }}
                />
              )}
            </ScenarioCard>

            {/* ── S08: Race Condition / Flaky Element (Challenge) ──────── */}
            <ScenarioCard
              {...dynamicWaitsScenarios[7]}
              onComplete={() => markDone("s08")}
            >
              {({ setResult }) => (
                <RaceScenario
                  onComplete={(msg) => {
                    setResult(msg);
                    markDone("s08");
                  }}
                />
              )}
            </ScenarioCard>
          </div>
        </section>

        <aside
          className={styles.practiceSidebar}
          data-testid="practice-sidebar"
        >
          <ProgressWidget items={progressItems} />
          <FrameworkMethodsPanel methods={frameworkMethods} />
          <UpNextCard {...upNext} />
        </aside>
      </div>
    </div>
  );
}
