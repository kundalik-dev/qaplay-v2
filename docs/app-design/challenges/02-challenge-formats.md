# Challenge Formats & Patterns

To provide a diverse learning experience on QA Playground, we need different types of challenges that test various automation skills. Below are a few core challenge formats we should implement, detailing how they work and what the user is expected to do.

## Format 1: The "Ghost" Element (Shadow DOM / Iframes)
**Focus Skill:** Advanced DOM Traversal
**Difficulty:** 🟡 Intermediate to 🔴 Advanced

### How it works
Modern web apps use Web Components and Iframes to encapsulate styling and logic. Standard locators (like `page.locator('#btn')`) fail here because the elements are hidden behind a Shadow Root or inside a different document context.

- **What the user sees:** A simple button that says "Click Me to Reveal the Secret".
- **The Catch:** The button is nested inside an `iframe`, which itself contains a Custom Web Component with a `shadowRoot`.
- **The Task:** Write an automation script to pierce the iframe and shadow DOM to successfully click the button and extract the revealed text.

### Example Scenario Structure
```html
<!-- Main Page -->
<div class="challenge-container">
  <iframe id="secure-frame" src="/challenges/assets/secure-btn.html"></iframe>
</div>

<!-- Inside iframe (secure-btn.html) -->
<my-secure-component>
  #shadow-root (open)
    <button id="secret-btn">Reveal Secret</button>
</my-secure-component>
```

---

## Format 2: The Race Condition (Dynamic Waits)
**Focus Skill:** Synchronization and Smart Waits
**Difficulty:** 🟢 Beginner to 🟡 Intermediate

### How it works
A common flakiness cause in E2E tests is hardcoded `sleep(5000)` calls instead of waiting for a specific state. This challenge forces users to use smart, dynamic waits.

- **What the user sees:** A "Start Processing" button. Once clicked, a loading spinner appears for a *random* duration (between 1 and 7 seconds). Afterward, a success message flashes for exactly 800ms before disappearing completely.
- **The Catch:** The delay is random, and the success state vanishes quickly. Hardcoded sleeps will either fail because they wait too short, or miss the 800ms window because they wait too long.
- **The Task:** Trigger the process and dynamically wait for the specific locator to be `visible`, assert its text, and do it before it vanishes.

---

## Format 3: The Stubborn API (Network Interception)
**Focus Skill:** API Mocking and Network Intercepts
**Difficulty:** 🔴 Advanced

### How it works
QA engineers often need to test how the UI handles API failures or specific data states without actually modifying the backend.

- **What the user sees:** A dashboard widget that permanently says "Error 500: Internal Server Error. Please contact support." 
- **The Catch:** The frontend is working perfectly, but it's making a `GET /api/user-stats` request that is hardcoded to return a `500` error on our server.
- **The Task:** The user must configure their Playwright/Cypress script to *intercept* the `/api/user-stats` network request and mock the response to return a `200 OK` with a specific JSON payload: `{"status": "success", "users": 42}`. The UI will then render a "Success" widget.

---

## Format 4: The Drag-and-Drop Puzzle
**Focus Skill:** Complex Mouse/Pointer Actions
**Difficulty:** 🟡 Intermediate

### How it works
Native HTML5 drag-and-drop or custom mouse-event-based drag-and-drop can be notoriously tricky to automate.

- **What the user sees:** A kanban board with two columns: "To Do" and "Done". There is a ticket in "To Do".
- **The Catch:** The user cannot just click a button to move it. They must simulate the exact sequence of pointer events: `mousedown`, `mousemove` (across the screen), and `mouseup` over the precise drop zone.
- **The Task:** Write a script that grabs the ticket by its drag handle and successfully drops it into the "Done" column.

---

## Format 5: The CAPTCHA Bypass (Accessibility / Keyboard Nav)
**Focus Skill:** Keyboard Navigation (Tab/Enter) and focus management
**Difficulty:** 🟢 Beginner

### How it works
Testing keyboard accessibility is a massive part of QA.

- **What the user sees:** A multi-step form, but the "Submit" button has `pointer-events: none` (it cannot be clicked with a mouse). 
- **The Catch:** Mouse clicks are disabled via CSS or JS interception.
- **The Task:** The user must automate navigating the form entirely using the `Tab` key and submitting it by pressing `Enter` when the button is focused.
