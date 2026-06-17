# QA Playground — Practice Page Block Architecture

> **Scope**: This document covers the full architecture of any `practice/[element]` page in QA Playground V2.
> It defines every reusable block, explains how they compose into a page, and establishes the rules for
> building new element pages consistently.
>
> **Stack**: Next.js 15 (App Router) · shadcn/ui (base-nova) · Tailwind CSS v4 · TypeScript
>
> **Template code reference**: [`practice-page-code-templates.md`](./practice-page-code-templates.md)

---

## Table of Contents

1. [Page Overview](#1-page-overview)
2. [Tech Stack & Key Conventions](#2-tech-stack--key-conventions)
3. [CSS Variables & Design Tokens](#3-css-variables--design-tokens)
4. [Custom CSS File Pattern](#4-custom-css-file-pattern)
5. [shadcn/ui Usage Rules](#5-shadcnui-usage-rules)
6. [Brand Template Update Process](#6-brand-template-update-process)
7. [File & Folder Architecture](#7-file--folder-architecture)
8. [Data Architecture](#8-data-architecture)
9. [Block Inventory — All 14 Blocks](#9-block-inventory--all-14-blocks)
   - [Page-Level Blocks (4)](#91-page-level-blocks)
   - [Practice Tab Blocks (5)](#92-practice-tab-blocks)
   - [Learn Tab Blocks (5)](#93-learn-tab-blocks)
10. [Page Composition](#10-page-composition)
11. [Automation-Friendly Selector Rules](#11-automation-friendly-selector-rules)
12. [Checklist for a New Element Page](#12-checklist-for-a-new-element-page)

---

## 1. Page Overview

Every `practice/[element]` page (buttons, input-fields, dropdowns, etc.) shares an **identical shell** and **14 reusable blocks**. Only the data inside those blocks changes per element.

A practice page has three tabs:

| Tab | Purpose |
|-----|---------|
| **Practice** | Interactive element scenarios — the actual playground |
| **Test Cases** | Expandable test case table with steps, priority, type tags |
| **Learn** | Documentation-style content with inline playgrounds, method table, FAQ, right-side TOC |

Visual layout (max-width 1200px, centered):

```
┌─────────────────────────────────────────────────────────┐
│  TOP NAV  (AppNav — shared site-wide)                   │
├─────────────────────────────────────────────────────────┤
│  PAGE HEADER  breadcrumb · H1 · description · pills     │
├─────────────────────────────────────────────────────────┤
│  MAIN TABS  [ 🎮 Practice ]  [ 🧪 Test Cases ]  [ 📖 Learn ] │
├────────────────────────────────┬────────────────────────┤
│  SCENARIO CARDS  (left col)    │  CODE PANEL (sticky)   │
│  S01 … SN                      │  Progress bar          │
│                                │  PW / Selenium / Cypress│
│  (Practice tab only)           │  Key methods           │
│                                │  Up Next               │
├────────────────────────────────┴────────────────────────┤
│  TEST CASES TABLE  (Test Cases tab only)                │
├─────────────────────────────────────────┬───────────────┤
│  LEARN MAIN  (Learn tab)                │  TOC (sticky) │
│  Doc sections · Inline playgrounds      │               │
│  Method table · FAQ                     │               │
└─────────────────────────────────────────┴───────────────┘
```

---

## 2. Tech Stack & Key Conventions

### Framework
- **Next.js 15 App Router** — server components by default; client components only where browser APIs or interactivity are required.
- Practice tab elements (click handlers, input state) → `"use client"`.
- Static content (page header, test cases, learn doc) → server components.

### Styling
- **Tailwind CSS v4** via `@import "tailwindcss"` in `globals.css`.
- Use Tailwind utility classes as the primary styling approach.
- Custom CSS variables are accessible as Tailwind utilities (e.g. `bg-surface`, `text-muted`, `border-border`). See [Section 3](#3-css-variables--design-tokens).
- **CSS modules** for complex non-Tailwind styles only (code syntax highlighting, sticky panel calculations). One module per component family, named `[component].module.css`.

### Components
- **shadcn/ui** components for interactive primitives. Style them through CSS variable overrides, not class patches. See [Section 5](#5-shadcnui-usage-rules).
- **Lucide React** for all icons (configured in `components.json`).
- Route-local components → `app/practice/[element]/_components/`.
- Shared practice blocks → `components/practice/`.

### Fonts (configured in `globals.css`)
| Variable | Family | Use |
|----------|--------|-----|
| `var(--font-heading)` → `font-display` class | Space Grotesk | H1, H2, badges |
| `var(--font-sans)` → `font-body` class | Inter | Body copy |
| `var(--font-mono)` → `font-mono` class | IBM Plex Mono | Code, kickers, mono labels |

---

## 3. CSS Variables & Design Tokens

All tokens are defined in two places:
- **`app/globals.css`** — the live source used by the app (shadcn-compatible `:root` / `.dark`)
- **`docs/design-md/css-variables.css`** — annotated reference copy
- **`docs/design-md/tailwind.css`** — shows the `@theme inline` Tailwind token map

### Core Token Groups

#### Backgrounds (dark / light)
| Token | Dark | Light | Tailwind class |
|-------|------|-------|----------------|
| `--bg` | `#0a0c10` | `#f4f8fb` | `bg-bg` |
| `--bg2` | `#0f1117` | `#edf3f7` | `bg-bg2` |
| `--surface` | `#161b24` | `white/82%` | `bg-surface` |
| `--surface2` | `#1e2433` | `#ffffff` | `bg-surface2` |

#### Brand Accents
| Token | Dark value | Light value | Use |
|-------|-----------|-------------|-----|
| `--accent` / `--primary` | `#00ffaa` | `#1f5f6b` | Primary green — CTAs, active states |
| `--accent2` / `--secondary` | `#7b61ff` | `#6758dd` | Purple — secondary actions, badges |
| `--accent3` / `--brand-tertiary` | `#ff6b35` | `#d9652f` | Orange — warnings, highlights |

#### Text
| Token | Tailwind class | Use |
|-------|---------------|-----|
| `--text` / `--foreground` | `text-text` | Primary text |
| `--text-muted` / `--muted-foreground` | `text-muted` | Secondary text, labels |
| `--text-dim` | `text-dim` | Disabled, hints |

#### Borders
| Token | Value | Tailwind class |
|-------|-------|----------------|
| `--border` | `rgba(255,255,255,0.07)` dark | `border-border` |
| `--border-strong` / `--input` | `rgba(255,255,255,0.13)` dark | `border-border-strong` |
| `--border-glow` / `--ring` | `rgba(0,255,170,0.25)` dark | `ring-border-glow` |

#### Status Colors (same in both themes)
| Token | Value | Use |
|-------|-------|-----|
| `--success` | `#27c93f` | Passed states, positive results |
| `--warning` | `#ffbd2e` | Edge cases, caution |
| `--danger` / `--destructive` | `#ff5f56` | Errors, negative test type |
| `--info` | `#44d9e8` | Informational |

#### Radius Scale
| Token | Value | Tailwind class |
|-------|-------|----------------|
| `--radius-sm` | `8px` | `rounded-sm` |
| `--radius-md` | `12px` | `rounded-md` (shadcn `--radius`) |
| `--radius-lg` | `20px` | `rounded-lg` |
| `--radius-xl` | `28px` | `rounded-xl` |
| `--radius-pill` | `100px` | `rounded-pill` |

#### Shadows
| Token | Tailwind class |
|-------|----------------|
| `--shadow-card` | `shadow-card` |
| `--shadow-sm` | `shadow-sm` |
| `--shadow-float` | `shadow-float` |
| `--glow` | `shadow-glow` |

### How to Use in TSX
```tsx
// Tailwind utility classes (preferred)
<div className="bg-surface border border-border rounded-lg shadow-card" />

// CSS variable directly (for dynamic values or CSS modules)
<div style={{ borderColor: "var(--accent)" }} />

// In CSS modules
.myPanel { background: var(--surface2); border: 1px solid var(--border); }
```

---

## 4. Custom CSS File Pattern

For practice page components, use this layered approach:

### Layer 1 — Tailwind utilities (preferred, always try first)
```tsx
<div className="bg-surface2 border border-border-strong rounded-md p-4 flex flex-col gap-3" />
```

### Layer 2 — CSS module (for complex non-Tailwind styles)
Create one CSS module per major component family named after the component:

```
app/practice/[element]/_components/
  practice-layout.module.css   ← sticky panel math, grid proportions
  code-panel.module.css        ← syntax highlight tokens
```

Shared block modules live in:
```
components/practice/
  scenario-card.module.css
  inline-playground.module.css
  code-block.module.css
```

### Layer 3 — globals.css @layer components (for truly shared patterns)
Only add to `globals.css` if a pattern is used across 3+ unrelated places in the app.

### Naming convention for CSS modules
```css
/* PascalCase component name + descriptor */
.scenarioCard   { }
.scenarioCard__head { }
.scenarioCard--disabled { }

/* Or BEM-lite with camelCase */
.codePanel   { }
.codePanelHeader { }
.codePanelActiveTab { }
```

### Syntax highlight tokens (code blocks)
These need a CSS module since Tailwind has no built-in semantic color utilities for syntax:
```css
/* components/practice/code-block.module.css */
.kw   { color: var(--accent2); }      /* keywords: await, const, new */
.fn   { color: var(--accent); }       /* function calls */
.str  { color: var(--warning); }      /* string literals */
.cm   { color: var(--text-dim); font-style: italic; } /* comments */
.nm   { color: var(--accent3); }      /* numbers */
```

---

## 5. shadcn/ui Usage Rules

### Available shadcn components (already installed)
| Component | Import path | Use in practice pages |
|-----------|------------|----------------------|
| `Accordion` | `@/components/ui/accordion` | FAQ block |
| `Badge` | `@/components/ui/badge` | Level pill, type tags, priority tags |
| `Button` | `@/components/ui/button` | Framework switcher, interactive scenario CTAs |
| `Card` | `@/components/ui/card` | Scenario cards |
| `Input` | `@/components/ui/input` | Input field practice elements |
| `Tabs` | `@/components/ui/tabs` | Main Practice/Test Cases/Learn tabs |
| `Separator` | `@/components/ui/separator` | Section dividers |
| `ScrollArea` | `@/components/ui/scroll-area` | Sticky code panel scroll |
| `Tooltip` | `@/components/ui/tooltip` | Method explanations on hover |
| `Textarea` | `@/components/ui/textarea` | Textarea practice elements |

### How shadcn maps to QA Playground brand
Our `globals.css` maps `--primary` → `--accent` (`#00ffaa` dark / `#1f5f6b` light), so shadcn `Button variant="default"` already renders in our brand green. No extra overrides needed for basic usage.

### Variant mapping
| Use case | shadcn variant | Notes |
|----------|---------------|-------|
| Primary CTA (verify, clear, confirm) | `Button variant="default"` | Uses `--primary` = brand green |
| Secondary action | `Button variant="outline"` | Border uses `--border` |
| Framework switcher active | Custom — see code templates | Custom active state using CSS module |
| Disabled element badge | `Badge variant="secondary"` | Override color via CSS var |
| Level pill (Beginner/Intermediate) | `Badge variant="outline"` | Color-coded per level |
| Test case type tag | `Badge` with custom className | Colour-coded: positive/negative/edge |

### When to override shadcn internals
**Do not** patch shadcn component internals directly. Instead:
1. Add CSS variable overrides scoped to your component's CSS module
2. Or use `className` prop with Tailwind utilities to supplement (not replace) the base styles
3. If a component needs deep visual changes, ask to create a "brand template" version (see next section)

---

## 6. Brand Template Update Process

> **Key rule**: When a shadcn component's default styling doesn't match the QA Playground design, don't patch inline. Instead, ask explicitly:
> _"Create/update the brand template for `[ComponentName]`"_

This triggers creating or updating the component in `components/ui/` with:
- CSS variable overrides that match our token system
- `data-testid` wiring
- Documented variant extensions for practice page usage

### Current brand-templated components
| Component | File | Custom variants added |
|-----------|------|----------------------|
| `Button` | `components/ui/button.tsx` | — |
| `Badge` | `components/ui/badge.tsx` | — |
| `Input` | `components/ui/input.tsx` | — |
| `Tabs` | `components/ui/tabs.tsx` | — |
| `Accordion` | `components/ui/accordion.tsx` | — |

When you want to use a shadcn component in a practice page and the default styling looks off, say:
> _"Update the `Accordion` brand template so the trigger font uses Space Grotesk and the border uses `--border-strong`"_

---

## 7. File & Folder Architecture

```
qaplayground-v2/
│
├── app/
│   └── practice/
│       ├── layout.tsx                    ← shared layout for all practice routes
│       ├── page.tsx                      ← practice element grid
│       └── [element]/                    ← e.g. buttons/, input-fields/
│           ├── page.tsx                  ← server component, exports metadata
│           └── _components/
│               ├── practice-page.tsx     ← stitches all tabs + blocks together (client)
│               ├── practice-tab.tsx      ← Practice tab content
│               ├── test-cases-tab.tsx    ← Test Cases tab content
│               ├── learn-tab.tsx         ← Learn tab content
│               └── [element].module.css  ← element-specific complex styles only
│
├── components/
│   └── practice/                         ← SHARED blocks across all element pages
│       ├── index.ts                      ← barrel export
│       ├── page-header.tsx               ← breadcrumb + H1 + desc + pills
│       ├── main-tabs.tsx                 ← Practice/Test Cases/Learn switcher
│       ├── scenario-card.tsx             ← single scenario card (client)
│       ├── code-panel.tsx                ← sticky right panel (client)
│       ├── progress-widget.tsx           ← scenarios X/N progress bar
│       ├── framework-code-block.tsx      ← PW/Selenium/Cypress tabbed code
│       ├── test-cases-table.tsx          ← expandable TC table (client)
│       ├── doc-section.tsx               ← learn tab doc wrapper
│       ├── inline-playground.tsx         ← macOS-style practice panel (client)
│       ├── method-summary-table.tsx      ← action vs framework table
│       ├── faq-block.tsx                 ← shadcn Accordion FAQ
│       ├── learn-toc.tsx                 ← right-side TOC (client)
│       ├── up-next-card.tsx              ← next element suggestion
│       ├── practice-shell.tsx            ← outer max-width container
│       ├── code-block.module.css         ← syntax highlight tokens
│       └── inline-playground.module.css  ← panel layout, terminal bar
│
├── data/
│   └── practice-data/
│       ├── practice-elements-data.ts     ← the /practice grid card data (exists)
│       ├── types.ts                      ← shared TypeScript types for all blocks
│       └── [element]/                    ← e.g. buttons/, input-fields/
│           ├── scenarios.ts              ← scenario card data
│           ├── test-cases.ts             ← TC table data
│           ├── learn.ts                  ← learn tab doc sections + FAQ
│           ├── code-snippets.ts          ← PW/Selenium/Cypress code per scenario
│           └── meta.ts                   ← page metadata (title, desc, OG)
│
└── types/
    └── practice-types.ts                 ← (or keep in data/practice-data/types.ts)
```

### Server vs Client boundary

| Component | Directive | Reason |
|-----------|-----------|--------|
| `page.tsx` | none (server) | Exports metadata, passes data as props |
| `practice-page.tsx` | `"use client"` | Manages active tab state |
| `scenario-card.tsx` | `"use client"` | Click handlers, result state |
| `code-panel.tsx` | `"use client"` | Framework switcher state |
| `test-cases-table.tsx` | `"use client"` | Expand/collapse rows |
| `inline-playground.tsx` | `"use client"` | Practice interaction state |
| `learn-toc.tsx` | `"use client"` | IntersectionObserver scroll spy |
| `faq-block.tsx` | none (server) | shadcn Accordion renders server-side |
| `page-header.tsx` | none (server) | Pure display, no interactivity |
| `method-summary-table.tsx` | none (server) | Static table |
| `doc-section.tsx` | none (server) | Static doc content |

---

## 8. Data Architecture

Each element page has its own data folder under `data/practice-data/[element]/`. This keeps page content editable without touching component code.

### Core TypeScript types (`data/practice-data/types.ts`)

```typescript
// Difficulty level
export type PracticeLevel = "Beginner" | "Intermediate" | "Advanced";

// Test case type tag
export type TestCaseType = "positive" | "negative" | "edge";

// Test case priority
export type TestCasePriority = "high" | "medium" | "low";

// Framework selector for code snippets
export type Framework = "playwright" | "selenium" | "cypress";

// Page header data
export interface PracticePageMeta {
  element: string;           // e.g. "buttons"
  title: string;             // e.g. "Button Automation Practice"
  description: string;
  level: PracticeLevel;
  durationMin: number;       // e.g. 10
  scenarioCount: number;     // e.g. 8
  testCaseCount: number;     // e.g. 13
  upNext: { title: string; description: string; href: string; icon: string };
}

// Single interactive scenario
export interface Scenario {
  id: string;                // "S01", "S02" …
  title: string;
  testId: string;            // data-testid value for the card
  element: React.ReactNode;  // the practice element (button, input, etc.)
  resultId: string;          // id of the result <span>
  initialResult: string;     // initial placeholder text
  tags?: string[];           // e.g. ["DISABLED"]
}

// Test case row
export interface TestCase {
  id: string;                // "BTN_001", "INP_001"
  scenario: string;
  expected: string;
  type: TestCaseType;
  priority: TestCasePriority;
  steps: string[];
  description?: string;
}

// Code snippets for the code panel (one set per framework)
export interface CodeSnippets {
  playwright: string;        // raw code string (with syntax spans added by component)
  selenium: string;
  cypress: string;
}

// Key method row (right panel list)
export interface KeyMethod {
  icon: "green" | "blue" | "orange" | "yellow" | "purple";
  label: string;             // e.g. "click() / locator.click()"
}

// Learn tab: doc section
export interface LearnSection {
  id: string;                // anchor id, e.g. "learn-single"
  tocLabel: string;          // shown in TOC, e.g. "1 · Single Click"
  heading: string;
  content: React.ReactNode;  // prose paragraphs, method table, FAQ, etc.
}

// Learn tab: method table row
export interface MethodRow {
  action: string;
  selenium: string;
  playwrightJs: string;
  playwrightPython: string;
  cypress: string;
}

// FAQ item
export interface FaqItem {
  question: string;
  answer: string;
  testId?: string;
}
```

### Data file pattern (example: `data/practice-data/buttons/scenarios.ts`)
```typescript
import type { Scenario } from "@/data/practice-data/types";

export const buttonScenarios: Scenario[] = [
  {
    id: "S01",
    title: "Navigate to Home Page",
    testId: "scenario-navigate-home",
    resultId: "res-home",
    initialResult: "Waiting for click…",
    element: null, // rendered by the component
  },
  // …
];
```

---

## 9. Block Inventory — All 14 Blocks

### 9.1 Page-Level Blocks

These four blocks appear on every element page unchanged except for their data props.

---

#### Block 1 — `PageHeader`
**File**: `components/practice/page-header.tsx`
**Directive**: Server component

Renders: breadcrumb trail → H1 → description paragraph → pill row (level badge, time pill, scenario count pill).

**Props**:
```typescript
interface PageHeaderProps {
  breadcrumbs: Array<{ label: string; href?: string }>;
  title: string;
  description: string;
  level: PracticeLevel;
  durationMin: number;
  scenarioCount: number;
}
```

**Design notes**:
- Full-width background, content max-width 1200px centered via `practice-shell` wrapper
- H1 uses `font-display` (Space Grotesk), tracking `-0.05em`
- Breadcrumb separator uses `›` (›), color `text-dim`
- Level pill colors: Beginner → `--success`, Intermediate → `--warning`, Advanced → `--danger`
- Time and count pills: `bg-surface2 border border-border text-muted` with `font-mono` label

---

#### Block 2 — `MainTabs`
**File**: `components/practice/main-tabs.tsx`
**Directive**: Client component (controls active tab state)

Three tabs: Practice (with scenario count badge), Test Cases (with TC count badge), Learn.

**Props**:
```typescript
interface MainTabsProps {
  scenarioCount: number;
  testCaseCount: number;
  practiceContent: React.ReactNode;
  testCasesContent: React.ReactNode;
  learnContent: React.ReactNode;
}
```

**shadcn component**: `Tabs` from `@/components/ui/tabs`

**Design notes**:
- Sticky below page header (top offset = nav height + header height)
- Full-width background, inner content max-width 1200px
- Active tab indicator: bottom border `2px solid var(--accent)`
- Badge: `bg-surface2 text-muted font-mono text-[10px] px-1.5 rounded-sm`
- Automation attrs: `data-tab="practice|testcases|learn"`, `role="tab"`, `data-testid="tab-practice"` etc.

---

#### Block 3 — `UpNextCard`
**File**: `components/practice/up-next-card.tsx`
**Directive**: Server component

A small "next element" nudge shown at the bottom of the sticky code panel.

**Props**:
```typescript
interface UpNextCardProps {
  icon: string;       // emoji or lucide icon name
  title: string;      // e.g. "Forms"
  description: string; // e.g. "Fill and submit forms"
  href: string;
}
```

**Design notes**:
- `bg-surface2 border border-border rounded-lg p-3`
- Flex row: icon box → text stack → `›` arrow
- Hover: `border-accent/30` transition

---

#### Block 4 — `PracticeShell`
**File**: `components/practice/practice-shell.tsx`
**Directive**: Server component

The max-width centering wrapper used for all practice page content. Equivalent to the HTML `.page-wrap` pattern.

```typescript
interface PracticeShellProps {
  children: React.ReactNode;
  className?: string;
  fullBleed?: boolean; // when true: wrapper only adds padding, no max-width clamp
}
```

---

### 9.2 Practice Tab Blocks

---

#### Block 5 — `ScenarioCard`
**File**: `components/practice/scenario-card.tsx`
**Directive**: Client component

A single interactive scenario card. Contains: scenario number badge + title + bookmark button in the header; the practice element (button, input, etc.) + result area in the body.

**Props**:
```typescript
interface ScenarioCardProps {
  id: string;          // "S01"
  title: string;
  testId: string;      // data-testid for the card
  children: React.ReactNode;   // the practice element
  resultId: string;
  initialResult: string;
  badge?: "DISABLED" | "READ-ONLY" | string;   // optional status badge
}
```

**shadcn component**: `Card` from `@/components/ui/card`

**Design notes**:
- `bg-surface border border-border rounded-lg`
- Header: scenario number in `font-mono text-[11px]` with `bg-accent/10 text-accent` badge
- Body: flex row (element + result span) or flex col for stacked layouts
- Result span: initial color `text-dim`, success state `text-success`, animate with short transition
- `data-testid={testId}` on root card element

---

#### Block 6 — `ProgressWidget`
**File**: `components/practice/progress-widget.tsx`
**Directive**: Client component (updates as scenarios are completed)

Shows "Scenarios done X / N" with a fill bar.

**Props**:
```typescript
interface ProgressWidgetProps {
  completed: number;
  total: number;
}
```

**Design notes**:
- Track: `bg-surface2 rounded-full h-1.5`
- Fill: `bg-accent rounded-full transition-all duration-500`
- Label: `font-mono text-[11px] text-muted`
- Strong number: `text-text font-bold`

---

#### Block 7 — `FrameworkCodeBlock`
**File**: `components/practice/framework-code-block.tsx`
**Directive**: Client component (framework switcher state)

A tabbed code panel showing Playwright JS / Selenium Java / Cypress code for the current element's scenarios.

**Props**:
```typescript
interface FrameworkCodeBlockProps {
  snippets: CodeSnippets;  // { playwright, selenium, cypress }
}
```

**shadcn component**: `Button` for framework switcher tabs

**Design notes**:
- Switcher: three pill buttons, active state `bg-surface2 text-text border-border-strong`
- Code block: `bg-surface rounded-md border border-border font-mono text-[12px]`
- Code header: lang label + Copy button (copy to clipboard with ✓ Copied feedback)
- Syntax spans: `.kw .fn .str .cm .nm` defined in `code-block.module.css`
- Copy button: `variant="ghost"` shadcn Button, `size="sm"`

---

#### Block 8 — `CodePanel`
**File**: `components/practice/code-panel.tsx`
**Directive**: Client component

The sticky right-side panel in the Practice tab. Composes: ProgressWidget + FrameworkCodeBlock + key methods list + UpNextCard.

**Props**:
```typescript
interface CodePanelProps {
  totalScenarios: number;
  snippets: CodeSnippets;
  keyMethods: KeyMethod[];
  upNext: UpNextCardProps;
}
```

**Design notes**:
- `sticky top-[calc(var(--nav-h)+var(--header-h)+var(--tabs-h))]`
- `--nav-h`, `--header-h`, `--tabs-h` defined as CSS variables in the practice layout module
- Scrollable: `overflow-y-auto max-h-[calc(100vh-160px)]` or shadcn `ScrollArea`
- Width: `320px` fixed in the practice grid, min `280px`

---

#### Block 9 — `TestCasesTable`
**File**: `components/practice/test-cases-table.tsx`
**Directive**: Client component (expand/collapse rows)

A full-width expandable test case table with columns: expand toggle, Test ID, Scenario, Expected Result, Type, Priority.

**Props**:
```typescript
interface TestCasesTableProps {
  testCases: TestCase[];
}
```

**Design notes**:
- `<table>` with `w-full border-collapse`
- `<thead>`: `bg-surface2 text-muted font-mono text-[11px] uppercase tracking-widest`
- `<tr>` hover: `hover:bg-surface/50`
- Expand button: `▸` / `▾` toggle, active color `text-secondary`
- Steps drawer: collapsible `<tr>` row, `bg-surface2/50 border-t border-border`
- Step items: numbered badges + description text
- Type tag colors: positive → `success`, negative → `danger`, edge → `warning`
- Priority tag: high → `danger`, medium → `warning`, low → `muted`
- `data-testid="tc-row-{id}"` on each row

---

### 9.3 Learn Tab Blocks

---

#### Block 10 — `DocSection`
**File**: `components/practice/doc-section.tsx`
**Directive**: Server component

A named, anchor-linked section in the Learn tab. Wraps a heading, prose paragraphs, and optional child blocks (InlinePlayground, MethodSummaryTable, etc.).

**Props**:
```typescript
interface DocSectionProps {
  id: string;         // anchor id for TOC links and scroll-spy
  heading: string;
  sectionNum?: string | number;  // "1", "2", "→" (for overview)
  children: React.ReactNode;
}
```

**Design notes**:
- `scroll-mt-[160px]` for sticky header offset
- H2: `font-display font-bold tracking-tight` with a decorative section number chip
- Section number chip: `bg-accent/10 text-accent font-mono text-[11px] rounded-sm px-1.5`
- Prose paragraphs: `text-muted text-[0.95rem] leading-7`
- `<code>` inline: `bg-surface2 text-accent font-mono text-[0.875rem] px-1 rounded-sm`

---

#### Block 11 — `InlinePlayground`
**File**: `components/practice/inline-playground.tsx`
**Directive**: Client component (practice interaction state)

A macOS-style two-column playground panel embedded inside a learn doc section. Left column: element zone + hint. Right column: terminal-style output zone + code snippet.

**Props**:
```typescript
interface InlinePlaygroundProps {
  title: string;            // e.g. "Try it — Single Click"
  scenarioTag?: string;     // e.g. "S01 · S02"
  badgeVariant?: "disabled" | "readonly";
  leftColumn: React.ReactNode;   // the practice element(s)
  hint: string;                  // e.g. "Click any button above"
  resultId: string;
  codeSnippet: string;           // short illustrative snippet
  codeLabel?: string;            // e.g. "All frameworks"
}
```

**Design notes**:
- Outer: `bg-surface border border-border-strong rounded-xl shadow-card`
- Titlebar (macOS dots): `bg-surface2 border-b border-border flex items-center gap-3 px-4 py-2.5`
  - Dots: `w-3 h-3 rounded-full` — red `#ff5f56`, yellow `#ffbd2e`, green `#27c93f`
- Body: `grid grid-cols-2 divide-x divide-border`
- Left: `p-5 flex flex-col gap-4`
- Right: `p-5 bg-bg2 flex flex-col gap-3`
- Output zone: terminal-style bar (`WAITING` → `FIRED` on trigger) + body area
  - Bar: `bg-surface text-dim font-mono text-[10px]`, fired state `text-success` + green dot
- Code snippet: compact `bg-bg border border-border rounded-md font-mono text-[12px]`

---

#### Block 12 — `MethodSummaryTable`
**File**: `components/practice/method-summary-table.tsx`
**Directive**: Server component

A five-column comparison table: Action | Selenium (Java) | Playwright (JS) | Playwright (Python) | Cypress.

**Props**:
```typescript
interface MethodSummaryTableProps {
  rows: MethodRow[];
}
```

**Design notes**:
- Same table styling as TestCasesTable header/body
- `<code>` cells: `text-accent font-mono text-[0.8rem]`
- Zebra striping: alternate rows `bg-surface/30`
- Horizontal scroll on small viewports: `overflow-x-auto`

---

#### Block 13 — `FaqBlock`
**File**: `components/practice/faq-block.tsx`
**Directive**: Server component (shadcn Accordion is server-renderable)

An accordion-style FAQ section using shadcn `Accordion`.

**Props**:
```typescript
interface FaqBlockProps {
  items: FaqItem[];
}
```

**shadcn component**: `Accordion, AccordionItem, AccordionTrigger, AccordionContent`

**Design notes**:
- `type="multiple"` to allow multiple items open simultaneously
- Trigger: `font-sans font-medium text-[0.95rem] text-text hover:text-accent`
- Content: `text-muted text-[0.9rem] leading-7 pb-4`
- Border: `border border-border rounded-lg mb-2` on each item
- `data-testid={item.testId}` on `AccordionItem`
- `<code>` inline in answers: same style as DocSection inline code

---

#### Block 14 — `LearnToc`
**File**: `components/practice/learn-toc.tsx`
**Directive**: Client component (IntersectionObserver scroll-spy)

A sticky right-side table of contents. Highlights the currently visible section. Smooth-scrolls to section on click.

**Props**:
```typescript
interface LearnTocProps {
  items: Array<{ id: string; label: string }>;
  dividerAfterIndex?: number;  // inserts a separator (e.g. before "Method Summary")
}
```

**Design notes**:
- Sticky: `sticky top-[calc(var(--nav-h)+var(--header-h)+var(--tabs-h)+16px)]`
- Width: `200px` fixed, min `180px`
- "On This Page" label: `font-mono text-[10px] uppercase tracking-widest text-dim mb-3`
- Link: `block text-[12px] text-muted py-1 hover:text-text transition-colors`
- Active link: `text-accent font-medium` (set by IntersectionObserver)
- `Separator` (shadcn) between content sections and utility sections (method table, FAQ)

---

## 10. Page Composition

Here is how a complete element page is assembled from the blocks:

```
page.tsx (server)
  └─ exports metadata
  └─ renders <PracticePage> (passes data as props)

PracticePage (client — manages tab state)
  └─ <PracticeShell>
      ├─ <PageHeader {...meta} />
      ├─ <MainTabs
      │    practiceContent={<PracticeTab />}
      │    testCasesContent={<TestCasesTab />}
      │    learnContent={<LearnTab />}
      │  />
      └─ (tab panels rendered by MainTabs)

PracticeTab (client)
  └─ <div className="grid grid-cols-[1fr_320px]">
       ├─ <section>   ← scenarios column
       │    └─ scenarios.map(s => <ScenarioCard {...s} />)
       └─ <CodePanel
              totalScenarios={N}
              snippets={codeSnippets}
              keyMethods={keyMethods}
              upNext={upNext}
           />
       </div>

TestCasesTab (server)
  └─ <TestCasesTable testCases={testCases} />

LearnTab (mixed)
  └─ <div className="grid grid-cols-[1fr_200px] gap-8">
       ├─ <main>
       │    └─ learnSections.map(s => <DocSection {...s} />)
       │         └─ (each section may contain <InlinePlayground />
       │              <MethodSummaryTable /> <FaqBlock />)
       └─ <LearnToc items={tocItems} />
```

---

## 11. Automation-Friendly Selector Rules

Every new practice page element must have stable `data-testid` attributes. These are the primary selector targets for Playwright, Selenium, and Cypress.

### Required `data-testid` on every page

| Element | Pattern | Example |
|---------|---------|---------|
| Page section | `{element}-page` | `buttons-page` |
| Page header | `page-header` | `page-header` |
| Scenario card | `scenario-{slug}` | `scenario-navigate-home` |
| Practice element | `{element}-{action}` | `btn-go-home`, `inp-movie-name` |
| Result span | `result-{action}` | `result-go-home` |
| Test cases table | `test-cases-table` | `test-cases-table` |
| TC row | `tc-row-{id}` | `tc-row-001` |
| Expand button | `expand-{id}` | `expand-001` |
| Inline playground | `playground-{action}` | `playground-single-click` |
| FAQ item | `faq-{n}` | `faq-1` |
| Tab button | `tab-{name}` | `tab-practice`, `tab-learn` |

### Supporting automation attributes
```tsx
// On each practice element, add:
data-testid="btn-go-home"
data-section="scenario-01"
data-level="beginner"

// On the page root:
data-testid="buttons-page"
data-section="practice"
data-element="buttons"
```

---

## 12. Checklist for a New Element Page

When adding a new element page (e.g. `/practice/dropdowns`):

### Data
- [ ] Create `data/practice-data/[element]/` folder
- [ ] `meta.ts` — page title, description, level, duration, scenario count, up-next
- [ ] `scenarios.ts` — scenario definitions
- [ ] `code-snippets.ts` — PW/Selenium/Cypress code strings
- [ ] `test-cases.ts` — TC rows with steps
- [ ] `learn.ts` — doc sections, method rows, FAQ items

### Route
- [ ] Create `app/practice/[element]/page.tsx` — export `metadata`, render `<PracticePage>`
- [ ] Create `app/practice/[element]/_components/practice-page.tsx`
- [ ] Consult `new-route` skill before scaffolding (as per CLAUDE.md)

### Components
- [ ] Reuse all blocks from `components/practice/` — do not rebuild
- [ ] Add element-specific CSS only in `_components/[element].module.css`
- [ ] Add `data-testid` and automation attributes to every practice element

### Practice grid
- [ ] Add entry to `data/practice-data/practice-elements-data.ts`

### Docs
- [ ] Add element to relevant explainer HTML in `docs/explainer/New-html-2/`

---

*See [`practice-page-code-templates.md`](./practice-page-code-templates.md) for full TypeScript/TSX code templates for every block above.*
