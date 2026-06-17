"use client";

import { useState } from "react";
import {
  ScenarioCard,
  ProgressWidget,
  FrameworkMethodsPanel,
  UpNextCard,
  type ProgressItem,
} from "@/components/practice";
import { inputFieldScenarios, frameworkMethods } from "@/data/practice-data/input-fields/scenarios";
import type { PracticePageMeta } from "@/data/practice-data/types";
import styles from "./input-fields.module.css";

interface PracticeTabProps {
  upNext: PracticePageMeta["upNext"];
}

export function PracticeTab({ upNext }: PracticeTabProps) {
  const [completedIds, setCompletedIds] = useState<Set<string>>(new Set());

  function markDone(id: string) {
    setCompletedIds((prev) => new Set([...prev, id]));
  }

  const progressItems: ProgressItem[] = inputFieldScenarios.map((s) => ({
    id: s.id.toLowerCase(),
    label: s.title,
    done: completedIds.has(s.id.toLowerCase()),
  }));

  // Controlled values for the interactive inputs
  const [movieName, setMovieName] = useState("");
  const [appendValue, setAppendValue] = useState("Avengers");
  const [clearValue, setClearValue] = useState("Inception");

  const readValueText = "The Matrix";

  return (
    <div
      className="w-full max-w-[1280px] mx-auto px-7"
      data-testid="practice-tab"
      data-section="practice"
    >
      <div className="grid gap-6 pt-6 pb-16" style={{ gridTemplateColumns: "1fr 280px" }}>

        {/* ── Left: scenarios ─────────────────────────────────────────── */}
        <section aria-label="Interactive Scenarios">
          <p className="text-[10.5px] font-bold uppercase tracking-[0.08em] text-muted-foreground mb-3">
            Interactive Scenarios
          </p>

          <div className="flex flex-col gap-[10px]" data-testid="scenarios-list">

            {/* S01 — Type a Movie Name */}
            <ScenarioCard
              {...inputFieldScenarios[0]}
              onComplete={() => markDone("s01")}
            >
              {({ setResult }) => (
                <>
                  <input
                    id="movieNameInput"
                    data-testid="input-movie-name"
                    type="text"
                    className={styles.practiceInput}
                    placeholder="Enter a movie name…"
                    value={movieName}
                    onChange={(e) => setMovieName(e.target.value)}
                    aria-label="Movie name"
                  />
                  <button
                    type="button"
                    id="submitMovieBtn"
                    data-testid="btn-submit-movie"
                    className={styles.actionBtn}
                    onClick={() =>
                      setResult(
                        movieName.trim()
                          ? `You entered: ${movieName.trim()}`
                          : "Please type a movie name first",
                      )
                    }
                  >
                    Submit
                  </button>
                </>
              )}
            </ScenarioCard>

            {/* S02 — Append Text & Press Tab */}
            <ScenarioCard
              {...inputFieldScenarios[1]}
              onComplete={() => markDone("s02")}
            >
              {({ setResult }) => (
                <input
                  id="appendInput"
                  data-testid="input-append"
                  type="text"
                  className={styles.practiceInput}
                  value={appendValue}
                  onChange={(e) => setAppendValue(e.target.value)}
                  onBlur={() => setResult(`Current value: ${appendValue}`)}
                  aria-label="Append text and press Tab"
                />
              )}
            </ScenarioCard>

            {/* S03 — Read the Field Value */}
            <ScenarioCard
              {...inputFieldScenarios[2]}
              onComplete={() => markDone("s03")}
            >
              {({ setResult }) => (
                <>
                  <input
                    id="readValueInput"
                    data-testid="input-read-value"
                    type="text"
                    className={`${styles.practiceInput} ${styles.inputReadonly}`}
                    defaultValue={readValueText}
                    readOnly
                    aria-label="Field with a value to read"
                  />
                  <button
                    type="button"
                    id="readValueBtn"
                    data-testid="btn-read-value"
                    className={`${styles.actionBtn} ${styles.actionBtnOutline}`}
                    onClick={() => setResult(`Value: ${readValueText}`)}
                  >
                    Read Value
                  </button>
                </>
              )}
            </ScenarioCard>

            {/* S04 — Clear the Field */}
            <ScenarioCard
              {...inputFieldScenarios[3]}
              onComplete={() => markDone("s04")}
            >
              {({ setResult }) => (
                <>
                  <input
                    id="clearInput"
                    data-testid="input-clear"
                    type="text"
                    className={styles.practiceInput}
                    value={clearValue}
                    onChange={(e) => setClearValue(e.target.value)}
                    aria-label="Field to clear"
                  />
                  <button
                    type="button"
                    id="clearFieldBtn"
                    data-testid="btn-clear-field"
                    className={styles.actionBtn}
                    onClick={() => {
                      setClearValue("");
                      setResult("Field cleared ✓");
                    }}
                  >
                    Clear
                  </button>
                </>
              )}
            </ScenarioCard>

            {/* S05 — Disabled Input Field */}
            <ScenarioCard {...inputFieldScenarios[4]}>
              {() => (
                <input
                  id="disabledInput"
                  data-testid="input-disabled"
                  type="text"
                  className={styles.practiceInput}
                  defaultValue="You can't type here"
                  disabled
                  aria-label="Disabled input"
                />
              )}
            </ScenarioCard>

            {/* S06 — Readonly Input Field */}
            <ScenarioCard {...inputFieldScenarios[5]}>
              {() => (
                <input
                  id="readonlyInput"
                  data-testid="input-readonly"
                  type="text"
                  className={`${styles.practiceInput} ${styles.inputReadonly}`}
                  defaultValue="Read-only content"
                  readOnly
                  aria-label="Readonly input"
                />
              )}
            </ScenarioCard>

          </div>
        </section>

        {/* ── Right: sticky sidebar ────────────────────────────────────── */}
        <aside className="flex flex-col gap-4 sticky top-[120px] self-start" data-testid="practice-sidebar">
          <ProgressWidget items={progressItems} />
          <FrameworkMethodsPanel methods={frameworkMethods} />
          <UpNextCard {...upNext} />
        </aside>

      </div>
    </div>
  );
}
