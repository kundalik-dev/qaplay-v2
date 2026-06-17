import type { ReactNode } from "react";

interface ProseSectionProps {
  id: string;
  title: string;
  paragraphs: string[];
  children?: ReactNode;
}

export function ProseSection({
  id,
  title,
  paragraphs,
  children,
}: ProseSectionProps) {
  return (
    <section
      id={id}
      data-section={id}
      data-testid={`about-section-${id}`}
      className="mb-10 scroll-mt-24"
    >
      <h2 className="mb-3 text-2xl font-semibold text-foreground">{title}</h2>
      {paragraphs.map((paragraph, index) => (
        <p
          key={index}
          className="mb-3 leading-relaxed text-muted-foreground last:mb-0"
        >
          {paragraph}
        </p>
      ))}
      {children}
    </section>
  );
}
