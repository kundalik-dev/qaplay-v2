import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { AboutOffering } from "@/data/about-us/about-us-data";

export function OfferingCard({ id, title, description }: AboutOffering) {
  return (
    <Card
      data-testid={`about-offering-${id}`}
      data-card={id}
      className="h-full"
    >
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="leading-relaxed">
          {description}
        </CardDescription>
      </CardContent>
    </Card>
  );
}
