import { Download, AlertTriangle } from "lucide-react";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { PageHeader } from "../components/PageHeader";
import { Card } from "../../../components/ui/Card";
import { Button } from "../../../components/ui/Button";
import { Pill } from "../../../components/ui/Pill";
import type { PillTone } from "../../../components/ui/Pill";
import { TRIPS_TREND } from "../../../data/adminData";

const KPIS: { label: string; value: string; delta: string; tone: PillTone }[] = [
  { label: "Trips today", value: "358", delta: "+9% vs last Tue", tone: "blue" },
  { label: "Gross bookings", value: "₦1.02M", delta: "+14%", tone: "teal" },
  { label: "Active partners", value: "212", delta: "84 online now", tone: "green" },
  { label: "Open disputes", value: "7", delta: "2 urgent", tone: "red" },
];

const ACTIVITY: { text: string; when: string; tone: PillTone }[] = [
  { text: "Sani Yusuf accepted SDI-90514", when: "just now", tone: "teal" },
  { text: "Payout batch PO-8852 queued", when: "6m", tone: "amber" },
  { text: "New partner application · Bello H.", when: "2h", tone: "blue" },
  { text: "Dispute T-1120 opened by Ngozi E.", when: "3h", tone: "red" },
  { text: "Promo MOVE15 hit 40% redemption", when: "5h", tone: "gray" },
];

interface OverviewPageProps {
  onReviewQueue: () => void;
}

export function OverviewPage({ onReviewQueue }: OverviewPageProps) {
  return (
    <>
      <PageHeader
        title="Operations overview"
        sub="Tuesday, Jul 14 · Abuja service area"
        right={<Button variant="secondary" size="sm"><Download size={14} /> Export</Button>}
      />

      <div className="kpis mb">
        {KPIS.map((k) => (
          <Card key={k.label} className="kpi">
            <div className="lbl">{k.label}</div>
            <div className="val">{k.value}</div>
            <Pill tone={k.tone}>{k.delta}</Pill>
          </Card>
        ))}
      </div>

      <div className="grid2 mb">
        <Card>
          <div className="h3 mb">Trips — last 7 days</div>
          <div style={{ height: 210 }}>
            <ResponsiveContainer>
              <AreaChart data={TRIPS_TREND}>
                <defs>
                  <linearGradient id="tripsGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#14509E" stopOpacity={0.28} />
                    <stop offset="100%" stopColor="#14509E" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid vertical={false} stroke="#EDF1F6" />
                <XAxis dataKey="d" tickLine={false} axisLine={false} fontSize={11} />
                <YAxis tickLine={false} axisLine={false} fontSize={11} width={34} />
                <Tooltip />
                <Area type="monotone" dataKey="trips" stroke="#14509E" strokeWidth={2.5} fill="url(#tripsGradient)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card>
          <div className="h3 mb">Live activity</div>
          {ACTIVITY.map((a) => (
            <div key={a.text} className="row" style={{ padding: "9px 0", borderBottom: "1px solid var(--line)" }}>
              <Pill tone={a.tone}>•</Pill>
              <span className="grow" style={{ fontSize: 13.5, fontWeight: 600 }}>{a.text}</span>
              <span className="muted" style={{ fontSize: 12 }}>{a.when}</span>
            </div>
          ))}
        </Card>
      </div>

      <Card style={{ borderLeft: "3px solid var(--amber)" }}>
        <div className="row">
          <AlertTriangle size={18} color="var(--amber)" />
          <b className="grow" style={{ fontSize: 14 }}>3 partner documents expire within 14 days</b>
          <Button variant="ghost" size="sm" onClick={onReviewQueue}>Review queue</Button>
        </div>
      </Card>
    </>
  );
}