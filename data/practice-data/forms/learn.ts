import type {
  FaqItem,
  LearnCodeSnippet,
  MethodRow,
  TocItem,
} from "@/data/practice-data/types";
export const formsTocItems: TocItem[] = [
  { id: "learn-overview", label: "Overview" },
  { id: "learn-fill-text", label: "1 · Fill Text Inputs" },
  { id: "learn-dob", label: "2 · Fill Date of Birth" },
  { id: "learn-radio", label: "3 · Select Radio Button" },
  { id: "learn-country", label: "4 · Select Country" },
  { id: "learn-checkboxes", label: "5 · Check Interests" },
  { id: "learn-password", label: "6 · Fill Password" },
  { id: "learn-terms", label: "7 · Accept Terms & Submit" },
  { id: "learn-errors", label: "8 · Assert Validation Errors" },
  { id: "learn-methods", label: "Method Summary", dividerBefore: true },
  { id: "learn-faq", label: "FAQ" },
];
export const formsLearnDesc: Record<string, string> = {
  overview:
    "Forms combine every element type — text inputs, dropdowns, radio buttons, checkboxes, and passwords. Automating them well means filling all field types correctly, triggering and asserting validation error messages, submitting and verifying the success state, and resetting the form.",
  fillText:
    "Text inputs are the baseline. Use fill() in Playwright (replaces the full value) or sendKeys() in Selenium (appends). Target fields by their id or data-testid.",
  dob: "Date inputs accept ISO strings (YYYY-MM-DD). Always use fill() or sendKeys() directly with the formatted string — avoid clicking calendar pickers where possible.",
  radio:
    "Radio buttons belong to a named group. Check the specific option by its id or data-testid, then assert it is checked. Assert siblings are unchecked to confirm exclusive selection.",
  country:
    "The country field uses a native HTML <select>. Use selectOption() in Playwright or Select.selectByVisibleText() in Selenium. The data-testid on the select element makes it easy to target.",
  checkboxes:
    "Each interest checkbox is independently checkable. Each one has a unique data-testid following the pattern checkbox-interest-{name}. Check multiple in sequence and assert each one.",
  password:
    "Password and confirm password fields share the same fill/sendKeys approach. The mismatch validation runs on submit — fill both fields with different values to trigger the error.",
  terms:
    "The terms checkbox must be checked before submit. Without it, a validation error appears. Use check() / click() to toggle it and assert isChecked() or toBeChecked().",
  errors:
    "Validation errors appear under each field after a failed submit. They carry predictable ids and data-testids so you can assert text content and visibility.",
};
export const formsLearnCode: Record<string, LearnCodeSnippet> = {
  fillText: {
    pw: {
      lang: "TypeScript",
      code: `// Playwright
await page.fill("#firstName", "John");
await page.fill("#lastName", "Doe");
await page.fill("#email", "john@example.com");
await page.fill("#phone", "9876543210");
await page.fill("#city", "Mumbai");`,
    },
    sel: {
      lang: "Java",
      code: `// Selenium WebDriver
driver.findElement(By.id("firstName")).sendKeys("John");
driver.findElement(By.id("lastName")).sendKeys("Doe");
driver.findElement(By.id("email")).sendKeys("john@example.com");
driver.findElement(By.id("phone")).sendKeys("9876543210");
driver.findElement(By.id("city")).sendKeys("Mumbai");`,
    },
    cy: {
      lang: "JavaScript",
      code: `// Cypress
cy.get('#firstName').type('John');
cy.get('#lastName').type('Doe');
cy.get('#email').type('john@example.com');
cy.get('#phone').type('9876543210');
cy.get('#city').type('Mumbai');`,
    },
  },
  dob: {
    pw: {
      lang: "TypeScript",
      code: `// Playwright
await page.fill("#dob", "1995-06-15");`,
    },
    sel: {
      lang: "Java",
      code: `// Selenium WebDriver
driver.findElement(By.id("dob")).sendKeys("1995-06-15");`,
    },
    cy: {
      lang: "JavaScript",
      code: `// Cypress
cy.get('#dob').type('1995-06-15');`,
    },
  },
  radio: {
    pw: {
      lang: "TypeScript",
      code: `// Playwright
await page.getByTestId("radio-gender-male").check();
await expect(page.getByTestId("radio-gender-male")).toBeChecked();`,
    },
    sel: {
      lang: "Java",
      code: `// Selenium WebDriver
driver.findElement(By.id("gender-male")).click();
assertTrue(driver.findElement(By.id("gender-male")).isSelected());`,
    },
    cy: {
      lang: "JavaScript",
      code: `// Cypress
cy.get('[data-testid="radio-gender-male"]').check();
cy.get('[data-testid="radio-gender-male"]').should('be.checked');`,
    },
  },
  country: {
    pw: {
      lang: "TypeScript",
      code: `// Playwright — native select
await page.getByTestId("select-country").selectOption({ label: "India" });
// or by value
await page.getByTestId("select-country").selectOption("IN");`,
    },
    sel: {
      lang: "Java",
      code: `// Selenium WebDriver
Select country = new Select(driver.findElement(By.id("country")));
country.selectByVisibleText("India");
// or by value
country.selectByValue("IN");`,
    },
    cy: {
      lang: "JavaScript",
      code: `// Cypress
cy.get('[data-testid="select-country"]').select('India');`,
    },
  },
  checkboxes: {
    pw: {
      lang: "TypeScript",
      code: `// Playwright
await page.getByTestId("checkbox-interest-selenium").check();
await page.getByTestId("checkbox-interest-playwright").check();
await expect(page.getByTestId("checkbox-interest-selenium")).toBeChecked();`,
    },
    sel: {
      lang: "Java",
      code: `// Selenium WebDriver
driver.findElement(By.id("interest-selenium")).click();
driver.findElement(By.id("interest-playwright")).click();
assertTrue(driver.findElement(By.id("interest-selenium")).isSelected());`,
    },
    cy: {
      lang: "JavaScript",
      code: `// Cypress
cy.get('[data-testid="checkbox-interest-selenium"]').check();
cy.get('[data-testid="checkbox-interest-playwright"]').check();
cy.get('[data-testid="checkbox-interest-selenium"]').should('be.checked');`,
    },
  },
  password: {
    pw: {
      lang: "TypeScript",
      code: `// Playwright
await page.fill("#password", "secret123");
await page.fill("#confirmPassword", "secret123");`,
    },
    sel: {
      lang: "Java",
      code: `// Selenium WebDriver
driver.findElement(By.id("password")).sendKeys("secret123");
driver.findElement(By.id("confirmPassword")).sendKeys("secret123");`,
    },
    cy: {
      lang: "JavaScript",
      code: `// Cypress
cy.get('#password').type('secret123');
cy.get('#confirmPassword').type('secret123');`,
    },
  },
  terms: {
    pw: {
      lang: "TypeScript",
      code: `// Playwright
await page.getByTestId("checkbox-terms").check();
await page.getByTestId("submit-form-btn").click();`,
    },
    sel: {
      lang: "Java",
      code: `// Selenium WebDriver
driver.findElement(By.id("terms")).click();
driver.findElement(By.id("submitFormBtn")).click();`,
    },
    cy: {
      lang: "JavaScript",
      code: `// Cypress
cy.get('[data-testid="checkbox-terms"]').check();
cy.get('[data-testid="submit-form-btn"]').click();`,
    },
  },
  errors: {
    pw: {
      lang: "TypeScript",
      code: `// Playwright — assert validation errors
await page.getByTestId("submit-form-btn").click();
await expect(page.getByTestId("error-first-name")).toBeVisible();
await expect(page.getByTestId("error-email")).toHaveText("Email is required.");
await expect(page.getByTestId("error-gender")).toBeVisible();
// password mismatch
await page.fill("#password", "secret123");
await page.fill("#confirmPassword", "wrong456");
await page.getByTestId("submit-form-btn").click();
await expect(page.getByTestId("error-confirm-password"))
  .toHaveText("Passwords do not match.");
// success state
await page.getByTestId("submit-form-btn").click();
await expect(page.getByTestId("form-success-msg")).toBeVisible();
await expect(page.getByTestId("submitted-name")).toContainText("John");`,
    },
    sel: {
      lang: "Java",
      code: `// Selenium WebDriver — assert validation errors
driver.findElement(By.id("submitFormBtn")).click();
assertTrue(driver.findElement(By.id("firstNameError")).isDisplayed());
assertEquals("Email is required.",
  driver.findElement(By.id("emailError")).getText());
assertTrue(driver.findElement(By.id("genderError")).isDisplayed());
// password mismatch
driver.findElement(By.id("password")).sendKeys("secret123");
driver.findElement(By.id("confirmPassword")).sendKeys("wrong456");
driver.findElement(By.id("submitFormBtn")).click();
assertEquals("Passwords do not match.",
  driver.findElement(By.id("confirmPasswordError")).getText());`,
    },
    cy: {
      lang: "JavaScript",
      code: `// Cypress — assert validation errors
cy.get('[data-testid="submit-form-btn"]').click();
cy.get('[data-testid="error-first-name"]').should('be.visible');
cy.get('[data-testid="error-email"]').should('have.text', 'Email is required.');
cy.get('[data-testid="error-gender"]').should('be.visible');
// password mismatch
cy.get('#password').type('secret123');
cy.get('#confirmPassword').type('wrong456');
cy.get('[data-testid="submit-form-btn"]').click();
cy.get('[data-testid="error-confirm-password"]')
  .should('have.text', 'Passwords do not match.');`,
    },
  },
};
export const formsMethodRows: MethodRow[] = [
  {
    action: "Fill text input",
    selenium: 'sendKeys("text")',
    playwrightJs: 'fill("text")',
    playwrightPy: 'fill("text")',
    cypress: '.type("text")',
  },
  {
    action: "Select dropdown",
    selenium: "selectByVisibleText()",
    playwrightJs: "selectOption({ label: ... })",
    playwrightPy: "select_option(label=...)",
    cypress: ".select('value')",
  },
  {
    action: "Radio button",
    selenium: "click()",
    playwrightJs: "check()",
    playwrightPy: "check()",
    cypress: ".check()",
  },
  {
    action: "Checkbox",
    selenium: "click()",
    playwrightJs: "check() / uncheck()",
    playwrightPy: "check() / uncheck()",
    cypress: ".check() / .uncheck()",
  },
  {
    action: "Submit form",
    selenium: "click() on submit",
    playwrightJs: "click() on submit",
    playwrightPy: "click() on submit",
    cypress: ".click() / .submit()",
  },
  {
    action: "Assert error",
    selenium: "getText() on error el",
    playwrightJs: "toHaveText(...)",
    playwrightPy: "to_have_text(...)",
    cypress: "should('have.text', ...)",
  },
  {
    action: "Assert visible",
    selenium: "isDisplayed()",
    playwrightJs: "toBeVisible()",
    playwrightPy: "to_be_visible()",
    cypress: "should('be.visible')",
  },
];
export const formsFaq: FaqItem[] = [
  {
    question: "How do I fill and submit a form with Selenium WebDriver?",
    answer:
      "Locate each field by id or CSS selector, call sendKeys() to type, click() on checkboxes and radios, use Select.selectByVisibleText() for dropdowns, then click() the submit button. Assert the result with isDisplayed() or getText().",
  },
  {
    question: "How do I test form validation errors in Playwright?",
    answer:
      "Click the submit button without filling required fields, then use toBeVisible() or toHaveText() on each error element. Each error has a predictable data-testid like error-email or error-first-name.",
  },
  {
    question: "How do I locate form inputs by their label text in Playwright?",
    answer:
      "Use page.getByLabel('Label text') — Playwright resolves the matching input automatically using the for/id association or aria-labelledby. This works for text inputs, selects, and checkboxes.",
  },
  {
    question: "How do I handle the country select element in Selenium?",
    answer:
      "Wrap the element in a Select object: new Select(driver.findElement(By.id('country'))). Then call selectByVisibleText('India') or selectByValue('IN').",
  },
  {
    question: "How do I reset or clear a form in automation testing?",
    answer:
      "Click the Reset button and assert that all input values are empty. In Playwright use toHaveValue('') and in Selenium use getAttribute('value') === ''.",
  },
];