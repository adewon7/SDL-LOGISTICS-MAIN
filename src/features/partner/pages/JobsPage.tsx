import { Star } from "lucide-react";
import { Card } from "../../../components/ui/Card";
import { JOBS_DONE } from "../../../data/partnerData";
import { fmtN } from "../../../utils/format";

export function JobsPage() {
  return (
    <>
      <div className="topbar">
        <h2 className="grow">Completed jobs</h2>
      </div>

      <div className="body">
        {JOBS_DONE.map((j) => (
          <Card key={j.id} className="row mb">
            <div className="grow">
              <b style={{ fontSize: 13.5 }}>{j.from} → {j.to}</b>
              <div className="muted" style={{ fontSize: 12 }}>{j.time} · {j.id}</div>
            </div>
            <div style={{ textAlign: "right" }}>
              <b>{fmtN(j.pay)}</b>
              <div className="row" style={{ gap: 3, justifyContent: "flex-end" }}>
                <Star size={12} fill="#F59E0B" color="#F59E0B" />
                <span style={{ fontSize: 12, fontWeight: 800 }}>{j.rating}.0</span>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </>
  );
}