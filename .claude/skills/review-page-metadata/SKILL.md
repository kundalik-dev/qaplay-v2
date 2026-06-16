---
name: review-page-metadata
description: Review page metadata files and folder structure against this project's guidelines. Use right after the page-metadata skill, or whenever metadata files under data/meta-data/ are created/changed, to verify route-folder placement, naming, imports, createPageMetadata usage, and SEO rules. Keywords: review metadata, validate metadata structure, check page metadata, audit SEO metadata.
---

# Review Page Metadata

This skill **audits** metadata work produced by the `page-metadata` skill. It
does not author metadata — it verifies that what was created or changed follows
the project's guidelines, then reports a clear PASS / FAIL with specific fixes.

Run this:

- immediately **after** the `page-metadata` skill finishes, or
- whenever files under `data/meta-data/` (or a `page.tsx` `metadata` export) are
  added or changed.

> Source of truth for the rules being checked: the `page-metadata` skill
> (`.claude/skills/page-metadata/SKILL.md`). Keep this reviewer in sync with it.

## What to review (scope)

Determine the changed surface first:

```bash
git status --porcelain data/meta-data app
git diff --stat
```

Review every added/modified file under `data/meta-data/` and every `app/**/page.tsx`
whose `metadata`/`generateMetadata` changed.

## Checklist — structure & placement

1. **Route-folder placement.** Each per-page file is at
   `data/meta-data/<route>/<slug>-page-meta-data.ts`, where `<route>` is the
   first URL segment. ❌ Fail if a per-page file sits loose at the root of
   `data/meta-data/`.
2. **Only shared infra at the root.** Root of `data/meta-data/` contains **only**
   `basic-details-data.ts`, `create-page-metadata.ts`, `structured-data.ts`,
   `site-routes.ts` (plus the route folders). Anything else at the root is a fail.
3. **One folder per top-level route; sub-routes nest in the parent folder.**
   `/demo/bank` and `/demo/shopping` live in `demo/`, not in `demo/bank/`.
   No sub-sub-folders. A new folder is justified **only** for a new top-level route.
4. **File naming** matches `<descriptive-slug>-page-meta-data.ts` and the slug
   reflects the full route (`demo-bank`, `demo-shopping`, `practice`, `home`).
5. **Relative imports go up one level.** Inside a route folder, shared imports use
   `../create-page-metadata`, `../basic-details-data`, `../structured-data`.
   ❌ Fail on any `./create-page-metadata` (etc.) inside a route folder.
6. **Page wiring.** The route's `app/<route>/page.tsx` imports from
   `@/data/meta-data/<route>/<slug>-page-meta-data` and does `export const metadata`.
7. **No duplicated builders.** `createPageMetadata` / `createArticleJsonLd` are
   imported, never copied into a route folder. Page-specific JSON-LD instances
   live in `<route>/<route>-structured-data.ts` and import the builder from `../structured-data`.

## Checklist — content & SEO

8. **Built via `createPageMetadata`** — no raw `Metadata` object exported from a
   page (root `layout.tsx` defaults are the only exception).
9. **Unique, descriptive `title` and `description`** — not the site default, not
   copied from another page. Title ~50–60 chars incl. ` | QA Playground`;
   description ~150–160 chars.
10. **`path` is set** for the canonical URL and matches the real route.
11. **`useAbsoluteTitle: true` only on the homepage** (or an explicitly approved
    page). Everything else flows through the title template (plain `title`).
12. **No hardcoded site-wide values** (brand, base URL, twitter handle, default
    keywords/OG image) in a page file — those come from `basicDetails`.
13. **Server Component.** The file exporting `metadata` has no `"use client"`.
14. **`noIndex: true`** present on thin/private/utility routes (auth, dashboards,
    thank-you, previews); absent on pages meant to rank.
15. **OG image** resolves (custom `ogImage` exists in `public/`, or default used).
16. **Dynamic routes** use `generateMetadata` (still via `createPageMetadata`),
    not a static export.

## Checklist — build health

17. `npx tsc --noEmit` passes.
18. `npm run lint` passes.
19. (When structure changed) `npm run build` succeeds and the expected routes
    appear in the route table.

Run them:

```bash
npx tsc --noEmit && npm run lint
```

## Output format (report)

Produce a concise report, not a narration:

```
## Page Metadata Review — <PASS | FAIL>

Scope: <files reviewed>

### Structure & placement
- ✅/❌ <rule> — <evidence / file:line>

### Content & SEO
- ✅/❌ <rule> — <evidence / file:line>

### Build health
- ✅/❌ tsc | lint | build

### Required fixes (if FAIL)
1. <file:line> — <what to change and why>
```

- **PASS** only when every applicable rule passes (skip rules that don't apply,
  and say so).
- For each ❌, give the exact file, the rule violated, and the concrete fix.
- If something is ambiguous (e.g. whether a route should be `noIndex`), flag it
  as a ⚠️ question rather than a hard fail.
- Do not modify files in this skill unless the user asks you to apply the fixes —
  this skill reviews; `page-metadata` authors.
