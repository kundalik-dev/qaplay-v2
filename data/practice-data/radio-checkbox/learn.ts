import type {
  FaqItem,
  LearnCodeSnippet,
  MethodRow,
  TocItem,
} from "@/data/practice-data/types";

export const radioCheckboxTocItems: TocItem[] = [
  { id: "learn-overview", label: "Overview" },
  { id: "learn-checkbox", label: "1 · Check / Uncheck" },
  { id: "learn-radio", label: "2 · Radio Groups" },
  { id: "learn-assert", label: "3 · Assert State" },
  { id: "learn-disabled", label: "4 · Disabled Controls" },
  { id: "learn-methods", label: "Method Summary", dividerBefore: true },
  { id: "learn-faq", label: "FAQ" },
];

export const radioCheckboxLearnDesc: Record<string, string> = {
  overview:
    "Checkboxes and radio buttons are the most common binary input controls. Checkboxes allow multi-selection; radio buttons enforce single selection within a group. Both expose an `isChecked` / `isSelected` state that automation frameworks can read and assert directly.",
  checkbox:
    "Use check() instead of click() — it is idempotent and only fires if the element is currently unchecked, making tests stable. Use uncheck() to deselect. Avoid asserting by visual appearance; always read the boolean checked state.",
  radio:
    "Radio buttons must be scoped to their group via the parent element or by the shared `name` attribute. Clicking one radio in a group automatically deselects the previously selected one — assert this mutual-exclusion behaviour in your tests.",
  assert:
    "Assert the checked state directly rather than relying on class names or screenshots. All three frameworks expose a first-class boolean assertion for checked state.",
  disabled:
    "Disabled controls must not be interactable. Assert isDisabled() before attempting any action. Some test runners throw on check() against a disabled element; others silently ignore it — always assert the state after.",
};

export const radioCheckboxLearnCode: Record<string, LearnCodeSnippet> = {
  checkbox: {
    pw: {
      lang: "TypeScript",
      code: `// Check
await page.getByTestId('chk-accept-terms').check();

// Uncheck
await page.getByTestId('chk-accept-terms').uncheck();

// Check all in a group
const skills = page.getByTestId('chk-skill');
for (const chk of await skills.all()) {
  await chk.check();
}`,
    },
    sel: {
      lang: "Java",
      code: `// Check (if not already checked)
WebElement chk = driver.findElement(By.cssSelector("[data-testid='chk-accept-terms']"));
if (!chk.isSelected()) chk.click();

// Uncheck
if (chk.isSelected()) chk.click();

// Check all in a group
List<WebElement> skills = driver.findElements(By.cssSelector("[data-testid='chk-skill']"));
for (WebElement skill : skills) {
    if (!skill.isSelected()) skill.click();
}`,
    },
    cy: {
      lang: "JavaScript",
      code: `// Check
cy.get('[data-testid="chk-accept-terms"]').check();

// Uncheck
cy.get('[data-testid="chk-accept-terms"]').uncheck();

// Check all in a group
cy.get('[data-testid="chk-skill"]').check();`,
    },
  },
  radio: {
    pw: {
      lang: "TypeScript",
      code: `// Select a radio by label (scoped to group)
const group = page.getByTestId('radio-plan-group');
await group.getByLabel('Pro').check();

// Assert mutual exclusion
await expect(group.getByLabel('Pro')).toBeChecked();
await expect(group.getByLabel('Starter')).not.toBeChecked();

// Select by value attribute
await page.locator('[name="plan"][value="enterprise"]').check();`,
    },
    sel: {
      lang: "Java",
      code: `// Select radio by value
driver.findElement(By.cssSelector("[name='plan'][value='pro']")).click();

// Assert a radio is selected
boolean isSelected = driver.findElement(
    By.cssSelector("[name='plan'][value='pro']")
).isSelected();
Assert.assertTrue(isSelected);`,
    },
    cy: {
      lang: "JavaScript",
      code: `// Select radio by value
cy.get('[name="plan"]').check('pro');

// Assert
cy.get('[name="plan"][value="pro"]').should('be.checked');
cy.get('[name="plan"][value="starter"]').should('not.be.checked');`,
    },
  },
  assert: {
    pw: {
      lang: "TypeScript",
      code: `// Assert checked
await expect(page.getByTestId('chk-newsletter')).toBeChecked();

// Assert unchecked
await expect(page.getByTestId('chk-accept-terms')).not.toBeChecked();

// Read boolean state
const checked = await page.getByTestId('chk-newsletter').isChecked();
console.log(checked); // true`,
    },
    sel: {
      lang: "Java",
      code: `// Assert checked
Assert.assertTrue(
    driver.findElement(By.cssSelector("[data-testid='chk-newsletter']")).isSelected()
);

// Assert unchecked
Assert.assertFalse(
    driver.findElement(By.cssSelector("[data-testid='chk-accept-terms']")).isSelected()
);`,
    },
    cy: {
      lang: "JavaScript",
      code: `// Assert checked
cy.get('[data-testid="chk-newsletter"]').should('be.checked');

// Assert unchecked
cy.get('[data-testid="chk-accept-terms"]').should('not.be.checked');`,
    },
  },
  disabled: {
    pw: {
      lang: "TypeScript",
      code: `// Assert disabled
await expect(page.getByTestId('chk-disabled')).toBeDisabled();
await expect(page.getByTestId('radio-disabled')).toBeDisabled();

// isDisabled() — boolean read
const disabled = await page.getByTestId('chk-disabled').isDisabled();
expect(disabled).toBe(true);`,
    },
    sel: {
      lang: "Java",
      code: `// Assert disabled
Assert.assertFalse(
    driver.findElement(By.cssSelector("[data-testid='chk-disabled']")).isEnabled()
);`,
    },
    cy: {
      lang: "JavaScript",
      code: `// Assert disabled
cy.get('[data-testid="chk-disabled"]').should('be.disabled');
cy.get('[data-testid="radio-disabled"]').should('be.disabled');`,
    },
  },
};

