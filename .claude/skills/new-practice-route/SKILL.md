---
name: new-practice-route
description: >
  Use this skill EVERY TIME you create a new practice element route in QA Playground V2.
  Trigger on any request like "create a new practice route", "add a practice element",
  "scaffold a new /practice/[element] page", "build a practice page for X", or any time
  a new directory under app/practice/ is being created. This skill covers the exact file
  structure, boilerplate templates, data files, meta-data files, CSS conventions,
  sub-component patterns, and registration steps. Do NOT create a new practice route
  without reading this skill first — the pattern has specific conventions that differ
  from general routes.
---

# New Practice Route — QA Playground V2

Reference implementations to read before writing any code:

- `app/practice/alerts-dialogs` — complex interactive UI (dialogs, portals)
- `app/practice/radio-checkbox-new` — sub-components inside practice-tab

---

## 1. Complete File Checklist

A new practice element named `[element]` (e.g. `tooltips`) creates **14 files**:

```
app/practice/[element]/
├── page.tsx
└── _components/
    ├── practice-page.tsx
    ├── practice-tab.tsx
    ├── learn-tab.tsx
    ├── test-cases-tab.tsx
    └── [element].module.css

data/practice-data/[element]/
├── meta.ts
├── scenarios.ts
├── learn.ts
├── test-cases.ts
└── index.ts

data/meta-data/practice/
├── [element]-page-meta-data.ts
└── [element]-structured-jsonld-data.ts
```

Plus **1 registration step**: add the card to `data/practice-data/practice-elements-data.ts`.

---

## 2. `page.tsx` — Async Server Component

New style uses `createPageMetadata` and `JsonLd` structured data — do NOT inline metadata.

```tsx
import { JsonLd } from "@/components/seo";
import { PracticePage } from "./_components/practice-page";
import { LearnTab } from "./_components/learn-tab";
import { [element]Meta } from "@/data/practice-data/[element]/meta";
import { [element]TestCases } from "@/data/practice-data/[element]/test-cases";
import { [element]LearnCode } from "@/data/practice-data/[element]/learn";
import { [element]PageMetadata } from "@/data/meta-data/practice/[element]-page-meta-data";
import {
  [element]PageWebPageJsonLd,
  [element]PageBreadcrumbJsonLd,
  [element]PageFaqJsonLd,
} from "@/data/meta-data/practice/[element]-structured-jsonld-data";
import { highlightLearnSnippet } from "@/lib/highlight";

export const metadata = [element]PageMetadata;

export default async function [Element]Page() {
  const [snippet1, snippet2] = await Promise.all([
    highlightLearnSnippet([element]LearnCode.snippet1),
    highlightLearnSnippet([element]LearnCode.snippet2),
  ]);

  return (
    <>
      <JsonLd data={[element]PageWebPageJsonLd} />
      <JsonLd data={[element]PageBreadcrumbJsonLd} />
      <JsonLd data={[element]PageFaqJsonLd} />
      <PracticePage
        meta={[element]Meta}
        testCases={[element]TestCases}
        learnContent={<LearnTab snippets={{ snippet1, snippet2 }} />}
      />
    </>
  );
}
```

> Snippet keys must match exactly what `LearnTab` expects in its props interface.

---

## 3. `_components/practice-page.tsx` — Client Orchestrator

Identical across all routes. Copy verbatim:

```tsx
"use client";

import { PageHeader, MainTabs } from "@/components/practice";
import { PracticeTab } from "./practice-tab";
import { TestCasesTab } from "./test-cases-tab";
import type { PracticePageMeta, TestCase } from "@/data/practice-data/types";
import type { ReactNode } from "react";

interface PracticePageProps {
  meta: PracticePageMeta;
  testCases: TestCase[];
  learnContent: ReactNode;
}

export function PracticePage({
  meta,
  testCases,
  learnContent,
}: PracticePageProps) {
  return (
    <div
      data-testid={`${meta.element}-page`}
      data-section="practice"
      data-element={meta.element}
    >
      <PageHeader
        title={meta.title}
        description={meta.description}
        level={meta.level}
        durationMin={meta.durationMin}
        scenarioCount={meta.scenarioCount}
        testCaseCount={meta.testCaseCount}
        breadcrumb={meta.breadcrumb}
      />
      <MainTabs
        scenarioCount={meta.scenarioCount}
        testCaseCount={meta.testCaseCount}
        practiceContent={<PracticeTab upNext={meta.upNext} />}
        testCasesContent={<TestCasesTab testCases={testCases} />}
        learnContent={learnContent}
      />
    </div>
  );
}
```

