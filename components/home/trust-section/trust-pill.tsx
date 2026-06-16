import { cn } from "@/lib/utils";

import shared from "../shared/home-shared.module.css";
import styles from "./trust-section.module.css";

interface TrustPillProps {
  label: string;
}

export function TrustPill({ label }: TrustPillProps) {
  return <div className={cn(shared.homePill, styles.pill)}>{label}</div>;
}
