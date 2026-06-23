import type { ScenarioMeta, FrameworkMethods } from "@/data/practice-data/types";

export const shadowDomScenarios: ScenarioMeta[] = [
  {
    id: "S01",
    title: "Scenario 1: Basic Shadow Host — Open Mode (Beginner)",
    testId: "scenario-sd-basic",
    resultId: "result-s01",
    initialResult: "Shadow button not clicked",
    hint: `Shadow host: <code>[data-testid="shadow-host-basic"]</code>. Inside shadow root: <code>[data-testid="shadow-btn-basic"]</code>. Playwright auto-pierces: <code>page.locator('[data-testid="shadow-host-basic"]').locator('[data-testid="shadow-btn-basic"]').click()</code>. The click count spans has <code>id="shadow-click-count"</code> only — no testid. Locate: <code>page.locator('#shadow-click-count')</code> (Playwright also pierces by id through shadow).`,
  },
  {
    id: "S02",
    title: "Scenario 2: Multiple Shadow Hosts — Scope to Correct Host (Medium)",
    testId: "scenario-sd-multi-host",
    resultId: "result-s02",
    initialResult: "No host activated",
    hint: `Three hosts share <code>data-testid="shadow-host"</code> but differ on <code>data-host-id="host-1/2/3"</code>. Inside each shadow root: <code>[data-testid="shadow-action-btn"]</code>. Scope to host-2: <code>page.locator('[data-testid="shadow-host"][data-host-id="host-2"]').locator('[data-testid="shadow-action-btn"]').click()</code>. XPath can find the host but cannot pierce into shadow: combine <code>//div[@data-host-id="host-2"]</code> with CSS/Playwright for the inner element.`,
  },
  {
    id: "S03",
    title: "Scenario 3: Nested Shadow DOM — 2 Levels (Medium)",
    testId: "scenario-sd-nested",
    resultId: "result-s03",
    initialResult: "Inner shadow not interacted",
    hint: `Outer host: <code>[data-testid="shadow-outer-host"]</code>. The inner host inside outer shadow has no testid — only <code>class="shadow-inner-host"</code> and <code>data-inner="true"</code>. Inner shadow root has <code>[data-testid="shadow-inner-btn"]</code>. Playwright: <code>page.locator('[data-testid="shadow-outer-host"]').locator('[data-inner="true"]').locator('[data-testid="shadow-inner-btn"]').click()</code>. Selenium: <code>outerHost.getShadowRoot().findElement(By.className("shadow-inner-host")).getShadowRoot().findElement(By.cssSelector("[data-testid='shadow-inner-btn']")).click()</code>.`,
  },
  {
    id: "S04",
    title: "Scenario 4: Form Inside Shadow DOM — getByRole / getByLabel (Hard)",
    testId: "scenario-sd-form",
    resultId: "result-s04",
    initialResult: "Shadow form not submitted",
    hint: `Shadow host: <code>[data-testid="shadow-form-host"]</code>. Input has <code>id="shadow-name-input"</code> and <code>name="shadowName"</code> but <strong>no testid</strong>. Select has <code>id="shadow-role-select"</code>, no testid. Submit button has <code>[data-testid="shadow-submit-btn"]</code>. Playwright: <code>page.locator('[data-testid="shadow-form-host"]').getByRole('textbox', &#123; name: 'Full name' &#125;).fill('Ada')</code>. XPath cannot pierce shadow DOM — must use CSS or role-based locators inside the shadow scope.`,
    badge: "HARD",
  },
  {
    id: "S05",
    title: "Scenario 5: Dynamic Content in Shadow DOM (Hard)",
    testId: "scenario-sd-dynamic",
    resultId: "result-s05",
    initialResult: "Dynamic shadow content not loaded",
    hint: `Shadow host: <code>[data-testid="shadow-dynamic-host"]</code>. Content appears after ~1.5 s. The revealed button has <strong>no testid</strong> — only <code>aria-label="Trigger Shadow Action"</code>. Playwright: <code>await expect(page.locator('[data-testid="shadow-dynamic-host"]').getByRole('button', &#123; name: 'Trigger Shadow Action' &#125;)).toBeVisible(&#123; timeout: 5000 &#125;)</code> then click. The spinner has <code>role="status"</code>, no testid.`,
    badge: "HARD",
  },
  {
    id: "S06",
    title: "Scenario 6: evaluate() to Pierce Shadow Root (Challenge)",
    testId: "scenario-sd-eval",
    resultId: "result-s06",
    initialResult: "Evaluate not executed",
    hint: `Shadow host: <code>[data-testid="shadow-eval-host"]</code>. Inside the shadow root: an input with only <code>name="evalCode"</code> (no id, no testid, no label) and a plain button with only visible text "Execute" (no attributes). Standard locators <strong>cannot</strong> target nameless elements inside shadow. Playwright: <code>page.evaluate(() => &#123; const h = document.querySelector('[data-testid="shadow-eval-host"]'); const s = h.shadowRoot; s.querySelector('input[name="evalCode"]').value = 'test'; s.querySelector('button').click(); &#125;)</code>. Selenium: <code>js.executeScript("arguments[0].shadowRoot.querySelector('button').click()", hostEl)</code>.`,
    badge: "CHALLENGE",
  },
];

export const shadowDomFrameworkMethods: Record<"selenium" | "playwright" | "cypress", FrameworkMethods> = {
  selenium: {
    label: "Selenium (Java)",
    methods: [
      { color: "purple", label: "element.getShadowRoot()" },
      { color: "blue",   label: "shadowRoot.findElement(By.cssSelector(...))" },
      { color: "orange", label: "js.executeScript(\"el.shadowRoot.querySelector(...)\")" },
      { color: "slate",  label: "No XPath inside shadow DOM" },
    ],
  },
  playwright: {
    label: "Playwright (JS/TS)",
    methods: [
      { color: "green",  label: "Auto-pierces open shadow DOM" },
      { color: "green",  label: "locator().locator() — chained scope" },
      { color: "blue",   label: "getByRole / getByLabel inside shadow" },
      { color: "orange", label: "page.evaluate(() => el.shadowRoot...)" },
    ],
  },
  cypress: {
    label: "Cypress",
    methods: [
      { color: "emerald", label: "cy.get('[data-testid=...]').shadow()" },
      { color: "blue",    label: ".shadow().find('[data-testid=...]')" },
      { color: "orange",  label: "cy.get('host').then(el => el[0].shadowRoot.querySelector(...))" },
      { color: "slate",   label: "cypress-shadow-zone plugin" },
    ],
  },
};
