import type {
  ScenarioMeta,
  FrameworkMethods,
} from "@/data/practice-data/types";

export const dragDropScenarios: ScenarioMeta[] = [
  {
    id: "S01",
    title: "Scenario 1: Drag Item to Drop Zone (Beginner)",
    testId: "scenario-dd-basic",
    resultId: "result-s01",
    initialResult: "Item not dropped yet",
    hint: `Drag <code>[data-testid="dd-item"]</code> onto <code>[data-testid="dd-drop-zone"]</code>. Playwright: <code>page.dragAndDrop('[data-testid="dd-item"]', '[data-testid="dd-drop-zone"]')</code>. Selenium: <code>Actions.dragAndDrop(source, target).perform()</code>.`,
  },
  {
    id: "S02",
    title: "Scenario 2: Drag to Correct Labelled Zone (Medium)",
    testId: "scenario-dd-zones",
    resultId: "result-s02",
    initialResult: "No card dropped",
    hint: `Three cards (<code>data-card-id="card-1/2/3"</code>) and three zones (<code>data-zone-id="zone-a/b/c"</code>). Each card shows which zone it belongs to. Scope: <code>page.locator('[data-testid="dd-zone"][data-zone-id="zone-b"]')</code> as drop target. XPath: <code>//div[@data-zone-id="zone-b"]</code>.`,
  },
  {
    id: "S03",
    title: "Scenario 3: Reorder a Sortable List (Medium)",
    testId: "scenario-dd-sort",
    resultId: "result-s03",
    initialResult: "List not reordered",
    hint: `Items have <code>data-testid="dd-sort-item"</code> and <code>data-item-id="item-1/2/3/4/5"</code>. Drag <code>data-item-id="item-3"</code> to the top. Playwright: <code>dragAndDrop('[data-item-id="item-3"]', '[data-item-id="item-1"]')</code>. XPath: <code>//li[@data-item-id="item-3"]</code>.`,
  },
  {
    id: "S04",
    title: "Scenario 4: Kanban Column Transfer (Hard)",
    testId: "scenario-dd-kanban",
    resultId: "result-s04",
    initialResult: "No task moved",
    hint: `Columns have <code>data-column-id="todo"/"done"</code> but no <code>data-testid</code> on column headings. Tasks inside have <code>data-testid="dd-task"</code> and <code>data-task-id</code>. XPath: <code>//div[@data-column-id="todo"]//div[@data-task-id="task-2"]</code>. Scope the target to <code>//div[@data-column-id="done"]</code>.`,
  },
  {
    id: "S05",
    title: "Scenario 5: Type-Restricted Drop Zones (Hard)",
    testId: "scenario-dd-typed",
    resultId: "result-s05",
    initialResult: "No drop attempted",
    hint: `Items carry <code>data-item-type="shape-circle/shape-square/shape-triangle"</code>. Zones accept only matching types via <code>data-accepts</code>. A rejected drop shows an error message with <strong>no</strong> <code>data-testid</code> — locate it via role or text: <code>page.getByRole('status')</code> or XPath <code>//p[contains(@class,"error")]</code>.`,
    badge: "HARD",
  },
  {
    id: "S06",
    title: "Scenario 6: Multi-Column Board (Challenge)",
    testId: "scenario-dd-board",
    resultId: "result-s06",
    initialResult: "Board untouched",
    hint: `Three columns: Backlog, In Progress, Done. Some cards have <code>data-testid="dd-board-card"</code> and <code>data-card-id</code>; others have only <code>aria-label</code>. Locate un-testid'd cards with: <code>page.getByRole('article', { name: /Fix login bug/ })</code> or XPath <code>//div[@data-column-id="backlog"]//article[contains(@aria-label,"Fix")]</code>. Drop into <code>[data-column-id="done"]</code>.`,
    badge: "CHALLENGE",
  },
];

export const frameworkMethods: Record<
  "selenium" | "playwright" | "cypress",
  FrameworkMethods
> = {
  selenium: {
    label: "Selenium (Java)",
    methods: [
      { color: "purple", label: "Actions.dragAndDrop(src, tgt)" },
      { color: "blue", label: "Actions.clickAndHold(src)" },
      { color: "orange", label: "Actions.moveToElement(tgt)" },
      { color: "emerald", label: "Actions.release().perform()" },
      { color: "slate", label: "JS dragAndDrop() fallback" },
    ],
  },
  playwright: {
    label: "Playwright JS / PY",
    methods: [
      { color: "purple", label: "page.dragAndDrop(src, tgt)" },
      { color: "blue", label: "locator.dragTo(target)" },
      { color: "orange", label: "mouse.move() + down/up" },
      { color: "emerald", label: "dispatchEvent('drop')" },
      { color: "slate", label: "dataTransfer simulation" },
    ],
  },
  cypress: {
    label: "Cypress JS",
    methods: [
      { color: "purple", label: ".trigger('dragstart')" },
      { color: "blue", label: ".trigger('dragover')" },
      { color: "orange", label: ".trigger('drop')" },
      { color: "emerald", label: "cypress-drag-drop plugin" },
      { color: "slate", label: ".drag() (plugin method)" },
    ],
  },
};
