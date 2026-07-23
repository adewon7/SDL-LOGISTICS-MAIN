import { useEffect, useState } from "react";
import { Home, Wallet, History, Star, Package } from "lucide-react";
import { PhoneShell } from "../../components/layout/PhoneShell";
import { BottomNav } from "../../components/layout/BottomNav";
import { Modal } from "../../components/ui/Modal";
import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { useToast } from "../../components/ui/Toast";
import { VerificationPage } from "./pages/VerificationPage";
import { DashboardPage } from "./pages/DashboardPage";
import { ActiveJobPage } from "./pages/ActiveJobPage";
import { EarningsPage } from "./pages/EarningsPage";
import { PayoutPage } from "./pages/PayoutPage";
import { JobsPage } from "./pages/JobsPage";
import { PerformancePage } from "./pages/PerformancePage";
import { fmtN } from "../../utils/format";

type PartnerScreen = "verify" | "home" | "job" | "earnings" | "payout" | "jobs" | "perf";
type JobState = "offer" | "active" | null;

const NAV_ITEMS = [
  { key: "home", icon: Home, label: "Home" },
  { key: "earnings", icon: Wallet, label: "Earnings" },
  { key: "jobs", icon: History, label: "Jobs" },
  { key: "perf", icon: Star, label: "Ratings" },
];

const NO_NAV_SCREENS: PartnerScreen[] = ["verify", "job"];

export function PartnerApp() {
  const { showToast } = useToast();
  const [screen, setScreen] = useState<PartnerScreen>("verify");
  const [online, setOnline] = useState(false);
  const [job, setJob] = useState<JobState>(null);

  const nav = (s: PartnerScreen) => setScreen(s);

  useEffect(() => {
    if (online && !job) {
      const t = setTimeout(() => setJob("offer"), 2500);
      return () => clearTimeout(t);
    }
  }, [online, job]);

  const toggleOnline = () => {
    setOnline((current) => {
      const next = !current;
      showToast(next ? "You're online — watching for jobs near you" : "You're now offline");
      return next;
    });
  };

  const declineJob = () => {
    setJob(null);
    showToast("Job declined", "error");
  };

  const acceptJob = () => {
    setJob("active");
    setScreen("job");
    showToast("Job accepted — head to pickup");
  };

  return (
    <PhoneShell>
      {screen === "verify" && (
        <VerificationPage onDone={() => { setScreen("home"); showToast("Documents submitted — you're approved for this demo!"); }} />
      )}
      {screen === "home" && (
        <DashboardPage online={online} onToggleOnline={toggleOnline} hasActiveJob={job === "active"} onOpenActiveJob={() => nav("job")} />
      )}
      {screen === "job" && (
        <ActiveJobPage back={() => nav("home")} onComplete={() => { setJob(null); setScreen("earnings"); }} />
      )}
      {screen === "earnings" && <EarningsPage onOpenPayout={() => nav("payout")} />}
      {screen === "payout" && <PayoutPage back={() => nav("earnings")} />}
      {screen === "jobs" && <JobsPage />}
      {screen === "perf" && <PerformancePage />}

      {!NO_NAV_SCREENS.includes(screen) && (
        <BottomNav items={NAV_ITEMS} active={screen} onSelect={(key) => nav(key as PartnerScreen)} />
      )}

      <Modal open={job === "offer"} onClose={() => setJob(null)} title="New job request">
        <Card className="row mb" style={{ background: "var(--blue-soft)", border: 0 }}>
          <Package size={20} color="var(--blue)" />
          <div className="grow">
            <b style={{ fontSize: 14 }}>Delivery · Medium parcel</b>
            <div className="muted" style={{ fontSize: 12.5 }}>Wuse Market → Asokoro · 6.8 km</div>
          </div>
          <div className="disp" style={{ fontSize: 20, fontWeight: 700 }}>{fmtN(2850)}</div>
        </Card>
        <div className="muted mb" style={{ fontSize: 12.5 }}>Pickup 1.2 km away · expires in 18s</div>
        <div className="row">
          <div className="grow"><Button variant="secondary" fullWidth onClick={declineJob}>Decline</Button></div>
          <div className="grow"><Button variant="teal" fullWidth onClick={acceptJob}>Accept job</Button></div>
        </div>
      </Modal>
    </PhoneShell>
  );
}