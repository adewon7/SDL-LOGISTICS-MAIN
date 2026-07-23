import { Card } from "../../../components/ui/Card";
import { Pill } from "../../../components/ui/Pill";
import { Stars } from "../../../components/ui/Stars";
import type { PillTone } from "../../../components/ui/Pill";

interface PerformanceMetric {
  label: string;
  value: string;
  tone: PillTone;
}

const METRICS: PerformanceMetric[] = [
  { label: "Acceptance rate", value: "96%", tone: "green" },
  { label: "Completion rate", value: "99%", tone: "green" },
  { label: "On-time pickup", value: "92%", tone: "teal" },
  { label: "Cancellations", value: "1%", tone: "blue" },
];

export function PerformancePage() {
  return (
    <>
      <div className="topbar">
        <h2 className="grow">Ratings & performance</h2>
      </div>

      <div className="body">
        <Card className="mb" style={{ textAlign: "center" }}>
          <div className="disp" style={{ fontSize: 44, fontWeight: 700 }}>4.9</div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Stars rating={5} />
          </div>
          <div className="muted mt" style={{ fontSize: 12.5 }}>Based on 2,314 completed trips</div>
        </Card>

        {METRICS.map((m) => (
          <Card key={m.label} className="row mb">
            <b className="grow" style={{ fontSize: 13.5 }}>{m.label}</b>
            <Pill tone={m.tone}>{m.value}</Pill>
          </Card>
        ))}
      </div>
    </>
  );
}