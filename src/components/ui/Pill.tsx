import type { ReactNode } from "react";
import styles from "./Pill.module.css";

export type PillTone = "gray" | "blue" | "teal" | "green" | "amber" | "red";

interface PillProps {
  children: ReactNode;
  tone?: PillTone;
}

export function Pill({ children, tone = "gray" }: PillProps) {
  return (
    <span className={`${styles.pill} ${styles[tone]}`}>
      {children}
    </span>
  );
}