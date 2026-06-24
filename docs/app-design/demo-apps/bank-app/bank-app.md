# Bank App — Automation Practice Site
### Feature Specification

> **Purpose:** This is a deliberately designed automation practice site. Every page, field, button, and state exists to give testers something concrete to automate against. The app simulates a realistic retail banking experience but is intentionally simplified — no real accounts, no real money, no real transactions.

---

## Test Users

All users are hardcoded and seeded into `localStorage` on first load. Passwords are stored in plain text intentionally for easy test inspection.

| Username | Password | State |
|---|---|---|
| `standard_user` | `bank_sauce` | Normal user, full access, 2 accounts |
| `locked_user` | `bank_sauce` | Login blocked — account suspended error |
| `frozen_user` | `bank_sauce` | Logged in but transfer and payment actions are disabled (account frozen) |
| `overdraft_user` | `bank_sauce` | Has one account with a negative balance — overdraft state |
| `slow_user` | `bank_sauce` | Artificial delay (2–4 s) on all data-loading operations |
| `admin_user` | `admin_sauce` | Can view accounts and transactions for all users |

---

## LocalStorage Schema

All app state is persisted in `localStorage` so sessions survive page refresh and browser restarts.

```
bankApp_users                  → array of user objects (seeded on first visit)
bankApp_currentUser            → username string of logged-in user (or null)
bankApp_accounts_{user}        → array of account objects for each user
bankApp_transactions_{user}    → array of all transaction objects for each user
bankApp_payees_{user}          → array of saved payee objects for each user
bankApp_notifications_{user}   → array of notification objects for each user
bankApp_profile_{user}         → profile/contact info object for each user
```

On app load, the app reads `bankApp_currentUser` and restores the session automatically — no re-login required until the user explicitly logs out.

---

## Seeded Account Data

Each `standard_user` starts with the following accounts (seeded on first load if not present):

| Account | Type | Number | Starting Balance |
|---|---|---|---|
| Everyday Checking | Checking | `****4321` | $4,250.00 |
| High-Yield Savings | Savings | `****8765` | $12,800.00 |

Each account has 10 pre-seeded transactions (mix of credits and debits) with realistic descriptions (e.g., "Direct Deposit — ACME Corp", "Coffee Shop", "Netflix Subscription").

---

## Pages & Features

---

### 1. Login Page
**Route:** `/` or `/login`

**Elements:**
- Username input (`data-testid="username"`)
- Password input (`data-testid="password"`)
- Login button (`data-testid="login-btn"`)
- "Remember me" checkbox (`data-testid="remember-me"`)
- Error message banner (`data-testid="error-message"`) — hidden by default
- Forgot password link (`data-testid="forgot-password-link"`) — navigates to `/forgot-password`

**Behavior:**
- Successful login → redirects to `/dashboard`
- `locked_user` → shows error: *"Your account has been suspended. Please contact support."*
- Wrong credentials → shows error: *"The username or password you entered is incorrect."*
- Empty username → shows error: *"Please enter your username."*
- Empty password → shows error: *"Please enter your password."*
- "Remember me" checked → persists `bankApp_currentUser` in `localStorage`; unchecked → uses `sessionStorage` only (clears on tab close)
- If `bankApp_currentUser` already set → redirect to `/dashboard` automatically
- Error banner has a dismissible `×` close button (`data-testid="error-close"`)

**Automation scenarios:**
- Login with valid credentials
- Login with locked user — verify specific error text
- Login with wrong password — verify generic error text
- Login with blank username only
- Login with blank password only
- Login with both fields blank
- Verify auto-redirect when session exists in localStorage
- Verify "remember me" persistence vs. session-only behavior
- Dismiss error message via close button

---

### 2. Dashboard Page
**Route:** `/dashboard`

**Elements:**
- Welcome message with user's first name (`data-testid="welcome-message"`)
- Account summary cards (one per account), each containing:
  - Account name (`data-testid="account-name-{id}"`)
  - Masked account number (`data-testid="account-number-{id}"`)
  - Account type badge (Checking / Savings) (`data-testid="account-type-{id}"`)
  - Current balance (`data-testid="account-balance-{id}"`)
  - "View Transactions" button (`data-testid="view-transactions-{id}"`)
