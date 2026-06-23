# Automation Practice Locator Design Guide

Use this guide when creating new QA Playground pages, sections, and elements. This project is not a normal full-stack SaaS product where every element should always be easy to locate. QA Playground is a practice ground for automation testers, so elements should be designed to teach different locator strategies at different difficulty levels.

The goal is to create realistic UI that helps testers practice Playwright locators, CSS selectors, XPath, dynamic locators, sibling relationships, parent/ancestor relationships, table locators, dropdown locators, missing locator cases, and tricky real-world DOM patterns.

## Core Instruction for AI

When creating new UI for QA Playground:

- Treat every page as an automation testing exercise.
- Add locator variety intentionally.
- Do not make every element equally easy.
- Mix beginner, medium, hard, and challenge-level elements.
- Keep the UI usable and accessible, but include realistic locator problems.
- Provide enough structure that every challenge is solvable.
- Avoid completely impossible or random selectors.
- Use semantic HTML where it makes sense.
- Use stable test attributes only for the difficulty level that needs them.
- Create repeated elements, dynamic elements, nested elements, and relationship-based elements for locator practice.

## Difficulty Levels

Each page or component should include a balanced mix of locator difficulty.

| Level | Purpose | Locator style |
| --- | --- | --- |
| Beginner | Learn clean locators | `getByRole`, `getByLabel`, `getByPlaceholder`, `getByTestId`, simple CSS |
| Medium | Practice scoping and repeated elements | parent-child locators, table row locators, card locators, filtered Playwright locators |
| Hard | Practice complex relationships | XPath axes, siblings, ancestors, dynamic attributes, partial text |
| Challenge | Practice real-world difficult cases | missing test ids, duplicate labels, dynamic IDs, hidden duplicates, async content, nested DOM |

Do not create only beginner-level elements. Every practice page should include at least one medium or hard locator challenge.

## Locator Types to Include

Use a mix of these locator types across pages:

- Playwright `getByRole`
- Playwright `getByLabel`
- Playwright `getByPlaceholder`
- Playwright `getByText`
- Playwright `getByTestId`
- CSS selectors using attributes
- CSS selectors using parent/child relationships
- XPath using exact text
- XPath using partial text
- XPath using `following-sibling`
- XPath using `preceding-sibling`
- XPath using `ancestor`
- XPath using `descendant`
- XPath using table row and cell context
- Dynamic locators using ids, slugs, indexes, or business values
- Scoped locators inside cards, tables, dialogs, dropdowns, and lists

## Beginner Locator Elements

Beginner elements should be clean, direct, and easy to automate.

Use these for first-time learners:

```html
<label for="login-email">Email address</label>
<input
  id="login-email"
  name="email"
  type="email"
  placeholder="Enter email"
  data-testid="login-email-input"
/>

<button type="submit" data-testid="login-submit-button">Login</button>
```

Expected locator practice:

```ts
await page.getByLabel('Email address').fill('qa@example.com');
await page.getByPlaceholder('Enter email').fill('qa@example.com');
await page.getByTestId('login-email-input').fill('qa@example.com');
await page.getByRole('button', { name: 'Login' }).click();
```

Beginner rules:

- Use clear labels.
- Use visible button text.
- Use stable `data-testid`.
- Use real `button`, `input`, `select`, and `a` elements.
- Keep names unique.

## Medium Locator Elements

Medium elements should require scoping, filtering, or finding an element inside a repeated parent.

Use these for cards, tables, lists, and repeated sections:

```html
<article data-testid="course-card" data-course-slug="playwright-basics">
  <h3>Playwright Basics</h3>
  <p>Beginner course</p>
  <button data-testid="course-start-button">Start</button>
</article>

<article data-testid="course-card" data-course-slug="xpath-mastery">
  <h3>XPath Mastery</h3>
  <p>Advanced course</p>
  <button data-testid="course-start-button">Start</button>
</article>
```

Expected locator practice:

```ts
const course = page.getByTestId('course-card').filter({ hasText: 'XPath Mastery' });
await course.getByRole('button', { name: 'Start' }).click();
```

CSS practice:

```css
[data-testid="course-card"][data-course-slug="xpath-mastery"] [data-testid="course-start-button"]
```

XPath practice:

