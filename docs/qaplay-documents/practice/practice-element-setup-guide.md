# Practice Element Page — Setup Guide

Use this document every time you add a new practice element (e.g. `checkboxes`, `modals`, `tooltips`).
It captures the exact folder structure, file responsibilities, naming conventions, and the component
wiring pattern already used by `buttons`, `dropdowns`, `forms`, `input-fields`, `data-table`, and
`alerts-dialogs`.

---

## 1. Overview of the Architecture

Each practice element page is built from three layers:

```
data/practice-data/<element>/      ← all content & config, no JSX
app/practice/<element>/            ← Next.js route
app/practice/<element>/_components/← route-local UI components
components/practice/               ← shared, reusable practice UI kit
```

The `page.tsx` is the only `async` Server Component in the route. It does all `await` work
(syntax highlighting) and passes pre-computed data as props to child components, which remain
synchronous. This is required — you cannot import an `async` Server Component into a
`'use client'` component.

---

## 2. Data Layer — `data/practice-data/<element>/`

Create one folder per element. Every folder contains exactly five files plus a barrel export.

### File map

```
data/practice-data/<element>/
  index.ts        ← barrel — re-exports everything from the four files below
  meta.ts         ← PracticePageMeta (title, description, level, counts, breadcrumb, upNext)
  scenarios.ts    ← ScenarioMeta[] + FrameworkMethods (interactive scenario cards)
  test-cases.ts   ← TestCase[] (test cases table)
  learn.ts        ← TocItem[], LearnCodeSnippet per topic, MethodRow[], FaqItem[]
```

### `meta.ts`

```ts
import type { PracticePageMeta } from "@/data/practice-data/types";

export const checkboxesMeta: PracticePageMeta = {
  element: "checkboxes",           // matches the route slug exactly
  title: "Checkbox Automation Practice",
  description: "Practice checking, unchecking, and asserting checkbox state in Playwright, Selenium & Cypress.",
  level: "Beginner",               // "Beginner" | "Intermediate" | "Advanced"
  durationMin: 10,
  scenarioCount: 6,                // must match actual scenarios array length
  testCaseCount: 12,               // must match actual test-cases array length
  breadcrumb: [
    { label: "Home", href: "/" },
    { label: "Practice", href: "/practice" },
    { label: "Checkboxes" },       // last item has no href
  ],
  upNext: {
    icon: "📋",
    title: "Forms",
    description: "Fill and submit forms with validation",
    href: "/practice/forms",
  },
};
```

### `scenarios.ts`

```ts
import type { ScenarioMeta, FrameworkMethods } from "@/data/practice-data/types";

export const checkboxScenarios: ScenarioMeta[] = [
  {
    id: "S01",                          // sequential, "S01" … "S0N"
    title: "Check a checkbox",
    testId: "scenario-check-basic",     // data-testid on the ScenarioCard root
    resultId: "result-s01",             // id on the result <span> inside the card
    initialResult: "Not checked yet",
    hint: `Target: <code>[data-testid="chk-basic"]</code> → assert <code>isChecked()</code>`,
    // badge: "DISABLED",              // optional — renders a pill on the card
  },
  // …more scenarios
];

export const frameworkMethods: Record<"selenium" | "playwright" | "cypress", FrameworkMethods> = {
  selenium:   { label: "Selenium (Java)",   methods: [{ color: "purple", label: "isSelected()" }] },
  playwright: { label: "Playwright JS / PY", methods: [{ color: "purple", label: "isChecked()" }] },
  cypress:    { label: "Cypress JS",         methods: [{ color: "purple", label: ".should('be.checked')" }] },
};
```

**`ScenarioMeta` fields:**

| Field           | Type      | Purpose                                              |
|-----------------|-----------|------------------------------------------------------|
| `id`            | string    | "S01" … "S0N"                                        |
| `title`         | string    | Displayed on the scenario card header                |
| `testId`        | string    | `data-testid` on the `<ScenarioCard>` root element   |
| `resultId`      | string    | `id` on the result `<span>` practitioners assert     |
| `initialResult` | string    | Text shown before any interaction                    |
| `hint`          | string    | HTML-safe hint shown when the hint button is pressed |
| `badge`         | string?   | Optional pill, e.g. `"DISABLED"`                     |

### `test-cases.ts`

