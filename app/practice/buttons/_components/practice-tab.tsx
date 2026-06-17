"use client";

import { useRef, useState } from "react";
import { ScenarioCard } from "@/components/practice";
import { ProgressWidget, type ProgressItem } from "@/components/practice";
import { FrameworkMethodsPanel } from "@/components/practice";
import { UpNextCard } from "@/components/practice";
import {
  buttonScenarios,
  frameworkMethods,
} from "@/data/practice-data/buttons/scenarios";
import type { PracticePageMeta } from "@/data/practice-data/types";
import styles from "./buttons.module.css";

interface PracticeTabProps {
  upNext: PracticePageMeta["upNext"];
}

export function PracticeTab({ upNext }: PracticeTabProps) {
  const [completedIds, setCompletedIds] = useState<Set<string>>(new Set());

  function markDone(id: string) {
    setCompletedIds((prev) => new Set([...prev, id]));
  }

  const progressItems: ProgressItem[] = buttonScenarios.map((s) => ({
    id: s.id.toLowerCase(),
    label: s.title,
    done: completedIds.has(s.id.toLowerCase()),
  }));

  // Click-and-hold state for S06
  const holdTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const heldEnoughRef = useRef(false);
  const [holdResult, setHoldResult] = useState<{
    id: string;
    text: string;
  } | null>(null);

  return (
    <div
      className="mx-auto w-full max-w-[1280px] px-7"
      data-testid="practice-tab"
      data-section="practice"
    >
      <div
        className="grid gap-6 pt-6 pb-16"
        style={{ gridTemplateColumns: "1fr 280px" }}
      >
        {/* ── Left: scenarios ─────────────────────────────────────────── */}
        <section aria-label="Interactive Scenarios">
          <p className="mb-3 text-[10.5px] font-bold tracking-[0.08em] text-muted-foreground uppercase">
            Interactive Scenarios
          </p>

          <div
            className="flex flex-col gap-[10px]"
            data-testid="scenarios-list"
          >
            {/* S01 — Navigate to Home Page */}
            <ScenarioCard
              {...buttonScenarios[0]}
              onComplete={() => markDone("s01")}
            >
              {({ setResult }) => (
                <button
                  id="navigateHomeBtn"
                  data-testid="btn-navigate-home"
                  className={styles.practiceBtn + " " + styles.btnPrimary}
                  onClick={() => setResult("Navigated to Home Page ✓")}
                >
                  Go To Home
                </button>
              )}
            </ScenarioCard>

            {/* S02 — Get Coordinates */}
            <ScenarioCard
              {...buttonScenarios[1]}
              onComplete={() => markDone("s02")}
            >
              {({ setResult }) => (
                <button
                  id="coordinatesBtn"
                  data-testid="btn-get-coordinates"
                  className={styles.practiceBtn + " " + styles.btnTeal}
                  onClick={(e) => {
                    const r = (
                      e.currentTarget as HTMLElement
                    ).getBoundingClientRect();
                    setResult(
                      `X: ${Math.round(r.x)}px, Y: ${Math.round(r.y)}px`,
                    );
                  }}
                >
                  Find Location
                </button>
              )}
            </ScenarioCard>

            {/* S03 — Get Color */}
            <ScenarioCard
              {...buttonScenarios[2]}
              onComplete={() => markDone("s03")}
            >
              {({ setResult }) => (
                <button
                  id="colorBtn"
                  data-testid="btn-get-color"
                  className={styles.practiceBtn + " " + styles.btnViolet}
                  onClick={(e) => {
                    const bg = getComputedStyle(
                      e.currentTarget,
                    ).backgroundColor;
                    setResult(`Background: ${bg}`);
                  }}
                >
                  Find my color?
                </button>
              )}
            </ScenarioCard>

            {/* S04 — Get Size */}
            <ScenarioCard
              {...buttonScenarios[3]}
              onComplete={() => markDone("s04")}
            >
              {({ setResult }) => (
                <button
                  id="sizeBtn"
                  data-testid="btn-get-size"
                  className={styles.practiceBtn + " " + styles.btnDark}
                  onClick={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    setResult(
                      `W: ${el.offsetWidth}px, H: ${el.offsetHeight}px`,
                    );
                  }}
                >
                  Do you know my size?
                </button>
              )}
            </ScenarioCard>

            {/* S05 — Disabled */}
            <ScenarioCard {...buttonScenarios[4]}>
              {() => (
                <button
                  id="disabledBtn"
                  data-testid="btn-disabled"
                  className={styles.practiceBtn + " " + styles.btnDisabled}
                  disabled
                >
                  Disabled
                </button>
              )}
            </ScenarioCard>

            {/* S06 — Click and Hold */}
            <ScenarioCard
              {...buttonScenarios[5]}
              onComplete={() => markDone("s06")}
            >
              {({ setResult, complete }) => (
                <button
                  id="clickHoldBtn"
                  data-testid="btn-click-hold"
                  className={styles.practiceBtn + " " + styles.btnBlue}
                  onPointerDown={(e) => {
                    (e.currentTarget as HTMLElement).setPointerCapture(
                      e.pointerId,
                    );
                    heldEnoughRef.current = false;
                    setResult("Holding… keep pressing");
                    holdTimerRef.current = setTimeout(() => {
                      heldEnoughRef.current = true;
                      setResult("Held for 1.5s ✓");
                      complete();
                    }, 1500);
                  }}
                  onPointerUp={() => {
                    if (holdTimerRef.current) {
                      clearTimeout(holdTimerRef.current);
                      holdTimerRef.current = null;
                    }
                    if (!heldEnoughRef.current) {
                      setResult("Released too early — hold for 1.5s");
                    }
                  }}
                  onPointerLeave={() => {
                    if (holdTimerRef.current) {
                      clearTimeout(holdTimerRef.current);
                      holdTimerRef.current = null;
                    }
                    if (!heldEnoughRef.current) {
                      setResult("Released too early — hold for 1.5s");
                    }
                  }}
                >
                  Click and Hold!
                </button>
              )}
            </ScenarioCard>

            {/* S07 — Double Click */}
            <ScenarioCard
              {...buttonScenarios[6]}
              onComplete={() => markDone("s07")}
            >
              {({ setResult }) => (
                <button
                  id="doubleClickBtn"
                  data-testid="btn-double-click"
                  className={styles.practiceBtn + " " + styles.btnOutline}
                  onDoubleClick={() => setResult("Double clicked!")}
                >
                  Double Click Me
                </button>
              )}
            </ScenarioCard>

            {/* S08 — Right Click */}
            <ScenarioCard
              {...buttonScenarios[7]}
              onComplete={() => markDone("s08")}
            >
              {({ setResult }) => (
                <button
                  id="rightClickBtn"
                  data-testid="btn-right-click"
                  className={styles.practiceBtn + " " + styles.btnRose}
                  onContextMenu={(e) => {
                    e.preventDefault();
                    setResult("Context menu triggered! ✓");
                  }}
                >
                  Right Click Me
                </button>
              )}
            </ScenarioCard>
          </div>
        </section>

        {/* ── Right: sticky sidebar ────────────────────────────────────── */}
        <aside
          className="sticky top-[120px] flex flex-col gap-4 self-start"
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
