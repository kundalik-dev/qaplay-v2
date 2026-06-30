import { DocSection, LearnCodeBlock } from "@/components/practice";
import type { HighlightedLearnCodeSnippet } from "@/data/practice-data/types";
import type { LearnSection } from "@/data/new-practice/types";

import styles from "./learn-view.module.css";

interface LearnViewProps {
  sections: LearnSection[];
  /**
   * Server-side highlighted snippets, keyed by section id.
   * Built in the page (a Server Component) via highlightLearnSnippet().
   */
  highlighted?: Record<string, HighlightedLearnCodeSnippet>;
  /** Extra className forwarded to each DocSection (e.g. to strip card styling). */
  sectionClassName?: string;
}

/**
 * Reusable Learn tab content — renders each section as a DocSection card with
 * the shared LearnCodeBlock (framework tabs + Copy + syntax highlighting),
 * matching the look of the original /practice learn pages.
 */
export function LearnView({ sections, highlighted, sectionClassName }: LearnViewProps) {
  return (
    <div className={styles.learn} data-testid="learn-view">
      {sections.map((section) => {
        const snippet = highlighted?.[section.id];
        const hasBody = Boolean(section.body);
        const hasBullets = Boolean(section.bullets?.length);
        const hasChildren = hasBody || hasBullets || Boolean(snippet);

        return (
          <DocSection
            key={section.id}
            id={section.id}
            heading={section.heading}
            desc={section.desc}
            className={sectionClassName}
          >
            {hasChildren ? (
              <>
                {hasBody && (
                  <p
                    className={styles.body}
                    dangerouslySetInnerHTML={{ __html: section.body! }}
                  />
                )}

                {hasBullets && (
                  <ul className={styles.list}>
                    {section.bullets!.map((item, idx) => (
                      <li
                        key={idx}
                        className={styles.listItem}
                        dangerouslySetInnerHTML={{ __html: item }}
                      />
                    ))}
                  </ul>
                )}

                {snippet && <LearnCodeBlock snippets={snippet} />}
              </>
            ) : undefined}
          </DocSection>
        );
      })}
    </div>
  );
}
