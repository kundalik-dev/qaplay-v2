import type {
  ScenarioMeta,
  FrameworkMethods,
} from "@/data/practice-data/types";

export const radioCheckboxScenarios: ScenarioMeta[] = [
  {
    id: "S01",
    title: "Scenario 1: Basic Checkbox Check / Uncheck",
    testId: "scenario-rc-basic-checkbox",
    resultId: "result-s01",
    initialResult: "Not checked",
    hint: `Target: <code>[data-testid="chk-accept-terms"]</code> → call <code>check()</code> then <code>isChecked()</code>.`,
  },
  {
    id: "S02",
    title: "Scenario 2: Radio Button Group",
    testId: "scenario-rc-radio-group",
    resultId: "result-s02",
    initialResult: "No option selected",
    hint: `Target: <code>[data-testid="radio-plan-group"]</code> → scope to the group then <code>getByLabel('Pro')</code> and <code>check()</code>.`,
  },
  {
    id: "S03",
    title: "Scenario 3: Checkbox Group — Select All",
    testId: "scenario-rc-checkbox-group",
    resultId: "result-s03",
    initialResult: "No skills selected",
    hint: `All checkboxes share <code>data-testid="chk-skill"</code>. Use <code>page.getByTestId('chk-skill').all()</code> and loop to check each one.`,
  },
  {
    id: "S04",
    title: "Scenario 4: Assert Checked / Unchecked State",
    testId: "scenario-rc-assert-state",
    resultId: "result-s04",
    initialResult: "State not asserted",
    hint: `Target: <code>[data-testid="chk-newsletter"]</code> is pre-checked. Assert <code>toBeChecked()</code>, then uncheck and assert <code>not.toBeChecked()</code>.`,
  },
  {
    id: "S05",
    title: "Scenario 5: Disabled Controls",
    testId: "scenario-rc-disabled",
    resultId: "result-s05",
    initialResult: "Disabled state not tested",
    hint: `Target: <code>[data-testid="chk-disabled"]</code> and <code>[data-testid="radio-disabled"]</code> → assert <code>isDisabled()</code> returns true.`,
    badge: "DISABLED",
  },
  {
    id: "S06",
    title: "Scenario 6: Sibling-Located Controls (Hard)",
    testId: "scenario-rc-sibling",
    resultId: "result-s06",
    initialResult: "Sibling control not located",
    hint: `No <code>data-testid</code> on these inputs. Use XPath: <code>//span[normalize-space()="Marketing emails"]/preceding-sibling::input</code> or <code>//label[.//span[normalize-space()="SMS alerts"]]/input</code>.`,
  },
  {
    id: "S07",
    title: "Scenario 7: Scoped Card Controls (Medium)",
    testId: "scenario-rc-cards",
    resultId: "result-s07",
    initialResult: "Card not selected",
    hint: `Cards share <code>data-testid="plan-card"</code>. Scope by slug: <code>[data-testid="plan-card"][data-plan="enterprise"]</code> → find the radio inside and <code>check()</code>.`,
  },
  {
    id: "S08",
    title: "Scenario 8: Dynamic Checkbox List (Challenge)",
    testId: "scenario-rc-dynamic",
    resultId: "result-s08",
    initialResult: "Dynamic list not interacted",
    hint: `No <code>data-testid</code>. Locate via: <code>//input[@type="checkbox" and starts-with(@name, "perm_")]</code>. Check only the items whose label contains "Read".`,
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
      { color: "purple", label: "click()" },
      { color: "blue", label: "isSelected()" },
      { color: "orange", label: "isEnabled()" },
      { color: "emerald", label: 'getAttribute("value")' },
      { color: "slate", label: "findElements(By.name())" },
    ],
  },
  playwright: {
    label: "Playwright JS / PY",
    methods: [
      { color: "purple", label: "check()" },
      { color: "blue", label: "isChecked()" },
      { color: "orange", label: "isDisabled()" },
      { color: "emerald", label: "toBeChecked()" },
      { color: "slate", label: "locator.all()" },
    ],
  },
  cypress: {
    label: "Cypress JS",
    methods: [
      { color: "purple", label: ".check()" },
      { color: "blue", label: ".should('be.checked')" },
      { color: "orange", label: ".should('be.disabled')" },
      { color: "emerald", label: ".uncheck()" },
      { color: "slate", label: ".invoke('val')" },
    ],
  },
};
