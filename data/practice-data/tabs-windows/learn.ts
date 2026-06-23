import type { FaqItem, LearnCodeSnippet, MethodRow, TocItem } from "@/data/practice-data/types";

export const tabsWindowsTocItems: TocItem[] = [
  { id: "learn-overview", label: "Overview" },
  { id: "learn-new-tab",  label: "1 · Open & Capture New Tab" },
  { id: "learn-switch",   label: "2 · Switch & Return" },
  { id: "learn-popup",    label: "3 · Popups (window.open)" },
  { id: "learn-close",    label: "4 · Close a Tab" },
  { id: "learn-methods",  label: "Method Summary", dividerBefore: true },
  { id: "learn-faq",      label: "FAQ" },
];

export const tabsWindowsLearnDesc: Record<string, string> = {
  overview:
    "Browser tabs and windows are separate browsing contexts. Each new tab opened by a link or window.open() creates an independent page with its own URL, DOM, and navigation history. Automation frameworks provide context-level APIs to enumerate, switch between, and close these contexts.",
  newTab:
    "The key technique is to register the event listener before the action that opens the tab, then await the resolved page context. In Playwright this is waitForEvent('page') on the browser context. In Selenium you collect window handles before and after the click, then switch to the new handle.",
  switch:
    "After opening a new tab, the automation is 'inside' that new context. To interact with the original page again you must explicitly switch back — in Playwright via page.bringToFront(), in Selenium via driver.switchTo().window(originalHandle).",
  popup:
    "window.open() calls produce popup contexts. In Playwright, listen with page.waitForEvent('popup') before the triggering action. In Selenium, popup windows appear in getWindowHandles() like any other window. Cypress cannot handle true multi-tab scenarios natively — the standard workaround is to remove the target attribute so navigation stays in the same tab.",
  close:
    "Call page.close() (Playwright) or driver.close() (Selenium) to close the active tab. After closing, always switch back to a remaining open page before continuing assertions. Verify context.pages().length to confirm the count decremented.",
};

export const tabsWindowsLearnCode: Record<string, LearnCodeSnippet> = {
  newTab: {
    pw: {
      lang: "TypeScript",
      code: `// Open a new tab and capture its context
const [newPage] = await Promise.all([
  context.waitForEvent('page'),
  page.getByTestId('tw-open-new-tab').click(),
]);
await newPage.waitForLoadState();

// Assert URL and title
expect(newPage.url()).toContain('qaplayground');
expect(await newPage.title()).toBeTruthy();

// Assert tab count
expect(context.pages().length).toBe(2);`,
    },
    sel: {
      lang: "Java",
      code: `// Store original handle
String original = driver.getWindowHandle();

// Click the link that opens a new tab
driver.findElement(By.cssSelector("[data-testid='tw-open-new-tab']")).click();

// Switch to the new window
for (String handle : driver.getWindowHandles()) {
    if (!handle.equals(original)) {
        driver.switchTo().window(handle);
        break;
    }
}

// Assert URL in new tab
Assert.assertTrue(driver.getCurrentUrl().contains("qaplayground"));`,
    },
    cy: {
      lang: "JavaScript",
      code: `// Cypress: remove target="_blank" so link stays in same tab
cy.get('[data-testid="tw-open-new-tab"]')
  .invoke('removeAttr', 'target')
  .click();

// Assert URL changed in same tab
cy.url().should('include', 'qaplayground');`,
    },
  },
  switch: {
    pw: {
      lang: "TypeScript",
      code: `// Open a new tab
const [newPage] = await Promise.all([
  context.waitForEvent('page'),
  page.getByTestId('tw-open-and-return').click(),
]);
await newPage.waitForLoadState();

// Do work in new tab
await expect(newPage).toHaveURL(/qaplayground/);

// Switch back to the original tab
await page.bringToFront();
await expect(page).toHaveURL(/practice\/tabs-windows/);`,
    },
    sel: {
      lang: "Java",
      code: `String original = driver.getWindowHandle();

// Open new tab
driver.findElement(By.cssSelector("[data-testid='tw-open-and-return']")).click();

// Switch to new tab — work here
Set<String> handles = driver.getWindowHandles();
for (String h : handles) {
    if (!h.equals(original)) { driver.switchTo().window(h); break; }
}
// ... interact with new tab ...

// Return to original
driver.switchTo().window(original);
Assert.assertTrue(driver.getCurrentUrl().contains("tabs-windows"));`,
    },
    cy: {
      lang: "JavaScript",
      code: `// Cypress stays single-tab — use cy.go('back') to simulate returning
cy.get('[data-testid="tw-open-and-return"]')
  .invoke('removeAttr', 'target')
  .click();
cy.url().should('not.include', 'tabs-windows');
cy.go('back');
cy.url().should('include', 'tabs-windows');`,
    },
  },
  popup: {
    pw: {
      lang: "TypeScript",
      code: `// Capture a window.open() popup
const [popup] = await Promise.all([
  page.waitForEvent('popup'),
  page.getByTestId('tw-popup-btn').click(),
]);
await popup.waitForLoadState();

// Assert popup URL
expect(popup.url()).toContain('qaplayground');

// Close the popup
await popup.close();`,
    },
    sel: {
      lang: "Java",
      code: `String original = driver.getWindowHandle();
driver.findElement(By.cssSelector("[data-testid='tw-popup-btn']")).click();

// Wait briefly for popup to appear
Thread.sleep(500);

for (String h : driver.getWindowHandles()) {
    if (!h.equals(original)) {
        driver.switchTo().window(h);
        break;
    }
}
Assert.assertTrue(driver.getCurrentUrl().contains("qaplayground"));
driver.close();
driver.switchTo().window(original);`,
    },
    cy: {
      lang: "JavaScript",
      code: `// Cypress: stub window.open to prevent popup
cy.window().then((win) => {
  cy.stub(win, 'open').as('windowOpen');
});
cy.get('[data-testid="tw-popup-btn"]').click();
cy.get('@windowOpen').should('have.been.calledOnce');`,
    },
  },
  close: {
    pw: {
      lang: "TypeScript",
      code: `// Open a new tab
const [newPage] = await Promise.all([
  context.waitForEvent('page'),
  page.getByTestId('tw-close-tab-btn').click(),
]);
await newPage.waitForLoadState();
expect(context.pages().length).toBe(2);

// Close the new tab
await newPage.close();
expect(context.pages().length).toBe(1);

// Bring original back to front
await page.bringToFront();`,
    },
    sel: {
      lang: "Java",
      code: `String original = driver.getWindowHandle();

// Open new tab and switch to it
driver.findElement(By.cssSelector("[data-testid='tw-close-tab-btn']")).click();
for (String h : driver.getWindowHandles()) {
    if (!h.equals(original)) { driver.switchTo().window(h); break; }
}
Assert.assertEquals(2, driver.getWindowHandles().size());

// Close the new tab and return
driver.close();
driver.switchTo().window(original);
Assert.assertEquals(1, driver.getWindowHandles().size());`,
    },
    cy: {
      lang: "JavaScript",
      code: `// Cypress: verify single-tab navigation cleans up
cy.get('[data-testid="tw-close-tab-btn"]')
  .invoke('removeAttr', 'target')
  .click();
cy.url().should('not.include', 'tabs-windows');
cy.go('back');
cy.url().should('include', 'tabs-windows');`,
    },
  },
};