- Total net worth summary (sum of all account balances) (`data-testid="total-balance"`)
- Quick action buttons:
  - Transfer Money (`data-testid="quick-transfer-btn"`)
  - Pay a Bill (`data-testid="quick-bill-pay-btn"`)
  - Send Money (`data-testid="quick-send-money-btn"`)
- Recent transactions list (last 5 across all accounts) (`data-testid="recent-transactions"`)
- Notifications bell icon with unread count badge (`data-testid="notifications-bell"`)

**Behavior:**
- `overdraft_user` — one account card shows negative balance in red with an "Overdrawn" badge (`data-testid="overdrawn-badge"`)
- `frozen_user` — quick action buttons are visible but disabled with tooltip: *"Your account is temporarily frozen."*
- `slow_user` — account cards and recent transactions render after 3 s artificial delay; a loading skeleton is shown while waiting
- `admin_user` — sees a user selector dropdown (`data-testid="admin-user-selector"`) at the top to switch between users' dashboards

**Automation scenarios:**
- Verify correct number of account cards
- Verify each card shows correct name, masked number, type, and balance
- Verify total balance is sum of all accounts
- Verify overdrawn badge appears for `overdraft_user`
- Verify quick action buttons are disabled for `frozen_user`
- Verify loading skeleton shown then replaced for `slow_user`
- Verify recent transactions list is populated
- Click "View Transactions" and verify navigation to account transactions page
- Verify notification badge count

---

### 3. Account Transactions Page
**Route:** `/accounts/:accountId/transactions`

**Elements:**
- Account name and masked number heading
- Balance display (`data-testid="account-balance"`)
- Transaction list — each row contains:
  - Date (`data-testid="txn-date-{id}"`)
  - Description (`data-testid="txn-description-{id}"`)
  - Category badge (e.g., Food, Income, Utilities) (`data-testid="txn-category-{id}"`)
  - Amount — credits in green, debits in red (`data-testid="txn-amount-{id}"`)
  - Running balance (`data-testid="txn-running-balance-{id}"`)
  - Transaction type icon (credit / debit)
- Filter bar:
  - Date range picker: From / To (`data-testid="filter-date-from"`, `data-testid="filter-date-to"`)
  - Transaction type filter: All / Credits / Debits (`data-testid="filter-type"`)
  - Search by description (`data-testid="filter-search"`)
  - Apply Filters button (`data-testid="apply-filters-btn"`)
  - Clear Filters button (`data-testid="clear-filters-btn"`)
- Pagination — 10 transactions per page (`data-testid="pagination"`)
- Download Statement button (triggers a `.csv` file download) (`data-testid="download-statement-btn"`)
- Back to Dashboard link

**Behavior:**
- Filters are applied client-side against loaded transactions
- Cleared filters restore the full list
- Navigating directly to an invalid account ID shows "Account not found" error (`data-testid="account-not-found"`)
- `overdraft_user`'s overdrawn account shows a red banner: *"This account is overdrawn. Transfers out are disabled."*

**Automation scenarios:**
- Verify 10 transactions displayed on first page
- Verify pagination navigates to next/previous page
- Filter by Credits only — verify only positive amounts shown
- Filter by Debits only — verify only negative amounts shown
- Filter by date range — verify only matching transactions shown
- Search by description keyword — verify results match
- Clear filters — verify full list restored
- Verify overdrawn banner for `overdraft_user`
- Click Download Statement — verify `.csv` download triggered
- Navigate to invalid account ID — verify error state

---

### 4. Transfer Money Page
**Route:** `/transfer`

**Elements:**
- From Account dropdown (`data-testid="transfer-from"`) — lists user's own accounts
- To Account dropdown (`data-testid="transfer-to"`) — lists user's own accounts (excludes selected From account)
- Amount input (`data-testid="transfer-amount"`)
- Optional memo input (`data-testid="transfer-memo"`)
- Transfer Date radio: Today / Schedule for Later (`data-testid="transfer-date-type"`)
  - If "Schedule for Later" selected → date picker appears (`data-testid="transfer-scheduled-date"`)
