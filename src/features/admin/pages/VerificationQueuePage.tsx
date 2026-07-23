import { useState } from "react";
import { FileCheck, FileText, Check } from "lucide-react";
import { PageHeader } from "../components/PageHeader";
import { Card } from "../../../components/ui/Card";
import { Button } from "../../../components/ui/Button";
import { Avatar } from "../../../components/ui/Avatar";
import { Pill } from "../../../components/ui/Pill";
import { Modal } from "../../../components/ui/Modal";
import { EmptyState } from "../../../components/ui/EmptyState";
import { Skeleton } from "../../../components/ui/Skeleton";
import { useToast } from "../../../components/ui/Toast";
import { VERIF_QUEUE } from "../../../data/adminData";
import type { VerificationRequest } from "../../../types/admin";

export function VerificationQueuePage() {
  const { showToast } = useToast();
  const [queue, setQueue] = useState<VerificationRequest[]>(VERIF_QUEUE);
  const [reviewing, setReviewing] = useState<VerificationRequest | null>(null);

  const approve = (id: string, name: string) => {
    setQueue((q) => q.filter((x) => x.id !== id));
    showToast(`${name} approved`);
  };

  const reject = (id: string) => {
    setQueue((q) => q.filter((x) => x.id !== id));
    showToast("Application rejected", "error");
  };

  return (
    <>
      <PageHeader title="Verification queue" sub={`${queue.length} applications awaiting review`} />

      {queue.length === 0 ? (
        <Card>
          <EmptyState
            icon={<FileCheck size={28} />}
            title="Queue clear"
            message="All partner applications have been reviewed. New submissions land here."
          />
        </Card>
      ) : (
        queue.map((q) => (
          <Card key={q.id} className="row mb">
            <Avatar name={q.name} />
            <div className="grow">
              <b>{q.name}</b>
              <div className="muted" style={{ fontSize: 12.5 }}>{q.vehicle} partner · submitted {q.submitted}</div>
              <div className="row mt" style={{ gap: 6, flexWrap: "wrap" }}>
                {q.docs.map((d) => <Pill key={d} tone="blue">{d}</Pill>)}
              </div>
            </div>
            <Button variant="secondary" size="sm" onClick={() => setReviewing(q)}>Review docs</Button>
            <Button variant="teal" size="sm" onClick={() => approve(q.id, q.name)}>
              <Check size={14} /> Approve
            </Button>
          </Card>
        ))
      )}

      <Modal open={!!reviewing} onClose={() => setReviewing(null)} title={`Documents · ${reviewing?.name ?? ""}`}>
        {reviewing?.docs.map((d) => (
          <Card key={d} className="row mb">
            <FileText size={17} color="var(--blue)" />
            <b className="grow" style={{ fontSize: 13.5 }}>{d}</b>
            <Skeleton style={{ width: 74, height: 46, borderRadius: 8 }} />
          </Card>
        ))}
        <div className="row">
          <div className="grow">
            <Button variant="danger" fullWidth onClick={() => { if (reviewing) reject(reviewing.id); setReviewing(null); }}>
              Reject
            </Button>
          </div>
          <div className="grow">
            <Button variant="teal" fullWidth onClick={() => { if (reviewing) approve(reviewing.id, reviewing.name); setReviewing(null); }}>
              Approve partner
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}