---
name: new-practice-element
description: >
  Use this skill EVERY TIME you create a new element page under app/new-practice/.
  Trigger on any request like "create a new practice element", "add a new-practice page",
  "scaffold a /new-practice/[element] route", "build a playground for X", or any time
  a new directory under app/new-practice/ is being created (except the index page itself).
  This skill covers the exact file structure, boilerplate templates, data files, CSS
  conventions, card patterns, and registration steps for the new-practice framework.
  Do NOT create a new-practice element route without reading this skill first.
---

# New Practice Element — QA Playground V2

> **Reference implementation**: `app/new-practice/alert-practice/`
> Read this before writing any code. The new-practice framework is DIFFERENT from
> the old `app/practice/` framework — do not mix patterns.

---

## 1. Complete File Checklist

A new element named `[element]` (e.g. `keyboard-actions`) creates **6 files**:

```
app/new-practice/[element]/
├── page.tsx
└── _components/
    ├── [element]-playground.tsx
    ├── [element]-playground.module.css
    ├── cards/
    │   └── [element]-cards.tsx
    └── data/
        └── [element]-cards-data.tsx

data/new-practice/elements/
└── [element].ts
```

Plus **1 registration step**: add the card to `data/new-practice/new-practice-cards-data.ts`.

Boilerplate templates are in `.claude/skills/new-practice-element/boilerplate/`.

---

## 2. `page.tsx` — Async Server Component

**Template**: `boilerplate/page.tsx`

```tsx
import type { Metadata } from "next";

import { [element]Content } from "@/data/new-practice/elements/[element]";
import type { HighlightedLearnCodeSnippet } from "@/data/practice-data/types";
import { highlightLearnSnippet } from "@/lib/highlight";
import {
  ElementWorkspace,
  LearnView,
  PracticeView,
  TestCasesView,
} from "../_components";
import { [Element]Playground } from "./_components/[element]-playground";

const { meta, testCases, learn } = [element]Content;

export const metadata: Metadata = {
  title: `${meta.title} | QA Playground`,
  description: meta.description,
};

export default async function [Element]Page() {
  // Pre-highlight every learn snippet on the server, keyed by section id.
  const highlightedEntries = await Promise.all(
    learn
      .filter((section) => section.snippets)
      .map(
        async (section) =>
          [
            section.id,
            await highlightLearnSnippet(section.snippets!),
          ] as const,
      ),
  );
  const highlighted: Record<string, HighlightedLearnCodeSnippet> =
    Object.fromEntries(highlightedEntries);

  return (
    <ElementWorkspace
      meta={meta}
      testCaseCount={testCases.length}
      practiceContent={
        <PracticeView testId="[element]-practice-view">
          <[Element]Playground />
        </PracticeView>
      }
      testCasesContent={<TestCasesView testCases={testCases} />}
      learnContent={
        <LearnView
          sections={learn}
          highlighted={highlighted}
          sectionClassName="border-0 bg-transparent rounded-none shadow-none"
        />
      }
    />
  );
}
```

**Rules**:
- No `"use client"` — this is an async Server Component.
- All `await` work (snippet highlighting) happens here; child components stay sync.
- `testId` on `<PracticeView>` should be `"[element]-practice-view"`.

---

## 3. `_components/[element]-playground.tsx` — Client Playground

**Template**: `boilerplate/playground.tsx`

This is the paginated card browser — a `'use client'` component that cycles
through `CARDS_DATA` and renders the active `CARDS[i]` component.

```tsx
"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import styles from "../../_components/css-modules/playground.module.css";
import { [ELEMENT]_CARDS_DATA } from "./data/[element]-cards-data";
import { [ELEMENT]_CARDS } from "./cards/[element]-cards";

export function [Element]Playground() {
  const [currentCard, setCurrentCard] = useState(0);
  const total = [ELEMENT]_CARDS_DATA.length;
  const meta = [ELEMENT]_CARDS_DATA[currentCard];

  const goTo = (idx: number) => {
    if (idx >= 0 && idx < total) setCurrentCard(idx);
  };

  const ActiveCard = [ELEMENT]_CARDS[currentCard];

  return (
    <div className={styles.playground} data-testid="[element]-practice-playground">

      {/* Active card */}
      <div data-testid={`practice-card-${currentCard + 1}`}>
        <ActiveCard index={currentCard + 1} />
      </div>

      {/* Pagination */}
      <div className={styles.paginationHeader}>
        <div className={styles.paginationMeta}>
          <span className={styles.groupLabel}>{meta.group}</span>
          <span className={styles.cardCounter}>{currentCard + 1} / {total}</span>
        </div>

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

          <div className={styles.badges} aria-label="Scenario navigation">
            {[ELEMENT]_CARDS.map((_, i) => (
              <button
                key={i}
                className={`${styles.badge} ${i === currentCard ? styles.badgeActive : ""}`}
                onClick={() => goTo(i)}
                aria-label={`Go to scenario ${i + 1}`}
                aria-current={i === currentCard ? "step" : undefined}
              >
                {i + 1}
              </button>
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
    </div>
  );
}
```