- Review Transfer button (`data-testid="review-transfer-btn"`)
- Cancel link → back to `/dashboard`
- Confirmation modal (appears after Review):
  - Summary: from, to, amount, date (`data-testid="confirm-transfer-summary"`)
  - Confirm button (`data-testid="confirm-transfer-btn"`)
  - Cancel button (`data-testid="cancel-transfer-btn"`)

**Behavior:**
- From and To accounts cannot be the same — if matched, Continue shows error: *"From and To accounts must be different."*
- Amount must be positive and numeric; non-numeric input shows: *"Please enter a valid amount."*
- Amount exceeding From account balance shows: *"Insufficient funds. Available balance: $X.XX."*
- Overdrawn account is excluded from the From dropdown
- Frozen user — page loads but both dropdowns and amount are disabled; shows banner: *"Transfers are disabled while your account is frozen."*
- Successful transfer:
  - Deducts from source account, credits destination account
  - Creates two transaction records (debit on source, credit on destination)
  - Redirects to `/transfer/confirmation`

**Automation scenarios:**
- Successful transfer between own accounts
- Attempt transfer with same From and To account
- Attempt transfer with non-numeric amount
- Attempt transfer exceeding available balance
- Attempt transfer as `frozen_user` — verify disabled state
- Schedule a future-dated transfer — verify date picker appears
- Cancel on confirmation modal — verify no transfer occurs
- Confirm transfer — verify balances updated in dashboard

---

### 5. Transfer Confirmation Page
**Route:** `/transfer/confirmation`

**Elements:**
- Success icon and heading ("Transfer Successful")
- Confirmation reference number (`data-testid="transfer-ref"`) — e.g., `TXN-20260624-0087`
- Transfer summary: from account, to account, amount, date (`data-testid="transfer-summary"`)
- Back to Dashboard button (`data-testid="back-to-dashboard-btn"`)
- Make Another Transfer button (`data-testid="another-transfer-btn"`)

**Automation scenarios:**
- Verify reference number is displayed and matches format `TXN-YYYYMMDD-XXXX`
- Verify transfer summary matches what was submitted
- Click Back to Dashboard — verify navigation
- Click Make Another Transfer — verify navigation to `/transfer`

---

### 6. Send Money Page
**Route:** `/send-money`

**Elements:**
- From Account dropdown (`data-testid="send-from-account"`)
- Payee section:
  - Saved Payees list — radio cards (`data-testid="payee-card-{id}"`)
  - "Add New Payee" option expands a form:
    - Payee name input (`data-testid="new-payee-name"`)
    - Account number input (`data-testid="new-payee-account"`)
    - Routing number input (`data-testid="new-payee-routing"`)
    - Bank name input (`data-testid="new-payee-bank"`)
    - "Save this payee" checkbox (`data-testid="save-payee-checkbox"`)
- Amount input (`data-testid="send-amount"`)
- Optional note input (`data-testid="send-note"`)
- Review button (`data-testid="review-send-btn"`)
- Confirmation modal (same pattern as Transfer)

**Behavior:**
- Selecting a saved payee pre-fills their details
- Routing number must be exactly 9 digits
- Account number must be 8–17 digits
- Amount validation same as Transfer page
- Checking "Save this payee" persists to `bankApp_payees_{user}` in localStorage
- Frozen user — form is disabled with frozen banner
- Successful send → creates a debit transaction on the From account, redirects to `/send-money/confirmation`

**Automation scenarios:**
- Send money to a saved payee
- Send money to a new payee
- Attempt with invalid routing number (not 9 digits)
- Attempt with invalid account number (too short)
- Attempt exceeding balance
- Verify "Save payee" checkbox persists payee to list
- Verify new payee appears in saved payees on next visit
- Verify frozen user form is disabled

---