```xpath
//article[@data-testid="course-card" and .//h3[normalize-space()="XPath Mastery"]]//button[normalize-space()="Start"]
```

Medium rules:

- Reuse the same `data-testid` for repeated items.
- Add a unique business attribute such as `data-course-slug`, `data-user-id`, or `data-invoice-id`.
- Put action buttons inside repeated cards/rows.
- Make testers scope to the correct parent before clicking the child action.

## Hard Locator Elements

Hard elements should require relationship-based locators, sibling axes, ancestor axes, partial matching, or dynamic values.

Use these when creating advanced practice sections:

```html
<div class="field-row">
  <span class="field-label">Recovery Email</span>
  <div class="field-control">
    <input name="recovery_email_2026" type="email" />
  </div>
  <p class="field-hint">Used only when account recovery is required</p>
</div>
```

Expected XPath practice:

```xpath
//span[normalize-space()="Recovery Email"]/following-sibling::div//input
//span[normalize-space()="Recovery Email"]/ancestor::div[contains(@class, "field-row")]//input
```

Dynamic attribute practice:

```xpath
//input[starts-with(@name, "recovery_email_")]
```

Hard rules:

- Use nearby text instead of direct labels for some elements.
- Use dynamic attribute values with stable prefixes.
- Require testers to locate the parent section first.
- Include sibling or ancestor relationships.
- Keep one reliable path available through text, structure, or stable partial attribute.

## Challenge Locator Elements

Challenge elements should simulate real automation problems, but they must still be fair.

Use these sparingly:

```html
<section data-testid="notification-settings">
  <h2>Notification Settings</h2>

  <div class="setting-row">
    <span>Email updates</span>
    <button aria-label="Toggle Email updates">Off</button>
  </div>

  <div class="setting-row">
    <span>SMS updates</span>
    <button aria-label="Toggle SMS updates">Off</button>
  </div>
</section>
```

Expected locator practice:

```ts
const settings = page.getByTestId('notification-settings');
await settings.getByRole('button', { name: 'Toggle SMS updates' }).click();
```

XPath practice:

```xpath
//span[normalize-space()="SMS updates"]/following-sibling::button
//section[@data-testid="notification-settings"]//span[normalize-space()="SMS updates"]/following-sibling::button
```

Challenge rules:

- Some elements may intentionally miss `data-testid`.
- Some repeated controls may have similar labels.
- Some IDs may be dynamic.
- Some text may require `contains()` or `starts-with()`.
- Some actions should require sibling or ancestor traversal.
- Do not make the locator depend only on visual CSS classes.
- Do not make the challenge impossible by removing all stable text and attributes.

## Missing Locator Practice

Sometimes intentionally omit `data-testid` so testers learn alternatives.

Good missing-locator challenge:

```html
<div data-testid="shipping-address-form">
  <label for="address-city">City</label>
  <input id="address-city" name="city" />

  <label for="address-state">State</label>
  <input id="address-state" name="state" />

  <button type="button">Use as default address</button>
</div>
```

Expected practice:

```ts
await page.getByTestId('shipping-address-form').getByLabel('City').fill('Pune');
await page.getByTestId('shipping-address-form').getByRole('button', { name: 'Use as default address' }).click();
```

Missing locator rules:

- It is okay to omit `data-testid` from child elements if the parent has a stable locator.
- Keep labels, roles, names, or surrounding text available.
- Do not omit all useful locator paths.

## Dynamic Locator Practice

Use dynamic locators for rows, cards, generated records, uploads, notifications, and search results.

```html
<tr data-testid="invoice-row" data-invoice-id="INV-2026-1048">
  <td>INV-2026-1048</td>
  <td>Paid</td>
  <td>June 18, 2026</td>
  <td>
    <button aria-label="Download invoice INV-2026-1048">Download</button>
  </td>
</tr>
```

Expected locator practice:

```ts
const invoice = page.locator('[data-testid="invoice-row"][data-invoice-id="INV-2026-1048"]');
await invoice.getByRole('button', { name: /Download invoice/ }).click();
```

XPath practice:

```xpath
//tr[@data-invoice-id="INV-2026-1048"]//button[contains(@aria-label, "Download invoice")]
//tr[td[normalize-space()="INV-2026-1048"]]//button
```

