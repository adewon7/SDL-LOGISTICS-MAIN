import { useEffect, useState } from "react";
import { ChevronLeft, History as HistoryIcon, Package } from "lucide-react";
import { StatusPill } from "../../../components/ui/StatusPill";
import { EmptyState } from "../../../components/ui/EmptyState";
import { Skeleton } from "../../../components/ui/Skeleton";
import { Card } from "../../../components/ui/Card";
import { HISTORY } from "../../../data/customerData";
import { VEHICLES } from "../../../data/vehicles";
import { fmtN } from "../../../utils/format";

type HistoryFilter = "all" | "rides" | "deliveries" | "completed" | "cancelled";
const FILTERS: HistoryFilter[] = ["all", "rides", "deliveries", "completed", "cancelled"];

interface HistoryPageProps {
  back: () => void;
  onOpen: () => void;
}

export function HistoryPage({ back, onOpen }: HistoryPageProps) {
  const [filter, setFilter] = useState<HistoryFilter>("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(t);
  }, []);

  const rows = HISTORY.filter((h) => {
    if (filter === "all") return true;
    if (filter === "rides") return h.kind === "ride";
    if (filter === "deliveries") return h.kind === "delivery";
    return h.status === filter;
  });

  return (
    <>
      <div className="topbar">
        <button className="iconbtn" onClick={back} aria-label="Back">
          <ChevronLeft size={18} />
        </button>
        <h2>Your bookings</h2>
      </div>

      <div className="body">
        <div className="seg mb">
          {FILTERS.map((f) => (
            <button key={f} className={filter === f ? "on" : ""} onClick={() => setFilter(f)} style={{ textTransform: "capitalize" }}>
              {f}
            </button>
          ))}
        </div>

        {loading ? (
          [1, 2, 3].map((i) => <Skeleton key={i} className="mb" style={{ height: 76 }} />)
        ) : rows.length === 0 ? (
          <EmptyState icon={<HistoryIcon size={28} />} title="Nothing here yet" message="Bookings matching this filter will appear here." />
        ) : (
          rows.map((h) => {
            const vehicle = VEHICLES.find((v) => v.id === h.vehicle);
            const isRide = h.kind === "ride";
            return (
              <div
                key={h.id}
                role="button"
                tabIndex={0}
                onClick={onOpen}
                onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && onOpen()}
                className="mb"
                style={{ cursor: "pointer" }}
              >
                <Card>
                  <div className="row">
                    <div style={{ width: 40, height: 40, borderRadius: 12, background: isRide ? "var(--blue-soft)" : "var(--teal-soft)", display: "grid", placeItems: "center", color: isRide ? "var(--blue)" : "var(--teal)" }}>
                      {isRide && vehicle ? <vehicle.icon size={19} /> : <Package size={19} />}
                    </div>
                    <div className="grow">
                      <b style={{ fontSize: 13.5 }}>{h.from} → {h.to}</b>
                      <div className="muted" style={{ fontSize: 12 }}>{h.date} · {h.id}</div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <b style={{ fontSize: 13.5 }}>{fmtN(h.fare)}</b>
                      <div><StatusPill status={h.status} /></div>
                    </div>
                  </div>
                </Card>
              </div>
            );
          })
        )}
      </div>
    </>
  );
}