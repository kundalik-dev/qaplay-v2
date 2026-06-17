"use client";

import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { ScenarioCard } from "@/components/practice";

/**
 * Interactive scenario cards for the Buttons practice page.
 *
 * Each card exposes a stable button (`data-testid="btn-*"` + matching `id`)
 * and writes feedback into its result span (`data-testid="result-s0x"`).
 * Result updates are written to the DOM by id so the markup stays a realistic,
 * framework-agnostic automation target.
 */

function setResult(resultId: string, text: string) {
  const el = document.getElementById(resultId);
  if (el) el.textContent = text;
}

export function ButtonScenarios() {
  // Tracks the click-and-hold timer (S06).
  const holdTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const heldLongEnough = useRef(false);

  function startHold() {
    heldLongEnough.current = false;
    setResult("result-s06", "Holding… keep pressing");
    holdTimer.current = setTimeout(() => {
      heldLongEnough.current = true;
      setResult("result-s06", "Held for 1.5s ✓");
    }, 1500);
  }

  function endHold() {
    if (holdTimer.current) {
      clearTimeout(holdTimer.current);
      holdTimer.current = null;
    }
    if (!heldLongEnough.current) {
      setResult("result-s06", "Released too early — hold for 1.5s");
    }
  }

  return (
    <>
      {/* S01 — Navigate / single click */}
      <ScenarioCard
        id="S01"
        title="Navigate to Home Page"
        testId="scenario-card-navigate-home"
        resultId="result-s01"
        initialResult="No navigation yet"
      >
        <Button
          id="navigateHomeBtn"
          data-testid="btn-navigate-home"
          variant="default"
          onClick={() => setResult("result-s01", "Navigated to Home Page ✓")}
        >
          Go To Home
        </Button>
      </ScenarioCard>

      {/* S02 — Get coordinates */}
      <ScenarioCard
        id="S02"
        title="Get Button X & Y Coordinates"
        testId="scenario-card-get-coordinates"
        resultId="result-s02"
        initialResult="Coordinates: —"
      >
        <Button
          id="coordinatesBtn"
          data-testid="btn-get-coordinates"
          variant="outline"
          onClick={(e) => {
            const r = e.currentTarget.getBoundingClientRect();
            setResult(
              "result-s02",
              `X: ${Math.round(r.x)}px, Y: ${Math.round(r.y)}px`,
            );
          }}
        >
          Find Location
        </Button>
      </ScenarioCard>

      {/* S03 — Get computed color */}
      <ScenarioCard
        id="S03"
        title="Get Button Color"
        testId="scenario-card-get-color"
        resultId="result-s03"
        initialResult="Color: —"
      >
        <Button
          id="colorBtn"
          data-testid="btn-get-color"
          variant="secondary"
          onClick={(e) => {
            const bg = getComputedStyle(e.currentTarget).backgroundColor;
            setResult("result-s03", `Background: ${bg}`);
          }}
        >
          Find my color?
        </Button>
      </ScenarioCard>

      {/* S04 — Get size */}
      <ScenarioCard
        id="S04"
        title="Get Button Height & Width"
        testId="scenario-card-get-size"
        resultId="result-s04"
        initialResult="Size: —"
      >
        <Button
          id="sizeBtn"
          data-testid="btn-get-size"
          variant="outline"
          onClick={(e) => {
            const { offsetWidth: w, offsetHeight: h } = e.currentTarget;
            setResult("result-s04", `W: ${w}px, H: ${h}px`);
          }}
        >
          Do you know my size?
        </Button>
      </ScenarioCard>

      {/* S05 — Disabled */}
      <ScenarioCard
        id="S05"
        title="Disabled Button"
        testId="scenario-card-disabled"
        resultId="result-s05"
        initialResult="Button is disabled — no action fires"
        badge="DISABLED"
      >
        <Button
          id="disabledBtn"
          data-testid="btn-disabled"
          variant="outline"
          disabled
        >
          Disabled
        </Button>
      </ScenarioCard>

      {/* S06 — Click and hold */}
      <ScenarioCard
        id="S06"
        title="Click and Hold for 1.5 sec"
        testId="scenario-card-click-hold"
        resultId="result-s06"
        initialResult="Not held yet"
      >
        <Button
          id="clickHoldBtn"
          data-testid="btn-click-hold"
          variant="secondary"
          onPointerDown={startHold}
          onPointerUp={endHold}
          onPointerLeave={endHold}
        >
          Click and Hold!
        </Button>
      </ScenarioCard>

      {/* S07 — Double click */}
      <ScenarioCard
        id="S07"
        title="Double Click Button"
        testId="scenario-card-double-click"
        resultId="result-s07"
        initialResult="Not double-clicked yet"
      >
        <Button
          id="doubleClickBtn"
          data-testid="btn-double-click"
          variant="outline"
          onDoubleClick={() => setResult("result-s07", "Double clicked!")}
        >
          Double Click Me
        </Button>
      </ScenarioCard>

      {/* S08 — Right click */}
      <ScenarioCard
        id="S08"
        title="Right Click Button"
        testId="scenario-card-right-click"
        resultId="result-s08"
        initialResult="No action performed yet."
      >
        <Button
          id="rightClickBtn"
          data-testid="btn-right-click"
          variant="outline"
          onContextMenu={(e) => {
            e.preventDefault();
            setResult("result-s08", "Context menu triggered!");
          }}
        >
          Right Click Me
        </Button>
      </ScenarioCard>
    </>
  );
}
