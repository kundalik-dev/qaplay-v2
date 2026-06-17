import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { FaqItem } from "@/data/practice-data/types";

interface FaqBlockProps {
  items: FaqItem[];
}

/**
 * Block 13 — FaqBlock
 * Accordion-style FAQ section using shadcn Accordion.
 * Server component — Accordion is server-renderable.
 */
export function FaqBlock({ items }: FaqBlockProps) {
  return (
    <Accordion
      multiple
      className="flex flex-col gap-2"
      data-testid="faq-block"
    >
      {items.map((item, i) => (
        <AccordionItem
          key={i}
          value={`faq-${i + 1}`}
          data-testid={item.testId ?? `faq-${i + 1}`}
          className="border border-border rounded-lg px-4 bg-card"
        >
          <AccordionTrigger
            className="font-sans font-medium text-[0.9rem] text-foreground
                       hover:text-primary hover:no-underline py-4 text-left"
          >
            {item.question}
          </AccordionTrigger>
          <AccordionContent className="text-muted-foreground text-[0.88rem] leading-7 pb-4">
            {/* answers may contain inline <code> or <a> markup */}
            <span dangerouslySetInnerHTML={{ __html: item.answer }} />
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