```ts
import type { TestCase } from "@/data/practice-data/types";

export const checkboxesTestCases: TestCase[] = [
  {
    id: "CHK_001",                      // prefix = element abbreviation + 3-digit number
    scenario: "Checkbox can be checked",
    expected: "isChecked() returns true after interaction",
    type: "positive",                   // "positive" | "negative" | "edge"
    priority: "high",                   // "high" | "medium" | "low"
    steps: [
      'Navigate to <code>/practice/checkboxes</code>',
      'Locate <code>[data-testid="chk-basic"]</code>',
      'Call <code>check()</code> / <code>click()</code>',
      'Assert <code>isChecked()</code> is true',
    ],
    // note: "Optional extra context for edge cases.",
  },
];
```

### `learn.ts`

```ts
import type { FaqItem, LearnCodeSnippet, MethodRow, TocItem } from "@/data/practice-data/types";

export const checkboxesTocItems: TocItem[] = [
  { id: "learn-overview", label: "Overview" },
  { id: "learn-check",    label: "1 · Check / Uncheck" },
  { id: "learn-state",    label: "2 · Assert State" },
  { id: "learn-methods",  label: "Method Summary", dividerBefore: true },
  { id: "learn-faq",      label: "FAQ" },
];

export const checkboxesLearnDesc: Record<string, string> = {
  overview: "Checkboxes are a foundational form control…",
  check:    "Use the framework's dedicated check/uncheck helper rather than a raw click…",
  state:    "Assert the checked state directly instead of relying on visual appearance…",
};

// One entry per Learn tab section — each has pw / sel / cy code blocks.
export const checkboxesLearnCode: Record<string, LearnCodeSnippet> = {
  check: {
    pw:  { lang: "TypeScript",  code: `await page.locator('#chkBasic').check();` },
    sel: { lang: "Java",        code: `driver.findElement(By.id("chkBasic")).click();` },
    cy:  { lang: "JavaScript",  code: `cy.get('#chkBasic').check();` },
  },
  state: {
    pw:  { lang: "TypeScript",  code: `await expect(page.locator('#chkBasic')).toBeChecked();` },
    sel: { lang: "Java",        code: `assertTrue(driver.findElement(By.id("chkBasic")).isSelected());` },
    cy:  { lang: "JavaScript",  code: `cy.get('#chkBasic').should('be.checked');` },
  },
};

export const checkboxesMethodRows: MethodRow[] = [
  {
    action:       "Check",
    selenium:     "element.click()",
    playwrightJs: "locator.check()",
    playwrightPy: "locator.check()",
    cypress:      ".check()",
  },
];

export const checkboxesFaq: FaqItem[] = [
  {
    question: "Why use check() instead of click()?",
    answer:   "check() is idempotent — it only fires if unchecked, making tests more stable.",
    testId:   "faq-1",
  },
];
```

### `index.ts` (barrel)

Re-export everything so the rest of the codebase can import from one path:

```ts
export { checkboxesFaq, checkboxesLearnCode, checkboxesLearnDesc, checkboxesMethodRows, checkboxesTocItems } from "./learn";
export { checkboxesMeta } from "./meta";
export { checkboxScenarios, frameworkMethods } from "./scenarios";
export { checkboxesTestCases } from "./test-cases";
```

---

## 3. SEO Layer — `data/meta-data/practice/`

Each practice element gets two files here.

### `<element>-page-meta-data.ts`

Uses the shared `createPageMetadata` helper — this produces the full Next.js `Metadata` object
(title template, canonical URL, Open Graph, Twitter card, robots rules) from a small input.

```ts
import { createPageMetadata } from "../create-page-metadata";

export const checkboxesPageMetadata = createPageMetadata({
  title: "How to Handle Checkboxes in Selenium and Playwright",
  description: "Practice checkbox automation — check, uncheck, assert state, indeterminate…",
  path: "/practice/checkboxes",
  ogType: "article",
  keywords: [
    "checkbox selenium",
    "check checkbox playwright",
    "cypress checkbox",
    "isSelected selenium",
    "toBeChecked playwright",
  ],
});
```

> **Note:** `page.tsx` can use this export OR build `metadata` inline from `buttonsMeta`
> (see §4). Both patterns exist in the codebase. Prefer the `createPageMetadata` helper for
> new elements — it keeps SEO metadata consistent site-wide.

### `<element>-structured-jsonld-data.ts`

Three JSON-LD objects: `WebPage`, `BreadcrumbList`, and `FAQPage`. All are built with the
helpers in `data/meta-data/structured-data.ts`.

