import type {
  FaqItem,
  LearnCodeSnippet,
  MethodRow,
  TocItem,
} from "@/data/practice-data/types";

export const fileUploadTocItems: TocItem[] = [
  { id: "learn-overview", label: "Overview" },
  { id: "learn-native", label: "1 · setInputFiles" },
  { id: "learn-dragdrop", label: "2 · Drag & Drop" },
  { id: "learn-hidden", label: "3 · Hidden File Inputs" },
  { id: "learn-validate", label: "4 · Validation Assertions" },
  { id: "learn-methods", label: "Method Summary", dividerBefore: true },
  { id: "learn-faq", label: "FAQ" },
];

export const fileUploadLearnDesc: Record<string, string> = {
  overview:
    "File upload inputs are among the most common — and most misunderstood — elements to automate. Native <input type='file'> is handled differently by each framework: Playwright uses setInputFiles and bypasses the OS dialog entirely; Selenium uses sendKeys with the absolute file path; Cypress uses selectFile. Drag-and-drop zones and hidden inputs require extra care.",
  native:
    "setInputFiles (Playwright) and sendKeys (Selenium) both write a file path directly to the file input without triggering the OS dialog. This is the preferred approach in CI environments where no OS dialog can appear. Pass an array to set multiple files. Pass an empty array to clear the selection.",
  dragdrop:
    "Drag-and-drop upload zones are typically built as a div with dragover and drop event listeners that read e.dataTransfer.files. In Playwright, the easiest approach is to find the hidden <input type='file'> inside the zone and use setInputFiles. Cypress provides selectFile with { action: 'drag-drop' }. In Selenium you need to use Robot or JavascriptExecutor to construct and dispatch the DataTransfer event.",
  hidden:
    "Custom styled upload buttons hide the native file input with display:none or opacity:0 and then programmatically click it. Playwright's setInputFiles works on hidden inputs because it bypasses the DOM click. In Selenium, make the input visible first with JavascriptExecutor before calling sendKeys, or dispatch the file selection via JS.",
  validate:
    "Client-side validation (type restrictions, size limits) happens in JavaScript before any network call. Assert the error message element after setting an invalid file. Locate error elements via the parent container's data-testid when no direct testid exists on the error itself.",
};

