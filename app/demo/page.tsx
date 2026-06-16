import { demoPageMetadata } from "@/data/meta-data/demo/demo-page-meta-data";
import { DemoAppCatalog } from "./_components/demo-app-catalog";

export const metadata = demoPageMetadata;

export default function DemoAppPage() {
  return <DemoAppCatalog />;
}