---

## 4. `_components/practice-tab.tsx` — Client

This is where all interactive scenarios live. Template:

```tsx
"use client";

import { useState } from "react";
import {
  ScenarioCard,
  ProgressWidget,
  FrameworkMethodsPanel,
  UpNextCard,
} from "@/components/practice";
import type { ProgressItem } from "@/components/practice";
import {
  [element]Scenarios,
  frameworkMethods,
} from "@/data/practice-data/[element]/scenarios";
import type { PracticePageMeta } from "@/data/practice-data/types";
import styles from "./[element].module.css";

interface PracticeTabProps {
  upNext: PracticePageMeta["upNext"];
}

// ── Sub-components go HERE in this file (see sub-component rule below) ──────

export function PracticeTab({ upNext }: PracticeTabProps) {
  const [completedIds, setCompletedIds] = useState<Set<string>>(new Set());

  function markDone(id: string) {
    setCompletedIds((prev) => new Set([...prev, id]));
  }

  const progressItems: ProgressItem[] = [element]Scenarios.map((s) => ({
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

          <div className="flex flex-col gap-[10px]" data-testid="scenarios-list">
            {/* S01 */}
            <ScenarioCard
              {...[element]Scenarios[0]}
              onComplete={() => markDone("s01")}
            >
              {({ setResult }) => (
                <button
                  type="button"
                  id="[element]Action1"
                  data-testid="[element]-action-1"
                  className={styles.triggerBtn}
                  onClick={() => setResult("Result text")}
                >
                  Action Label
                </button>
              )}
            </ScenarioCard>
            {/* ... repeat for each scenario */}
          </div>
        </section>

        <aside className={styles.practiceSidebar} data-testid="practice-sidebar">
          <ProgressWidget items={progressItems} />
          <FrameworkMethodsPanel methods={frameworkMethods} />
          <UpNextCard {...upNext} />
        </aside>
      </div>

      {/* Portals / overlays (dialogs, drawers) rendered here, after the grid */}
    </div>
  );
}
```

### Sub-component rule

When a scenario's interactive content is complex (stateful, 20+ lines), extract it as a **named function component above `PracticeTab`** in the same file. See `radio-checkbox-new/practice-tab.tsx` — `CheckboxGroup`, `PlanCards`, `PermissionList` all live in that one file. Move to a separate file only if the component is reused across routes.

### ScenarioCard slots

- `onComplete` on `<ScenarioCard>` — auto-marks done when scenario completes (simplest)
- `complete()` from render prop — use when you need manual control (e.g. only after a timer)
- `setResult(str)` — updates visible result text without marking done

---

## 5. `_components/learn-tab.tsx` — Server Component (no `"use client"`)

