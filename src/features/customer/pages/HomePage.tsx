import { Bell, Car, Package, Calendar, Truck, AlertTriangle, ChevronRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Card } from "../../../components/ui/Card";
import { Button } from "../../../components/ui/Button";
import { StatusPill } from "../../../components/ui/StatusPill";
import { HISTORY } from "../../../data/customerData";
import { fmtN } from "../../../utils/format";
import type { VehicleType } from "../../../types/common";
import styles from "./HomePage.module.css";

interface QuickAction {
  icon: LucideIcon;
  title: string;
  description: string;
  bg: string;
  color: string;
  onSelect: () => void;
}

interface HomePageProps {
  onBookRide: (preset: VehicleType | null) => void;
  onBookDelivery: (scheduled: boolean) => void;
  onTrack: () => void;
  onSafety: () => void;
  onNotifications: () => void;
  onSeeHistory: () => void;
}

export function HomePage({
  onBookRide,
  onBookDelivery,
  onTrack,
  onSafety,
  onNotifications,
  onSeeHistory,
}: HomePageProps) {
  const quickActions: QuickAction[] = [
    { icon: Car, title: "Book a Ride", description: "Bike, car, van, truck or bus", bg: "var(--blue-soft)", color: "var(--blue)", onSelect: () => onBookRide(null) },
    { icon: Package, title: "Send a Package", description: "Express or same-day", bg: "var(--teal-soft)", color: "var(--teal)", onSelect: () => onBookDelivery(false) },
    { icon: Calendar, title: "Schedule a Delivery", description: "Plan days ahead", bg: "#F1EBFB", color: "#7C3AED", onSelect: () => onBookDelivery(true) },
    { icon: Truck, title: "Hire a Truck", description: "Freight up to 5 t", bg: "var(--amber-soft)", color: "var(--amber)", onSelect: () => onBookRide("truck") },
  ];

  return (
    <>
      {/* Top bar */}
      <div className={`topbar ${styles.topbar}`}>
        <div className="grow">
          <div className={`muted ${styles.greeting}`}>Good afternoon 👋</div>
          <h2 className={styles.username}>Ololade</h2>
        </div>
        <button className="iconbtn" onClick={onNotifications} aria-label="Notifications">
          <Bell size={18} />
          <span className="dot" />
        </button>
      </div>

      <div className={`body ${styles.body}`}>
        {/* Active delivery banner */}
        <Card className={`mb ${styles.activeBanner}`}>
          <div className="row">
            <div className="grow">
              <div className={styles.activeBannerLabel}>ACTIVE DELIVERY</div>
              <b>Jabi Lake Mall → Maitama</b>
              <div className={styles.activeBannerSub}>Sani is 6 minutes from drop-off</div>
            </div>
            <Button variant="teal" size="sm" onClick={onTrack}>Track</Button>
          </div>
        </Card>

        <div className="h3 mb">What are you moving today?</div>

        {/* Quick actions grid */}
        <div className={styles.quickGrid}>
          {quickActions.map((action) => (
            <button key={action.title} className={styles.quickAction} onClick={action.onSelect}>
              <span className={styles.quickActionIcon} style={{ background: action.bg, color: action.color }}>
                <action.icon size={20} />
              </span>
              <span>
                <b>{action.title}</b>
                <div className={`muted ${styles.actionDesc}`}>{action.description}</div>
              </span>
            </button>
          ))}
        </div>

        {/* Emergency request */}
        <button
          className={`${styles.quickAction} ${styles.emergencyAction}`}
          onClick={onSafety}
        >
          <span className={styles.quickActionIcon} style={{ background: "#FDEBE3", color: "var(--red)" }}>
            <AlertTriangle size={20} />
          </span>
          <span className="grow">
            <b>Emergency Request</b>
            <div className={`muted ${styles.actionDesc}`}>Priority dispatch & SOS support</div>
          </span>
          <ChevronRight size={18} color="var(--slate)" />
        </button>

        {/* Recent bookings */}
        <div className={`row mt mb ${styles.recentHeader}`}>
          <div className="h3 grow">Recent</div>
          <Button variant="ghost" size="sm" onClick={onSeeHistory}>See all</Button>
        </div>

        {HISTORY.slice(0, 2).map((h) => (
          <Card key={h.id} className="row mb">
            <div className="grow">
              <b className={styles.historyFrom}>{h.from} → {h.to}</b>
              <div className={`muted ${styles.historyMeta}`}>{h.date} · {fmtN(h.fare)}</div>
            </div>
            <StatusPill status={h.status} />
          </Card>
        ))}
      </div>
    </>
  );
}