### 7. Send Money Confirmation Page
**Route:** `/send-money/confirmation`

**Elements:**
- Success icon and heading
- Reference number (`data-testid="send-ref"`)
- Summary: from account, payee name, amount (`data-testid="send-summary"`)
- Back to Dashboard button
- Send Again button

**Automation scenarios:**
- Verify reference number format
- Verify summary matches submitted data
- Verify navigation buttons

---

### 8. Bill Pay Page
**Route:** `/bill-pay`

**Elements:**
- From Account dropdown (`data-testid="bill-pay-from-account"`)
- Biller section:
  - Saved Billers list — radio cards (`data-testid="biller-card-{id}"`)
  - "Add New Biller" expands a form:
    - Biller name input (`data-testid="new-biller-name"`)
    - Account / reference number input (`data-testid="new-biller-ref"`)
    - "Save this biller" checkbox (`data-testid="save-biller-checkbox"`)
- Amount input (`data-testid="bill-amount"`)
- Payment date picker (`data-testid="bill-pay-date"`) — defaults to today, allows future scheduling
- Optional memo input (`data-testid="bill-memo"`)
- Review button (`data-testid="review-bill-btn"`)
- Confirmation modal

**Seeded Billers (for all users):**
| Biller | Reference |
|---|---|
| City Electric Co. | `ACC-0042` |
| Metro Water Utility | `ACC-7731` |
| FastNet Internet | `ACC-2219` |

**Behavior:**
- Selecting a saved biller pre-fills name and reference number
- Payment date cannot be in the past — past date shows: *"Payment date cannot be in the past."*
- Amount must be positive and not exceed From account balance
- Successful payment → debit transaction created, redirects to `/bill-pay/confirmation`

**Automation scenarios:**
- Pay a saved biller
- Pay a new biller
- Attempt with a past payment date
- Attempt exceeding balance
- Schedule a future bill payment
- Verify "Save biller" checkbox persists biller
- Verify frozen user form is disabled
- Confirm payment — verify balance updated

---

### 9. Bill Pay Confirmation Page
**Route:** `/bill-pay/confirmation`

**Elements:**
- Success icon and heading
- Reference number (`data-testid="bill-pay-ref"`)
- Summary: from account, biller, amount, payment date (`data-testid="bill-pay-summary"`)
- Back to Dashboard button
- Pay Another Bill button

**Automation scenarios:**
- Verify reference number format
- Verify summary matches submitted data
- Verify navigation buttons

---

### 10. Notifications Page
**Route:** `/notifications`

**Elements:**
- Notification list — each item contains:
  - Icon (info / warning / success)
  - Title (`data-testid="notif-title-{id}"`)
  - Body text (`data-testid="notif-body-{id}"`)
  - Timestamp (`data-testid="notif-time-{id}"`)
  - Unread indicator dot (`data-testid="notif-unread-{id}"`) — hidden if read
  - "Mark as read" link (`data-testid="notif-mark-read-{id}"`)
- "Mark all as read" button (`data-testid="mark-all-read-btn"`)
- Empty state message if no notifications (`data-testid="no-notifications"`)

**Seeded Notifications (for all users):**
- Low balance alert (warning)
- Transfer completed successfully (success)
- New login detected (info)
- Bill payment due reminder (info)

**Behavior:**
- Unread notifications increment the bell badge count on dashboard
- Marking one as read removes the dot and decrements badge count
- Marking all as read clears badge count to 0
- Notifications persisted in `bankApp_notifications_{user}`

**Automation scenarios:**
- Verify 4 seeded notifications appear
- Verify unread indicator on unread notifications
- Mark single notification as read — verify dot disappears and badge decrements
- Mark all as read — verify badge shows 0
- Verify empty state (after reading all or clearing via account reset)
- Verify notifications persist after page reload

---

### 11. User Profile / Settings Page
**Route:** `/profile`

