---
name: page-jsonld
description: Add or update JSON-LD structured data for a Next.js App Router page in this project. Use whenever creating a new page JSON-LD file, wiring JSON-LD into `app/**/page.tsx` or `app/layout.tsx`, choosing schema types like `WebPage`, `BreadcrumbList`, `FAQPage`, `Article`, `Organization`, or `WebSite`, or extending the shared builders in `data/meta-data/structured-data.ts`. Follow the repo SEO guidance in `docs/seo-docs/jsonld-importance-and-required-fields.md`.
---

# Page JSON-LD

This project manages structured data through shared builders plus small,
page-specific JSON-LD data files. Use this skill to create JSON-LD for new
pages, improve existing JSON-LD, and keep schema output aligned with visible
content and metadata.

Primary source of truth for SEO expectations:

- `docs/seo-docs/jsonld-importance-and-required-fields.md`

Read that document before making schema decisions. It defines the most important
fields, the recommended schema types for this site, and what matters most for SEO.

## Architecture

Shared infrastructure:

| File | Responsibility |
| --- | --- |
| `data/meta-data/structured-data.ts` | Shared JSON-LD builders such as `createWebPageJsonLd`, `createBreadcrumbJsonLd`, `createFaqPageJsonLd`, `createArticleJsonLd`, `createOrganizationJsonLd`, `createWebSiteJsonLd`. |
| `types/meta-data-types.ts` | Shared input types for JSON-LD builders. |
| `components/seo/json-ld.tsx` | Renders JSON-LD as a native `<script type="application/ld+json">`. |
| `data/meta-data/basic-details-data.ts` | Site-wide source of truth for brand name, origin, author, default image, publisher logo, locale. |
| `data/meta-data/site-structured-jsonld-data.ts` | Site-level `Organization` / `WebSite` instances used by `app/layout.tsx`. |

Page-specific JSON-LD files:

| Path | Responsibility |
| --- | --- |
| `data/meta-data/<route>/<route>-structured-jsonld-data.ts` | JSON-LD objects exported for a top-level route page such as `/practice` or `/home`. |
| `data/meta-data/<route>/<slug>-structured-jsonld-data.ts` | JSON-LD objects for nested routes such as `/demo/bank`. |

Wiring:

| File | Responsibility |
| --- | --- |
| `app/layout.tsx` | Renders site-level JSON-LD like `Organization` and `WebSite`. |
| `app/**/page.tsx` | Renders page-level JSON-LD with `<JsonLd data={...} />`. |

## File placement and naming patterns

Follow these patterns exactly:

1. Keep reusable builders in `data/meta-data/structured-data.ts`.
2. Keep builder input types in `types/meta-data-types.ts`.
3. Keep site-wide schema instances in `data/meta-data/site-structured-jsonld-data.ts`.
4. Keep page-specific schema instances inside the route folder under `data/meta-data/<route>/`.
5. Name page-specific JSON-LD files with the full route meaning:
   - `home/home-structured-jsonld-data.ts`
   - `practice/practice-structured-jsonld-data.ts`
   - `demo/demo-bank-structured-jsonld-data.ts`
6. For nested routes, keep the file in the top-level route folder, not in subfolders.
7. Inside route folders, import shared builders with `../structured-data` and shared site values with `../basic-details-data`.
8. Import JSON-LD data into route files using `@/data/meta-data/...`.

## Default schema selection rules

Use the smallest truthful set of schema types.

For this project, default to:

- Every important page: `WebPage`
- Nested or navigational pages: `BreadcrumbList`
- Visible FAQ section: `FAQPage`
- Tutorial, blog, or article-style page: `Article` or `BlogPosting`
- Site-wide brand identity: `Organization` and/or `WebSite`

Practical repo rules from `docs/seo-docs/jsonld-importance-and-required-fields.md`:

- Every important page should have `WebPage`
- Pages with navigation depth should also have `BreadcrumbList`
- Blog/tutorial pages should also have `Article` or `BlogPosting`
- FAQ-heavy pages should also have `FAQPage`
- The site root or layout can also include `Organization` or `WebSite`

## Important fields by schema type

Always include truthful core fields:

- `@context`
- `@type`
- `name` when the schema expects it
- `description`
- `url`

Schema-specific expectations:

### `WebPage`

Must include:

- `name`
- `description`
- `url`

Use when:

- the route is indexable and represents a real page

Helpful optional fields:

- `about`
- `mainEntity`
- `image`
- `inLanguage`

### `BreadcrumbList`

Must include:

- `itemListElement`

Each item must include:

- `@type: "ListItem"`
- `position`
- `name`
- `item`

Use when:

- the page has a meaningful breadcrumb trail users can understand

### `FAQPage`

Must include:

- `mainEntity`

Each item must include:

- `Question`
- `Answer`

Use only when:

- the FAQ content is visible on the page

### `Article`

Must include:

- `headline`
- `description`
- `image`
- `author`
- `publisher`
- `datePublished`
- `dateModified`
- `mainEntityOfPage`

