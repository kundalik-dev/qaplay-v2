@AGENTS.md

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

**Correct pattern — composition via props:**
Pass the Server Component's JSX as a `ReactNode` prop from a parent Server Component down into the Client Component. The Client Component never imports the Server Component directly.

```tsx
// ✅ page.tsx (Server Component) — renders the async SC and passes it as a prop
import { LearnTab } from "./_components/learn-tab";   // async Server Component
import { PracticePage } from "./_components/practice-page"; // 'use client'

export default function Page() {
  return <PracticePage learnContent={<LearnTab />} />;
}

// ✅ practice-page.tsx ('use client') — accepts it as ReactNode, never imports it
import type { ReactNode } from "react";
interface Props { learnContent: ReactNode; }
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