**Elements:**
- Personal info section (read-only display + Edit button):
  - Full name (`data-testid="profile-name"`)
  - Email (`data-testid="profile-email"`)
  - Phone number (`data-testid="profile-phone"`)
  - Address (`data-testid="profile-address"`)
  - Edit Profile button (`data-testid="edit-profile-btn"`) — toggles fields to editable
  - Save Changes button (`data-testid="save-profile-btn"`) — appears in edit mode
  - Cancel button (`data-testid="cancel-edit-btn"`)
- Change Password section:
  - Current password input (`data-testid="current-password"`)
  - New password input (`data-testid="new-password"`)
  - Confirm new password input (`data-testid="confirm-password"`)
  - Save Password button (`data-testid="save-password-btn"`)
- Security section:
  - Two-Factor Authentication toggle (`data-testid="2fa-toggle"`) — UI only, no real 2FA
- Danger Zone:
  - Reset All Data button (`data-testid="reset-data-btn"`) — clears all `bankApp_*_{user}` keys, re-seeds defaults, requires confirmation modal
- Logout button (`data-testid="logout-btn"`)

**Behavior:**
- Editing profile persists to `bankApp_profile_{user}` in localStorage
- Phone must match format `+1XXXXXXXXXX` or `(XXX) XXX-XXXX`
- Email must be valid format
- Change password validates current password first; shows error on mismatch
- New password and confirm must match; shows error on mismatch
- New password must be at least 8 characters
- Reset Data shows a confirmation modal before clearing; after reset all accounts/transactions/payees/notifications are re-seeded

**Automation scenarios:**
- Verify profile fields display correct user data
- Edit profile — update name and save, verify changes persist after reload
- Edit profile — submit invalid email format (expect error)
- Edit profile — submit invalid phone format (expect error)
- Cancel edit — verify changes are discarded
- Change password with correct current password
- Change password with wrong current password — verify error
- Change password with mismatched new/confirm — verify error
- Change password with password less than 8 characters — verify error
- Toggle 2FA — verify toggle state changes
- Reset data — verify modal appears, confirm, verify data re-seeded
- Logout — verify redirect to login and session cleared

---

### 12. Forgot Password Page
**Route:** `/forgot-password`

**Elements:**
- Email input (`data-testid="forgot-email"`)
- Submit button (`data-testid="forgot-submit-btn"`)
- Success message (shown after submit regardless of whether email matches): *"If an account with that email exists, you'll receive a reset link."* (`data-testid="forgot-success-msg"`)
- Back to Login link (`data-testid="back-to-login-link"`)

**Behavior:**
- No real email is sent — success message always shown after submit (security-by-design)
- Empty email shows: *"Please enter your email address."*
- Invalid email format shows: *"Please enter a valid email address."*

**Automation scenarios:**
- Submit with valid email — verify success message
- Submit with empty email — verify required error
- Submit with invalid email format — verify format error
- Verify success message text is generic (does not confirm account existence)
- Click Back to Login — verify navigation

---

## Global / Shared Elements

### Header / Nav Bar
- Bank logo (links to `/dashboard`) (`data-testid="nav-logo"`)
- Navigation links: Dashboard, Accounts, Transfer, Send Money, Bill Pay (`data-testid="nav-{section}"`)
- Notifications bell with badge (`data-testid="nav-notifications"`)
- User avatar / username dropdown (`data-testid="nav-user-menu"`):
  - Profile link
  - Logout option

### Mobile / Responsive Nav
- Hamburger menu button (`data-testid="mobile-menu-btn"`)
- Slide-in nav drawer with same links

**Automation scenarios:**
- Click each nav link — verify correct page loads
- Open user menu — verify Profile and Logout options present
- Click Logout from nav — verify session cleared and redirect to login
- Open and close mobile menu

---

## Error & Edge Case Scenarios (Intentional)

These are built in specifically for automation practice:

