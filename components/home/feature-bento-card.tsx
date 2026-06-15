import Link from "next/link";

type FeatureBentoCardProps = {
  badge?: string;
  className?: string;
  description: string;
  emoji: string;
  href: string;
  linkLabel: string;
  title: string;
};

export function FeatureBentoCard({
  badge,
  className,
  description,
  emoji,
  href,
  linkLabel,
  title,
}: FeatureBentoCardProps) {
  return (
    <article className={`feature-bento-card ${className ?? ""}`.trim()}>
      {badge ? <span className="feature-bento-badge">{badge}</span> : null}
      <div className="feature-bento-icon" aria-hidden="true">
        {emoji}
      </div>
      <div className="feature-bento-content">
        <h3 className="feature-bento-title">{title}</h3>
        <p className="feature-bento-description">{description}</p>
        <Link href={href} className="feature-bento-link">
          {linkLabel}
        </Link>
      </div>
    </article>
  );
}
