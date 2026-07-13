/**
 * Section 8 — dialog handling cheat sheet (reference table).
 * Purely static reference content (rich inline <code> markup per cell),
 * so it's kept as plain JSX here rather than a data file — no
 * interactivity, so this stays a Server Component.
 */
export function CheatSheetSection() {
  return (
    <section className="section">
      <h2>8. Dialog Handling Cheat Sheet</h2>
      <table>
        <thead>
          <tr>
            <th>Type</th>
            <th>Is it real DOM?</th>
            <th>How to handle in Playwright</th>
            <th>Key API</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <code>alert()</code>
            </td>
            <td>No (browser-native)</td>
            <td>
              <code>page.on(&apos;dialog&apos;, d =&gt; d.accept())</code>{" "}
              before click
            </td>
            <td>
              <code>dialog.message()</code>, <code>accept()</code>
            </td>
          </tr>
          <tr>
            <td>
              <code>confirm()</code>
            </td>
            <td>No</td>
            <td>
              Register handler, then <code>accept()</code> (OK) or{" "}
              <code>dismiss()</code> (Cancel)
            </td>
            <td>
              <code>accept()</code> / <code>dismiss()</code>
            </td>
          </tr>
          <tr>
            <td>
              <code>prompt()</code>
            </td>
            <td>No</td>
            <td>
              Pass text: <code>d.accept(&apos;value&apos;)</code>
            </td>
            <td>
              <code>defaultValue()</code>, <code>accept(text)</code>
            </td>
          </tr>
          <tr>
            <td>
              <code>beforeunload</code>
            </td>
            <td>No</td>
            <td>
              Check <code>d.type()===&apos;beforeunload&apos;</code>;{" "}
              <code>page.close({"{runBeforeUnload:true}"})</code>
            </td>
            <td>
              <code>dialog.type()</code>
            </td>
          </tr>
          <tr>
            <td>
              HTML <code>&lt;dialog&gt;</code>
            </td>
            <td>Yes</td>
            <td>
              Normal locators; assert visibility &amp; <code>returnValue</code>
            </td>
            <td>
              <code>getByRole(&apos;dialog&apos;)</code>
            </td>
          </tr>
          <tr>
            <td>Custom modal (div)</td>
            <td>Yes</td>
            <td>
              Locate by role/testid; web-first <code>toBeVisible()</code>
            </td>
            <td>
              <code>expect(loc).toBeVisible()</code>
            </td>
          </tr>
          <tr>
            <td>Toast / snackbar</td>
            <td>Yes (transient)</td>
            <td>Assert visible, then hidden; no hard sleeps</td>
            <td>
              <code>toBeVisible()</code> / <code>toBeHidden()</code>
            </td>
          </tr>
        </tbody>
      </table>
      <p className="hint hint-mt-12">
        ⭐ Golden rule: register <code>page.on(&apos;dialog&apos;, …)</code>{" "}
        <strong>before</strong> the action that triggers a native dialog —
        otherwise it auto-dismisses and your handler never runs.
      </p>
    </section>
  );
}