**Key points**:
- Import `playground.module.css` from `../../_components/css-modules/` (shared, do NOT copy it).
- `data-testid` on the root div: `"[element]-practice-playground"`.

---

## 4. `_components/[element]-playground.module.css` — Element-Specific CSS

**Template**: `boilerplate/playground.module.css`

Create for styles unique to this element's cards (modals, hover zones, tables, etc.).

```css
/* =============================================================================
   [ELEMENT] PRACTICE — scenario-specific UI styles
   Use design tokens (var(--*)) everywhere. No hardcoded colours.
   ========================================================================== */

/* Example — custom modal overlay */
.modalOverlay {
  display: none;
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modalOverlayOpen { display: flex; }

.modal {
  width: 90%;
  max-width: 440px;
  padding: 24px;
  border: 1px solid var(--border);
  border-radius: 10px;
  background: var(--card);
  color: var(--foreground);
  box-shadow: var(--shadow-float);
}
```

**Rules**: Use `var(--border)`, `var(--card)`, `var(--foreground)`, `var(--muted)`, `var(--primary)`, `var(--muted-foreground)`. No inline CSS. No hardcoded colours.

Import inside your card component: `import styles from "../[element]-playground.module.css";`

---

## 5. `_components/data/[element]-cards-data.tsx` — Card Metadata

**Template**: `boilerplate/cards-data.tsx`

```tsx
import React from "react";

export type CardData = {
  id: string;
  group: string;
  title: React.ReactNode;
  badges: Array<{ label: string; tone: "green" | "blue" | "orange" | "red" }>;
  whatToTest?: React.ReactNode;
  hint?: React.ReactNode;
};

export const [ELEMENT]_CARDS_DATA: CardData[] = [
  {
    id: "scenario-1",
    group: "Basic Scenarios",
    title: "Scenario One Title",
    badges: [{ label: "Beginner", tone: "green" }],
    whatToTest: (
      <>
        Describe what to test. Use <code>data-testid="my-element"</code> to locate.
      </>
    ),
    hint: (
      <p>
        Helpful hint. E.g. <code>await page.getByTestId('my-element').click()</code>.
      </p>
    ),
  },
  // Add more entries — must match [ELEMENT]_CARDS order
];
```

**Badge tones**: `"green"` = Beginner, `"blue"` = Intermediate, `"orange"` = Advanced/Hard, `"red"` = Expert.

**Groups**: Group cards logically (e.g. `"Basic Scenarios"`, `"Hard Scenarios"`). The group label shows in the pagination header.

---

## 6. `_components/cards/[element]-cards.tsx` — Card Components

**Template**: `boilerplate/cards.tsx`

```tsx
"use client";

import { useState } from "react";
import {
  OutputBox,
  PracticeBlock,
  PracticeButton,
} from "../../../_components/practice-block";
import { [ELEMENT]_CARDS_DATA, CardData } from "../data/[element]-cards-data";
// import styles from "../[element]-playground.module.css"; // only if element-specific styles needed

const data = (id: string) => [ELEMENT]_CARDS_DATA.find((c: CardData) => c.id === id)!;

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

export function ScenarioTwoCard({ index }: { index: number }) {
  return (
    <BaseCard id="scenario-2" index={index} testId="block-scenario-2">
      <div className="btn-row">
        <PracticeButton id="actionBtn2" data-testid="action-btn-2">
          Do Something
        </PracticeButton>
      </div>
    </BaseCard>
  );
}

/* CARDS array — must stay in same order as [ELEMENT]_CARDS_DATA */
export const [ELEMENT]_CARDS = [
  ScenarioOneCard,
  ScenarioTwoCard,
];
```

### PracticeBlock building blocks

| Component | Purpose |
|-----------|---------|
| `PracticeBlock` | Scenario container (title, badges, what-to-test, hint toggle) |
| `PracticeButton` | Themed button; `variant`: `"primary"` \| `"secondary"` \| `"danger"` |
| `OutputBox` | DOM-visible result area; `tone`: `"default"` \| `"success"` \| `"danger"` |

All imported from `"../../../_components/practice-block"`.

### Automation-friendly markup rules

- `id` — stable, camelCase (e.g. `id="submitBtn"`)
- `data-testid` — kebab-case (e.g. `data-testid="submit-btn"`)
- Add `data-*` extras where useful (`data-state`, `data-step`, `data-value`, etc.)
- `aria-label` on controls that intentionally lack `data-testid` (creates a locator challenge)

### Global CSS helpers (no import needed — from globals.css)

| Class | Purpose |
|-------|---------|
| `.btn-row` | Flex row for button groups |
| `.form-field` | Stacked label + input |
| `.form-label` | Styled label |
| `.form-input` | Styled input |
| `.table-wrap` / `.table` | Scrollable table |
| `.toast` / `.toast-success` / `.toast-error` | Toast notification |
| `.toast-stack` | Toast container |

---

## 7. `data/new-practice/elements/[element].ts` — Content File

**Template**: `boilerplate/content.ts`

