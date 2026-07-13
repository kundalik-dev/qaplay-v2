---
name: new-ui-practice-route
description: >
  Use this skill EVERY TIME the user shares a static HTML/CSS/JS prototype (a
  single .html file with an inline <style> block and inline <script>, or
  separate .html/.css/.js files) and asks to turn it into a page under
  app/(demo)/ui-practice/[section]. Trigger on requests like "create a new
  ui-practice route from this html", "render this as a /ui-practice/[section]
  page", "convert this prototype to Next.js", or any time a new directory is
  being added under app/(demo)/ui-practice/. This skill covers the exact file
  structure, the plain-CSS scoping approach (deliberately NOT CSS Modules),
  how to port vanilla-JS DOM logic to React hooks, and the sidebar
  registration step. Do NOT start converting a prototype into a ui-practice
  route without reading this skill first — the whole point of these routes is
  stable, unchanged locators for Playwright/Selenium/Cypress practice, and
  it's easy to accidentally break that by "cleaning up" markup or letting
  CSS Modules hash the class names.
---

# New UI Practice Route — QA Playground V2

> **Reference implementation**: `app/(demo)/ui-practice/tables/`
> Read `page.tsx` and every file in `_components/` before converting a new
> prototype. It is the canonical example this skill is describing.

The `/ui-practice/*` section is a standalone area (sidebar + scrollable
content, global top nav hidden) of standalone UI elements for practicing
Playwright/Selenium/Cypress locators. Each section starts life as a
hand-built static HTML/CSS/JS prototype the user shares in chat. Your job is
to reproduce it **pixel-for-pixel and locator-for-locator** as a Next.js
route — not to redesign it, rename its classes, or "improve" its markup.

---

## 0. The one rule that overrides everything else below

**Preserve every `id`, `class`, `data-testid`, and DOM element/attribute from
the source HTML exactly.** These routes exist specifically so QA learners can
practice locators — a renamed class or a merged `<div>` silently breaks the
whole point of the page. If something in the source seems redundant or
oddly structured, keep it anyway. The only things you're allowed to change
are: inline `style="..."` attributes (move to CSS, see §3) and vanilla JS
DOM-manipulation (convert to React state, see §4).

---

## 1. Complete File Checklist

A new section named `[section]` (e.g. `tables`, `iframes`, `dialog`) creates:

```
app/(demo)/ui-practice/[section]/
├── page.tsx
└── _components/
    ├── [section]-practice.tsx        ← server-component orchestrator
    ├── [section].css                 ← plain CSS, NOT a .module.css (see §3)
    ├── [one file per <section> block in the source HTML]
    └── [shared pieces used by 2+ of the above, e.g. status-badge.tsx]

data/ui-practice-data/[section]-data.ts   ← typed hardcoded arrays from the <script>
```

Plus **1 registration step**: add an entry to
`data/ui-practice-nav-data.ts` (label, href `/ui-practice/[section]`, icon,
testId, description). The sidebar and the `/ui-practice` overview card grid
both read from that one file, so this is the only wiring needed — the
existing `app/(demo)/ui-practice/[...rest]/page.tsx` catch-all + scoped
`not-found.tsx` already handle every path that doesn't have a real page yet,
and Next.js automatically prefers your new static route over that catch-all
once `[section]/page.tsx` exists.

---

## 2. `page.tsx` — thin Server Component

Same shape every time. Metadata always goes through `createPageMetadata`.

```tsx
import { createPageMetadata } from "@/data/meta-data/create-page-metadata";

import { [Section]Practice } from "./_components/[section]-practice";

export const metadata = createPageMetadata({
  title: "[Section] Practice",
  description: "…",
  path: "/ui-practice/[section]",
});

export default function [Section]PracticePage() {
  return <[Section]Practice />;
}
```

---

## 3. Styling — plain CSS, deliberately NOT a CSS Module

This is the part most likely to be done wrong by default. Normal project
convention (see root `CLAUDE.md`) is "prefer scoped CSS Modules." **Do not
use a `.module.css` file for these prototype ports.** CSS Modules hash every
class name at build time (`section` becomes something like
`tables-module__c3dGWq__section`), which breaks pixel/locator parity with
the source HTML the user is comparing against in DevTools.

Instead:

1. Name the file `[section].css` (no `.module`).
2. Copy the prototype's `<style>` block in as-is, keeping every class name
   and property exactly as authored.
3. Wrap **every single rule** — including bare tag selectors like `body`,
   `table`, `th`, `td`, `h1` — under one new, highly-specific wrapper class:
   `.ui-practice-[section]-page`. Never reuse the generic `.page` from
   another section's CSS file; each section needs its own unique wrapper so
   two sections' bare-tag rules can't collide.
   - `body { padding: 24px; background: #eee; }` becomes
     `.ui-practice-[section]-page { padding: 24px; }` — **drop the
     background unless the user explicitly wants a flat page background**;
     by default leave `background` off entirely so the app's shared
     grid-line/glow background (`app/globals.css`, applied on `<body>`)
     shows through instead of covering it. Only add a background back in if
     asked.
   - `.section h2 {...}` becomes `.ui-practice-[section]-page .section h2 {...}`.
   - `th[aria-sort="ascending"] .sort-icon::after` becomes
     `.ui-practice-[section]-page th[aria-sort="ascending"] .sort-icon::after`.
   - These prototypes consistently use a low-contrast muted blue-gray
     (commonly `#829ab1` for `.hint`, `#627d98`/`#486581` for an intro
     paragraph) for secondary text on a white `.section` card — this
     fails contrast in practice. Unless the user's source explicitly
     needs that exact color, darken `.hint` / `.intro` / `.intro-note`
     (or equivalent secondary-text classes) to the same dark body color
     already used elsewhere on the page (e.g. `#1f2933`) instead of
     porting the washed-out gray verbatim.
