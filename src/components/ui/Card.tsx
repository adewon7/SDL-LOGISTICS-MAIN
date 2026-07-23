import type { ReactNode, CSSProperties } from "react";
import styles from "./Card.module.css";

interface CardProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}

export function Card({ children, className = "", style }: CardProps) {
  return (
    <section className={`${styles.card} ${className}`} style={style}>
      {children}
    </section>
  );
}