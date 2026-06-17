import type { CodeSnippets } from "@/data/practice-data/types";

/**
 * Compact multi-technique snippet shown in the sticky code panel on the
 * Practice tab. Targets the stable data-testids rendered by the scenario cards.
 */
export const buttonsCodeSnippets: CodeSnippets = {
  playwright: `// Single click + assert result
await page.getByTestId('btn-navigate-home').click();
await expect(
  page.getByTestId('result-s01')
).toContainText('Home');

// Double click
await page.getByTestId('btn-double-click').dblclick();

// Right click (context menu)
await page.getByTestId('btn-right-click')
  .click({ button: 'right' });

// Assert disabled
await expect(
  page.getByTestId('btn-disabled')
).toBeDisabled();`,

  selenium: `// Single click
WebElement home = driver.findElement(
  By.cssSelector("[data-testid='btn-navigate-home']"));
home.click();

// Double click
WebElement dbl = driver.findElement(
  By.cssSelector("[data-testid='btn-double-click']"));
new Actions(driver).doubleClick(dbl).perform();

// Right click
new Actions(driver).contextClick(
  driver.findElement(
    By.cssSelector("[data-testid='btn-right-click']"))
).perform();

// Assert disabled
assertFalse(driver.findElement(
  By.cssSelector("[data-testid='btn-disabled']")
).isEnabled());`,

  cypress: `// Single click + assert result
cy.get("[data-testid='btn-navigate-home']").click();
cy.get("[data-testid='result-s01']")
  .should('contain', 'Home');

// Double click
cy.get("[data-testid='btn-double-click']").dblclick();

// Right click (context menu)
cy.get("[data-testid='btn-right-click']").rightclick();

// Assert disabled
cy.get("[data-testid='btn-disabled']")
  .should('be.disabled');`,
};