export const fileUploadLearnCode: Record<string, LearnCodeSnippet> = {
  native: {
    pw: {
      lang: "TypeScript",
      code: `// Upload a single file
await page.getByTestId('fu-single-input').setInputFiles('tests/fixtures/sample.pdf');

// Upload multiple files
await page.getByTestId('fu-multi-input').setInputFiles([
  'tests/fixtures/invoice.pdf',
  'tests/fixtures/photo.png',
]);

// Clear file selection
await page.getByTestId('fu-single-input').setInputFiles([]);

// Assert file name displayed
await expect(page.getByTestId('fu-filename-display').getByRole('status'))
  .toContainText('sample.pdf');`,
    },
    sel: {
      lang: "Java",
      code: `// Upload a single file (absolute path required)
WebElement input = driver.findElement(
    By.cssSelector("[data-testid='fu-single-input']")
);
input.sendKeys("/absolute/path/to/sample.pdf");

// Upload multiple files — sendKeys with newline separator
WebElement multiInput = driver.findElement(
    By.cssSelector("[data-testid='fu-multi-input']")
);
multiInput.sendKeys(
    "/path/to/invoice.pdf\n/path/to/photo.png"
);

// Assert file name via adjacent display element
WebElement display = driver.findElement(
    By.cssSelector("[data-testid='fu-filename-display'] span")
);
assertTrue(display.getText().contains("sample.pdf"));`,
    },
    cy: {
      lang: "JavaScript",
      code: `// Upload a single file
cy.get('[data-testid="fu-single-input"]')
  .selectFile('cypress/fixtures/sample.pdf');

// Upload multiple files
cy.get('[data-testid="fu-multi-input"]')
  .selectFile([
    'cypress/fixtures/invoice.pdf',
    'cypress/fixtures/photo.png',
  ]);

// Clear via selectFile is not directly supported — use invoke
cy.get('[data-testid="fu-single-input"]')
  .invoke('val', '');

// Assert filename display
cy.get('[data-testid="fu-filename-display"] [role="status"]')
  .should('contain.text', 'sample.pdf');`,
    },
  },
  dragdrop: {
    pw: {
      lang: "TypeScript",
      code: `// Easiest: target the hidden input inside the drop zone
const dropInput = page.locator('[data-testid="fu-drop-zone"] input[type="file"]');
await dropInput.setInputFiles('tests/fixtures/sample.pdf');

// XPath alternative for the hidden input
// //*[@data-testid="fu-drop-zone"]//input[@type="file"]

// Full drag-and-drop simulation via DataTransfer
const dataTransfer = await page.evaluateHandle(() => new DataTransfer());
await page.dispatchEvent('[data-testid="fu-drop-zone"]', 'dragover', { dataTransfer });
await page.dispatchEvent('[data-testid="fu-drop-zone"]', 'drop',     { dataTransfer });`,
    },
    sel: {
      lang: "Java",
      code: `// Make hidden input visible, then sendKeys
JavascriptExecutor js = (JavascriptExecutor) driver;
WebElement hiddenInput = driver.findElement(
    By.xpath("//*[@data-testid='fu-drop-zone']//input[@type='file']")
);
js.executeScript("arguments[0].style.display='block'", hiddenInput);
hiddenInput.sendKeys("/absolute/path/to/sample.pdf");

// Alternatively dispatch drag events via JS
js.executeScript("""
  const dt = new DataTransfer();
  const zone = document.querySelector('[data-testid="fu-drop-zone"]');
  zone.dispatchEvent(new DragEvent('dragover', { dataTransfer: dt, bubbles: true }));
  zone.dispatchEvent(new DragEvent('drop',     { dataTransfer: dt, bubbles: true }));
""");`,
    },
    cy: {
      lang: "JavaScript",
      code: `// Cypress selectFile with drag-drop action
cy.get('[data-testid="fu-drop-zone"]')
  .selectFile('cypress/fixtures/sample.pdf', { action: 'drag-drop' });

// Or target the hidden input directly
cy.get('[data-testid="fu-drop-zone"] input[type="file"]')
  .selectFile('cypress/fixtures/sample.pdf');`,
    },
  },
  hidden: {
    pw: {
      lang: "TypeScript",
      code: `// setInputFiles works on hidden inputs — no need to make visible
const hiddenInput = page.locator(
  '[data-testid="fu-hidden-zone"] input[type="file"]'
);

// Or by XPath
// //*[@data-testid="fu-hidden-zone"]//input[@type="file"]

await hiddenInput.setInputFiles('tests/fixtures/sample.pdf');

// Do NOT click the custom button if you want CI-safe uploads
// — the styled button triggers the OS dialog in real browsers.
// setInputFiles bypasses the dialog entirely.`,
    },
    sel: {
      lang: "Java",
      code: `// Make hidden input visible first, then sendKeys
JavascriptExecutor js = (JavascriptExecutor) driver;
WebElement hiddenInput = driver.findElement(
    By.xpath("//*[@data-testid='fu-hidden-zone']//input[@type='file']")
);
// Remove display:none / opacity:0
js.executeScript(
    "arguments[0].removeAttribute('style'); arguments[0].style.opacity='1'",
    hiddenInput
);
hiddenInput.sendKeys("/absolute/path/to/sample.pdf");`,
    },
    cy: {
      lang: "JavaScript",
      code: `// Cypress selectFile works on hidden inputs with { force: true }
cy.get('[data-testid="fu-hidden-zone"] input[type="file"]')
  .selectFile('cypress/fixtures/sample.pdf', { force: true });`,
    },
  },
  validate: {
    pw: {
      lang: "TypeScript",
      code: `// Assert file type validation error
await page.getByTestId('fu-type-input').setInputFiles({
  name: 'document.pdf',
  mimeType: 'application/pdf',
  buffer: Buffer.from('fake-content'),
});
await expect(page.getByTestId('fu-type-error')).toBeVisible();
await expect(page.getByTestId('fu-type-error')).toContainText('image');

// Assert size error (no testid — scope from parent)
const panel = page.getByTestId('fu-size-panel');
await expect(panel.locator('.error-msg')).toBeVisible();
await expect(panel.locator('.error-msg')).toContainText('2 MB');

// XPath for error without testid
// //*[@data-testid="fu-size-panel"]//p[contains(@class,"error-msg")]`,
    },
    sel: {
      lang: "Java",
      code: `// Assert type error is visible
WebElement typeError = driver.findElement(
    By.cssSelector("[data-testid='fu-type-error']")
);
assertTrue(typeError.isDisplayed());
assertTrue(typeError.getText().contains("image"));

// Assert size error (no testid — XPath)
WebElement sizeError = driver.findElement(
    By.xpath("//*[@data-testid='fu-size-panel']//p[contains(@class,'error-msg')]")
);
assertTrue(sizeError.isDisplayed());
assertTrue(sizeError.getText().contains("2 MB"));`,
    },
    cy: {
      lang: "JavaScript",
      code: `// Assert type restriction error
cy.get('[data-testid="fu-type-error"]')
  .should('be.visible')
  .and('contain.text', 'image');

// Assert size error via parent scope (no testid on error)
cy.get('[data-testid="fu-size-panel"]')
  .find('.error-msg')
  .should('be.visible')
  .and('contain.text', '2 MB');

// Assert accept attribute
cy.get('[data-testid="fu-type-input"]')
  .should('have.attr', 'accept', 'image/*');`,
    },
  },
};

