# Bank App Rules

This file holds rules and reference notes specific to the `app/bank` module (`SecureBank`). `CLAUDE.md` covers the whole project; this file is where bank-specific conventions live so `CLAUDE.md` doesn't get overloaded. More rules will be added here over time (coding conventions, data rules, etc.) — for now it covers purpose and locator strategy.

## Purpose

`app/bank` is a fake online-banking app (dashboard, accounts, transfer, send money, bill pay, notifications, profile) used as a realistic practice ground for QA automation. It is not a real bank and moves no real money — all data is seeded/mocked in `app/bank/store`. The goal is to give learners a banking-shaped UI with enough real-world messiness (loading states, frozen accounts, overdrawn balances, multi-step flows) to practice Playwright, Selenium, and Cypress locator strategies and end-to-end flows.

## Locator Strategy Basics

Every interactive element and every card/section in the bank app should be reachable by more than one strategy, and difficulty should be intentionally mixed so learners practice the full toolbox, not just `data-testid`.

Use this tiering when building or editing bank UI:

- **Beginner** — a dedicated `data-testid` directly on both the label and the value/control. Example: `stat-card-net-worth-label` / `stat-card-net-worth-value`.
- **Medium** — a shared `data-testid` across repeated items (cards, rows) disambiguated by a data attribute such as `data-metric`, `data-account-id`, `data-transaction-id`, or `data-category`, combined with `.filter({ hasText: ... })` or attribute-chained CSS selectors.
- **Hard** — no `data-testid` on the value itself; it must be located via `aria-label`, semantic role, or an XPath expression scoped from a labelled ancestor (e.g. `//div[@data-testid="stat-card" and @data-metric="expense"]//p[contains(@class,"text-xl")]`).
- **Challenge** — genuinely awkward but still deterministic: relies on DOM position, sibling order, or icon `aria-label` only, with no `data-testid` and no `aria-label` on the value. Never make these unstable (no random ids, no order that shifts between renders) — "hard" should mean "requires a better locator," not "flaky."

When adding a new card, row, or control:

1. Decide which tier it should be (mix tiers across a section rather than making everything beginner-level).
2. Add a short comment above the element documenting the tier, the intended practice locator (Playwright/CSS/XPath), and why it's that tier.
3. Never sacrifice determinism for difficulty — every element must still be reliably locatable by _some_ stable strategy, just not always the easiest one.
4. Prefer kebab-case, descriptive `data-testid` values consistent with the rest of the project (e.g. `stat-card`, `account-card`, `recent-txn-row`).
5. Supporting data attributes (`data-metric`, `data-account-id`, `data-transaction-id`, `data-category`, `data-balance`) should carry real, stable values — not styling hooks.

## Colors

Avoid blue as a primary accent in the bank UI — use the existing neutral/violet/emerald/amber/rose palette already established in `app/bank` (violet for primary actions, emerald for positive/success, rose/red for negative/error, amber for warnings). Keep cards on white/slate surfaces (`bg-white dark:bg-slate-800`, `border-slate-200 dark:border-slate-700`) rather than gradient/colored card backgrounds.

## Layout

- Top-of-dashboard stat cards must stay compact — this is a dashboard summary, not a hero section. Keep card padding and font sizes modest (e.g. `p-4`, `text-xl` for values) so 4 cards fit comfortably in a row on desktop without dominating the page.
- Use a responsive grid (2 columns on mobile, 4 on desktop) rather than letting cards grow unbounded in width.

<!-- More bank-specific rules to be added here over time. -->
