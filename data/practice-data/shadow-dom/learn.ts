import type { LearnCodeSnippet, MethodRow, FaqItem, TocItem } from "@/data/practice-data/types";

/* ── Learn descriptions ─────────────────────────────────────────────────── */
export const shadowDomLearnDesc = {
  overview:
    "Shadow DOM encapsulates a subtree of DOM nodes inside a host element, hiding its internals from the main document. This is the foundation of Web Components. Automation tools handle open shadow roots differently: Playwright auto-pierces, Selenium 4 provides getShadowRoot(), and Cypress uses .shadow(). Closed shadow roots require JavaScript evaluate() to interact with.",
  basic:
    "Playwright automatically pierces open shadow roots when you chain locators. Selenium 4 introduced the getShadowRoot() method for Java, Python, and C#. Cypress exposes the .shadow() command for traversing into shadow DOM.",
  nested:
    "Nested shadow trees require chaining getShadowRoot() calls in Selenium or chaining locators in Playwright. Each host element is a boundary. Playwright handles any depth automatically; Selenium requires one getShadowRoot() call per nesting level.",
  evaluate:
    "When elements inside shadow DOM have no stable attributes (no testid, no aria-label), you must use JavaScript evaluation to interact with them. page.evaluate() in Playwright gives direct DOM access. Selenium uses JavascriptExecutor for the same purpose.",
  closed:
    "Closed shadow roots (mode: 'closed') prevent external access to the shadow root via .shadowRoot. Standard locators cannot pierce closed shadow. Only internally stored references (via attachShadow return value) work from JS. In practice, automation usually interacts with open shadow roots.",
};

