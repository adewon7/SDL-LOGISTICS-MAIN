import { useEffect, useState } from "react";
import { Mic, MicOff, PhoneOff, Volume2, Shield } from "lucide-react";
import { Avatar } from "../../../components/ui/Avatar";
import { Pill } from "../../../components/ui/Pill";
import { DRIVER } from "../../../data/customerData";

interface CallPageProps {
  back: () => void;
}

export function CallPage({ back }: CallPageProps) {
  const [muted, setMuted] = useState(false);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(t);
  }, []);

  const mm = String(Math.floor(seconds / 60)).padStart(2, "0");
  const ss = String(seconds % 60).padStart(2, "0");

  return (
    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,var(--navy),#123C6E)", color: "#fff", display: "flex", flexDirection: "column", alignItems: "center", padding: 40, zIndex: 20 }}>
      <Pill tone="teal">
        <Shield size={11} /> secure masked line
      </Pill>

      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 12 }}>
        <Avatar name={DRIVER.name} size="large" />
        <h2 style={{ fontSize: 22 }}>{DRIVER.name}</h2>
        <div style={{ opacity: 0.75, fontSize: 14 }}>+234 ••• ••• 4821</div>
        <div className="disp" style={{ fontSize: 16, fontWeight: 600, color: "#5EEAD4" }}>
          {mm}:{ss}
        </div>
      </div>

      <div className="row" style={{ gap: 22 }}>
        <button
          className="iconbtn"
          style={{ width: 56, height: 56, borderRadius: "50%", background: muted ? "#fff" : "rgba(255,255,255,.15)", border: 0, color: muted ? "var(--navy)" : "#fff" }}
          onClick={() => setMuted(!muted)}
          aria-label="Mute"
        >
          {muted ? <MicOff size={22} /> : <Mic size={22} />}
        </button>
        <button
          className="iconbtn"
          style={{ width: 68, height: 68, borderRadius: "50%", background: "var(--red-strong)", border: 0, color: "#fff" }}
          onClick={back}
          aria-label="End call"
        >
          <PhoneOff size={26} />
        </button>
        <button
          className="iconbtn"
          style={{ width: 56, height: 56, borderRadius: "50%", background: "rgba(255,255,255,.15)", border: 0, color: "#fff" }}
          aria-label="Speaker"
        >
          <Volume2 size={22} />
        </button>
      </div>
    </div>
  );
}