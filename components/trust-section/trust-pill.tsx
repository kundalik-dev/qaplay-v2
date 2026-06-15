import styles from "./trust-section.module.css";

interface TrustPillProps {
  label: string;
}

export function TrustPill({ label }: TrustPillProps) {
  return <div className={styles.pill}>{label}</div>;
}
