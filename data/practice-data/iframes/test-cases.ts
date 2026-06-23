import type { TestCase } from "@/data/practice-data/types";

export const iframesTestCases: TestCase[] = [
  {
    id: "IFR_001",
    scenario: "Switch into iframe by data-testid and fill a text input",
    expected:
      "Input inside the iframe is filled; result text confirms submission.",
    type: "positive",
    priority: "high",
    steps: [
      "Navigate to <code>/practice/iframes</code>.",
      "Locate iframe: <code>page.frameLocator('[data-testid=\"iframe-basic\"]')</code>.",
      "Fill: <code>.getByTestId('iframe-name-input').fill('Jane')</code>.",
      "Click: <code>.getByTestId('iframe-submit-btn').click()</code>.",
      'Assert <code>[id="result-s01"]</code> contains "Submitted".',
    ],
  },
  {
    id: "IFR_002",
    scenario: "Switch into iframe by title attribute",
    expected:
      "Same form interacted with; frameLocator by title resolves correctly.",
    type: "positive",
    priority: "medium",
    steps: [
      "Locate iframe by title: <code>page.frameLocator('iframe[title=\"Basic Iframe\"]')</code>.",
      "Fill and submit as in IFR_001.",
      "Assert result confirms submission.",
    ],
  },
  {
    id: "IFR_003",
    scenario: "Switch into iframe by name attribute",
    expected:
      "Same form interacted with; frameLocator by name resolves correctly.",
    type: "positive",
    priority: "medium",
    steps: [
      "Locate iframe by name: <code>page.frameLocator('iframe[name=\"basic-frame\"]')</code>.",
      "Fill and submit.",
      "Assert result confirms submission.",
    ],
  },
  {
    id: "IFR_004",
    scenario: "Select a dropdown option inside an iframe",
    expected: "Dropdown reflects chosen value; save button is enabled.",
    type: "positive",
    priority: "high",
    steps: [
      'Switch into <code>iframe[title="Form Iframe"]</code>.',
      "Call <code>.getByTestId('iframe-lang-select').selectOption('python')</code>.",
      'Assert select value is "python".',
    ],
  },
  {
    id: "IFR_005",
    scenario: "Check a checkbox inside an iframe using getByLabel",
    expected: "Checkbox is in checked state after interaction.",
    type: "positive",
    priority: "high",
    steps: [
      "Switch into Form Iframe.",
      "Call <code>.getByLabel('I agree to the terms').check()</code>.",
      "Assert <code>.isChecked()</code> returns true.",
    ],
  },
  {
    id: "IFR_006",
    scenario: "Submit form inside iframe and assert result text",
    expected: "Result text inside iframe confirms the saved preferences.",
    type: "positive",
    priority: "high",
    steps: [
      "Select language and check the agree checkbox.",
      'Click <code>[data-testid="iframe-save-btn"]</code>.',
      'Assert iframe result text contains language name and "agreed".',
    ],
  },
  {
    id: "IFR_007",
    scenario:
      "Locate iframe by name attribute and click button inside (no testid)",
    expected: "Button inside Frame Two clicked; result text confirms.",
    type: "positive",
    priority: "high",
    steps: [
      "Locate iframe: <code>page.frameLocator('iframe[name=\"frame-two\"]')</code>.",
      "Button has no <code>data-testid</code> — use <code>.getByRole('button', &#123; name: 'Activate Frame Two' &#125;)</code>.",
      'Assert Frame Two result text shows "activated".',
    ],
  },
  {
    id: "IFR_008",
    scenario: "Locate iframe by title and click button by visible text",
    expected: "Button inside Frame Three clicked by text locator.",
    type: "positive",
    priority: "high",
    steps: [
      "Locate: <code>page.frameLocator('iframe[title=\"Frame Three\"]')</code>.",
      "Button has no testid or aria-label — use <code>.getByRole('button', &#123; name: 'Confirm Action' &#125;)</code>.",
      'Assert Frame Three result shows "confirmed".',
    ],
  },
  {
    id: "IFR_009",
    scenario: "Interact with a 2-level nested iframe",
    expected:
      "Inner iframe input filled and submitted; result propagates to page.",
    type: "positive",
    priority: "high",
    steps: [
      "Chain: <code>page.frameLocator('[data-testid=\"iframe-outer\"]')</code>.",
      "Then: <code>.frameLocator('iframe[title=\"Inner Frame\"]')</code>.",
      "Fill: <code>.getByTestId('iframe-inner-input').fill('secret')</code>.",
      "Click: <code>.getByTestId('iframe-inner-submit').click()</code>.",
      'Assert <code>[id="result-s04"]</code> contains "unlocked".',
    ],
  },
  {
    id: "IFR_010",
    scenario:
      "Switch to parent frame after interacting with nested iframe (Selenium)",
    expected: "After switchTo().parentFrame(), back in outer frame context.",
    type: "positive",
    priority: "medium",
    steps: [
      "Switch to outer frame: <code>driver.switchTo().frame(outerEl)</code>.",
      "Switch to inner frame: <code>driver.switchTo().frame(innerEl)</code>.",
      "Interact with inner content.",
      "Switch back: <code>driver.switchTo().parentFrame()</code>.",
      "Assert outer frame context is restored.",
    ],
  },
  {
    id: "IFR_011",
    scenario: "Wait for dynamically loaded content inside an iframe",
    expected:
      "Button appears after delay; interaction succeeds without timeout error.",
    type: "positive",
    priority: "high",
    steps: [
      "Switch into dynamic iframe.",
      "Wait: <code>await expect(frame.getByRole('button', &#123; name: 'Reveal Secret' &#125;)).toBeVisible(&#123; timeout: 5000 &#125;)</code>.",
      "Fill the input (no testid — use aria-label).",
      "Click Reveal Secret.",
      "Assert result text shows the revealed value.",
    ],
  },
  {
    id: "IFR_012",
    scenario: "Locate dynamic iframe input by aria-label (no data-testid)",
    expected: "Input found and filled using role + aria-label locator.",
    type: "positive",
    priority: "medium",
    steps: [
      "Wait for dynamic content to appear.",
      "Locate: <code>frame.getByRole('textbox', &#123; name: 'Reveal code input' &#125;)</code>.",
      "Fill the input and click Reveal Secret.",
      "Assert result text is updated.",
    ],
  },
  {
    id: "IFR_013",
    scenario: "Submit invalid form inside iframe and assert error messages",
    expected:
      "Error spans appear; they have no data-testid — located via role or XPath.",
    type: "negative",
    priority: "high",
    steps: [
      "Switch into validation iframe.",
      'Click <code>[data-testid="iframe-val-submit"]</code> without filling fields.',
      "Assert errors are visible: <code>frame.getByRole('alert').first()</code> or XPath <code>//span[@role=\"alert\"]</code>.",
      'Assert at least one error contains "required".',
    ],
  },
  {
    id: "IFR_014",
    scenario: "Locate optional field inside iframe by label only (no testid)",
    expected:
      "Company field filled using getByLabel — no data-testid on that field.",
    type: "positive",
    priority: "medium",
    steps: [
      "Switch into validation iframe.",
      "Locate: <code>frame.getByLabel('Company')</code> — no testid on this input.",
      "Fill with a company name.",
      "Fill required fields, submit, assert success.",
    ],
    note: "Company field intentionally has no data-testid to practice label-based locators.",
  },
];
