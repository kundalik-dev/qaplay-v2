# Shopping App — Automation Practice Site
### Feature Specification

> **Purpose:** This is a deliberately designed automation practice site. Every page, field, button, and state exists to give testers something concrete to automate against. The app is intentionally realistic but simplified — no real payments, no real accounts.

---

## Test Users

All users are hardcoded and stored in `localStorage` on first load (seeded data). Passwords are stored in plain text intentionally for easy test inspection.

| Username | Password | State |
|---|---|---|
| `standard_user` | `secret_sauce` | Normal user, full access |
| `locked_out_user` | `secret_sauce` | Blocked at login — shows error |
| `problem_user` | `secret_sauce` | Logged in but some UI elements behave incorrectly (broken images, wrong sort) |
| `performance_glitch_user` | `secret_sauce` | Artificial delay (2–5 s) added to all page loads |
| `admin_user` | `admin_sauce` | Can access order history for all users |

---

## LocalStorage Schema

All app state is persisted in `localStorage` so the session survives page refresh and browser restarts.

```
shopApp_users          → array of user objects (seeded on first visit)
shopApp_currentUser    → username string of logged-in user (or null)
shopApp_cart_{user}    → cart items array for each user
shopApp_orders_{user}  → completed orders array for each user
shopApp_address_{user} → saved address object for each user
shopApp_wishlist_{user}→ wishlist item IDs for each user
```

On app load, the app reads `shopApp_currentUser` and restores the session automatically — no re-login required until the user explicitly logs out.

---

## Pages & Features

---

### 1. Login Page
**Route:** `/` or `/login`

**Elements:**
- Username input field (`data-test="username"`)
- Password input field (`data-test="password"`)
- Login button (`data-test="login-btn"`)
- Error message banner (`data-test="error"`) — hidden by default

**Behavior:**
- Successful login → redirects to `/products`
- `locked_out_user` → shows error: *"Sorry, this user has been locked out."*
- Wrong credentials → shows error: *"Username and password do not match any user in this service."*
- Empty username → shows error: *"Username is required."*
- Empty password → shows error: *"Password is required."*
- If `shopApp_currentUser` is already set in localStorage → redirect to `/products` automatically (skip login)
- Error banner has an `×` close button

**Automation scenarios:**
- Login with valid credentials
- Login with locked-out user
- Login with wrong password
- Login with blank fields (each separately)
- Verify auto-redirect when session exists in localStorage
- Dismiss error message

---

### 2. Products Page
**Route:** `/products`

**Elements:**
- Product grid (responsive, 3 columns on desktop)
- Each product card contains:
  - Product image (`data-test="product-image-{id}"`)
  - Product name link (`data-test="product-name-{id}"`)
  - Product description
  - Price (`data-test="product-price-{id}"`)
  - Add to Cart button (`data-test="add-to-cart-{id}"`) — toggles to Remove from Cart
  - Add to Wishlist icon button
- Sort dropdown (`data-test="sort"`) — options:
  - Name (A–Z) — default
  - Name (Z–A)
  - Price (low to high)
  - Price (high to low)
- Cart icon in header with item count badge (`data-test="cart-count"`)
- Hamburger menu (top-left) — opens sidebar nav
- Logout option in sidebar nav

**Behavior:**
- `Add to Cart` persists to `shopApp_cart_{user}` in localStorage
- Cart badge updates instantly on add/remove
- `problem_user` sees broken product images (wrong `src`) on select items
- `performance_glitch_user` has a simulated 3 s delay before products render
- Sort preference is not persisted (resets on page reload — intentional for test scenarios)

**Automation scenarios:**
- Verify all 6 products are displayed
- Sort by each option and verify order
- Add a product to cart and verify badge count
- Remove a product from cart via the product page
- Add to wishlist and verify
- Verify broken images for `problem_user`
- Verify load delay for `performance_glitch_user`

---

### 3. Product Detail Page
**Route:** `/products/:id`

**Elements:**
- Large product image
- Product name (`data-test="product-detail-name"`)
- Description (`data-test="product-detail-desc"`)
- Price (`data-test="product-detail-price"`)
- Add to Cart / Remove from Cart button (`data-test="product-detail-cart-btn"`)
- Add to Wishlist button
- Back button → returns to `/products`

**Automation scenarios:**
- Navigate to product detail from product card
- Add to cart from detail page and verify cart badge
- Verify back button returns to products list

---

### 4. Cart Page
**Route:** `/cart`

**Elements:**
- List of cart items, each with:
  - Product image (small)
  - Product name (link back to detail)
  - Unit price
  - Quantity stepper (− / qty / +) (`data-test="qty-minus-{id}"`, `data-test="qty-plus-{id}"`)
  - Line total (unit price × qty)
  - Remove item button (`data-test="remove-{id}"`)
