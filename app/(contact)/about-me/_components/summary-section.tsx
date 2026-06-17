import { summaryParagraphs } from "./about-me-data";

export function SummarySection() {
  return (
    <section
      data-testid="about-me-summary"
      data-section="summary"
      className="mt-4"
    >
      <h2 className="text-2xl font-semibold">Summary</h2>
      <hr />
      {summaryParagraphs.map((paragraph, index) => (
        <p key={index} className="mt-4 text-base text-muted-foreground">
          {paragraph}
        </p>
      ))}
    </section>
  );
}
