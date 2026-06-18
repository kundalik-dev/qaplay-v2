---
title: "Post title goes here"
description: "A short summary shown in search results and on the blog index."
date: "2026-06-18"
author: "Kundalik"
tags: ["tag-one", "tag-two"]
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
