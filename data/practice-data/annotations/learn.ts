import type {
  FaqItem,
  LearnCodeSnippet,
  MethodRow,
  TocItem,
} from "@/data/practice-data/types";

export const annotationsTocItems: TocItem[] = [
  { id: "learn-overview", label: "Overview" },
  { id: "learn-skip", label: "1 · test.skip()" },
  { id: "learn-slow", label: "2 · test.slow()" },
  { id: "learn-fixme-fail", label: "3 · test.fixme() & test.fail()" },
  { id: "learn-step", label: "4 · test.step()" },
  { id: "learn-each", label: "5 · test.each() / @DataProvider" },
  { id: "learn-methods", label: "Method Summary", dividerBefore: true },
  { id: "learn-faq", label: "FAQ" },
];

export const annotationsLearnDesc: Record<string, string> = {
  overview:
    "Playwright annotations let you control test execution, timeout behaviour, and reporting without restructuring your test suite. Understanding when to use skip vs fixme vs fail is a common interview topic — and the difference has real impact on how bugs show up in CI reports.",
  skip: "Use test.skip() when a test is intentionally not applicable in the current context — e.g., a feature flag is OFF or you are running against an environment that doesn't support the feature. Always provide a reason so the CI report is readable. For known bugs, prefer test.fixme() over test.skip() so the broken test stays visible in reports.",
  slow: "test.slow() triples the default Playwright timeout for a single test without hardcoding a number. Call it at the very top of the test before any action. It is designed for tests involving report generation, file exports, or heavy API calls that legitimately take longer than the default 30 seconds.",
  fixmeFail:
    "test.fixme() marks a test as a known broken item — the test is skipped but appears clearly in the HTML report with a 'fixme' badge, so the team can track unresolved bugs. test.fail() is different: the test runs, and it 'passes' only if the assertion fails. Use test.fail() to confirm a bug still exists — if someone fixes it, test.fail() will start failing, signalling you to remove the annotation.",
  step: "test.step() wraps a group of actions under a named label. The label appears in the Playwright HTML report and trace viewer, making failures instantly locatable: 'Failed in step: Fill shipping form' beats 'Error at line 47'. Each step can also be independently retried with the step retry plugin.",
  each: "test.each() (or a for-loop over an array) runs the same test body for every row in a data set. In Playwright, the idiomatic pattern is a for-of loop: for (const user of users) { test(user.role, async ({ page }) => { … }) }. TestNG uses @DataProvider returning Object[][] with @Test(dataProvider='name').",
};

