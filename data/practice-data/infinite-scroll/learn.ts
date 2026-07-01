import type {
  FaqItem,
  LearnCodeSnippet,
  MethodRow,
  TocItem,
} from "@/data/practice-data/types";

export const infiniteScrollTocItems: TocItem[] = [
  { id: "learn-overview", label: "Overview" },
  { id: "learn-evaluate", label: "1 · Scroll via Evaluation" },
  { id: "learn-scrollIntoView", label: "2 · Scroll Into View" },
  { id: "learn-methods", label: "Method Summary", dividerBefore: true },
  { id: "learn-faq", label: "FAQ" },
];

export const infiniteScrollLearnDesc: Record<string, string> = {
  overview:
    "Infinite scrolling relies on scroll events or Intersection Observers to trigger data fetches. Automating it requires scrolling a specific container, waiting for new DOM elements to attach, and handling scenarios where older items are detached (Virtualization).",
  evaluate:
    "Sometimes the most reliable way to scroll a custom container is to evaluate a JavaScript snippet directly in the browser context that alters the container's scrollTop property.",
  scrollIntoView:
    "Modern tools have built-in commands to scroll elements into view. You can target the last visible item in a list and ask the framework to scroll it into view, which often triggers the next batch.",
};

export const infiniteScrollLearnCode: Record<string, LearnCodeSnippet> = {
  evaluate: {
    pw: {
      lang: "TypeScript",
      code: `await page.evaluate(() => {\n  const container = document.querySelector('.scroll-container');\n  container.scrollTop = container.scrollHeight;\n});`,
    },
    sel: {
      lang: "Java",
      code: `JavascriptExecutor js = (JavascriptExecutor) driver;\njs.executeScript("arguments[0].scrollTop = arguments[0].scrollHeight", containerElement);`,
    },
    cy: {
      lang: "JavaScript",
      code: `cy.get('.scroll-container').scrollTo('bottom');`,
    },
  },
  scrollIntoView: {
    pw: {
      lang: "TypeScript",
      code: `const lastItem = page.locator('.list-item').last();\nawait lastItem.scrollIntoViewIfNeeded();`,
    },
    sel: {
      lang: "Java",
      code: `Actions actions = new Actions(driver);\nactions.moveToElement(lastItem).perform();`,
    },
    cy: {
      lang: "JavaScript",
      code: `cy.get('.list-item').last().scrollIntoView();`,
    },
  },
};

export const infiniteScrollMethodRows: MethodRow[] = [
  {
    action: "Scroll Container (JS)",
    selenium: "js.executeScript()",
    playwrightJs: "page.evaluate()",
    playwrightPy: "page.evaluate()",
    cypress: "cy.scrollTo()",
  },
  {
    action: "Scroll to Element",
    selenium: "actions.moveToElement()",
    playwrightJs: "locator.scrollIntoViewIfNeeded()",
    playwrightPy: "locator.scroll_into_view_if_needed()",
    cypress: "cy.scrollIntoView()",
  },
];

export const infiniteScrollFaq: FaqItem[] = [
  {
    question:
      "Why does my test fail when searching for an element in an infinite list?",
    answer:
      "The element might not be in the DOM yet. You often have to write a loop: scroll, check if element exists, repeat until found or max retries hit.",
    testId: "faq-1",
  },
  {
    question: "What is a Virtualized List?",
    answer:
      "A technique where only the visible items (and a few buffers) are kept in the DOM to save memory. Elements you saw earlier disappear as you scroll down.",
    testId: "faq-2",
  },
];
