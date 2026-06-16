import { cn } from "@/lib/utils";
import { reviewSectionContent } from "@/data/home/review-section-data";

import { ReviewCard } from "./review-card";
import styles from "./review-section.module.css";
import shared from "../shared/home-shared.module.css";

export function ReviewSection() {
  const { description, metrics, reviews, sectionTag, titleLines } =
    reviewSectionContent;
  const marqueeReviews = [...reviews, ...reviews];

  return (
    <section
      id="testimonials"
      className={cn(
        shared.section,
        shared.sectionDefaultPadding,
        shared.sectionDivider,
        shared.sectionDividerBlend,
        styles.section,
      )}
      aria-labelledby="reviews-title"
      data-testid="home-reviews"
      data-section="testimonials"
      data-supported-frameworks="playwright selenium cypress"
    >
      <div className="home-shell">
        <div className={cn(shared.sectionHeader, styles.header)}>
          <div className={shared.sectionTag}>{sectionTag}</div>
          <h2 id="reviews-title" className={shared.sectionTitle}>
            <span className={shared.sectionTitleLine}>{titleLines[0]}</span>{" "}
            <span className={cn(shared.sectionTitleLine, styles.titleAccent)}>
              {titleLines[1]}
            </span>
          </h2>
          <p className={shared.sectionDescription}>{description}</p>
        </div>

        <div
          className={styles.marquee}
          aria-label="Community testimonials"
          data-testid="reviews-marquee"
        >
          <div className={styles.track}>
            {marqueeReviews.map((review, index) => (
              <ReviewCard
                key={`${review.id}-${index}`}
                review={review}
                duplicate={index >= reviews.length}
              />
            ))}
          </div>
        </div>

        <div
          className={styles.metrics}
          aria-label="Community stats"
          data-testid="reviews-metrics"
        >
          {metrics.map((metric) => (
            <div
              key={metric.label}
              className={styles.metricItem}
              data-testid={`review-metric-${metric.label.toLowerCase().replaceAll(" ", "-")}`}
            >
              <span className={cn(shared.homeMetricValue, styles.metricValue)}>
                {metric.value}
              </span>
              <span className={cn(shared.homeMetricLabel, styles.metricLabel)}>
                {metric.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
