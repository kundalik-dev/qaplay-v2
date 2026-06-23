"use client";

import { useState, useEffect, useCallback } from "react";
import {
  ScenarioCard,
  ProgressWidget,
  FrameworkMethodsPanel,
  UpNextCard,
} from "@/components/practice";
import type { ProgressItem } from "@/components/practice";
import {
  iframesScenarios,
  frameworkMethods,
} from "@/data/practice-data/iframes/scenarios";
import type { PracticePageMeta } from "@/data/practice-data/types";
import styles from "./iframes.module.css";

interface PracticeTabProps {
  upNext: PracticePageMeta["upNext"];
}

/* ── Shared frame chrome wrapper ────────────────────────────────
   Renders a browser-like chrome bar around each iframe so testers
   can see the src URL and the available locator attributes.
──────────────────────────────────────────────────────────────── */
interface FrameShellProps {
  src: string;
  height: number;
  attrs: { label: string }[];
  testId?: string;
  name?: string;
  title?: string;
  children?: React.ReactNode;
}

function FrameShell({
  src,
  height,
  attrs,
  testId,
  name,
  title,
  children,
}: FrameShellProps) {
  return (
    <div className={styles.frameShell}>
      {/* Chrome bar */}
      <div className={styles.frameChrome}>
        <span className={`${styles.frameDot} ${styles.frameDotRed}`} />
        <span className={`${styles.frameDot} ${styles.frameDotYellow}`} />
        <span className={`${styles.frameDot} ${styles.frameDotGreen}`} />
        <div className={styles.frameUrl}>{src}</div>
      </div>

      {/* Attribute badges */}
      {attrs.length > 0 && (
        <div className={styles.frameAttrs}>
          {attrs.map((a) => (
            <span key={a.label} className={styles.attrBadge}>
              {a.label}
            </span>
          ))}
        </div>
      )}

      {/* The actual iframe */}
      <div className={styles.frameBody}>
        <iframe
          src={src}
          height={height}
          className={styles.practiceFrame}
          {...(testId ? { "data-testid": testId } : {})}
          {...(name ? { name } : {})}
          {...(title ? { title } : {})}
          loading="lazy"
          sandbox="allow-scripts allow-same-origin allow-forms"
        />
      </div>

      {children}
    </div>
  );
}

/* ── Locator hint strip ─────────────────────────────────────────
   Small colour-coded rows shown above each frame to remind testers
   which locator strategy applies at each difficulty level.
──────────────────────────────────────────────────────────────── */
interface HintRow {
  pill: string;
  pillVariant?: "green" | "orange" | "red";
  text: string;
}

function LocatorHint({ rows }: { rows: HintRow[] }) {
  return (
    <div className={styles.locatorHint}>
      {rows.map((r) => (
        <div key={r.pill} className={styles.locatorHintRow}>
          <span
            className={`${styles.locatorPill} ${
              r.pillVariant === "green"
                ? styles.locatorPillGreen
                : r.pillVariant === "orange"
                  ? styles.locatorPillOrange
                  : r.pillVariant === "red"
                    ? styles.locatorPillRed
                    : ""
            }`}
          >
            {r.pill}
          </span>
          <span>{r.text}</span>
        </div>
      ))}
    </div>
  );
}

/* ── useIframeMessage hook ──────────────────────────────────────
   Listens for postMessage from iframe content and calls back with
   the value. Each scenario uses its own message type string so
   messages from different iframes don't collide.
──────────────────────────────────────────────────────────────── */
function useIframeMessage(type: string, onMessage: (value: string) => void) {
  const stable = useCallback(onMessage, []); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => {
    function handler(e: MessageEvent) {
      if (e.data && e.data.type === type) {
        stable(e.data.value as string);
      }
    }
    window.addEventListener("message", handler);
    return () => window.removeEventListener("message", handler);
  }, [type, stable]);
}

