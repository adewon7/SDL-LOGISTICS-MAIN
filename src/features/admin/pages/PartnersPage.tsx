import { PageHeader } from "../components/PageHeader";
import { AdminTable } from "../components/AdminTable";
import { StatusPill } from "../../../components/ui/StatusPill";
import { Button } from "../../../components/ui/Button";
import { ADMIN_PARTNERS } from "../../../data/adminData";

export function PartnersPage() {
  return (
    <>
      <PageHeader title="Logistics partners" sub="486 verified · 84 online now" />
      <AdminTable
        cols={["ID", "Name", "Vehicle", "Rating", "Trips", "Status", ""]}
        rows={ADMIN_PARTNERS.map((p) => (
          <tr key={p.id}>
            <td className="muted">{p.id}</td>
            <td><b>{p.name}</b></td>
            <td>{p.vehicle}</td>
            <td>★ {p.rating}</td>
            <td>{p.trips.toLocaleString()}</td>
            <td><StatusPill status={p.status} /></td>
            <td>
              <Button variant="secondary" size="sm">Manage</Button>
            </td>
          </tr>
        ))}
      />
    </>
  );
}