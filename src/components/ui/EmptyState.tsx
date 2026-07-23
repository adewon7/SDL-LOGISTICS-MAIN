import type { ReactNode } from "react";
import styles from "./EmptyState.module.css";

interface EmptyStateProps {
  title: string;
  message: string;
  icon?: ReactNode;
}

export function EmptyState({
  title,
  message,
  icon,
}: EmptyStateProps) {
  return (
    <div className={styles.emptyState}>
      {icon && <div className={styles.icon}>{icon}</div>}

      <h3>{title}</h3>
      <p>{message}</p>
    </div>
  );
}