```tsx
import {
  DocSection,
  LearnCodeBlock,
  MethodSummaryTable,
  FaqBlock,
  LearnToc,
} from "@/components/practice";
import {
  [element]LearnDesc,
  [element]MethodRows,
  [element]Faq,
  [element]TocItems,
} from "@/data/practice-data/[element]/learn";
import type { HighlightedLearnCodeSnippet } from "@/data/practice-data/types";

interface LearnTabProps {
  snippets: {
    snippet1: HighlightedLearnCodeSnippet;
    snippet2: HighlightedLearnCodeSnippet;
    // match exactly what page.tsx passes
  };
}

export function LearnTab({ snippets }: LearnTabProps) {
  const { snippet1, snippet2 } = snippets;

  return (
    <div className="mx-auto w-full max-w-[1280px] px-4 py-6 pb-16 sm:px-7 sm:py-8">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_200px] lg:gap-12">
        <main aria-label="Learn content" className="flex flex-col gap-5">
          <DocSection id="learn-overview" heading="Overview">
            <p className="text-[13px] leading-[1.6] text-muted-foreground">
              {[element]LearnDesc.overview}
            </p>
          </DocSection>

          <DocSection id="learn-topic-1" heading="1 · Topic One" desc={[element]LearnDesc.topic1}>
            <LearnCodeBlock snippets={snippet1} />
          </DocSection>

          <DocSection id="learn-topic-2" heading="2 · Topic Two" desc={[element]LearnDesc.topic2}>
            <LearnCodeBlock snippets={snippet2} />
          </DocSection>

          <DocSection id="learn-methods" heading="Method Summary">
            <p className="mb-4 text-[13px] leading-[1.6] text-muted-foreground">
              Quick reference across all three frameworks.
            </p>
            <MethodSummaryTable rows={[element]MethodRows} />
          </DocSection>

          <DocSection id="learn-faq" heading="FAQ">
            <FaqBlock items={[element]Faq} />
          </DocSection>
        </main>

        <LearnToc items={[element]TocItems} />
      </div>
    </div>
  );
}
```

---

## 6. `_components/test-cases-tab.tsx` — Server Component

Identical across all routes. Copy verbatim:

```tsx
import { TestCasesTable } from "@/components/practice";
import type { TestCase } from "@/data/practice-data/types";

interface TestCasesTabProps {
  testCases: TestCase[];
}

export function TestCasesTab({ testCases }: TestCasesTabProps) {
  return (
    <div className="mx-auto w-full max-w-[1280px] px-4 py-5 pb-16 sm:px-7 sm:py-6">
      <TestCasesTable testCases={testCases} />
    </div>
  );
}
```

---

## 7. `_components/[element].module.css`

Every element gets its own CSS module. Never share `practiceLayout`/`practiceSidebar` — copy the block below into every element's module:

```css
/* ── Practice Layout ────────────────────────────────────────────────────────── */

.practiceLayout {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 280px;
  gap: 24px;
  padding-block: 24px 64px;
}

.practiceSidebar {
  position: sticky;
  top: 120px;
  display: flex;
  flex-direction: column;
  align-self: start;
  gap: 16px;
}

/* ── Element-specific styles below ────────────────────────────────────────── */
/* e.g. trigger buttons, form controls, overlays, sub-component styles */

@media (max-width: 1024px) {
  .practiceLayout {
    grid-template-columns: 1fr;
  }
  .practiceSidebar {
    position: static;
  }
}

@media (max-width: 640px) {
  .practiceLayout {
    gap: 16px;
    padding-block: 20px 48px;
  }
  /* make full-width any interactive controls that need it */
}
```

### CSS placement guide

| What                                    | Where                           |
| --------------------------------------- | ------------------------------- |
| Layout grid, sidebar                    | `[element].module.css` (always) |
| Trigger buttons, inputs, overlays       | `[element].module.css`          |
| Sub-component styles (plan cards, etc.) | Same `[element].module.css`     |
| Styles shared across 2+ practice routes | `components/practice/` shared   |
| Truly global concerns                   | `globals.css`                   |

Never use inline styles. Never put element-specific CSS in `globals.css`.

---

## 8. Data Files

### `data/practice-data/[element]/meta.ts`

```ts
import type { PracticePageMeta } from "@/data/practice-data/types";

export const [element]Meta: PracticePageMeta = {
  element: "[element]",
  title: "[Element] Automation Practice",
  description: "…",
  level: "Beginner",   // "Beginner" | "Intermediate" | "Advanced"
  durationMin: 10,
  scenarioCount: 6,    // must match actual scenarios array length
  testCaseCount: 12,   // must match actual test cases array length
  breadcrumb: [
    { label: "Home", href: "/" },
    { label: "Practice", href: "/practice" },
    { label: "[Element Label]" },
  ],
  upNext: {
    icon: "🎯",
    title: "Next Element",
    description: "One-line description of the next practice page",
    href: "/practice/next-element",
  },
};
```

