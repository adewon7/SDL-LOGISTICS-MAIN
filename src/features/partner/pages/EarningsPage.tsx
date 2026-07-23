import { Download, Banknote, ChevronRight } from "lucide-react";
import { ResponsiveContainer, BarChart, Bar, XAxis, Tooltip } from "recharts";
import { Card } from "../../../components/ui/Card";
import { Button } from "../../../components/ui/Button";
import { WEEK_EARN } from "../../../data/partnerData";
import { fmtN } from "../../../utils/format";

interface EarningsPageProps {
  onOpenPayout: () => void;
}

export function EarningsPage({ onOpenPayout }: EarningsPageProps) {
  return (
    <>
      <div className="topbar">
        <h2 className="grow">Earnings</h2>
        <Button variant="secondary" size="sm">
          <Download size={14} /> Statement
        </Button>
      </div>

      <div className="body">
        <Card className="mb" style={{ background: "linear-gradient(135deg,var(--navy),#14509E)", color: "#fff", border: 0 }}>
          <div style={{ fontSize: 12, opacity: 0.8, fontWeight: 800 }}>THIS WEEK</div>
          <div className="disp" style={{ fontSize: 30, fontWeight: 700 }}>{fmtN(132400)}</div>
          <div style={{ fontSize: 12.5, opacity: 0.85 }}>38 jobs · 41.2 hrs online</div>
        </Card>

        <Card className="mb">
          <div className="h3 mb">Daily breakdown</div>
          <div style={{ height: 150 }}>
            <ResponsiveContainer>
              <BarChart data={WEEK_EARN}>
                <XAxis dataKey="d" tickLine={false} axisLine={false} fontSize={11} />
                <Tooltip formatter={(v) => fmtN(Number(v))} />
                <Bar dataKey="v" fill="#0E9F8A" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <div
          role="button"
          tabIndex={0}
          style={{ cursor: "pointer" }}
          onClick={onOpenPayout}
          onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && onOpenPayout()}
        >
          <Card className="row" style={{ textAlign: "left" }}>
            <Banknote size={18} color="var(--green)" />
            <div className="grow">
              <b style={{ fontSize: 13.5 }}>Payout account</b>
              <div className="muted" style={{ fontSize: 12 }}>GTBank •••• 5502 · weekly, Mondays</div>
            </div>
            <ChevronRight size={17} color="var(--slate)" />
          </Card>
        </div>
      </div>
    </>
  );
}