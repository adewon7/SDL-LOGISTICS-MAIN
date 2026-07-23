import type { ReactNode } from "react";
import styles from "./Field.module.css";

interface FieldProps {
  label: string;
  hint?: string;
  children: ReactNode;
}

export function Field({ label, hint, children }: FieldProps) {
  return (
    <div className={styles.field}>
      <label className={styles.label}>{label}</label>

      {children}

      {hint && <p className={styles.hint}>{hint}</p>}
    </div>
  );
}
