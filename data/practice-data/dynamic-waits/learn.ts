import type {
  FaqItem,
  LearnCodeSnippet,
  MethodRow,
  TocItem,
} from "@/data/practice-data/types";

export const dynamicWaitsTocItems: TocItem[] = [
  { id: "learn-overview", label: "Overview" },
  { id: "learn-selector", label: "1 · waitForSelector" },
  { id: "learn-function", label: "2 · waitForFunction" },
  { id: "learn-state", label: "3 · Element State Waits" },
  { id: "learn-selenium", label: "4 · Selenium WebDriverWait" },
  { id: "learn-methods", label: "Method Summary", dividerBefore: true },
  { id: "learn-faq", label: "FAQ" },
];

export const dynamicWaitsLearnDesc: Record<string, string> = {
  overview:
    "Dynamic waits pause test execution until a specific condition becomes true rather than sleeping for a fixed duration. They are faster than hard-coded sleeps and far more reliable in CI environments where timing is unpredictable. Every modern framework provides condition-based waiting — use it.",
  selector:
    "waitForSelector waits until an element matching the selector is in the given state: 'attached', 'detached', 'visible', or 'hidden'. It is the primary wait primitive in Playwright and works for both appearing and disappearing elements.",
  function:
    "waitForFunction evaluates a JavaScript expression in the page context repeatedly until it returns a truthy value. It is ideal for asserting that text content matches a specific value, a counter reaches a threshold, or any computed DOM state becomes true.",
  state:
    "Individual Playwright locators expose a waitFor({ state }) method that waits for that specific locator to reach a given state: visible, hidden, attached, or detached. For waiting until a button is clickable, use waitFor({ state: 'visible' }) combined with checking isEnabled().",
  selenium:
    "In Selenium, WebDriverWait combined with ExpectedConditions is the standard pattern. Common conditions include visibilityOfElementLocated, invisibilityOf, elementToBeClickable, and textToBePresentInElement. Always set a reasonable timeout and optionally a polling interval.",
};

export const dynamicWaitsLearnCode: Record<string, LearnCodeSnippet> = {
  selector: {
    pw: {
      lang: "TypeScript",
      code: `// Wait for element to appear
await page.waitForSelector('[data-testid="dw-delayed-result"]', {
  state: 'visible',
  timeout: 5000,
});

// Wait for spinner to disappear
await page.waitForSelector('[data-testid="dw-spinner"]', {
  state: 'hidden',
});

// Using locator waitFor
await page.getByTestId('dw-delayed-result').waitFor({ state: 'visible' });`,
    },
    sel: {
      lang: "Java",
      code: `// Wait for element to be visible
WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(5));
WebElement el = wait.until(
    ExpectedConditions.visibilityOfElementLocated(
        By.cssSelector("[data-testid='dw-delayed-result']")
    )
);

// Wait for element to disappear
wait.until(
    ExpectedConditions.invisibilityOfElementLocated(
        By.cssSelector("[data-testid='dw-spinner']")
    )
);`,
    },
    cy: {
      lang: "JavaScript",
      code: `// Wait for element to appear (default timeout: 4s)
cy.get('[data-testid="dw-delayed-result"]').should('be.visible');

// Wait with extended timeout
cy.get('[data-testid="dw-delayed-result"]', { timeout: 6000 })
  .should('be.visible');

// Wait for spinner to disappear
cy.get('[data-testid="dw-spinner"]').should('not.exist');`,
    },
  },
  function: {
    pw: {
      lang: "TypeScript",
      code: `// Wait until counter text equals "5"
await page.waitForFunction(() => {
  const el = document.querySelector('[data-testid="dw-poll-count"]');
  return el?.textContent?.trim() === '5';
});

// Wait until button is no longer disabled
await page.waitForFunction(() => {
  const btn = document.querySelector('[data-testid="dw-submit-btn"]') as HTMLButtonElement;
  return btn && !btn.disabled;
});`,
    },
    sel: {
      lang: "Java",
      code: `// Wait until text equals "5"
WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
wait.until(ExpectedConditions.textToBePresentInElementLocated(
    By.cssSelector("[data-testid='dw-poll-count']"), "5"
));

// Wait until button is clickable (not disabled)
wait.until(ExpectedConditions.elementToBeClickable(
    By.cssSelector("[data-testid='dw-submit-btn']")
));`,
    },
    cy: {
      lang: "JavaScript",
      code: `// Wait until count span has expected text
cy.get('[data-testid="dw-poll-count"]')
  .should('have.text', '5');

// Wait until button is not disabled
cy.get('[data-testid="dw-submit-btn"]')
  .should('not.be.disabled');`,
    },
  },
  state: {
    pw: {
      lang: "TypeScript",
      code: `// Wait for button to become enabled
const btn = page.getByTestId('dw-submit-btn');
await btn.waitFor({ state: 'visible' });
await expect(btn).toBeEnabled();
await btn.click();

// Wait for toast to appear then vanish
const toast = page.getByTestId('dw-toast');
await toast.waitFor({ state: 'visible' });
await expect(toast).toContainText('Success');
await toast.waitFor({ state: 'hidden' });`,
    },
    sel: {
      lang: "Java",
      code: `// Wait for button to be clickable
WebElement btn = new WebDriverWait(driver, Duration.ofSeconds(5))
    .until(ExpectedConditions.elementToBeClickable(
        By.cssSelector("[data-testid='dw-submit-btn']")
    ));
btn.click();

// Wait for toast to appear
WebElement toast = new WebDriverWait(driver, Duration.ofSeconds(4))
    .until(ExpectedConditions.visibilityOfElementLocated(
        By.cssSelector("[data-testid='dw-toast']")
    ));
Assert.assertTrue(toast.getText().contains("Success"));`,
    },
    cy: {
      lang: "JavaScript",
      code: `// Assert button becomes enabled
cy.get('[data-testid="dw-submit-btn"]')
  .should('not.be.disabled')
  .click();

// Assert toast appears with correct text
cy.get('[data-testid="dw-toast"]')
  .should('be.visible')
  .and('contain.text', 'Success');`,
    },
  },
  selenium: {
    pw: {
      lang: "TypeScript",
      code: `// Playwright equivalent of Selenium's polling wait
await expect(page.getByTestId('dw-poll-count')).toHaveText('5', {
  timeout: 10_000,
});

// With custom polling (via waitForFunction)
await page.waitForFunction(
  () => document.querySelector('[data-testid="dw-poll-count"]')?.textContent === '5',
  { polling: 500, timeout: 10_000 },
);`,
    },
    sel: {
      lang: "Java",
      code: `// WebDriverWait with custom polling interval
WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10))
    .pollingEvery(Duration.ofMillis(500))
    .ignoring(NoSuchElementException.class);

// Wait for text in element
wait.until(ExpectedConditions.textToBePresentInElementLocated(
    By.cssSelector("[data-testid='dw-poll-count']"), "5"
));

// FluentWait for advanced polling
Wait<WebDriver> fluent = new FluentWait<>(driver)
    .withTimeout(Duration.ofSeconds(10))
    .pollingEvery(Duration.ofMillis(500))
    .ignoring(NoSuchElementException.class);
fluent.until(d -> d.findElement(
    By.cssSelector("[data-testid='dw-poll-count']")
).getText().equals("5"));`,
    },
    cy: {
      lang: "JavaScript",
      code: `// Cypress retries assertions automatically
// Increase timeout for slow conditions
cy.get('[data-testid="dw-poll-count"]', { timeout: 10000 })
  .should('have.text', '5');

// Intercept network requests instead of polling
cy.intercept('GET', '/api/status').as('statusCheck');
cy.get('[data-testid="dw-fetch-btn"]').click();
cy.wait('@statusCheck').its('response.statusCode').should('eq', 200);`,
    },
  },
};

