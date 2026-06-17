// ─── Core enumerations ──────────────────────────────────────────────────────
export type PracticeLevel    = "Beginner" | "Intermediate" | "Advanced";
export type TestCaseType     = "positive" | "negative" | "edge";
export type TestCasePriority = "high" | "medium" | "low";
export type Framework        = "playwright" | "selenium" | "cypress";
export type DotColor         = "green" | "blue" | "orange" | "yellow" | "purple";

// ─── Page header / meta ─────────────────────────────────────────────────────
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
    icon: string;
    title: string;
    description: string;
    href: string;
  };
}

// ─── Practice tab ────────────────────────────────────────────────────────────
export interface ScenarioMeta {
  id: string;               // "S01", "S02" …
  title: string;
  testId: string;           // data-testid for card root
  resultId: string;         // id for result <span>
  initialResult: string;
  badge?: string;           // e.g. "DISABLED"
  hint: string;             // shown when hint button pressed (HTML allowed)
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

export interface FrameworkMethods {
  label: string;            // e.g. "Selenium (Java)"
  methods: KeyMethod[];
}

// ─── Test Cases tab ──────────────────────────────────────────────────────────
export interface TestCase {
  id: string;               // e.g. "BTN_001"
  scenario: string;
  expected: string;
  type: TestCaseType;
  priority: TestCasePriority;
  steps: string[];          // HTML-safe strings
  note?: string;
}

// ─── Learn tab ───────────────────────────────────────────────────────────────
export interface LearnCodeSnippet {
  playwright: { lang: string; code: string };
  selenium: { lang: string; code: string };
  cypress: { lang: string; code: string };
}

export interface MethodRow {
  action: string;
  selenium: string;
  playwrightJs: string;
  playwrightPy: string;
  cypress: string;
}

export interface FaqItem {
  question: string;
  answer: string;           // plain text; <code> tags allowed
  testId?: string;
}

export interface TocItem {
  id: string;               // matches DocSection id prop
  label: string;
  dividerBefore?: boolean;
}
