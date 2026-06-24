# Bank App — Implementation Plan
### `app/bank` — Full Build Plan

---

## Goal

Build a complete, standalone bank demo app at `/bank/*` that:
- Runs entirely on client-side state (Zustand + localStorage) — **zero API calls**
- Uses shadcn/ui components + Tailwind CSS throughout
- Follows the project's locator design guide (40% beginner, 30% medium, 20% hard, 10% challenge)
- Is a fully functional practice target for Playwright, Cypress, and Selenium
- Is completely isolated from `app/demo/bank` (different store key, different routes)

---

## Architecture Decision: No API Calls

All data is seeded once into `localStorage` via Zustand `persist` middleware on the user's first visit.

- **No `/api/*` routes needed**
- **No fetch() calls in layouts or components**
- Data survives page refresh automatically
- "Reset data" re-seeds defaults back into the store
- This eliminates the existing `app/demo/bank` pattern of calling `/api/bank-version` + `/api/bank-data` on every layout mount

---

## Tech Stack

| Concern | Choice |
|---|---|
| State + persistence | Zustand + `persist` middleware (localStorage key: `bank-app-v1`) |
| UI components | shadcn/ui (Button, Input, Label, Select, Dialog, Card, Badge, Checkbox, Separator, Sheet, Skeleton, Tabs) |
| Styling | Tailwind CSS utility classes + CSS module for bank-specific overrides |
| Icons | Lucide React (already installed) |
| Routing | Next.js App Router |
| Auth guard | Client component in `app/bank/layout.tsx` |

---

## Folder Structure

```
app/bank/
├── layout.tsx                    ← "use client" — auth guard + bank shell (sidebar + topbar)
├── page.tsx                      ← server — redirect to /bank/login or /bank/dashboard
│
├── login/
│   └── page.tsx                  ← "use client" — login form, no shell
│
├── forgot-password/
│   └── page.tsx                  ← "use client" — forgot password, no shell
│
├── dashboard/
│   ├── page.tsx                  ← "use client"
│   └── _components/
│       ├── account-summary-cards.tsx
│       ├── quick-actions.tsx
│       └── recent-transactions-list.tsx
│
├── accounts/
│   ├── page.tsx                  ← "use client" — accounts grid
│   ├── _components/
│   │   └── account-card.tsx
│   └── [id]/
│       ├── page.tsx              ← "use client" — account detail + filtered transactions
│       └── _components/
│           ├── transactions-table.tsx
│           └── transaction-filter-bar.tsx
│
├── transfer/
│   ├── page.tsx                  ← "use client" — transfer form
│   ├── confirmation/
│   │   └── page.tsx              ← "use client" — success state
│   └── _components/
│       └── transfer-form.tsx
│
├── send-money/
│   ├── page.tsx                  ← "use client" — send money form
│   ├── confirmation/
│   │   └── page.tsx
│   └── _components/
│       ├── send-money-form.tsx
│       └── payee-selector.tsx
│
├── bill-pay/
│   ├── page.tsx                  ← "use client" — bill pay form
│   ├── confirmation/
│   │   └── page.tsx
│   └── _components/
│       ├── bill-pay-form.tsx
│       └── biller-selector.tsx
│
├── notifications/
│   ├── page.tsx                  ← "use client"
│   └── _components/
│       └── notification-item.tsx
│
├── profile/
│   ├── page.tsx                  ← "use client"
│   └── _components/
│       ├── personal-info-form.tsx
│       ├── change-password-form.tsx
│       └── danger-zone.tsx
│
├── store/
│   └── useBankAppStore.ts        ← Zustand store (all state + actions)
│
└── lib/
    ├── types.ts                  ← TypeScript types
    ├── seed-data.ts              ← seeded users, accounts, transactions, payees, billers, notifications
    └── utils.ts                  ← helpers: formatCurrency, generateRefId, generateTxnId, etc.
```

---

## Store Design (`useBankAppStore.ts`)

```ts
// localStorage key
name: "bank-app-v1"

// State shape
{
  // Auth
  currentUsername: string | null

  // Seeded flag
  isSeeded: boolean

  // Per-user data (keyed by username)
  users: Record<string, UserRecord>       // password, profile, role
  accounts: Record<string, Account[]>
  transactions: Record<string, Transaction[]>
  payees: Record<string, Payee[]>
  billers: Record<string, Biller[]>
  notifications: Record<string, Notification[]>

  // Pending transfer/send/billpay result (for confirmation page)
  lastTransferResult: TransferResult | null
  lastSendResult: SendResult | null
  lastBillPayResult: BillPayResult | null
}

// Actions
login(username, password) → boolean
logout()
seedIfNeeded()          // called once on app mount
resetUserData(username) // re-seeds defaults for this user
updateProfile(username, patch)
changePassword(username, currentPw, newPw) → boolean
addTransaction(username, txn)
transfer(username, fromId, toId, amount, memo, date) → TransferResult
sendMoney(username, fromId, payee, amount, note) → SendResult
payBill(username, fromId, billerId, amount, date, memo) → BillPayResult
savePayee(username, payee)
saveBiller(username, biller)
markNotificationRead(username, notifId)
markAllNotificationsRead(username)
```

---

## Test Users (seeded in `seed-data.ts`)