```ts
import { createBreadcrumbJsonLd, createFaqPageJsonLd, createWebPageJsonLd } from "../structured-data";
import { checkboxesFaq } from "@/data/practice-data/checkboxes";

const name = "How to Handle Checkboxes in Selenium and Playwright";
const description = "Practice checkbox automation…";

export const checkboxesPageWebPageJsonLd = createWebPageJsonLd({
  name,
  description,
  path: "/practice/checkboxes",
  about: ["Checkbox automation", "Selenium checkbox", "Playwright checkbox", "Cypress checkbox"],
  mainEntity: {
    "@type": "Thing",
    name: "Checkbox interactions",
    description,
  },
});

export const checkboxesPageBreadcrumbJsonLd = createBreadcrumbJsonLd([
  { name: "Home",        path: "/" },
  { name: "Practice",    path: "/practice" },
  { name: "Checkboxes",  path: "/practice/checkboxes" },
]);

// Pulls FAQ items from the same source rendered in the Learn tab.
export const checkboxesPageFaqJsonLd = createFaqPageJsonLd(
  checkboxesFaq.map((item) => ({ question: item.question, answer: item.answer })),
);
```

---

## 4. Route Layer — `app/practice/<element>/`

### `page.tsx`

This is the only `async` Server Component in the route. It:
1. Imports metadata (from `meta.ts` or `createPageMetadata`) and exports it as `metadata`.
2. Runs `highlightLearnSnippet` on every code snippet in parallel with `Promise.all`.
3. Renders `<PracticePage>` with the pre-computed highlighted snippets passed via
   `learnContent={<LearnTab snippets={…} />}`.

```ts
import type { Metadata } from "next";
import { PracticePage }   from "./_components/practice-page";
import { LearnTab }        from "./_components/learn-tab";
import { checkboxesMeta }  from "@/data/practice-data/checkboxes/meta";
import { checkboxesTestCases } from "@/data/practice-data/checkboxes/test-cases";
import { checkboxesLearnCode } from "@/data/practice-data/checkboxes/learn";
import { highlightLearnSnippet } from "@/lib/highlight";

export const metadata: Metadata = {
  title: `${checkboxesMeta.title} | QA Playground`,
  description: checkboxesMeta.description,
  openGraph: {
    title: `${checkboxesMeta.title} | QA Playground`,
    description: checkboxesMeta.description,
    url: "https://qaplayground.dev/practice/checkboxes",
    siteName: "QA Playground",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${checkboxesMeta.title} | QA Playground`,
    description: checkboxesMeta.description,
  },
};

export default async function CheckboxesPage() {
  const [check, state] = await Promise.all([
    highlightLearnSnippet(checkboxesLearnCode.check),
    highlightLearnSnippet(checkboxesLearnCode.state),
  ]);

  return (
    <PracticePage
      meta={checkboxesMeta}
      testCases={checkboxesTestCases}
      learnContent={<LearnTab snippets={{ check, state }} />}
    />
  );
}
```

---

## 5. Route-Local Components — `app/practice/<element>/_components/`

The `_components` folder is private (excluded from routing). Create four files, always named
the same way — only the element name changes inside them.

```
_components/
  practice-page.tsx        ← 'use client' shell — wires PageHeader + MainTabs
  practice-tab.tsx         ← 'use client' — interactive scenario cards + sidebar
  learn-tab.tsx            ← sync Server Component — doc sections + code blocks
  test-cases-tab.tsx       ← thin wrapper around <TestCasesTable>
  <element>.module.css     ← scoped CSS for button/control variants + layout
```

### `practice-page.tsx`

**Always** `'use client'`. Receives `meta`, `testCases`, and `learnContent` as a `ReactNode`
(never imports `LearnTab` directly — that would make an async Server Component a client import).

```tsx
"use client";

import { PageHeader, MainTabs } from "@/components/practice";
import { PracticeTab }           from "./practice-tab";
import { TestCasesTab }          from "./test-cases-tab";
import type { PracticePageMeta, TestCase } from "@/data/practice-data/types";
import type { ReactNode } from "react";

interface PracticePageProps {
  meta: PracticePageMeta;
  testCases: TestCase[];
  learnContent: ReactNode;
}