export const fileUploadMethodRows: MethodRow[] = [
  {
    action: "Upload single file",
    selenium: "element.sendKeys('/abs/path')",
    playwrightJs: "setInputFiles('path')",
    playwrightPy: "set_input_files('path')",
    cypress: ".selectFile('fixtures/f')",
  },
  {
    action: "Upload multiple files",
    selenium: "sendKeys('a\\nb') or loop",
    playwrightJs: "setInputFiles(['a','b'])",
    playwrightPy: "set_input_files(['a','b'])",
    cypress: ".selectFile(['a','b'])",
  },
  {
    action: "Clear file selection",
    selenium: "JS: input.value=''",
    playwrightJs: "setInputFiles([])",
    playwrightPy: "set_input_files([])",
    cypress: ".invoke('val','')",
  },
  {
    action: "Hidden input",
    selenium: "JS removeStyle + sendKeys",
    playwrightJs: "setInputFiles() (works hidden)",
    playwrightPy: "set_input_files() (works hidden)",
    cypress: ".selectFile(…, { force: true })",
  },
  {
    action: "Drag-and-drop zone",
    selenium: "JS DataTransfer dispatch",
    playwrightJs: "dispatchEvent('drop', dt)",
    playwrightPy: "dispatch_event('drop', dt)",
    cypress: ".selectFile(…, { action: 'drag-drop' })",
  },
];

export const fileUploadFaq: FaqItem[] = [
  {
    question:
      "Why doesn't clicking the file input open an OS dialog in Playwright?",
    answer:
      "Playwright's setInputFiles injects the file directly into the input's FileList without triggering the native OS dialog. This is intentional — OS dialogs cannot be automated reliably in CI environments. Never use click() on a file input; always use setInputFiles instead.",
    testId: "faq-1",
  },
  {
    question:
      "How do I upload a file to a drag-and-drop zone that has no visible input?",
    answer:
      "Most drag-and-drop zones have a hidden <input type='file'> inside them that collects the file from the drop event. Locate it with: page.locator('[data-testid=\"fu-drop-zone\"] input[type=\"file\"]') and use setInputFiles. If no hidden input exists, dispatch a drop event with a DataTransfer object containing a File.",
    testId: "faq-2",
  },
  {
    question:
      "How do I automate a custom upload button that hides the real file input?",
    answer:
      "Do not click the styled button. Locate the hidden <input type='file'> inside the same container and call setInputFiles on it directly. Playwright's setInputFiles works even when the input is not visible. In Selenium, use JavascriptExecutor to remove the display:none style before calling sendKeys.",
    testId: "faq-3",
  },
  {
    question:
      "How do I assert a file size or type validation error that has no data-testid?",
    answer:
      "Scope your locator to the parent container that does have a data-testid, then find the error element inside it by class, role, or text: page.getByTestId('fu-size-panel').locator('.error-msg'). In XPath: //*[@data-testid='fu-size-panel']//p[contains(@class,'error-msg')]. Never rely on positional selectors like nth-child for error messages.",
    testId: "faq-4",
  },
];
