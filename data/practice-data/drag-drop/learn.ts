import type { FaqItem, LearnCodeSnippet, MethodRow, TocItem } from "@/data/practice-data/types";

export const dragDropTocItems: TocItem[] = [
  { id: "learn-overview",    label: "Overview" },
  { id: "learn-basic",       label: "1 · Basic dragAndDrop" },
  { id: "learn-locator",     label: "2 · locator.dragTo()" },
  { id: "learn-mouse",       label: "3 · Low-level mouse events" },
  { id: "learn-selenium",    label: "4 · Selenium Actions API" },
  { id: "learn-methods",     label: "Method Summary", dividerBefore: true },
  { id: "learn-faq",         label: "FAQ" },
];

export const dragDropLearnDesc: Record<string, string> = {
  overview:
    "Drag-and-drop is one of the harder interactions to automate because it relies on a sequence of pointer events: mousedown, mousemove, mouseup (or the HTML5 drag events: dragstart, dragover, drop). Playwright provides two high-level helpers — page.dragAndDrop() and locator.dragTo() — that handle this sequence reliably. Selenium uses the Actions API with clickAndHold, moveToElement, and release. Cypress does not have a built-in drag helper; most teams use the cypress-drag-drop plugin or trigger the underlying events manually.",
  basic:
    "page.dragAndDrop(source, target) accepts CSS selectors or text selectors and internally moves the mouse with buttons held down. It works for both native HTML5 drag events and pointer-event-based drag libraries. Always wait for the element to be visible before dragging; if it is hidden or off-screen, the drag will silently fail.",
  locator:
    "locator.dragTo(targetLocator) is the locator-chained version of dragAndDrop. It is more composable when you already have a locator reference and want to reuse it in assertions. Use the force option sparingly — it bypasses actionability checks and can hide real problems.",
  mouse:
    "When dragAndDrop or dragTo does not work (custom drag libraries that only listen to pointer events), use the low-level mouse API: mouse.move() to hover the source, mouse.down() to press, mouse.move() to the target position, then mouse.up() to release. You can also dispatch a DataTransfer event via page.dispatchEvent() for libraries that read the drag payload.",
  selenium:
    "Selenium's Actions class chains pointer actions: clickAndHold(source), moveToElement(target), release(). On some browsers or drag libraries the high-level dragAndDrop shortcut skips intermediate mousemove events and fails. In those cases, build the action chain manually with small intermediate move steps or use a JavaScript executor fallback.",
};

