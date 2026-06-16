---
name: page-metadata
description: Add or update SEO metadata for a Next.js App Router page in this project. Use whenever creating a new page/route or editing titles, descriptions, Open Graph, Twitter cards, canonical URLs, or robots rules. Centralized system driven by basicDetails + createPageMetadata.
---

# Page Metadata

This project manages SEO metadata from one place. Site-wide values live in a
single data file; each page supplies only a small page-specific payload, and a
builder merges them into a complete Next.js `Metadata` object.

Use this skill when you:

- create a new page/route and it needs a title/description/share image, or
- change any existing page's title, description, OG/Twitter, canonical, or robots.

## Architecture (where things live)

Per-page metadata is **grouped by top-level route** in its own folder under
`data/meta-data/`. Shared, site-wide infrastructure stays at the root of
`data/meta-data/`.

**Shared (root of `data/meta-data/`) — never duplicate per route:**

| File                                     | Responsibility                                                                                                                                    |
| ---------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| `types/meta-data-types.ts`               | Types: `SiteBasicDetails`, `PageMetadataInput`, `OpenGraphImage`, `SiteAuthor`.                                                                    |
| `data/meta-data/basic-details-data.ts`   | **Single source of truth** for site-wide values (name, URL, locale, author, twitter handle, default keywords, default OG image).                  |
| `data/meta-data/create-page-metadata.ts` | `createPageMetadata(input)` — merges page input with `basicDetails`, returns a full `Metadata` (canonical, robots, OG, Twitter, keywords, icons). |
| `data/meta-data/structured-data.ts`      | Generic, reusable JSON-LD **builders** (e.g. `createArticleJsonLd`). No page-specific instances live here.                                        |
| `data/meta-data/site-routes.ts`          | Route list powering `app/sitemap.ts`.                                                                                                             |

**Per-route folders — one folder per top-level route segment:**

| Path                                                  | Responsibility                                                                  |
| ----------------------------------------------------- | ------------------------------------------------------------------------------ |
| `data/meta-data/<route>/<page>-meta-data.ts`          | Thin per-page file that calls `createPageMetadata`.                             |
| `data/meta-data/<route>/<route>-structured-data.ts`   | Page-specific JSON-LD instances for that route (only if the route needs them).  |

Current layout (keep new files consistent with this):

```
data/meta-data/
├── basic-details-data.ts          (shared)
├── create-page-metadata.ts        (shared builder)
├── site-routes.ts                 (shared)
├── structured-data.ts             (shared JSON-LD builders)
├── home/
│   ├── home-page-meta-data.ts
│   └── home-structured-data.ts    (homePageJsonLd — uses createArticleJsonLd)
├── practice/
│   └── practice-page-meta-data.ts
└── demo/
    ├── demo-page-meta-data.ts       (/demo)
    ├── demo-bank-page-meta-data.ts  (/demo/bank)
    └── demo-shopping-page-meta-data.ts (/demo/shopping)
```

| File                | Responsibility                                                                                                  |
| ------------------- | -------------------------------------------------------------------------------------------------------------- |
| `app/layout.tsx`    | Site-wide defaults + title **template** (`%s \| QA Playground`) and `metadataBase`.                             |
| `app/**/page.tsx`   | `export const metadata = ...` for that route, imported from its route folder.                                   |

Data flow: `basicDetails` ➜ `createPageMetadata(pageInput)` in `data/meta-data/<route>/<page>-meta-data.ts` ➜ `export const metadata` in `page.tsx`. The root layout's template wraps child page titles automatically.

### Folder rules — when to create a new folder

- **One folder per top-level route segment.** The folder name = the first URL
  segment (`/demo/bank` and `/demo/shopping` both belong to `demo/`).
- **Create a new folder only for a brand-new top-level route** that has no folder
  yet (e.g. first time you add anything under `/blog`, create
  `data/meta-data/blog/`). Do **not** create a folder for a sub-route — nest its
  file inside the parent route's existing folder.
- **Keep route folders flat.** No sub-sub-folders for nested routes; use a
  descriptive file name instead (`demo-bank-page-meta-data.ts`, not
  `demo/bank/...`).
- **File naming:** `<descriptive-slug>-page-meta-data.ts`, where the slug
  reflects the full route (`demo-bank`, `demo-shopping`, `practice`, `home`).
- **Relative imports inside a route folder go up one level** to reach shared
  files: `import { createPageMetadata } from "../create-page-metadata";` (and
  `"../basic-details-data"`, `"../structured-data"`). Never `"./create-page-metadata"`.
- **Page-specific JSON-LD** (an actual exported instance, like `homePageJsonLd`)
  lives in the route folder (`<route>/<route>-structured-data.ts`) and imports the
  generic builder from `../structured-data`. The generic builder itself stays
  shared at the root.

## Steps: add metadata to a new page

