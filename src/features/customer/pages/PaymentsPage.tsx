import { CreditCard } from "lucide-react";
import { SimpleListPage } from "../components/SimpleListPage";
import { Card } from "../../../components/ui/Card";
import { Pill } from "../../../components/ui/Pill";
import { CARDS } from "../../../data/customerData";

interface PaymentsPageProps {
  back: () => void;
}

export function PaymentsPage({ back }: PaymentsPageProps) {
  return (
    <SimpleListPage back={back} title="Payment methods" addLabel="Add card or wallet">
      {CARDS.map((c) => (
        <Card key={c.id} className="row mb">
          <CreditCard size={17} color="var(--blue)" />
          <div className="grow">
            <b style={{ fontSize: 13.5 }}>{c.brand} •••• {c.last4}</b>
            <div className="muted" style={{ fontSize: 12.5 }}>Expires {c.exp}</div>
          </div>
          {c.id === 1 && <Pill tone="blue">default</Pill>}
        </Card>
      ))}
    </SimpleListPage>
  );
}