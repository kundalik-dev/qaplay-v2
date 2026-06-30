# How to Add a New Practice Element (`/new-practice`)

This guide explains the **`/new-practice` framework** — the dashboard-style practice
playground with a left nav (Practice / Test Cases / Learn) and reusable scenario
blocks. Follow it to add a new element (e.g. `dropdown-practice`, `upload-practice`)
in a consistent, automation-friendly way.

> Worked example to copy from: **`alert-practice`**. Every file below already
> exists for it — clone the pattern.

---

## 1. Mental model

A practice element is made of three layers:

| Layer | Lives in | Reused or custom? |
| ----- | -------- | ----------------- |
| **Data** (meta, test cases, learn) | `data/new-practice/` | Custom per element |
| **Workspace shell** (left nav, header, tabs) | `app/new-practice/_components/element-workspace/` | **Reused** — don't copy |
| **Scenario blocks** (the practice UI) | `app/new-practice/<slug>/_components/` | Custom per element |
| **Block framework** (`PracticeBlock`, `PracticeButton`, `OutputBox`) | `app/new-practice/_components/practice-block/` | **Reused** — don't copy |

You only write **Data** + **Scenario blocks** + a thin **page.tsx**. The shell and
block framework are shared and should not be duplicated.

---

## 2. Files you create / change

For a new element with slug `my-element`:

```
data/new-practice/
  elements/my-element.ts                 ← CREATE: meta + testCases + learn data

data/new-practice/new-practice-cards-data.ts
                                         ← UPDATE: add a card so it shows on the index grid

app/new-practice/my-element/
  page.tsx                               ← CREATE: composes the workspace
  _components/
    my-element-playground.tsx            ← CREATE: your custom Practice UI (scenario blocks)
    my-element-playground.module.css     ← CREATE: scenario-specific styles
```

That's it. **Nothing else needs to change** — the layout, nav suppression, and
background are already handled globally for the whole `/new-practice` route.

---

## 3. Step-by-step

### Step 1 — Add the element data

Create `data/new-practice/elements/my-element.ts`. It exports one
`ElementContent` object (type defined in `data/new-practice/types.ts`):

```ts
import type { ElementContent } from "../types";

export const myElementContent: ElementContent = {
  meta: {
    slug: "my-element",
    title: "My Element",
    description: "One or two sentences on what this element practises.",
    level: "Beginner",          // "Beginner" | "Intermediate" | "Advanced"
    tags: ["Forms", "Inputs"],  // optional
  },

  // Rendered by the reusable TestCasesView (shared TestCasesTable)
  testCases: [
    {
      id: "MYEL_001",
      scenario: "Short title of the test",
      expected: "What the correct outcome is.",
      type: "positive",         // "positive" | "negative" | "edge"
      priority: "high",         // "high" | "medium" | "low"
      steps: [
        "Step one (HTML like <code>...</code> allowed).",
        "Step two.",
      ],
      note: "Optional extra note.",
    },
  ],

  // Rendered by the reusable LearnView (DocSection cards + LearnCodeBlock)
  learn: [
    {
      id: "learn-overview",
      heading: "Overview",
      desc: "Plain-text description shown under the heading (no HTML).",
    },
    {
      id: "learn-step-1",
      heading: "1 · Do the Thing",
      desc: "Short description of this technique.",
      // Optional framework code block — tabs + Copy + syntax highlight.
      snippets: {
        pw: { lang: "TypeScript", code: `await page.getByTestId('x').click();` },
        sel: { lang: "Java", code: `driver.findElement(By.id("x")).click();` },
        cy: { lang: "JavaScript", code: `cy.get('[data-testid="x"]').click();` },
      },
    },
    {
      id: "learn-pitfalls",
      heading: "Common Pitfalls",
      desc: "Optional bullets for gotchas.",
      bullets: ["Point one", "Point two"],      // optional; HTML allowed
    },
  ],
};
```

> **Learn code blocks:** each section may carry a `snippets` object with
> `pw` / `sel` / `cy` entries (`lang` must be one of `TypeScript`,
> `JavaScript`, `Java`, `Python`). They render with the shared `LearnCodeBlock`
> (framework tabs, Copy button, Shiki highlighting) — identical to the old
> `/practice` learn pages. Highlighting happens server-side in `page.tsx`
> (next step).

> The `TestCase` type is shared from `data/practice-data/types.ts`, so the Test
> Cases tab looks identical to the rest of the site.

### Step 2 — Build the custom Practice UI

Create `app/new-practice/my-element/_components/my-element-playground.tsx`. This is
your canvas. Compose one `PracticeBlock` per scenario using the framework
primitives:

```tsx
"use client";

import {
  OutputBox,
  PracticeBlock,
  PracticeButton,
  controlStyles as ui,
} from "../../_components/practice-block";
import styles from "./my-element-playground.module.css";

export function MyElementPlayground() {
  return (
    <div className={styles.playground} data-testid="my-element-playground">
      <PracticeBlock
        index="1"
        testId="block-example"
        title="Scenario title"
        badges={[{ label: "Beginner", tone: "green" }]}  // tone: green|blue|orange|red
        whatToTest={<>Short, always-visible guidance on what to assert.</>}
        hint={<p>Detailed hint — hidden behind the “Show hint” toggle.</p>}
      >
        {/* Your custom HTML/CSS with STABLE ids + data-testids */}
        <div className={ui.btnRow}>
          <PracticeButton data-testid="example-btn" onClick={() => {}}>
            Do Something
          </PracticeButton>
        </div>
        <OutputBox id="example-result" testId="example-result">
          Result appears here…
        </OutputBox>
      </PracticeBlock>

      {/* …more PracticeBlocks… */}
    </div>
  );
}
```

