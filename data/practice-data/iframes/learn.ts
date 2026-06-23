import type { FaqItem, LearnCodeSnippet, MethodRow, TocItem } from "@/data/practice-data/types";

export const iframesTocItems: TocItem[] = [
  { id: "learn-overview",  label: "Overview" },
  { id: "learn-basic",     label: "1 · frameLocator basics" },
  { id: "learn-nested",    label: "2 · Nested iframes" },
  { id: "learn-locate",    label: "3 · Locate by name & title" },
  { id: "learn-dynamic",   label: "4 · Dynamic iframe content" },
  { id: "learn-methods",   label: "Method Summary", dividerBefore: true },
  { id: "learn-faq",       label: "FAQ" },
];

export const iframesLearnDesc: Record<string, string> = {
  overview:
    "An iframe (inline frame) is an HTML element that embeds another HTML document inside the current page. For automation testers, iframes require switching the driver or locator context before any interaction. Each framework handles this differently: Playwright uses frameLocator() which returns a scoped locator, Selenium uses driver.switchTo().frame() which changes the active context globally, and Cypress relies on plugins or low-level contentDocument access because its standard commands do not cross frame boundaries.",
  basic:
    "Playwright's frameLocator() accepts any CSS selector that identifies the iframe element — usually a data-testid, name attribute selector, or title attribute selector. It returns a FrameLocator that behaves like a Page: you can call getByRole, getByLabel, getByTestId, and locator() on it. Multiple frameLocator calls can be chained. The frame must be loaded before interactions will succeed.",
  nested:
    "Nested iframes require chaining frameLocator calls, one per level. Each call scopes the context into the next level of nesting. Selenium requires calling switchTo().frame() once per level in sequence. After finishing work inside a nested frame, call switchTo().parentFrame() to move up one level or switchTo().defaultContent() to return to the top-level page. Playwright's chained frameLocator handles this automatically — no manual parent switching needed.",
  locate:
    "When an iframe does not have a data-testid, use the name or title attributes as selectors: page.frameLocator('iframe[name=\"frame-two\"]') or page.frameLocator('iframe[title=\"Form Iframe\"]'). In Selenium, pass the name string directly to driver.switchTo().frame(name) or pass the integer index to switchTo().frame(index). Always prefer name or title over index — index is brittle when page order changes.",
  dynamic:
    "Dynamic content inside an iframe loads asynchronously. Use Playwright's expect() with a timeout to wait for the element before interacting: await expect(frame.getByRole('button')).toBeVisible({ timeout: 5000 }). In Selenium, use WebDriverWait with a nested ExpectedCondition that scopes inside the frame context. Avoid hard sleeps — they make tests slow and unreliable.",
};