/* ── Code snippets ──────────────────────────────────────────────────────── */
export const shadowDomLearnCode: Record<"basic" | "nested" | "evaluate" | "closed", LearnCodeSnippet> = {
  basic: {
    pw: {
      lang: "typescript",
      code: `// Playwright auto-pierces open shadow DOM — just chain locators
const host = page.locator('[data-testid="shadow-host-basic"]');

// Click button inside shadow root
await host.locator('[data-testid="shadow-btn-basic"]').click();

// Assert count span (only has id, no testid)
await expect(host.locator('#shadow-click-count')).toHaveText('1');

// Alternative: getByRole/getByLabel also works inside shadow
await page.locator('[data-testid="shadow-form-host"]')
  .getByRole('textbox', { name: 'Full name' })
  .fill('Ada Lovelace');`,
    },
    sel: {
      lang: "java",
      code: `// Selenium 4 — getShadowRoot() for open shadow
WebElement host = driver.findElement(
  By.cssSelector("[data-testid='shadow-host-basic']")
);

// Enter shadow root
SearchContext shadow = host.getShadowRoot();

// Find and click button inside shadow
WebElement btn = shadow.findElement(
  By.cssSelector("[data-testid='shadow-btn-basic']")
);
btn.click();

// Assert count text
WebElement count = shadow.findElement(By.id("shadow-click-count"));
assertEquals("1", count.getText());`,
    },
    cy: {
      lang: "javascript",
      code: `// Cypress — .shadow() command to enter shadow root
cy.get('[data-testid="shadow-host-basic"]')
  .shadow()
  .find('[data-testid="shadow-btn-basic"]')
  .click();

// Assert count inside shadow
cy.get('[data-testid="shadow-host-basic"]')
  .shadow()
  .find('#shadow-click-count')
  .should('have.text', '1');

// Tip: enable global shadow piercing in cypress.config.js
// experimentalShadowDomSupport: true`,
    },
  },

  nested: {
    pw: {
      lang: "typescript",
      code: `// Playwright — auto-pierces any depth of shadow DOM
// Outer host → inner shadow host → button
await page
  .locator('[data-testid="shadow-outer-host"]')  // outer host
  .locator('[data-inner="true"]')                 // inner host (no testid)
  .locator('[data-testid="shadow-inner-btn"]')    // button inside inner shadow
  .click();

// Playwright resolves each locator within its shadow scope automatically`,
    },
    sel: {
      lang: "java",
      code: `// Selenium — chain getShadowRoot() for each nesting level
WebElement outerHost = driver.findElement(
  By.cssSelector("[data-testid='shadow-outer-host']")
);

// Enter first shadow root
SearchContext outerShadow = outerHost.getShadowRoot();

// Find the inner host (no testid — locate by class or attribute)
WebElement innerHost = outerShadow.findElement(
  By.cssSelector(".shadow-inner-host")
);

// Enter second shadow root
SearchContext innerShadow = innerHost.getShadowRoot();

// Finally find the target button
WebElement btn = innerShadow.findElement(
  By.cssSelector("[data-testid='shadow-inner-btn']")
);
btn.click();`,
    },
    cy: {
      lang: "javascript",
      code: `// Cypress — chain .shadow().find() for nested hosts
cy.get('[data-testid="shadow-outer-host"]')
  .shadow()
  .find('.shadow-inner-host')   // inner host has no testid
  .shadow()
  .find('[data-testid="shadow-inner-btn"]')
  .click();`,
    },
  },

  evaluate: {
    pw: {
      lang: "typescript",
      code: `// Playwright evaluate() — when elements have no stable selectors
await page.evaluate(() => {
  const host = document.querySelector('[data-testid="shadow-eval-host"]');
  const shadow = host?.shadowRoot;
  if (!shadow) throw new Error('Shadow root not accessible');

  // Set input value (input has only name="evalCode", no id/testid)
  const input = shadow.querySelector<HTMLInputElement>('input[name="evalCode"]');
  if (input) input.value = 'automation-test';

  // Click the nameless button (only visible text "Execute")
  const btn = shadow.querySelector<HTMLButtonElement>('button');
  btn?.click();
});

// Verify result via a data attribute set by the shadow script
const host = page.locator('[data-testid="shadow-eval-host"]');
await expect(host).toHaveAttribute('data-eval-done', 'true');`,
    },
    sel: {
      lang: "java",
      code: `// Selenium — JavascriptExecutor to pierce shadow DOM
JavascriptExecutor js = (JavascriptExecutor) driver;

WebElement host = driver.findElement(
  By.cssSelector("[data-testid='shadow-eval-host']")
);

// Fill the nameless input via JS
js.executeScript(
  "arguments[0].shadowRoot.querySelector('input[name=\"evalCode\"]').value = 'test'",
  host
);

// Click the nameless button via JS
js.executeScript(
  "arguments[0].shadowRoot.querySelector('button').click()",
  host
);`,
    },
    cy: {
      lang: "javascript",
      code: `// Cypress — access shadow root via native DOM in .then()
cy.get('[data-testid="shadow-eval-host"]').then(($host) => {
  const shadow = $host[0].shadowRoot;
  const input = shadow.querySelector('input[name="evalCode"]');
  input.value = 'automation-test';

  const btn = shadow.querySelector('button');
  btn.click();
});`,
    },
  },

  closed: {
    pw: {
      lang: "typescript",
      code: `// Closed shadow roots — .shadowRoot returns null externally
const isNull = await page.evaluate(() => {
  const host = document.querySelector('[data-testid="shadow-eval-host"]');
  return host?.shadowRoot === null; // true for mode: 'closed'
});

// The only way in: evaluate with an internally stored reference
// (set up when the shadow was created)
await page.evaluate(() => {
  // closedShadowRef is a variable kept inside the page scope
  // set during attachShadow({ mode: 'closed' })
  if (typeof window.__closedShadow !== 'undefined') {
    window.__closedShadow.querySelector('button')?.click();
  }
});

// In practice: real-world components rarely use closed mode.
// Open shadow roots are the automation-realistic target.`,
    },
    sel: {
      lang: "java",
      code: `// Closed shadow — getShadowRoot() throws in Selenium
// This will throw an error:
// host.getShadowRoot(); // → UnsupportedOperationException

// Only option: JS with internal reference
JavascriptExecutor js = (JavascriptExecutor) driver;
js.executeScript(
  "window.__closedShadow && window.__closedShadow.querySelector('button').click()"
);

// Lesson: always prefer open shadow roots for testable components.`,
    },
    cy: {
      lang: "javascript",
      code: `// Cypress — .shadow() fails on closed shadow roots
// This will throw: "host.shadow() requires an open shadow root"
// cy.get('[data-testid="shadow-eval-host"]').shadow() // ← fails

// Workaround: native DOM via .then()
cy.get('[data-testid="shadow-eval-host"]').then(($host) => {
  const shadow = $host[0].shadowRoot; // null for closed
  if (!shadow) {
    // Use window-scoped ref if the page exposes one
    cy.window().then((win) => {
      win.__closedShadow?.querySelector('button')?.click();
    });
  }
});`,
    },
  },
};