export const annotationsLearnCode: Record<string, LearnCodeSnippet> = {
  snippet1: {
    pw: {
      lang: "TypeScript",
      code: `// Playwright — test.skip() based on feature flag
test('Beta panel is visible when flag is ON', async ({ page }) => {
  await page.goto('/practice/annotations');

  const toggle = page.locator('[data-testid="toggle-beta-ui"]');
  const isBetaOn = await toggle.getAttribute('aria-checked') === 'true';

  // Skip if Beta UI is disabled in this environment
  test.skip(!isBetaOn, 'Beta UI flag is OFF — skipping beta-only test');

  // Only reaches here when flag is ON
  await expect(page.locator('[data-testid="beta-panel"]')).toBeVisible();
  await expect(page.locator('[data-testid="beta-panel"]')).toContainText('Beta Feature Visible');
  await expect(page.locator('[data-testid="btn-beta-action"]')).toBeEnabled();
});`,
    },
    sel: {
      lang: "Java",
      code: `// Selenium / TestNG — SkipException for feature flag
@Test
public void testBetaPanel() {
    driver.findElement(By.cssSelector("[data-testid='toggle-beta-ui']")).click();

    String checked = driver.findElement(
        By.cssSelector("[data-testid='toggle-beta-ui']")
    ).getAttribute("aria-checked");

    if (!"true".equals(checked)) {
        throw new SkipException("Beta UI flag is OFF — skipping beta test");
    }

    WebElement panel = driver.findElement(
        By.cssSelector("[data-testid='beta-panel']"));
    Assert.assertTrue(panel.isDisplayed());
    Assert.assertTrue(panel.getText().contains("Beta Feature Visible"));
}`,
    },
    cy: {
      lang: "JavaScript",
      code: `// Cypress — skip when beta flag is OFF
it('Beta panel visible when flag is ON', () => {
  cy.visit('/practice/annotations');

  cy.get('[data-testid="toggle-beta-ui"]')
    .invoke('attr', 'aria-checked')
    .then((checked) => {
      if (checked !== 'true') {
        // Cypress has no built-in skip; use this.skip() inside a function context
        return;
      }
      cy.get('[data-testid="beta-panel"]').should('be.visible');
      cy.get('[data-testid="beta-panel"]').should('contain.text', 'Beta Feature Visible');
    });
});`,
    },
  },
  snippet2: {
    pw: {
      lang: "TypeScript",
      code: `// Playwright — test.slow() + test.fixme() + test.fail()

// ── test.slow(): triple timeout for slow async ops ──────────────
test('Report generation completes', async ({ page }) => {
  test.slow(); // 30s → 90s — call FIRST before any action

  await page.goto('/practice/annotations');
  await page.click('[data-testid="btn-gen-report"]');

  // Assert loading state
  await expect(page.locator('[data-testid="loading-indicator"]'))
    .toHaveAttribute('aria-busy', 'true');

  // Web-first: waits until visible automatically (up to 90s)
  await expect(page.locator('[data-testid="report-result"]')).toBeVisible();
  await expect(page.locator('#report-tbody tr')).toHaveCount(4);
  await expect(page.locator('[data-testid="slow-status"]')).toContainText('done');
});

// ── test.fixme(): skip + flag in report ─────────────────────────
test('Counter increments by 1 @fixme', async ({ page }) => {
  test.fixme(true, 'BUG-101: counter adds 2 per click instead of 1');

  // Body won't run — but BUG-101 is visible in the HTML report
  const counter = page.locator('[data-testid="buggy-counter"]');
  for (let i = 0; i < 3; i++) await page.click('[data-testid="btn-buggy-inc"]');
  await expect(counter).toHaveText('3'); // would fail (actual: "6")
});

// ── test.fail(): confirms bug still exists ───────────────────────
test('BUG-101 regression check', async ({ page }) => {
  test.fail(); // EXPECT this to fail — inverts the result

  const counter = page.locator('[data-testid="buggy-counter"]');
  for (let i = 0; i < 3; i++) await page.click('[data-testid="btn-buggy-inc"]');
  await expect(counter).toHaveText('3'); // fails (actual: "6") → test.fail() makes this PASS
  // If bug is fixed, this assertion passes → test.fail() makes the WHOLE test fail → remove the annotation
});`,
    },
    sel: {
      lang: "Java",
      code: `// Selenium / TestNG — timeout + @Test(enabled=false)

// ── Explicit timeout for slow ops ───────────────────────────────
@Test(timeOut = 15000) // 15 seconds
public void testReportGeneration() {
    driver.findElement(By.cssSelector("[data-testid='btn-gen-report']")).click();

    // Wait for aria-busy="true"
    new WebDriverWait(driver, Duration.ofSeconds(2)).until(d ->
        d.findElement(By.cssSelector("[data-testid='loading-indicator']"))
         .getAttribute("aria-busy").equals("true"));

    // Wait for table to appear
    WebElement table = new WebDriverWait(driver, Duration.ofSeconds(10))
        .until(ExpectedConditions.visibilityOfElementLocated(
            By.cssSelector("[data-testid='report-table']")));

    List<WebElement> rows = driver.findElements(By.cssSelector("#report-tbody tr"));
    Assert.assertEquals(rows.size(), 4);
}

// ── @Test(enabled=false) — equivalent to test.fixme ─────────────
@Test(enabled = false, description = "BUG-101: counter adds 2 per click")
public void testCounterIncrement() {
    // Won't run — visible in TestNG report as skipped
}

// ── Expected exception — similar to test.fail ───────────────────
@Test(expectedExceptions = AssertionError.class)
public void testBugStillExists() {
    // Confirms the assertion failure is expected (bug still present)
    WebElement counter = driver.findElement(By.id("buggy-counter"));
    for (int i = 0; i < 3; i++)
        driver.findElement(By.id("btn-inc")).click();
    Assert.assertEquals(counter.getText(), "3"); // fails (actual "6") — expected
}`,
    },
    cy: {
      lang: "JavaScript",
      code: `// Cypress — slow timeout + known bugs

// ── Increase timeout for slow ops ───────────────────────────────
it('Report generation completes', { timeout: 90000 }, () => {
  cy.visit('/practice/annotations');
  cy.get('[data-testid="btn-gen-report"]').click();

  cy.get('[data-testid="loading-indicator"]')
    .should('have.attr', 'aria-busy', 'true');

  // Cypress waits up to the configured timeout
  cy.get('[data-testid="report-result"]').should('be.visible');
  cy.get('#report-tbody tr').should('have.length', 4);
});

// ── Mark test as fixme (skip) ────────────────────────────────────
it.skip('BUG-101: counter increments correctly', () => {
  // Skipped — equivalent to Playwright test.fixme()
  cy.get('[data-testid="btn-buggy-inc"]').click().click().click();
  cy.get('[data-testid="buggy-counter"]').should('have.text', '3');
});`,
    },
  },
};