| Username | Password | Behavior |
|---|---|---|
| `standard_user` | `bank_sauce` | Full access, 2 accounts, healthy balance |
| `locked_user` | `bank_sauce` | Blocked at login — shows account suspended error |
| `frozen_user` | `bank_sauce` | Logged in but Transfer/Send/BillPay actions disabled |
| `overdraft_user` | `bank_sauce` | Checking account has negative balance |
| `slow_user` | `bank_sauce` | Artificial 2.5 s delay on data render (setTimeout in components) |
| `admin_user` | `admin_sauce` | Extra user-selector dropdown to view any user's data |

---

## Seeded Accounts (per standard user)

| Account | Type | Number | Balance |
|---|---|---|---|
| Everyday Checking | Checking | `****4321` | $4,250.00 |
| High-Yield Savings | Savings | `****8765` | $12,800.00 |

Each account gets 12 realistic pre-seeded transactions (mix of credits and debits).

---

## Seeded Billers (all users)

| Biller | Reference |
|---|---|
| City Electric Co. | `ACC-0042` |
| Metro Water Utility | `ACC-7731` |
| FastNet Internet | `ACC-2219` |

---

## shadcn Components Used Per Page

| Page | shadcn Components |
|---|---|
| Login | `Button`, `Input`, `Label`, `Card` |
| Dashboard | `Card`, `Badge`, `Separator`, `Skeleton`, `Button` |
| Accounts | `Card`, `Badge`, `Button` |
| Account Detail | `Button`, `Badge`, `Select`, `Input`, `Separator` |
| Transfer | `Button`, `Input`, `Label`, `Select`, `RadioGroup`, `Dialog` |
| Send Money | `Button`, `Input`, `Label`, `Checkbox`, `Card`, `Dialog` |
| Bill Pay | `Button`, `Input`, `Label`, `Select`, `Card`, `Dialog` |
| Notifications | `Badge`, `Button`, `Separator` |
| Profile | `Button`, `Input`, `Label`, `Switch`, `Dialog` |
| Layout (sidebar) | `Sheet` (mobile drawer), `Button`, `Separator`, `Avatar` |

---

## Locator Design Summary (per page)

Every page follows the 40/30/20/10 rule from the locator guide.

### Login Page
- **Beginner**: `getByLabel('Username')`, `getByTestId('login-submit-btn')`, `getByRole('button', { name: 'Sign In' })`
- **Medium**: scoped `getByTestId('login-form').getByLabel(...)`, error banner inside `[data-testid="login-error"]`
- **Hard**: `//label[normalize-space()="Username"]/following-sibling::input` — no `for` attribute on the "Remember me" label
- **Challenge**: the error close `×` button has `aria-label` only, no `data-testid`

### Dashboard
- **Beginner**: `data-testid` on each stat card, quick action buttons, welcome message
- **Medium**: account summary cards reuse `data-testid="account-card"` + unique `data-account-id`, scoped button inside each card
- **Hard**: total balance cell has no `data-testid`, only nearby `<span>` text + sibling structure
- **Challenge**: notification bell badge count — locate by `aria-label` containing dynamic count

### Account Detail / Transactions
- **Beginner**: filter type buttons with `data-testid`, search input with label
- **Medium**: `data-testid="transaction-row"` + `data-transaction-id` for each row, scoped debit/credit cell
- **Hard**: running balance cell — no `data-testid`, XPath required (`//tr[@data-transaction-id="X"]/td[5]`)
- **Challenge**: pagination buttons have `aria-label` only (no `data-testid` on individual page number buttons)

### Transfer
- **Beginner**: `getByLabel('From Account')`, `getByTestId('transfer-amount-input')`, `getByRole('button', {name: 'Review Transfer'})`
- **Medium**: confirmation modal inside `role="dialog"`, scoped buttons
- **Hard**: the scheduled date picker only appears after radio interaction — dynamic visibility locator
- **Challenge**: same-account validation error — no `data-testid`, text content only

### Profile
- **Beginner**: `data-testid` on all named form inputs, save buttons
- **Medium**: edit/view toggle — same section, elements toggle visible/hidden
- **Hard**: `//span[normalize-space()="Phone"]/following-sibling::div//input` — no for/id on phone input
- **Challenge**: danger zone confirm modal — Delete button has `aria-label` but no `data-testid`

---

## Build Order (todo sequence)

1. `lib/types.ts` — all TypeScript types
2. `lib/seed-data.ts` — all seeded data
3. `lib/utils.ts` — helpers (formatCurrency, generateRefId, etc.)
4. `store/useBankAppStore.ts` — full Zustand store
5. `layout.tsx` — bank shell (auth guard + sidebar + topbar)
6. `page.tsx` — redirect
7. `login/page.tsx`
8. `forgot-password/page.tsx`
9. `dashboard/page.tsx` + `_components/`
10. `accounts/page.tsx` + `_components/`
11. `accounts/[id]/page.tsx` + `_components/`
12. `transfer/page.tsx` + `confirmation/page.tsx` + `_components/`
13. `send-money/page.tsx` + `confirmation/page.tsx` + `_components/`
14. `bill-pay/page.tsx` + `confirmation/page.tsx` + `_components/`
15. `notifications/page.tsx` + `_components/`
16. `profile/page.tsx` + `_components/`

---

## Key Rules (from CLAUDE.md)

- No inline CSS — Tailwind classes + CSS modules only
- Server components by default; `"use client"` only where needed
- All route-local components in `_components/`
- `data-testid` on all key elements following `<page>-<purpose>-<element>` naming
- Dynamic attributes (`data-account-id`, `data-transaction-id`, `data-notification-id`) for repeated items

---

*Plan created: 2026-06-24*
