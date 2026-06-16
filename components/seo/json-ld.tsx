/**
 * Renders structured data (JSON-LD) as a native `<script>` tag, following
 * the current Next.js recommendation for JSON-LD (a plain script tag, not
 * `next/script`, since this is data, not executable code).
 *
 * Pass any schema.org-shaped object (see `data/meta-data/structured-data.ts`).
 * The payload is escaped (`<` -> `<`) to avoid XSS via injected markup.
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
