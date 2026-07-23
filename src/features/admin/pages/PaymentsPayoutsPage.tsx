import { PageHeader } from "../components/PageHeader";
import { AdminTable } from "../components/AdminTable";
import { Button } from "../../../components/ui/Button";
import { StatusPill } from "../../../components/ui/StatusPill";
import { useToast } from "../../../components/ui/Toast";
import { PAYOUTS } from "../../../data/adminData";
import { fmtN } from "../../../utils/format";

export function PaymentsPayoutsPage() {
  const { showToast } = useToast();

  return (
    <>
      <PageHeader
        title="Payments & payouts"
        sub="₦3.4M pending settlement this cycle"
        right={
          <Button variant="primary" size="sm" onClick={() => showToast("Payout batch queued")}>
            Run payout batch
          </Button>
        }
      />
      <AdminTable
        cols={["Batch", "Partner", "Period", "Amount", "Status"]}
        rows={PAYOUTS.map((p) => (
          <tr key={p.id}>
            <td className="muted">{p.id}</td>
            <td><b>{p.partner}</b></td>
            <td>{p.period}</td>
            <td>{fmtN(p.amount)}</td>
            <td><StatusPill status={p.status} /></td>
          </tr>
        ))}
      />
    </>
  );
}