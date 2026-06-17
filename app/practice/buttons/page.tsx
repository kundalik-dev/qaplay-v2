import { JsonLd } from "@/components/seo";
import { PracticePage } from "@/components/practice";
import { buttonsData } from "@/data/practice-data/buttons";
import { buttonsPageMetadata } from "@/data/meta-data/practice/buttons-page-meta-data";
import {
  buttonsPageBreadcrumbJsonLd,
  buttonsPageFaqJsonLd,
  buttonsPageWebPageJsonLd,
} from "@/data/meta-data/practice/buttons-structured-jsonld-data";
import { ButtonScenarios } from "./_components/button-scenarios";
import { ButtonsLearn } from "./_components/buttons-learn";

export const metadata = buttonsPageMetadata;

/**
 * /practice/buttons — dedicated, statically rendered element page.
 *
 * This static segment takes routing precedence over the generic
 * `/practice/[element]` fallback. It supplies the shared <PracticePage> shell
 * with its own interactive scenario cards and Learn-tab content, while all
 * copy/data lives in `data/practice-data/buttons`.
 */
export default function ButtonsPage() {
  return (
    <>
      <JsonLd data={buttonsPageWebPageJsonLd} />
      <JsonLd data={buttonsPageBreadcrumbJsonLd} />
      <JsonLd data={buttonsPageFaqJsonLd} />

      <PracticePage
        {...buttonsData}
        scenarioContent={<ButtonScenarios />}
        learnContent={<ButtonsLearn />}
      />
    </>
  );
}
