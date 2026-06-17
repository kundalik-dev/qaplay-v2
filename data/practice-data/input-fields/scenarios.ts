import type { ScenarioMeta, FrameworkMethods } from "@/data/practice-data/types";

export const inputFieldScenarios: ScenarioMeta[] = [
  {
    id: "S01",
    title: "Type a Movie Name",
    testId: "scenario-type-movie",
    resultId: "result-s01",
    initialResult: "No input yet",
    hint: `Use <code>sendKeys("…")</code> in Selenium or <code>fill("…")</code> in Playwright, then click Submit and assert the result.`,
  },
  {
    id: "S02",
    title: "Append Text & Press Tab",
    testId: "scenario-append-tab",
    resultId: "result-s02",
    initialResult: "Current value: Avengers",
    hint: `Playwright's <code>fill()</code> clears first — to append, use <code>click()</code> + <code>keyboard.type()</code>, then press <code>Tab</code> to blur.`,
  },
  {
    id: "S03",
    title: "Read the Field Value",
    testId: "scenario-read-value",
    resultId: "result-s03",
    initialResult: "Value: —",
    hint: `Read the current value with <code>getAttribute("value")</code> (Selenium) or <code>inputValue()</code> (Playwright).`,
  },
  {
    id: "S04",
    title: "Clear the Field",
    testId: "scenario-clear-field",
    resultId: "result-s04",
    initialResult: "Field contains: Inception",
    hint: `Clear with <code>clear()</code> in Selenium or <code>fill("")</code> in Playwright, then assert the value is empty.`,
  },
  {
    id: "S05",
    title: "Disabled Input Field",
    testId: "scenario-disabled-input",
    resultId: "result-s05",
    initialResult: "Input is disabled — typing is blocked",
    badge: "DISABLED",
    hint: `Assert state instead of typing: <code>isEnabled() === false</code> (Selenium) or <code>toBeDisabled()</code> (Playwright).`,
  },
  {
    id: "S06",
    title: "Readonly Input Field",
    testId: "scenario-readonly-input",
    resultId: "result-s06",
    initialResult: "Readonly — value can be read but not edited",
    badge: "READONLY",
    hint: `Detect via <code>getAttribute("readonly")</code> (Selenium) or <code>toHaveAttribute("readonly", "")</code> (Playwright).`,
  },
];

export const frameworkMethods: Record<"selenium" | "playwright" | "cypress", FrameworkMethods> = {
  selenium: {
    label: "Selenium (Java)",
    methods: [
      { color: "purple", label: "sendKeys()" },
      { color: "blue",   label: "clear()" },
      { color: "orange", label: 'getAttribute("value")' },
      { color: "green",  label: "isEnabled()" },
      { color: "yellow", label: 'getAttribute("readonly")' },
    ],
  },
  playwright: {
    label: "Playwright JS / PY",
    methods: [
      { color: "purple", label: "fill()" },
      { color: "blue",   label: "clear()" },
      { color: "orange", label: "inputValue()" },
      { color: "green",  label: "toBeDisabled()" },
      { color: "yellow", label: "toHaveAttribute()" },
    ],
  },
  cypress: {
    label: "Cypress JS",
    methods: [
      { color: "purple", label: ".type()" },
      { color: "blue",   label: ".clear()" },
      { color: "orange", label: ".invoke('val')" },
      { color: "green",  label: "should('be.disabled')" },
      { color: "yellow", label: "should('have.attr')" },
    ],
  },
};