export const dynamicWaitsMethodRows: MethodRow[] = [
  {
    action: "Wait for visible",
    selenium: "visibilityOfElementLocated()",
    playwrightJs: "waitForSelector({ state: 'visible' })",
    playwrightPy: "wait_for_selector(state='visible')",
    cypress: ".should('be.visible')",
  },
  {
    action: "Wait for hidden",
    selenium: "invisibilityOf(element)",
    playwrightJs: "waitForSelector({ state: 'hidden' })",
    playwrightPy: "wait_for_selector(state='hidden')",
    cypress: ".should('not.exist')",
  },
  {
    action: "Wait for enabled",
    selenium: "elementToBeClickable()",
    playwrightJs: "waitFor({ state: 'visible' }) + toBeEnabled()",
    playwrightPy: "wait_for(state='visible') + to_be_enabled()",
    cypress: ".should('not.be.disabled')",
  },
  {
    action: "Wait for text",
    selenium: "textToBePresentInElement()",
    playwrightJs: "waitForFunction(() => el.textContent === 'x')",
    playwrightPy: "wait_for_function('...')",
    cypress: ".should('have.text', 'x')",
  },
  {
    action: "Custom polling",
    selenium: "FluentWait.pollingEvery()",
    playwrightJs: "waitForFunction({ polling: N })",
    playwrightPy: "wait_for_function(polling=N)",
    cypress: "{ timeout: N } option",
  },
];

export const dynamicWaitsFaq: FaqItem[] = [
  {
    question: "Why should I never use Thread.sleep() or page.waitForTimeout()?",
    answer:
      "Hard sleeps waste time when elements appear early and cause flakiness when they appear late. Condition-based waits return immediately when the condition is met and only hit the timeout in genuine failure cases, making tests both faster and more reliable.",
    testId: "faq-1",
  },
  {
    question:
      "What is the difference between waitForSelector and waitForFunction?",
    answer:
      "waitForSelector waits for a CSS/XPath selector to match an element in a given state (visible, hidden, attached, detached). waitForFunction evaluates arbitrary JavaScript in the page and waits until it returns truthy — useful for computed values, text content equality, or conditions involving multiple elements.",
    testId: "faq-2",
  },
  {
    question:
      "How does Cypress handle waiting differently from Playwright and Selenium?",
    answer:
      "Cypress automatically retries its assertions (should) and queries (get) for up to the configured command timeout (default 4 seconds). You do not call an explicit wait — instead you increase the timeout option on the assertion that needs more time. There is no built-in multi-tab or network-level wait equivalent to Playwright's waitForResponse.",
    testId: "faq-3",
  },
  {
    question: "What state values does Playwright's waitForSelector accept?",
    answer:
      "Four states: 'attached' (in DOM, regardless of visibility), 'detached' (removed from DOM), 'visible' (in DOM and not hidden), 'hidden' (not in DOM or visibility:hidden/display:none). The default is 'visible'.",
    testId: "faq-4",
  },
];