1. **Pick (or create) the route folder.** Use `data/meta-data/<route>/` where
   `<route>` is the first URL segment. If that folder doesn't exist yet and this
   is a new top-level route, create it. For a sub-route (e.g. `/demo/bank`) use
   the parent folder (`data/meta-data/demo/`).

2. **Create a data file** `data/meta-data/<route>/<slug>-page-meta-data.ts`
   (note the `../` import — one level up to the shared builder):

   ```ts
   import { createPageMetadata } from "../create-page-metadata";

   export const practicePageMetadata = createPageMetadata({
     title: "Practice", // -> "Practice | QA Playground" via template
     description:
       "Hands-on Selenium, Playwright & Cypress challenges on real UI.",
     path: "/practice", // used for the canonical URL
   });
   ```

3. **Wire it into the route** `app/<route>/page.tsx` (import from the route folder):

   ```ts
   import { practicePageMetadata } from "@/data/meta-data/practice/practice-page-meta-data";

   export const metadata = practicePageMetadata;
   ```

4. **Typecheck & lint**: `npx tsc --noEmit` and `npm run lint`.
5. (Optional) **Verify rendered tags**: run `npm run dev`, then inspect the page `<head>` for `og:*` / `twitter:*` / `<link rel="canonical">`.
6. **Review**: invoke the **`review-page-metadata`** skill to confirm the new
   files and folder structure follow these guidelines (see "After you finish").

> The page component must stay a **Server Component** — `metadata` cannot be exported from a `"use client"` file. Keep interactivity in a child client component.

## `PageMetadataInput` options

| Field              | Required | Default                       | Notes                                                                      |
| ------------------ | -------- | ----------------------------- | -------------------------------------------------------------------------- |
| `title`            | yes      | —                             | Plain string; flows through the layout template. Max 70 chars in length.   |
| `description`      | no       | site description              | Keep ~150–160 chars, unique per page.                                      |
| `path`             | no       | `"/"`                         | Leading-slash route; builds the **canonical** URL.                         |
| `keywords`         | no       | `[]`                          | Merged + de-duped with `basicDetails.defaultKeywords`.                     |
| `ogImage`          | no       | `basicDetails.defaultOgImage` | 1200x630; provide `alt`.                                                   |
| `ogType`           | no       | `"website"`                   | Use `"article"` for blog/content pages.                                    |
| `noIndex`          | no       | `false`                       | `true` hides the page from search engines.                                 |
| `useAbsoluteTitle` | no       | `false`                       | `true` ignores the template (homepage uses this for the full brand title). |

## Important things to consider

- **Unique title + description per page** — never reuse the homepage copy. This is the highest-impact SEO factor.
- **Always set `path`** so each page gets a correct canonical URL (prevents duplicate-content issues).
- **`useAbsoluteTitle` is only for the homepage** (or pages that must carry the full brand). Everything else should pass a plain `title` and let the template add `| QA Playground`.
- **Change site-wide values in `basicDetails` only** — never hardcode the brand name, URL, or twitter handle in a page file.
- **`basicDetails.websiteURL` must be the real production origin with NO trailing slash** — it powers `metadataBase`, canonical, and absolute OG/Twitter image URLs.
- **OG image must exist in `public/`** (e.g. `public/og-image.png`, 1200x630) or share previews break.
- **Set `noIndex: true`** for private/utility routes (dashboards, auth callbacks, thank-you pages).
- **Dynamic routes** (e.g. `/blog/[slug]`): use `generateMetadata` instead of a static export, and still build the object via `createPageMetadata` inside it:
  ```ts
  export async function generateMetadata({ params }): Promise<Metadata> {
    const { slug } = await params;
    const post = await getPost(slug);
    return createPageMetadata({
      title: post.title,
      description: post.excerpt,
      path: `/blog/${slug}`,
      ogType: "article",
    });
  }
  ```
- **Don't put `icons` inside `openGraph`** — icons belong at the top level (the builder already handles this). The OG `siteName` key is `siteName`, not `site_name`.

## SEO rules when building metadata

- **Title ≠ H1 ≠ description.** The metadata `title` is for the browser tab /
  SERP; the on-page `<h1>` is separate content. Keep one H1 per page; don't
  duplicate copy across the three.
- **Title length:** aim for ~50–60 characters including the `| QA Playground`
  suffix. Front-load the most important keyword.
- **Description length:** ~150–160 characters, written for humans as a "click
  pitch," unique per page. Never leave the site default on a real content page.
- **Canonical on every page.** Always pass `path`. For paginated/filtered views,
  point the canonical at the primary clean URL.
- **Don't keyword-stuff.** Keywords are low ranking value here; keep them tidy
  and relevant — they mainly document intent.
- **Open Graph image:** 1200x630, descriptive `alt`, absolute URL (resolved via
  `metadataBase`). Every shareable page should resolve an image.
