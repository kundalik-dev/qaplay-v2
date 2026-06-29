import type { LearnSection } from "@/data/new-practice/types";

import styles from "./learn-view.module.css";

interface LearnViewProps {
  sections: LearnSection[];
}

/**
 * Reusable Learn tab content — renders structured LearnSection data.
 * Every element page gets the same typography and code-block styling for free.
 */
export function LearnView({ sections }: LearnViewProps) {
  return (
    <div className={styles.learn} data-testid="learn-view">
      {sections.map((section) => (
        <section
          key={section.id}
          id={section.id}
          className={styles.section}
          data-testid={`learn-section-${section.id}`}
        >
          <h2 className={styles.heading}>{section.heading}</h2>

          {section.body && (
            <p
              className={styles.body}
              dangerouslySetInnerHTML={{ __html: section.body }}
            />
          )}

          {section.bullets && section.bullets.length > 0 && (
            <ul className={styles.list}>
              {section.bullets.map((item, idx) => (
                <li
                  key={idx}
                  className={styles.listItem}
                  dangerouslySetInnerHTML={{ __html: item }}
                />
              ))}
            </ul>
          )}

          {section.code?.map((block, idx) => (
            <figure key={idx} className={styles.codeBlock}>
              {block.label && (
                <figcaption className={styles.codeLabel}>
                  {block.label}
                </figcaption>
              )}
              <pre className={styles.pre} data-lang={block.lang}>
                <code>{block.code}</code>
              </pre>
            </figure>
          ))}
        </section>
      ))}
    </div>
  );
}
