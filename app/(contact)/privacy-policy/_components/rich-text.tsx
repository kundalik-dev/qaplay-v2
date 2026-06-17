import Link from "next/link";

import type { RichText as RichTextValue } from "@/data/privacy-policy/privacy-policy-data";

/**
 * Renders a `RichText` value (a plain string or an array of formatted
 * segments) into inline content with support for bold, inline code, and
 * internal/external links.
 */
export function RichText({ value }: { value: RichTextValue }) {
  if (typeof value === "string") return <>{value}</>;

  return (
    <>
      {value.map((segment, index) => {
        if (segment.href) {
          const isExternal =
            segment.external ?? /^https?:\/\//.test(segment.href);

          return (
            <Link
              key={index}
              href={segment.href}
              {...(isExternal
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              className="font-medium text-primary underline-offset-4 hover:underline"
            >
              {segment.text}
            </Link>
          );
        }

        if (segment.code) {
          return (
            <code
              key={index}
              className="rounded bg-muted px-1.5 py-0.5 font-mono text-[0.85em] text-foreground"
            >
              {segment.text}
            </code>
          );
        }

        if (segment.bold) {
          return (
            <strong key={index} className="font-semibold text-foreground">
              {segment.text}
            </strong>
          );
        }

        return <span key={index}>{segment.text}</span>;
      })}
    </>
  );
}