export const annotationsMethodRows: MethodRow[] = [
  {
    action: "Skip unconditionally",
    selenium: "@Test(enabled=false)",
    playwrightJs: "test.skip()",
    playwrightPy: "test.skip()",
    cypress: "it.skip()",
  },
  {
    action: "Skip conditionally",
    selenium: "throw new SkipException()",
    playwrightJs: "test.skip(condition, 'reason')",
    playwrightPy: "test.skip(condition, 'reason')",
    cypress: "this.skip() / cy.skip()",
  },
  {
    action: "Known bug (tracked in report)",
    selenium: "@Test(enabled=false) + comment",
    playwrightJs: "test.fixme('BUG-ID')",
    playwrightPy: "test.fixme('BUG-ID')",
    cypress: "it.skip('BUG-ID')",
  },
  {
    action: "Expected to fail (confirms bug)",
    selenium: "@Test(expectedExceptions=...)",
    playwrightJs: "test.fail()",
    playwrightPy: "test.fail()",
    cypress: "No direct equivalent",
  },
  {
    action: "Triple timeout (slow op)",
    selenium: "@Test(timeOut=90000)",
    playwrightJs: "test.slow()",
    playwrightPy: "test.slow()",
    cypress: "{ timeout: 90000 }",
  },
  {
    action: "Named step in report",
    selenium: "@Step (Allure)",
    playwrightJs: "await test.step('name', fn)",
    playwrightPy: "async with test.step('name'):",
    cypress: "cy.log() / step plugin",
  },
  {
    action: "Data-driven (parameterized)",
    selenium: "@DataProvider + @Test(dataProvider=)",
    playwrightJs: "for (const d of data) test(d.name, fn)",
    playwrightPy: "@pytest.mark.parametrize",
    cypress: "data.forEach(d => it(d.name, fn))",
  },
  {
    action: "Run by tag",
    selenium: "@Test(groups={'smoke'})",
    playwrightJs: "--grep @smoke",
    playwrightPy: "-k smoke",
    cypress: "--env grepTags=@smoke",
  },
];

export const annotationsFaq: FaqItem[] = [
  {
    question: "What is the difference between test.skip() and test.fixme()?",
    answer:
      "test.skip() silently skips the test — nothing memorable appears in the report. test.fixme() also skips, but marks the test with a visible 'fixme' badge in the HTML report so the team can track unresolved bugs. Always use test.fixme() for bugs, not test.skip(), so broken tests stay visible.",
    testId: "faq-skip-vs-fixme",
  },
  {
    question: "When should I use test.slow()?",
    answer:
      "Call test.slow() at the top of any test that involves operations taking longer than the default 30-second timeout: report generation, file exports, heavy API calls. It triples the timeout to 90 seconds without hardcoding a number. There is no condition — just call it unconditionally.",
    testId: "faq-test-slow",
  },
  {
    question:
      "What does test.fail() do — isn't that the same as a failing test?",
    answer:
      "test.fail() inverts the result. The test 'passes' only if the assertion inside fails. Use it to confirm a known bug still exists. If someone fixes the bug and the assertion starts passing, test.fail() will make the whole test fail — signalling you to remove the annotation.",
    testId: "faq-test-fail",
  },
  {
    question: "How does test.step() help debugging?",
    answer:
      "The Playwright trace viewer and HTML report show each step as a named block. Instead of 'failure at line 47', you see 'Failed in step: Fill shipping form'. That context cuts debugging time significantly on multi-action tests.",
    testId: "faq-test-step",
  },
  {
    question:
      "What is @DataProvider in TestNG and what is the equivalent in Playwright?",
    answer:
      "@DataProvider returns a 2D Object[][] array; @Test(dataProvider='name') runs once per row. In Playwright the idiomatic equivalent is a for-of loop: for (const user of users) { test(user.role, async ({ page }) => { … }) }. You can also use test.describe.parallel() with an array to run them concurrently.",
    testId: "faq-data-provider",
  },
];
