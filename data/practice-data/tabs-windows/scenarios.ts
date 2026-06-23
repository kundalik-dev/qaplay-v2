import type { ScenarioMeta, FrameworkMethods } from "@/data/practice-data/types";

export const tabsWindowsScenarios: ScenarioMeta[] = [
  {
    id: "S01",
    title: "Scenario 1: Open Link in New Tab",
    testId: "scenario-tw-new-tab",
    resultId: "result-s01",
    initialResult: "No tab opened",
    hint: `Target: <code>[data-testid="tw-open-new-tab"]</code> → click, then in Playwright use <code>context.waitForEvent('page')</code> to capture the new page context.`,
  },
  {
    id: "S02",
    title: "Scenario 2: Open Multiple Tabs",
    testId: "scenario-tw-multi-tab",
    resultId: "result-s02",
    initialResult: "No tabs opened",
    hint: `Target: buttons inside <code>[data-testid="tw-multi-tab-panel"]</code> → open all three, then assert <code>context.pages().length === 4</code> (original + 3 new).`,
  },
  {
    id: "S03",
    title: "Scenario 3: Switch Back to Original Tab",
    testId: "scenario-tw-switch-back",
    resultId: "result-s03",
    initialResult: "Not switched",
    hint: `Open a new tab via <code>[data-testid="tw-open-and-return"]</code>, switch to it, then call <code>context.pages()[0].bringToFront()</code> to return to the original.`,
  },
  {
    id: "S04",
    title: "Scenario 4: Assert New Tab URL and Title",
    testId: "scenario-tw-assert-tab",
    resultId: "result-s04",
    initialResult: "URL not asserted",
    hint: `Open via <code>[data-testid="tw-assert-tab-btn"]</code> → capture the new page, call <code>newPage.waitForLoadState()</code>, then assert <code>newPage.url()</code> and <code>newPage.title()</code>.`,
  },
  {
    id: "S05",
    title: "Scenario 5: Close a Tab",
    testId: "scenario-tw-close-tab",
    resultId: "result-s05",
    initialResult: "Tab not closed",
    hint: `Open via <code>[data-testid="tw-close-tab-btn"]</code> → capture new page, then call <code>newPage.close()</code> and assert <code>context.pages().length</code> is back to 1.`,
  },
  {
    id: "S06",
    title: "Scenario 6: Window Popup (window.open)",
    testId: "scenario-tw-popup",
    resultId: "result-s06",
    initialResult: "Popup not handled",
    hint: `Target: <code>[data-testid="tw-popup-btn"]</code> → in Playwright use <code>page.waitForEvent('popup')</code> wrapped with the click. In Selenium, switch via <code>getWindowHandles()</code>.`,
  },
  {
    id: "S07",
    title: "Scenario 7: Sibling Tab Buttons (Medium)",
    testId: "scenario-tw-sibling-tabs",
    resultId: "result-s07",
    initialResult: "Sibling not located",
    hint: `No <code>data-testid</code> on these buttons. Use XPath: <code>//div[@data-testid="tw-sibling-panel"]//button[normalize-space()="Open Tab B"]</code> or CSS: <code>[data-testid="tw-sibling-panel"] button:nth-of-type(2)</code>.`,
  },
  {
    id: "S08",
    title: "Scenario 8: Dynamic Tab Registry (Challenge)",
    testId: "scenario-tw-dynamic",
    resultId: "result-s08",
    initialResult: "Registry not asserted",
    hint: `No <code>data-testid</code> on tab rows. Locate via: <code>//tr[td[normalize-space()="Tab C"]]//button[normalize-space()="Focus"]</code> or by <code>data-tab-id</code> dynamic attribute: <code>[data-tab-id="tab-c"]</code>.`,
    badge: "CHALLENGE",
  },
];

export const frameworkMethods: Record<"selenium" | "playwright" | "cypress", FrameworkMethods> = {
  selenium: {
    label: "Selenium (Java)",
    methods: [
      { color: "purple", label: "getWindowHandles()" },
      { color: "blue",   label: "switchTo().window()" },
      { color: "orange", label: "getTitle()" },
      { color: "emerald",label: "getCurrentUrl()" },
      { color: "slate",  label: "close()" },
    ],
  },
  playwright: {
    label: "Playwright JS / PY",
    methods: [
      { color: "purple", label: "context.waitForEvent('page')" },
      { color: "blue",   label: "page.waitForEvent('popup')" },
      { color: "orange", label: "context.pages()" },
      { color: "emerald",label: "page.bringToFront()" },
      { color: "slate",  label: "page.close()" },
    ],
  },
  cypress: {
    label: "Cypress JS",
    methods: [
      { color: "purple", label: "cy.origin()" },
      { color: "blue",   label: "invoke('removeAttr', 'target')" },
      { color: "orange", label: "cy.window()" },
      { color: "emerald",label: "cy.title()" },
      { color: "slate",  label: "cy.url()" },
    ],
  },
};
