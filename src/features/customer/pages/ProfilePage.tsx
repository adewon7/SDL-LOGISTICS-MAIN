import { MapPin, CreditCard, Bell, Shield, ChevronRight, LogOut } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Avatar } from "../../../components/ui/Avatar";
import { Card } from "../../../components/ui/Card";
import { Button } from "../../../components/ui/Button";
import { Pill } from "../../../components/ui/Pill";

interface ProfileLink {
  icon: LucideIcon;
  label: string;
  onSelect: () => void;
}

interface ProfilePageProps {
  onAddresses: () => void;
  onPayments: () => void;
  onNotifications: () => void;
  onSafety: () => void;
  onSignOut: () => void;
}

export function ProfilePage({ onAddresses, onPayments, onNotifications, onSafety, onSignOut }: ProfilePageProps) {
  const links: ProfileLink[] = [
    { icon: MapPin, label: "Saved addresses", onSelect: onAddresses },
    { icon: CreditCard, label: "Payment methods", onSelect: onPayments },
    { icon: Bell, label: "Notifications", onSelect: onNotifications },
    { icon: Shield, label: "Safety centre", onSelect: onSafety },
  ];

  return (
    <>
      <div className="topbar">
        <h2 className="grow">Profile & settings</h2>
      </div>

      <div className="body">
        <Card className="row mb">
          <Avatar name="Ololade Adebayo" size="medium" />
          <div className="grow">
            <b>Ololade Adebayo</b>
            <div className="muted" style={{ fontSize: 12.5 }}>+234 801 ••• 5678</div>
            <Pill tone="green">verified</Pill>
          </div>
          <Button variant="secondary" size="sm">Edit</Button>
        </Card>

        {links.map((link) => (
          <div
            key={link.label}
            role="button"
            tabIndex={0}
            className="mb"
            style={{ cursor: "pointer" }}
            onClick={link.onSelect}
            onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && link.onSelect()}
          >
            <Card className="row" style={{ textAlign: "left" }}>
              <link.icon size={18} color="var(--blue)" />
              <b className="grow" style={{ fontSize: 14 }}>{link.label}</b>
              <ChevronRight size={17} color="var(--slate)" />
            </Card>
          </div>
        ))}

        <div
          role="button"
          tabIndex={0}
          style={{ cursor: "pointer" }}
          onClick={onSignOut}
          onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && onSignOut()}
        >
          <Card className="row" style={{ textAlign: "left", color: "var(--red)" }}>
            <LogOut size={18} />
            <b className="grow" style={{ fontSize: 14 }}>Sign out</b>
          </Card>
        </div>
      </div>
    </>
  );
}