Framework primitives available from `../../_components/practice-block`:

| Export | Purpose |
| ------ | ------- |
| `PracticeBlock` | Scenario wrapper: index, title, badges, **What to test** callout, **Show hint** toggle. |
| `PracticeButton` | Themed button (`variant="primary" \| "secondary" \| "danger"`); passes through `id`, `data-testid`, `onClick`, etc. |
| `OutputBox` | DOM result panel (`tone="default" \| "danger" \| "success"`) so tests assert side effects. |
| `controlStyles` | Shared layout classes: `btnRow`, `field`, `label`, `input`. |

Add scenario-specific CSS in `my-element-playground.module.css` (use design
tokens — `var(--card)`, `var(--border)`, `var(--primary)` — for light/dark
support; **no inline CSS**).

### Step 3 — Create the page

Create `app/new-practice/my-element/page.tsx`. It is an **`async` Server
Component** — it pre-highlights the learn snippets on the server, then passes the
result down (keeping `LearnView` synchronous):

```tsx
import type { Metadata } from "next";

import { myElementContent } from "@/data/new-practice/elements/my-element";
import type { HighlightedLearnCodeSnippet } from "@/data/practice-data/types";
import { highlightLearnSnippet } from "@/lib/highlight";
import {
  ElementWorkspace,
  LearnView,
  PracticeView,
  TestCasesView,
} from "../_components";
import { MyElementPlayground } from "./_components/my-element-playground";

const { meta, testCases, learn } = myElementContent;

export const metadata: Metadata = {
  title: `${meta.title} | QA Playground`,
  description: meta.description,
};

export default async function MyElementPage() {
  // Pre-highlight every learn snippet on the server, keyed by section id.
  const highlightedEntries = await Promise.all(
    learn
      .filter((section) => section.snippets)
      .map(
        async (section) =>
          [section.id, await highlightLearnSnippet(section.snippets!)] as const,
      ),
  );
  const highlighted: Record<string, HighlightedLearnCodeSnippet> =
    Object.fromEntries(highlightedEntries);

  return (
    <ElementWorkspace
      meta={meta}
      testCaseCount={testCases.length}
      practiceContent={
        <PracticeView testId="my-element-view">
          <MyElementPlayground />
        </PracticeView>
      }
      testCasesContent={<TestCasesView testCases={testCases} />}
      learnContent={<LearnView sections={learn} highlighted={highlighted} />}
    />
  );
}
```

> If an element has **no** code snippets, you can skip the highlighting block and
> just render `<LearnView sections={learn} />`.

### Step 4 — Add the index card

So the element appears on the `/new-practice` grid, add an entry to
`newPracticeCards` in `data/new-practice/new-practice-cards-data.ts`:

```ts
{
  href: "/new-practice/my-element",
  iconSrc: "/mainicons/<icon>.svg",   // pick an existing icon in /public/mainicons
  iconAlt: "My Element icon",
  title: "My Element",
  description: "One-line summary for the card.",
  level: "Beginner",
  tag: "FORM",
  testId: "my-element",
},
```

---

## 4. Architecture rules (important)

- **Server/Client boundary:** `ElementWorkspace` is a Client Component. Pass tab
  content in as `ReactNode` props (the `page.tsx` does this) — never import an
  `async` Server Component into a client component. Do any `await` work in
  `page.tsx`. (See the root `CLAUDE.md` for the full rule.)
- **Playground components** that use `alert/confirm/prompt`, state, refs, or DOM
  events must start with `"use client"`.
- **Reuse, don't copy:** the workspace shell and block framework are shared. If you
  find yourself copying `element-workspace/` or `practice-block/`, stop — extend
  the shared component instead.

---

## 5. Automation-friendly checklist

Every element MUST be easy to target with Playwright / Selenium / Cypress:

- [ ] Playground root has `data-testid="<slug>-playground"`.
- [ ] Each `PracticeBlock` has a `testId` (e.g. `block-confirm`).
- [ ] Every interactive control has a stable `data-testid` (and `id` if the
      scenario needs one). Keep them kebab-case and descriptive.
- [ ] Result/side-effect surfaces use `OutputBox` with a stable `id` + `testId`
      so tests assert outcomes without reading native dialogs.
- [ ] No fragile selectors (deep nesting, random values, styling-only hooks).

---

## 6. Where the shared pieces live (reference)

| Path | What it is |
| ---- | ---------- |
| `app/new-practice/layout.tsx` | Calm, low-strain background surface (light/dark). No global navbar (suppressed via `DASHBOARD_PREFIXES` in `components/app-nav/conditional-site-chrome.tsx`). |
| `app/new-practice/_components/element-workspace/` | `ElementWorkspace`, `PracticeView`, `TestCasesView`, `LearnView`. |
| `app/new-practice/_components/practice-block/` | `PracticeBlock`, `PracticeButton`, `OutputBox`, `controlStyles`. |
| `app/new-practice/_components/index.ts` | Barrel — import everything from `../_components`. |
| `data/new-practice/types.ts` | `ElementContent`, `ElementMeta`, `LearnSection`. |
| `data/new-practice/new-practice-cards-data.ts` | Index grid cards. |

---

## 7. Quick recap

To add `my-element`:

1. **Create** `data/new-practice/elements/my-element.ts` (meta + test cases + learn).
2. **Create** `app/new-practice/my-element/_components/my-element-playground.tsx` (+ CSS module).
3. **Create** `app/new-practice/my-element/page.tsx` (composes the workspace).
4. **Update** `data/new-practice/new-practice-cards-data.ts` (add the index card).

No changes to the shell, layout, nav, or block framework are needed.
