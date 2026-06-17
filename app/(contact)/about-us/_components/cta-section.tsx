import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { aboutCta } from "@/data/about-us/about-us-data";

export function CtaSection({ data }: { data: typeof aboutCta }) {
  return (
    <Card
      data-testid="about-cta"
      data-section={data.id}
      data-cta="contact"
      className="bg-muted/30"
    >
      <CardHeader>
        <CardTitle className="text-xl">{data.title}</CardTitle>
        <CardDescription className="text-base">
          {data.description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Link
          href={data.button.href}
          data-testid="about-cta-button"
          data-cta="contact-us"
          className={cn(buttonVariants({ size: "lg" }))}
        >
          {data.button.label}
        </Link>
      </CardContent>
    </Card>
  );
}