- **`ogType: "article"`** for blog/content posts (add author/published time via
  `generateMetadata` when available); `"website"` for marketing/app pages.
- **Index only what should rank.** `noIndex: true` on thin, private, duplicate,
  or utility pages (auth, dashboards, thank-you, previews).
- **Semantic, crawlable HTML.** Metadata complements—not replaces—proper heading
  hierarchy, descriptive link text, and `alt` on images.
- **Keep locale consistent** with `<html lang>` and `basicDetails.locale`.
- **Add structured data (JSON-LD)** for rich results where it fits (Organization,
  BreadcrumbList, FAQPage, Article) via `<script type="application/ld+json">`,
  kept in sync with visible content.

## Next.js best practices to follow

- **Use the Metadata API, never manual `<head>` tags.** Export `metadata`
  (static) or `generateMetadata` (dynamic); don't hand-write `<title>`/`<meta>`.
- **Static `metadata` when values are known at build time; `generateMetadata`
  only when they depend on params/data.** Don't reach for the async function
  unnecessarily.
- **Set `metadataBase` once** (root layout / builder) so relative canonical and
  OG/Twitter image URLs resolve to absolute — avoid hardcoded absolute URLs.
- **Title template lives in the layout**; page titles are plain strings that flow
  through it. Use `title.absolute` (via `useAbsoluteTitle`) to opt out.
- **Files exporting `metadata` stay Server Components.** Move interactivity into
  child `"use client"` components.
- **`viewport` and `themeColor` belong in a `viewport` export**, not `metadata`
  (deprecated there).
- **Cache data used in `generateMetadata`.** It runs during render; use `fetch`
  (auto-memoized) or React `cache` so it isn't fetched twice with the page.
- **Prefer file-based metadata** (`icon.png`, `opengraph-image.tsx`,
  `sitemap.ts`, `robots.ts`) where it fits better than config — it stays in sync
  with real files automatically.
- **Add `app/sitemap.ts` and `app/robots.ts`** for site-level crawl control, and
  keep page-level `robots` consistent with them.

## Strict rules (MUST follow)

Non-negotiable for this project. Do not deviate without explicit approval.

1. **Never hardcode site-wide values in a page.** Brand name, base URL, twitter
   handle, default keywords, and default OG image come from `basicDetails` only.
2. **Always build page metadata via `createPageMetadata`.** Don't export a raw
   `Metadata` object from a page (the root layout's defaults/template are the
   only exception).
3. **Always provide a unique `title` and `description`** on real content pages —
   never ship the default description on an indexable page.
4. **Always set `path`** so the canonical URL is correct.
5. **`basicDetails.websiteURL` = production origin, NO trailing slash.** Never
   commit a placeholder/localhost value as the canonical origin.
6. **`metadata`/`generateMetadata` only from Server Components.** Never add
   `"use client"` to a file that exports metadata.
7. **No `icons` inside `openGraph`; use `siteName` (not `site_name`).**
8. **`useAbsoluteTitle: true` is reserved for the homepage** (or an explicitly
   approved page); all others use the template.
9. **Typecheck must pass** (`npx tsc --noEmit`) before the change is done.
10. **Per-page metadata lives in its route folder** `data/meta-data/<route>/`,
    never loose at the root of `data/meta-data/`. Shared infra
    (`basic-details-data`, `create-page-metadata`, `structured-data`,
    `site-routes`) is the **only** thing allowed at the root.
11. **Imports inside a route folder use `../`** to reach shared files — never
    `./create-page-metadata`. Route `page.tsx` imports the
    `@/data/meta-data/<route>/<slug>-page-meta-data` path.
12. **No duplicate builders.** Reuse `createPageMetadata` /
    `createArticleJsonLd`; never copy them into a route folder.

## After you finish — chain the review

This skill is paired with **`review-page-metadata`**. As the final step of any
metadata change, **invoke the `review-page-metadata` skill** to validate the
files, folder placement, imports, and SEO rules. A PostToolUse hook also nudges
this automatically after `page-metadata` runs, but do not rely on it — call the
review skill explicitly so the change is verified before you report done.

## Quick checklist before finishing

- [ ] File created at `data/meta-data/<route>/<slug>-page-meta-data.ts` (correct route folder; new folder only for a new top-level route).
- [ ] Built with `createPageMetadata` (no raw `Metadata` object, no duplicated builder).
- [ ] Imports inside the file use `../` to reach shared files.
- [ ] `export const metadata` wired into the route's `page.tsx` (server component) via `@/data/meta-data/<route>/...`.
- [ ] `title` + `description` are unique and descriptive.
- [ ] `path` set for the canonical URL.
- [ ] Custom `ogImage` exists in `public/` (or default is acceptable).
- [ ] `noIndex` set if the page should not be indexed.
- [ ] `npx tsc --noEmit` and `npm run lint` pass.
- [ ] **`review-page-metadata` skill invoked** and its findings addressed.
