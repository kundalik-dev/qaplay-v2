import type { ScenarioMeta, FrameworkMethods } from "@/data/practice-data/types";

export const multiSelectScenarios: ScenarioMeta[] = [
  {
    id: "S01",
    title: "Scenario 1: Select a Single Option (Native)",
    testId: "scenario-ms-single",
    resultId: "result-s01",
    initialResult: "No option selected",
    hint: `Locate <code>[data-testid="ms-native-select"]</code> → call <code>selectOption('playwright')</code> (Playwright) or <code>Select.selectByValue('playwright')</code> (Selenium).`,
  },
  {
    id: "S02",
    title: "Scenario 2: Select Multiple Options (Native)",
    testId: "scenario-ms-multi",
    resultId: "result-s02",
    initialResult: "No options selected",
    hint: `Same <code>[data-testid="ms-native-select"]</code> → Playwright: <code>selectOption(['playwright', 'cypress'])</code> · Selenium: call <code>selectByValue</code> twice with Actions holding Ctrl.`,
  },
  {
    id: "S03",
    title: "Scenario 3: Deselect a Specific Option",
    testId: "scenario-ms-deselect",
    resultId: "result-s03",
    initialResult: "Deselect not attempted",
    hint: `First select all via <code>[data-testid="ms-deselect-trigger"]</code>. Then deselect "Selenium": Playwright <code>selectOption</code> with remaining values only · Selenium <code>Actions.keyDown(Keys.CONTROL).click(option).keyUp(Keys.CONTROL)</code>.`,
  },
  {
    id: "S04",
    title: "Scenario 4: Custom Checkbox Multi-Select",
    testId: "scenario-ms-custom",
    resultId: "result-s04",
    initialResult: "No options checked",
    hint: `Click <code>[data-testid="ms-custom-trigger"]</code> to open the dropdown. The panel has <code>role="listbox"</code> and each option has <code>role="option"</code> and <code>data-value</code>. Locate: <code>[data-testid="ms-custom-option"][data-value="react"]</code>. Use scoped Playwright locator or XPath ancestor.`,
  },
  {
    id: "S05",
    title: "Scenario 5: Select All / Clear All",
    testId: "scenario-ms-select-all",
    resultId: "result-s05",
    initialResult: "Select-all not used",
    hint: `<code>[data-testid="ms-select-all-btn"]</code> selects all options. <code>[data-testid="ms-clear-all-btn"]</code> clears selection. Both are inside <code>[data-testid="ms-bulk-panel"]</code>. Practice scoped locator: <code>page.getByTestId('ms-bulk-panel').getByRole('button', { name: 'Select All' })</code>.`,
  },
  {
    id: "S06",
    title: "Scenario 6: Remove a Tag/Pill (Hard)",
    testId: "scenario-ms-tag-remove",
    resultId: "result-s06",
    initialResult: "Tag removal not attempted",
    hint: `Tags are rendered in <code>[data-testid="ms-tag-list"]</code>. Each tag is <code>[data-testid="ms-tag"][data-tag-value="…"]</code>. The remove button has NO <code>data-testid</code>. Target it with: <code>//li[@data-tag-value="javascript"]//button</code> or <code>page.locator('[data-tag-value="javascript"]').getByRole('button')</code>.`,
  },
  {
    id: "S07",
    title: "Scenario 7: Searchable Multi-Select (Hard)",
    testId: "scenario-ms-searchable",
    resultId: "result-s07",
    initialResult: "Search not performed",
    hint: `<code>[data-testid="ms-search-input"]</code> has <code>role="combobox"</code>. Type to filter. Options appear in <code>[role="listbox"][data-testid="ms-search-results"]</code> as <code>[role="option"]</code> with <code>data-option-id</code>. XPath: <code>//*[@data-testid="ms-search-results"]//*[@role="option" and @data-option-id="opt-vue"]</code>.`,
  },
  {
    id: "S08",
    title: "Scenario 8: Grouped Options (Challenge)",
    testId: "scenario-ms-grouped",
    resultId: "result-s08",
    initialResult: "Group not targeted",
    hint: `A native <code>&lt;select multiple&gt;</code> with <code>&lt;optgroup&gt;</code>. No <code>data-testid</code> on the optgroup. Target options by value or XPath: <code>//select[@data-testid="ms-grouped-select"]//optgroup[@label="Backend"]//option[@value="node"]</code>. Selenium: <code>By.xpath("//optgroup[@label='Backend']/option[@value='node']")</code>.`,
    badge: "CHALLENGE",
  },
];

export const frameworkMethods: Record<"selenium" | "playwright" | "cypress", FrameworkMethods> = {
  selenium: {
    label: "Selenium (Java)",
    methods: [
      { color: "purple", label: "Select.selectByValue()" },
      { color: "blue",   label: "Select.deselectByValue()" },
      { color: "orange", label: "Select.selectByVisibleText()" },
      { color: "emerald",label: "Actions + Keys.CONTROL" },
      { color: "slate",  label: "Select.getOptions()" },
    ],
  },
  playwright: {
    label: "Playwright JS / PY",
    methods: [
      { color: "purple", label: "selectOption('value')" },
      { color: "blue",   label: "selectOption(['v1','v2'])" },
      { color: "orange", label: "getByRole('option')" },
      { color: "emerald",label: "getByRole('combobox')" },
      { color: "slate",  label: "filter({ hasText })" },
    ],
  },
  cypress: {
    label: "Cypress JS",
    methods: [
      { color: "purple", label: ".select('value')" },
      { color: "blue",   label: ".select(['v1','v2'])" },
      { color: "orange", label: ".contains('option text')" },
      { color: "emerald",label: ".should('have.value', …)" },
      { color: "slate",  label: "{ force: true }" },
    ],
  },
};
