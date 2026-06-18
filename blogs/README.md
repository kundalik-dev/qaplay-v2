# Blog authoring guide

Blog posts are plain Markdown files in this folder (`blogs/`), at the project
root. Drop a new `.md` file here and it is automatically published at
`/blog/<filename>` — no code changes required.

## How it works

```
blogs/my-post.md            →  /blog/my-post
```

- The **filename** (without `.md`) becomes the URL slug.
- Files named `README.md` or starting with `_` (e.g. `_template.md`) are ignored.
- Posts are statically generated at build time (`generateStaticParams`).
- `draft: true` posts are visible in `next dev` but hidden in production builds.

Each post automatically gets:

- SEO `Metadata` (title, description, canonical URL, Open Graph, Twitter) via
  `buildBlogPostMetadata` → `createPageMetadata`.
- `BlogPosting` + `BreadcrumbList` JSON-LD via `buildBlogPostJsonLd`.
- Shiki-highlighted code blocks (same theme as the rest of the app).

## Frontmatter

Every post starts with a YAML frontmatter block. Only `title`, `description`,
and `date` are required.

```yaml
---
title: "Your post title"
description: "One- or two-sentence summary used for SEO and the post preview."
date: "2026-06-18" # ISO 8601 — drives datePublished
updated: "2026-06-20" # optional — drives dateModified (defaults to date)
author: "Kundalik" # optional — falls back to the site author
tags: ["playwright", "locators"] # optional — pills + extra keywords
keywords: ["extra seo term"] # optional — extra SEO keywords
coverImage: "/blog/your-post.png" # optional — OG/Twitter share image
coverImageAlt: "Describe the cover image" # optional
draft: false # optional — true hides the post in production
featured: false # optional — reserved for future highlighting
---
```

Below the frontmatter, write the post body in normal Markdown (GitHub-flavoured:
headings, lists, tables, blockquotes, fenced code blocks, etc.).

See `_template.md` in this folder for a ready-to-copy starting point.

## Where the code lives

| Concern                   | File                                    |
| ------------------------- | --------------------------------------- |
| Reading/parsing posts     | `lib/blog/posts.ts`                     |
| Markdown → HTML (Shiki)   | `lib/blog/markdown.ts`                  |
| Types                     | `lib/blog/types.ts`                     |
| Per-post metadata/JSON-LD | `data/meta-data/blog/blog-post-meta.ts` |
| Index metadata/JSON-LD    | `data/meta-data/blog/*`                 |
| Index page                | `app/blog/page.tsx`                     |
| Post page                 | `app/blog/[slug]/page.tsx`              |
