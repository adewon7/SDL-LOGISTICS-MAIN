import { useState } from "react";
import { ChevronLeft, Star } from "lucide-react";
import { Avatar } from "../../../components/ui/Avatar";
import { Button } from "../../../components/ui/Button";
import { Field } from "../../../components/ui/Field";
import { useToast } from "../../../components/ui/Toast";
import { DRIVER } from "../../../data/customerData";
import { fmtN } from "../../../utils/format";

const REVIEW_TAGS = ["Clean vehicle", "Safe driving", "On time", "Great conversation", "Careful with items"];

// Local, tappable star picker — the shared ui/Stars.tsx is display-only,
// so this stays scoped to this page rather than changing the shared component.
function StarPicker({ value, onChange }: { value: number; onChange: (n: number) => void }) {
  return (
    <div className="row" style={{ gap: 6, justifyContent: "center" }}>
      {[1, 2, 3, 4, 5].map((i) => (
        <button
          key={i}
          onClick={() => onChange(i)}
          style={{ border: 0, background: "none", padding: 2, cursor: "pointer" }}
          aria-label={`${i} stars`}
        >
          <Star size={34} fill={i <= value ? "#F59E0B" : "none"} color={i <= value ? "#F59E0B" : "#CBD5E1"} />
        </button>
      ))}
    </div>
  );
}

interface RatingPageProps {
  back: () => void;
}

export function RatingPage({ back }: RatingPageProps) {
  const { showToast } = useToast();
  const [stars, setStars] = useState(5);
  const [tags, setTags] = useState<string[]>(["Great conversation"]);

  const toggleTag = (tag: string) => {
    setTags((current) => (current.includes(tag) ? current.filter((t) => t !== tag) : [...current, tag]));
  };

  const submit = () => {
    showToast("Thanks — your rating was submitted");
    back();
  };

  return (
    <>
      <div className="topbar">
        <button className="iconbtn" onClick={back} aria-label="Back">
          <ChevronLeft size={18} />
        </button>
        <h2>Rate your trip</h2>
      </div>

      <div className="body" style={{ textAlign: "center" }}>
        <Avatar name={DRIVER.name} size="large" />

        <h3 className="mt" style={{ fontSize: 18 }}>How was your trip with Emeka?</h3>
        <p className="muted">Wuse 2 → Garki Area 11 · {fmtN(3400)}</p>

        <div className="mt">
          <StarPicker value={stars} onChange={setStars} />
        </div>

        <div className="row mt" style={{ flexWrap: "wrap", justifyContent: "center", gap: 8 }}>
          {REVIEW_TAGS.map((tag) => (
            <Button key={tag} size="sm" variant={tags.includes(tag) ? "ghost" : "secondary"} onClick={() => toggleTag(tag)}>
              {tag}
            </Button>
          ))}
        </div>

        <div className="mt" style={{ textAlign: "left" }}>
          <Field label="Add a note (optional)">
            <textarea rows={2} placeholder="Anything else the team should know?" />
          </Field>
        </div>

        <div className="row">
          <div className="grow">
            <Button variant="secondary" fullWidth onClick={back}>Skip</Button>
          </div>
          <div className="grow">
            <Button variant="primary" fullWidth onClick={submit}>Submit rating</Button>
          </div>
        </div>
      </div>
    </>
  );
}