### `data/practice-data/[element]/scenarios.ts`

```ts
import type { ScenarioMeta, FrameworkMethods } from "@/data/practice-data/types";

export const [element]Scenarios: ScenarioMeta[] = [
  {
    id: "S01",
    title: "Scenario Title",
    testId: "scenario-descriptive-name",
    resultId: "result-s01",
    initialResult: "No action yet",
    hint: `Target <code>[data-testid="my-element"]</code> and assert …`,
    // badge: "DISABLED",  // optional, for special-state scenarios
  },
];

export const frameworkMethods: Record<"selenium" | "playwright" | "cypress", FrameworkMethods> = {
  selenium: {
    label: "Selenium (Java)",
    methods: [{ color: "purple", label: "method()" }],
  },
  playwright: {
    label: "Playwright JS / PY",
    methods: [{ color: "purple", label: "method()" }],
  },
  cypress: {
    label: "Cypress JS",
    methods: [{ color: "purple", label: ".method()" }],
  },
};
```

### `data/practice-data/[element]/learn.ts`

```ts
import type { FaqItem, LearnCodeSnippet, MethodRow, TocItem } from "@/data/practice-data/types";

export const [element]TocItems: TocItem[] = [
  { id: "learn-overview", label: "Overview" },
  { id: "learn-topic-1", label: "1 · Topic One" },
  { id: "learn-topic-2", label: "2 · Topic Two" },
  { id: "learn-methods", label: "Method Summary", dividerBefore: true },
  { id: "learn-faq", label: "FAQ" },
];

export const [element]LearnDesc: Record<string, string> = {
  overview: "Overview paragraph …",
  topic1: "Description for topic 1 …",
  topic2: "Description for topic 2 …",
};

export const [element]LearnCode: Record<string, LearnCodeSnippet> = {
  snippet1: {
    pw:  { lang: "TypeScript",  code: "// Playwright\n…" },
    sel: { lang: "Java",        code: "// Selenium WebDriver\n…" },
    cy:  { lang: "JavaScript",  code: "// Cypress\n…" },
  },
  snippet2: {
    pw:  { lang: "TypeScript",  code: "// Playwright\n…" },
    sel: { lang: "Java",        code: "// Selenium WebDriver\n…" },
    cy:  { lang: "JavaScript",  code: "// Cypress\n…" },
  },
};

export const [element]MethodRows: MethodRow[] = [
  {
    action: "Action name",
    selenium: "element.method()",
    playwrightJs: "locator.method()",
    playwrightPy: "locator.method()",
    cypress: ".method()",
  },
];

export const [element]Faq: FaqItem[] = [
  {
    question: "Question?",
    answer: "Answer text.",
    testId: "faq-1",
  },
];
```

### `data/practice-data/[element]/test-cases.ts`

```ts
import type { TestCase } from "@/data/practice-data/types";

export const [element]TestCases: TestCase[] = [
  {
    id: "ELM_001",        // prefix matches element (BTN_, FRM_, DLG_, etc.)
    scenario: "Scenario description",
    expected: "Expected outcome",
    type: "positive",     // "positive" | "negative" | "edge"
    priority: "high",     // "high" | "medium" | "low"
    steps: [
      "Navigate to <code>/practice/[element]</code>",
      'Locate <code>[data-testid="my-element"]</code>',
      "Perform the action",
      "Assert the result",
    ],
    note: "Optional caveat about this test case",  // optional
  },
];
```

### `data/practice-data/[element]/index.ts`

```ts
export {
  [element]Faq,
  [element]LearnCode,
  [element]LearnDesc,
  [element]MethodRows,
  [element]TocItems,
} from "./learn";
export { [element]Meta } from "./meta";
export { [element]Scenarios, frameworkMethods } from "./scenarios";
export { [element]TestCases } from "./test-cases";
```

