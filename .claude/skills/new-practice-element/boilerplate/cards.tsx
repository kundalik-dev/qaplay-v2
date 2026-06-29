"use client";

import { useState } from "react";
import {
  OutputBox,
  PracticeBlock,
  PracticeButton,
} from "../../../_components/practice-block";
import { ELEMENT_CARDS_DATA, CardData } from "../data/element-cards-data";
// Uncomment if you have element-specific CSS:
// import styles from "../element-playground.module.css";

/**
 * [ELEMENT] Card Components
 * --------------------------
 * Each exported function is one scenario card.
 * ELEMENT_CARDS at the bottom exports them in the SAME ORDER as ELEMENT_CARDS_DATA.
 *
 * Naming conventions:
 *  - id on buttons: camelCase  (e.g.  id="submitBtn")
 *  - data-testid:   kebab-case (e.g.  data-testid="submit-btn")
 *
 * PracticeBlock building blocks (all from ../../../_components/practice-block):
 *  - <PracticeBlock>  — scenario container (title, badges, what-to-test, hint)
 *  - <PracticeButton> — themed button; variant: "primary" | "secondary" | "danger"
 *  - <OutputBox>      — DOM-visible result area; tone: "default" | "success" | "danger"
 *
 * Global CSS helpers (no import needed — from globals.css):
 *  .btn-row       flex row for button groups
 *  .form-field    stacked label + input
 *  .form-label    styled label
 *  .form-input    styled input
 *  .table-wrap    scrollable table container
 *  .table         styled <table>
 *  .toast-stack   toast container
 *  .toast / .toast-success / .toast-error
 */

// ── Shared data lookup ────────────────────────────────────────────────────────

const data = (id: string) => ELEMENT_CARDS_DATA.find((c: CardData) => c.id === id)!;

// ── Shared BaseCard wrapper ───────────────────────────────────────────────────

function BaseCard({
  id,
  index,
  testId,
  children,
}: {
  id: string;
  index: number;
  testId: string;
  children?: React.ReactNode;
}) {
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

// ── Card 1: Scenario One ──────────────────────────────────────────────────────

export function ScenarioOneCard({ index }: { index: number }) {
  const [result, setResult] = useState("Result will appear here…");

  return (
    <BaseCard id="scenario-1" index={index} testId="block-scenario-1">
      <div className="btn-row">
        <PracticeButton
          id="actionBtn1"
          data-testid="action-btn-1"
          onClick={() => setResult("Action performed!")}
        >
          Trigger Action
        </PracticeButton>
        <PracticeButton
          id="resetBtn1"
          variant="secondary"
          data-testid="reset-btn-1"
          onClick={() => setResult("Result will appear here…")}
        >
          Reset
        </PracticeButton>
      </div>
      <OutputBox id="result-1" testId="result-1">
        {result}
      </OutputBox>
    </BaseCard>
  );
}

// ── Card 2: Scenario Two ──────────────────────────────────────────────────────

export function ScenarioTwoCard({ index }: { index: number }) {
  const [result, setResult] = useState("Result will appear here…");

  return (
    <BaseCard id="scenario-2" index={index} testId="block-scenario-2">
      <div className="btn-row">
        <PracticeButton
          id="actionBtn2"
          data-testid="action-btn-2"
          onClick={() => setResult("Scenario two triggered!")}
        >
          Do Something
        </PracticeButton>
      </div>
      <OutputBox id="result-2" testId="result-2">
        {result}
      </OutputBox>
    </BaseCard>
  );
}

// ── Card 3: Scenario Three ────────────────────────────────────────────────────

export function ScenarioThreeCard({ index }: { index: number }) {
  return (
    <BaseCard id="scenario-3" index={index} testId="block-scenario-3">
      {/* Your interactive element here */}
      <div className="btn-row">
        <PracticeButton id="actionBtn3" data-testid="action-btn-3">
          Advanced Action
        </PracticeButton>
      </div>
    </BaseCard>
  );
}

// ── CARDS array ───────────────────────────────────────────────────────────────
// IMPORTANT: Keep in the SAME ORDER as ELEMENT_CARDS_DATA in cards-data.tsx

export const ELEMENT_CARDS = [
  ScenarioOneCard,    // index 0 → ELEMENT_CARDS_DATA[0]  (id: "scenario-1")
  ScenarioTwoCard,    // index 1 → ELEMENT_CARDS_DATA[1]  (id: "scenario-2")
  ScenarioThreeCard,  // index 2 → ELEMENT_CARDS_DATA[2]  (id: "scenario-3")
];