```ts
import type { ElementContent } from "../types";

export const [element]Content: ElementContent = {
  meta: {
    slug: "[element]",
    title: "[Element] Title",
    description: "Short description used in the page header.",
    level: "Beginner",   // "Beginner" | "Intermediate" | "Advanced"
    tags: ["Tag1", "Tag2"],
    upNext: {
      title: "Next Element",
      description: "One-line description.",
      href: "/new-practice/next-element",
      iconSrc: "/mainicons/next-icon.svg",
      iconAlt: "Next element icon",
    },
  },

  testCases: [
    {
      id: "ELM_001",        // prefix = element abbreviation
      scenario: "Scenario description",
      expected: "Expected outcome",
      type: "positive",     // "positive" | "negative" | "edge"
      priority: "high",     // "high" | "medium" | "low"
      steps: [
        "Navigate to <code>/new-practice/[element]</code>",
        'Locate <code>[data-testid="my-element"]</code>',
        "Perform the action",
        "Assert the result",
      ],
    },
  ],

  learn: [
    {
      id: "learn-overview",
      heading: "Overview",
      desc: "Describe the element type and why it matters for automation.",
    },
    {
      id: "learn-basic",
      heading: "1 · Basic Usage",
      desc: "Describe the basic interaction pattern.",
      snippets: {
        pw: {
          lang: "TypeScript",
          code: `// Playwright\nawait page.getByTestId('my-element').click();\nawait expect(page.getByTestId('result')).toContainText('Done');`,
        },
        sel: {
          lang: "Java",
          code: `// Selenium\ndriver.findElement(By.cssSelector("[data-testid='my-element']")).click();`,
        },
        cy: {
          lang: "JavaScript",
          code: `// Cypress\ncy.get('[data-testid="my-element"]').click();`,
        },
      },
    },
    {
      id: "learn-pitfalls",
      heading: "Common Pitfalls",
      desc: "Things that commonly trip up automation engineers.",
      bullets: [
        "Pitfall one — description.",
        "Pitfall two with <code>code</code>.",
      ],
    },
  ],
};
```

**Learn section fields**:
- `desc` — plain text shown under heading
- `body` — extra HTML paragraph (use sparingly)
- `bullets` — `string[]`, each item can contain HTML
- `snippets` — `{ pw, sel, cy }` — tabbed code block with Copy button + syntax highlight

---

## 8. Register the Card

Add to `data/new-practice/new-practice-cards-data.ts` inside `newPracticeCards`:

```ts
{
  href: "/new-practice/[element]",
  iconSrc: "/mainicons/[icon-name].svg",
  iconAlt: "[Element] icon",
  title: "[Element Title]",
  description: "One-sentence description shown on the playground grid.",
  level: "Beginner",    // "Beginner" | "Intermediate" | "Advanced"
  tag: "TAG",           // BROWSER | KEYBOARD | NETWORK | DATE | FORM | etc.
  testId: "[element]",
},
```

---

## 9. Architecture Rules

### Server / Client boundary
- `page.tsx` — async Server Component; all `await` work here; passes pre-computed data as props.
- `[element]-playground.tsx` — `'use client'`; never import into another server component.
- `[element]-cards.tsx` — `'use client'` (uses `useState`).
- `data/new-practice/elements/[element].ts` — pure data; no `'use client'`.

### Shared vs. route-local
- `playground.module.css` in `app/new-practice/_components/css-modules/` — **shared, never copy, import via `../../_components/css-modules/playground.module.css`**.
- `[element]-playground.module.css` — **route-local, always create**, even if initially empty.
- `PracticeBlock`, `PracticeButton`, `OutputBox` from `app/new-practice/_components/practice-block/` — shared.
- `ElementWorkspace`, `LearnView`, `PracticeView`, `TestCasesView` from `app/new-practice/_components/` — shared.

### CARDS array sync rule
`[ELEMENT]_CARDS[i]` renders with metadata from `[ELEMENT]_CARDS_DATA[i]`. They **must** stay the same length and in the same order.

---

## 10. Pre-Commit Checklist

- [ ] `page.tsx` — no `"use client"`, exports `metadata`, uses `ElementWorkspace`
- [ ] `[element]-playground.tsx` — `"use client"`, imports shared `playground.module.css`
- [ ] `[element]-playground.module.css` — route-local, uses `var(--*)` tokens, no inline styles
- [ ] `[element]-cards.tsx` — `"use client"`, exports `[ELEMENT]_CARDS` array
- [ ] `[element]-cards-data.tsx` — exports `[ELEMENT]_CARDS_DATA` + `CardData` type
- [ ] `data/new-practice/elements/[element].ts` — exports `[element]Content: ElementContent`
- [ ] `[ELEMENT]_CARDS` and `[ELEMENT]_CARDS_DATA` are same length and same order
- [ ] Card registered in `data/new-practice/new-practice-cards-data.ts`
- [ ] All interactive elements have `id` (camelCase) and `data-testid` (kebab-case)
- [ ] No inline styles, no hardcoded colours
- [ ] `upNext` in `meta` points to a real or planned route
