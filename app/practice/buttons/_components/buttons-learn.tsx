import {
  DocSection,
  LearnProse,
  InlineCode,
  FrameworkCodeBlock,
  MethodSummaryTable,
  FaqBlock,
} from "@/components/practice";
import {
  buttonsLearnCode,
  buttonsMethodRows,
  buttonsFaq,
} from "@/data/practice-data/buttons";

/**
 * Learn-tab content for the Buttons page.
 * Server component — composes anchor-linked DocSections (ids match the TOC),
 * per-technique code blocks, the method summary table, and the FAQ.
 */
export function ButtonsLearn() {
  return (
    <>
      <DocSection id="learn-overview" heading="Overview" sectionNum="→">
        <LearnProse>
          Buttons are the most common interactive control you will automate.
          Across Selenium, Playwright, and Cypress the core verbs are the same —
          click, double-click, right-click, and assert state — but the APIs and
          waiting behaviour differ. The scenarios on the Practice tab let you
          target each interaction with a stable{" "}
          <InlineCode>data-testid</InlineCode>, while the sections below show the
          exact code for every framework.
        </LearnProse>
      </DocSection>

      <DocSection id="learn-single" heading="Single Click" sectionNum="1">
        <LearnProse>
          The fundamental interaction. Locate the element and call{" "}
          <InlineCode>click()</InlineCode>, then assert the resulting state
          change rather than the click itself.
        </LearnProse>
        <FrameworkCodeBlock snippets={buttonsLearnCode.singleClick} />
      </DocSection>

      <DocSection id="learn-double" heading="Double Click" sectionNum="2">
        <LearnProse>
          A plain click cannot express a double click. Use the dedicated
          double-click verb — Selenium needs the{" "}
          <InlineCode>Actions</InlineCode> API.
        </LearnProse>
        <FrameworkCodeBlock snippets={buttonsLearnCode.doubleClick} />
      </DocSection>

      <DocSection id="learn-right" heading="Right Click (Context Menu)" sectionNum="3">
        <LearnProse>
          Right-click fires the context menu. If your app renders a custom menu,
          assert it becomes visible after the action.
        </LearnProse>
        <FrameworkCodeBlock snippets={buttonsLearnCode.rightClick} />
      </DocSection>

      <DocSection id="learn-disabled" heading="Disabled Button" sectionNum="4">
        <LearnProse>
          Assert the disabled state instead of clicking. Playwright throws after
          the actionability timeout if you click a disabled button, so guard
          with <InlineCode>toBeDisabled()</InlineCode> first.
        </LearnProse>
        <FrameworkCodeBlock snippets={buttonsLearnCode.disabled} />
      </DocSection>

      <DocSection id="learn-text" heading="Text Change After Click" sectionNum="5">
        <LearnProse>
          Toggle buttons change their label on click. Capture the text before,
          click, then assert the text differs afterwards.
        </LearnProse>
        <FrameworkCodeBlock snippets={buttonsLearnCode.textChange} />
      </DocSection>

      <DocSection id="learn-keyboard" heading="Keyboard Activation (Enter)" sectionNum="6">
        <LearnProse>
          Accessible buttons activate on <InlineCode>Enter</InlineCode>. Keyboard
          activation is also handy when a click is intercepted by an overlay.
        </LearnProse>
        <FrameworkCodeBlock snippets={buttonsLearnCode.keyboard} />
      </DocSection>

      <DocSection id="learn-methods" heading="Key Methods Summary">
        <MethodSummaryTable rows={buttonsMethodRows} />
      </DocSection>

      <DocSection id="learn-faq" heading="FAQ">
        <FaqBlock items={buttonsFaq} />
      </DocSection>
    </>
  );
}