export const radioCheckboxMethodRows: MethodRow[] = [
  {
    action: "Check",
    selenium: "element.click() (if !isSelected())",
    playwrightJs: "locator.check()",
    playwrightPy: "locator.check()",
    cypress: ".check()",
  },
  {
    action: "Uncheck",
    selenium: "element.click() (if isSelected())",
    playwrightJs: "locator.uncheck()",
    playwrightPy: "locator.uncheck()",
    cypress: ".uncheck()",
  },
  {
    action: "Assert checked",
    selenium: "isSelected()",
    playwrightJs: "expect(locator).toBeChecked()",
    playwrightPy: "expect(locator).to_be_checked()",
    cypress: ".should('be.checked')",
  },
  {
    action: "Assert disabled",
    selenium: "!isEnabled()",
    playwrightJs: "expect(locator).toBeDisabled()",
    playwrightPy: "expect(locator).to_be_disabled()",
    cypress: ".should('be.disabled')",
  },
  {
    action: "Check all in group",
    selenium: "findElements() + loop",
    playwrightJs: "locator.all() + for…of",
    playwrightPy: "locator.all() + for…in",
    cypress: ".check() (on multiple)",
  },
];

export const radioCheckboxFaq: FaqItem[] = [
  {
    question: "Why use check() instead of click() for checkboxes?",
    answer:
      "check() is idempotent — it only fires a click if the element is currently unchecked. This prevents accidentally unchecking an already-checked box, making tests reliable even when the initial state is unknown.",
    testId: "faq-1",
  },
  {
    question: "How do I assert that exactly one radio in a group is selected?",
    answer:
      "Scope to the group container, check the target radio with toBeChecked(), then assert all other radios with not.toBeChecked(). Alternatively, assert the checked radio's value attribute equals the expected value.",
    testId: "faq-2",
  },
  {
    question:
      "What is the difference between isChecked() and isSelected() in Selenium?",
    answer:
      "In Selenium, isSelected() works for both checkboxes and radio buttons. isChecked() is a Playwright-specific method. Both return a boolean true/false for the current checked state.",
    testId: "faq-3",
  },
  {
    question: "How do I locate a checkbox that has no label or data-testid?",
    answer:
      "Use XPath sibling or ancestor traversal from nearby visible text. For example: //span[normalize-space()='Marketing emails']/preceding-sibling::input or //label[.//span[normalize-space()='SMS alerts']]/input[@type='checkbox'].",
    testId: "faq-4",
  },
];
