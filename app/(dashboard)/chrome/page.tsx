import { JsonLd } from "@/components/seo";
import {
  chromeExtensions,
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
    <>
      <JsonLd data={chromeWebPageJsonLd} />
      <JsonLd data={chromeBreadcrumbJsonLd} />

      <ChromeExtensionsWall
        extensions={chromeExtensions}
        title={chromePageTitle}
        description={chromePageSubtitle}
      />
    </>
  );
}
