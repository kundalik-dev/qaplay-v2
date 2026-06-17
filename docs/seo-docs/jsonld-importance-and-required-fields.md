# JSON-LD Importance And Required Fields

## Why JSON-LD matters

JSON-LD helps search engines understand what a page is about. It does not replace good content, titles, descriptions, canonical URLs, or internal linking, but it supports them by making page meaning explicit.

For SEO, JSON-LD is most useful when it is:

- accurate
- page-specific
- consistent with visible page content
- aligned with canonical metadata
- based on the correct schema type

The goal is not to add every possible field. The goal is to use the right schema with complete and truthful fields.

## Core fields that matter most

These fields are important on most JSON-LD types:

- `@context`: usually `"https://schema.org"`
- `@type`: the schema type such as `WebPage`, `Article`, `FAQPage`, `BreadcrumbList`, `Organization`
- `name`: entity or page name
- `description`: short summary of the page or entity
- `url`: canonical URL

These are also very valuable on many pages:

- `image`
- `mainEntity`
- `mainEntityOfPage`
- `author`
- `publisher`
- `datePublished`
- `dateModified`
- breadcrumb data, usually through a separate `BreadcrumbList`

## Recommended schema types for this project

### 1. `WebPage`

Use on important pages like home, practice listing pages, demo pages, and detail pages.

Important fields:

- `@context`
- `@type`
- `name`
- `description`
- `url`

Helpful optional fields:

- `breadcrumb`
- `about`
- `mainEntity`
- `inLanguage`

### 2. `BreadcrumbList`

Use on pages with a meaningful navigation trail, especially `/practice` and detail pages.

Important fields:

- `@context`
- `@type`
- `itemListElement`

Each breadcrumb item should include:

- `@type: "ListItem"`
- `position`
- `name`
- `item`

### 3. `FAQPage`

Use only when the page visibly contains FAQ content.

Important fields:

- `@context`
- `@type`
- `mainEntity`

Each item should use:

- `Question`
- `Answer`

### 4. `Article` or `BlogPosting`

Use for blog posts, tutorials, long-form guides, and content that behaves like an article.

Important fields:

- `headline`
- `description`
- `image`
- `author`
- `publisher`
- `datePublished`
- `dateModified`
- `mainEntityOfPage`

### 5. `Organization` or `WebSite`

Use at the site level or on the homepage when it accurately represents the brand/site.

Important fields for `Organization`:

- `name`
- `url`
- `logo`
- `sameAs`

Important fields for `WebSite`:

- `name`
- `url`
- optional `potentialAction` for search when real site search exists

## Practical rule for this repo

- Every important page should have `WebPage`
- Pages with navigation depth should also have `BreadcrumbList`
- Blog/tutorial pages should also have `Article` or `BlogPosting`
- FAQ-heavy pages should also have `FAQPage`
- The site root or layout can also include `Organization` or `WebSite`

## `/practice` page guidance

For `/practice`, the most useful JSON-LD is:

- `WebPage`
  - `name`
  - `description`
  - `url`
- `BreadcrumbList`
  - full breadcrumb trail
- optional `about` or `mainEntity` if the page is clearly centered on a defined concept

## What matters most for SEO

- correct `@type`
- accurate `name`, `description`, and `url`
- valid breadcrumb data
- page-specific content instead of generic filler
- consistency between on-page content, metadata, canonical URL, and JSON-LD

## What is less useful

- adding properties that are not reflected on the page
- adding many schema types just because they exist
- using incomplete or misleading structured data

## Current project JSON-LD audit

## What the repo currently has

Current structured data implementation:

- Reusable renderer: `components/seo/json-ld.tsx`
- Shared builder: `data/meta-data/structured-data.ts`
- Home page JSON-LD data: `data/meta-data/home/home-structured-jsonld-data.ts`
- Home page usage: `app/page.tsx`

Current behavior:

- The project currently renders one JSON-LD block on the home page
- That block uses `@type: "Article"`
- The builder pulls shared values from `basicDetails`

## Fields currently provided by the existing `Article` JSON-LD

Present now:

- `@context`
- `@type`
- `description`
- `url`
- `image`
- `author`
- `publisher`
- `datePublished`
- `dateModified`
- `mainEntityOfPage`
- `inLanguage`

Important note:

- The current schema uses `headline`, which is correct for `Article`
- It does not provide `name`, which is fine for the current `Article` implementation, but if we add `WebPage` schema then `name` should be included there

## What is missing right now

Missing from the current implementation:

- `WebPage` schema for important pages
- `BreadcrumbList` schema
- `FAQPage` schema even though the home page has an FAQ section
- `Organization` or `WebSite` schema
- page-specific JSON-LD for `/practice`, `/demo`, and detail pages
- `sameAs` social profile data for an `Organization` schema

## Audit result

The current JSON-LD is a good start, but it is not yet complete for the site's SEO needs.

What is good:

- Uses valid JSON-LD delivery through `<script type="application/ld+json">`
- Uses a reusable builder pattern
- Includes strong `Article` fields such as `description`, `image`, `author`, `publisher`, and publication dates

What should improve next:

- Add `WebPage` JSON-LD to major pages
- Add `BreadcrumbList` to `/practice` and other nested pages
- Add `FAQPage` only where FAQ content is visible
- Add site-level `Organization` or `WebSite`
- Expand structured data beyond the homepage

## Suggested next implementation order

1. Add a reusable `createWebPageJsonLd` builder
2. Add a reusable `createBreadcrumbJsonLd` builder
3. Add `WebPage` plus `BreadcrumbList` to `/practice`
4. Add `FAQPage` on pages with visible FAQ sections
5. Add site-level `Organization` or `WebSite` schema
