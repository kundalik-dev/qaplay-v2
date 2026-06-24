import type { FaqItem, LearnCodeSnippet, MethodRow, TocItem } from "@/data/practice-data/types";

export const modalsTocItems: TocItem[] = [
  { id: "learn-overview", label: "Overview" },
  { id: "learn-locating", label: "1 · Locating Modals" },
  { id: "learn-interacting", label: "2 · Interacting Inside Modals" },
  { id: "learn-methods",  label: "Method Summary", dividerBefore: true },
  { id: "learn-faq",      label: "FAQ" },
];

export const modalsLearnDesc: Record<string, string> = {
  overview: "Modal windows (or dialogs) overlay the main content, demanding user attention. Automating them requires locating the newly active DOM elements, often relying on ARIA roles or specific container classes.",
  locating: "Modern frameworks handle modals well, but you should explicitly wait for or locate the modal container to ensure it has fully rendered before interacting with its contents.",
  interacting: "Once the modal is visible, scope your locators to the modal container to prevent accidentally interacting with elements in the background page.",
};

export const modalsLearnCode: Record<string, LearnCodeSnippet> = {
  locating: {
    pw:  { lang: "TypeScript",  code: `const modal = page.getByRole('dialog');\nawait expect(modal).toBeVisible();` },
    sel: { lang: "Java",        code: `WebElement modal = wait.until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector(".modal-container")));` },
    cy:  { lang: "JavaScript",  code: `cy.get('.modal-container').should('be.visible');` },
  },
  interacting: {
    pw:  { lang: "TypeScript",  code: `await modal.getByRole('button', { name: 'Confirm' }).click();\nawait expect(modal).toBeHidden();` },
    sel: { lang: "Java",        code: `modal.findElement(By.xpath(".//button[text()='Confirm']")).click();\nwait.until(ExpectedConditions.invisibilityOf(modal));` },
    cy:  { lang: "JavaScript",  code: `cy.get('.modal-container').find('button').contains('Confirm').click();\ncy.get('.modal-container').should('not.exist');` },
  },
};

export const modalsMethodRows: MethodRow[] = [
  {
    action:       "Locate Modal",
    selenium:     "driver.findElement()",
    playwrightJs: "page.getByRole('dialog')",
    playwrightPy: "page.get_by_role('dialog')",
    cypress:      "cy.get('.modal')",
  },
  {
    action:       "Scope Element",
    selenium:     "modal.findElement()",
    playwrightJs: "modal.getByRole()",
    playwrightPy: "modal.get_by_role()",
    cypress:      "cy.get('.modal').find()",
  },
];

export const modalsFaq: FaqItem[] = [
  {
    question: "Do I need to switch to a modal like I do with iframes?",
    answer:   "No. DOM-based modals (divs/dialogs) exist in the same document context. You do not need to switch frames, just ensure your locators target the visible modal.",
    testId:   "faq-1",
  },
  {
    question: "Why did my click hit the background instead of the modal?",
    answer:   "If the modal has an animation, it might not be ready. Wait for the modal to become visible and stable before interacting.",
    testId:   "faq-2",
  },
];
