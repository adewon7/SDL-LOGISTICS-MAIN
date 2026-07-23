import { Plus } from "lucide-react";
import { PageHeader } from "../components/PageHeader";
import { AdminTable } from "../components/AdminTable";
import { StatusPill } from "../../../components/ui/StatusPill";
import { Button } from "../../../components/ui/Button";
import { useToast } from "../../../components/ui/Toast";
import { PROMOS } from "../../../data/adminData";

export function PromosPage() {
  const { showToast } = useToast();

  return (
    <>
      <PageHeader
        title="Promo codes"
        right={
          <Button variant="primary" size="sm" onClick={() => showToast("New promo drafted")}>
            <Plus size={14} /> New promo
          </Button>
        }
      />
      <AdminTable
        cols={["Code", "Description", "Redemptions", "Status", ""]}
        rows={PROMOS.map((p) => (
          <tr key={p.code}>
            <td><b className="disp">{p.code}</b></td>
            <td>{p.desc}</td>
            <td>
              <div style={{ minWidth: 130 }}>
                <div className="muted" style={{ fontSize: 12 }}>{p.uses} / {p.cap}</div>
                <div style={{ height: 6, background: "#EDF1F6", borderRadius: 99, marginTop: 4 }}>
                  <div
                    style={{
                      width: `${Math.min(100, (p.uses / p.cap) * 100)}%`,
                      height: "100%",
                      borderRadius: 99,
                      background: "var(--teal)",
                    }}
                  />
                </div>
              </div>
            </td>
            <td><StatusPill status={p.active ? "active" : "paused"} /></td>
            <td>
              <Button variant="secondary" size="sm">
                {p.active ? "Pause" : "Reactivate"}
              </Button>
            </td>
          </tr>
        ))}
      />
    </>
  );
}