import type { ScenarioMeta, FrameworkMethods } from "@/data/practice-data/types";

export const fileUploadScenarios: ScenarioMeta[] = [
  {
    id: "S01",
    title: "Scenario 1: Upload a Single File",
    testId: "scenario-fu-single",
    resultId: "result-s01",
    initialResult: "No file selected",
    hint: `Locate <code>[data-testid="fu-single-input"]</code> → Playwright: <code>setInputFiles('/path/file.pdf')</code> · Selenium: <code>element.sendKeys('/path/file.pdf')</code> · Cypress: <code>.selectFile('cypress/fixtures/file.pdf')</code>.`,
  },
  {
    id: "S02",
    title: "Scenario 2: Upload Multiple Files",
    testId: "scenario-fu-multi",
    resultId: "result-s02",
    initialResult: "No files selected",
    hint: `<code>[data-testid="fu-multi-input"]</code> has the <code>multiple</code> attribute. Playwright: <code>setInputFiles(['file1.pdf', 'file2.png'])</code> · Cypress: <code>.selectFile(['cypress/fixtures/a.pdf', 'cypress/fixtures/b.png'])</code>.`,
  },
  {
    id: "S03",
    title: "Scenario 3: Assert File Name After Selection (Medium)",
    testId: "scenario-fu-filename",
    resultId: "result-s03",
    initialResult: "Filename not asserted",
    hint: `After selecting a file via <code>[data-testid="fu-filename-input"]</code>, a label with the file name appears inside <code>[data-testid="fu-filename-display"]</code>. No <code>data-testid</code> on the inner span — scope via: <code>page.getByTestId('fu-filename-display').getByRole('status')</code> or XPath <code>//*[@data-testid="fu-filename-display"]//span</code>.`,
  },
  {
    id: "S04",
    title: "Scenario 4: Drag & Drop Upload Zone (Hard)",
    testId: "scenario-fu-dragdrop",
    resultId: "result-s04",
    initialResult: "No file dropped",
    hint: `The drop zone is <code>[data-testid="fu-drop-zone"]</code>. It accepts <code>dragover</code> and <code>drop</code> events. Playwright: use <code>page.dispatchEvent</code> with a <code>DataTransfer</code> object, or use <code>setInputFiles</code> on the hidden <code>input[data-testid="fu-drop-input"]</code> inside the zone. XPath: <code>//*[@data-testid="fu-drop-zone"]//input[@type="file"]</code>.`,
  },
  {
    id: "S05",
    title: "Scenario 5: File Type Restriction (Medium)",
    testId: "scenario-fu-type",
    resultId: "result-s05",
    initialResult: "Type not validated",
    hint: `<code>[data-testid="fu-type-input"]</code> accepts only images (<code>accept="image/*"</code>). Upload a non-image file → assert the error message in <code>[data-testid="fu-type-error"]</code>. CSS: <code>[data-testid="fu-type-input"][accept]</code> · XPath: <code>//input[@data-testid="fu-type-input" and @accept]</code>.`,
  },
  {
    id: "S06",
    title: "Scenario 6: File Size Validation (Hard)",
    testId: "scenario-fu-size",
    resultId: "result-s06",
    initialResult: "Size not validated",
    hint: `<code>[data-testid="fu-size-input"]</code> rejects files over 2 MB. The error paragraph has <strong>no</strong> <code>data-testid</code>. Locate it via: <code>//*[@data-testid="fu-size-panel"]//p[contains(@class, "error-msg")]</code> or parent-scoped: <code>page.getByTestId('fu-size-panel').locator('.error-msg')</code>.`,
  },
  {
    id: "S07",
    title: "Scenario 7: Custom Button Triggers Hidden Input (Challenge)",
    testId: "scenario-fu-hidden",
    resultId: "result-s07",
    initialResult: "Hidden input not targeted",
    hint: `A styled <code>[data-testid="fu-custom-btn"]</code> triggers a visually hidden file input. The input itself has <strong>no</strong> <code>data-testid</code> or visible label. Target it with: <code>page.locator('[data-testid="fu-hidden-zone"] input[type="file"]')</code> or XPath <code>//*[@data-testid="fu-hidden-zone"]//input[@type="file"]</code>. Use <code>setInputFiles</code> — do NOT click the input directly.`,
    badge: "CHALLENGE",
  },
  {
    id: "S08",
    title: "Scenario 8: Upload Progress Bar (Challenge)",
    testId: "scenario-fu-progress",
    resultId: "result-s08",
    initialResult: "Progress not tracked",
    hint: `Click <code>[data-testid="fu-upload-btn"]</code> after selecting a file. A progress bar appears with <code>role="progressbar"</code> but <strong>no</strong> <code>data-testid</code>. Locate via ARIA: <code>page.getByRole('progressbar')</code> · XPath: <code>//*[@data-testid="fu-progress-panel"]//*[@role="progressbar"]</code>. Assert <code>aria-valuenow</code> reaches 100.`,
    badge: "CHALLENGE",
  },
];

export const frameworkMethods: Record<"selenium" | "playwright" | "cypress", FrameworkMethods> = {
  selenium: {
    label: "Selenium (Java)",
    methods: [
      { color: "purple", label: "element.sendKeys('/path/file')" },
      { color: "blue",   label: "Robot class (drag & drop)" },
      { color: "orange", label: "JavascriptExecutor (hidden)" },
      { color: "emerald",label: "getAttribute('value')" },
      { color: "slate",  label: "visibilityOf(errorEl)" },
    ],
  },
  playwright: {
    label: "Playwright JS / PY",
    methods: [
      { color: "purple", label: "setInputFiles('path')" },
      { color: "blue",   label: "setInputFiles(['a','b'])" },
      { color: "orange", label: "dispatchEvent('drop', dt)" },
      { color: "emerald",label: "getByRole('progressbar')" },
      { color: "slate",  label: "waitFor({ state: 'hidden' })" },
    ],
  },
  cypress: {
    label: "Cypress JS",
    methods: [
      { color: "purple", label: ".selectFile('fixtures/f')" },
      { color: "blue",   label: ".selectFile(['a','b'])" },
      { color: "orange", label: ".selectFile(…, { action: 'drag-drop' })" },
      { color: "emerald",label: ".should('have.attr', 'accept')" },
      { color: "slate",  label: ".invoke('attr', 'aria-valuenow')" },
    ],
  },
};