export const dragDropLearnCode: Record<string, LearnCodeSnippet> = {
  basic: {
    pw: {
      lang: "TypeScript",
      code: `// High-level drag and drop by CSS selector
await page.dragAndDrop(
  '[data-testid="dd-item"]',
  '[data-testid="dd-drop-zone"]'
);

// With options — source/target position offsets
await page.dragAndDrop(
  '[data-testid="dd-item"]',
  '[data-testid="dd-drop-zone"]',
  { sourcePosition: { x: 10, y: 10 }, targetPosition: { x: 50, y: 50 } }
);

// Assert the result span updated
await expect(page.locator('#result-s01')).toContainText('dropped');`,
    },
    sel: {
      lang: "Java",
      code: `import org.openqa.selenium.interactions.Actions;

WebElement source = driver.findElement(By.cssSelector("[data-testid='dd-item']"));
WebElement target = driver.findElement(By.cssSelector("[data-testid='dd-drop-zone']"));

Actions actions = new Actions(driver);
actions.dragAndDrop(source, target).perform();

// Assert result text
String result = driver.findElement(By.id("result-s01")).getText();
assertTrue(result.contains("dropped"));`,
    },
    cy: {
      lang: "JavaScript",
      code: `// Using the cypress-drag-drop plugin
cy.get('[data-testid="dd-item"]')
  .drag('[data-testid="dd-drop-zone"]');

// Assert result updated
cy.get('#result-s01').should('contain.text', 'dropped');

// Manual event trigger (no plugin)
cy.get('[data-testid="dd-item"]').trigger('dragstart');
cy.get('[data-testid="dd-drop-zone"]').trigger('dragover').trigger('drop');`,
    },
  },
  locator: {
    pw: {
      lang: "TypeScript",
      code: `// locator.dragTo() — composable with existing locator references
const card = page.locator('[data-testid="dd-card"][data-card-id="card-2"]');
const zone  = page.locator('[data-testid="dd-zone"][data-zone-id="zone-b"]');

await card.dragTo(zone);

// Scoped drag: locate card inside a specific column first
const todoCol  = page.locator('[data-column-id="todo"]');
const doneCol  = page.locator('[data-column-id="done"]');
const task     = todoCol.locator('[data-task-id="task-2"]');

await task.dragTo(doneCol);

// Assert task is now in the Done column
await expect(doneCol.locator('[data-task-id="task-2"]')).toBeVisible();`,
    },
    sel: {
      lang: "Java",
      code: `// Scoped locator — find task inside a specific column
WebElement todoCol = driver.findElement(By.cssSelector("[data-column-id='todo']"));
WebElement task    = todoCol.findElement(By.cssSelector("[data-task-id='task-2']"));
WebElement doneCol = driver.findElement(By.cssSelector("[data-column-id='done']"));

Actions actions = new Actions(driver);
actions.dragAndDrop(task, doneCol).perform();

// Verify task moved
List<WebElement> doneTasks = doneCol.findElements(By.cssSelector("[data-task-id='task-2']"));
assertFalse(doneTasks.isEmpty());

// XPath version — ancestor scoping practice
WebElement taskXP = driver.findElement(By.xpath(
    "//div[@data-column-id='todo']//div[@data-task-id='task-2']"
));`,
    },
    cy: {
      lang: "JavaScript",
      code: `// Scoped within a column
cy.get('[data-column-id="todo"]')
  .find('[data-task-id="task-2"]')
  .drag('[data-column-id="done"]');

// Assert task is now in Done column
cy.get('[data-column-id="done"]')
  .find('[data-task-id="task-2"]')
  .should('exist');`,
    },
  },
  mouse: {
    pw: {
      lang: "TypeScript",
      code: `// Low-level mouse API for custom drag libraries
const source = page.locator('[data-item-type="shape-circle"]');
const target = page.locator('[data-accepts="shape-circle"]');

// Get bounding boxes
const srcBox = await source.boundingBox();
const tgtBox = await target.boundingBox();

if (!srcBox || !tgtBox) throw new Error('Element not found');

// Simulate a drag via mouse events
await page.mouse.move(srcBox.x + srcBox.width / 2, srcBox.y + srcBox.height / 2);
await page.mouse.down();
await page.mouse.move(tgtBox.x + tgtBox.width / 2, tgtBox.y + tgtBox.height / 2, { steps: 10 });
await page.mouse.up();

// For HTML5 drag events — dispatchEvent with DataTransfer
const dataTransfer = await page.evaluateHandle(() => new DataTransfer());
await source.dispatchEvent('dragstart', { dataTransfer });
await target.dispatchEvent('dragover',  { dataTransfer });
await target.dispatchEvent('drop',      { dataTransfer });`,
    },
    sel: {
      lang: "Java",
      code: `// Manual action chain with intermediate moves (more reliable for some frameworks)
WebElement source = driver.findElement(By.cssSelector("[data-item-type='shape-circle']"));
WebElement target = driver.findElement(By.cssSelector("[data-accepts='shape-circle']"));

Actions actions = new Actions(driver);
actions
  .clickAndHold(source)
  .moveByOffset(5, 0)    // small nudge to trigger drag recognition
  .moveToElement(target)
  .release()
  .perform();

// JavaScript executor fallback for stubborn drag libraries
JavascriptExecutor js = (JavascriptExecutor) driver;
js.executeScript(
  "function simulateDragDrop(src, tgt) {" +
  "  var e = new DragEvent('dragstart', {bubbles:true, cancelable:true});" +
  "  src.dispatchEvent(e);" +
  "  tgt.dispatchEvent(new DragEvent('dragover', {bubbles:true, cancelable:true}));" +
  "  tgt.dispatchEvent(new DragEvent('drop', {bubbles:true, cancelable:true}));" +
  "} simulateDragDrop(arguments[0], arguments[1]);",
  source, target
);`,
    },
    cy: {
      lang: "JavaScript",
      code: `// Low-level trigger chain for HTML5 drag events
const dataTransfer = new DataTransfer();

cy.get('[data-item-type="shape-circle"]')
  .trigger('dragstart', { dataTransfer });

cy.get('[data-accepts="shape-circle"]')
  .trigger('dragover', { dataTransfer })
  .trigger('drop',     { dataTransfer });

cy.get('[data-item-type="shape-circle"]')
  .trigger('dragend');

// Assert no error shown (rejected drops show an error role)
cy.get('[role="status"]').should('not.exist');`,
    },
  },
  selenium: {
    pw: {
      lang: "TypeScript",
      code: `// Playwright equivalent of Selenium Actions manual chain
// (for when dragAndDrop is not reliable with a specific library)

const src = page.locator('[data-testid="dd-sort-item"][data-item-id="item-3"]');
const tgt = page.locator('[data-testid="dd-sort-item"][data-item-id="item-1"]');

const srcBox = await src.boundingBox();
const tgtBox = await tgt.boundingBox();
if (!srcBox || !tgtBox) return;

await page.mouse.move(srcBox.x + srcBox.width / 2, srcBox.y + srcBox.height / 2);
await page.mouse.down();
// Small nudge to start the drag
await page.mouse.move(srcBox.x + srcBox.width / 2 + 1, srcBox.y + srcBox.height / 2);
await page.mouse.move(tgtBox.x + tgtBox.width / 2, tgtBox.y + tgtBox.height / 2, { steps: 15 });
await page.mouse.up();`,
    },
    sel: {
      lang: "Java",
      code: `// Selenium Actions — step-by-step manual chain for sortable list reorder
WebElement item3 = driver.findElement(By.cssSelector("[data-item-id='item-3']"));
WebElement item1 = driver.findElement(By.cssSelector("[data-item-id='item-1']"));

Actions actions = new Actions(driver);
actions
  .clickAndHold(item3)
  .pause(Duration.ofMillis(300))   // allow drag to register
  .moveToElement(item1)
  .pause(Duration.ofMillis(200))
  .release()
  .perform();

// Assert item-3 is now at position 0 in the list
List<WebElement> items = driver.findElements(By.cssSelector("[data-testid='dd-sort-item']"));
assertEquals("item-3", items.get(0).getAttribute("data-item-id"));`,
    },
    cy: {
      lang: "JavaScript",
      code: `// Reorder sortable list in Cypress using the plugin
cy.get('[data-item-id="item-3"]')
  .drag('[data-item-id="item-1"]', { position: 'top' });

// Assert new order — item-3 should be first
cy.get('[data-testid="dd-sort-item"]').first()
  .should('have.attr', 'data-item-id', 'item-3');

// Without plugin — trigger events
cy.get('[data-item-id="item-3"]').trigger('dragstart');
cy.get('[data-item-id="item-1"]').trigger('dragover').trigger('drop');`,
    },
  },
};

