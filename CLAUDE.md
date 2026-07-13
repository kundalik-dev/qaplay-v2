@AGENTS.md

## Bank App Rules

`bank-claude.md` (repo root, next to this file) holds rules specific to the `app/bank` module — its purpose and locator strategy conventions, with more coding rules to be added over time. Read it before working on anything under `app/bank`.

## UI Practice Route Conversion (HTML/CSS/JS Prototype → Route)

`.claude/skills/new-ui-practice-route/SKILL.md` holds the exact conversion pattern for turning a static HTML/CSS/JS prototype the user shares into a page under `app/(demo)/ui-practice/[section]` — file structure, the plain-CSS (non-module) scoping approach so class names stay literal, how to port vanilla JS to React hooks, and the sidebar registration step. Read it before creating or converting anything under `app/(demo)/ui-practice/`. Reference implementation: `app/(demo)/ui-practice/tables/`.

## Project Intent

This project is a modern, full-width QA learning platform focused on:

- Practicing Playwright, Selenium, and Cypress on realistic UI elements
- Creating strong landing pages and product sections that feel polished and intentional
- Keeping the UI automation-friendly, SEO-friendly, and maintainable

The AI should optimize for:

- Clear structure
- Reusable components
- Stable selectors
- Good performance
- Good SEO
- Clean long-term maintainability

## Primary References

Use these files as the main source of truth for homepage structure and visual direction:

- HTML reference: `docs\modern-qaplay\html-app\index.html`
- CSS reference: `docs\modern-qaplay\html-app\style.css`

Before creating or redesigning homepage sections, review these reference files first.

Also use the `docs` folder whenever more design or UI context is needed.

## Core Working Rules

### Architecture

- Prefer small, reusable, composable components over large monolithic files.
- Split sections into focused components and stitch them together cleanly.
- Prefer server components by default when the feature allows it.
- Only use client components when interactivity, browser APIs, or client-only state are actually needed.
- Keep content/config/data in the `data` folder whenever possible so it stays easy to maintain and update.

### Component Colocation

- For every page except the landing page (`app/page.tsx`), keep that route's components in a route-local `_components` folder (e.g. `app/demo/_components`, `app/practice/_components`).
- The `_components` folder is a private folder (excluded from routing) and should hold the components plus their scoped CSS modules used only by that route.
- Import route-local components with relative paths (e.g. `./_components/...`), not the global `@/components` alias.
- Reserve the top-level `components` folder for genuinely shared, cross-route components (such as `app-nav`, `ui`, `seo`) and landing-page sections.

### Styling

- Follow the existing design tokens, CSS variables, and theme system already defined in the project.
- Do not introduce ad-hoc styling when an existing token or reusable pattern already solves the problem.
- Do not use inline CSS.
- Prefer scoped CSS modules for section-specific styling.
- Keep `globals.css` limited to truly global concerns such as tokens, resets, and shared layout primitives.
- If styling is reusable across multiple sections, extract it into a shared reusable pattern instead of duplicating it.

### Landing Page Design

- Use the full available screen width for landing page design.
- Match the structure and quality level of the provided design references.
- Keep sections visually intentional, clean, and modern.
- Avoid generic, weak, or inconsistent layouts.

### Performance

- Follow current Next.js best practices for performance.
- Prefer server rendering, static rendering, and lightweight component trees where appropriate.
- Avoid unnecessary client-side logic.
- Avoid unnecessary global CSS growth.
- Reuse shared UI primitives instead of rebuilding similar patterns repeatedly.

### SEO

- Follow current Next.js best practices for SEO.
- Prefer semantic HTML and meaningful heading hierarchy.
- Drive metadata from structured data files whenever possible so content is easy to update.
- Keep pages crawlable and content-forward.

## Automation-Friendly UI Rules

This site helps users practice automation with Playwright, Selenium, and Cypress. Because of that, every new UI feature should be built with stable selectors and testability in mind.

- Always add stable `data-testid` attributes to:
  - every new section
  - important cards
  - key interactive controls
  - practice elements
- Prefer readable kebab-case ids and test ids such as:
  - `home-hero`
  - `practice-card-forms-inputs`
  - `cta-start-practicing`
  - `faq-trigger-1`
- Use automation-friendly attribute names and values that are easy to target with:
  - Playwright `getByTestId`
  - Cypress selectors
  - Selenium locators
  - CSS selectors
  - XPath
- Add helpful supporting attributes where useful, such as:
  - `data-section`
  - `data-card`
  - `data-level`
  - `data-cta`
  - `data-step`
  - `data-supported-frameworks`
- Keep DOM structure accessible and locator-friendly.
- Avoid unstable selectors based on fragile nesting, random values, or styling-only hooks.

## Homepage Section Rules

When creating or updating homepage sections:

