---
title: "Getting Started with Playwright Locators"
description: "Learn how Playwright locators work, why they're auto-waiting and strict by default, and which locators to reach for first when automating real UIs."
date: "2026-06-18"
author: "Kundalik"
tags: ["playwright", "locators", "automation"]
keywords: ["playwright getByTestId", "playwright getByRole", "stable selectors"]
---

Locators are the foundation of every reliable Playwright test. Unlike a raw
CSS query, a locator is **lazy** — it describes _how_ to find an element, and
Playwright re-resolves it every time you act on it. That single design choice
removes most flaky-test pain before you write a single assertion.

## Why locators beat raw selectors

A locator does three things a plain `querySelector` cannot:

1. **Auto-waits** for the element to be actionable before clicking or typing.
2. **Re-queries** the DOM on each action, so it survives re-renders.
3. **Enforces strictness** — if your locator matches more than one element,
   the test fails loudly instead of silently acting on the first match.

## The locators you'll use most

Prefer locators that mirror how a user perceives the page, then fall back to
test ids for elements that have no accessible handle.

```ts
import { test, expect } from "@playwright/test";

test("submits the contact form", async ({ page }) => {
  await page.goto("/contact");

  // By role + accessible name — closest to how users find controls.
  await page.getByRole("textbox", { name: "Email" }).fill("qa@example.com");

  // By test id — the most stable hook for automation.
  await page.getByTestId("contact-message").fill("Hello!");

  await page.getByRole("button", { name: "Send" }).click();

  await expect(page.getByTestId("contact-success")).toBeVisible();
});
```

### Picking the right one

| Locator       | Use it when                                          |
| ------------- | ---------------------------------------------------- |
| `getByRole`   | The element has a clear role + accessible name       |
| `getByLabel`  | Targeting form fields tied to a `<label>`            |
| `getByTestId` | There's no good accessible handle, but a stable id   |
| `getByText`   | Matching visible copy (use sparingly — copy changes) |

> Tip: add stable `data-testid` attributes to important controls so
> `getByTestId` always has something dependable to target. Every practice
> element on QA Playground ships with one.

## Avoid brittle locators

Skip selectors that break the moment a designer touches the layout:

- Deep CSS chains like `div > div:nth-child(3) > span`
- Auto-generated class names (`.css-1a2b3c`)
- Absolute XPath copied from devtools

## Wrap up

Reach for role-based locators first, lean on `getByTestId` for everything that
lacks an accessible handle, and let Playwright's auto-waiting do the rest. Head
over to the [practice elements](/practice) to try these locators against real
components.
