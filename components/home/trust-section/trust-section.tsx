import styles from "./trust-section.module.css";
import { TrustPillTrack } from "./trust-pill-track";

const trustedCompanies = [
  "Infosys",
  "TCS",
  "Capgemini",
  "Wipro",
  "Accenture",
  "HCL",
  "Cognizant",
];

export function TrustSection() {
  return (
    <section
      className={styles.section}
      role="region"
      aria-label="Trusted by engineers at"
      data-testid="home-trust"
      data-section="trust"
      data-supported-frameworks="playwright selenium cypress"
    >
      <div className={`home-shell ${styles.inner}`}>
        <span className={styles.label}>
          Trusted by engineers at
          <span className={styles.arrow} aria-hidden="true">
            -&gt;
          </span>
        </span>

        <div className={styles.trackWrap}>
          <TrustPillTrack companies={trustedCompanies} />
        </div>
      </div>
    </section>
  );
}
