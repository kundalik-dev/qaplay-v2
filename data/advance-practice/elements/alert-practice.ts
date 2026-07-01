import type { ElementContent } from "../types";

/**
 * Alert Practice — content for the /new-practice/alert-practice workspace.
 * The Practice tab UI lives in the route's own _components (custom HTML/CSS);
 * this file only drives the reusable Test Cases and Learn views.
 */
export const alertPracticeContent: ElementContent = {
  meta: {
    slug: "alert-practice",
    title: "Alert Practice",
    description:
      "Trigger and handle native browser dialogs — alert, confirm, and prompt — and assert the resulting page state.",
    level: "Beginner",
    tags: ["Dialogs", "Browser"],
    upNext: {
      title: "Keyboard Actions",
      description:
        "Practice key presses, shortcuts, and modifier combinations across inputs.",
      href: "/new-practice/keyboard-actions",
      iconSrc: "/mainicons/buttons-v2.svg",
      iconAlt: "Keyboard Actions icon",
    },
  },

  testCases: [
    {
      id: "ALERT_001",
      scenario: "Accept a simple alert dialog",
      expected: "The alert is dismissed and the result text reads 'Accepted'.",
      type: "positive",
      priority: "high",
      steps: [
        "Register a dialog handler before clicking the trigger.",
        "Click the <code>Show Alert</code> button.",
        "Accept the dialog.",
        "Assert the result element shows <code>Accepted</code>.",
      ],
    },
    {
      id: "ALERT_002",
      scenario: "Dismiss a confirm dialog",
      expected: "The confirm is cancelled and the result reads 'Cancelled'.",
      type: "negative",
      priority: "medium",
      steps: [
        "Register a dialog handler that dismisses the dialog.",
        "Click the <code>Show Confirm</code> button.",
        "Assert the result element shows <code>Cancelled</code>.",
      ],
    },
    {
      id: "ALERT_003",
      scenario: "Enter text into a prompt dialog",
      expected: "The entered text is echoed back into the result element.",
      type: "positive",
      priority: "high",
      steps: [
        "Register a dialog handler that accepts with a value.",
        "Click the <code>Show Prompt</code> button.",
        "Provide the prompt text and accept.",
        "Assert the result element contains the entered text.",
      ],
    },
    {
      id: "ALERT_004",
      scenario: "No handler registered before a dialog opens",
      expected:
        "Playwright auto-dismisses the dialog; the action still resolves.",
      type: "edge",
      priority: "low",
      steps: [
        "Click a dialog trigger without registering a handler.",
        "Observe that Playwright auto-dismisses by default.",
      ],
      note: "By default Playwright dismisses dialogs automatically when no handler is attached.",
    },
  ],

  learn: [
    {
      id: "learn-overview",
      heading: "Overview",
      desc: "Dialogs appear in real applications for confirmations, warnings, and notifications. Automating them well means knowing how to open, assert, interact, and close them — including edge cases like backdrop clicks and keyboard dismissal.",
    },
    {
      id: "learn-native-alert",
      heading: "1 · Handle a Native Alert",
      desc: "Native dialogs are not in the DOM. Register a dialog handler before the click, assert the message, then accept it.",
      snippets: {
        pw: {
          lang: "TypeScript",
          code: `page.on('dialog', async (dialog) => {
  expect(dialog.message()).toBe('Hello! This is a simple alert.');
  await dialog.accept();
});

await page.getByTestId('simple-alert').click();`,
        },
        sel: {
          lang: "Java",
          code: `driver.findElement(By.cssSelector("[data-testid='simple-alert']")).click();

Alert alert = driver.switchTo().alert();
assertEquals("Hello! This is a simple alert.", alert.getText());
alert.accept();`,
        },
        cy: {
          lang: "JavaScript",
          code: `cy.on('window:alert', (text) => {
  expect(text).to.equal('Hello! This is a simple alert.');
});

cy.get('[data-testid="simple-alert"]').click();`,
        },
      },
    },
    {
      id: "learn-confirm",
      heading: "2 · Confirm — Accept vs Dismiss",
      desc: "Drive both branches and assert the side effect written to the DOM, not the dialog text.",
      snippets: {
        pw: {
          lang: "TypeScript",
          code: `page.on('dialog', (dialog) => dialog.accept()); // OK branch

await page.getByTestId('confirm-action').click();
await expect(page.getByTestId('confirm-result'))
  .toContainText('Account deleted');`,
        },
        sel: {
          lang: "Java",
          code: `driver.findElement(By.cssSelector("[data-testid='confirm-action']")).click();
driver.switchTo().alert().accept();

String result = driver
  .findElement(By.cssSelector("[data-testid='confirm-result']"))
  .getText();
assertTrue(result.contains("Account deleted"));`,
        },
        cy: {
          lang: "JavaScript",
          code: `cy.on('window:confirm', () => true); // accept

cy.get('[data-testid="confirm-action"]').click();
cy.get('[data-testid="confirm-result"]').should('contain', 'Account deleted');`,
        },
      },
    },
    {
      id: "learn-prompt",
      heading: "3 · Prompt — Pass Text",
      desc: "Feed text into the prompt with accept(value), then assert the greeting the app renders.",
      snippets: {
        pw: {
          lang: "TypeScript",
          code: `page.on('dialog', (dialog) => dialog.accept('Ada'));

await page.getByTestId('prompt-action').click();
await expect(page.getByTestId('prompt-result')).toContainText('Hello, Ada!');`,
        },
        sel: {
          lang: "Java",
          code: `driver.findElement(By.cssSelector("[data-testid='prompt-action']")).click();

Alert prompt = driver.switchTo().alert();
prompt.sendKeys("Ada");
prompt.accept();`,
        },
        cy: {
          lang: "JavaScript",
          code: `cy.window().then((win) => cy.stub(win, 'prompt').returns('Ada'));

cy.get('[data-testid="prompt-action"]').click();
cy.get('[data-testid="prompt-result"]').should('contain', 'Hello, Ada!');`,
        },
      },
    },
    {
      id: "learn-html-dialog",
      heading: "4 · HTML <dialog> Element",
      desc: "This is real DOM, not a JS dialog — use normal locators, assert visibility, and check returnValue after closing.",
      snippets: {
        pw: {
          lang: "TypeScript",
          code: `await page.getByTestId('open-html-dialog').click();

const dialog = page.getByTestId('html-dialog');
await expect(dialog).toBeVisible();

await page.getByTestId('html-dialog-confirm').click();
await expect(dialog).toBeHidden();`,
        },
        sel: {
          lang: "Java",
          code: `driver.findElement(By.cssSelector("[data-testid='open-html-dialog']")).click();

WebElement dialog = driver.findElement(By.cssSelector("[data-testid='html-dialog']"));
assertTrue(dialog.isDisplayed());

driver.findElement(By.cssSelector("[data-testid='html-dialog-confirm']")).click();`,
        },
        cy: {
          lang: "JavaScript",
          code: `cy.get('[data-testid="open-html-dialog"]').click();
cy.get('[data-testid="html-dialog"]').should('be.visible');

cy.get('[data-testid="html-dialog-confirm"]').click();
cy.get('[data-testid="html-dialog"]').should('not.be.visible');`,
        },
      },
    },
    {
      id: "learn-custom-modal",
      heading: "5 · Custom Modal (role=dialog)",
      desc: "Locate by role/testid, assert visibility, and verify it closes via the ✕, Cancel, overlay click, or Esc.",
      snippets: {
        pw: {
          lang: "TypeScript",
          code: `await page.getByTestId('open-custom-modal').click();

const modal = page.getByTestId('custom-modal');
await expect(modal).toBeVisible();

await page.keyboard.press('Escape');
await expect(modal).toBeHidden();`,
        },
        sel: {
          lang: "Java",
          code: `driver.findElement(By.cssSelector("[data-testid='open-custom-modal']")).click();

WebElement modal = driver.findElement(By.cssSelector("[data-testid='custom-modal']"));
assertTrue(modal.isDisplayed());

new Actions(driver).sendKeys(Keys.ESCAPE).perform();`,
        },
        cy: {
          lang: "JavaScript",
          code: `cy.get('[data-testid="open-custom-modal"]').click();
cy.get('[data-testid="custom-modal"]').should('be.visible');

cy.get('body').type('{esc}');
cy.get('[data-testid="custom-modal"]').should('not.be.visible');`,
        },
      },
    },
    {
      id: "learn-toast",
      heading: "6 · Toast / Snackbar",
      desc: "Assert the toast becomes visible immediately, then auto-hides — using web-first waits, never fixed sleeps.",
      snippets: {
        pw: {
          lang: "TypeScript",
          code: `await page.getByTestId('toast-success').click();

const toast = page.getByTestId('toast');
await expect(toast).toBeVisible();
await expect(toast).toBeHidden(); // auto-dismiss after ~3s`,
        },
        sel: {
          lang: "Java",
          code: `driver.findElement(By.cssSelector("[data-testid='toast-success']")).click();

new WebDriverWait(driver, Duration.ofSeconds(5)).until(
  ExpectedConditions.visibilityOfElementLocated(
    By.cssSelector("[data-testid='toast']")));`,
        },
        cy: {
          lang: "JavaScript",
          code: `cy.get('[data-testid="toast-success"]').click();

cy.get('[data-testid="toast"]').should('be.visible');
cy.get('[data-testid="toast"]').should('not.exist');`,
        },
      },
    },
    {
      id: "learn-pitfalls",
      heading: "Common Pitfalls",
      desc: "Watch out for these — they cause the most flaky dialog tests.",
      bullets: [
        "Registering the handler <em>after</em> the click — the native dialog is already gone.",
        "Forgetting that Playwright auto-dismisses dialogs when no handler is attached.",
        "Trying to locate native dialog text with a DOM selector — it isn't in the DOM.",
        "Using fixed <code>waitForTimeout</code> for toasts instead of web-first assertions.",
      ],
    },
  ],
};