export const iframesLearnCode: Record<string, LearnCodeSnippet> = {
  basic: {
    pw: {
      lang: "TypeScript",
      code: `// Switch into an iframe by data-testid
const frame = page.frameLocator('[data-testid="iframe-basic"]');

// Fill an input inside the frame
await frame.getByTestId('iframe-name-input').fill('Jane');

// Click a button inside the frame
await frame.getByTestId('iframe-submit-btn').click();

// Assert text inside the frame
await expect(frame.locator('#result')).toContainText('Hello, Jane');

// Locate by role inside the frame
await frame.getByRole('textbox', { name: 'Your name' }).fill('Jane');
await frame.getByRole('button', { name: 'Submit' }).click();`,
    },
    sel: {
      lang: "Java",
      code: `// Locate the iframe element
WebElement iframeEl = driver.findElement(
    By.cssSelector("[data-testid='iframe-basic']")
);

// Switch into the iframe context
driver.switchTo().frame(iframeEl);

// Now all findElement calls are scoped inside the iframe
driver.findElement(By.cssSelector("[data-testid='iframe-name-input']"))
      .sendKeys("Jane");
driver.findElement(By.cssSelector("[data-testid='iframe-submit-btn']"))
      .click();

// Assert inside the frame
String result = driver.findElement(By.id("result")).getText();
assertTrue(result.contains("Hello, Jane"));

// Return to the top-level page
driver.switchTo().defaultContent();`,
    },
    cy: {
      lang: "JavaScript",
      code: `// Cypress requires the cy-iframe plugin or a custom command
// Install: npm install cypress-iframe

// With plugin:
cy.frameLoaded('[data-testid="iframe-basic"]');
cy.iframe('[data-testid="iframe-basic"]')
  .find('[data-testid="iframe-name-input"]')
  .type('Jane');
cy.iframe('[data-testid="iframe-basic"]')
  .find('[data-testid="iframe-submit-btn"]')
  .click();

// Without plugin (raw contentDocument):
cy.get('[data-testid="iframe-basic"]')
  .its('0.contentDocument.body')
  .should('not.be.empty')
  .then(cy.wrap)
  .find('[data-testid="iframe-name-input"]')
  .type('Jane');`,
    },
  },
  nested: {
    pw: {
      lang: "TypeScript",
      code: `// Two-level nested iframes — chain frameLocator calls
const outerFrame = page.frameLocator('[data-testid="iframe-outer"]');
const innerFrame = outerFrame.frameLocator('iframe[title="Inner Frame"]');

// Interact with the innermost content
await innerFrame.getByTestId('iframe-inner-input').fill('secret');
await innerFrame.getByTestId('iframe-inner-submit').click();

// Assert inner result text
await expect(innerFrame.locator('#inner-result')).toContainText('Unlocked');

// Three levels: just add another .frameLocator() to the chain
// const deepFrame = page.frameLocator('…').frameLocator('…').frameLocator('…');`,
    },
    sel: {
      lang: "Java",
      code: `// Navigate into nested iframes with sequential switchTo() calls

// Level 1 — switch to outer frame
WebElement outerEl = driver.findElement(
    By.cssSelector("[data-testid='iframe-outer']")
);
driver.switchTo().frame(outerEl);

// Level 2 — switch to inner frame (now inside outer)
WebElement innerEl = driver.findElement(
    By.cssSelector("iframe[title='Inner Frame']")
);
driver.switchTo().frame(innerEl);

// Interact with content two levels deep
driver.findElement(By.cssSelector("[data-testid='iframe-inner-input']"))
      .sendKeys("secret");
driver.findElement(By.cssSelector("[data-testid='iframe-inner-submit']"))
      .click();

// Go up one level (back into outer frame)
driver.switchTo().parentFrame();

// Go all the way back to main page
driver.switchTo().defaultContent();`,
    },
    cy: {
      lang: "JavaScript",
      code: `// Nested iframes in Cypress via raw contentDocument chain
cy.get('[data-testid="iframe-outer"]')
  .its('0.contentDocument')
  .then((outerDoc) => {
    cy.wrap(outerDoc)
      .find('iframe[title="Inner Frame"]')
      .its('0.contentDocument')
      .then((innerDoc) => {
        cy.wrap(innerDoc)
          .find('[data-testid="iframe-inner-input"]')
          .type('secret');
        cy.wrap(innerDoc)
          .find('[data-testid="iframe-inner-submit"]')
          .click();
      });
  });`,
    },
  },
  locate: {
    pw: {
      lang: "TypeScript",
      code: `// Locate iframe by name attribute
const frameByName = page.frameLocator('iframe[name="frame-two"]');
// Button inside has no data-testid — use role + aria-label
await frameByName.getByRole('button', { name: 'Activate Frame Two' }).click();

// Locate iframe by title attribute
const frameByTitle = page.frameLocator('iframe[title="Frame Three"]');
// Button has no testid or aria-label — use visible text
await frameByTitle.getByRole('button', { name: 'Confirm Action' }).click();

// Locate using the page.frame() API (returns a Frame, not FrameLocator)
const frameRef = page.frame({ name: 'frame-two' });
if (frameRef) {
  await frameRef.getByRole('button', { name: 'Activate Frame Two' }).click();
}

// Locate by URL pattern
const frameByUrl = page.frame({ url: /iframe-multi-2/ });`,
    },
    sel: {
      lang: "Java",
      code: `// Switch by name attribute string
driver.switchTo().frame("frame-two");
driver.findElement(By.cssSelector("[aria-label='Activate Frame Two']")).click();
driver.switchTo().defaultContent();

// Switch by index (fragile — avoid unless no other option)
driver.switchTo().frame(1); // 0-based index
driver.switchTo().defaultContent();

// Switch by WebElement (most reliable for title-only frames)
WebElement frameByTitle = driver.findElement(
    By.cssSelector("iframe[title='Frame Three']")
);
driver.switchTo().frame(frameByTitle);
// Button has only visible text — locate by XPath text()
driver.findElement(By.xpath("//button[normalize-space()='Confirm Action']")).click();
driver.switchTo().defaultContent();`,
    },
    cy: {
      lang: "JavaScript",
      code: `// Frame Two — locate by name, button by aria-label
cy.get('iframe[name="frame-two"]')
  .its('0.contentDocument.body')
  .should('not.be.empty')
  .then(cy.wrap)
  .find('[aria-label="Activate Frame Two"]')
  .click();

// Frame Three — locate by title, button by visible text
cy.get('iframe[title="Frame Three"]')
  .its('0.contentDocument.body')
  .should('not.be.empty')
  .then(cy.wrap)
  .contains('button', 'Confirm Action')
  .click();`,
    },
  },
  dynamic: {
    pw: {
      lang: "TypeScript",
      code: `// Switch into the dynamic iframe
const dynFrame = page.frameLocator('[data-testid="iframe-dynamic"]');

// Wait for the dynamically revealed button (no data-testid)
const revealBtn = dynFrame.getByRole('button', { name: 'Reveal Secret' });
await expect(revealBtn).toBeVisible({ timeout: 5000 });

// Fill input (located by aria-label — no testid)
await dynFrame.getByRole('textbox', { name: 'Reveal code input' }).fill('qaplayer');

// Click the reveal button
await revealBtn.click();

// Assert result (by text content, no testid)
await expect(dynFrame.locator('#dyn-result')).toContainText('Secret revealed');

// XPath alternative for the button
// await dynFrame.locator("//button[@aria-label='Reveal Secret']").click();`,
    },
    sel: {
      lang: "Java",
      code: `// Switch into the dynamic iframe
WebElement dynIframe = driver.findElement(
    By.cssSelector("[data-testid='iframe-dynamic']")
);
driver.switchTo().frame(dynIframe);

// Wait for dynamic button (no testid — use XPath with aria-label)
WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(5));
WebElement revealBtn = wait.until(ExpectedConditions.visibilityOfElementLocated(
    By.xpath("//button[@aria-label='Reveal Secret']")
));

// Fill input (aria-label locator)
driver.findElement(By.cssSelector("[aria-label='Reveal code input']"))
      .sendKeys("qaplayer");

// Click
revealBtn.click();

// Assert
String result = driver.findElement(By.id("dyn-result")).getText();
assertTrue(result.contains("Secret revealed"));

driver.switchTo().defaultContent();`,
    },
    cy: {
      lang: "JavaScript",
      code: `// Wait for dynamic content inside iframe
cy.get('[data-testid="iframe-dynamic"]')
  .its('0.contentDocument.body')
  .should('not.be.empty')
  .then(cy.wrap)
  .as('dynBody');

// Wait for the button to exist (content appears after 1.5s)
cy.get('@dynBody')
  .find('[aria-label="Reveal Secret"]', { timeout: 5000 })
  .should('be.visible');

// Fill input and click
cy.get('@dynBody').find('[aria-label="Reveal code input"]').type('qaplayer');
cy.get('@dynBody').find('[aria-label="Reveal Secret"]').click();

// Assert result
cy.get('@dynBody').find('#dyn-result').should('contain.text', 'Secret revealed');`,
    },
  },
};

