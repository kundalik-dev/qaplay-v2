import type {
  ScenarioMeta,
  FrameworkMethods,
} from "@/data/practice-data/types";

export const datePickerScenarios: ScenarioMeta[] = [
  {
    id: "S01",
    title: "Scenario 1: Basic Date Input",
    testId: "scenario-dp-basic-input",
    resultId: "result-s01",
    initialResult: "No date selected",
    hint: `Target: <code>[data-testid="dp-basic-input"]</code> → fill with a date string like <code>2025-06-15</code> and assert value.`,
  },
  {
    id: "S02",
    title: "Scenario 2: Calendar Open & Select",
    testId: "scenario-dp-calendar",
    resultId: "result-s02",
    initialResult: "Calendar not opened",
    hint: `Target: <code>[data-testid="dp-calendar-trigger"]</code> → click to open, then target <code>[data-testid="dp-day-btn"][data-date="2025-07-20"]</code> to select.`,
  },
  {
    id: "S03",
    title: "Scenario 3: Month Navigation",
    testId: "scenario-dp-month-nav",
    resultId: "result-s03",
    initialResult: "Month not navigated",
    hint: `Target: <code>[data-testid="dp-prev-month"]</code> or <code>[data-testid="dp-next-month"]</code> → click and assert the displayed month header updates.`,
  },
  {
    id: "S04",
    title: "Scenario 4: Date Range Picker",
    testId: "scenario-dp-range",
    resultId: "result-s04",
    initialResult: "Range not set",
    hint: `Target: <code>[data-testid="dp-range-start"]</code> and <code>[data-testid="dp-range-end"]</code> → fill both and assert the range display.`,
  },
  {
    id: "S05",
    title: "Scenario 5: Disabled / Min-Max Dates",
    testId: "scenario-dp-constraints",
    resultId: "result-s05",
    initialResult: "Constraints not tested",
    hint: `Target: <code>[data-testid="dp-constrained-input"]</code> → assert it has <code>min</code> and <code>max</code> attributes. Try to type an out-of-range date and assert the invalid state.`,
  },
  {
    id: "S06",
    title: "Scenario 6: Sibling-Located Date Fields",
    testId: "scenario-dp-sibling",
    resultId: "result-s06",
    initialResult: "Sibling date not filled",
    hint: `No <code>data-testid</code> on the inputs. Use: <code>//span[normalize-space()="Appointment Date"]/following-sibling::input</code> or <code>//span[normalize-space()="Return Date"]/following-sibling::input</code>.`,
  },
  {
    id: "S07",
    title: "Scenario 7: Repeated Date Cards (Scoped)",
    testId: "scenario-dp-cards",
    resultId: "result-s07",
    initialResult: "Card date not booked",
    hint: `Target the card by slug: <code>[data-testid="booking-card"][data-slot="morning"]</code> → then locate the <code>Book</code> button inside it.`,
  },
  {
    id: "S08",
    title: "Scenario 8: Dynamic Date Display (Challenge)",
    testId: "scenario-dp-dynamic",
    resultId: "result-s08",
    initialResult: "Dynamic date not asserted",
    hint: `No <code>data-testid</code>. Use XPath: <code>//*[@id="dynamic-date-display"]</code> or locate by visible text containing today's date. Assert the displayed value matches <code>new Date().toLocaleDateString()</code>.`,
    badge: "CHALLENGE",
  },
];

export const frameworkMethods: Record<
  "selenium" | "playwright" | "cypress",
  FrameworkMethods
> = {
  selenium: {
    label: "Selenium (Java)",
    methods: [
      { color: "purple", label: 'sendKeys("2025-06-15")' },
      { color: "blue", label: 'getAttribute("value")' },
      { color: "orange", label: 'getAttribute("min")' },
      { color: "emerald", label: 'getAttribute("max")' },
      { color: "slate", label: "clear() → sendKeys()" },
    ],
  },
  playwright: {
    label: "Playwright JS / PY",
    methods: [
      { color: "purple", label: 'fill("2025-06-15")' },
      { color: "blue", label: "inputValue()" },
      { color: "orange", label: 'getAttribute("min")' },
      { color: "emerald", label: 'getAttribute("max")' },
      { color: "slate", label: 'press("Tab")' },
    ],
  },
  cypress: {
    label: "Cypress JS",
    methods: [
      { color: "purple", label: '.type("2025-06-15")' },
      { color: "blue", label: ".invoke('val')" },
      { color: "orange", label: ".invoke('attr', 'min')" },
      { color: "emerald", label: ".invoke('attr', 'max')" },
      { color: "slate", label: ".clear().type()" },
    ],
  },
};
