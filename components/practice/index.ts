/**
 * Barrel export for all shared practice page blocks.
 * Import from "@/components/practice" anywhere in the app.
 */

// ── Page-level blocks ─────────────────────────────────────────────────────────
export { PracticeShell }        from "./practice-shell";
export { PracticePage }         from "./practice-page";
export { PageHeader }           from "./page-header";
export { MainTabs }             from "./main-tabs";
export { UpNextCard }           from "./up-next-card";

// ── Practice tab blocks ───────────────────────────────────────────────────────
export { ScenarioCard }         from "./scenario-card";
export { ProgressWidget }       from "./progress-widget";
export { FrameworkCodeBlock }   from "./framework-code-block";
export { CodePanel }            from "./code-panel";
export { TestCasesTable }       from "./test-cases-table";

// ── Learn tab blocks ──────────────────────────────────────────────────────────
export { DocSection, LearnProse, InlineCode } from "./doc-section";
export { InlinePlayground }     from "./inline-playground";
export { MethodSummaryTable }   from "./method-summary-table";
export { FaqBlock }             from "./faq-block";
export { LearnToc }             from "./learn-toc";