- Cart summary panel:
  - Item count
  - Subtotal
  - Tax (8%) (`data-test="tax"`)
  - Order Total (`data-test="order-total"`)
- Checkout button (`data-test="checkout-btn"`) → navigates to address/checkout flow
- Continue Shopping link → back to `/products`
- Empty cart message when no items (`data-test="empty-cart"`)

**Behavior:**
- Quantity changes update line total and order total live
- Removing all items shows empty cart state
- Cart state restored from localStorage on page reload

**Automation scenarios:**
- Verify all added items appear in cart
- Increase and decrease quantity, verify totals update
- Remove individual item
- Remove all items and verify empty state
- Verify tax and total calculations
- Verify cart persists after page reload

---

### 5. Checkout — Address Details Page
**Route:** `/checkout/address`

**Elements:**
- First name input (`data-test="first-name"`)
- Last name input (`data-test="last-name"`)
- Email input (`data-test="email"`)
- Phone number input (`data-test="phone"`)
- Address line 1 (`data-test="address-1"`)
- Address line 2 (optional) (`data-test="address-2"`)
- City (`data-test="city"`)
- State / Province (`data-test="state"`)
- ZIP / Postal code (`data-test="zip"`)
- Country dropdown (`data-test="country"`) — pre-selected to "United States"
- "Save address for future orders" checkbox (`data-test="save-address"`)
- Continue button (`data-test="continue-btn"`) → goes to Order Summary
- Cancel button → back to cart

**Behavior:**
- If `shopApp_address_{user}` exists in localStorage, form is pre-filled
- "Save address" checkbox saves/updates `shopApp_address_{user}` on Continue
- All fields except Address Line 2 are required
- ZIP must be numeric (5 digits for US)
- Email must be valid format

**Automation scenarios:**
- Submit with all valid fields
- Submit with each required field blank (one at a time)
- Submit with invalid email format
- Submit with non-numeric ZIP
- Verify form pre-fills from saved localStorage address
- Verify address saves to localStorage when checkbox checked
- Verify address NOT saved when checkbox unchecked

---

### 6. Checkout — Order Summary Page
**Route:** `/checkout/summary`

**Elements:**
- Read-only list of items being ordered
- Shipping address summary (from previous step)
- Price breakdown (subtotal, tax, shipping, total) (`data-test="summary-total"`)
- Shipping cost: Free for orders over $50, else $5.99 (`data-test="shipping-cost"`)
- Place Order button (`data-test="place-order-btn"`)
- Back button → returns to address page

**Behavior:**
- Clicking Place Order:
  - Creates order object with timestamp, unique order ID, items, totals, address
  - Appends to `shopApp_orders_{user}` in localStorage
  - Clears `shopApp_cart_{user}`
  - Redirects to Order Confirmation page

**Automation scenarios:**
- Verify all cart items appear in summary
- Verify address from previous step is shown
- Verify free shipping threshold (add items over/under $50)
- Verify total includes shipping
- Place order and verify redirect to confirmation
- Verify cart is empty after order placed

---

### 7. Order Confirmation Page
**Route:** `/checkout/confirmation`

**Elements:**
- Success banner / checkmark icon
- Order ID (`data-test="order-id"`) — auto-generated (e.g., `ORD-20240623-0042`)
- Confirmation message with user's first name
- Summary of what was ordered
- "Back to Home" button → `/products`
- "View Order History" button → `/orders`

**Automation scenarios:**
- Verify order ID is displayed and matches format
- Verify confirmation message contains user's name
- Verify ordered items are listed
- Click Back to Home → verify navigation
- Click View Order History → verify navigation

---

### 8. Order History Page
**Route:** `/orders`

**Elements:**
- List of past orders, each showing:
  - Order ID (`data-test="order-id-{id}"`)
  - Order date
  - Number of items
  - Order total
  - Status badge: Delivered / Processing / Shipped (`data-test="order-status-{id}"`)
  - "View Details" button (`data-test="view-order-{id}"`)
- Empty state message if no orders yet (`data-test="no-orders"`)
- `admin_user` sees a user filter dropdown to view orders for any user

**Behavior:**
- Orders loaded from `shopApp_orders_{user}` in localStorage
- Sorted newest first by default
- Status is randomly assigned on order creation (for automation variety): 70% Delivered, 20% Shipped, 10% Processing

**Automation scenarios:**
- Verify orders appear after placing one
- Verify order ID, date, total match what was placed
- Verify empty state when no orders exist
- Click View Details and verify navigation to order detail
- Verify `admin_user` sees user filter
- Verify orders persist after page reload

---

### 9. Order Detail Page
**Route:** `/orders/:orderId`

**Elements:**
- Order ID heading
- Order date and status badge
- Items table: name, qty, unit price, line total
- Shipping address used for this order
- Price breakdown (subtotal, tax, shipping, total)
- "Back to Order History" button

