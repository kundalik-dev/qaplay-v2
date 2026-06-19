import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  id?: string;
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({
  id,
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "space-y-4",
        align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl",
        className,
      )}
    >
      <p className="capture-kicker">{eyebrow}</p>
      <h2 id={id} className="capture-title text-balance">
        {title}
      </h2>
      {description ? (
        <p className="capture-copy text-pretty">{description}</p>
      ) : null}
    </div>
  );
}
