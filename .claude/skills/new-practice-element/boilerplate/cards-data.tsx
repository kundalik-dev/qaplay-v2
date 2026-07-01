import React from "react";

/**
 * [ELEMENT] Cards Data
 * --------------------
 * Drives:
 *  - The group label and card counter in the pagination header
 *  - The title, badges, whatToTest, and hint passed to PracticeBlock
 *
 * IMPORTANT: Keep this array in the SAME ORDER as ELEMENT_CARDS in cards/element-cards.tsx.
 * Index i in CARDS_DATA must match index i in CARDS.
 */

export type CardData = {
  id: string;
  group: string;
  title: React.ReactNode;
  badges: Array<{ label: string; tone: "green" | "blue" | "orange" | "red" }>;
  whatToTest?: React.ReactNode;
  hint?: React.ReactNode;
};

export const ELEMENT_CARDS_DATA: CardData[] = [
  // ── Basic Scenarios ──────────────────────────────────────────────────────

  {
    id: "scenario-1",
    group: "Basic Scenarios",
    title: "Scenario One",
    badges: [{ label: "Beginner", tone: "green" }],
    whatToTest: (
      <>
        Describe what the automation engineer should test. Use{" "}
        <code>data-testid=&quot;action-btn-1&quot;</code> to locate and click
        the button, then assert the result in <code>#result-1</code>.
      </>
    ),
    hint: (
      <p>
        Playwright:{" "}
        <code>await page.getByTestId(&apos;action-btn-1&apos;).click()</code>.
        Then assert:{" "}
        <code>
          await
          expect(page.getByTestId(&apos;result-1&apos;)).toContainText(&apos;Done&apos;)
        </code>
        .
      </p>
    ),
  },

  {
    id: "scenario-2",
    group: "Basic Scenarios",
    title: "Scenario Two",
    badges: [{ label: "Intermediate", tone: "blue" }],
    whatToTest: <>What to test for scenario two.</>,
    hint: <p>Hint for scenario two.</p>,
  },

  // ── Hard Scenarios ────────────────────────────────────────────────────────

  {
    id: "scenario-3",
    group: "Hard Scenarios",
    title: "Scenario Three",
    badges: [{ label: "Advanced", tone: "orange" }],
    whatToTest: <>What to test for scenario three.</>,
    hint: <p>Hint for scenario three.</p>,
  },
];

/*
  Badge tone guide:
    "green"  → Beginner
    "blue"   → Intermediate
    "orange" → Advanced / Hard
    "red"    → Expert
*/