export function PracticePage({ meta, testCases, learnContent }: PracticePageProps) {
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

### `practice-tab.tsx`

`'use client'` — owns all interactive state. Imports scenarios and framework methods from the
data layer. Renders `ScenarioCard` components with the interactive element inside the render-prop
callback. Sidebar contains `ProgressWidget`, `FrameworkMethodsPanel`, and `UpNextCard`.

```tsx
"use client";

import { useRef, useState } from "react";
import { ScenarioCard, ProgressWidget, FrameworkMethodsPanel, UpNextCard } from "@/components/practice";
import type { ProgressItem } from "@/components/practice";
import { checkboxScenarios, frameworkMethods } from "@/data/practice-data/checkboxes/scenarios";
import type { PracticePageMeta } from "@/data/practice-data/types";
import styles from "./checkboxes.module.css";

interface PracticeTabProps {
  upNext: PracticePageMeta["upNext"];
}

export function PracticeTab({ upNext }: PracticeTabProps) {
  const [completedIds, setCompletedIds] = useState<Set<string>>(new Set());

  function markDone(id: string) {
    setCompletedIds((prev) => new Set([...prev, id]));
  }

  const progressItems: ProgressItem[] = checkboxScenarios.map((s) => ({
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

            {/* ── One ScenarioCard per scenario ─────────────────────────────── */}
            <ScenarioCard {...checkboxScenarios[0]} onComplete={() => markDone("s01")}>
              {({ setResult }) => (
                <input
                  type="checkbox"
                  id="chkBasic"
                  data-testid="chk-basic"
                  onChange={(e) => setResult(e.target.checked ? "Checked" : "Unchecked")}
                />
              )}
            </ScenarioCard>

          </div>
        </section>

        <aside className={styles.practiceSidebar} data-testid="practice-sidebar">
          <ProgressWidget items={progressItems} />
          <FrameworkMethodsPanel methods={frameworkMethods} />
          <UpNextCard {...upNext} />
        </aside>
      </div>
    </div>
  );
}
```

**`ScenarioCard` render prop:** The child function receives `{ setResult, complete }`.
- `setResult(text)` — updates the result span practitioners assert against.
- `complete()` — marks the scenario done in the progress widget.

### `learn-tab.tsx`

Sync Server Component (no `'use client'`, no `async`). Receives pre-highlighted snippets as
props. Uses shared `DocSection`, `LearnCodeBlock`, `MethodSummaryTable`, `FaqBlock`, `LearnToc`
from `@/components/practice`.

```tsx
import { DocSection, LearnCodeBlock, MethodSummaryTable, FaqBlock, LearnToc } from "@/components/practice";
import { checkboxesLearnDesc, checkboxesMethodRows, checkboxesFaq, checkboxesTocItems } from "@/data/practice-data/checkboxes/learn";
import type { HighlightedLearnCodeSnippet } from "@/data/practice-data/types";

interface LearnTabProps {
  snippets: {
    check: HighlightedLearnCodeSnippet;
    state: HighlightedLearnCodeSnippet;
  };
}

export function LearnTab({ snippets }: LearnTabProps) {
  const { check, state } = snippets;

  return (
    <div className="mx-auto w-full max-w-[1280px] px-4 py-6 pb-16 sm:px-7 sm:py-8">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_200px] lg:gap-12">
        <main aria-label="Learn content" className="flex flex-col gap-5">

          <DocSection id="learn-overview" heading="Overview">
            <p className="text-[13px] leading-[1.6] text-muted-foreground">
              {checkboxesLearnDesc.overview}
            </p>
          </DocSection>

          <DocSection id="learn-check" heading="1 · Check / Uncheck" desc={checkboxesLearnDesc.check}>
            <LearnCodeBlock snippets={check} />
          </DocSection>

          <DocSection id="learn-state" heading="2 · Assert State" desc={checkboxesLearnDesc.state}>
            <LearnCodeBlock snippets={state} />
          </DocSection>

          <DocSection id="learn-methods" heading="Method Summary">
            <MethodSummaryTable rows={checkboxesMethodRows} />
          </DocSection>

          <DocSection id="learn-faq" heading="FAQ">
            <FaqBlock items={checkboxesFaq} />
          </DocSection>

        </main>
        <LearnToc items={checkboxesTocItems} />
      </div>
    </div>
  );
}
```

### `test-cases-tab.tsx`

Thin wrapper — just passes `testCases` to `TestCasesTable`.

```tsx
import { TestCasesTable } from "@/components/practice";
import type { TestCase }   from "@/data/practice-data/types";

export function TestCasesTab({ testCases }: { testCases: TestCase[] }) {
  return (
    <div className="mx-auto w-full max-w-[1280px] px-4 py-5 pb-16 sm:px-7 sm:py-6">
      <TestCasesTable testCases={testCases} />
    </div>
  );
}
```

### `<element>.module.css`

Scoped CSS for the practice elements and layout. Copy the layout/sidebar classes from
`buttons.module.css` — they are identical across routes. Add element-specific variant
classes below them.

```css
/* ── Shared layout (copy verbatim from buttons.module.css) ─── */
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

@media (max-width: 1024px) {
  .practiceLayout { grid-template-columns: 1fr; }
  .practiceSidebar { position: static; }
}

@media (max-width: 640px) {
  .practiceLayout { gap: 16px; padding-block: 20px 48px; }
}

/* ── Element-specific variants ──────────────────────────────── */
/* Add your own classes here for the interactive controls */
```

---

## 6. Shared Practice UI Components — `components/practice/`

Do **not** modify these unless the change benefits every practice route. Import from the barrel:

```ts
import {
  PageHeader,           // breadcrumb + H1 + level/duration/scenario pills
  MainTabs,             // three-tab shell (Practice / Test Cases / Learn)
  ScenarioCard,         // card with title, hint, result span, render-prop child
  ProgressWidget,       // sidebar checklist of completed scenarios
  FrameworkMethodsPanel,// sidebar method reference dots
  UpNextCard,           // sidebar link to the next element
  TestCasesTable,       // full test cases table
  DocSection,           // collapsible doc section with heading + optional desc
  LearnCodeBlock,       // three-tab (PW / Selenium / Cypress) syntax-highlighted block
  MethodSummaryTable,   // four-column method reference grid
  FaqBlock,             // accordion FAQ list
  LearnToc,             // sticky right-side table of contents
} from "@/components/practice";
```

---

## 7. Types Reference — `data/practice-data/types.ts`

All types are centralised here. Never re-define them in individual files.

| Type                         | Used in              |
|------------------------------|----------------------|
| `PracticePageMeta`           | meta.ts, practice-page.tsx |
| `ScenarioMeta`               | scenarios.ts, practice-tab.tsx |
| `FrameworkMethods`           | scenarios.ts |
| `TestCase`                   | test-cases.ts, test-cases-tab.tsx |
| `LearnCodeSnippet`           | learn.ts (raw code, before highlight) |
| `HighlightedLearnCodeSnippet`| learn-tab.tsx props (after highlight) |
| `MethodRow`                  | learn.ts |
| `FaqItem`                    | learn.ts, JSON-LD file |
| `TocItem`                    | learn.ts |
| `PracticeLevel`              | "Beginner" \| "Intermediate" \| "Advanced" |
| `TestCaseType`               | "positive" \| "negative" \| "edge" |
| `TestCasePriority`           | "high" \| "medium" \| "low" |

---

## 8. `data-testid` & Selector Conventions

Every scenario element needs stable, automation-friendly attributes.

```
data-testid="<element>-page"          → root div in practice-page.tsx
data-testid="practice-tab"            → practice tab wrapper
data-testid="scenarios-list"          → scenarios container div
data-testid="practice-sidebar"        → aside sidebar

data-testid="<scenario-testid>"       → ScenarioCard root (from ScenarioMeta.testId)
id="<result-id>"                      → result span (from ScenarioMeta.resultId)
data-testid="<control-testid>"        → the actual interactive control
```

Example for a checkbox scenario:
```tsx
// ScenarioCard has testId: "scenario-check-basic" → data-testid="scenario-check-basic"
// resultId: "result-s01" → <span id="result-s01">

<input
  type="checkbox"
  id="chkBasic"
  data-testid="chk-basic"
/>
```

Use readable kebab-case. Prefix control `data-testid` with the element abbreviation:
`chk-`, `drp-`, `frm-`, `inp-`, `tbl-`, `alrt-`.

---

## 9. Complete File Checklist

When adding a new element, create these files (replace `<element>` with the slug):

```
data/practice-data/<element>/
  ✅ index.ts
  ✅ meta.ts
  ✅ scenarios.ts
  ✅ test-cases.ts
  ✅ learn.ts

data/meta-data/practice/
  ✅ <element>-page-meta-data.ts
  ✅ <element>-structured-jsonld-data.ts

app/practice/<element>/
  ✅ page.tsx

app/practice/<element>/_components/
  ✅ practice-page.tsx
  ✅ practice-tab.tsx
  ✅ learn-tab.tsx
  ✅ test-cases-tab.tsx
  ✅ <element>.module.css
```

**Total: 12 files.**

---

## 10. Key Rules to Remember

- `page.tsx` is the only `async` component in the route. All `await` (syntax highlighting) lives here.
- Never import a Server Component directly into a `'use client'` file. Pass it as `learnContent: ReactNode`.
- All content (descriptions, code snippets, FAQs, test cases) lives in `data/practice-data/<element>/` — not hardcoded in JSX.
- `scenarioCount` and `testCaseCount` in `meta.ts` must match the actual array lengths.
- Every interactive control needs `id`, `data-testid`, and a matching `resultId` span.
- The `_components` folder is private — import with relative paths, not `@/components`.
- Only touch `components/practice/` for changes that benefit every practice route.
- Keep `globals.css` clean — all element-specific styles go in `<element>.module.css`.
