import type { PrivacySection } from "@/data/privacy-policy/privacy-policy-data";

import { RichText } from "./rich-text";

export function LegalSection({ section }: { section: PrivacySection }) {
  return (
    <section
      id={section.id}
      data-section={section.id}
      data-testid={`privacy-section-${section.id}`}
      className="mt-10 scroll-mt-28 first:mt-0"
    >
      <h2 className="mb-3 text-2xl font-semibold text-foreground">
        {section.title}
      </h2>

      {section.blocks.map((block, index) => {
        if (block.type === "subheading") {
          return (
            <h3
              key={index}
              className="mt-5 mb-2 text-lg font-semibold text-foreground"
            >
              {block.text}
            </h3>
          );
        }

        if (block.type === "list") {
          return (
            <ul
              key={index}
              className="mb-4 list-disc space-y-1.5 pl-5 leading-relaxed text-muted-foreground marker:text-muted-foreground/60"
            >
              {block.items.map((item, itemIndex) => (
                <li key={itemIndex}>
                  <RichText value={item} />
                </li>
              ))}
            </ul>
          );
        }

        return (
          <p key={index} className="mb-4 leading-relaxed text-muted-foreground">
            <RichText value={block.content} />
          </p>
        );
      })}
    </section>
  );
}