export const tabsWindowsMethodRows: MethodRow[] = [
  {
    action:       "Capture new tab",
    selenium:     "getWindowHandles() diff",
    playwrightJs: "context.waitForEvent('page')",
    playwrightPy: "context.wait_for_event('page')",
    cypress:      "invoke('removeAttr','target')",
  },
  {
    action:       "Capture popup",
    selenium:     "getWindowHandles() diff",
    playwrightJs: "page.waitForEvent('popup')",
    playwrightPy: "page.wait_for_event('popup')",
    cypress:      "cy.stub(win, 'open')",
  },
  {
    action:       "Switch to tab",
    selenium:     "switchTo().window(handle)",
    playwrightJs: "page.bringToFront()",
    playwrightPy: "page.bring_to_front()",
    cypress:      "N/A (single tab)",
  },
  {
    action:       "List all pages",
    selenium:     "getWindowHandles()",
    playwrightJs: "context.pages()",
    playwrightPy: "context.pages",
    cypress:      "N/A",
  },
  {
    action:       "Close tab",
    selenium:     "close()",
    playwrightJs: "page.close()",
    playwrightPy: "page.close()",
    cypress:      "N/A",
  },
];

export const tabsWindowsFaq: FaqItem[] = [
  {
    question: "Why must I set up the event listener before clicking in Playwright?",
    answer:
      "The new page event fires immediately when the tab opens. If you click first and then call waitForEvent, the event may have already fired and your await will hang forever. Always set up the listener — via Promise.all — before the triggering action.",
    testId: "faq-1",
  },
  {
    question: "How do I switch between multiple open tabs in Selenium?",
    answer:
      "Call driver.getWindowHandles() to get all open handles as a Set, then use driver.switchTo().window(handle) to activate the one you want. Store the original handle at the start of the test so you can always switch back.",
    testId: "faq-2",
  },
  {
    question: "Why can't Cypress handle multiple tabs natively?",
    answer:
      "Cypress runs inside the browser tab itself, so it only has access to one browsing context at a time. The recommended workarounds are: remove the target='_blank' attribute before clicking, stub window.open to prevent the popup, or use cy.origin() for cross-origin same-tab navigation.",
    testId: "faq-3",
  },
  {
    question: "What is the difference between a new tab and a popup window?",
    answer:
      "A link with target='_blank' typically opens a new tab. A call to window.open() with size parameters opens a popup window. In Playwright, new tabs are captured via context.waitForEvent('page') and popups via page.waitForEvent('popup'). In Selenium both appear in getWindowHandles() the same way.",
    testId: "faq-4",
  },
];
