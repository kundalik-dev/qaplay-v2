import type { ScenarioMeta, FrameworkMethods } from "@/data/practice-data/types";

export const iframesScenarios: ScenarioMeta[] = [
  {
    id: "S01",
    title: "Scenario 1: Basic iframe — Fill and Submit (Beginner)",
    testId: "scenario-iframe-basic",
    resultId: "result-s01",
    initialResult: "Not submitted yet",
    hint: `Switch into the iframe: <code>page.frameLocator('[data-testid="iframe-basic"]')</code>. Fill: <code>.getByTestId('iframe-name-input').fill('Jane')</code>. Click: <code>.getByTestId('iframe-submit-btn').click()</code>. Selenium: <code>driver.switchTo().frame(driver.findElement(By.cssSelector("[data-testid='iframe-basic']")))</code>.`,
  },
  {
    id: "S02",
    title: "Scenario 2: iframe with Checkbox & Select (Beginner)",
    testId: "scenario-iframe-form",
    resultId: "result-s02",
    initialResult: "Preferences not saved",
    hint: `Locate by title: <code>page.frameLocator('iframe[title="Form Iframe"]')</code>. Select: <code>.getByTestId('iframe-lang-select').selectOption('python')</code>. Checkbox: <code>.getByLabel('I agree to the terms').check()</code>. Submit: <code>.getByTestId('iframe-save-btn').click()</code>.`,
  },
  {
    id: "S03",
    title: "Scenario 3: Multiple iFrames — Locate by Attribute (Medium)",
    testId: "scenario-iframe-multi",
    resultId: "result-s03",
    initialResult: "No frame interacted with",
    hint: `Frame 1 (<code>data-testid="iframe-frame-1"</code>): use <code>getByTestId</code>. Frame 2 (<code>name="frame-two"</code>, no testid): use <code>frameLocator('iframe[name="frame-two"]')</code>. Frame 3 (<code>title="Frame Three"</code>): use <code>frameLocator('iframe[title="Frame Three"]')</code>. Button inside Frame 3 has no testid — use <code>getByRole('button', &#123; name: 'Confirm Action' &#125;)</code>.`,
  },
  {
    id: "S04",
    title: "Scenario 4: Nested iFrames — 2 Levels Deep (Medium)",
    testId: "scenario-iframe-nested",
    resultId: "result-s04",
    initialResult: "Inner frame not interacted with",
    hint: `Chain frame locators: <code>page.frameLocator('[data-testid="iframe-outer"]').frameLocator('iframe[title="Inner Frame"]')</code>. Then fill: <code>.getByTestId('iframe-inner-input').fill('secret')</code>. Selenium: <code>driver.switchTo().frame(outer)</code> then <code>driver.switchTo().frame(inner)</code>. Return: <code>driver.switchTo().parentFrame()</code>.`,
  },
  {
    id: "S05",
    title: "Scenario 5: Dynamic Content in iframe — Wait for Load (Hard)",
    testId: "scenario-iframe-dynamic",
    resultId: "result-s05",
    initialResult: "Dynamic content not interacted with",
    hint: `Content appears after 1.5 s. The button and input have <strong>no</strong> <code>data-testid</code>. Wait: <code>await expect(frame.getByRole('button', &#123; name: 'Reveal Secret' &#125;)).toBeVisible(&#123; timeout: 5000 &#125;)</code>. Input: <code>frame.getByRole('textbox', &#123; name: 'Reveal code input' &#125;)</code>. XPath: <code>//button[@aria-label='Reveal Secret']</code>.`,
    badge: "HARD",
  },
  {
    id: "S06",
    title: "Scenario 6: Form Validation Inside iframe (Challenge)",
    testId: "scenario-iframe-validation",
    resultId: "result-s06",
    initialResult: "Form not submitted",
    hint: `Submit with empty fields to trigger errors. Error spans have <strong>no</strong> <code>data-testid</code>. Locate via: <code>frame.getByRole('alert')</code> or XPath <code>//input[@id='val-name']/following-sibling::span</code> or <code>//label[normalize-space()='Full name']/following-sibling::span[@class='field-error']</code>. Company field also has no testid — locate by label: <code>frame.getByLabel('Company')</code>.`,
    badge: "CHALLENGE",
  },
];

export const frameworkMethods: Record<"selenium" | "playwright" | "cypress", FrameworkMethods> = {
  selenium: {
    label: "Selenium (Java)",
    methods: [
      { color: "purple", label: "switchTo().frame(element)" },
      { color: "blue",   label: "switchTo().frame(name)" },
      { color: "orange", label: "switchTo().frame(index)" },
      { color: "emerald",label: "switchTo().parentFrame()" },
      { color: "slate",  label: "switchTo().defaultContent()" },
    ],
  },
  playwright: {
    label: "Playwright JS / PY",
    methods: [
      { color: "purple", label: "page.frameLocator(selector)" },
      { color: "blue",   label: "frameLocator().frameLocator()" },
      { color: "orange", label: "page.frame({ name: '…' })" },
      { color: "emerald",label: "page.frame({ url: /…/ })" },
      { color: "slate",  label: "frame.waitForSelector()" },
    ],
  },
  cypress: {
    label: "Cypress JS",
    methods: [
      { color: "purple", label: "cy.iframe() (plugin)" },
      { color: "blue",   label: ".its('0.contentDocument')" },
      { color: "orange", label: ".find('body').find(sel)" },
      { color: "emerald",label: "cy-iframe plugin" },
      { color: "slate",  label: "{ includeShadowDom: true }" },
    ],
  },
};
