import Link from "next/link";

import type { aboutCommunity } from "@/data/about-us/about-us-data";

export function CommunitySection({ data }: { data: typeof aboutCommunity }) {
  const { youtube, contact } = data.links;

  return (
    <section
      id={data.id}
      data-section={data.id}
      data-testid={`about-section-${data.id}`}
      className="mb-10 scroll-mt-24"
    >
      <h2 className="mb-3 text-2xl font-semibold text-foreground">
        {data.title}
      </h2>
      {data.paragraphs.map((paragraph, index) => (
        <p key={index} className="mb-3 leading-relaxed text-muted-foreground">
          {paragraph}
        </p>
      ))}
      <p className="leading-relaxed text-muted-foreground">
        Follow us on{" "}
        <Link
          href={youtube.href}
          target="_blank"
          rel="noopener noreferrer"
          data-testid="about-community-youtube"
          className="font-medium text-primary underline-offset-4 hover:underline"
        >
          {youtube.label}
        </Link>{" "}
        for tutorials and walkthroughs, or{" "}
        <Link
          href={contact.href}
          data-testid="about-community-contact"
          className="font-medium text-primary underline-offset-4 hover:underline"
        >
          {contact.label}
        </Link>{" "}
        if you have suggestions, feature requests, or want to collaborate.
      </p>
    </section>
  );
}
