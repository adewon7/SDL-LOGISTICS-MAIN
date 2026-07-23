import { useState } from "react";
import { ChevronLeft, Phone, MessageCircle } from "lucide-react";
import { Avatar } from "../../../components/ui/Avatar";
import { Card } from "../../../components/ui/Card";
import { Button } from "../../../components/ui/Button";
import { Pill } from "../../../components/ui/Pill";
import { MapPlaceholder } from "../../../components/ui/MapPlaceholder";
import { Timeline } from "../../../components/ui/Timeline";
import { useToast } from "../../../components/ui/Toast";
import { fmtN } from "../../../utils/format";

const JOB_STEPS = [
  { t: "Head to pickup", d: "Wuse Market, Gate 3" },
  { t: "Confirm pickup", d: "Verify items with the customer" },
  { t: "Deliver to drop-off", d: "Asokoro, Yakubu Gowon Cres" },
  { t: "Complete job", d: "Collect confirmation" },
];

const STEP_BUTTON_LABELS = [
  "Arrived at pickup",
  "Items collected — start trip",
  "Arrived at drop-off",
  "Complete job",
];

interface ActiveJobPageProps {
  back: () => void;
  onComplete: () => void;
}

export function ActiveJobPage({ back, onComplete }: ActiveJobPageProps) {
  const { showToast } = useToast();
  const [jobStep, setJobStep] = useState(0);

  const advance = () => {
    const next = jobStep + 1;
    setJobStep(next);
    if (next === 4) {
      showToast("Job completed — ₦2,850 added to your earnings");
      onComplete();
    }
  };

  return (
    <>
      <div className="topbar">
        <button className="iconbtn" onClick={back} aria-label="Back">
          <ChevronLeft size={18} />
        </button>
        <h2 className="grow">Active job</h2>
        <Pill tone="teal">{fmtN(2850)}</Pill>
      </div>

      <div className="body">
        <MapPlaceholder height={180} label="Navigation preview" live />

        <Card className="mt row">
          <Avatar name="Ngozi Eze" />
          <div className="grow">
            <b style={{ fontSize: 14 }}>Ngozi Eze</b>
            <div className="muted" style={{ fontSize: 12.5 }}>Customer · 4.8 ★</div>
          </div>
          <button className="iconbtn" aria-label="Call customer">
            <Phone size={16} color="var(--teal)" />
          </button>
          <button className="iconbtn" aria-label="Message customer">
            <MessageCircle size={16} color="var(--blue)" />
          </button>
        </Card>

        <Card className="mt">
          <Timeline active={jobStep} steps={JOB_STEPS} />
        </Card>

        {jobStep < 4 && (
          <div className="mt">
            <Button variant="primary" fullWidth onClick={advance}>
              {STEP_BUTTON_LABELS[jobStep]}
            </Button>
          </div>
        )}
      </div>
    </>
  );
}