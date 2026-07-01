import { homePageMetadata } from "@/data/meta-data/home/home-page-meta-data";
import {
  homePageArticleJsonLd,
  homePageFaqJsonLd,
  homePageWebPageJsonLd,
} from "@/data/meta-data/home/home-structured-jsonld-data";

import {
  CtaSection,
  FaqSection,
  HomeFeaturePreview,
  HomeHero,
  InterviewSection,
  PracticeNewSection,
  ReviewSection,
  RoadmapSection,
} from "@/components/home";
import { ScrollToTopButton } from "@/components/scroll-to-top";
import { TrustSection } from "@/components/home/trust-section";
import { JsonLd } from "@/components/seo";

export const metadata = homePageMetadata;

export default function Home() {
  return (
    <>
      <JsonLd data={homePageWebPageJsonLd} />
      <JsonLd data={homePageArticleJsonLd} />
      <JsonLd data={homePageFaqJsonLd} />
      <HomeHero />
      <TrustSection />
      {/* <PracticeSection /> */}
      <PracticeNewSection />
      <HomeFeaturePreview />
      {/* <JobHuntSection /> */}
      {/* <InterviewSection /> */}
      <RoadmapSection />
      <ReviewSection />
      <CtaSection />
      <FaqSection />
      <ScrollToTopButton />
    </>
  );
}
