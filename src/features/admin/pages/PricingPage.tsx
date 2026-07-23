import { Plus } from "lucide-react";
import { PageHeader } from "../components/PageHeader";
import { Card } from "../../../components/ui/Card";
import { Button } from "../../../components/ui/Button";
import { Field } from "../../../components/ui/Field";
import { Pill } from "../../../components/ui/Pill";
import { useToast } from "../../../components/ui/Toast";
import { VEHICLES } from "../../../data/vehicles";

const SERVICE_AREAS = ["Abuja Municipal", "Bwari", "Kubwa & Dutse", "Gwagwalada"];

export function PricingPage() {
  const { showToast } = useToast();

  return (
    <>
      <PageHeader title="Pricing & service areas" sub="Changes apply to new bookings immediately" />
      <div className="grid2">
        <Card>
          <div className="h3 mb">Base fares & per-km rates</div>
          {VEHICLES.map((v) => (
            <div key={v.id} className="row" style={{ padding: "8px 0", borderBottom: "1px solid var(--line)" }}>
              <v.icon size={17} color="var(--slate)" />
              <b className="grow" style={{ fontSize: 13.5 }}>{v.name}</b>
              <input
                defaultValue={v.base}
                style={{ width: 86, border: "1.5px solid var(--line)", borderRadius: 8, padding: "6px 8px", font: "inherit", fontSize: 13 }}
                aria-label={`${v.name} base fare`}
              />
              <input
                defaultValue={v.perKm}
                style={{ width: 70, border: "1.5px solid var(--line)", borderRadius: 8, padding: "6px 8px", font: "inherit", fontSize: 13 }}
                aria-label={`${v.name} per km`}
              />
            </div>
          ))}
          <div className="mt">
            <Button variant="primary" size="sm" onClick={() => showToast("Pricing updated")}>
              Save pricing
            </Button>
          </div>
        </Card>

        <div>
          <Card className="mb">
            <div className="h3 mb">Platform commission</div>
            <Field label="Commission on rides (%)">
              <input defaultValue="18" inputMode="numeric" />
            </Field>
            <Field label="Commission on deliveries (%)">
              <input defaultValue="15" inputMode="numeric" />
            </Field>
          </Card>

          <Card>
            <div className="h3 mb">Service areas</div>
            {SERVICE_AREAS.map((zone, i) => (
              <div key={zone} className="row" style={{ padding: "7px 0" }}>
                <b className="grow" style={{ fontSize: 13.5 }}>{zone}</b>
                <Pill tone={i < 3 ? "green" : "gray"}>{i < 3 ? "active" : "paused"}</Pill>
              </div>
            ))}
            <div className="mt">
              <Button variant="ghost" size="sm">
                <Plus size={14} /> Add zone
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
}