---

## 9. Meta-Data Files

### `data/meta-data/practice/[element]-page-meta-data.ts`

```ts
import { createPageMetadata } from "../create-page-metadata";

export const [element]PageMetadata = createPageMetadata({
  title: "SEO Page Title for [Element]",   // ~60 chars
  description: "Specific description …",   // ~160 chars
  path: "/practice/[element]",
  ogType: "article",
  keywords: [
    "[element] selenium",
    "[element] playwright",
    "[element] automation",
    // 8–12 relevant search terms
  ],
});
```

### `data/meta-data/practice/[element]-structured-jsonld-data.ts`

```ts
import {
  createBreadcrumbJsonLd,
  createFaqPageJsonLd,
  createWebPageJsonLd,
} from "../structured-data";
import { [element]Faq } from "@/data/practice-data/[element]";

const pageName = "SEO Page Title for [Element]";
const pageDescription = "Specific description …";

export const [element]PageWebPageJsonLd = createWebPageJsonLd({
  name: pageName,
  description: pageDescription,
  path: "/practice/[element]",
  about: ["[Element] automation", "Selenium [element]", "Playwright [element]"],
  mainEntity: {
    "@type": "Thing",
    name: "[Element] interactions",
    description: pageDescription,
  },
});

export const [element]PageBreadcrumbJsonLd = createBreadcrumbJsonLd([
  { name: "Home", path: "/" },
  { name: "Practice", path: "/practice" },
  { name: "[Element Label]", path: "/practice/[element]" },
]);

export const [element]PageFaqJsonLd = createFaqPageJsonLd(
  [element]Faq.map((item) => ({
    question: item.question,
    answer: item.answer,
  })),
);
```

---

## 10. Register the Practice Card

Add to `data/practice-data/practice-elements-data.ts` inside `practiceCards`:

```ts
{
  href: "/practice/[element]",
  iconSrc: "/mainicons/[icon-name].svg",
  iconAlt: "[Element] icon",
  title: "[Element Label]",
  description: "One-sentence description shown on the practice grid card.",
  level: "Beginner",
  tag: "TAG",          // short uppercase: FORM, CLICK, DOM, SELECT, etc.
  testId: "[element]",
},
```

---

## 11. Automation-Friendly Markup Rules

Every interactive element in `practice-tab.tsx`:

- `id` — stable, camelCase (e.g. `id="tooltipTriggerBtn"`)
- `data-testid` — kebab-case (e.g. `data-testid="tooltip-trigger"`)
- `data-*` extras for locator challenges (e.g. `data-severity`, `data-plan`, `data-notif-id`)
- `aria-label` on controls that intentionally lack `data-testid` (creates a challenge)

Scenario card fields:

- `testId` in `ScenarioMeta` → `data-testid` on the card root
- `resultId` → `id` on the result `<span>` inside the card

---

## 12. Pre-Commit Checklist

- [ ] `page.tsx` — no `"use client"`, exports `metadata`, three `<JsonLd>` blocks present
- [ ] `practice-page.tsx` — `"use client"`, identical boilerplate, no logic added
- [ ] `practice-tab.tsx` — `"use client"`, all scenarios have `id` and `data-testid`
- [ ] `learn-tab.tsx` — no `"use client"`, `snippets` keys match `page.tsx`
- [ ] `test-cases-tab.tsx` — no `"use client"`, identical boilerplate
- [ ] `[element].module.css` — has `practiceLayout` + `practiceSidebar` + breakpoints
- [ ] All 5 data files in `data/practice-data/[element]/` with `index.ts` re-exports
- [ ] Both meta-data files in `data/meta-data/practice/`
- [ ] Card registered in `practice-elements-data.ts`
- [ ] `scenarioCount` and `testCaseCount` in `meta.ts` match actual array lengths
- [ ] No inline styles, no element CSS in `globals.css`
