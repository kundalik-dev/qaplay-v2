import styles from "./trust-section.module.css";
import { TrustPill } from "./trust-pill";

interface TrustPillTrackProps {
  companies: string[];
}

export function TrustPillTrack({ companies }: TrustPillTrackProps) {
  return (
    <div className={styles.track} aria-hidden="true">
      {companies.map((company) => (
        <TrustPill key={`first-${company}`} label={company} />
      ))}
      <span className={styles.separator}>*</span>
      {companies.map((company) => (
        <TrustPill key={`second-${company}`} label={company} />
      ))}
      <span className={styles.separator}>*</span>
    </div>
  );
}