**Automation scenarios:**
- Verify all items from that order are listed
- Verify address matches what was entered at checkout
- Verify totals match order history totals
- Back button returns to order history

---

### 10. User Profile / Account Page
**Route:** `/account`

**Elements:**
- Display name (first + last from address data, or username fallback)
- Username (read-only)
- Email (editable)
- Change Password section:
  - Current password input
  - New password input
  - Confirm new password input
  - Save button (`data-test="save-password"`)
- Saved Address section (mirrors address form fields from checkout)
  - Pre-filled from `shopApp_address_{user}`
  - Save Address button (`data-test="save-address-btn"`)
- Danger Zone:
  - Reset All Data button (`data-test="reset-data"`) — clears all localStorage keys for this user, confirms via modal
- Logout button (`data-test="logout-btn"`)

**Behavior:**
- Saving address updates `shopApp_address_{user}` in localStorage
- Change password validates current password, then updates stored user
- Reset Data shows a confirmation modal before clearing

**Automation scenarios:**
- Verify profile fields display correct user data
- Save updated email
- Change password with correct current password
- Change password with wrong current password (expect error)
- Change password where new ≠ confirm (expect error)
- Save address and verify it pre-fills on checkout
- Reset data and verify cart/orders/address cleared
- Logout and verify redirect to login

---

### 11. Wishlist Page
**Route:** `/wishlist`

**Elements:**
- Grid of wishlisted products
- Each item has: image, name, price, Add to Cart button, Remove from Wishlist button
- Empty state message when wishlist is empty (`data-test="empty-wishlist"`)

**Behavior:**
- Wishlist persisted in `shopApp_wishlist_{user}`

**Automation scenarios:**
- Add item to wishlist from products page, verify it appears here
- Add to cart from wishlist
- Remove from wishlist
- Verify empty state

---

## Global / Shared Elements

### Header
- App logo (links to `/products`)
- Cart icon with badge count
- Wishlist icon with badge count
- Hamburger menu (sidebar nav)

### Sidebar Nav
- Products
- Cart
- Wishlist
- Order History
- My Account
- Logout
- Close (`×`) button (`data-test="close-menu"`)

**Automation scenarios:**
- Open and close sidebar
- Navigate to each section from sidebar
- Verify cart badge reflects current cart state

---

## Error & Edge Case Scenarios (Intentional)

These are built in specifically for automation practice:

| Scenario | Description |
|---|---|
| Locked-out user | Login blocked with specific error message |
| problem_user broken images | 2 of 6 product images have wrong `src` |
| problem_user sort bug | Sort by Name Z–A returns wrong order |
| performance_glitch_user delay | Products page loads after 3 s artificial delay |
| Session persistence | Refresh on any page restores state from localStorage |
| Empty cart checkout | Checkout button on empty cart shows error, no navigation |
| Direct URL access | Navigating to `/cart`, `/orders` etc. while logged out redirects to `/login` |
| Invalid order ID | `/orders/FAKE-ID` shows "Order not found" error state |

---

## LocalStorage Sync Behavior (Summary)

| Event | localStorage action |
|---|---|
| App first load | Seed `shopApp_users` with test users if not present |
| Login | Write `shopApp_currentUser` |
| Logout | Remove `shopApp_currentUser` |
| Add/remove cart item | Update `shopApp_cart_{user}` |
| Place order | Append to `shopApp_orders_{user}`, clear `shopApp_cart_{user}` |
| Save address | Write `shopApp_address_{user}` |
| Change password | Update `shopApp_users` entry |
| Reset data | Delete all `shopApp_*_{user}` keys |
| Page load | Read `shopApp_currentUser` → auto-login if present |

---

## Suggested Automation Test Suite Structure

```
tests/
  auth/
    login_valid.spec.js
    login_locked_user.spec.js
    login_invalid_credentials.spec.js
    login_empty_fields.spec.js
    session_persistence.spec.js
    logout.spec.js

  products/
    products_display.spec.js
    products_sorting.spec.js
    add_remove_cart.spec.js
    wishlist.spec.js
    problem_user_ui.spec.js

  cart/
    cart_items.spec.js
    cart_quantity.spec.js
    cart_totals.spec.js
    cart_empty_state.spec.js
    cart_persistence.spec.js

  checkout/
    address_form_valid.spec.js
    address_form_validation.spec.js
    address_prefill.spec.js
    order_summary.spec.js
    shipping_cost.spec.js
    place_order.spec.js

  orders/
    order_history.spec.js
    order_detail.spec.js
    order_confirmation.spec.js

  account/
    profile_display.spec.js
    change_password.spec.js
    save_address.spec.js
    reset_data.spec.js

  e2e/
    full_purchase_flow.spec.js
    multi_user_isolation.spec.js
```

---

*Last updated: 2026-06-23*