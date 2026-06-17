import { JsonLd } from "@/components/seo";
import { contactUsPageMetadata } from "@/data/meta-data/contact-us/contact-us-page-meta-data";
import {
  contactUsBreadcrumbJsonLd,
  contactUsOrganizationJsonLd,
  contactUsWebPageJsonLd,
  contactPageJsonLd,
} from "@/data/meta-data/contact-us/contact-us-structured-jsonld-data";

import { ContactForm, ContactHero, ContactSidebar } from "./_components";

export const metadata = contactUsPageMetadata;

export default function ContactUsPage() {
  return (
    <>
      <JsonLd data={contactUsWebPageJsonLd} />
      <JsonLd data={contactPageJsonLd} />
      <JsonLd data={contactUsBreadcrumbJsonLd} />
      <JsonLd data={contactUsOrganizationJsonLd} />

      <main
        className="space-y-8"
        data-testid="contact-page"
        data-section="contact-us"
      >
        <ContactHero />

        {/* Main content: form (2/3) + sidebar (1/3) */}
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <ContactForm />
          </div>
          <ContactSidebar />
        </div>
      </main>
    </>
  );
}
