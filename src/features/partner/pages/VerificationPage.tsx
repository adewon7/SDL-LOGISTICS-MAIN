import { useState } from "react";
import { IdCard, FileText, CarFront, CheckCircle2, Camera } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Field } from "../../../components/ui/Field";
import { Button } from "../../../components/ui/Button";
import { Card } from "../../../components/ui/Card";
import { Pill } from "../../../components/ui/Pill";
import { useToast } from "../../../components/ui/Toast";
import { VEHICLES } from "../../../data/vehicles";
import type { VehicleType } from "../../../types/common";

type DocKey = "id" | "lic" | "veh";

interface DocRequirement {
  key: DocKey;
  icon: LucideIcon;
  title: string;
  description: string;
}

const DOCS: DocRequirement[] = [
  { key: "id", icon: IdCard, title: "Government ID", description: "NIN slip, passport or voter's card" },
  { key: "lic", icon: FileText, title: "Driver's licence", description: "Valid and unexpired" },
  { key: "veh", icon: CarFront, title: "Vehicle documents", description: "Registration, insurance, roadworthiness" },
];

interface VerificationPageProps {
  onDone: () => void;
}

export function VerificationPage({ onDone }: VerificationPageProps) {
  const { showToast } = useToast();
  const [uploaded, setUploaded] = useState<Partial<Record<DocKey, boolean>>>({});
  const [vehicleType, setVehicleType] = useState<VehicleType>("van");

  const allUploaded = DOCS.every((d) => uploaded[d.key]);

  const uploadDoc = (doc: DocRequirement) => {
    setUploaded((current) => ({ ...current, [doc.key]: true }));
    showToast(`${doc.title} uploaded`);
  };

  return (
    <>
      <div className="topbar">
        <h2 className="grow">Become a partner</h2>
        <Pill tone="blue">step 1 of 2</Pill>
      </div>

      <div className="body">
        <p className="muted mb">Upload your documents once — most partners are verified within 24 hours.</p>

        <Field label="Vehicle type">
          <div className="seg">
            {VEHICLES.map((v) => (
              <button key={v.id} className={vehicleType === v.id ? "on" : ""} onClick={() => setVehicleType(v.id)}>
                {v.name}
              </button>
            ))}
          </div>
        </Field>

        {DOCS.map((doc) => {
          const done = !!uploaded[doc.key];
          return (
            <div
              key={doc.key}
              role="button"
              tabIndex={0}
              className="mb"
              style={{ cursor: "pointer" }}
              onClick={() => uploadDoc(doc)}
              onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && uploadDoc(doc)}
            >
              <Card className="row" style={{ textAlign: "left", borderStyle: done ? "solid" : "dashed", background: done ? "var(--teal-soft)" : "#fff" }}>
                <doc.icon size={20} color={done ? "var(--teal)" : "var(--slate)"} />
                <div className="grow">
                  <b style={{ fontSize: 13.5 }}>{doc.title}</b>
                  <div className="muted" style={{ fontSize: 12 }}>{done ? "Uploaded · pending review" : doc.description}</div>
                </div>
                {done ? <CheckCircle2 size={19} color="var(--teal)" /> : <Camera size={18} color="var(--slate)" />}
              </Card>
            </div>
          );
        })}

        <div className="mt">
          <Button variant="primary" fullWidth disabled={!allUploaded} onClick={onDone}>
            Submit for verification
          </Button>
        </div>
        {!allUploaded && (
          <p className="hint" style={{ textAlign: "center", marginTop: 8 }}>
            Tap each card to simulate an upload.
          </p>
        )}
      </div>
    </>
  );
}