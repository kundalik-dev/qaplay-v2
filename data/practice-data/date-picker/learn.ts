import type {
  FaqItem,
  LearnCodeSnippet,
  MethodRow,
  TocItem,
} from "@/data/practice-data/types";

export const datePickerTocItems: TocItem[] = [
  { id: "learn-overview", label: "Overview" },
  { id: "learn-native", label: "1 · Native Date Input" },
  { id: "learn-calendar", label: "2 · Calendar Widget" },
  { id: "learn-range", label: "3 · Date Range" },
  { id: "learn-constraints", label: "4 · Min / Max Constraints" },
  { id: "learn-methods", label: "Method Summary", dividerBefore: true },
  { id: "learn-faq", label: "FAQ" },
];

export const datePickerLearnDesc: Record<string, string> = {
  overview:
    'Date pickers come in two forms: a plain HTML <input type="date"> and a custom calendar widget built with divs or dialog. The automation strategy differs significantly between the two — always inspect the DOM first to identify which type you are working with.',
  native:
    "Native date inputs accept ISO-format strings (YYYY-MM-DD) directly via fill() or sendKeys(). They expose min, max, and value attributes that are easy to assert. Avoid using keyboard arrow keys to navigate — just set the value string directly.",
  calendar:
    "Custom calendar widgets require click-based interaction: open the picker, navigate months with next/previous buttons, then click the target day cell. Scope all selectors inside the open calendar container to avoid matching hidden instances.",
  range:
    "Date range pickers expose two inputs — start and end. Fill them in order; some implementations reset the end date if you set it before the start. Assert the visual summary element after both inputs are filled.",
  constraints:
    "Constrained inputs have min and max attributes that browsers enforce natively. Test the boundary: a date one day before min and one day after max should produce an invalid state. Use checkValidity() or assert aria-invalid.",
};

export const datePickerLearnCode: Record<string, LearnCodeSnippet> = {
  native: {
    pw: {
      lang: "TypeScript",
      code: `// Fill a native date input
await page.getByTestId('dp-basic-input').fill('2025-06-15');

// Assert value
const val = await page.getByTestId('dp-basic-input').inputValue();
expect(val).toBe('2025-06-15');

// Clear
await page.getByTestId('dp-basic-input').fill('');`,
    },
    sel: {
      lang: "Java",
      code: `// Fill a native date input
WebElement input = driver.findElement(By.cssSelector("[data-testid='dp-basic-input']"));
input.sendKeys("2025-06-15");

// Assert value
String value = input.getAttribute("value");
Assert.assertEquals("2025-06-15", value);

// Clear and reset
input.clear();`,
    },
    cy: {
      lang: "JavaScript",
      code: `// Fill a native date input
cy.get('[data-testid="dp-basic-input"]').type('2025-06-15');

// Assert value
cy.get('[data-testid="dp-basic-input"]').invoke('val').should('eq', '2025-06-15');

// Clear
cy.get('[data-testid="dp-basic-input"]').clear();`,
    },
  },
  calendar: {
    pw: {
      lang: "TypeScript",
      code: `// Open the calendar
await page.getByTestId('dp-calendar-trigger').click();

// Navigate to next month
await page.getByTestId('dp-next-month').click();

// Select a specific day using data-date attribute
await page.locator('[data-testid="dp-day-btn"][data-date="2025-07-20"]').click();

// Assert selected date
await expect(page.locator('#result-s02')).toContainText('2025-07-20');`,
    },
    sel: {
      lang: "Java",
      code: `// Open the calendar
driver.findElement(By.cssSelector("[data-testid='dp-calendar-trigger']")).click();

// Navigate to next month
driver.findElement(By.cssSelector("[data-testid='dp-next-month']")).click();

// Select a specific day
driver.findElement(By.cssSelector("[data-testid='dp-day-btn'][data-date='2025-07-20']")).click();`,
    },
    cy: {
      lang: "JavaScript",
      code: `// Open the calendar
cy.get('[data-testid="dp-calendar-trigger"]').click();

// Navigate to next month
cy.get('[data-testid="dp-next-month"]').click();

// Select a specific day
cy.get('[data-testid="dp-day-btn"][data-date="2025-07-20"]').click();`,
    },
  },
  range: {
    pw: {
      lang: "TypeScript",
      code: `// Fill date range
await page.getByTestId('dp-range-start').fill('2025-08-01');
await page.getByTestId('dp-range-end').fill('2025-08-15');

// Assert range summary
await expect(page.locator('#result-s04')).toContainText('2025-08-01');
await expect(page.locator('#result-s04')).toContainText('2025-08-15');`,
    },
    sel: {
      lang: "Java",
      code: `driver.findElement(By.cssSelector("[data-testid='dp-range-start']")).sendKeys("2025-08-01");
driver.findElement(By.cssSelector("[data-testid='dp-range-end']")).sendKeys("2025-08-15");`,
    },
    cy: {
      lang: "JavaScript",
      code: `cy.get('[data-testid="dp-range-start"]').type('2025-08-01');
cy.get('[data-testid="dp-range-end"]').type('2025-08-15');`,
    },
  },
  constraints: {
    pw: {
      lang: "TypeScript",
      code: `// Assert min / max attributes
const min = await page.getByTestId('dp-constrained-input').getAttribute('min');
const max = await page.getByTestId('dp-constrained-input').getAttribute('max');
expect(min).toBeTruthy();
expect(max).toBeTruthy();

// Fill out-of-range date and check validity
await page.getByTestId('dp-constrained-input').fill('2020-01-01');
const isValid = await page.getByTestId('dp-constrained-input').evaluate(
  (el: HTMLInputElement) => el.checkValidity()
);
expect(isValid).toBe(false);`,
    },
    sel: {
      lang: "Java",
      code: `WebElement input = driver.findElement(By.cssSelector("[data-testid='dp-constrained-input']"));
String min = input.getAttribute("min");
String max = input.getAttribute("max");
Assert.assertNotNull(min);
Assert.assertNotNull(max);
// Send an out-of-range value
input.sendKeys("2020-01-01");`,
    },
    cy: {
      lang: "JavaScript",
      code: `cy.get('[data-testid="dp-constrained-input"]')
  .invoke('attr', 'min').should('exist');
cy.get('[data-testid="dp-constrained-input"]')
  .invoke('attr', 'max').should('exist');
// Fill out-of-range
cy.get('[data-testid="dp-constrained-input"]').type('2020-01-01')
  .then(($el) => expect($el[0].checkValidity()).to.be.false);`,
    },
  },
};

