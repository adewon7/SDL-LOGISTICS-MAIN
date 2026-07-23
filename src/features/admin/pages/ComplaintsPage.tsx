import { PageHeader } from "../components/PageHeader";
import { Card } from "../../../components/ui/Card";
import { Button } from "../../../components/ui/Button";
import { StatusPill } from "../../../components/ui/StatusPill";
import { useToast } from "../../../components/ui/Toast";
import { COMPLAINTS } from "../../../data/adminData";

export function ComplaintsPage() {
  const { showToast } = useToast();

  return (
    <>
      <PageHeader title="Complaints & disputes" sub="Average resolution time: 9.4 hours" />
      {COMPLAINTS.map((c) => (
        <Card key={c.id} className="row mb">
          <div className="grow">
            <div className="row" style={{ gap: 8 }}>
              <b style={{ fontSize: 14 }}>{c.subject}</b>
              <StatusPill status={c.status} />
            </div>
            <div className="muted" style={{ fontSize: 12.5 }}>
              {c.id} · {c.user} · trip {c.trip} · opened {c.age} ago
            </div>
          </div>
          <Button variant="secondary" size="sm">Open case</Button>
          {c.status !== "resolved" && (
            <Button variant="teal" size="sm" onClick={() => showToast(`${c.id} marked resolved`)}>
              Resolve
            </Button>
          )}
        </Card>
      ))}
    </>
  );
}