- Start from the reference HTML structure in `docs\modern-qaplay\html-app\index.html`
- Use the reference CSS in `docs\modern-qaplay\html-app\style.css` as the visual benchmark
- Recreate the design using this repo’s current component structure, tokens, and styling system
- Prefer one folder per section when the section is substantial
- Keep non-repeated section CSS inside that section’s own CSS module
- Extract only genuinely shared patterns into shared files

## What To Avoid

- Do not use inline CSS.
- Do not ignore the provided design references when building homepage sections.
- Do not put section-specific styling into `globals.css` unless it is truly global.
- Do not create oversized components that mix layout, content, styling, and logic unnecessarily.
- Do not hardcode content in many places when it can live once in the `data` folder.
- Do not add unstable or hard-to-target markup that weakens test automation use cases.

### Server / Client Component Boundary — Do Not Import async Server Components into Client Components

**Do not import an `async` Server Component directly inside a `'use client'` component.** Next.js will treat the imported module as a Client Component, and async Client Components are not supported — this causes the runtime errors:

- `<X> is an async Client Component. Only Server Components can be async`
- `A component was suspended by an uncached promise`

**Root cause:** When a `'use client'` file statically imports any module, that module is bundled for the client. If the imported component is `async`, it breaks at runtime.

**Additional limitation — do not pass async Server Components as JSX props either:**
Even with the composition pattern (passing `<LearnTab />` as a `ReactNode` prop from a Server Component), async Server Components can still fail at runtime in Next.js 16 / React 19 because the RSC runtime may serialize the component reference rather than pre-rendering it, causing the same error on the client.

**Correct pattern — move async work to `page.tsx`, keep child components sync:**
Do all `await` work in the page (a Server Component). Pass the pre-computed serializable data as props to child components, which remain synchronous.

```tsx
// ✅ page.tsx (async Server Component) — does all the async work
import { LearnTab } from "./_components/learn-tab"; // sync Server Component
import { PracticePage } from "./_components/practice-page"; // 'use client'
import { highlightLearnSnippet } from "@/lib/highlight";
import { myLearnCode } from "@/data/practice-data/my-route/learn";

export default async function MyPage() {
  const [snippet1, snippet2] = await Promise.all([
    highlightLearnSnippet(myLearnCode.snippet1),
    highlightLearnSnippet(myLearnCode.snippet2),
  ]);

  return (
    <PracticePage
      learnContent={<LearnTab snippets={{ snippet1, snippet2 }} />}
    />
  );
}

// ✅ learn-tab.tsx (sync Server Component) — receives pre-computed data, no async
import type { HighlightedLearnCodeSnippet } from "@/data/practice-data/types";
interface LearnTabProps {
  snippets: {
    snippet1: HighlightedLearnCodeSnippet;
    snippet2: HighlightedLearnCodeSnippet;
  };
}
export function LearnTab({ snippets }: LearnTabProps) {
  return <div>...</div>;
}

// ✅ practice-page.tsx ('use client') — accepts ReactNode, never imports LearnTab
import type { ReactNode } from "react";
interface Props {
  learnContent: ReactNode;
}
export function PracticePage({ learnContent }: Props) {
  return <div>{learnContent}</div>;
}
```

Applied to all practice routes: `buttons`, `forms`, `input-fields`, `data-table`, `dropdowns`.

## Decision Priority

When multiple approaches are possible, prefer the option that best satisfies this order:

1. Matches project intent and reference design
2. Preserves maintainability and reuse
3. Improves automation friendliness
4. Improves performance and SEO
5. Minimizes unnecessary complexity

<!-- gitnexus:start -->

# GitNexus — Code Intelligence

This project is indexed by GitNexus as **qaplayground-v2** (2360 symbols, 4590 relationships, 69 execution flows). Use the GitNexus MCP tools to understand code, assess impact, and navigate safely.

> If any GitNexus tool warns the index is stale, run `npx gitnexus analyze` in terminal first.

## Always Do

- **MUST run impact analysis before editing any symbol.** Before modifying a function, class, or method, run `gitnexus_impact({target: "symbolName", direction: "upstream"})` and report the blast radius (direct callers, affected processes, risk level) to the user.
- **MUST run `gitnexus_detect_changes()` before committing** to verify your changes only affect expected symbols and execution flows.
- **MUST warn the user** if impact analysis returns HIGH or CRITICAL risk before proceeding with edits.
- When exploring unfamiliar code, use `gitnexus_query({query: "concept"})` to find execution flows instead of grepping. It returns process-grouped results ranked by relevance.
- When you need full context on a specific symbol — callers, callees, which execution flows it participates in — use `gitnexus_context({name: "symbolName"})`.

## When Debugging