/* ══════════════════════════════════════════════════════════════
   S01 · Basic iframe — Fill & Submit
   Beginner: data-testid on iframe, input, and button
══════════════════════════════════════════════════════════════ */
function BasicIframeScenario({
  onComplete,
}: {
  onComplete: (msg: string) => void;
}) {
  const [lastMsg, setLastMsg] = useState("");

  useIframeMessage("iframe-s01", (val) => {
    setLastMsg(val);
    onComplete(val);
  });

  return (
    <div className="flex flex-col gap-3">
      <LocatorHint
        rows={[
          {
            pill: "data-testid",
            pillVariant: "green",
            text: 'iframe: [data-testid="iframe-basic"]',
          },
          {
            pill: "data-testid",
            pillVariant: "green",
            text: 'input: [data-testid="iframe-name-input"]',
          },
          {
            pill: "data-testid",
            pillVariant: "green",
            text: 'button: [data-testid="iframe-submit-btn"]',
          },
        ]}
      />
      <FrameShell
        src="/practice-frames/iframe-basic.html"
        height={130}
        testId="iframe-basic"
        name="basic-frame"
        title="Basic Iframe"
        attrs={[
          { label: 'data-testid="iframe-basic"' },
          { label: 'name="basic-frame"' },
          { label: 'title="Basic Iframe"' },
        ]}
      />
      {lastMsg && (
        <div className={styles.resultBanner}>
          <span className={styles.resultBannerIcon}>📨</span>
          {lastMsg}
        </div>
      )}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   S02 · Form inside iframe — Checkbox & Select
   Beginner: frame located by title; getByLabel for checkbox
══════════════════════════════════════════════════════════════ */
function FormIframeScenario({
  onComplete,
}: {
  onComplete: (msg: string) => void;
}) {
  const [lastMsg, setLastMsg] = useState("");

  useIframeMessage("iframe-s02", (val) => {
    setLastMsg(val);
    onComplete(val);
  });

  return (
    <div className="flex flex-col gap-3">
      <LocatorHint
        rows={[
          {
            pill: "title",
            pillVariant: "green",
            text: 'iframe: iframe[title="Form Iframe"]',
          },
          {
            pill: "data-testid",
            pillVariant: "green",
            text: 'select: [data-testid="iframe-lang-select"]',
          },
          {
            pill: "getByLabel",
            pillVariant: "green",
            text: 'checkbox: getByLabel("I agree to the terms")',
          },
        ]}
      />
      <FrameShell
        src="/practice-frames/iframe-form.html"
        height={175}
        testId="iframe-form"
        name="form-frame"
        title="Form Iframe"
        attrs={[
          { label: 'data-testid="iframe-form"' },
          { label: 'name="form-frame"' },
          { label: 'title="Form Iframe"' },
        ]}
      />
      {lastMsg && (
        <div className={styles.resultBanner}>
          <span className={styles.resultBannerIcon}>📨</span>
          {lastMsg}
        </div>
      )}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   S03 · Three iframes — each located differently
   Medium: testid / name / title — different locator per frame
══════════════════════════════════════════════════════════════ */
function MultiIframeScenario({
  onComplete,
}: {
  onComplete: (msg: string) => void;
}) {
  const [msgs, setMsgs] = useState({ f1: "", f2: "", f3: "" });

  useIframeMessage("iframe-s03-f1", (val) => {
    setMsgs((p) => {
      const n = { ...p, f1: val };
      onComplete(Object.values(n).filter(Boolean).join(" | "));
      return n;
    });
  });
  useIframeMessage("iframe-s03-f2", (val) => {
    setMsgs((p) => {
      const n = { ...p, f2: val };
      onComplete(Object.values(n).filter(Boolean).join(" | "));
      return n;
    });
  });
  useIframeMessage("iframe-s03-f3", (val) => {
    setMsgs((p) => {
      const n = { ...p, f3: val };
      onComplete(Object.values(n).filter(Boolean).join(" | "));
      return n;
    });
  });

  const frames = [
    {
      key: "f1",
      src: "/practice-frames/iframe-multi-1.html",
      testId: "iframe-frame-1",
      name: "frame-one",
      title: "Frame One",
      hint: {
        pill: "data-testid",
        variant: "green" as const,
        text: 'iframe: [data-testid="iframe-frame-1"]',
      },
      btnHint: {
        pill: "data-testid",
        variant: "green" as const,
        text: 'button: [data-testid="iframe-f1-action-btn"]',
      },
      msg: msgs.f1,
    },
    {
      key: "f2",
      src: "/practice-frames/iframe-multi-2.html",
      testId: undefined,
      name: "frame-two",
      title: "Frame Two",
      hint: {
        pill: "name",
        variant: "orange" as const,
        text: 'iframe: iframe[name="frame-two"]',
      },
      btnHint: {
        pill: "aria-label",
        variant: "orange" as const,
        text: 'button: getByRole("button", { name: "Activate Frame Two" })',
      },
      msg: msgs.f2,
    },
    {
      key: "f3",
      src: "/practice-frames/iframe-multi-3.html",
      testId: undefined,
      name: undefined,
      title: "Frame Three",
      hint: {
        pill: "title",
        variant: "red" as const,
        text: 'iframe: iframe[title="Frame Three"]',
      },
      btnHint: {
        pill: "text only",
        variant: "red" as const,
        text: 'button: getByRole("button", { name: "Confirm Action" })',
      },
      msg: msgs.f3,
    },
  ];

  return (
    <div className="flex flex-col gap-3">
      <p className="text-[11px] text-muted-foreground">
        Each iframe must be located differently. Frame 1 has a testid; Frame 2
        has only a <code>name</code>; Frame 3 has only a <code>title</code>.
      </p>

      <div className={styles.multiFrameGrid}>
        {frames.map((f) => (
          <div key={f.key} className="flex flex-col gap-1">
            <LocatorHint
              rows={[
                {
                  pill: f.hint.pill,
                  pillVariant: f.hint.variant,
                  text: f.hint.text,
                },
                {
                  pill: f.btnHint.pill,
                  pillVariant: f.btnHint.variant,
                  text: f.btnHint.text,
                },
              ]}
            />
            <FrameShell
              src={f.src}
              height={110}
              testId={f.testId}
              name={f.name}
              title={f.title}
              attrs={[
                ...(f.testId ? [{ label: `data-testid="${f.testId}"` }] : []),
                ...(f.name ? [{ label: `name="${f.name}"` }] : []),
                { label: `title="${f.title}"` },
              ]}
            />
            {f.msg && (
              <div className={styles.resultBanner} style={{ fontSize: 10 }}>
                <span className={styles.resultBannerIcon}>📨</span>
                {f.msg}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   S04 · Nested iframes — 2 levels deep
   Medium: outer testid + title; inner title only
══════════════════════════════════════════════════════════════ */
function NestedIframeScenario({
  onComplete,
}: {
  onComplete: (msg: string) => void;
}) {
  const [lastMsg, setLastMsg] = useState("");

  useIframeMessage("iframe-s04", (val) => {
    setLastMsg(val);
    onComplete(val);
  });

  return (
    <div className="flex flex-col gap-3">
      <LocatorHint
        rows={[
          {
            pill: "data-testid",
            pillVariant: "green",
            text: 'outer: [data-testid="iframe-outer"]',
          },
          {
            pill: "title",
            pillVariant: "orange",
            text: "inner: frameLocator('iframe[title=\"Inner Frame\"]')",
          },
          {
            pill: "data-testid",
            pillVariant: "green",
            text: 'input: [data-testid="iframe-inner-input"]',
          },
        ]}
      />

      {/* Outer frame */}
      <div className={styles.frameShell}>
        <div className={styles.frameChrome}>
          <span className={`${styles.frameDot} ${styles.frameDotRed}`} />
          <span className={`${styles.frameDot} ${styles.frameDotYellow}`} />
          <span className={`${styles.frameDot} ${styles.frameDotGreen}`} />
          <div className={styles.frameUrl}>
            /practice-frames/iframe-nested-outer.html
          </div>
        </div>
        <div className={styles.frameAttrs}>
          <span className={styles.attrBadge}>
            data-testid=&quot;iframe-outer&quot;
          </span>
          <span className={styles.attrBadge}>
            title=&quot;Outer Frame&quot;
          </span>
        </div>

        {/* Inner frame nesting indicator */}
        <div className={styles.nestedIndicator}>
          <span className={styles.nestArrow}>↳</span>
          Inner frame inside: <code>iframe[title=&quot;Inner Frame&quot;]</code>
          <span style={{ marginLeft: "auto", opacity: 0.6 }}>
            2 levels deep
          </span>
        </div>

        <div className={styles.frameBody}>
          <iframe
            src="/practice-frames/iframe-nested-outer.html"
            height={155}
            className={styles.practiceFrame}
            data-testid="iframe-outer"
            title="Outer Frame"
            name="outer-frame"
            loading="lazy"
            sandbox="allow-scripts allow-same-origin allow-forms"
          />
        </div>
      </div>

      {lastMsg && (
        <div className={styles.resultBanner}>
          <span className={styles.resultBannerIcon}>📨</span>
          {lastMsg}
        </div>
      )}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   S05 · Dynamic iframe content — wait for load
   Hard: no testid on dynamic elements; locate by role/aria-label
══════════════════════════════════════════════════════════════ */
function DynamicIframeScenario({
  onComplete,
}: {
  onComplete: (msg: string) => void;
}) {
  const [lastMsg, setLastMsg] = useState("");

  useIframeMessage("iframe-s05", (val) => {
    setLastMsg(val);
    onComplete(val);
  });

  return (
    <div className="flex flex-col gap-3">
      <LocatorHint
        rows={[
          {
            pill: "data-testid",
            pillVariant: "green",
            text: 'iframe: [data-testid="iframe-dynamic"]',
          },
          {
            pill: "role",
            pillVariant: "orange",
            text: 'button: getByRole("button", { name: "Reveal Secret" }) — no testid',
          },
          {
            pill: "aria-label",
            pillVariant: "orange",
            text: 'input: getByRole("textbox", { name: "Reveal code input" }) — no testid',
          },
        ]}
      />
      <p className="text-[11px] text-muted-foreground">
        Content loads after <strong>1.5 s</strong>. Use{" "}
        <code>
          expect(frame.getByRole(&apos;button&apos;)).toBeVisible(&#123;
          timeout: 5000 &#125;)
        </code>{" "}
        — don&apos;t use fixed waits.
      </p>
      <FrameShell
        src="/practice-frames/iframe-dynamic.html"
        height={155}
        testId="iframe-dynamic"
        name="dynamic-frame"
        title="Dynamic Frame"
        attrs={[
          { label: 'data-testid="iframe-dynamic"' },
          { label: 'title="Dynamic Frame"' },
        ]}
      />
      {lastMsg && (
        <div className={styles.resultBanner}>
          <span className={styles.resultBannerIcon}>📨</span>
          {lastMsg}
        </div>
      )}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   S06 · Form validation inside iframe — Challenge
   Challenge: error spans have no testid → role="alert" or XPath
              company field has no testid → getByLabel only
══════════════════════════════════════════════════════════════ */
function ValidationIframeScenario({
  onComplete,
}: {
  onComplete: (msg: string) => void;
}) {
  const [lastMsg, setLastMsg] = useState("");

  useIframeMessage("iframe-s06", (val) => {
    setLastMsg(val);
    onComplete(val);
  });

  return (
    <div className="flex flex-col gap-3">
      <LocatorHint
        rows={[
          {
            pill: "data-testid",
            pillVariant: "green",
            text: 'iframe: [data-testid="iframe-validation"]',
          },
          {
            pill: "role=alert",
            pillVariant: "red",
            text: 'errors: getByRole("alert") — NO data-testid on error spans',
          },
          {
            pill: "getByLabel",
            pillVariant: "orange",
            text: 'company field: getByLabel("Company") — no testid',
          },
        ]}
      />
      <p className="text-[11px] text-muted-foreground">
        Submit with empty fields to trigger errors. Error messages use{" "}
        <code>role=&quot;alert&quot;</code> — locate without testid via role,
        XPath following-sibling, or partial text.
      </p>
      <FrameShell
        src="/practice-frames/iframe-validation.html"
        height={225}
        testId="iframe-validation"
        name="validation-frame"
        title="Validation Frame"
        attrs={[
          { label: 'data-testid="iframe-validation"' },
          { label: 'name="validation-frame"' },
          { label: 'title="Validation Frame"' },
        ]}
      />
      {lastMsg && (
        <div className={styles.resultBanner}>
          <span className={styles.resultBannerIcon}>📨</span>
          {lastMsg}
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

  const progressItems: ProgressItem[] = iframesScenarios.map((s) => ({
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
            {/* ── S01: Basic iframe ─────────────────────────────────── */}
            <ScenarioCard
              {...iframesScenarios[0]}
              onComplete={() => markDone("s01")}
            >
              {({ setResult }) => (
                <BasicIframeScenario
                  onComplete={(msg) => {
                    setResult(msg);
                    markDone("s01");
                  }}
                />
              )}
            </ScenarioCard>

            {/* ── S02: Form inside iframe ───────────────────────────── */}
            <ScenarioCard
              {...iframesScenarios[1]}
              onComplete={() => markDone("s02")}
            >
              {({ setResult }) => (
                <FormIframeScenario
                  onComplete={(msg) => {
                    setResult(msg);
                    if (msg.includes("✓")) markDone("s02");
                  }}
                />
              )}
            </ScenarioCard>

            {/* ── S03: Multiple iframes ─────────────────────────────── */}
            <ScenarioCard
              {...iframesScenarios[2]}
              onComplete={() => markDone("s03")}
            >
              {({ setResult }) => (
                <MultiIframeScenario
                  onComplete={(msg) => {
                    setResult(msg);
                    if (msg.includes("✓")) markDone("s03");
                  }}
                />
              )}
            </ScenarioCard>

            {/* ── S04: Nested iframes ───────────────────────────────── */}
            <ScenarioCard
              {...iframesScenarios[3]}
              onComplete={() => markDone("s04")}
            >
              {({ setResult }) => (
                <NestedIframeScenario
                  onComplete={(msg) => {
                    setResult(msg);
                    if (msg.includes("✓")) markDone("s04");
                  }}
                />
              )}
            </ScenarioCard>

            {/* ── S05: Dynamic iframe content ───────────────────────── */}
            <ScenarioCard
              {...iframesScenarios[4]}
              onComplete={() => markDone("s05")}
            >
              {({ setResult }) => (
                <DynamicIframeScenario
                  onComplete={(msg) => {
                    setResult(msg);
                    if (msg.includes("✓")) markDone("s05");
                  }}
                />
              )}
            </ScenarioCard>

            {/* ── S06: Validation inside iframe ─────────────────────── */}
            <ScenarioCard
              {...iframesScenarios[5]}
              onComplete={() => markDone("s06")}
            >
              {({ setResult }) => (
                <ValidationIframeScenario
                  onComplete={(msg) => {
                    setResult(msg);
                    markDone("s06");
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
