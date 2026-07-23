import { Download } from "lucide-react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { PageHeader } from "../components/PageHeader";
import { Card } from "../../../components/ui/Card";
import { Button } from "../../../components/ui/Button";
import { TRIPS_TREND } from "../../../data/adminData";

const SUMMARY_KPIS = [
  { label: "Completed trips", value: "3,388" },
  { label: "Avg fare", value: "₦3,120" },
  { label: "Repeat customers", value: "61%" },
  { label: "Partner utilisation", value: "74%" },
];

const SERVICE_BREAKDOWN = [
  { label: "Rides", value: 46, color: "var(--blue)" },
  { label: "Deliveries", value: 34, color: "var(--teal)" },
  { label: "Truck hire", value: 12, color: "var(--navy)" },
  { label: "Bus charter", value: 8, color: "#7C3AED" },
];

export function AnalyticsPage() {
  return (
    <>
      <PageHeader
        title="Analytics & reporting"
        sub="Jul 8 – Jul 14"
        right={<Button variant="secondary" size="sm"><Download size={14} /> Download report</Button>}
      />

      <div className="kpis mb">
        {SUMMARY_KPIS.map((k) => (
          <Card key={k.label} className="kpi">
            <div className="lbl">{k.label}</div>
            <div className="val">{k.value}</div>
          </Card>
        ))}
      </div>

      <div className="grid2">
        <Card>
          <div className="h3 mb">Revenue (₦M)</div>
          <div style={{ height: 220 }}>
            <ResponsiveContainer>
              <BarChart data={TRIPS_TREND}>
                <CartesianGrid vertical={false} stroke="#EDF1F6" />
                <XAxis dataKey="d" tickLine={false} axisLine={false} fontSize={11} />
                <YAxis tickLine={false} axisLine={false} fontSize={11} width={30} />
                <Tooltip />
                <Bar dataKey="rev" fill="#0B2545" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card>
          <div className="h3 mb">Bookings by service</div>
          {SERVICE_BREAKDOWN.map((s) => (
            <div key={s.label} style={{ padding: "9px 0" }}>
              <div className="row">
                <b className="grow" style={{ fontSize: 13.5 }}>{s.label}</b>
                <span className="muted" style={{ fontSize: 12.5, fontWeight: 800 }}>{s.value}%</span>
              </div>
              <div style={{ height: 8, background: "#EDF1F6", borderRadius: 99, marginTop: 5 }}>
                <div style={{ width: `${s.value}%`, height: "100%", borderRadius: 99, background: s.color }} />
              </div>
            </div>
          ))}
        </Card>
      </div>
    </>
  );
}