export const iframesMethodRows: MethodRow[] = [
  {
    action:       "Switch by element",
    selenium:     "switchTo().frame(WebElement)",
    playwrightJs: "page.frameLocator('[data-testid]')",
    playwrightPy: "page.frame_locator('[data-testid]')",
    cypress:      ".its('0.contentDocument.body')",
  },
  {
    action:       "Switch by name",
    selenium:     "switchTo().frame('name')",
    playwrightJs: "frameLocator('iframe[name=\"…\"]')",
    playwrightPy: "frame_locator('iframe[name=\"…\"]')",
    cypress:      "cy.get('iframe[name=\"…\"]').its(…)",
  },
  {
    action:       "Switch by title",
    selenium:     "switchTo().frame(By.cssSelector('iframe[title]'))",
    playwrightJs: "frameLocator('iframe[title=\"…\"]')",
    playwrightPy: "frame_locator('iframe[title=\"…\"]')",
    cypress:      "cy.get('iframe[title=\"…\"]').its(…)",
  },
  {
    action:       "Nested frames",
    selenium:     "switchTo().frame() × N levels",
    playwrightJs: "frameLocator().frameLocator()",
    playwrightPy: "frame_locator().frame_locator()",
    cypress:      "chain .its('contentDocument') × N",
  },
  {
    action:       "Return to parent",
    selenium:     "switchTo().parentFrame() / defaultContent()",
    playwrightJs: "N/A — frameLocator is stateless",
    playwrightPy: "N/A — frame_locator is stateless",
    cypress:      "N/A — callback scope handles it",
  },
];