1. `gitnexus_query({query: "<error or symptom>"})` — find execution flows related to the issue
2. `gitnexus_context({name: "<suspect function>"})` — see all callers, callees, and process participation
3. `READ gitnexus://repo/qaplayground-v2/process/{processName}` — trace the full execution flow step by step
4. For regressions: `gitnexus_detect_changes({scope: "compare", base_ref: "main"})` — see what your branch changed

## When Refactoring

- **Renaming**: MUST use `gitnexus_rename({symbol_name: "old", new_name: "new", dry_run: true})` first. Review the preview — graph edits are safe, text_search edits need manual review. Then run with `dry_run: false`.
- **Extracting/Splitting**: MUST run `gitnexus_context({name: "target"})` to see all incoming/outgoing refs, then `gitnexus_impact({target: "target", direction: "upstream"})` to find all external callers before moving code.
- After any refactor: run `gitnexus_detect_changes({scope: "all"})` to verify only expected files changed.

## Never Do

- NEVER edit a function, class, or method without first running `gitnexus_impact` on it.
- NEVER ignore HIGH or CRITICAL risk warnings from impact analysis.
- NEVER rename symbols with find-and-replace — use `gitnexus_rename` which understands the call graph.
- NEVER commit changes without running `gitnexus_detect_changes()` to check affected scope.

## Tools Quick Reference

| Tool             | When to use                   | Command                                                                 |
| ---------------- | ----------------------------- | ----------------------------------------------------------------------- |
| `query`          | Find code by concept          | `gitnexus_query({query: "auth validation"})`                            |
| `context`        | 360-degree view of one symbol | `gitnexus_context({name: "validateUser"})`                              |
| `impact`         | Blast radius before editing   | `gitnexus_impact({target: "X", direction: "upstream"})`                 |
| `detect_changes` | Pre-commit scope check        | `gitnexus_detect_changes({scope: "staged"})`                            |
| `rename`         | Safe multi-file rename        | `gitnexus_rename({symbol_name: "old", new_name: "new", dry_run: true})` |
| `cypher`         | Custom graph queries          | `gitnexus_cypher({query: "MATCH ..."})`                                 |

## Impact Risk Levels

| Depth | Meaning                               | Action                |
| ----- | ------------------------------------- | --------------------- |
| d=1   | WILL BREAK — direct callers/importers | MUST update these     |
| d=2   | LIKELY AFFECTED — indirect deps       | Should test           |
| d=3   | MAY NEED TESTING — transitive         | Test if critical path |

## Resources

| Resource                                         | Use for                                  |
| ------------------------------------------------ | ---------------------------------------- |
| `gitnexus://repo/qaplayground-v2/context`        | Codebase overview, check index freshness |
| `gitnexus://repo/qaplayground-v2/clusters`       | All functional areas                     |
| `gitnexus://repo/qaplayground-v2/processes`      | All execution flows                      |
| `gitnexus://repo/qaplayground-v2/process/{name}` | Step-by-step execution trace             |

## Self-Check Before Finishing

Before completing any code modification task, verify:

1. `gitnexus_impact` was run for all modified symbols
2. No HIGH/CRITICAL risk warnings were ignored
3. `gitnexus_detect_changes()` confirms changes match expected scope
4. All d=1 (WILL BREAK) dependents were updated

## Keeping the Index Fresh

After committing code changes, the GitNexus index becomes stale. Re-run analyze to update it:

```bash
npx gitnexus analyze
```

If the index previously included embeddings, preserve them by adding `--embeddings`:

```bash
npx gitnexus analyze --embeddings
```

To check whether embeddings exist, inspect `.gitnexus/meta.json` — the `stats.embeddings` field shows the count (0 means no embeddings). **Running analyze without `--embeddings` will delete any previously generated embeddings.**

> Claude Code users: A PostToolUse hook handles this automatically after `git commit` and `git merge`.

## CLI

| Task                                         | Read this skill file                                        |
| -------------------------------------------- | ----------------------------------------------------------- |
| Understand architecture / "How does X work?" | `.claude/skills/gitnexus/gitnexus-exploring/SKILL.md`       |
| Blast radius / "What breaks if I change X?"  | `.claude/skills/gitnexus/gitnexus-impact-analysis/SKILL.md` |
| Trace bugs / "Why is X failing?"             | `.claude/skills/gitnexus/gitnexus-debugging/SKILL.md`       |
| Rename / extract / split / refactor          | `.claude/skills/gitnexus/gitnexus-refactoring/SKILL.md`     |
| Tools, resources, schema reference           | `.claude/skills/gitnexus/gitnexus-guide/SKILL.md`           |
| Index, status, clean, wiki CLI commands      | `.claude/skills/gitnexus/gitnexus-cli/SKILL.md`             |

<!-- gitnexus:end -->
