import { DemoAppCatalog } from "./_components/demo-app-catalog";
import { createPageMetadata } from "@/data/meta-data/create-page-metadata";

export const metadata = createPageMetadata({
  title: "Demo Apps",
  description:
    "QA demo apps for practicing UI automation and end-to-end testing with focused bank and shopping workflows.",
  path: "/demo",
  keywords: [
    "qa demo apps",
    "automation practice apps",
    "ui testing",
    "end to end testing",
    "bank demo app",
    "shopping demo app",
  ],
});

export default function DemoAppPage() {
  return <DemoAppCatalog />;
}