export const iframesFaq: FaqItem[] = [
  {
    question: "What is the difference between frameLocator() and page.frame() in Playwright?",
    answer:
      "frameLocator() returns a FrameLocator — a scoped locator you chain getByRole, getByTestId, and other locator methods on. It is lazy: it resolves the frame only when you interact with an element inside it. page.frame() returns a Frame object (the actual frame reference), which has methods like frame.fill() and frame.click() that bypass the locator chain. Use frameLocator() for most cases; use page.frame() when you need the raw frame reference for advanced operations like frame.evaluate().",
    testId: "faq-1",
  },
  {
    question: "Why does Selenium lose the frame context after an action?",
    answer:
      "Selenium's switchTo().frame() changes the global active context. If the page refreshes or navigates, the context resets to the top-level document. Also, findElement calls on driver always use the current context, so you must switch before every cross-frame interaction. Call driver.switchTo().defaultContent() to reset, or driver.switchTo().parentFrame() to go up one level. Playwright avoids this issue because frameLocator() is stateless — each interaction specifies the full path.",
    testId: "faq-2",
  },
  {
    question: "How do I interact with an iframe element that has no data-testid, name, or title?",
    answer:
      "Use a CSS attribute selector on any stable attribute the iframe has: page.frameLocator('iframe[src*=\"/frames/\"]') targets by partial URL, page.frameLocator('iframe:nth-of-type(2)') uses position (fragile but sometimes necessary). In Selenium, use an index: driver.switchTo().frame(1). As a last resort, use a JavaScript executor to find the iframe by inspecting its content. Always prefer adding a name or title attribute to iframes you control.",
    testId: "faq-3",
  },
  {
    question: "Does Cypress support iframes natively?",
    answer:
      "No — Cypress does not cross frame boundaries with standard commands. The recommended approach is the cypress-iframe plugin which adds cy.frameLoaded() and cy.iframe() commands. Without a plugin, you can access iframe content via .its('0.contentDocument.body') and chain cy.wrap() on the result, then use standard .find() to locate elements inside. This pattern works but is more verbose than Playwright's frameLocator.",
    testId: "faq-4",
  },
  {
    question: "How do I wait for dynamic content to load inside an iframe?",
    answer:
      "In Playwright, use expect(frameLocator.getByRole('button')).toBeVisible({ timeout: 5000 }) — the assertion retries until the element appears or the timeout is exceeded. In Selenium, create a WebDriverWait after switching into the frame: wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath('...')). Avoid Thread.sleep or cy.wait() with fixed numbers — they make tests slow and still fragile if the content loads slower than expected.",
    testId: "faq-5",
  },
];
