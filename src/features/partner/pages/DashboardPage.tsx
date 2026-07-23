import { Power } from "lucide-react";
import { Avatar } from "../../../components/ui/Avatar";
import { Card } from "../../../components/ui/Card";
import { Button } from "../../../components/ui/Button";
import { Pill } from "../../../components/ui/Pill";
import { fmtN } from "../../../utils/format";

interface DashboardPageProps {
  online: boolean;
  onToggleOnline: () => void;
  hasActiveJob: boolean;
  onOpenActiveJob: () => void;
}

export function DashboardPage({ online, onToggleOnline, hasActiveJob, onOpenActiveJob }: DashboardPageProps) {
  return (
    <>
      <div className="topbar">
        <Avatar name="Emeka Obi" size="small" />
        <div className="grow">
          <b style={{ fontSize: 14.5 }}>Emeka Obi</b>
          <div className="muted" style={{ fontSize: 12 }}>Van · ABJ-482-KJA</div>
        </div>
        <Pill tone={online ? "green" : "gray"}>{online ? "online" : "offline"}</Pill>
      </div>

      <div className="body">
        <Card className="mb" style={{ textAlign: "center", padding: 24 }}>
          <button
            onClick={onToggleOnline}
            style={{
              width: 92, height: 92, borderRadius: "50%", border: 0,
              background: online ? "var(--teal)" : "#E7EBF1",
              color: online ? "#fff" : "var(--slate)",
              display: "grid", placeItems: "center", margin: "0 auto 10px",
              boxShadow: online ? "0 0 0 12px var(--teal-soft)" : "none",
              transition: "all .2s",
            }}
            aria-label="Toggle availability"
          >
            <Power size={36} />
          </button>
          <b>{online ? "You're online" : "You're offline"}</b>
          <div className="muted" style={{ fontSize: 12.5 }}>
            {online ? "New job requests will appear automatically." : "Go online to start receiving jobs."}
          </div>
        </Card>

        <div className="row mb">
          <Card className="grow">
            <div className="muted" style={{ fontSize: 11.5, fontWeight: 800 }}>TODAY</div>
            <div className="disp" style={{ fontSize: 21, fontWeight: 700 }}>{fmtN(6950)}</div>
            <span className="muted" style={{ fontSize: 12 }}>2 jobs</span>
          </Card>
          <Card className="grow">
            <div className="muted" style={{ fontSize: 11.5, fontWeight: 800 }}>ACCEPTANCE</div>
            <div className="disp" style={{ fontSize: 21, fontWeight: 700 }}>96%</div>
            <span className="muted" style={{ fontSize: 12 }}>last 30 days</span>
          </Card>
        </div>

        {hasActiveJob && (
          <Card className="row" style={{ borderColor: "var(--teal)", background: "var(--teal-soft)" }}>
            <div className="grow">
              <b style={{ fontSize: 13.5 }}>Active job · SDI-90521</b>
              <div className="muted" style={{ fontSize: 12 }}>Wuse Market → Asokoro</div>
            </div>
            <Button variant="teal" size="sm" onClick={onOpenActiveJob}>Open</Button>
          </Card>
        )}
      </div>
    </>
  );
}