Dynamic rules:

- Add stable dynamic values such as invoice ids, user ids, slugs, order ids, or row ids.
- Avoid random-only values with no stable prefix.
- If an attribute is dynamic, provide text or a parent attribute that helps locate it.

## XPath Axes Practice

Create elements that allow testers to practice XPath axes.

### Following sibling

```html
<label>Username</label>
<input name="username" />
```

```xpath
//label[normalize-space()="Username"]/following-sibling::input
```

### Preceding sibling

```html
<input name="coupon" />
<button>Apply Coupon</button>
```

```xpath
//button[normalize-space()="Apply Coupon"]/preceding-sibling::input
```

### Ancestor

```html
<div data-testid="profile-card">
  <h3>Rahul Sharma</h3>
  <button>Edit</button>
</div>
```

```xpath
//h3[normalize-space()="Rahul Sharma"]/ancestor::*[@data-testid="profile-card"]//button[normalize-space()="Edit"]
```

### Descendant

```xpath
//*[@data-testid="profile-card"]//button[normalize-space()="Edit"]
```

### Table row by cell

```xpath
//tr[td[normalize-space()="Rahul Sharma"] and td[normalize-space()="Active"]]//button[normalize-space()="Edit"]
```

## Dropdown Practice

Create both simple and complex dropdowns.

### Beginner native select

```html
<label for="country">Country</label>
<select id="country" name="country" data-testid="country-select">
  <option value="">Select country</option>
  <option value="IN">India</option>
  <option value="US">United States</option>
</select>
```

```ts
await page.getByLabel('Country').selectOption('IN');
```

### Medium custom dropdown

```html
<button type="button" aria-haspopup="listbox" aria-expanded="false" data-testid="country-dropdown-trigger">
  Select country
</button>
<div role="listbox" data-testid="country-dropdown-list">
  <div role="option" data-value="IN">India</div>
  <div role="option" data-value="US">United States</div>
</div>
```

```ts
await page.getByTestId('country-dropdown-trigger').click();
await page.getByRole('option', { name: 'India' }).click();
```

```xpath
//*[@role="listbox"]//*[@role="option" and normalize-space()="India"]
```

### Hard searchable dropdown

```html
<div data-testid="city-combobox">
  <label for="city-search">City</label>
  <input id="city-search" role="combobox" aria-expanded="true" aria-controls="city-results" />
  <ul id="city-results" role="listbox">
    <li role="option" data-city-id="city-pune">Pune</li>
    <li role="option" data-city-id="city-mumbai">Mumbai</li>
  </ul>
</div>
```

```ts
await page.getByRole('combobox', { name: 'City' }).fill('Pun');
await page.getByRole('option', { name: 'Pune' }).click();
```

```xpath
//*[@data-testid="city-combobox"]//*[@role="option" and @data-city-id="city-pune"]
```

## Form Practice

Forms should include mixed locator levels.

Recommended form design:

- Beginner fields with labels and `data-testid`.
- Medium fields inside repeated groups.
- Hard fields with nearby labels or hints.
- Error messages connected by `aria-describedby`.
- Submit buttons with clear roles.
- At least one field that requires XPath sibling or ancestor logic.

Example:

```html
<form data-testid="profile-form" aria-labelledby="profile-form-title">
  <h2 id="profile-form-title">Profile Details</h2>

  <label for="profile-first-name">First name</label>
  <input id="profile-first-name" name="firstName" data-testid="profile-first-name-input" />

  <div class="field-row">
    <span>Backup email</span>
    <div>
      <input name="backup_email_dynamic_01" type="email" />
    </div>
  </div>

  <label for="profile-role">Role</label>
  <select id="profile-role" name="role">
    <option>Admin</option>
    <option>Editor</option>
  </select>

  <button type="submit">Save profile</button>
</form>
```

Expected practice:

```ts
await page.getByTestId('profile-form').getByLabel('First name').fill('Rahul');
await page.getByRole('button', { name: 'Save profile' }).click();
```

```xpath
//span[normalize-space()="Backup email"]/following::input[1]
//input[starts-with(@name, "backup_email_dynamic_")]
```

## Table Practice

Tables are excellent for medium and hard locator practice.

Create rows with:

