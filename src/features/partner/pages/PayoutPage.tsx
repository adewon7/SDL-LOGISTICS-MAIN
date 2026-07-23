import { useState } from "react";
import { ChevronLeft } from "lucide-react";
import { Field } from "../../../components/ui/Field";
import { Button } from "../../../components/ui/Button";
import { useToast } from "../../../components/ui/Toast";

const SCHEDULES = ["Daily", "Weekly", "Monthly"] as const;
type Schedule = (typeof SCHEDULES)[number];

interface PayoutPageProps {
  back: () => void;
}

export function PayoutPage({ back }: PayoutPageProps) {
  const { showToast } = useToast();
  const [schedule, setSchedule] = useState<Schedule>("Weekly");

  return (
    <>
      <div className="topbar">
        <button className="iconbtn" onClick={back} aria-label="Back">
          <ChevronLeft size={18} />
        </button>
        <h2>Payout settings</h2>
      </div>

      <div className="body">
        <Field label="Bank">
          <select>
            <option>GTBank</option>
            <option>Access Bank</option>
            <option>Zenith</option>
            <option>UBA</option>
            <option>Opay</option>
          </select>
        </Field>
        <Field label="Account number">
          <input defaultValue="0223 4455 02" inputMode="numeric" />
        </Field>
        <Field label="Account name" hint="Must match your verified ID.">
          <input defaultValue="Emeka Obi" />
        </Field>
        <Field label="Payout schedule">
          <div className="seg">
            {SCHEDULES.map((s) => (
              <button key={s} className={schedule === s ? "on" : ""} onClick={() => setSchedule(s)}>
                {s}
              </button>
            ))}
          </div>
        </Field>
        <Button variant="primary" fullWidth onClick={() => showToast("Payout details saved")}>
          Save changes
        </Button>
      </div>
    </>
  );
}