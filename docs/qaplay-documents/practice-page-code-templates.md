# QA Playground — Practice Page Code Templates

> TypeScript types, TSX component shells, CSS module patterns, and data file templates for all 14 reusable
> practice page blocks. Reference: [`practice-page-blocks.md`](./practice-page-blocks.md)
>
> **These are starting templates.** When implementing a real block, ask to generate the full production
> version — these shells show the contract, structure, and styling approach..

---

## Table of Contents

1. [TypeScript Types](#1-typescript-types)
2. [Data File Templates](#2-data-file-templates)
3. [Page Entry Template](#3-page-entry-template)
4. [Page-Level Block Templates](#4-page-level-block-templates)
5. [Practice Tab Block Templates](#5-practice-tab-block-templates)
6. [Learn Tab Block Templates](#6-learn-tab-block-templates)
7. [CSS Module Templates](#7-css-module-templates)
8. [Full Page Composition Example](#8-full-page-composition-example)

---

## 1. TypeScript Types

**File**: `data/practice-data/types.ts`

```typescript
// ─── Core enumerations ──────────────────────────────────────────────────
export type PracticeLevel   = "Beginner" | "Intermediate" | "Advanced";
export type TestCaseType    = "positive" | "negative" | "edge";
export type TestCasePriority = "high" | "medium" | "low";
export type Framework       = "playwright" | "selenium" | "cypress";
export type DotColor        = "green" | "blue" | "orange" | "yellow" | "purple";

// ─── Page header / meta ─────────────────────────────────────────────────
export interface PracticePageMeta {
  element: string;           // route slug, e.g. "buttons"
  title: string;             // H1 text
  description: string;       // subtitle paragraph
  level: PracticeLevel;
  durationMin: number;
  scenarioCount: number;
  testCaseCount: number;
  breadcrumb: Array<{ label: string; href?: string }>;
  upNext: {
    icon: string;            // emoji or lucide icon name
    title: string;
    description: string;
    href: string;
  };
}

// ─── Practice tab ────────────────────────────────────────────────────────
export interface Scenario {
  id: string;                // "S01", "S02" …
  title: string;
  testId: string;            // data-testid for card root
  resultId: string;          // id for result <span>
  initialResult: string;
  badge?: "DISABLED" | "READ-ONLY" | string;
}

export interface CodeSnippets {
  playwright: string;
  selenium: string;
  cypress: string;
}

export interface KeyMethod {
  color: DotColor;
  label: string;
}

// ─── Test Cases tab ──────────────────────────────────────────────────────
export interface TestCase {
  id: string;                // e.g. "BTN_001"
  scenario: string;
  expected: string;
  type: TestCaseType;
  priority: TestCasePriority;
  steps: string[];
  description?: string;
}

// ─── Learn tab ───────────────────────────────────────────────────────────
export interface MethodRow {
  action: string;
  selenium: string;
  playwrightJs: string;
  playwrightPy: string;
  cypress: string;
}

export interface FaqItem {
  question: string;
  answer: string;            // plain text; wrap <code> inline if needed
  testId?: string;
}

export interface TocItem {
  id: string;                // matches DocSection id prop
  label: string;             // TOC link text
  dividerBefore?: boolean;   // insert separator above this item
}
```

---

## 2. Data File Templates

### `data/practice-data/[element]/meta.ts`
```typescript
import type { PracticePageMeta } from "@/data/practice-data/types";

export const buttonsMeta: PracticePageMeta = {
  element: "buttons",
  title: "Button Automation Practice",
  description:
    "Master button interactions in Selenium & Playwright — click, double-click, right-click, disabled state, click-and-hold, and browser navigation.",
  level: "Beginner",
  durationMin: 10,
  scenarioCount: 8,
  testCaseCount: 13,
  breadcrumb: [
    { label: "Home", href: "/" },
    { label: "Practice", href: "/practice" },
    { label: "Buttons" },
  ],
  upNext: {
    icon: "📋",
    title: "Forms",
    description: "Fill and submit forms with validation",
    href: "/practice/forms",
  },
};
```

### `data/practice-data/[element]/code-snippets.ts`
```typescript
import type { CodeSnippets } from "@/data/practice-data/types";

export const buttonsCodeSnippets: CodeSnippets = {
  playwright: `// Single click
await page.getByTestId('btn-go-home').click();

// Double click
await page.getByTestId('btn-double-click').dblclick();

// Assert disabled
await expect(
  page.getByTestId('btn-disabled')
).toBeDisabled();

// Click and hold 1.5 s
const btn = page.getByTestId('btn-click-hold');
await btn.hover();
await page.mouse.down();
await page.waitForTimeout(1500);
await page.mouse.up();`,

  selenium: `// Single click
WebElement btn = driver.findElement(
  By.cssSelector("[data-testid='btn-go-home']"));
btn.click();

// Double click
new Actions(driver)
  .doubleClick(btn).perform();

// Assert disabled
assertFalse(btn.isEnabled());

// Click and hold
new Actions(driver)
  .clickAndHold(btn)
  .pause(Duration.ofMillis(1500))
  .release().perform();`,

  cypress: `// Single click
cy.get("[data-testid='btn-go-home']")
  .click();

// Double click
cy.get("[data-testid='btn-double-click']")
  .dblclick();

// Assert disabled
cy.get("[data-testid='btn-disabled']")
  .should('be.disabled');

// Click and hold
cy.get("[data-testid='btn-click-hold']")
  .trigger('mousedown')
  .wait(1500)
  .trigger('mouseup');`,
};
```

### `data/practice-data/[element]/test-cases.ts`
```typescript
import type { TestCase } from "@/data/practice-data/types";

export const buttonsTestCases: TestCase[] = [
  {
    id: "BTN_001",
    scenario: "Click button triggers action",
    expected: "Result area updates with success text",
    type: "positive",
    priority: "high",
    description: "Verify that clicking a button triggers the expected result update.",
    steps: [
      "Navigate to /practice/buttons",
      'Locate button with data-testid="btn-go-home"',
      "Call element.click() or locator.click()",
      'Assert result text contains "Navigated"',
    ],
  },
  {
    id: "BTN_002",
    scenario: "Disabled button cannot be clicked",
    expected: "Button has disabled attribute; no action fires",
    type: "negative",
    priority: "high",
    steps: [
      'Locate button with data-testid="btn-disabled"',
      "Assert !isEnabled() returns true (Selenium)",
      "Assert toBeDisabled() passes (Playwright)",
      "Attempt click — assert no state change occurs",
    ],
  },
  // … add more test cases
];
```

### `data/practice-data/[element]/learn.ts`
```typescript
import type { MethodRow, FaqItem, TocItem } from "@/data/practice-data/types";

export const buttonsMethodRows: MethodRow[] = [
  {
    action: "Single click",
    selenium: "element.click()",
    playwrightJs: "locator.click()",
    playwrightPy: "locator.click()",
    cypress: ".click()",
  },
  {
    action: "Double click",
    selenium: "actions.doubleClick(el)",
    playwrightJs: "locator.dblclick()",
    playwrightPy: "locator.dblclick()",
    cypress: ".dblclick()",
  },
  // … more rows
];

export const buttonsFaq: FaqItem[] = [
  {
    question: "Why does Playwright timeout when clicking a disabled button?",
    answer:
      "Playwright performs actionability checks before clicking — it waits for the element to be visible, stable, enabled, and in the viewport. A disabled button fails the enabled check and times out. Use toBeDisabled() to assert the state instead.",
    testId: "faq-1",
  },
  // … more FAQ items
];

export const buttonsTocItems: TocItem[] = [
  { id: "learn-overview", label: "Overview" },
  { id: "learn-single",   label: "1 · Single Click" },
  { id: "learn-dbl",      label: "2 · Double Click" },
  { id: "learn-right",    label: "3 · Right Click" },
  { id: "learn-disabled", label: "4 · Disabled State" },
  { id: "learn-hold",     label: "5 · Click and Hold" },
  { id: "learn-methods",  label: "Method Summary", dividerBefore: true },
  { id: "learn-faq",      label: "FAQ" },
];
```

---

## 3. Page Entry Template

**File**: `app/practice/[element]/page.tsx`

```tsx
import type { Metadata } from "next";
import { buttonsMeta } from "@/data/practice-data/buttons/meta";
import { buttonsCodeSnippets } from "@/data/practice-data/buttons/code-snippets";
import { buttonsTestCases } from "@/data/practice-data/buttons/test-cases";
import { buttonsFaq, buttonsMethodRows, buttonsTocItems } from "@/data/practice-data/buttons/learn";
import { PracticePage } from "./_components/practice-page";

export const metadata: Metadata = {
  title: `${buttonsMeta.title} | QA Playground`,
  description: buttonsMeta.description,
  // … OG, twitter, etc. — use createPageMetadata helper
};

export default function ButtonsPage() {
  return (
    <PracticePage
      meta={buttonsMeta}
      codeSnippets={buttonsCodeSnippets}
      testCases={buttonsTestCases}
      methodRows={buttonsMethodRows}
      faqItems={buttonsFaq}
      tocItems={buttonsTocItems}
    />
  );
}
```

---

## 4. Page-Level Block Templates

### `PracticeShell`
```tsx
// components/practice/practice-shell.tsx
import { cn } from "@/lib/utils";

interface PracticeShellProps {
  children: React.ReactNode;
  className?: string;
}

export function PracticeShell({ children, className }: PracticeShellProps) {
  return (
    <div
      className={cn(
        "w-full max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8",
        className
      )}
    >
      {children}
    </div>
  );
}
```

### `PageHeader`
```tsx
// components/practice/page-header.tsx
import { Badge } from "@/components/ui/badge";
import { PracticeShell } from "./practice-shell";
import type { PracticePageMeta } from "@/data/practice-data/types";
import { cn } from "@/lib/utils";

const levelStyles: Record<string, string> = {
  Beginner:     "border-success/30 bg-success/10 text-success",
  Intermediate: "border-warning/30 bg-warning/10 text-warning",
  Advanced:     "border-danger/30  bg-danger/10  text-danger",
};

interface PageHeaderProps extends Pick<
  PracticePageMeta,
  "title" | "description" | "level" | "durationMin" | "scenarioCount" | "breadcrumb"
> {}

export function PageHeader({
  title, description, level, durationMin, scenarioCount, breadcrumb,
}: PageHeaderProps) {
  return (
    <header
      className="w-full border-b border-border bg-background/80 backdrop-blur-sm"
      data-testid="page-header"
    >
      <PracticeShell className="py-8">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 mb-4">
          {breadcrumb.map((crumb, i) => (
            <span key={i} className="flex items-center gap-1.5">
              {crumb.href ? (
                <a
                  href={crumb.href}
                  className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                >
                  {crumb.label}
                </a>
              ) : (
                <span className="text-foreground text-sm font-medium">{crumb.label}</span>
              )}
              {i < breadcrumb.length - 1 && (
                <span className="text-muted-foreground/50 text-sm">›</span>
              )}
            </span>
          ))}
        </nav>

        {/* Title */}
        <h1 className="font-display font-bold tracking-tight text-foreground mb-3"
            style={{ fontSize: "clamp(1.75rem,3vw,2.5rem)", lineHeight: 1.1 }}>
          {title}
        </h1>

        {/* Description */}
        <p className="text-muted-foreground text-base leading-7 mb-5 max-w-2xl">
          {description}
        </p>

        {/* Pills */}
        <div className="flex items-center gap-2 flex-wrap">
          <Badge
            variant="outline"
            className={cn("font-mono text-[10px] font-bold uppercase tracking-wider",
              levelStyles[level])}
          >
            🌱 {level}
          </Badge>
          <Badge variant="outline" className="font-mono text-[10px] text-muted-foreground border-border">
            ⏱ {durationMin} min
          </Badge>
          <Badge variant="outline" className="font-mono text-[10px] text-muted-foreground border-border">
            ⚡ {scenarioCount} scenarios
          </Badge>
        </div>
      </PracticeShell>
    </header>
  );
}
```

### `MainTabs` (using shadcn Tabs)
```tsx
// components/practice/main-tabs.tsx
"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { PracticeShell } from "./practice-shell";

interface MainTabsProps {
  scenarioCount: number;
  testCaseCount: number;
  practiceContent: React.ReactNode;
  testCasesContent: React.ReactNode;
  learnContent: React.ReactNode;
}

export function MainTabs({
  scenarioCount, testCaseCount,
  practiceContent, testCasesContent, learnContent,
}: MainTabsProps) {
  return (
    <Tabs defaultValue="practice" className="w-full">
      {/* Sticky tab bar */}
      <div className="sticky top-[var(--nav-h,60px)] z-20 w-full border-b border-border bg-background/90 backdrop-blur-sm">
        <PracticeShell>
          <TabsList className="h-12 bg-transparent gap-1 rounded-none border-0 p-0">
            <TabsTrigger
              value="practice"
              data-testid="tab-practice"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary
                         data-[state=active]:text-foreground data-[state=active]:bg-transparent
                         text-muted-foreground hover:text-foreground transition-all px-4 h-12"
            >
              🎮 Practice
              <span className="ml-1.5 font-mono text-[10px] bg-surface2 text-muted-foreground
                               px-1.5 py-0.5 rounded-sm">
                {scenarioCount}
              </span>
            </TabsTrigger>

            <TabsTrigger
              value="testcases"
              data-testid="tab-testcases"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary
                         data-[state=active]:text-foreground data-[state=active]:bg-transparent
                         text-muted-foreground hover:text-foreground transition-all px-4 h-12"
            >
              🧪 Test Cases
              <span className="ml-1.5 font-mono text-[10px] bg-surface2 text-muted-foreground
                               px-1.5 py-0.5 rounded-sm">
                {testCaseCount}
              </span>
            </TabsTrigger>

            <TabsTrigger
              value="learn"
              data-testid="tab-learn"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary
                         data-[state=active]:text-foreground data-[state=active]:bg-transparent
                         text-muted-foreground hover:text-foreground transition-all px-4 h-12"
            >
              📖 Learn
            </TabsTrigger>
          </TabsList>
        </PracticeShell>
      </div>

      <TabsContent value="practice"    className="mt-0">{practiceContent}</TabsContent>
      <TabsContent value="testcases"   className="mt-0">{testCasesContent}</TabsContent>
      <TabsContent value="learn"       className="mt-0">{learnContent}</TabsContent>
    </Tabs>
  );
}
```

---

## 5. Practice Tab Block Templates

### `ScenarioCard`
```tsx
// components/practice/scenario-card.tsx
"use client";

import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface ScenarioCardProps {
  id: string;           // "S01"
  title: string;
  testId: string;
  children: React.ReactNode;   // the interactive element(s)
  resultId: string;
  initialResult: string;
  badge?: string;
}

export function ScenarioCard({
  id, title, testId, children, resultId, initialResult, badge,
}: ScenarioCardProps) {
  return (
    <Card
      data-testid={testId}
      data-section={`scenario-${id.toLowerCase()}`}
      className="bg-surface border-border rounded-lg"
    >
      <CardHeader className="flex flex-row items-center justify-between py-3 px-4 border-b border-border">
        <div className="flex items-center gap-2">
          <span className="font-mono text-[11px] font-bold bg-primary/10 text-primary
                           px-1.5 py-0.5 rounded-sm">
            {id}
          </span>
          <span className="text-sm font-medium text-foreground">{title}</span>
        </div>
        {badge && (
          <Badge variant="outline" className="font-mono text-[9px] uppercase tracking-wider
                                              border-warning/30 bg-warning/10 text-warning">
            {badge}
          </Badge>
        )}
      </CardHeader>
      <CardContent className="flex items-center gap-4 py-4 px-4">
        {children}
        <span
          id={resultId}
          data-testid={`result-${id.toLowerCase()}`}
          className="text-sm text-muted-foreground transition-colors"
        >
          {initialResult}
        </span>
      </CardContent>
    </Card>
  );
}
```

### `ProgressWidget`
```tsx
// components/practice/progress-widget.tsx
"use client";

interface ProgressWidgetProps {
  completed: number;
  total: number;
}

export function ProgressWidget({ completed, total }: ProgressWidgetProps) {
  const pct = total > 0 ? (completed / total) * 100 : 0;

  return (
    <div className="flex flex-col gap-2 p-3 bg-surface2 rounded-lg border border-border">
      <div className="flex items-center justify-between">
        <span className="font-mono text-[11px] text-muted-foreground">Scenarios done</span>
        <strong className="font-mono text-[11px] text-foreground">{completed} / {total}</strong>
      </div>
      <div className="h-1.5 rounded-full bg-background overflow-hidden">
        <div
          className="h-full rounded-full bg-primary transition-all duration-500"
          style={{ width: `${pct}%` }}
          role="progressbar"
          aria-valuenow={completed}
          aria-valuemax={total}
        />
      </div>
    </div>
  );
}
```

### `FrameworkCodeBlock`
```tsx
// components/practice/framework-code-block.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { CodeSnippets } from "@/data/practice-data/types";
import styles from "./code-block.module.css";

type FwKey = "playwright" | "selenium" | "cypress";

const FW_LABELS: Record<FwKey, string> = {
  playwright: "PW JS",
  selenium:   "Selenium",
  cypress:    "Cypress",
};

const CODE_LANG: Record<FwKey, string> = {
  playwright: "Playwright · JS",
  selenium:   "Selenium · Java",
  cypress:    "Cypress",
};

interface FrameworkCodeBlockProps {
  snippets: CodeSnippets;
}

export function FrameworkCodeBlock({ snippets }: FrameworkCodeBlockProps) {
  const [active, setActive] = useState<FwKey>("playwright");
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText(snippets[active]).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    });
  }

  return (
    <div className="flex flex-col gap-2">
      {/* Framework switcher */}
      <div className="flex gap-1 bg-surface2 rounded-md p-1 border border-border">
        {(Object.keys(FW_LABELS) as FwKey[]).map(fw => (
          <button
            key={fw}
            onClick={() => setActive(fw)}
            data-fw={fw}
            className={cn(
              "flex-1 text-[11px] font-mono font-semibold rounded-sm px-2 py-1 transition-all",
              active === fw
                ? "bg-surface text-foreground border border-border-strong shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {FW_LABELS[fw]}
          </button>
        ))}
      </div>

      {/* Code block */}
      <div className="bg-surface rounded-lg border border-border overflow-hidden">
        <div className="flex items-center justify-between px-3 py-2 border-b border-border bg-surface2">
          <span className="font-mono text-[10px] text-muted-foreground">
            {CODE_LANG[active]}
          </span>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleCopy}
            className="h-6 px-2 text-[10px] font-mono text-muted-foreground hover:text-primary"
          >
            {copied ? "✓ Copied" : "Copy"}
          </Button>
        </div>
        <pre className={cn("p-4 text-[12px] leading-5 overflow-x-auto", styles.codeBody)}>
          {snippets[active]}
        </pre>
      </div>
    </div>
  );
}
```

### `CodePanel`
```tsx
// components/practice/code-panel.tsx
"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { ProgressWidget } from "./progress-widget";
import { FrameworkCodeBlock } from "./framework-code-block";
import { UpNextCard } from "./up-next-card";
import type { CodeSnippets, KeyMethod, PracticePageMeta } from "@/data/practice-data/types";

const dotColors: Record<string, string> = {
  green:  "bg-success",
  blue:   "bg-info",
  orange: "bg-accent3",
  yellow: "bg-warning",
  purple: "bg-secondary",
};

interface CodePanelProps {
  totalScenarios: number;
  snippets: CodeSnippets;
  keyMethods: KeyMethod[];
  upNext: PracticePageMeta["upNext"];
}

export function CodePanel({ totalScenarios, snippets, keyMethods, upNext }: CodePanelProps) {
  return (
    <aside
      className="sticky top-[var(--panel-top,160px)] h-[calc(100vh-var(--panel-top,160px))]
                 w-full border-l border-border"
      data-testid="code-panel"
    >
      <ScrollArea className="h-full">
        <div className="flex flex-col gap-4 p-4">
          <ProgressWidget completed={0} total={totalScenarios} />
          <FrameworkCodeBlock snippets={snippets} />

          <Separator className="bg-border" />

          {/* Key methods */}
          <div className="flex flex-col gap-1.5">
            <span className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground">
              Key Methods
            </span>
            {keyMethods.map((m, i) => (
              <div key={i} className="flex items-center gap-2 text-[12px] text-muted-foreground">
                <span className={`w-2 h-2 rounded-full flex-shrink-0 ${dotColors[m.color]}`} />
                {m.label}
              </div>
            ))}
          </div>

          <Separator className="bg-border" />
          <UpNextCard {...upNext} />
        </div>
      </ScrollArea>
    </aside>
  );
}
```

### `TestCasesTable`
```tsx
// components/practice/test-cases-table.tsx
"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { TestCase } from "@/data/practice-data/types";

const typeStyles: Record<string, string> = {
  positive: "border-success/30 bg-success/10 text-success",
  negative: "border-danger/30  bg-danger/10  text-danger",
  edge:     "border-warning/30 bg-warning/10 text-warning",
};

const priorityStyles: Record<string, string> = {
  high:   "border-danger/30  bg-danger/10  text-danger",
  medium: "border-warning/30 bg-warning/10 text-warning",
  low:    "border-border     bg-surface2   text-muted-foreground",
};

interface TestCasesTableProps {
  testCases: TestCase[];
}

export function TestCasesTable({ testCases }: TestCasesTableProps) {
  const [expanded, setExpanded] = useState<Set<string>>(new Set());

  function toggle(id: string) {
    setExpanded(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  return (
    <div className="overflow-x-auto" data-testid="test-cases-table">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="bg-surface2 border-b border-border">
            <th className="w-10 py-3 px-3" />
            <th className="py-3 px-4 text-left font-mono text-[10px] uppercase tracking-widest
                           text-muted-foreground">
              Test ID
            </th>
            <th className="py-3 px-4 text-left font-mono text-[10px] uppercase tracking-widest
                           text-muted-foreground">
              Scenario
            </th>
            <th className="py-3 px-4 text-left font-mono text-[10px] uppercase tracking-widest
                           text-muted-foreground">
              Expected Result
            </th>
            <th className="py-3 px-4 text-left font-mono text-[10px] uppercase tracking-widest
                           text-muted-foreground">
              Type
            </th>
            <th className="py-3 px-4 text-left font-mono text-[10px] uppercase tracking-widest
                           text-muted-foreground">
              Priority
            </th>
          </tr>
        </thead>
        <tbody>
          {testCases.map(tc => {
            const isOpen = expanded.has(tc.id);
            return (
              <>
                <tr
                  key={tc.id}
                  data-testid={`tc-row-${tc.id.toLowerCase()}`}
                  className="border-b border-border hover:bg-surface/50 transition-colors"
                >
                  <td className="py-3 px-3">
                    <button
                      onClick={() => toggle(tc.id)}
                      data-testid={`expand-${tc.id.toLowerCase()}`}
                      aria-expanded={isOpen}
                      className={cn(
                        "w-6 h-6 rounded-sm font-mono text-[12px] flex items-center justify-center",
                        "border border-border text-muted-foreground hover:text-secondary",
                        "transition-colors",
                        isOpen && "border-secondary/50 text-secondary"
                      )}
                    >
                      {isOpen ? "▾" : "▸"}
                    </button>
                  </td>
                  <td className="py-3 px-4 font-mono text-[11px] text-muted-foreground">
                    {tc.id}
                  </td>
                  <td className="py-3 px-4 text-[13px] text-foreground font-medium">
                    {tc.scenario}
                  </td>
                  <td className="py-3 px-4 text-[12px] text-muted-foreground">
                    {tc.expected}
                  </td>
                  <td className="py-3 px-4">
                    <Badge variant="outline"
                           className={cn("font-mono text-[9px] uppercase tracking-wider",
                             typeStyles[tc.type])}>
                      {tc.type}
                    </Badge>
                  </td>
                  <td className="py-3 px-4">
                    <Badge variant="outline"
                           className={cn("font-mono text-[9px] uppercase tracking-wider",
                             priorityStyles[tc.priority])}>
                      {tc.priority}
                    </Badge>
                  </td>
                </tr>

                {isOpen && (
                  <tr key={`steps-${tc.id}`} className="bg-surface2/50">
                    <td colSpan={6} className="px-6 py-4 border-b border-border">
                      {tc.description && (
                        <p className="text-[12px] text-muted-foreground mb-3">{tc.description}</p>
                      )}
                      <div className="flex flex-col gap-2">
                        {tc.steps.map((step, i) => (
                          <div key={i} className="flex items-start gap-3">
                            <span className="min-w-[20px] h-5 flex items-center justify-center
                                             rounded-sm bg-surface border border-border
                                             font-mono text-[10px] text-muted-foreground">
                              {i + 1}
                            </span>
                            <span className="text-[12px] text-muted-foreground"
                                  dangerouslySetInnerHTML={{ __html: step }} />
                          </div>
                        ))}
                      </div>
                    </td>
                  </tr>
                )}
              </>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
```

---

## 6. Learn Tab Block Templates

### `DocSection`
```tsx
// components/practice/doc-section.tsx
import { cn } from "@/lib/utils";

interface DocSectionProps {
  id: string;
  heading: string;
  sectionNum?: string | number;
  children: React.ReactNode;
  className?: string;
}

export function DocSection({ id, heading, sectionNum, children, className }: DocSectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className={cn("scroll-mt-[160px] mb-10", className)}
    >
      <h2
        id={`${id}-heading`}
        className="font-display font-bold tracking-tight text-foreground text-xl
                   flex items-center gap-2 mb-4"
      >
        {sectionNum !== undefined && (
          <span className="inline-flex items-center justify-center w-7 h-7 rounded-sm
                           bg-primary/10 text-primary font-mono text-[11px] font-bold
                           flex-shrink-0">
            {sectionNum}
          </span>
        )}
        {heading}
      </h2>
      <div className="flex flex-col gap-4">{children}</div>
    </section>
  );
}
```

### `InlinePlayground`
```tsx
// components/practice/inline-playground.tsx
"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import styles from "./inline-playground.module.css";

interface InlinePlaygroundProps {
  title: string;
  scenarioTag?: string;
  badgeVariant?: "disabled" | "readonly";
  leftColumn: React.ReactNode;
  hint: string;
  resultId: string;
  codeSnippet: string;
  codeLabel?: string;
  testId?: string;
}

export function InlinePlayground({
  title, scenarioTag, badgeVariant, leftColumn, hint,
  resultId, codeSnippet, codeLabel = "All frameworks", testId,
}: InlinePlaygroundProps) {
  const [fired, setFired] = useState(false);
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText(codeSnippet).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    });
  }

  return (
    <div
      className="bg-surface border border-border-strong rounded-xl overflow-hidden shadow-card"
      data-testid={testId}
    >
      {/* macOS titlebar */}
      <div className="flex items-center gap-3 px-4 py-2.5 bg-surface2 border-b border-border">
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-[#ff5f56]" />
          <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
          <span className="w-3 h-3 rounded-full bg-[#27c93f]" />
        </div>
        <span className="flex-1 text-center font-mono text-[11px] font-semibold
                         text-muted-foreground">
          {title}
        </span>
        {scenarioTag && (
          <span className="font-mono text-[10px] text-muted-foreground/60">{scenarioTag}</span>
        )}
        {badgeVariant === "disabled" && (
          <span className="font-mono text-[9px] uppercase tracking-widest px-2 py-0.5
                           rounded border border-warning/30 bg-warning/10 text-warning">
            DISABLED
          </span>
        )}
        {badgeVariant === "readonly" && (
          <span className="font-mono text-[9px] uppercase tracking-widest px-2 py-0.5
                           rounded border border-info/30 bg-info/10 text-info">
            READ-ONLY
          </span>
        )}
      </div>

      {/* Two-column body */}
      <div className="grid grid-cols-2 divide-x divide-border">
        {/* Left — element zone */}
        <div className="p-5 flex flex-col gap-4">
          <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
            Element
          </span>
          <div className="flex flex-col items-start gap-2">{leftColumn}</div>
          <span className="text-[11px] text-muted-foreground/70 italic">{hint}</span>
        </div>

        {/* Right — output + code */}
        <div className="p-5 bg-bg2 flex flex-col gap-3">
          <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
            Output
          </span>

          {/* Terminal-style output zone */}
          <div className="bg-bg border border-border rounded-lg overflow-hidden">
            <div
              className={cn(
                "px-3 py-1.5 border-b border-border font-mono text-[10px] transition-colors",
                fired ? "text-success" : "text-muted-foreground/50"
              )}
            >
              {fired ? "● FIRED" : "○ WAITING"}
            </div>
            <div className="p-3 min-h-[52px] flex items-center">
              <span id={resultId} className="text-[12px] text-muted-foreground font-mono">
                No action yet…
              </span>
            </div>
          </div>

          {/* Inline code snippet */}
          <div className="bg-bg border border-border rounded-lg overflow-hidden">
            <div className="flex items-center justify-between px-3 py-1.5 border-b border-border">
              <span className="font-mono text-[10px] text-muted-foreground">{codeLabel}</span>
              <Button variant="ghost" size="sm"
                      onClick={handleCopy}
                      className="h-5 px-1.5 text-[9px] font-mono text-muted-foreground">
                {copied ? "✓" : "Copy"}
              </Button>
            </div>
            <pre className="p-3 text-[11px] leading-5 font-mono text-muted-foreground overflow-x-auto">
              {codeSnippet}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
```

### `MethodSummaryTable`
```tsx
// components/practice/method-summary-table.tsx
import type { MethodRow } from "@/data/practice-data/types";

interface MethodSummaryTableProps {
  rows: MethodRow[];
}

export function MethodSummaryTable({ rows }: MethodSummaryTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-sm border border-border rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-surface2">
            {["Action", "Selenium (Java)", "Playwright (JS)", "Playwright (Python)", "Cypress"].map(h => (
              <th key={h} className="py-2.5 px-4 text-left font-mono text-[10px] uppercase
                                     tracking-widest text-muted-foreground border-b border-border">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr
              key={i}
              className="border-b border-border last:border-0 even:bg-surface/30
                         hover:bg-surface/50 transition-colors"
            >
              <td className="py-2.5 px-4 font-medium text-foreground text-[13px]">{row.action}</td>
              {[row.selenium, row.playwrightJs, row.playwrightPy, row.cypress].map((cell, ci) => (
                <td key={ci} className="py-2.5 px-4">
                  <code className="font-mono text-[12px] text-primary bg-primary/8
                                   px-1.5 py-0.5 rounded-sm">
                    {cell}
                  </code>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
```

### `FaqBlock` (shadcn Accordion)
```tsx
// components/practice/faq-block.tsx
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { FaqItem } from "@/data/practice-data/types";

interface FaqBlockProps {
  items: FaqItem[];
}

export function FaqBlock({ items }: FaqBlockProps) {
  return (
    <Accordion type="multiple" className="flex flex-col gap-2">
      {items.map((item, i) => (
        <AccordionItem
          key={i}
          value={`faq-${i + 1}`}
          data-testid={item.testId ?? `faq-${i + 1}`}
          className="border border-border rounded-lg px-4 bg-surface"
        >
          <AccordionTrigger
            className="font-sans font-medium text-[0.9rem] text-foreground
                       hover:text-primary hover:no-underline py-4"
          >
            {item.question}
          </AccordionTrigger>
          <AccordionContent className="text-muted-foreground text-[0.88rem]
                                       leading-7 pb-4">
            {item.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
```

### `LearnToc`
```tsx
// components/practice/learn-toc.tsx
"use client";

import { useEffect, useState } from "react";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import type { TocItem } from "@/data/practice-data/types";

interface LearnTocProps {
  items: TocItem[];
}

export function LearnToc({ items }: LearnTocProps) {
  const [active, setActive] = useState<string>(items[0]?.id ?? "");

  useEffect(() => {
    const sections = items
      .map(item => document.getElementById(item.id))
      .filter(Boolean) as HTMLElement[];

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-30% 0px -60% 0px" }
    );

    sections.forEach(s => observer.observe(s));
    return () => observer.disconnect();
  }, [items]);

  function handleClick(e: React.MouseEvent<HTMLAnchorElement>, id: string) {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setActive(id);
  }

  return (
    <nav
      aria-label="Table of contents"
      className="sticky top-[var(--panel-top,160px)] flex flex-col"
    >
      <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-3">
        On This Page
      </span>
      {items.map((item, i) => (
        <span key={item.id}>
          {item.dividerBefore && <Separator className="my-2 bg-border" />}
          <a
            href={`#${item.id}`}
            onClick={e => handleClick(e, item.id)}
            className={cn(
              "block text-[12px] py-1 transition-colors leading-snug",
              active === item.id
                ? "text-primary font-medium"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {item.label}
          </a>
        </span>
      ))}
    </nav>
  );
}
```

---

## 7. CSS Module Templates

### `components/practice/code-block.module.css`
```css
/* Syntax highlight tokens for code blocks */
/* Used by FrameworkCodeBlock and InlinePlayground */

.codeBody {
  color: var(--text-muted);
  line-height: 1.6;
  tab-size: 2;
}

/* Keywords: await, const, new, async, return */
.codeBody :global(.kw) { color: var(--accent2); font-weight: 600; }

/* Function calls: click(), fill(), findElement() */
.codeBody :global(.fn) { color: var(--accent); }

/* String literals: 'text', "text" */
.codeBody :global(.str) { color: var(--warning); }

/* Comments: // comment */
.codeBody :global(.cm) { color: var(--text-dim); font-style: italic; }

/* Numbers: 1500, 0, 100 */
.codeBody :global(.nm) { color: var(--accent3); }

/* Light theme overrides */
[data-theme="light"] .codeBody :global(.kw) { color: var(--accent2); }
[data-theme="light"] .codeBody :global(.fn) { color: var(--accent); }
[data-theme="light"] .codeBody :global(.str) { color: #b45309; }
[data-theme="light"] .codeBody :global(.cm) { color: var(--text-dim); }
[data-theme="light"] .codeBody :global(.nm) { color: var(--accent3); }
```

### `app/practice/[element]/_components/practice-layout.module.css`
```css
/* Practice tab grid layout */
/* Controls sticky panel heights via CSS vars */

.practiceLayout {
  display: grid;
  grid-template-columns: 1fr 320px;
  min-height: calc(100vh - 160px);
  border-left: 1px solid var(--border);
  border-right: 1px solid var(--border);
  max-width: 1200px;
  margin: 0 auto;
}

/* CSS vars for sticky offset calculations */
.practiceLayout {
  --nav-h: 60px;
  --header-h: 148px;
  --tabs-h: 48px;
  --panel-top: calc(var(--nav-h) + var(--header-h) + var(--tabs-h));
}

.scenariosCol {
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  border-right: 1px solid var(--border);
}

.colHeading {
  font-family: var(--font-mono);
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--text-dim);
  margin-bottom: 4px;
}

/* Learn tab grid */
.learnLayout {
  display: grid;
  grid-template-columns: 1fr 200px;
  gap: 48px;
  max-width: 1200px;
  margin: 0 auto;
  padding: 32px 24px;
}

@media (max-width: 1024px) {
  .practiceLayout {
    grid-template-columns: 1fr;
  }
  .learnLayout {
    grid-template-columns: 1fr;
  }
}
```

---

## 8. Full Page Composition Example

### `app/practice/[element]/_components/practice-page.tsx`
```tsx
"use client";

import { PageHeader }         from "@/components/practice/page-header";
import { MainTabs }           from "@/components/practice/main-tabs";
import { ScenarioCard }       from "@/components/practice/scenario-card";
import { CodePanel }          from "@/components/practice/code-panel";
import { TestCasesTable }     from "@/components/practice/test-cases-table";
import { DocSection }         from "@/components/practice/doc-section";
import { InlinePlayground }   from "@/components/practice/inline-playground";
import { MethodSummaryTable } from "@/components/practice/method-summary-table";
import { FaqBlock }           from "@/components/practice/faq-block";
import { LearnToc }           from "@/components/practice/learn-toc";
import type {
  PracticePageMeta, CodeSnippets, TestCase, MethodRow, FaqItem, TocItem,
} from "@/data/practice-data/types";
import styles from "./practice-layout.module.css";

interface PracticePageProps {
  meta: PracticePageMeta;
  codeSnippets: CodeSnippets;
  testCases: TestCase[];
  methodRows: MethodRow[];
  faqItems: FaqItem[];
  tocItems: TocItem[];
}

export function PracticePage({
  meta, codeSnippets, testCases, methodRows, faqItems, tocItems,
}: PracticePageProps) {
  return (
    <div data-testid={`${meta.element}-page`} data-section="practice" data-element={meta.element}>
      {/* Page header */}
      <PageHeader
        title={meta.title}
        description={meta.description}
        level={meta.level}
        durationMin={meta.durationMin}
        scenarioCount={meta.scenarioCount}
        breadcrumb={meta.breadcrumb}
      />

      {/* Three-tab shell */}
      <MainTabs
        scenarioCount={meta.scenarioCount}
        testCaseCount={meta.testCaseCount}

        /* ── Practice tab ── */
        practiceContent={
          <div className={styles.practiceLayout}>
            {/* Left: scenario cards */}
            <section className={styles.scenariosCol} aria-label="Interactive Scenarios">
              <div className={styles.colHeading}>Interactive Scenarios</div>

              {/*
                ┌──────────────────────────────────────────────────────────────────┐
                │ Place ScenarioCard instances here — one per scenario.            │
                │ The interactive element (Button, Input, etc.) goes as children.  │
                │ Wire up click/input handlers inside the scenario card or in a    │
                │ separate client hook.                                            │
                └──────────────────────────────────────────────────────────────────┘
              */}
              <ScenarioCard
                id="S01"
                title="Example Scenario"
                testId="scenario-example"
                resultId="res-example"
                initialResult="Waiting for interaction…"
              >
                {/* <Button id="btn-example" data-testid="btn-example">Click Me</Button> */}
              </ScenarioCard>
            </section>

            {/* Right: sticky code panel */}
            <CodePanel
              totalScenarios={meta.scenarioCount}
              snippets={codeSnippets}
              keyMethods={[
                { color: "green",  label: "sendKeys() / fill() / type()" },
                { color: "blue",   label: "clear() / fill('')" },
                { color: "orange", label: "getAttribute('value') / inputValue()" },
              ]}
              upNext={meta.upNext}
            />
          </div>
        }

        /* ── Test Cases tab ── */
        testCasesContent={
          <div className="max-w-[1200px] mx-auto py-6 px-4">
            <TestCasesTable testCases={testCases} />
          </div>
        }

        /* ── Learn tab ── */
        learnContent={
          <div className={styles.learnLayout}>
            {/* Main doc content */}
            <main aria-label="Learn content">
              <DocSection id="learn-overview" sectionNum="→" heading="Overview">
                <p className="text-muted-foreground text-[0.95rem] leading-7">
                  {/* overview prose */}
                </p>
              </DocSection>

              {/* Add more DocSections here, each optionally containing
                  <InlinePlayground />, <MethodSummaryTable />, <FaqBlock /> */}

              <DocSection id="learn-methods" heading="Key Methods Summary">
                <MethodSummaryTable rows={methodRows} />
              </DocSection>

              <DocSection id="learn-faq" heading="FAQ">
                <FaqBlock items={faqItems} />
              </DocSection>
            </main>

            {/* Right TOC */}
            <LearnToc items={tocItems} />
          </div>
        }
      />
    </div>
  );
}
```

---

*When ready to build a real element page, say:*
> *"Create the full `[element]` practice page using the block architecture from practice-page-blocks.md"*
>
> *Or to customize a shadcn block:*
> *"Update the `FaqBlock` brand template so the accordion trigger uses Space Grotesk font and `--border-strong`"*
