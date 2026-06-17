interface AboutHeroProps {
  eyebrow: string;
  title: string;
  subtitle: string;
}

export function AboutHero({ eyebrow, title, subtitle }: AboutHeroProps) {
  return (
    <header
      data-testid="about-hero"
      data-section="about-hero"
      className="mb-12"
    >
      <p className="mb-2 text-sm font-medium tracking-wide text-primary uppercase">
        {eyebrow}
      </p>
      <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
        {title}
      </h1>
      <p className="mt-3 max-w-2xl text-lg text-muted-foreground">{subtitle}</p>
    </header>
  );
}