export const dragDropMethodRows: MethodRow[] = [
  {
    action:       "High-level drag and drop",
    selenium:     "Actions.dragAndDrop(src, tgt)",
    playwrightJs: "page.dragAndDrop(src, tgt)",
    playwrightPy: "page.drag_and_drop(src, tgt)",
    cypress:      ".drag(target) (plugin)",
  },
  {
    action:       "Locator-chained drag",
    selenium:     "Actions.dragAndDrop(srcEl, tgtEl)",
    playwrightJs: "locator.dragTo(targetLocator)",
    playwrightPy: "locator.drag_to(target_locator)",
    cypress:      ".drag(selector) (plugin)",
  },
  {
    action:       "Manual mouse press/move",
    selenium:     "clickAndHold → moveToElement → release",
    playwrightJs: "mouse.down() → mouse.move() → mouse.up()",
    playwrightPy: "mouse.down() → mouse.move() → mouse.up()",
    cypress:      "trigger('dragstart') → trigger('drop')",
  },
  {
    action:       "HTML5 event dispatch",
    selenium:     "JS: dispatchEvent(new DragEvent(…))",
    playwrightJs: "dispatchEvent('dragstart', { dataTransfer })",
    playwrightPy: "dispatch_event('dragstart', {'dataTransfer': dt})",
    cypress:      "trigger('dragstart', { dataTransfer })",
  },
  {
    action:       "Bounding box position",
    selenium:     "element.getRect() → offsetX/offsetY",
    playwrightJs: "locator.boundingBox()",
    playwrightPy: "locator.bounding_box()",
    cypress:      ".invoke('offset') / position: 'top'",
  },
];

export const dragDropFaq: FaqItem[] = [
  {
    question: "Why does dragAndDrop work in my test but nothing moves on screen?",
    answer:
      "Many drag-and-drop libraries listen to pointer events (mousedown, mousemove, mouseup) rather than HTML5 drag events (dragstart, drop). Playwright's dragAndDrop fires HTML5 events by default. If nothing moves, try the low-level mouse API: mouse.down(), mouse.move() with steps, then mouse.up(). The steps option adds intermediate mousemove events that trigger most pointer-based libraries.",
    testId: "faq-1",
  },
  {
    question: "How do I locate an element inside a specific drag column without a data-testid?",
    answer:
      "Scope from the column using its data-column-id attribute: page.locator('[data-column-id=\"todo\"]').locator('[data-task-id=\"task-2\"]'). In XPath use ancestor scoping: //div[@data-column-id=\"todo\"]//div[@data-task-id=\"task-2\"]. Never use nth() positional selectors for cross-column assertions — they break when cards move between columns.",
    testId: "faq-2",
  },
  {
    question: "How do I verify the order of items in a sortable list after reordering?",
    answer:
      "After dragging, read all items in document order: const items = await page.locator('[data-testid=\"dd-sort-item\"]').all(); then map over them to collect data-item-id attributes with getAttribute(). Compare the resulting array against your expected order. Alternatively, assert that the first item has the expected data-item-id: expect(items[0]).toHaveAttribute('data-item-id', 'item-3').",
    testId: "faq-3",
  },
  {
    question: "Cypress has no built-in drag support — what is the recommended approach?",
    answer:
      "Install the cypress-drag-drop package and use .drag(target). If you cannot install plugins, trigger HTML5 events manually: create a DataTransfer object in the test, trigger 'dragstart' on the source with that object, then trigger 'dragover' and 'drop' on the target with the same object. Some apps also expose a custom drag attribute you can hook into.",
    testId: "faq-4",
  },
  {
    question: "How do I test that a type-restricted zone correctly rejects an invalid drop?",
    answer:
      "Attempt the invalid drag and then assert the rejection state. If the zone shows an error message, locate it via role ('status', 'alert') or partial text match rather than a fragile CSS class. In Playwright: await expect(page.getByRole('status')).toContainText('wrong type'). In Selenium use XPath contains(): //p[contains(text(),'wrong')]. Assert that the dragged item has not moved into the zone by checking the zone's children.",
    testId: "faq-5",
  },
];
