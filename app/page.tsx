import { homePageMetadata } from "@/data/meta-data/home/home-page-meta-data";
import { homePageJsonLd } from "@/data/meta-data/home/home-structured-data";

import {
  CtaSection,
  FaqSection,
  HomeFeaturePreview,
  HomeHero,
  InterviewSection,
  JobHuntSection,
  PracticeNewSection,
  ReviewSection,
  RoadmapSection,
} from "@/components/home";
import { TrustSection } from "@/components/home/trust-section";
import { JsonLd } from "@/components/seo";

export const metadata = homePageMetadata;

export default function Home() {
  return (
    <>
      <JsonLd data={homePageJsonLd} />
      <HomeHero />
      <TrustSection />
      {/* <PracticeSection /> */}
      <PracticeNewSection />
      <HomeFeaturePreview />
      <JobHuntSection />
      <InterviewSection />
      <RoadmapSection />
      <ReviewSection />
      <CtaSection />
      <FaqSection />
    </>
  );
}
