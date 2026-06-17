import type { privacyPolicyHeader } from "@/data/privacy-policy/privacy-policy-data";

import { RichText } from "./rich-text";

export function LegalHeader({ data }: { data: typeof privacyPolicyHeader }) {
  return (
    <header data-testid="privacy-header" className="mb-10">
      <h1 className="mb-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
        {data.title}
      </h1>
      <p className="mb-6 text-sm text-muted-foreground">
        Effective Date: {data.effectiveDate}
        <span aria-hidden="true"> &nbsp;|&nbsp; </span>
        Last Updated: {data.lastUpdated}
      </p>
      <p className="leading-relaxed text-muted-foreground">
        <RichText value={data.intro} />
      </p>
    </header>
  );
}
