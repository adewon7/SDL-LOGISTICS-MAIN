import type { ReactNode } from "react";
import { ChevronLeft, Plus } from "lucide-react";
import { Button } from "../../../components/ui/Button";
import { useToast } from "../../../components/ui/Toast";

interface SimpleListPageProps {
  back: () => void;
  title: string;
  addLabel: string;
  children: ReactNode;
}

export function SimpleListPage({ back, title, addLabel, children }: SimpleListPageProps) {
  const { showToast } = useToast();

  return (
    <>
      <div className="topbar">
        <button className="iconbtn" onClick={back} aria-label="Back">
          <ChevronLeft size={18} />
        </button>
        <h2>{title}</h2>
      </div>
      <div className="body">
        {children}
        <div className="mt">
          <Button variant="ghost" fullWidth onClick={() => showToast(`${addLabel} — coming soon in this demo`)}>
            <Plus size={16} /> {addLabel}
          </Button>
        </div>
      </div>
    </>
  );
}