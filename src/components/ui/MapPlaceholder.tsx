import styles from "./MapPlaceholder.module.css";

interface MapPlaceholderProps {
  height?: number;
  label?: string;
  live?: boolean;
}

export function MapPlaceholder({
  height = 220,
  label = "Live location",
  live = false,
}: MapPlaceholderProps) {
  return (
    <div className={styles.map} style={{ height }}>
      <div className={styles.label}>
        <span className={live ? styles.liveDot : styles.dot} />
        {label}
      </div>

      <svg viewBox="0 0 400 220" aria-hidden="true">
        <path
          d="M25 165 C95 50, 150 205, 240 110 S330 70, 375 35"
          className={styles.route}
        />
        <circle cx="25" cy="165" r="9" className={styles.pickup} />
        <circle cx="375" cy="35" r="9" className={styles.destination} />
        <circle cx="230" cy="117" r="11" className={styles.vehicle} />
      </svg>
    </div>
  );
}