/* ── Method summary rows ────────────────────────────────────────────────── */
export const shadowDomMethodRows: MethodRow[] = [
  {
    action: "Pierce open shadow",
    selenium: "element.getShadowRoot()",
    playwrightJs: "locator().locator() (auto)",
    playwrightPy: "locator().locator() (auto)",
    cypress: ".shadow().find()",
  },
  {
    action: "Nested shadow pierce",
    selenium: "getShadowRoot().findElement().getShadowRoot()",
    playwrightJs: "Automatic — no extra calls",
    playwrightPy: "Automatic — no extra calls",
    cypress: ".shadow().find(host).shadow()",
  },
  {
    action: "Role / label inside shadow",
    selenium: "shadowRoot.findElement(By.xpath) — ⚠ XPath blocked",
    playwrightJs: "locator().getByRole() / getByLabel()",
    playwrightPy: "locator().get_by_role() / get_by_label()",
    cypress: ".shadow().find('[aria-label=...]')",
  },
  {
    action: "No stable attributes (evaluate)",
    selenium: "js.executeScript(\"el.shadowRoot.querySelector(...)\")",
    playwrightJs: "page.evaluate(() => el.shadowRoot...)",
    playwrightPy: "page.evaluate(\"...\")",
    cypress: ".then(el => el[0].shadowRoot.querySelector(...))",
  },
  {
    action: "Closed shadow root",
    selenium: "getShadowRoot() throws — use JS executor",
    playwrightJs: "evaluate() with internally stored ref",
    playwrightPy: "evaluate() with internally stored ref",
    cypress: ".then() with window ref (if exposed)",
  },
];

/* ── FAQ ────────────────────────────────────────────────────────────────── */
export const shadowDomFaq: FaqItem[] = [
  {
    question: "Does Playwright automatically pierce shadow DOM?",
    answer:
      "Yes. Playwright auto-pierces open shadow roots for CSS-based locators. Chaining locators like locator().locator() works across any number of shadow boundaries without extra steps. Role and label queries also work inside shadow roots.",
    testId: "faq-sd-1",
  },
  {
    question: "How does Selenium 4 access shadow DOM?",
    answer:
      "Selenium 4 added the getShadowRoot() method on WebElement. It returns a SearchContext representing the shadow root, from which you can call findElement() and findElements() with CSS selectors. XPath selectors do not work inside shadow roots.",
    testId: "faq-sd-2",
  },
  {
    question: "Can XPath be used inside shadow DOM?",
    answer:
      "No. XPath operates on the main document tree and cannot cross shadow boundaries. Use CSS selectors, role/label queries, or Playwright's built-in piercing inside shadow roots. Selenium getShadowRoot() also only accepts CSS selectors.",
    testId: "faq-sd-3",
  },
  {
    question: "What is the difference between open and closed shadow mode?",
    answer:
      "Open mode (mode: 'open') allows external JavaScript to access the shadow root via element.shadowRoot. Closed mode (mode: 'closed') sets .shadowRoot to null externally, blocking standard locators. Real-world closed shadow roots are rare; most Web Components use open mode.",
    testId: "faq-sd-4",
  },
  {
    question: "How do I handle shadow DOM in Cypress?",
    answer:
      "Use the .shadow() command to enter a shadow root: cy.get('host-selector').shadow().find('inner-selector'). You can also enable global shadow DOM support with experimentalShadowDomSupport: true in cypress.config.js, which allows standard .find() to pierce shadow automatically.",
    testId: "faq-sd-5",
  },
];

/* ── Table of contents ──────────────────────────────────────────────────── */
export const shadowDomTocItems: TocItem[] = [
  { id: "learn-overview", label: "Overview" },
  { id: "learn-basic",    label: "1 · Basic shadow root" },
  { id: "learn-nested",   label: "2 · Nested shadow DOM" },
  { id: "learn-evaluate", label: "3 · evaluate() pattern" },
  { id: "learn-closed",   label: "4 · Closed shadow roots", dividerBefore: true },
  { id: "learn-methods",  label: "Method summary" },
  { id: "learn-faq",      label: "FAQ" },
];
