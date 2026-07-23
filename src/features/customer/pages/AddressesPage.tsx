import { MapPin } from "lucide-react";
import { SimpleListPage } from "../components/SimpleListPage";
import { Card } from "../../../components/ui/Card";
import { Button } from "../../../components/ui/Button";
import { ADDRESSES } from "../../../data/customerData";

interface AddressesPageProps {
  back: () => void;
}

export function AddressesPage({ back }: AddressesPageProps) {
  return (
    <SimpleListPage back={back} title="Saved addresses" addLabel="Add new address">
      {ADDRESSES.map((a) => (
        <Card key={a.id} className="row mb">
          <MapPin size={17} color="var(--teal)" />
          <div className="grow">
            <b style={{ fontSize: 13.5 }}>{a.label}</b>
            <div className="muted" style={{ fontSize: 12.5 }}>{a.detail}</div>
          </div>
          <Button variant="secondary" size="sm">Edit</Button>
        </Card>
      ))}
    </SimpleListPage>
  );
}