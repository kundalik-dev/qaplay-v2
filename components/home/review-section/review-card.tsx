import type { ReviewItem } from "@/data/home/review-section-data";
import { cn } from "@/lib/utils";

import styles from "./review-section.module.css";

interface ReviewCardProps {
  duplicate?: boolean;
  review: ReviewItem;
}

export function ReviewCard({ duplicate = false, review }: ReviewCardProps) {
  return (
    <article
      className={cn(styles.card, review.featured && styles.cardFeatured)}
      aria-label={duplicate ? undefined : `Testimonial from ${review.name}`}
      aria-hidden={duplicate || undefined}
      data-testid={duplicate ? undefined : `review-card-${review.id}`}
      data-review={review.id}
      data-tone={review.tone}
    >
      <div className={styles.quoteMark} aria-hidden="true">
        &quot;
      </div>
      <blockquote className={styles.quote}>{review.quote}</blockquote>
      <div
        className={styles.stars}
        aria-label={duplicate ? undefined : "5 out of 5 stars"}
        role={duplicate ? undefined : "img"}
      >
        <span aria-hidden="true">★★★★★</span>
      </div>
      <div className={styles.author}>
        <div className={styles.avatar} aria-hidden="true">
          {review.initials}
        </div>
        <div className={styles.authorInfo}>
          <div className={styles.name}>{review.name}</div>
          <div className={styles.role}>{review.role}</div>
        </div>
        {review.featured ? <div className={styles.badge}>Featured</div> : null}
      </div>
    </article>
  );
}