4. Any inline `style="..."` attribute in the source HTML (e.g.
   `style="align-self:flex-end"` on a button) must become a small dedicated
   class in this CSS file instead (project rule: no inline CSS anywhere).
   Name it descriptively (`.clear-btn-align`), don't reuse `.section` etc.
   for unrelated one-off tweaks.
5. Import the CSS file exactly **once**, as a side-effect import at the top
   of `[section]-practice.tsx` (the orchestrator):
   ```tsx
   import "./[section].css";
   ```
   Next.js App Router allows importing a plain (non-module) stylesheet from
   any component, not just the root layout — but it still loads globally
   once the route is visited, which is exactly why the `.ui-practice-
[section]-page` wrapper prefix on every rule matters.
6. In every component, use plain string `className`s exactly matching the
   source (`className="section"`, `className="badge badge-green"`,
   ``className={`pag-btn${p === page ? " active" : ""}`}``) — never
   `styles.xxx` / `styles["xxx"]` bracket access. The whole point is that
   `class="section"` in the browser DevTools matches the original prototype
   literally.
7. **Font**: override the prototype's `font-family: Arial, Helvetica,
sans-serif` on the `.ui-practice-[section]-page` wrapper to
   `var(--font-inter), Arial, Helvetica, sans-serif` instead — Inter is the
   route-wide default (also set on `.main` in
   `app/(demo)/ui-practice/_components/ui-practice.module.css`), so this
   just keeps the page self-contained/consistent rather than actually
   changing anything visually.
8. **Font sizes**: these prototypes are typically sized for a cramped
   standalone page (11-13px body text) and read as too small once embedded
   in the wider ui-practice shell. Bump every `font-size` up by roughly
   1-2px per the existing pattern in `tables.css` / `dialog.css` — e.g.
   `h1` 26px→30px, section `h2` 17px→19px, `.hint`/badges/table text
   12-13px→14px, buttons/inputs/labels 13-14px→15px, small badges/pills
   11px→12px — and set an explicit `font-size: 16px;` base on the wrapper
   itself (the source usually leaves this implicit at the browser default).

---

## 4. Converting vanilla JS to React

Read the prototype's `<script>` block section by section (it's usually one
IIFE per `<section>` in the HTML). For each one:

- **State**: every variable the script mutates and re-renders on
  (`sortCol`, `query`, `page`, `editingId`, a filtered/edited copy of the
  data array, ...) becomes a `useState`. Don't collapse independent pieces
  of state into one object unless the original script already did.
- **Derived data**: anything the script recomputes on every render
  (filtered rows, sorted rows, paginated slice) becomes a `useMemo` or a
  plain computation in the component body — don't store derived data in
  `useState` and sync it with `useEffect`. Never re-implement it by mutating
  the DOM directly.
- **Event handlers**: `addEventListener('click', ...)` /
  `addEventListener('input', ...)` become `onClick` / `onChange` props.
  Multi-step click cycles (e.g. unsorted → asc → desc → unsorted on a
  3rd click) must reproduce the exact same state machine as the original —
  re-read the original handler carefully, these are easy to get subtly
  wrong.
- **Rendering**: `innerHTML = rows.map(...).join('')` becomes
  `{rows.map((row) => <tr key={row.id} data-testid={...}>...)}`. Keep every
  `data-testid` template exactly the same (e.g. `` `sort-row-${e.id}` ``).
- **Hardcoded arrays** (like an `EMPLOYEES` or `PRODUCTS` const in the
  script) move into a typed file under `data/ui-practice-data/[section]-
data.ts`, exporting an interface + the array. This is the single source
  of truth — don't inline the data in a component.
- **Pure helper functions** (formatters, sort comparators, `aria-sort`
  resolution) move into a small `[section]-utils.ts` (or reuse
  `table-utils.ts`-style helpers if another section already has an
  equivalent) instead of living inside a component body.
- **Shared UI fragments used by 2+ sections** (a status badge, pagination
  controls) become their own small component instead of being duplicated —
  as long as the rendered markup/classes/testids stay pixel-identical to
  what each section's source HTML had.

### Server vs. Client components

- The **orchestrator** (`[section]-practice.tsx`) and **any section with no
  interactivity** (a purely static table, for example) stay plain Server
  Components — no `"use client"`.
- **Any section that holds state or an event handler** (sortable, search,
  pagination, edit/delete, combined grid, etc.) needs `"use client"` at the
  top of that file.
- `page.tsx` always stays a synchronous Server Component.

---

## 5. Verification checklist before calling it done

Run these greps over the new `_components/` folder before finishing:

1. Every `className="…"` / ``className={`…`}`` string used in the TSX
   resolves to an actual selector in `[section].css` (no typos, no
   leftover CSS-Module-style keys).
2. No `styles.` / `styles[` / `.module.css` reference anywhere.
3. No inline `style=` attribute anywhere.
4. Every `data-testid`, `id`, and `aria-*` value from the source HTML is
   still present, unchanged, in the ported component.
5. Only the sections that actually hold state are `"use client"`; the
   orchestrator and static sections are not.
6. The new section is registered in `data/ui-practice-nav-data.ts`.

If the sandbox's `node_modules` mount ever throws I/O errors and `tsc`/
`next build` can't run, fall back to the grep-based manual checks above
instead of guessing.
