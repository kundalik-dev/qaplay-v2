import { JsonLd } from "@/components/seo";
import {
  chromeExtensions,
  chromePageEyebrow,
  chromePageSubtitle,
  chromePageTitle,
} from "@/data/chrome/chrome-extensions-data";
import { chromePageMetadata } from "@/data/meta-data/chrome/chrome-page-meta-data";
import {
  chromeBreadcrumbJsonLd,
  chromeWebPageJsonLd,
} from "@/data/meta-data/chrome/chrome-structured-jsonld-data";

import { ChromeExtensionsWall } from "./_components/chrome-extensions-wall";

export const metadata = chromePageMetadata;

export default function ChromeExtensionsPage() {
  return (
    <section
      data-testid="chrome-page"
      data-section="chrome"
      className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8"
    >
      <JsonLd data={chromeWebPageJsonLd} />
      <JsonLd data={chromeBreadcrumbJsonLd} />

      <ChromeExtensionsWall
        extensions={chromeExtensions}
        eyebrow={chromePageEyebrow}
        title={chromePageTitle}
        description={chromePageSubtitle}
      />
    </section>
  );
}
