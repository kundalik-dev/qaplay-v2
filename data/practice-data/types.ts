// ─── Core enumerations ──────────────────────────────────────────────────────
export type PracticeLevel    = "Beginner" | "Intermediate" | "Advanced";
export type TestCaseType     = "positive" | "negative" | "edge";
export type TestCasePriority = "high" | "medium" | "low";
export type Framework        = "playwright" | "selenium" | "cypress";
export type DotColor         = "green" | "blue" | "orange" | "yellow" | "purple";

// ─── Page header / meta ─────────────────────────────────────────────────────
export interface PracticePageMeta {
  /** Route slug, e.g. "buttons" */
  element: string;
  /** H1 text */
  title: string;
  /** Subtitle paragraph */
  description: string;
  level: PracticeLevel;
  durationMin: number;
  scenarioCount: number;
  testCaseCount: number;
  breadcrumb: Array<{ label: string; href?: string }>;
  upNext: {
    icon: string;      // emoji or lucide icon name
    title: string;
    description: string;
    href: string;
  };
}

// ─── Practice tab ────────────────────────────────────────────────────────────
export interface Scenario {
  /** "S01", "S02" … */
  id: string;
  title: string;
  /** data-testid for card root */
  testId: string;
  /** id for the result <span> */
  resultId: string;
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

// ─── Test Cases tab ──────────────────────────────────────────────────────────
export interface TestCase {
  /** e.g. "BTN_001" */
  id: string;
  scenario: string;
  expected: string;
  type: TestCaseType;
  priority: TestCasePriority;
  steps: string[];
  description?: string;
}

// ─── Learn tab ───────────────────────────────────────────────────────────────
export interface MethodRow {
  action: string;
  selenium: string;
  playwrightJs: string;
  playwrightPy: string;
  cypress: string;
}

export interface FaqItem {
  question: string;
  /** Plain text; can include <code> inline */
  answer: string;
  testId?: string;
}

export interface TocItem {
  /** Matches the DocSection id prop */
  id: string;
  /** TOC link text */
  label: string;
  /** Insert a separator above this item */
  dividerBefore?: boolean;
}

// ─── Full element page data bundle ───────────────────────────────────────────
export interface ElementPageData {
  meta: PracticePageMeta;
  codeSnippets: CodeSnippets;
  keyMethods: KeyMethod[];
  testCases: TestCase[];
  methodRows: MethodRow[];
  faqItems: FaqItem[];
  tocItems: TocItem[];
}
