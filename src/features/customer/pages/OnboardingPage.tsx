import { useState } from "react";
import type { LucideIcon } from "lucide-react";
import { Navigation, Shield, Clock, ArrowRight } from "lucide-react";
import { Button } from "../../../components/ui/Button"; // ASSUMED props: variant, fullWidth, children, onClick — confirm against real Button.tsx
import styles from "./OnboardingPage.module.css";

interface Slide {
  icon: LucideIcon;
  title: string;
  description: string;
}

const SLIDES: Slide[] = [
  { icon: Navigation, title: "Move anything, anywhere", description: "Rides, parcels, freight and group travel — one app, one trusted network across the city." },
  { icon: Shield, title: "Safety built in", description: "Verified partners, masked calls, live trip sharing and a one-tap SOS on every journey." },
  { icon: Clock, title: "On your schedule", description: "Book now or plan days ahead. Transparent fares before you confirm — no surprises." },
];

interface OnboardingPageProps {
  onDone: () => void;
}

export function OnboardingPage({ onDone }: OnboardingPageProps) {
  const [index, setIndex] = useState(0);
  const slide = SLIDES[index];
  const isLast = index === SLIDES.length - 1;

  return (
    <div className={styles.onboarding}>
      <div className="row" style={{ fontWeight: 700, fontSize: 22 }}>
        SDI <em style={{ color: "#5EEAD4", fontStyle: "normal" }}>Logistics</em>
      </div>

      <div className={styles.art}>
        <div className={styles.iconWrap}>
          <slide.icon size={58} />
        </div>
      </div>

      <h1 style={{ fontSize: 26, textAlign: "center" }}>{slide.title}</h1>
      <p style={{ textAlign: "center", opacity: 0.85, margin: "10px 0 6px", fontSize: 14.5, lineHeight: 1.55 }}>
        {slide.description}
      </p>

      <div className={styles.dots}>
        {SLIDES.map((_, i) => (
          <span key={i} className={`${styles.dot} ${i === index ? styles.dotOn : ""}`} />
        ))}
      </div>

      {!isLast ? (
        <div className="row">
          <div className="grow">
            <Button variant="secondary" fullWidth onClick={onDone}>Skip</Button>
          </div>
          <div className="grow">
            <Button variant="teal" fullWidth onClick={() => setIndex(index + 1)}>
              Next <ArrowRight size={16} />
            </Button>
          </div>
        </div>
      ) : (
        <Button variant="teal" fullWidth onClick={onDone}>
          Get started <ArrowRight size={16} />
        </Button>
      )}
    </div>
  );
}