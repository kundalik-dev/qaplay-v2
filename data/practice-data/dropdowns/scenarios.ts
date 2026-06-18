import type {
  FrameworkMethods,
  ScenarioMeta,
} from "@/data/practice-data/types";

export const dropdownScenarios: ScenarioMeta[] = [
  {
    id: "S01",
    title: "Select Fruit by Visible Text",
    testId: "scenario-select-fruit",
    resultId: "result-s01",
    initialResult: "No fruit selected",
    hint: `Use <code>selectOption({ label: "Apple" })</code> in Playwright or <code>Select.selectByVisibleText("Apple")</code> in Selenium.`,
  },
  {
    id: "S02",
    title: "Select Country by Value Attribute",
    testId: "scenario-select-country",
    resultId: "result-s02",
    initialResult: "No country selected",
    hint: `Target the native select and choose <code>india</code> by value, not by visible text.`,
  },
  {
    id: "S03",
    title: "Select Last Language and Read All Options",
    testId: "scenario-select-language",
    resultId: "result-s03",
    initialResult: "Languages available: 4",
    hint: `Select by index or choose the last <code>option</code>, then read all option labels from <code>#languageSelect option</code>.`,
  },
  {
    id: "S04",
    title: "Multi-Select Superheroes",
    testId: "scenario-multi-select-heroes",
    resultId: "result-s04",
    initialResult: "No heroes selected",
    hint: `Use an array with <code>selectOption()</code> in Playwright or multiple <code>selectByVisibleText()</code> calls in Selenium.`,
  },
  {
    id: "S05",
    title: "Custom Dropdown Listbox",
    testId: "scenario-custom-priority",
    resultId: "result-s05",
    initialResult: "Priority not selected",
    hint: `Open <code>[data-testid="priority-dropdown-trigger"]</code>, then scope to the listbox and choose the option named High Priority.`,
  },
  {
    id: "S06",
    title: "Searchable City Combobox",
    testId: "scenario-search-city",
    resultId: "result-s06",
    initialResult: "No city selected",
    hint: `Fill the combobox, then locate an option by role, text, or <code>data-city-id</code>. XPath practice: <code>//label[normalize-space()="City"]/following-sibling::div//input</code>.`,
  },
];

export const frameworkMethods: Record<
  "selenium" | "playwright" | "cypress",
  FrameworkMethods
> = {
  selenium: {
    label: "Selenium (Java)",
    methods: [
      { color: "purple", label: "Select(WebElement)" },
      { color: "blue", label: "selectByVisibleText()" },
      { color: "orange", label: "selectByValue()" },
      { color: "green", label: "getOptions()" },
      { color: "yellow", label: "getAllSelectedOptions()" },
    ],
  },
  playwright: {
    label: "Playwright JS / PY",
    methods: [
      { color: "purple", label: "selectOption()" },
      { color: "blue", label: "getByRole('option')" },
      { color: "orange", label: "locator('option')" },
      { color: "green", label: "inputValue()" },
      { color: "yellow", label: "toHaveValues()" },
    ],
  },
  cypress: {
    label: "Cypress JS",
    methods: [
      { color: "purple", label: ".select()" },
      { color: "blue", label: ".find('option')" },
      { color: "orange", label: ".invoke('val')" },
      { color: "green", label: ".contains()" },
      { color: "yellow", label: ".should('have.value')" },
    ],
  },
};