- A shared row locator.
- A unique row id or business id.
- Multiple cells.
- Repeated action buttons.
- At least one action button without `data-testid`.

Example:

```html
<table data-testid="user-table">
  <thead>
    <tr>
      <th>Name</th>
      <th>Status</th>
      <th>Role</th>
      <th>Actions</th>
    </tr>
  </thead>
  <tbody>
    <tr data-testid="user-row" data-user-id="user-104">
      <td>Rahul Sharma</td>
      <td>Active</td>
      <td>Admin</td>
      <td>
        <button>Edit</button>
        <button aria-label="Deactivate Rahul Sharma">Deactivate</button>
      </td>
    </tr>
  </tbody>
</table>
```

Expected practice:

```ts
const row = page.getByTestId('user-row').filter({ hasText: 'Rahul Sharma' });
await row.getByRole('button', { name: 'Edit' }).click();
```

```xpath
//tr[td[normalize-space()="Rahul Sharma"] and td[normalize-space()="Active"]]//button[normalize-space()="Edit"]
//tr[@data-user-id="user-104"]//button[contains(@aria-label, "Deactivate")]
```

## Modal and Dialog Practice

Dialogs should be accessible, but inner actions can vary in difficulty.

```html
<section role="dialog" aria-modal="true" aria-labelledby="delete-dialog-title" data-testid="delete-user-dialog">
  <h2 id="delete-dialog-title">Delete user</h2>
  <p>Rahul Sharma will be permanently removed.</p>
  <button>Cancel</button>
  <button aria-label="Confirm delete Rahul Sharma">Delete</button>
</section>
```

Expected practice:

```ts
const dialog = page.getByRole('dialog', { name: 'Delete user' });
await dialog.getByRole('button', { name: 'Confirm delete Rahul Sharma' }).click();
```

```xpath
//*[@role="dialog" and .//h2[normalize-space()="Delete user"]]//button[contains(@aria-label, "Confirm delete")]
```

## Page Composition Rule

When creating a new practice page, include this locator difficulty mix:

- 40 percent beginner elements.
- 30 percent medium elements.
- 20 percent hard elements.
- 10 percent challenge elements.

For advanced pages, increase hard and challenge elements.

Each page should include:

- At least one simple `getByRole` practice.
- At least one `getByLabel` practice.
- At least one `getByTestId` practice.
- At least one scoped locator practice.
- At least one XPath axes practice.
- At least one dynamic locator practice when the page has lists, rows, cards, or generated content.

## Naming Rules

Use readable kebab-case names for stable locator attributes:

```html
data-testid="login-email-input"
data-testid="course-card"
data-testid="invoice-row"
data-testid="country-dropdown-trigger"
data-testid="profile-form"
data-testid="delete-user-dialog"
```

Use this pattern:

```text
<page-or-section>-<purpose>-<element-type>
```

For repeated items, prefer a shared test id plus a unique data attribute:

```html
<article data-testid="course-card" data-course-slug="xpath-mastery">
<tr data-testid="invoice-row" data-invoice-id="INV-2026-1048">
<div data-testid="user-card" data-user-id="user-104">
```

## What Not to Do

Avoid these mistakes:

- Do not make every element have a perfect `data-testid`.
- Do not make every challenge depend on brittle CSS classes.
- Do not use only `nth-child` as the intended solution.
- Do not create impossible elements with no text, no role, no attribute, and no relationship.
- Do not create inaccessible controls unless the lesson is specifically about bad accessibility.
- Do not use random generated class names as the only locator path.
- Do not create duplicate `data-testid` values in unrelated sections unless the practice requires scoping.

## Reusable Prompt for Future UI Work

Use this instruction when asking AI to create new QA Playground elements:

```text
Create this UI as an automation testing practice page, not as a normal SaaS page. Add locator practice intentionally across beginner, medium, hard, and challenge levels. Include clean Playwright locators such as getByRole, getByLabel, and getByTestId for beginner elements. Add repeated cards, rows, dropdowns, or grouped controls for scoped locator practice. Add dynamic attributes and business ids where useful. Include some elements that intentionally do not have data-testid so testers practice CSS, text, role, XPath, siblings, ancestors, descendants, and axes locators. Keep every challenge solvable with stable text, semantic structure, ARIA, parent context, or dynamic attributes.
```