export const datePickerMethodRows: MethodRow[] = [
  {
    action: "Fill date",
    selenium: 'sendKeys("YYYY-MM-DD")',
    playwrightJs: 'fill("YYYY-MM-DD")',
    playwrightPy: 'fill("YYYY-MM-DD")',
    cypress: '.type("YYYY-MM-DD")',
  },
  {
    action: "Get value",
    selenium: 'getAttribute("value")',
    playwrightJs: "inputValue()",
    playwrightPy: "input_value()",
    cypress: ".invoke('val')",
  },
  {
    action: "Get min",
    selenium: 'getAttribute("min")',
    playwrightJs: 'getAttribute("min")',
    playwrightPy: 'get_attribute("min")',
    cypress: ".invoke('attr', 'min')",
  },
  {
    action: "Get max",
    selenium: 'getAttribute("max")',
    playwrightJs: 'getAttribute("max")',
    playwrightPy: 'get_attribute("max")',
    cypress: ".invoke('attr', 'max')",
  },
  {
    action: "Clear input",
    selenium: "clear()",
    playwrightJs: 'fill("")',
    playwrightPy: 'fill("")',
    cypress: ".clear()",
  },
];

export const datePickerFaq: FaqItem[] = [
  {
    question: "Why doesn't sendKeys() work on some date pickers?",
    answer:
      "Custom calendar widgets render day cells as <div> or <button> elements — they do not accept keyboard input like a real <input>. You must click the trigger to open the calendar, navigate with the prev/next buttons, then click the target day cell.",
    testId: "faq-1",
  },
  {
    question: "What is the correct date format for fill() and sendKeys()?",
    answer:
      'For native <input type="date">, always use the ISO format YYYY-MM-DD regardless of the locale displayed in the browser. Sending a locale-specific string like "15 Jun 2025" will not work.',
    testId: "faq-2",
  },
  {
    question: "How do I select a date in a month that isn't currently shown?",
    answer:
      "Click the next or previous month navigation buttons until the target month is displayed, then click the day cell. Some pickers also have a year/month dropdown — click that and select directly.",
    testId: "faq-3",
  },
  {
    question: "How do I assert a date picker's selected value?",
    answer:
      'For native inputs use inputValue() / getAttribute("value"). For custom widgets, look for a result text element, an aria-label on the trigger button, or an aria-selected attribute on the selected day cell.',
    testId: "faq-4",
  },
];