Use when:

- the page behaves like an article, tutorial, or blog post

### `Organization` / `WebSite`

Use at site level.

Important fields:

- `name`
- `url`
- `logo` for `Organization`
- `sameAs` for public social profiles when available
- `potentialAction` for `WebSite` only if real site search exists

## Workflow for adding JSON-LD to a page

1. Inspect the page content and route metadata first.
2. Read `docs/seo-docs/jsonld-importance-and-required-fields.md`.
3. Choose the minimum correct schema types based on visible content.
4. Reuse existing builders from `data/meta-data/structured-data.ts`.
5. If a reusable builder is missing, add it to `structured-data.ts` and add its input type to `types/meta-data-types.ts`.
6. Create a route-specific JSON-LD file under `data/meta-data/<route>/`.
7. Export one or more named JSON-LD objects from that file.
8. Render them in the route `page.tsx` with `<JsonLd data={...} />`.
9. If the schema is site-level, wire it through `app/layout.tsx` instead.
10. Run a build check before finishing.

## Patterns to follow

### Pattern: page-level JSON-LD file

```ts
import { createBreadcrumbJsonLd, createWebPageJsonLd } from "../structured-data";

export const examplePageWebPageJsonLd = createWebPageJsonLd({
  name: "Example Page",
  description: "Page-specific summary.",
  path: "/example",
});

export const examplePageBreadcrumbJsonLd = createBreadcrumbJsonLd([
  { name: "Home", path: "/" },
  { name: "Example", path: "/example" },
]);
```

### Pattern: route wiring

```tsx
import { JsonLd } from "@/components/seo";
import {
  examplePageBreadcrumbJsonLd,
  examplePageWebPageJsonLd,
} from "@/data/meta-data/example/example-structured-jsonld-data";

export default function ExamplePage() {
  return (
    <>
      <JsonLd data={examplePageWebPageJsonLd} />
      <JsonLd data={examplePageBreadcrumbJsonLd} />
      <section>{/* page content */}</section>
    </>
  );
}
```

### Pattern: extending shared builders

If multiple pages need the same schema shape:

- add a reusable builder in `data/meta-data/structured-data.ts`
- add or update the matching input type in `types/meta-data-types.ts`
- keep route files thin and declarative

Do not copy JSON-LD object assembly logic into multiple route files.

## Best practices

1. Keep JSON-LD aligned with visible page content.
2. Keep JSON-LD aligned with canonical metadata from `createPageMetadata`.
3. Use absolute canonical URLs built from `basicDetails.websiteURL`.
4. Prefer page-specific copy over generic site-wide filler.
5. Keep builder logic reusable and route files small.
6. Use `FAQPage` only when the FAQ is actually rendered.
7. Use `BreadcrumbList` only when the breadcrumb path is real and meaningful.
8. Use `Article` only for actual article-style content.
9. Use `sameAs` only for real public social profiles.
10. Keep `datePublished` and `dateModified` accurate when using `Article`.
11. Prefer existing shared images and publisher data from `basicDetails`.
12. Render JSON-LD with the reusable `JsonLd` component, not `next/script`.

## Anti-patterns to avoid

Do not:

- add every possible schema type just because it exists
- stuff extra properties that do not match page content
- create duplicate builders inside route folders
- hardcode site-wide origin, author, or logo in page JSON-LD files
- add `FAQPage` for hidden, collapsed, or absent content
- add `potentialAction` search schema if the site does not support real search
- export page JSON-LD from client components
- create misleading breadcrumb trails

## Strict project rules

1. Reuse `components/seo/json-ld.tsx` for rendering.
2. Reuse `data/meta-data/structured-data.ts` for builder logic.
3. Keep page JSON-LD files in `data/meta-data/<route>/`.
4. Keep site-level JSON-LD in `data/meta-data/site-structured-jsonld-data.ts`.
5. Use `basicDetails` for shared brand, origin, author, locale, and default image values.
6. Keep schema type choice consistent with the page's visible purpose.
7. Prefer `WebPage` + `BreadcrumbList` as the default combination for important nested pages.
8. Ensure each JSON-LD file exports clearly named constants tied to the route.
9. Verify the page stays a Server Component when rendering JSON-LD.
10. Run a build after substantial JSON-LD changes.

## Verification

Before finishing:

```bash
corepack pnpm build
```

If the change is focused and fast to verify, also inspect:

- the route file that renders `<JsonLd />`
- the route-specific JSON-LD data file
- `docs/seo-docs/jsonld-importance-and-required-fields.md` for schema choice

## Quick checklist

- [ ] Correct schema types chosen for the page
- [ ] Important fields present for each chosen schema
- [ ] JSON-LD matches visible content
- [ ] Route-specific file created in the correct `data/meta-data/<route>/` folder
- [ ] Shared builders reused or extended cleanly
- [ ] `<JsonLd data={...} />` wired into `page.tsx` or `layout.tsx`
- [ ] No hardcoded duplicate site-wide values
- [ ] `corepack pnpm build` passes
