import { JsonLd } from "@/components/seo";
import { privacyPolicyPageMetadata } from "@/data/meta-data/privacy-policy/privacy-policy-page-meta-data";
import {
  privacyPolicyBreadcrumbJsonLd,
  privacyPolicyWebPageJsonLd,
} from "@/data/meta-data/privacy-policy/privacy-policy-structured-jsonld-data";
import {
  privacyPolicyContact,
  privacyPolicyHeader,
  privacyPolicySections,
} from "@/data/privacy-policy/privacy-policy-data";

import { LegalHeader, LegalSection, PrivacyContactCard } from "./_components";

export const metadata = privacyPolicyPageMetadata;

export default function PrivacyPolicyPage() {
  return (
    <>
      <JsonLd data={privacyPolicyWebPageJsonLd} />
      <JsonLd data={privacyPolicyBreadcrumbJsonLd} />

      <article data-testid="privacy-policy-page" className="max-w-none">
        <LegalHeader data={privacyPolicyHeader} />

        {privacyPolicySections.map((section) => (
          <LegalSection key={section.id} section={section} />
        ))}

        <PrivacyContactCard data={privacyPolicyContact} />
      </article>
    </>
  );
}
