import { JsonLd } from "@/components/seo";
import {
  aboutCommunity,
  aboutCta,
  aboutHero,
  aboutOfferings,
  aboutOfferingsHeading,
  aboutSections,
} from "@/data/about-us/about-us-data";
import { aboutUsPageMetadata } from "@/data/meta-data/about-us/about-us-page-meta-data";
import {
  aboutUsBreadcrumbJsonLd,
  aboutUsOrganizationJsonLd,
  aboutUsWebPageJsonLd,
} from "@/data/meta-data/about-us/about-us-structured-jsonld-data";

import {
  AboutHero,
  CommunitySection,
  CtaSection,
  OfferingCard,
  ProseSection,
} from "./_components";

export const metadata = aboutUsPageMetadata;

export default function AboutUsPage() {
  return (
    <>
      <JsonLd data={aboutUsWebPageJsonLd} />
      <JsonLd data={aboutUsBreadcrumbJsonLd} />
      <JsonLd data={aboutUsOrganizationJsonLd} />

      <article data-testid="about-page" className="text-foreground">
        <AboutHero
          eyebrow={aboutHero.eyebrow}
          title={aboutHero.title}
          subtitle={aboutHero.subtitle}
        />

        <ProseSection {...aboutSections[0]} />
        <ProseSection {...aboutSections[1]} />

        {/* What we offer */}
        <section
          id={aboutOfferingsHeading.id}
          data-section={aboutOfferingsHeading.id}
          data-testid="about-section-what-we-offer"
          className="mb-10 scroll-mt-24"
        >
          <h2 className="mb-4 text-2xl font-semibold text-foreground">
            {aboutOfferingsHeading.title}
          </h2>
          <div className="grid gap-6 sm:grid-cols-2">
            {aboutOfferings.map((offering) => (
              <OfferingCard key={offering.id} {...offering} />
            ))}
          </div>
        </section>

        <ProseSection {...aboutSections[2]} />

        <CommunitySection data={aboutCommunity} />

        <CtaSection data={aboutCta} />
      </article>
    </>
  );
}
