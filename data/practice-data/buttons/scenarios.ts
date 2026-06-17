import type { ScenarioMeta, FrameworkMethods } from "@/data/practice-data/types";

export const buttonScenarios: ScenarioMeta[] = [
  {
    id: "S01",
    title: "Navigate to Home Page",
    testId: "scenario-navigate-home",
    resultId: "result-s01",
    initialResult: "No navigation yet",
    hint: `Target: <code>[data-testid="btn-navigate-home"]</code> → assert result contains <code>Home</code>`,
  },
  {
    id: "S02",
    title: "Get Button X & Y Coordinates",
    testId: "scenario-get-coordinates",
    resultId: "result-s02",
    initialResult: "Coordinates: —",
    hint: `Use <code>getBoundingClientRect()</code> or <code>getLocation()</code> to read X/Y position`,
  },
  {
    id: "S03",
    title: "Get Button Color",
    testId: "scenario-get-color",
    resultId: "result-s03",
    initialResult: "Color: —",
    hint: `Use <code>getCssValue("background-color")</code> or <code>evaluate(() =&gt; getComputedStyle(el).backgroundColor)</code>`,
  },
  {
    id: "S04",
    title: "Get Button Height & Width",
    testId: "scenario-get-size",
    resultId: "result-s04",
    initialResult: "Size: —",
    hint: `Use <code>getSize()</code> in Selenium or <code>boundingBox()</code> in Playwright`,
  },
  {
    id: "S05",
    title: "Disabled Button",
    testId: "scenario-disabled",
    resultId: "result-s05",
    initialResult: "Button is disabled — no action fires",
    badge: "DISABLED",
    hint: `Assert <code>isEnabled() === false</code> or <code>toBeDisabled()</code> — never try to click`,
  },
  {
    id: "S06",
    title: "Click and Hold for 1.5 sec",
    testId: "scenario-click-hold",
    resultId: "result-s06",
    initialResult: "Not held yet",
    hint: `Use <code>mouse.down()</code> + wait 1500ms + <code>mouse.up()</code> — early release counts as a fail`,
  },
  {
    id: "S07",
    title: "Double Click Button",
    testId: "scenario-double-click",
    resultId: "result-s07",
    initialResult: "Not double-clicked yet",
    hint: `Single click won't trigger this — use <code>dblclick()</code> or <code>Actions.doubleClick(el)</code>`,
  },
  {
    id: "S08",
    title: "Right Click Button",
    testId: "scenario-right-click",
    resultId: "result-s08",
    initialResult: "No action performed yet",
    hint: `Use <code>contextClick()</code> in Selenium or <code>click({ button: 'right' })</code> in Playwright`,
  },
];

export const frameworkMethods: Record<"selenium" | "playwright" | "cypress", FrameworkMethods> = {
  selenium: {
    label: "Selenium (Java)",
    methods: [
      { color: "purple", label: "click()" },
      { color: "blue",   label: "doubleClick()" },
      { color: "orange", label: "contextClick()" },
      { color: "green",  label: "isEnabled()" },
      { color: "yellow", label: "getLocation()" },
    ],
  },
  playwright: {
    label: "Playwright JS / PY",
    methods: [
      { color: "purple", label: "click()" },
      { color: "blue",   label: "dblclick()" },
      { color: "orange", label: "click({ button: 'right' })" },
      { color: "green",  label: "toBeDisabled()" },
      { color: "yellow", label: "boundingBox()" },
    ],
  },
  cypress: {
    label: "Cypress JS",
    methods: [
      { color: "purple", label: ".click()" },
      { color: "blue",   label: ".dblclick()" },
      { color: "orange", label: ".rightclick()" },
      { color: "green",  label: "should('be.disabled')" },
      { color: "yellow", label: ".invoke('text')" },
    ],
  },
};
