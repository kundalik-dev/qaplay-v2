import type { FaqItem, LearnCodeSnippet, MethodRow, TocItem } from "@/data/practice-data/types";

export const linksTocItems: TocItem[] = [
  { id: "learn-overview", label: "Overview" },
  { id: "learn-basic",    label: "1 · Internal & External" },
  { id: "learn-status",   label: "2 · Checking Status Codes" },
  { id: "learn-methods",  label: "Method Summary", dividerBefore: true },
  { id: "learn-faq",      label: "FAQ" },
];

export const linksLearnDesc: Record<string, string> = {
  overview: "Links (<a> tags) are fundamental to web navigation. Testing them ensures users can seamlessly traverse your application and access external resources.",
  basic:    "Internal links navigate within the same application context, whereas external links often open in a new tab (target='_blank'). Frameworks handle new tabs differently.",
  status:   "Instead of clicking every link, you can verify a link isn't broken by making a fast HTTP request to its href attribute and checking the response code.",
};

export const linksLearnCode: Record<string, LearnCodeSnippet> = {
  basic: {
    pw:  { lang: "TypeScript",  code: `// Click standard link
await page.locator('#my-link').click();

// Handle new tab
const [newPage] = await Promise.all([
  context.waitForEvent('page'),
  page.locator('#external-link').click()
]);
await newPage.waitForLoadState();` },
    sel: { lang: "Java",        code: `// Click standard link
driver.findElement(By.id("my-link")).click();

// Switch to new window
String originalWindow = driver.getWindowHandle();
driver.findElement(By.id("external-link")).click();
for (String windowHandle : driver.getWindowHandles()) {
    if(!originalWindow.contentEquals(windowHandle)) {
        driver.switchTo().window(windowHandle);
        break;
    }
}` },
    cy:  { lang: "JavaScript",  code: `// Click standard link
cy.get('#my-link').click();

// Remove target="_blank" to stay in same tab
cy.get('#external-link').invoke('removeAttr', 'target').click();` },
  },
  status: {
    pw:  { lang: "TypeScript",  code: `const href = await page.locator('#my-link').getAttribute('href');
const response = await page.request.get(href);
expect(response.status()).toBe(200);` },
    sel: { lang: "Java",        code: `String url = driver.findElement(By.id("my-link")).getAttribute("href");
HttpURLConnection huc = (HttpURLConnection)(new URL(url).openConnection());
huc.setRequestMethod("HEAD");
huc.connect();
int respCode = huc.getResponseCode();
Assert.assertEquals(200, respCode);` },
    cy:  { lang: "JavaScript",  code: `cy.get('#my-link').invoke('attr', 'href').then(href => {
  cy.request(href).its('status').should('eq', 200);
});` },
  },
};

export const linksMethodRows: MethodRow[] = [
  {
    action:       "Click Link",
    selenium:     "element.click()",
    playwrightJs: "locator.click()",
    playwrightPy: "locator.click()",
    cypress:      ".click()",
  },
  {
    action:       "Get URL",
    selenium:     "element.getAttribute(\"href\")",
    playwrightJs: "locator.getAttribute(\"href\")",
    playwrightPy: "locator.get_attribute(\"href\")",
    cypress:      ".invoke('attr', 'href')",
  },
  {
    action:       "Check Target",
    selenium:     "element.getAttribute(\"target\")",
    playwrightJs: "locator.getAttribute(\"target\")",
    playwrightPy: "locator.get_attribute(\"target\")",
    cypress:      ".invoke('attr', 'target')",
  },
];

export const linksFaq: FaqItem[] = [
  {
    question: "How do I test links that open in a new tab?",
    answer:   "In Playwright, use Promise.all with waitForEvent('page'). In Selenium, use getWindowHandles() and switch context. In Cypress, the common pattern is to remove the target='_blank' attribute before clicking.",
    testId:   "faq-1",
  },
  {
    question: "Should I click all links to verify they work?",
    answer:   "No, that's too slow. For static links, it's better to extract the href and use an HTTP library or framework request method to assert a 200 status code.",
    testId:   "faq-2",
  },
];
