---
# Required — drives the H1, page <title>, and Article headline.
title: "Post title goes here"
# Required — meta description, blog-index/post summary, and Article description.
description: "A short summary shown in search results and on the blog index."
# Required — ISO 8601 publish date. Drives the displayed date, sorting, and JSON-LD datePublished.
date: "2026-06-18"
# Optional — ISO 8601 last-updated date. Sets JSON-LD dateModified (defaults to `date`).
updated: "2026-06-18"
# Optional — author display name shown in the post meta (falls back to the site author).
author: "Kundalik"
# Optional — topic tags. Shown as pills on the post header and merged into SEO keywords.
tags: ["tag-one", "tag-two"]
# Optional — category labels. Power the blog-index filter buttons and the card category pills.
category: ["playwright", "automation"]
# Optional — extra SEO keywords merged with tags and the site defaults.
keywords: ["keyword one", "keyword two"]
# Optional — cover/OG image path (relative to the site origin), e.g. "/blog/my-post.png".
coverImage: "/blog/post-cover.png"
# Optional — alt text for the cover image (falls back to the title).
coverImageAlt: "Describe the cover image"
# Optional — when true, the post is hidden in production builds but visible in dev..
draft: true
---

Open with a short intro paragraph that frames the problem and what the reader
will learn.

## A section heading

Body copy with **bold**, _italic_, and [links](https://qaplayground.com).

- Bullet one
- Bullet two

### A code example

```ts
import { test, expect } from "@playwright/test";

test("has title", async ({ page }) => {
  await page.goto("https://qaplayground.com");
  await expect(page).toHaveTitle(/QA Playground/);
});
```

> Use blockquotes for tips or callouts.

## Wrap up

Close with a summary or a call to action.
