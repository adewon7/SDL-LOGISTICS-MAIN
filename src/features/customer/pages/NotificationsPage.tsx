import { SimpleListPage } from "../components/SimpleListPage";
import { Card } from "../../../components/ui/Card";
import { NOTIFS } from "../../../data/customerData";

interface NotificationsPageProps {
  back: () => void;
}

export function NotificationsPage({ back }: NotificationsPageProps) {
  return (
    <SimpleListPage back={back} title="Notifications" addLabel="Mark all as read">
      {NOTIFS.map((n) => (
        <Card key={n.id} className="row mb" style={{ borderLeft: n.unread ? "3px solid var(--teal)" : undefined }}>
          <div className="grow">
            <b style={{ fontSize: 13.5 }}>{n.title}</b>
            <div className="muted" style={{ fontSize: 12.5 }}>{n.body}</div>
          </div>
          <span className="muted" style={{ fontSize: 11.5 }}>{n.time}</span>
        </Card>
      ))}
    </SimpleListPage>
  );
}