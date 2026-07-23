import styles from "./Stars.module.css";

interface StarsProps {
  rating: number;
  maximum?: number;
}

export function Stars({ rating, maximum = 5 }: StarsProps) {
  return (
    <span
      className={styles.stars}
      aria-label={`${rating} out of ${maximum} stars`}
    >
      {Array.from({ length: maximum }, (_, index) => (
        <span
          key={index}
          className={index < Math.round(rating) ? styles.filled : styles.empty}
        >
          ★
        </span>
      ))}
    </span>
  );
}