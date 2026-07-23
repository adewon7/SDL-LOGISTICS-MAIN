import styles from "./Avatar.module.css";

interface AvatarProps {
  name: string;
  imageUrl?: string;
  size?: "small" | "medium" | "large";
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function Avatar({
  name,
  imageUrl,
  size = "medium",
}: AvatarProps) {
  if (imageUrl) {
    return (
      <img
        className={`${styles.avatar} ${styles[size]}`}
        src={imageUrl}
        alt={name}
      />
    );
  }

  return (
    <div
      className={`${styles.avatar} ${styles[size]}`}
      aria-label={name}
      title={name}
    >
      {getInitials(name)}
    </div>
  );
}