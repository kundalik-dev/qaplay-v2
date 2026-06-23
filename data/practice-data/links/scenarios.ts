import type {
  ScenarioMeta,
  FrameworkMethods,
} from "@/data/practice-data/types";

export const linksScenarios: ScenarioMeta[] = [
  {
    id: "S01",
    title: "Scenario 1: Internal Following Links",
    testId: "scenario-links-internal",
    resultId: "result-s01",
    initialResult: "Click an internal link",
    hint: `Target: <code>[data-testid="link-internal-about"]</code> → click and assert URL changes.`,
  },
  {
    id: "S02",
    title: "Scenario 2: External Links (New Tab)",
    testId: "scenario-links-external",
    resultId: "result-s02",
    initialResult: "Click an external link",
    hint: `Target: <code>[data-testid="link-external-selenium"]</code> → assert <code>target="_blank"</code>.`,
  },
  {
    id: "S03",
    title: "Scenario 3: Broken Links",
    testId: "scenario-links-broken",
    resultId: "result-s03",
    initialResult: "Click a broken link",
    hint: `Target: <code>[data-testid="link-broken-same"]</code> → send an HTTP GET to the <code>href</code> and assert 500 status.`,
  },
  {
    id: "S04",
    title: "Scenario 4: Image Links",
    testId: "scenario-links-image",
    resultId: "result-s04",
    initialResult: "Click an image link",
    hint: `Target: <code>[data-testid="link-image-ironman"]</code> → click and check navigation.`,
  },
  {
    id: "S05",
    title: "Scenario 5: Button Links",
    testId: "scenario-links-button",
    resultId: "result-s05",
    initialResult: "Click a button link",
    hint: `Target: <code>[data-testid="link-btn-home"]</code> → locate and click.`,
  },
  {
    id: "S06",
    title: "Scenario 6: Text Links & Anchor",
    testId: "scenario-links-text",
    resultId: "result-s06",
    initialResult: "Click a text or anchor link",
    hint: `Target: <code>[data-testid="link-text-anchor"]</code> → click and assert URL hash.`,
  },
  {
    id: "S07",
    title: "Scenario 7: API Status Code Links",
    testId: "scenario-links-api",
    resultId: "result-s07",
    initialResult: "Click an API link",
    hint: `Target: one of the status code buttons → intercept HTTP response and assert status code.`,
  },
];

export const frameworkMethods: Record<
  "selenium" | "playwright" | "cypress",
  FrameworkMethods
> = {
  selenium: {
    label: "Selenium (Java)",
    methods: [
      { color: "purple", label: "click()" },
      { color: "blue", label: 'getAttribute("href")' },
      { color: "orange", label: 'getAttribute("target")' },
      { color: "emerald", label: "driver.navigate().back()" },
      { color: "slate", label: "driver.getWindowHandles()" },
    ],
  },
  playwright: {
    label: "Playwright JS / PY",
    methods: [
      { color: "purple", label: "click()" },
      { color: "blue", label: 'getAttribute("href")' },
      { color: "orange", label: 'getAttribute("target")' },
      { color: "emerald", label: "page.goBack()" },
      { color: "slate", label: "context.pages()" },
    ],
  },
  cypress: {
    label: "Cypress JS",
    methods: [
      { color: "purple", label: "click()" },
      { color: "blue", label: "invoke('attr', 'href')" },
      { color: "orange", label: "invoke('attr', 'target')" },
      { color: "emerald", label: "go('back')" },
      { color: "slate", label: "window()" },
    ],
  },
};
