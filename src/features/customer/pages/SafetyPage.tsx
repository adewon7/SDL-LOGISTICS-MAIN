import { useState } from "react";
import { ChevronLeft, Phone, Share2, Shield } from "lucide-react";
import { Card } from "../../../components/ui/Card";
import { Button } from "../../../components/ui/Button";
import { Modal } from "../../../components/ui/Modal";
import { useToast } from "../../../components/ui/Toast";

interface SafetyPageProps {
  back: () => void;
}

export function SafetyPage({ back }: SafetyPageProps) {
  const { showToast } = useToast();
  const [confirmOpen, setConfirmOpen] = useState(false);

  return (
    <>
      <div className="topbar">
        <button className="iconbtn" onClick={back} aria-label="Back">
          <ChevronLeft size={18} />
        </button>
        <h2>Safety centre</h2>
      </div>

      <div className="body">
        <p className="muted" style={{ textAlign: "center" }}>
          Hold for help. Your live location and trip details go straight to our response team.
        </p>

        <button className="sos" onClick={() => setConfirmOpen(true)}>SOS</button>

        <Card className="mb">
          <div className="row">
            <Phone size={18} color="var(--teal)" />
            <div className="grow">
              <b style={{ fontSize: 13.5 }}>Emergency contact</b>
              <div className="muted" style={{ fontSize: 12.5 }}>Funke A. · +234 803 ••• 2214</div>
            </div>
            <Button variant="secondary">Edit</Button>
          </div>
        </Card>

        <Card className="mb">
          <div className="row">
            <Share2 size={18} color="var(--blue)" />
            <div className="grow">
              <b style={{ fontSize: 13.5 }}>Share every trip</b>
              <div className="muted" style={{ fontSize: 12.5 }}>Auto-send a live link to your contact</div>
            </div>
            <Button variant="ghost" onClick={() => showToast("Trip sharing turned on")}>Turn on</Button>
          </div>
        </Card>

        <Card>
          <div className="row">
            <Shield size={18} color="var(--navy)" />
            <div className="grow">
              <b style={{ fontSize: 13.5 }}>All partners verified</b>
              <div className="muted" style={{ fontSize: 12.5 }}>ID, licence and vehicle checks before their first job.</div>
            </div>
          </div>
        </Card>
      </div>

      <Modal open={confirmOpen} onClose={() => setConfirmOpen(false)} title="Send emergency alert?">
        <p className="muted mb">
          Our response team will call you immediately and can contact local emergency services on your behalf.
        </p>
        <div className="row">
          <div className="grow">
            <Button variant="secondary" fullWidth onClick={() => setConfirmOpen(false)}>Cancel</Button>
          </div>
          <div className="grow">
            <Button variant="danger" fullWidth onClick={() => { setConfirmOpen(false); showToast("Emergency alert sent — help is on the way"); }}>
              Send alert
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}