| Scenario | Description |
|---|---|
| Locked user | Login blocked with account suspended message |
| Frozen user | Logged in but all money-movement actions (Transfer, Send, Bill Pay) are disabled with banner message |
| Overdraft state | `overdraft_user` checking account has negative balance; displayed in red; excluded from Transfer "From" dropdown |
| Slow loading | `slow_user` has 3 s artificial delay on dashboard and transaction data; loading skeletons shown |
| Session auto-restore | Refresh on any authenticated page restores session from localStorage |
| Direct URL access | Navigating to `/dashboard`, `/transfer` etc. while logged out redirects to `/login` |
| Invalid account ID | `/accounts/FAKE-ID/transactions` shows "Account not found" error state |
| Insufficient funds | Attempting transfer/send/bill-pay for more than available balance shows inline error |
| Past payment date | Bill Pay date set in the past shows validation error |
| Same account transfer | Selecting same From and To account on Transfer page shows error |
| Forgot password | Always returns generic success message — never confirms account existence |

---

## LocalStorage Sync Behavior (Summary)

| Event | localStorage action |
|---|---|
| App first load | Seed `bankApp_users` and `bankApp_accounts_{user}` with defaults if not present |
| Login | Write `bankApp_currentUser` |
| Logout | Remove `bankApp_currentUser` |
| Transfer / Send / Bill Pay | Update balances in `bankApp_accounts_{user}`, append to `bankApp_transactions_{user}` |
| Save payee | Append to `bankApp_payees_{user}` |
| Mark notification read | Update `bankApp_notifications_{user}` |
| Edit profile | Write `bankApp_profile_{user}` |
| Change password | Update matching user in `bankApp_users` |
| Reset data | Delete all `bankApp_*_{user}` keys, re-seed defaults |
| Page load | Read `bankApp_currentUser` → auto-login if present |

---

## Suggested Automation Test Suite Structure

```
tests/
  auth/
    login_valid.spec.js
    login_locked_user.spec.js
    login_invalid_credentials.spec.js
    login_empty_fields.spec.js
    login_remember_me.spec.js
    session_persistence.spec.js
    logout.spec.js
    forgot_password.spec.js

  dashboard/
    dashboard_accounts.spec.js
    dashboard_totals.spec.js
    dashboard_recent_transactions.spec.js
    dashboard_frozen_user.spec.js
    dashboard_overdraft.spec.js
    dashboard_slow_loading.spec.js

  transactions/
    transactions_list.spec.js
    transactions_filter_type.spec.js
    transactions_filter_date.spec.js
    transactions_filter_search.spec.js
    transactions_pagination.spec.js
    transactions_download.spec.js

  transfer/
    transfer_valid.spec.js
    transfer_same_account.spec.js
    transfer_insufficient_funds.spec.js
    transfer_invalid_amount.spec.js
    transfer_scheduled.spec.js
    transfer_frozen_user.spec.js
    transfer_confirmation.spec.js

  send_money/
    send_to_saved_payee.spec.js
    send_to_new_payee.spec.js
    send_save_payee.spec.js
    send_invalid_routing.spec.js
    send_invalid_account.spec.js
    send_insufficient_funds.spec.js
    send_frozen_user.spec.js

  bill_pay/
    bill_pay_saved_biller.spec.js
    bill_pay_new_biller.spec.js
    bill_pay_past_date.spec.js
    bill_pay_scheduled.spec.js
    bill_pay_insufficient_funds.spec.js
    bill_pay_frozen_user.spec.js

  notifications/
    notifications_list.spec.js
    notifications_mark_read.spec.js
    notifications_mark_all_read.spec.js
    notifications_badge_count.spec.js
    notifications_empty_state.spec.js

  profile/
    profile_display.spec.js
    profile_edit_valid.spec.js
    profile_edit_invalid_email.spec.js
    profile_edit_invalid_phone.spec.js
    profile_change_password_valid.spec.js
    profile_change_password_wrong_current.spec.js
    profile_change_password_mismatch.spec.js
    profile_reset_data.spec.js

  e2e/
    full_transfer_flow.spec.js
    full_send_money_flow.spec.js
    full_bill_pay_flow.spec.js
    multi_user_isolation.spec.js
    frozen_user_restrictions.spec.js
    admin_user_view.spec.js
```

---

*Last updated: 2026-06-24*
