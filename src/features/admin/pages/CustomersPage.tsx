import { Filter, Eye } from "lucide-react";
import { PageHeader } from "../components/PageHeader";
import { AdminTable } from "../components/AdminTable";
import { StatusPill } from "../../../components/ui/StatusPill";
import { Button } from "../../../components/ui/Button";
import { ADMIN_CUSTOMERS } from "../../../data/adminData";
import { fmtN } from "../../../utils/format";

export function CustomersPage() {
  return (
    <>
      <PageHeader
        title="Customers"
        sub="4,182 registered · 1,204 active this month"
        right={
          <div className="row">
            <div className="field" style={{ margin: 0 }}>
              <input placeholder="Search customers…" style={{ width: 200 }} />
            </div>
            <Button variant="secondary" size="sm">
              <Filter size={14} /> Filter
            </Button>
          </div>
        }
      />
      <AdminTable
        cols={["ID", "Name", "Trips", "Lifetime spend", "Status", ""]}
        rows={ADMIN_CUSTOMERS.map((c) => (
          <tr key={c.id}>
            <td className="muted">{c.id}</td>
            <td><b>{c.name}</b></td>
            <td>{c.trips}</td>
            <td>{fmtN(c.spend)}</td>
            <td><StatusPill status={c.status} /></td>
            <td>
              <Button variant="secondary" size="sm">
                <Eye size={13} /> View
              </Button>
            </td>
          </tr>
        ))}
      />
    </>
  );
}